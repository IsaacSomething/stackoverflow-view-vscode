<script>
  import { createEventDispatcher } from "svelte";

  export let language;
  export let searchQuery = "";
  let searchQueryPreviousValue;

  function handleSearchByEnterKey(event) {
    if (
      event.keyCode === 13 &&
      searchQuery !== "" &&
      searchQuery !== searchQueryPreviousValue
    ) {
      search();
    }
  }

  const dispatch = createEventDispatcher();
  function search(event) {
    searchQueryPreviousValue = searchQuery;
    dispatch("searchInput", { query: searchQuery });
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
    border-radius: 2px;
  }
  .search-input-container button {
    min-width: 100px;
    max-width: 100px;
  }
</style>

<svelte:window on:keydown={handleSearchByEnterKey} />

<div class="search-input-container">

  <p>
    {language.text.results_for}
    <strong>
      <i>
        {#if searchQuery}{searchQuery}{/if}
      </i>
    </strong>
  </p>

  <input type="text" bind:value={searchQuery} />

  <button on:click={search} disabled={!searchQuery}>
    {language.text.search}
  </button>

</div>
