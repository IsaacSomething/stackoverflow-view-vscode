<script>
  import Leet from "./common/Leet.svelte";
  import SearchInput from "./search/SearchInput.svelte";
  import SearchTitle from "./search/SearchTitle.svelte";
  import SearchResultBlock from "./search/SearchResultBlock.svelte";
  import Question from "./question/Question.svelte";

  let searchQuery;
  let searchContent;
  let section;
  let questionId;

  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    console.log("event,event", event);

    if (event.data.action === "search") {
      searchQuery = event.data.query;

      if (searchQuery === "1337") {
        section = "leeeeeeet";
      } else {
        fetch(
          `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=${searchQuery}&answers=1&site=stackoverflow&filter=withbody`
        ).then(response => {
          console.log("data", response.clone().json());
          if (response.ok) {
            response
              .clone()
              .json()
              .then(data => {
                section = "search";
                searchContent = data;
              });
          }
        });
      }
    } else if (event.data.action === "topPick") {
      questionId = event.data.questionId;
      section = "question";
    }
  });

  // From SearchResultBlock component
  function handleGotoQuestion(event) {
    console.log("event", event);
    section = "question";
    questionId = event.detail.questionId;
  }

  function handleGotoSearch() {
    section = "search";
  }
</script>

<style>
  h3 {
    font-weight: normal;
    color: var(--vscode-textLink-foreground);
    margin: 0;
  }
</style>

<h3>
  Stack
  <strong>overflow</strong>
</h3>

{#if searchContent && section === 'search'}
  <SearchTitle />
  <SearchInput {searchQuery} {searchContent} />
  <SearchResultBlock {searchContent} on:gotoQuestion={handleGotoQuestion} />
{:else if searchContent && searchContent.items.length === 0}
  <h1>No Results Found</h1>
{:else}Loading Results...{/if}

{#if section === 'question'}
  <Question on:gotoSearch={handleGotoSearch} {questionId} />
{/if}

{#if section === 'leeeeeeet'}
  <Leet />
{/if}
