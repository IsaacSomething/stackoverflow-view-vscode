<script>
  import Leet from "./common/Leet.svelte";
  import SearchInput from "./search/SearchInput.svelte";
  import SearchTitle from "./search/SearchTitle.svelte";
  import SearchResultBlock from "./search/SearchResultBlock.svelte";
  import Question from "./question/Question.svelte";

  let searchQuery;
  let searchData;
  let section;
  let questionId;

  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    console.log("primary event", event);

    if (searchQuery === "1337") {
      section = "leeeeeeet";
    } else if (event.data.action === "topPick") {
      questionId = event.data.questionId;
      section = "question";
    } else if (event.data.action === "search") {
      const baseUri = "https://api.stackexchange.com/2.2/";
      const filter =
        "!*HLLcWlQCK43*mBSve5VfxaFn4ViZXqgUbGGE_mAAV)uESSvP55ushhPKq26Nm";
      const key = "VP5SbX4dbH8MJUft7hjoaA((";
      const site = "stackoverflow";
      /* `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=${searchQuery}&answers=1&site=stackoverflow&filter=withbody` */
      /* /advanced?page=1&pagesize=10&order=desc&sort=activity&q=base64&site=stackoverflow */
      const uri = `${baseUri}search/advanced?q=${searchQuery}?order=desc&sort=votes&site=${site}&filter=${filter}&key=${key}`;

      fetch(uri).then(response => {
        console.log("data", response.clone().json());
        if (response.status === 200) {
          response
            .clone()
            .json()
            .then(data => {
              section = "search";
              searchQuery = event.data.query;
              searchData = data;
            });
        }
      });
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

{#if section === 'question'}
  <Question on:gotoSearch={handleGotoSearch} {questionId} />
{:else if section === 'leeeeeeet'}
  <Leet />
{:else if section === 'search'}
  {#if searchData}
    <SearchTitle />
    <SearchInput {searchQuery} {searchData} />
    <SearchResultBlock {searchData} on:gotoQuestion={handleGotoQuestion} />
  {:else if searchData.items.length === 0}
    <h1>No Results Found</h1>
  {/if}
{/if}
