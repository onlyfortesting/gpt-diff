<script>
  import { onMount } from "svelte"
  import { Editor, Node, mergeAttributes } from "@tiptap/core"
  import Document from "@tiptap/extension-document"
  import Paragraph from "@tiptap/extension-paragraph"
  import Text from "@tiptap/extension-text"
  import History from "@tiptap/extension-history"
  import HardBreak from "@tiptap/extension-hard-break"

  import { diffWordsWithSpace } from "diff"
  import {
    page,
    totalDiff,
    command,
    template,
    text,
    temp,
    openai,
    gptVersion,
    gptModel,
  } from "./app"

  export let controller
  export let onStatusChanged
  export let editor

  controller = {}

  let element
  let stream = []
  let textC = ""

  const streamfn = () => {
    if (editor && !textC && stream.length) {
      let content = stream[stream.length - 1].content
      if (!content) return

      editor.commands.insertContentAt(
        editor.getText().length + 1,
        content.replaceAll("\n", "<br/>"),
        {
          updateSelection: true,
          parseOptions: {
            preserveWhitespace: "full",
          },
        }
      )
    }
  }

  $: {
    stream
    streamfn()
  }

  const run = async () => {
    onStatusChanged("streaming")

    let response
    try {
      response = await openai.chat.completions.create({
        model: gptModel[$gptVersion].model,
        messages: [
          {
            role: "user",
            content: $template.prompt.replace("{{text}}", $text),
          },
        ],
        stream: true,
        temperature: $temp,
      })

      controller.abortController = response.controller

      editor?.commands.clearContent()

      let unsub = () => {}
      unsub = page.subscribe((p) => {
        if (p === "diff-editor") return

        console.log("page changed - aborting generation")
        controller.abortController.abort()
        unsub()
      })

      stream = []
      for await (const part of response) {
        stream = [...stream, part.choices[0].delta]
      }

      unsub()

      command.addHistory({
        ...$template,
        text: $text,
        response: stream.map((c) => c.content).join(""),
      })

      console.log(stream)
    } catch (e) {
      onStatusChanged("error", e)
      console.log("error")
      editor.setEditable(true)

      return
    }
    editor.setEditable(true)

    if (controller.abortController.signal.aborted) {
      console.log("Stop generating")
      onStatusChanged("aborted")
      return
    }

    if ($template.type === "generate") {
      $totalDiff = 0
      onStatusChanged("done")
      return
    }

    const a = $text
    const b = stream.map((c) => c.content).join("")

    let diff = diffWordsWithSpace(a, b)
    let skipNext = false
    let diffSimplified = diff.reduce((carry, c, i, a) => {
      if (skipNext) {
        skipNext = false
        return carry
      }

      let n = a[i + 1]
      if (c.removed && n?.added) {
        skipNext = true
        carry.push({ added: n.value, removed: c.value })
      } else {
        if (c.added) carry.push({ added: c.value })
        else if (c.removed) carry.push({ removed: c.value })
        else carry.push({ value: c.value })
      }

      return carry
    }, [])

    textC = diffSimplified
      .map(({ added, removed, value }) => {
        let buf = ""
        if (added || removed) {
          buf += "<diff>"
          if (added) buf += "[+++]" + added
          if (removed) buf += "[---]" + removed
          buf += "</diff>"

          return buf
        }

        return value.replaceAll("\n", "<br/>")
      })
      .join("")

    $totalDiff = diffSimplified.filter((c) => c.added || c.removed).length
    console.log(diff)
    console.log(diffSimplified)
    console.log(textC)

    const Diff = Node.create({
      name: "diffNode",

      atom: true,
      inline: true,
      group: "inline",
      content: "inline*",
      // whitespace: "pre",

      // group: "block",
      // content: "paragraph*",

      parseHTML() {
        return [
          {
            tag: "diff",
          },
        ]
      },

      renderHTML({ HTMLAttributes }) {
        return ["diff", mergeAttributes(HTMLAttributes), 0]
      },

      addNodeView() {
        return ({ editor, node, getPos }) => {
          let text = node.textContent

          let [_, mark, addedText, __, removedText] = text
            .replaceAll("\n", "<br/>")
            .split(/\[(\+\+\+|\-\-\-)\]/)

          if (mark === "---") {
            removedText = addedText
            addedText = null
          }

          function create(text, className) {
            if (!text) return

            let hasNL = text.match("<br/>")

            let el = document.createElement("span")
            el.contentEditable = "false"
            el.setAttribute("data-diff", "")

            if (hasNL) {
              el.insertAdjacentHTML(
                "afterbegin",
                // DANGER: Needs Escaping
                text
              )
              el.style.display = "block"
            } else {
              el.textContent = text
            }

            el.className = className

            el.addEventListener("contextmenu", (e) => {
              e.preventDefault()
            })

            return el
          }

          let classA = "bg-green-200 hover:bg-green-300 cursor-pointer"
          let classR = "bg-red-200 hover:bg-red-300 line-through cursor-pointer"

          let parent = document.createElement("span")
          let added = create(addedText, classA)
          let removed = create(removedText, classR)

          // if (added && removed) removed.removeAttribute("data-diff")

          let isResolved = false
          const resolve = (accept, all) => {
            if (isResolved) return

            editor.commands.setNodeSelection(getPos())
            editor.commands.deleteSelection()

            if (added && removed) {
              if (accept) editor.commands.insertContent(addedText)
              else editor.commands.insertContent(removedText)
            } else if (added) {
              if (accept) editor.commands.insertContent(addedText)
            } else {
              if (!accept) editor.commands.insertContent(removedText)
            }

            isResolved = true
          }

          if (added) {
            added._resolve = resolve

            added.addEventListener("pointerup", (e) => {
              if (removed && e.button !== 0) return

              added._resolve(e.button === 0)
            })
          }

          if (removed) {
            removed._resolve = resolve

            removed.addEventListener("pointerup", (e) => {
              if (added && e.button !== 0) return

              removed._resolve(added ? false : e.button === 0)
            })
          }

          if (added) {
            removed?.addEventListener("pointerenter", (e) => {
              removed.className = classA
              if (added) added.className = classR
            })

            removed?.addEventListener("pointerleave", (e) => {
              removed.className = classR
              if (added) added.className = classA
            })
          }

          parent.append(...[removed, added].filter((c) => c))

          return {
            dom: parent,
          }
        }
      },
    })

    onStatusChanged("done")

    editor?.destroy()
    editor = new Editor({
      element: element,
      extensions: [Document, Paragraph, Text, Diff, HardBreak, History],
      content: textC,
      parseOptions: {
        preserveWhitespace: "full",
      },
      onTransaction: () => {
        // Force re-render so `editor.isActive` works as expected
        editor = editor

        // Don't count "replacement" diff node as two
        let diffs = document.querySelectorAll(
          "[data-diff]:not([data-diff]+[data-diff])"
        )
        $totalDiff = diffs.length
      },
    })
  }

  controller.regenerate = run

  onMount(() => {
    run()

    editor = new Editor({
      element: element,
      extensions: [Document, Paragraph, Text, HardBreak, History],
      content: "",
      parseOptions: {
        preserveWhitespace: "full",
      },
      onTransaction: () => {
        editor = editor
      },
    })
    editor.setEditable(false)

    return () => {
      editor?.destroy()
    }
  })
</script>

<div class="overflow-auto {$$props.class || ''}" bind:this={element} />
