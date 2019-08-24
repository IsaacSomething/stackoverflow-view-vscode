<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { page, searchQuery } from "../stores/common.js";
  import { i18n } from "../stores/i18n.js";

  export let tagData;
  export let isLoading;
  let searchQueryPreviousValue;

  onMount(() => {
    searchQueryPreviousValue = $searchQuery;
  });

  $: isLoading && (searchQueryPreviousValue = $searchQuery);

  function handleSearchByEnterKey(event) {
    if (event.keyCode === 13) {
      handleSearch();
    }
  }

  function handleSearch() {
    if (
      !isLoading &&
      $searchQuery !== searchQueryPreviousValue &&
      $searchQuery !== ""
    ) {
      search();
    }
  }

  const dispatch = createEventDispatcher();
  function search() {
    page.set(1);
    searchQueryPreviousValue = $searchQuery;
    dispatch("searchInput");
  }
</script>

<style>
  section {
    display: block;
    margin-top: 24px;
  }
  section div {
    margin-bottom: 0;
    display: block;
  }
  section input {
    background-color: var(--vscode-input-background);
    box-shadow: 0 0 0 1px var(--vscode-input-border);
    color: var(--vscode-input-foreground);
    border: 0;
    border-radius: 2px;
    margin: 8px 5px 12px 0;
    padding: 5px;
    height: 17px;
    width: calc(100% - 120px);
  }
  section button {
    min-width: 100px;
    max-width: 100px;
  }
</style>

<svelte:window on:keydown={handleSearchByEnterKey} />

<section>

  <div class="text-capitalize">
    {$i18n.text.results_for}
    <strong>
      <i>
        {#if searchQueryPreviousValue}{searchQueryPreviousValue}{/if}
      </i>
    </strong>
  </div>

  <input type="text" bind:value={$searchQuery} />

  <button on:click={handleSearch} class="text-capitalize">
    {$i18n.text.search}
  </button>

</section>
