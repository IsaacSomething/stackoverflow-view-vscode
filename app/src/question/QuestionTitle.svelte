<script>
  import { i18n } from "../stores/i18n.js";
  import { kFormatter } from "../stores/k-formatter.js";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { fromUnixTime, formatDistanceToNow } from "date-fns";

  export let title;
  export let asked;
  export let active;
  export let viewed;

  $: totalViews = kFormatter(viewed);
</script>

<style>
  .title-container {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 20px;
    margin-bottom: 4px;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 6px;
    word-break: break-word;
  }
  span {
    margin-right: 20px;
  }
</style>

<div class="title-container" in:fade>

  <h1>
    {@html title}
  </h1>
  <div>
    {$i18n.text.asked}
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(asked))}</strong>
    </span>
    {$i18n.text.active}
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(active))}</strong>
    </span>
    {$i18n.text.viewed}
    <span>
      <strong>{totalViews}</strong>
      {$i18n.text.times}
    </span>
  </div>
</div>
