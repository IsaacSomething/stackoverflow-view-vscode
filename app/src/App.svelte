<script>
  import { languages, i18n } from "./stores/i18n.js";
  import { uriSegments } from "./models/static-models.js";
  import { page, section } from "./stores/common.js";
  import {
    selectedSearchFilter,
    resultFilters
  } from "./stores/results-filter.js";

  import axios from "axios";
  import Header from "./common/Header.svelte";
  import Question from "./question/Question.svelte";
  import Search from "./search/Search.svelte";
  import Tag from "./tag/tag.svelte";

  const vscode = acquireVsCodeApi();
  let searchQuery;
  let searchData;
  let questionId;
  let questionTitle;
  let totalResults;
  let isLoading = true;
  let extensionAction;
  let tagData;
  let gif;

  /**
   * Posted properties on search from extension.ts => showInputBox()
   * action: 'search', // or topPick
   * query: searchQuery, // inputbox value
   * language: currentLanguageSelection, // user settings configuation
   * sortType: currentSortTypeSelection // user settings configuation
   */
  window.addEventListener("message", event => {
    extensionAction = event.data.action;

    if (event.data.action === "search") {
      searchQuery = event.data.query;

      // Set language
      $i18n = $languages.find(_ => _.language === event.data.language);

      // Find & set sort filter
      const searchFilterToSetAsSelected = resultFilters.find(
        _ => _.label === event.data.sortType
      );
      selectedSearchFilter.set(searchFilterToSetAsSelected);

      // Set section
      section.set("search");

      search();
    } else if (event.data.action === "topPick") {
      progressMesssage("stop", null, false);
      $i18n = $languages[0];
      questionId = event.data.questionId;
      gif = event.data.gif;
      section.set("question");
    }
  });

  // From SearchResultBlock component
  function handleGotoQuestion(event) {
    section.set("question");
    vscode.postMessage({
      command: "titleChange",
      title: `SO: ${event.detail.questionTitle}`
    });
    questionId = event.detail.questionId;
    questionTitle = event.detail.questionTitle;
  }

  // From back button clicked on question page
  function handleGotoSearch(event) {
    section.set("search");
    vscode.postMessage({
      command: "titleChange",
      title: `SO: ${searchQuery}`
    });
  }

  //
  function handleTagFromQuestionSearch(event) {
    console.log(" handleTagFromQuestionSearch ev", event);
    section.set("search");
    vscode.postMessage({
      command: "titleChange",
      title: `SO: ${event.detail.tag}`
    });
    handleTagSearch(event);
  }

  // Set tag page
  function handleGotoTag() {
    section.set("tag");
  }

  // Search by search input box
  function handleInputSearch(event) {
    searchQuery = event.detail.query;
    search();
  }

  function handlePageSearch() {
    window.scroll({ top: 80, behavior: "smooth" });
    search();
  }

  function handleFilterChangeSearch() {
    page.set(1);
    search();
  }

  // Search by selected tag - Only gets the wiki info, full search still needs to be done based on tag name
  function handleTagSearch(event) {
    isLoading = true;
    page.set(1);
    window.scroll({ top: 0, behavior: "smooth" });
    const selectedTag = event.detail.tag;

    if (selectedTag) {
      const site = `${$i18n.code}stackoverflow`;
      const uri = `${uriSegments.baseUri}/tags/${selectedTag}/wikis?site=${site}&filter=${uriSegments.tagFilter}&key=${uriSegments.key}`;

      axios.get(uri).then(response => {
        if (response.status === 200) {
          tagData = response.data.items[0];
          searchQuery = selectedTag;
          search(selectedTag);
        } else {
          isLoading = false;
          stopProgressMessage(
            true,
            "An error occured getting tag results. Check your internet connection."
          );
        }
      });
    }
  }

  // Main search functionality
  function search(tag) {
    progressMesssage("start", "Loading Stackoverflow Search Results", false);
    isLoading = true;

    // Handle tag
    let firstChar = searchQuery[0];
    let lastChar = searchQuery[searchQuery.length - 1];
    if (!tag && firstChar === "[" && lastChar === "]") {
      handleTagSearch({ detail: { tag: searchQuery } });
      return;
    } else if (!tagData) {
      tag = null;
    }

    const tagProperties = !tag ? "" : `&tagged=${tag}`;
    const site = `${$i18n.code}stackoverflow`;
    const uri = `${uriSegments.baseUri}/search/advanced?q=${searchQuery}${tagProperties}&page=${$page}&pagesize=10&order=${$selectedSearchFilter.apiOrder}&sort=${$selectedSearchFilter.apiSort}&site=${site}&filter=${uriSegments.searchFilter}&key=${uriSegments.key}`;

    axios.get(uri).then(response => {
      isLoading = false;
      if (response.status === 200) {
        searchData = response.data.items;
        totalResults = response.data.total;
        progressMesssage("stop", null, false);
      } else {
        progressMesssage("stop", null, true);
      }
    });
  }

  // Send a progress event to extension.ts
  function progressMesssage(action, title, hasError) {
    vscode.postMessage({
      command: "progress",
      action: action,
      title: title,
      error: hasError,
      errorMessage:
        "An error occured fetching results. Check your internet connection."
    });
  }
</script>

<Header on:goBack={handleGotoSearch} {extensionAction} />

{#if $section === 'search'}
  <Search
    on:gotoQuestion={handleGotoQuestion}
    on:gotoTag={handleGotoTag}
    on:searchByTag={handleTagSearch}
    on:searchInput={handleInputSearch}
    on:searchByPage={handlePageSearch}
    on:filterChange={handleFilterChangeSearch}
    {isLoading}
    {searchQuery}
    {searchData}
    {tagData}
    {totalResults}
    {vscode} />
{:else if $section === 'question'}
  <Question
    on:searchByTag={handleTagFromQuestionSearch}
    {questionId}
    {questionTitle}
    {vscode}
    {gif} />
{:else if $section === 'tag'}
  <Tag {tagData} />
{/if}
