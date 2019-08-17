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
  let isLoading = true;
  let eventAction;
  let tagData;

  let language;
  let sortTypes;
  let selectedSort;
  let gif;
  let page = 1;

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
      sortTypes = event.data.sortTypes;
      selectedSort = sortTypes.find(element => element.isSelected);
      section = "search";
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

  // Set tag page
  function handleGotoTag() {
    section = "tag";
  }

  // Removes tag excerpt and adds search input
  function handleEnableSearch() {
    tagData = null;
  }

  // Search by search input box
  function handleInputSearch(event) {
    searchQuery = event.detail.query;
    search();
  }

  // Change sort & search
  function handleSortChange(event) {
    selectedSort = event.detail.selectedSort;
    search();
  }

  // Search by selected tag
  function handleTagSearch(event) {
    const selectedTag = event.detail.tag;
    if (selectedTag) {
      const baseUri = "https://api.stackexchange.com/2.2";
      const filter = "!Fu4hf8)e-ZPMLisJD6KbEP37j-";
      const key = "VP5SbX4dbH8MJUft7hjoaA((";
      const uri = `${baseUri}/tags/${selectedTag}/wikis?site=stackoverflow&filter=${filter}&key=${key}`;

      fetch(uri).then(response => {
        if (response.status === 200) {
          response
            .clone()
            .json()
            .then(data => {
              tagData = data.items[0];
            });
        }
      });

      searchQuery = selectedTag;
      search();
    }
  }

  // Main search functionality
  function search() {
    searchStartResetData();

    const baseUri = "https://api.stackexchange.com/2.2";
    const filter = "!6hZ6dglG-BiYJou9Z(tZVYJRjfjw2FfHacerRTypmqpeKv";
    const key = "VP5SbX4dbH8MJUft7hjoaA((";
    const site = `${language.code}stackoverflow`;
    const uri = `${baseUri}/search/advanced?q=${searchQuery}&page=${page}&pagesize=10&order=desc&sort=${selectedSort.apiReference}&site=${site}&filter=${filter}&key=${key}`;

    fetch(uri).then(response => {
      isLoading = false;

      if (response.status === 200) {
        response
          .clone()
          .json()
          .then(data => {
            console.log("searchData", data);
            searchData = data.items;
            totalResults = data.total;
            vscode.postMessage({
              command: "progress",
              action: "stop",
              error: false
            });
          });
      } else {
        vscode.postMessage({
          command: "progress",
          action: "stop",
          error: true,
          errorMessage: "An error has error."
        });
      }
    });
  }

  function searchStartResetData() {
    isLoading = true;
    vscode.postMessage({ command: "progress", action: "start", error: false });
    totalResults = null;
    searchData = null;
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
    on:gotoTag={handleGotoTag}
    on:searchByTag={handleTagSearch}
    on:searchInput={handleInputSearch}
    on:sortChange={handleSortChange}
    on:enableSearch={handleEnableSearch}
    {searchQuery}
    {vscode}
    {searchData}
    {totalResults}
    {isLoading}
    {tagData}
    {sortTypes} />
{:else if section === 'tag'}
  <Tag {tagData} />
{/if}
