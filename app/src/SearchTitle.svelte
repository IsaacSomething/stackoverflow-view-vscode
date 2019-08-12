<script>
  import SearchTips from "./SearchTips.svelte";
  function showAdvancedTips() {}
</script>

<style>
  h3 {
    font-weight: normal;
    color: var(--vscode-textLink-foreground);
    margin: 0;
  }
  .title-container {
    display: block;
    width: 100%;
    height: 42px;
  }
  .title-container h1 {
    float: left;
    margin: 0;
  }
  .title-container span {
    padding: 11px 10px 11px 20px;
    display: inline-block;
  }
  .title-container span:hover {
    color: var(--vscode-textLink-foreground);
    cursor: pointer;
  }
</style>

<h3>
  Stack
  <strong>overflow</strong>
</h3>

<div class="title-container">
  <h1>Search Results</h1>
  <span on:click={showAdvancedTips()}>Advanced Search Tips</span>
</div>

<!-- <SearchTips /> -->
