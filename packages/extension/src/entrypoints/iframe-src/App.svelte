<script>
  import { command } from "shared/app"
  import Page from "shared/+page.svelte"
  import { createDialog, melt } from "@melt-ui/svelte"

  const {
    elements: { portalled, overlay, content, close },
    states: { open },
  } = createDialog({
    defaultOpen: true,
    onOpenChange({ curr, next }) {
      if (next == false) command.exit()
      return next
    },
  })
</script>

<div use:portalled>
  {#if $open}
    <div use:melt={$overlay} class="fixed inset-0 bg-black/50" />
    <div use:melt={$content} class="contents">
      <Page />
    </div>
  {/if}
</div>
