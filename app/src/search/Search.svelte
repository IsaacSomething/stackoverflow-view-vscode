<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";
  import SearchResultBlock from "./SearchResultBlock.svelte";
  import SearchNoResults from "./SearchNoResults.svelte";
  import SearchResultsActions from "./SearchResultActions.svelte";

  export let vscode;
  export let searchQuery;
  let searchData;
  let totalResults;
  let isLoading = true;

  const baseUri = "https://api.stackexchange.com/2.2/";
  const filter = "!E-NkAUAPp-dl_BLxWqa1LE5g5C*VNBKpydoTSQ";
  const key = "VP5SbX4dbH8MJUft7hjoaA((";
  const site = "stackoverflow";
  const uri = `${baseUri}search/advanced?q=${searchQuery}&page=1&pagesize=10&order=desc&sort=relevance&site=${site}&filter=${filter}&key=${key}`;

  fetch(uri).then(response => {
    if (response.status === 200) {
      console.log("search", response);

      response
        .clone()
        .json()
        .then(
          data => {
            console.log("searchData", data);
            searchData = data.items;
            totalResults = data.total;
            isLoading = false;
            vscode.postMessage({
              command: "progress",
              action: "stop"
            });
          },
          error => {
            // TODO: maybe post a message and so an error alert.
            // Could then let user decide if they want to try another search
            // which will take them to the search page or just cancel everything
            console.log("ERROR:", error);
          }
        );
    }
  });
</script>

<SearchTitle />
<SearchInput {searchQuery} />
<SearchResultsActions {totalResults} />
{#if isLoading}
  Loading Search Results...
{:else if !isLoading && searchData.length === 0}
  <SearchNoResults {searchQuery} />
{:else}
  <SearchResultBlock {searchData} on:gotoQuestion on:navigateBack />
{/if}
