<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { fromUnixTime, formatDistanceToNow } from "date-fns";

  export let title;
  export let asked;
  export let active;
  export let viewed;
  export let language;

  $: totalViews = kFormatter(viewed);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }
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
    {language.text.asked}
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(asked))}</strong>
    </span>
    {language.text.active}
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(active))}</strong>
    </span>
    {language.text.viewed}
    <span>
      <strong>{totalViews}</strong>
      {language.text.times}
    </span>
  </div>
</div>
