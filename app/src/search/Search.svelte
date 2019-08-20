<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";
  import SearchResultBlock from "./SearchResultBlock.svelte";
  import SearchNoResults from "./SearchNoResults.svelte";
  import SearchResultsActions from "./SearchResultActions.svelte";
  import SearchPager from "./SearchPager.svelte";
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

<SearchInput {searchQuery} on:searchInput />

<SearchResultsActions
  {sortTypes}
  {tagData}
  {totalResults}
  on:sortChange
  on:enableSearch />

{#if isLoading}
  <Loader />
{/if}

{#if searchData && totalResults !== 0}
  <SearchResultBlock {isLoading} {searchData} on:gotoQuestion on:searchByTag />
{:else if !isLoading}
  <SearchNoResults {searchQuery} />
{/if}

<SearchPager {totalResults} on:searchByPage />
