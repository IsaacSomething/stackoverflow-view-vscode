<script>
  import Leet from "./common/Leet.svelte";
  import Question from "./question/Question.svelte";
  import Search from "./search/Search.svelte";

  const vscode = acquireVsCodeApi();
  let searchQuery;
  let searchData;
  let section;
  let questionId;
  let gif;
  let totalResults;
  let isLoading;
  let eventAction;

  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    eventAction = event.data.action;
    console.log("searchQuery", searchQuery);
    if (event.data.action === "topPick") {
      questionId = event.data.questionId;
      gif = event.data.gif;
      section = "question";
    } else if (event.data.action === "search" && event.data.query === "1337") {
      section = "leeeeeeet";
    } else if (event.data.action === "search") {
      searchQuery = event.data.query;
      section = "search";

      const baseUri = "https://api.stackexchange.com/2.2/";
      const filter = "!E-NkAUAPp-dl_BLxWqa1LE5g5C*VNBzgv9-ThQ";
      const key = "VP5SbX4dbH8MJUft7hjoaA((";
      const site = "stackoverflow";
      const uri = `${baseUri}search/advanced?q=${searchQuery}&page=1&pagesize=10&order=desc&sort=relevance&site=${site}&filter=${filter}&key=${key}`;

      fetch(uri).then(response => {
        if (response.status === 200) {
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
                console.log("ERROR:", error);
              }
            );
        }
      });
    }
  });

  // From SearchResultBlock component
  function handleGotoQuestion(event) {
    section = "question";
    questionId = event.detail.questionId;
  }

  // From back button click on question page
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
  .back {
    cursor: pointer;
  }
  .back span::before {
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    display: inline-block;
    height: 0.45em;
    left: 0;
    position: relative;
    top: 6px;
    transform: rotate(-135deg);
    vertical-align: top;
    width: 0.45em;
    cursor: pointer;
  }
</style>

<h3>
  {#if section === 'question' && eventAction === 'search'}
    <div class="back" on:click={handleGotoSearch}>
      <span />
      Back to search
      <strong>results</strong>
    </div>
  {:else}
    Stack
    <strong>overflow</strong>
  {/if}
</h3>

{#if section === 'question'}
  <Question {questionId} {vscode} {gif} />
{:else if section === 'leeeeeeet'}
  <Leet />
{:else if section === 'search'}
  <Search
    on:gotoQuestion={handleGotoQuestion}
    {searchQuery}
    {vscode}
    {searchData}
    {totalResults}
    {isLoading} />
{/if}
