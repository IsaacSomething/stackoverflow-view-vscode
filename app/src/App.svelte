<script>
  import { languages, i18n } from "./stores/i18n.js";
  import { uriSegments } from "./stores/static-models.js";
  import axios from "axios";
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

  let sortTypes;
  let selectedSort;
  let gif;
  let page = 1;

  // Posted properties on search from extension.ts => showInputBox()
  window.addEventListener("message", event => {
    eventAction = event.data.action;
    if (event.data.action === "topPick") {
      stopProgressMessage(false);
      $i18n = $languages[0];
      questionId = event.data.questionId;
      gif = event.data.gif;
      section = "question";
    } else if (event.data.action === "search" && event.data.query === "1337") {
      stopProgressMessage(false);
      section = "leeeeeeet";
    } else if (event.data.action === "search") {
      $i18n = $languages.find(_ => _.language === event.data.language);
      searchQuery = event.data.query;
      sortTypes = event.data.sortTypes;
      selectedSort = sortTypes.find(element => element.isSelected);
      section = "search";
      search();
    }
  });

  // From SearchResultBlock component
  function handleGotoQuestion(event) {
    section = "question";
    vscode.postMessage({
      command: "titleChange",
      title: `SO: ${event.detail.questionTitle}`
    });
    questionId = event.detail.questionId;
  }

  // From back button clicked on question page
  function handleGotoSearch() {
    section = "search";
    vscode.postMessage({
      command: "titleChange",
      title: `SO: ${searchQuery}`
    });
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
      const site = `${$i18n.code}stackoverflow`;
      const uri = `${uriSegments.baseUri}/tags/${selectedTag}/wikis?site=${site}&filter=${uriSegments.tagFilter}&key=${uriSegments.key}`;

      axios.get(uri).then(response => {
        if (response.status === 200) {
          tagData = response.data.items[0];
        } else {
          stopProgressMessage(
            true,
            "An error occured getting tag results. Check your internet connection."
          );
        }
      });

      searchQuery = selectedTag;
      search();
    }
  }

  // Main search functionality
  function search() {
    isLoading = true;
    totalResults = null;
    searchData = null;
    vscode.postMessage({ command: "progress", action: "start", error: false });
    console.log("uriSegments", uriSegments);

    const site = `${$i18n.code}stackoverflow`;
    const uri = `${uriSegments.baseUri}/search/advanced?q=${searchQuery}&page=${page}&pagesize=10&order=desc&sort=${selectedSort.apiReference}&site=${site}&filter=${uriSegments.searchFilter}&key=${uriSegments.key}`;
    console.log("uri", uri);

    axios.get(uri).then(response => {
      isLoading = false;
      if (response.status === 200) {
        searchData = response.data.items;
        totalResults = response.data.total;
        stopProgressMessage(false);
      } else {
        stopProgressMessage(
          true,
          "An error occured getting search results. Check your internet connection."
        );
      }
    });
  }

  // Send a stop progess event to the extension
  function stopProgressMessage(hasError, errorMessage) {
    vscode.postMessage({
      command: "progress",
      action: "stop",
      error: hasError,
      errorMessage: errorMessage ? errorMessage : null
    });
  }
</script>

<Header on:goBack={handleGotoSearch} {section} {eventAction} />

{#if section === 'question'}
  <Question {questionId} {vscode} {gif} />
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
    {isLoading}
    {searchQuery}
    {searchData}
    {tagData}
    {totalResults}
    {sortTypes}
    {vscode} />
{:else if section === 'tag'}
  <Tag {tagData} />
{/if}
