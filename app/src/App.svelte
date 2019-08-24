<script>
  import { uriSegments } from "./models/static-models.js";
  import { languages, i18n } from "./stores/i18n.js";
  import { page, section, searchQuery } from "./stores/common.js";
  import { vscodeProgress, vscodeWindowTitle } from "./stores/vscode-api.js";
  import {
    selectedSearchFilter,
    resultFilters
  } from "./stores/results-filter.js";
  import axios from "axios";
  import Header from "./common/Header.svelte";
  import Question from "./question/Question.svelte";
  import Search from "./search/Search.svelte";
  import Tag from "./tag/tag.svelte";

  let searchData;
  let questionId;
  let questionTitle;
  let totalResults;
  let isLoading = true;
  let extensionAction;
  let selectedTag;
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
      searchQuery.set(event.data.query);
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
      questionTitle = event.data.label;
      section.set("question");
    }
  });

  function handleGotoQuestion(event) {
    section.set("question");
    vscodeWindowTitle(event.detail.questionTitle);
    questionId = event.detail.questionId;
    questionTitle = event.detail.questionTitle;
  }

  function handleGotoSearch(event) {
    section.set("search");
    vscodeWindowTitle(searchQuery);
  }

  function handlePageSearch() {
    if (!selectedTag) {
      window.scroll({ top: 80, behavior: "smooth" });
      search();
    } else {
      window.scroll({ top: 0, behavior: "smooth" });
      tagSearch(selectedTag);
    }
  }

  function handleFilterChangeSearch() {
    page.set(1);
    !selectedTag ? search() : tagSearch(selectedTag);
  }

  function handleTagFromQuestionSearch(event) {
    selectedTag = event.detail.tag;
    section.set("search");
    window.scroll({ top: 0, behavior: "smooth" });
    tagSearch(selectedTag);
  }

  // Search by selected tag - Only gets the wiki info -
  // Full search still needs to be done based on tag name with added property &tagged= to uri
  function handleTagSelected(event) {
    selectedTag = event.detail.tag;

    vscodeProgress("start", "Loading Tag Results", false);
    window.scroll({ top: 0, behavior: "smooth" });
    isLoading = true;
    page.set(1);

    const site = `${$i18n.code}stackoverflow`;
    const uri = `${uriSegments.baseUri}/tags/${selectedTag}/wikis?site=${site}&filter=${uriSegments.tagFilter}&key=${uriSegments.key}`;

    axios
      .get(uri)
      .then(response => {
        if (response.status === 200) {
          tagData = response.data.items[0];
          tagSearch(selectedTag);
        } else {
          isLoading = false;
          vscodeProgress("stop", null, true);
        }
      })
      .catch(() => {
        vscodeProgress("stop", null, true);
      });
  }

  function tagSearch(selectedTag) {
    isLoading = true;
    vscodeWindowTitle(`[${selectedTag}]`);
    searchQuery.set(`[${selectedTag}]`);

    const site = `${$i18n.code}stackoverflow`;
    const uri = `${uriSegments.baseUri}/search/advanced?tagged=${selectedTag}&page=${$page}&pagesize=10&order=${$selectedSearchFilter.apiOrder}&sort=${$selectedSearchFilter.apiSort}&site=${site}&filter=${uriSegments.searchFilter}&key=${uriSegments.key}`;

    axios
      .get(uri)
      .then(response => {
        isLoading = false;
        if (response.status === 200) {
          searchData = response.data.items;
          totalResults = response.data.total;
          vscodeProgress("stop", null, false);
        } else {
          vscodeProgress("stop", null, true);
        }
      })
      .catch(() => {
        vscodeProgress("stop", null, true);
      });
  }

  // Main search functionality
  function search() {
    vscodeProgress("start", "Loading Search Results", false);
    isLoading = true;
    tagData = null;
    selectedTag = null;

    const site = `${$i18n.code}stackoverflow`;
    const uri = `${uriSegments.baseUri}/search/advanced?q=${$searchQuery}&page=${$page}&pagesize=10&order=${$selectedSearchFilter.apiOrder}&sort=${$selectedSearchFilter.apiSort}&site=${site}&filter=${uriSegments.searchFilter}&key=${uriSegments.key}`;

    axios
      .get(uri)
      .then(response => {
        isLoading = false;
        if (response.status === 200) {
          searchData = response.data.items;
          totalResults = response.data.total;
          vscodeProgress("stop", null, false);
        } else {
          vscodeProgress("stop", null, true);
        }
      })
      .catch(() => {
        vscodeProgress("stop", null, true);
      });
  }
</script>

<Header on:goBack={handleGotoSearch} {extensionAction} />

{#if $section === 'search'}
  <Search
    on:gotoQuestion={handleGotoQuestion}
    on:gotoTagLearnMore={() => section.set('tag')}
    on:searchByTag={handleTagSelected}
    on:searchInput={search}
    on:searchByPage={handlePageSearch}
    on:filterChange={handleFilterChangeSearch}
    {isLoading}
    {searchData}
    {tagData}
    {totalResults} />
{:else if $section === 'question'}
  <Question
    on:searchByTag={handleTagFromQuestionSearch}
    {questionId}
    {questionTitle}
    {extensionAction}
    {gif} />
{:else if $section === 'tag'}
  <Tag {tagData} />
{/if}
