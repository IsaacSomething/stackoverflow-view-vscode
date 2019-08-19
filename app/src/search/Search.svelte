<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";
  import SearchResultBlock from "./SearchResultBlock.svelte";
  import SearchNoResults from "./SearchNoResults.svelte";
  import SearchResultsActions from "./SearchResultActions.svelte";
  import Loader from "../common/Loader.svelte";

  export let vscode;
  export let searchQuery;
  export let searchData;
  export let totalResults;
  export let tagData;
  export let sortTypes;
  export let isLoading = true;
</script>

<SearchTitle {tagData} on:gotoTag />

{#if !tagData}
  <SearchInput {searchQuery} on:searchInput />
{/if}

<SearchResultsActions
  {sortTypes}
  {tagData}
  {totalResults}
  on:sortChange
  on:enableSearch />

{#if isLoading}
  <Loader />
{/if}

{#if !isLoading && searchData}
  {#if searchData.length > 0}
    <SearchResultBlock
      {isLoading}
      {searchData}
      on:gotoQuestion
      on:searchByTag />
  {:else}
    <SearchNoResults {searchQuery} />
  {/if}
{/if}
