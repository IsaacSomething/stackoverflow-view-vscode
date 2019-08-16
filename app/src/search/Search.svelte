<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";
  import SearchResultBlock from "./SearchResultBlock.svelte";
  import SearchNoResults from "./SearchNoResults.svelte";
  import SearchResultsActions from "./SearchResultActions.svelte";

  export let vscode;
  export let searchQuery;
  export let searchData;
  export let totalResults;
  export let isLoading = true;
</script>

<SearchTitle />
<SearchInput {searchQuery} />
<SearchResultsActions {totalResults} />
{#if isLoading}
  Loading Search Results...
{:else if !isLoading && searchData.length === 0}
  <SearchNoResults {searchQuery} />
{:else}
  <SearchResultBlock {searchData} on:gotoQuestion on:searchByTag/>
{/if}
