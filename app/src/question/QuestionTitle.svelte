<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { fromUnixTime, formatDistanceToNow } from "date-fns";

  export let title;
  export let asked;
  export let active;
  export let viewed;

  const dispatch = createEventDispatcher();
  function navigateBack() {
    dispatch("back", {
      isBack: true
    });
  }
</script>

<style>
  .title-container {
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 20px;
    margin-bottom: 4px;
  }
  h1 {
    margin-bottom: 6px;
  }
  span {
    margin-right: 20px;
  }
  .back::before {
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    display: inline-block;
    height: 0.45em;
    left: 12px;
    position: relative;
    top: 13px;
    transform: rotate(-135deg);
    vertical-align: top;
    width: 0.45em;
    cursor: pointer;
  }
</style>

<div class="title-container" in:fade>
  <!-- <small on:click={navigateBack}>back</small> -->

  <h1>
    <span class="back" on:click={navigateBack} />
    {title}
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
