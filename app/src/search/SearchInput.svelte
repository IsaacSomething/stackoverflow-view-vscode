<script>
  import { createEventDispatcher } from "svelte";
  import { i18n } from "../stores/i18n.js";

  export let searchQuery;
  let searchQueryPreviousValue = searchQuery;

  function handleSearchByEnterKey(event) {
    if (
      event.keyCode === 13 &&
      searchQuery !== "" &&
      searchQuery !== searchQueryPreviousValue
    ) {
      search();
    }
  }

  function handleSearchByClick() {
    if (searchQuery === searchQueryPreviousValue || searchQuery === "") {
      return;
    } else {
      search();
    }
  }

  const dispatch = createEventDispatcher();
  function search() {
    searchQueryPreviousValue = searchQuery;
    dispatch("searchInput", { query: searchQuery });
  }
</script>

<style>
  section {
    display: block;
  }
  section p {
    margin-bottom: 0;
  }
  section p span {
    font-weight: bold;
    font-style: italic;
  }
  section input {
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
  section button {
    min-width: 100px;
    max-width: 100px;
  }
</style>

<svelte:window on:keydown={handleSearchByEnterKey} />

<section>

  <p>
    {$i18n.text.results_for}
    <span>
      {#if searchQueryPreviousValue}{searchQueryPreviousValue}{/if}
    </span>
  </p>

  <input type="text" bind:value={searchQuery} />
  <button on:click={handleSearchByClick}>{$i18n.text.search}</button>

</section>
