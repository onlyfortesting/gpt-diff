<script>
  import { page, nav, command } from "./app"

  function textAreaAdjust(e) {
    this.style.height = "auto"
    this.style.overflowY = "hidden"

    this.style.height = this.scrollHeight + "px"
  }

  export let data

  let prompt = data.prompt.replace("{{text}}", data.text || "")
  let response = data.response
</script>

<form class="flex flex-col relative grow" on:submit={(e) => {}}>
  <div class="mb-4 sm:mb-8">
    <label
      for="hs-feedback-post-comment-textarea-1"
      class="block mb-2 text-sm font-medium dark:text-white">Prompt</label
    >

    <div class="mt-2">
      <textarea
        readonly
        value={prompt}
        class="resize-none min-h-[200px] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        on:input={textAreaAdjust}
      />
    </div>
  </div>

  <div class="mb-4 sm:mb-8">
    <label
      for="hs-feedback-post-comment-textarea-1"
      class="block mb-2 text-sm font-medium dark:text-white">Response</label
    >

    <div class="mt-2">
      <textarea
        readonly
        value={response}
        class="resize-none min-h-[200px] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        on:input={textAreaAdjust}
      />
    </div>
  </div>

  <div class="flex justify-end py-4 space-x-2">
    <button
      class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      on:click={() => nav.back()}
    >
      Cancel
    </button>

    <!-- <button -->
    <!--   type="submit" -->
    <!--   class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" -->
    <!-- > -->
    <!--   <svg -->
    <!--     class="w-3 h-3" -->
    <!--     xmlns="http://www.w3.org/2000/svg" -->
    <!--     width="16" -->
    <!--     height="16" -->
    <!--     viewBox="0 0 16 16" -->
    <!--     fill="none" -->
    <!--   > -->
    <!--     <path -->
    <!--       d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" -->
    <!--       stroke="currentColor" -->
    <!--       stroke-width="2" -->
    <!--       stroke-linecap="round" -->
    <!--     /> -->
    <!--   </svg> -->
    <!--   Generate -->
    <!-- </button> -->
  </div>
</form>
