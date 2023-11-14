<script>
  import { nav, page, command, template } from "./app"

  function textAreaAdjust(e) {
    this.style.height = "auto"
    this.style.overflowY = "hidden"

    this.style.height = this.scrollHeight + "px"
  }

  let prompt = ""
  let type = "generate"
</script>

<form
  class="flex flex-col relative grow"
  on:submit={(e) => {
    $template = {
      type: "generate",
      prompt: prompt,
    }
    nav.goto("diff-editor")
  }}
>
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
    <button
      class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      on:click={() => nav.back()}
    >
      Cancel
    </button>

    <button
      type="submit"
      class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
    >
      <!-- <svg -->
      <!--   class="w-3 h-3" -->
      <!--   xmlns="http://www.w3.org/2000/svg" -->
      <!--   width="16" -->
      <!--   height="16" -->
      <!--   viewBox="0 0 16 16" -->
      <!--   fill="none" -->
      <!-- > -->
      <!--   <path -->
      <!--     d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" -->
      <!--     stroke="currentColor" -->
      <!--     stroke-width="2" -->
      <!--     stroke-linecap="round" -->
      <!--   /> -->
      <!-- </svg> -->
      Generate
    </button>
  </div>
</form>
