<script>
  import { navigating } from "$app/stores";
</script>

{#if $navigating}
  <div class="fixed top-0 z-50 w-full">
    <div class="progress-bar bg-transparent">
      <div class="progress-bar-value bg-blue-500 rounded-full" />
    </div>
  </div>
  <!-- <div -->
  <!--   transition:fadeScale|global={{ duration: 400, scale: 0.7, easing: cubicInOut }} -->
  <!--   class="fixed right-4 top-4 pointer-events-none bg-transparent" -->
  <!-- > -->
  <!--   <svg -->
  <!--     class="animate-spin h-7 w-7 text-blue-700" -->
  <!--     xmlns="http://www.w3.org/2000/svg" -->
  <!--     fill="none" -->
  <!--     viewBox="0 0 24 24" -->
  <!--   > -->
  <!--     <circle -->
  <!--       class="opacity-25" -->
  <!--       cx="12" -->
  <!--       cy="12" -->
  <!--       r="10" -->
  <!--       stroke="currentColor" -->
  <!--       stroke-width="4" -->
  <!--     /> -->
  <!--     <path -->
  <!--       class="opacity-75" -->
  <!--       fill="currentColor" -->
  <!--       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" -->
  <!--     /> -->
  <!--   </svg> -->
  <!-- </div> -->
{/if}
