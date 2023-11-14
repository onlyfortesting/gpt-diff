<script>
  import Tiptap from "./Tiptap.svelte"
  import { totalDiff, template, command, editable } from "./app"

  let controller
  let error
  let status
  let editor

  let type = $template.type
</script>

<!-- Input -->
<div class="flex flex-col relative grow">
  {#if error}
    <div
      class="mb-4 bg-red-50 border border-red-200 rounded-md p-4"
      role="alert"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-4 w-4 text-red-400 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-sm text-red-800 font-semibold">
            {error.message}
          </h3>
        </div>
      </div>
    </div>
  {/if}
  <Tiptap
    bind:editor
    bind:controller
    onStatusChanged={(stat, data) => {
      status = stat
      console.log("status = " + stat)
      if (stat === "error") {
        error = data
        console.log({ error })
      } else error = null
    }}
  />
  <!-- <textarea -->
  <!--   class="p-4 pb-12 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" -->
  <!--   placeholder="Ask me anything..." -->
  <!-- /> -->

  <!-- Toolbar -->
  <div class="flex-grow p-2 rounded-b-md bg-white dark:bg-slate-900">
    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-700">
        <b class="font-semibold">{$totalDiff}</b> items remaining
      </div>
      <!-- Button Group -->
      <div class="flex items-center gap-x-2">
        {#if status === "done"}
          {#if $totalDiff > 0}
            <button
              type="button"
              class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-green-700 bg-green-200 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              on:click={(e) => {
                document
                  .querySelectorAll("[data-diff]")
                  .forEach((el) => el._resolve(true, true))
              }}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                ><path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m7 12l5 5L22 7M2 12l5 5m5-5l5-5"
                /></svg
              >
              Accept Remaining
            </button>

            <button
              type="button"
              class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-red-700 bg-red-200 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              on:click={(e) => {
                document
                  .querySelectorAll("[data-diff]")
                  .forEach((el) => el._resolve(false, true))
              }}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                ><path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 6L6 18M6 6l12 12"
                /></svg
              >
              Reject Remaining
            </button>
          {:else}
            <button
              class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border bg-blue-500 font-semibold text-white shadow-sm align-middle hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              on:click={() => {
                if (error) {
                  command.exit()
                  return
                }

                command.done(editor.getText())
              }}
            >
              {$editable ? "Done" : "Copy to clipboard"}
            </button>
          {/if}
        {/if}
        {#if status === "streaming"}
          <button
            type="button"
            class="py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            on:click={() => {
              controller.abortController?.abort()
            }}
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"
              />
            </svg>
            Stop generating
          </button>
        {:else if status === "aborted"}
          <!-- Generate Button -->
          <button
            class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            on:click={() => {
              controller.regenerate?.()
            }}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"
              /></svg
            >
            Regenerate
          </button>
          <!-- End Generate Button -->
        {/if}
      </div>
      <!-- End Button Group -->
    </div>
  </div>
  <!-- End Toolbar -->
</div>
<!-- End Input -->
