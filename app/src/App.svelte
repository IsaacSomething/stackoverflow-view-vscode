<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";
  import SearchResultBlock from "./SearchResultBlock.svelte";

  let searchQuery;
  let searchContent;

  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    console.log("event", event);
    if (event.data.action === "search") {
      console.log("query", event.data.query);
      //
      searchQuery = event.data.query;
      fetch(
        `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=${searchQuery}&answers=1&site=stackoverflow&filter=withbody`
      ).then(response => {
        console.log("response", response);

        console.log("data", response.clone().json());

        if (response.ok) {
          response
            .clone()
            .json()
            .then(data => (searchContent = data));
        }
      });
    }
  });
</script>

<style>

</style>

<SearchTitle />

<SearchInput {searchQuery} {searchContent}/>
{#if searchContent}
  <SearchResultBlock {searchContent} />
{:else}Loading Results...{/if}
