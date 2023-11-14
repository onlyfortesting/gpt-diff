<script>
  import {
    nav,
    templates,
    page,
    gptVersion,
    key,
    temp,
    command,
    history,
    isFirstMount,
    mouse,
  } from "./app"
  // import { pull } from "$lib/actions"
  import MainMenu from "./MainMenu.svelte"
  import TextArea from "./TextArea.svelte"
  import TemplateEditor from "./TemplateEditor.svelte"
  import History from "./History.svelte"
  import { createDialog, melt } from "@melt-ui/svelte"
  import CustomPrompt from "./CustomPrompt.svelte"

  import { localExtStorage } from "@webext-core/storage"
  import compare from "just-compare"

  async function init() {
    if (!$history.length) {
      let hs = (await localExtStorage.getItem("history")) || []
      if (hs.length) $history = hs
    }
  }
  init()

  async function storageSync(name, store) {
    let isSame = compare(await localExtStorage.getItem(name), store)
    if (isSame) return
    localExtStorage.setItem(name, store)
  }

  $: storageSync("templates", $templates)
  $: storageSync("key", $key)
  $: storageSync("temp", $temp)
  $: storageSync("gptVersion", $gptVersion)

  function pointerdown(e) {
    this.setPointerCapture(e.pointerId)
  }

  const {
    elements: { portalled, overlay, content, close },
    states: { open },
  } = createDialog({
    portal: null,
  })

  $isFirstMount = false
</script>

<!-- <svelte:body -->
<!--   use:pull={(e, onDrag, onRelease) => { -->
<!--     $mouse.ax = e.clientX -->
<!--     $mouse.ay = e.clientY -->
<!--     $mouse.isDrag = true -->
<!---->
<!--     onDrag((e) => { -->
<!--       $mouse.x = e.clientX -->
<!--       $mouse.y = e.clientY -->
<!--     }) -->
<!---->
<!--     onRelease((e) => { -->
<!--       $mouse.isDrag = false -->
<!--     }) -->
<!--   }} -->
<!-- /> -->

<!-- <div class="absolute right-0 top-0 bg-[tomato] p-2"> -->
<!--   {Math.trunc($mouse.x)}, {Math.trunc($mouse.y)} -->
<!-- </div> -->

<div use:portalled>
  {#if $open}
    <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
    <div
      use:melt={$content}
      class="fixed inset-0 flex mt-32 justify-center z-50 m-3 ease-out transition-all md:max-w-2xl md:w-full md:mx-auto pointer-events-none"
    >
      <div
        class="relative flex flex-col rounded-xl overflow-hidden pointer-events-auto"
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
            $key = document.querySelector("#api-key-input").value
            $temp = +document.querySelector("#temperature-input").value
            $open = false
          }}
        >
          <!-- Card -->
          <div class="bg-white rounded-xl shadow dark:bg-slate-900">
            <div class="p-4 sm:p-7">
              <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Settings
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Manage your OpenAI API key
                </p>
              </div>
              <!-- Grid -->
              <div class="space-y-4 sm:space-y-6">
                <div class="space-y-2">
                  <label
                    for="af-submit-app-project-name"
                    class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    OpenAI API Key
                  </label>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    You can find your API key at <a
                      class="text-blue-600 underline"
                      target="_blank"
                      href="https://platform.openai.com/account/api-keys"
                      >https://platform.openai.com/account/api-keys</a
                    >. Rest assured that your API key remains on your computer
                    at all times to protect your privacy.
                  </p>

                  <input
                    id="api-key-input"
                    type="text"
                    value={$key}
                    class="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter your OpenAI API key..."
                  />
                </div>
              </div>
              <!-- End Grid -->

              <div class="mt-8 space-y-4 sm:space-y-6">
                <div class="space-y-2">
                  <label
                    for="temperature-input"
                    class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    Temperature
                  </label>
                  <input
                    id="temperature-input"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={$temp}
                    class="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="0-1"
                  />
                </div>
              </div>

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

<div
  class="h-[90vh] flex flex-col mt-8 max-w-5xl w-[95vw] mx-auto overflow auto relative"
>
  <div
    class="flex justify-between items-center py-3 px-4 bg-white border shadow-sm rounded-t-xl dark:bg-gray-800 dark:border-gray-700"
  >
    <h3
      class="inline-flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200"
    >
      <button on:click={() => nav.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 -mt-px text-gray-500 hover:text-gray-400"
          class:invisible={$page == "main"}
          viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14M5 12l6 6m-6-6l6-6"
          /></svg
        ></button
      >
      GPT Diff
      <span tabindex="1" class="sr-only">gpt diff dialog</span>
    </h3>
    <div
      class="flex bg-gray-200/[.5] hover:bg-gray-200 rounded-lg transition border dark:bg-gray-700 dark:hover:bg-gray-700/[.7]"
    >
      <div class="grid grid-cols-2">
        <button
          type="button"
          class="{$gptVersion == '3.5-turbo'
            ? 'bg-white text-gray-700 shadow-sm'
            : ''} w-full text-xs text-gray-500 hover:text-gray-700 font-semibold rounded-md py-2 px-3 dark:text-gray-400 dark:hover:text-white dark:hover:text-gray-300 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-gray-400 active"
          role="tab"
          on:click={() => ($gptVersion = "3.5-turbo")}
        >
          GPT 3.5
        </button>
        <button
          type="button"
          class="{$gptVersion == '4-turbo'
            ? 'bg-white text-gray-700 shadow-sm'
            : ''} w-full text-xs text-gray-500 hover:text-gray-700 font-semibold rounded-md py-2 px-3 dark:text-gray-400 dark:hover:text-white dark:hover:text-gray-300 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-gray-400 active"
          role="tab"
          on:click={() => ($gptVersion = "4-turbo")}
        >
          GPT 4
        </button>
      </div>
    </div>

    <div class="flex items-center">
      <button
        type="button"
        class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
        on:click={(e) => {
          nav.set(["main", "history"])
        }}
      >
        <span class="sr-only">History</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 24 24"
          ><g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            ><path d="M12 8v4l2 2" /><path
              d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"
            /></g
          ></svg
        >
      </button><button
        type="button"
        class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
        on:click={(e) => {
          $open = true
        }}
      >
        <span class="sr-only">Settings</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-6v4m0 4v8m4-4a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-12v10m0 4v2m4-13a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-3v1m0 4v11"
          /></svg
        >
      </button>
      <button
        type="button"
        class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
        on:click={() => command.exit()}
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3.5 h-3.5"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>

  <div
    class="flex p-4 bg-white border border-t-0 shadow-sm rounded-b-xl dark:bg-gray-800 dark:border-gray-700 overflow-y-auto"
  >
    {#if $page == "main"}
      <MainMenu />
    {:else if $page == "diff-editor"}
      <TextArea />
    {:else if $page == "template-editor"}
      <TemplateEditor />
    {:else if $page == "custom-prompt"}
      <CustomPrompt />
    {:else if $page == "history"}
      <History />
    {:else}
      <svelte:component this={$page.component} {...$page.props} />
    {/if}
  </div>
</div>
