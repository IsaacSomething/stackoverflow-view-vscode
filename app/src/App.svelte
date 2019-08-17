<script>
  import Leet from "./common/Leet.svelte";
  import Header from "./common/Header.svelte";
  import Question from "./question/Question.svelte";
  import Search from "./search/Search.svelte";
  import Tag from "./tag/tag.svelte";

  const vscode = acquireVsCodeApi();
  let section;
  let searchQuery;
  let searchData;
  let questionId;
  let totalResults;
  let isLoading;
  let eventAction;
  let tagData;

  let language;
  let gif;
  let page = 1;
  let sort = "relevance";

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
      language = event.data.language;
      section = "search";
      tagData = null;
      // Search
      search();
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

  function handleGotoTag() {
    section = "tag";
  }

  // Search by selected tag
  function handleTagSearch(tag) {
    console.log("tag", tag.detail.tag);

    if (tag.detail.tag) {
      const selectedTag = tag.detail.tag;
      const baseUri = "https://api.stackexchange.com/2.2";
      const filter = "!Fu4hf8)e-ZPMLisJD6KbEP37j-";
      const key = "VP5SbX4dbH8MJUft7hjoaA((";
      const uri = `${baseUri}/tags/${selectedTag}/wikis?site=stackoverflow&filter=${filter}&key=${key}`;

      fetch(uri).then(response => {
        if (response.status === 200) {
          response
            .clone()
            .json()
            .then(
              data => {
                tagData = data.items[0];
                console.log("tag data", tagData);
              },
              error => {
                console.log("ERROR", error);
              }
            );
        }
      });

      searchQuery = selectedTag;
      search();
    }
  }

  // Main search functionality
  function search() {
    const baseUri = "https://api.stackexchange.com/2.2";
    const filter = "!6hZ6dglG-BiYJou9Z(tZVYJRjfjw2FfHacerRTypmqpeKv";
    const key = "VP5SbX4dbH8MJUft7hjoaA((";
    const site = `${language.code}stackoverflow`;
    const uri = `${baseUri}/search/advanced?q=${searchQuery}&page=${page}&pagesize=10&order=desc&sort=${sort}&site=${site}&filter=${filter}&key=${key}`;

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
    //TODO: srcoll to top?
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
    on:gotoTag={handleGotoTag}
    {searchQuery}
    {vscode}
    {searchData}
    {totalResults}
    {isLoading}
    {tagData} />
{:else if section === 'tag'}
  <Tag {tagData} />
{/if}
