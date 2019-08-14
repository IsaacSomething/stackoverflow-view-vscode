<script>
  import { fade } from "svelte/transition";

  export let title;
  export let asked;
  export let active;
  export let viewed;
</script>

<style>
  .title-container {
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 20px;
  }
  .title-container {
    font-weight: 100;
  }
</style>

<div class="title-container" in:fade>
  <!-- <small on:click={navigateBack}>back</small> -->
  <h1>{decodeURIComponent(title)}</h1>
  <div>
    Asked
    <span>{asked}</span>
    Active
    <span>{active}</span>
    Viewed
    <span>{viewed} times</span>
  </div>
</div>
