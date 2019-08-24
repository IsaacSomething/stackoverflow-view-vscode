<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";
  import ResultsBar from "../Common/ResultsBar.svelte";
  import SearchItem from "./SearchItem.svelte";
  import SearchNoResults from "./SearchNoResults.svelte";
  import SearchPager from "./SearchPager.svelte";
  import Loader from "../common/Loader.svelte";

  export let searchData;
  export let totalResults;
  export let tagData;
  export let isLoading;
</script>

<SearchTitle {tagData} on:gotoTagLearnMore />

<SearchInput {tagData} {isLoading} on:searchInput />

<ResultsBar results={totalResults} {isLoading} on:filterChange />

{#if isLoading}
  <Loader />
{/if}

{#if searchData && totalResults !== 0}
  <SearchItem {isLoading} {searchData} on:gotoQuestion on:searchByTag />
{:else if !isLoading}
  <SearchNoResults />
{/if}

<SearchPager {totalResults} on:searchByPage />
