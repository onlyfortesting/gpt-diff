<script>
  import Template from "./Template.svelte"
  import TemplateEditor from "./TemplateEditor.svelte"
  import { nav, template, templates, text } from "./app"
  import { createDialog, melt } from "@melt-ui/svelte"

  const {
    elements: { portalled, overlay, content, close },
    states: { open },
  } = createDialog({
    portal: null,
  })

  $: emptyText = !$text.trim().length

  $: transformTemplate = $templates.filter((c) => c.type === "transform")
  $: generateTemplate = $templates.filter((c) => c.type === "generate")
</script>

<div use:portalled>
  {#if $open}
    <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
    <div
      use:melt={$content}
      class="fixed inset-0 flex mt-32 justify-center z-50 m-3 ease-out transition-all md:max-w-2xl md:w-full md:mx-auto pointer-events-none"
    >
      <div
        class="relative flex flex-col rounded-xl overflow-hidden pointer-events-auto min-w-[60vw]"
      >
        <button use:melt={$close} class="absolute top-2 right-2">
          <div
            class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-3.5 h-3.5"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>
        <!-- Card Section -->
        <form
          on:submit={(e) => {
            $open = false
            $text = document.querySelector("#selected-text").value
          }}
        >
          <!-- Card -->
          <div class="bg-white rounded-xl shadow dark:bg-slate-900">
            <div class="p-4 sm:p-7">
              <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Selected Text
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  You can modify the text that is passed to the <code
                    class="bg-yellow-100">{"{{text}}"}</code
                  > block.
                </p>
              </div>
              <!-- Grid -->
              <div class="space-y-4 sm:space-y-6">
                <textarea
                  id="selected-text"
                  value={$text || ""}
                  class="min-h-[200px] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                />
              </div>
              <!-- End Grid -->

              <div class="mt-8 flex justify-end gap-x-2">
                <button
                  use:melt={$close}
                  class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
          <!-- End Card -->
        </form>
      </div>
    </div>
  {/if}
</div>

<div class="sm:divide-y divide-gray-200 dark:divide-gray-700">
  <div class="py-3 sm:py-6">
    <h4
      class="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"
    >
      Transform
      {#if emptyText}
        <span class="ml-2 italic text-orange-500 normal-case">
          ⚠ No text selected</span
        >
      {/if}
    </h4>

    <!-- Grid -->
    <div class="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {#each transformTemplate as t (t.id)}
        <Template template={t} disabled={emptyText} />
      {/each}
      <!-- Card -->
      <div
        class="bg-white p-4 transition duration-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] cursor-pointer select-none"
        on:click={(e) => {
          $template = null
          nav.goto("template-editor")
        }}
      >
        <div class="flex">
          <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-blue-700"
              viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-3-3v6m-6 4a2 2 0 0 1-2-2v-4l-1-1l1-1V7a2 2 0 0 1 2-2m12 14a2 2 0 0 0 2-2v-4l1-1l-1-1V7a2 2 0 0 0-2-2"
              /></svg
            >
          </div>

          <div class="grow ml-6">
            <h3 class="text-sm font-semibold text-blue-600 dark:text-blue-500">
              Add new
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-500">
              Add your own custom template.
            </p>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
    <!-- End Grid -->
  </div>
  <div class="py-3 sm:py-6">
    <h4
      class="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"
    >
      Generate
    </h4>
    <div class="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {#each generateTemplate as t (t.id)}
        <Template template={t} />
      {/each}
      <div
        class="bg-white p-4 transition duration-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] cursor-pointer select-none"
        on:click={(e) => {
          $template = null
          nav.goto({ component: TemplateEditor, props: { type: "generate" } })
        }}
      >
        <div class="flex">
          <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-blue-700"
              viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-3-3v6m-6 4a2 2 0 0 1-2-2v-4l-1-1l1-1V7a2 2 0 0 1 2-2m12 14a2 2 0 0 0 2-2v-4l1-1l-1-1V7a2 2 0 0 0-2-2"
              /></svg
            >
          </div>

          <div class="grow ml-6">
            <h3 class="text-sm font-semibold text-blue-600 dark:text-blue-500">
              Add new
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-500">
              Add your own custom template.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex justify-end items-center gap-x-2 pt-3 px-4 border-t dark:border-gray-700"
  >
    <button
      class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
      on:click={() => ($open = true)}
    >
      Selected text
    </button>
    <button
      class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
      on:click={() => nav.goto("custom-prompt")}
    >
      Custom prompt
    </button>
  </div>
</div>
