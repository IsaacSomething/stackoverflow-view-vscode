<script>
  export let searchQuery = "";

  function search(event) {
    // TODO: if advanced search tips is open then close it.
  }
</script>

<style>
  .search-input-container {
    display: block;
  }
  .search-input-container p {
    margin-bottom: 0;
  }
  .search-input-container input {
    background-color: var(--vscode-input-background);
    border: 0;
    box-shadow: 0 0 0 1px var(--vscode-input-border);
    margin-top: 12px;
    margin-bottom: 12px;
    margin-right: 5px;
    color: var(--vscode-input-foreground);
    padding: 5px;
    height: 17px;
    width: calc(100% - 120px);
  }
  .search-input-container button {
    min-width: 100px;
    max-width: 100px;
  }
</style>

<div class="search-input-container">
  {#if searchQuery}
    <p>
      Results for
      <strong>
        <i>{searchQuery}</i>
      </strong>
    </p>
  {/if}
  <input type="text" bind:value={searchQuery} />
  <button on:click={search}>Search</button>
</div>
