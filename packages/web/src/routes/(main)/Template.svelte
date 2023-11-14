<script>
  import { nav, page, template as tpl } from "./app"

  export let template
  export let disabled = false

  function isFirstCharEmoji(text) {
    return text.match(
      /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]+/u
    )
  }

  let emojiMatch = isFirstCharEmoji(template.name)
</script>

<div
  class="relative bg-white p-4 transition duration-300 rounded-md dark:bg-gray-800 select-none group
  {!disabled ? 'hover:bg-gray-100 cursor-pointer' : 'grayscale'}"
  on:click={(e) => {
    if (disabled) return

    $tpl = template
    nav.goto("diff-editor")
  }}
>
  <div class="flex">
    {#if emojiMatch}
      <div
        class="mt-1.5 flex justify-center text-2xl flex-shrink-0 rounded-l-xl"
      >
        {emojiMatch[0]}
      </div>
    {/if}

    <div class="grow ml-6">
      <h3 class="text-sm font-semibold text-blue-600 dark:text-blue-500">
        {emojiMatch ? template.name.replace(emojiMatch[0], "") : template.name}
      </h3>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-500">
        {template.description}
      </p>
    </div>
  </div>
  <button
    class="absolute top-0 right-0 text-gray-400 opacity-0 group-hover:opacity-100 p-1 m-2 hover:bg-black/5 rounded"
    on:click={() => {
      $tpl = template
      nav.goto("template-editor")
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-6v4m0 4v8m4-4a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-12v10m0 4v2m4-13a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-3v1m0 4v11"
      /></svg
    ></button
  >
</div>
