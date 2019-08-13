<script>
  import SearchInput from "./search/SearchInput.svelte";
  import SearchTitle from "./search/SearchTitle.svelte";
  import SearchResultBlock from "./search/SearchResultBlock.svelte";
  import Question from "./question/Question.svelte";

  let searchQuery;
  let searchContent;

  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    if (event.data.action === "search") {
      searchQuery = event.data.query;
      fetch(
        `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=${searchQuery}&answers=1&site=stackoverflow&filter=withbody`
      ).then(response => {
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

<!-- <SearchInput {searchQuery} {searchContent} /> -->

<Question />

{#if searchContent}
  <SearchResultBlock {searchContent} />
{:else}Loading Results...{/if}
