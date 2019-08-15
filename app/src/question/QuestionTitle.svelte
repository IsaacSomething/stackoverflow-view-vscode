<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { fromUnixTime, formatDistanceToNow } from "date-fns";

  export let title;
  export let asked;
  export let active;
  export let viewed;
</script>

<style>
  .title-container {
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 20px;
    margin-bottom: 4px;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 6px;
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
    Asked
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(asked))}</strong>
    </span>
    Active
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(active))}</strong>
    </span>
    Viewed
    <span>
      <strong>{viewed}</strong>
      times
    </span>
  </div>
</div>
