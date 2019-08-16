<script>
  import Leet from "./common/Leet.svelte";
  import Header from "./common/Header.svelte";
  import Question from "./question/Question.svelte";
  import Search from "./search/Search.svelte";

  const vscode = acquireVsCodeApi();
  let section;
  let searchQuery;
  let searchData;
  let questionId;
  let totalResults;
  let isLoading;
  let eventAction;
  let language;
  let gif;

  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    eventAction = event.data.action;

    if (event.data.action === "topPick") {
      questionId = event.data.questionId;
      gif = event.data.gif;
      section = "question";
    } else if (event.data.action === "search" && event.data.query === "1337") {
      section = "leeeeeeet";
    } else if (event.data.action === "search") {
      searchQuery = event.data.query;
      section = "search";
      language = event.data.language;
      console.log("event.data", event.data);

      const baseUri = "https://api.stackexchange.com/2.2";
      const filter = "!E-NkAUAPp-dl_BLxWqa1LE5g5C*VNBzgv9-ThQ";
      const key = "VP5SbX4dbH8MJUft7hjoaA((";
      const site = `${language.code}stackoverflow`;
      const uri = `${baseUri}/search/advanced?q=${searchQuery}&page=1&pagesize=10&order=desc&sort=relevance&site=${site}&filter=${filter}&key=${key}`;

      fetch(uri).then(response => {
        if (response.status === 200) {
          response
            .clone()
            .json()
            .then(
              data => {
                searchData = data.items;
                totalResults = data.total;
                isLoading = false;

                console.log("searchData", searchData);

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

  // /common/tag
  function handleTagSearch(tag) {
    console.log("tag", tag.detail.tag);
  }
</script>

<Header on:goBack={handleGotoSearch} {language} {section} {eventAction} />

{#if section === 'question'}
  <Question {questionId} {language} {vscode} {gif} />
{:else if section === 'leeeeeeet'}
  <Leet />
{:else if section === 'search'}
  <Search
    on:gotoQuestion={handleGotoQuestion}
    on:searchByTag={handleTagSearch}
    {searchQuery}
    {vscode}
    {searchData}
    {totalResults}
    {isLoading} />
{/if}
