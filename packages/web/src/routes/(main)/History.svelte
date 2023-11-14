<script>
  import { history, nav, page } from "./app"
  import truncate from "just-truncate"
  import dayjs from "dayjs"
  import HistoryPage from "./HistoryPage.svelte"
  import { localExtStorage } from "@webext-core/storage"

  let pagination = 1
  let per_page = 20

  $: historyList = $history.slice(
    per_page * (pagination - 1),
    per_page * pagination
  )
</script>

<div class="-m-4 w-[calc(100%+2rem)]">
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead class="bg-gray-50 dark:bg-slate-800">
      <tr>
        <th scope="col" class="px-6 py-3 text-left">
          <div class="flex items-center gap-x-2">
            <span
              class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
            >
              Prompt
            </span>
          </div>
        </th>

        <th scope="col" class="px-6 py-3 text-left">
          <div class="flex items-center gap-x-2">
            <span
              class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
            >
              Response
            </span>
          </div>
        </th>

        <th scope="col" class="px-6 py-3 text-left">
          <div class="flex items-center gap-x-2">
            <span
              class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
            >
              Date
            </span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
      {#each historyList as h (h.id)}
        <tr
          class="bg-white hover:bg-gray-50 cursor-pointer dark:bg-slate-900 dark:hover:bg-slate-800"
          on:click={() =>
            nav.goto({ component: HistoryPage, props: { data: h } })}
        >
          <td class="h-px w-72 min-w-[18rem]">
            <div class="block h-full p-6">
              <div class="block text-sm text-gray-500 whitespace-pre-line">
                {truncate(h.prompt.replace("{{text}}", h.text || ""), 500)}
              </div>
            </div>
          </td>

          <td class="h-px w-72 min-w-[18rem]">
            <div class="block h-full p-6">
              <div class="block text-sm text-gray-500 whitespace-pre-line">
                {truncate(h.response, 500)}
              </div>
            </div>
          </td>
          <td class="h-px w-px whitespace-nowrap">
            <div class="block h-full p-6">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {dayjs(h.date).format("D MMM, HH:mm")}
              </p>
            </div>
          </td>
          <!-- <td class="h-px w-px whitespace-nowrap"> -->
          <!--   <a class="block h-full p-6" href="#"> -->
          <!--     <span -->
          <!--       class="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" -->
          <!--     > -->
          <!--       <svg -->
          <!--         class="w-2.5 h-2.5" -->
          <!--         xmlns="http://www.w3.org/2000/svg" -->
          <!--         width="16" -->
          <!--         height="16" -->
          <!--         fill="currentColor" -->
          <!--         viewBox="0 0 16 16" -->
          <!--       > -->
          <!--         <path -->
          <!--           d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" -->
          <!--         /> -->
          <!--       </svg> -->
          <!--       Published -->
          <!--     </span> -->
          <!--   </a> -->
          <!-- </td> -->
        </tr>
      {/each}
    </tbody>
  </table>
  <!-- End Table -->

  <!-- Footer -->
  <div
    class="px-6 py-4 grid gap-3 md:flex md:justify-end md:items-center border-t border-gray-200 dark:border-gray-700"
  >
    <div class="flex justify-between items-center w-full">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        <span class="font-semibold text-gray-800 dark:text-gray-200"
          >{$history.length}</span
        > results
      </p>
      <div class="inline-flex gap-x-2">
        {#if pagination > 1}
          <button
            type="button"
            class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            on:click={() => (pagination = Math.max(0, pagination - 1))}
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
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
            Prev
          </button>
        {/if}

        {#if pagination * per_page < $history.length}
          <button
            type="button"
            class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            on:click={() =>
              (pagination = Math.min($history.length, pagination + 1))}
          >
            Next
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        {/if}
      </div>
    </div>
  </div>
  <!-- End Footer -->
</div>
