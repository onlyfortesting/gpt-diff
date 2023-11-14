<script>
  import { nav, page, command, templates, template } from "./app"
  import { createDialog, melt } from "@melt-ui/svelte"

  function textAreaAdjust(e) {
    this.style.height = "auto"
    this.style.overflowY = "hidden"

    this.style.height = this.scrollHeight + "px"

    // if (this.scrollHeight > this.clientHeight) {
    //   this.style.overflowY = "scroll"
    // } else {
    //   this.style.overflowY = "hidden"
    // }
  }

  let name = $template?.name || ""
  let description = $template?.description || ""
  let prompt = $template?.prompt || ""
  let type = $template?.type || $$props.type || "transform"

  const {
    elements: {
      portalled,
      overlay,
      content,
      title: modalTitle,
      description: modalDescription,
      close,
    },
    states: { open },
  } = createDialog({
    portal: null,
  })
</script>

<div use:melt={$portalled}>
  <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
  <div
    use:melt={$content}
    class="fixed inset-0 flex items-center justify-center z-50 m-3 ease-out transition-all md:max-w-2xl md:w-full md:mx-auto pointer-events-none"
  >
    <div
      class="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700 pointer-events-auto"
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

      <div class="p-4 sm:p-10 overflow-y-auto">
        <div class="flex gap-x-4 md:gap-x-7">
          <!-- Icon -->
          <span
            class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100"
          >
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
          </span>
          <!-- End Icon -->

          <div class="grow">
            <h3
              use:melt={$modalTitle}
              class="mb-2 text-xl font-bold text-gray-800"
            >
              Delete This Template
            </h3>
            <p use:melt={$modalDescription} class="text-gray-500">
              Are you sure do you want to delete this template?
            </p>
          </div>
        </div>
      </div>

      <div
        class="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700"
      >
        <button
          use:melt={$close}
          type="button"
          class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          data-hs-overlay="#hs-danger-alert"
        >
          Cancel
        </button>
        <button
          on:click={() => {
            command.deleteTemplate($template)
            nav.back()
          }}
          class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Delete template
        </button>
      </div>
    </div>
  </div>
</div>

<form
  class="flex flex-col relative grow"
  on:submit={(e) => {
    if ($template)
      command.editTemplate($template, { name, type, description, prompt })
    else command.addTemplate({ name, type, description, prompt })

    nav.back()
  }}
>
  <div class="mb-4 sm:mb-8">
    <label class="block mb-2 text-sm font-medium dark:text-white"
      >Template name</label
    >
    <p class="text-sm text-base-100 mb-2">
      You can use emoji to give it an icon.
    </p>
    <input
      required
      type="text"
      bind:value={name}
      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
      placeholder="☕️ My new template"
    />
  </div>

  <div class="mb-4 sm:mb-8">
    <label class="block mb-2 text-sm font-medium dark:text-white"
      >Description</label
    >
    <input
      type="text"
      bind:value={description}
      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
      placeholder="Description"
    />
  </div>

  <div class="mb-4 sm:mb-8">
    <label class="block mb-2 text-sm font-medium dark:text-white"
      >Use Diff View</label
    >

    <div class="sm:col-span-9">
      <div class="sm:flex">
        <div
          class="flex py-2 px-3 block w-full border border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative cursor-pointer focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          on:click={(e) => (type = "transform")}
        >
          <input
            type="radio"
            class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            checked={type === "transform"}
          />
          <span class="text-sm text-gray-500 ml-3 capitalize dark:text-gray-400"
            >Yes</span
          >
        </div>
        <div
          class="flex py-2 px-3 block w-full border border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative cursor-pointer focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          on:click={(e) => (type = "generate")}
        >
          <input
            type="radio"
            class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            checked={type === "generate"}
          />
          <span class="text-sm text-gray-500 ml-3 capitalize dark:text-gray-400"
            >No</span
          >
        </div>
      </div>
    </div>
  </div>

  <div>
    <label
      for="hs-feedback-post-comment-textarea-1"
      class="block mb-2 text-sm font-medium dark:text-white">Prompt</label
    >
    <p class="text-sm text-base-100">
      Use <code class="bg-yellow-100">{"{{text}}"}</code> to fill your prompt template
      with selection text.
    </p>
    <div class="mt-2">
      <textarea
        required
        bind:value={prompt}
        class="resize-none overflow-y-hidden min-h-[200px] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        placeholder="{'EXAMPLE\n-------------\n\n'}Fix grammar for the following text:{'\n{{text}}'}"
        on:input={textAreaAdjust}
      />
    </div>
  </div>

  <!-- End Comment Form -->
  <div class="flex justify-end py-4 space-x-2">
    {#if $template}
      <button
        type="button"
        class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-red-600 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-red-500 dark:focus:ring-offset-gray-800"
        on:click|preventDefault|stopPropagation={(e) => {
          $open = true
        }}
      >
        <svg
          class="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
        Delete
      </button>
    {/if}

    <button
        type="button"
      class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      on:click={() => nav.back()}
    >
      Cancel
    </button>

    <button
      type="submit"
      class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
    >
      {#if !$template}
        <svg
          class="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      {/if}
      {$template ? "Apply changes" : "Create"}
    </button>
  </div>
</form>
