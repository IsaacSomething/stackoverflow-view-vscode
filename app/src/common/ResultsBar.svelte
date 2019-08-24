<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { i18n, languages } from "../stores/i18n.js";
  import { formatNumber, section } from "../stores/common.js";
  import {
    resultFilters,
    selectedSearchFilter,
    selectedAnswerFilter
  } from "../stores/results-filter.js";

  export let results;
  export let isLoading;

  $: total = formatNumber(results);
  $: title = $section === "search" ? $i18n.text.results : $i18n.text.answers;
  $: titleForNoResults =
    $section === "search" ? $i18n.text.no_results_found : $i18n.text.no_answers;
  $: selectedFilter =
    $section === "search" ? selectedSearchFilter : selectedAnswerFilter;

  function setLabelByLanguage(label, languageReference) {
    const languageSet = $languages.find(_ => _.language === $i18n.language);
    return languageSet.text[languageReference];
  }

  function hideLabelBasedOnSection(label) {
    return ($section === "search" && label === "Oldest") ||
      ($section === "question" && ["Relevance", "Newest"].includes(label))
      ? true
      : false;
  }

  function showFilters() {
    return $section === "question" && results < 3 ? false : true;
  }

  const dispatch = createEventDispatcher();
  function setSearchFilter(filterLabel) {
    if ($section === "search") {
      $selectedSearchFilter = resultFilters.find(_ => _.label === filterLabel);
    } else if ($section === "question") {
      $selectedAnswerFilter = resultFilters.find(_ => _.label === filterLabel);
    }
    dispatch("filterChange");
  }

  onDestroy(() => {
    selectedAnswerFilter.set(resultFilters[4]);
  });
</script>

<style>
  section {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
    display: flex;
    align-items: center;
  }
  div:first-of-type {
    width: 30%;
  }
  div:first-of-type header {
    margin: 10px 0;
    font-size: 16px;
  }
  div:last-of-type {
    width: 70%;
    text-align: right;
  }
  div:last-of-type span {
    margin-left: 16px;
    padding-bottom: 12px;
  }
  .active {
    color: var(--vscode-button-background);
    font-weight: bold;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--vscode-button-background);
  }
  .is-loading {
    border: 0;
  }
  .hide-based-on-section {
    display: none;
  }
</style>

<section>

  <div>
    <header>
      {#if results > 0}
        {total} {title}
      {:else if results === 0}{titleForNoResults}{:else if isLoading}&nbsp;{/if}
    </header>
  </div>

  <div>
    {#if showFilters()}
      {#each resultFilters as filter, i}
        <span
          class="link"
          class:active={$selectedFilter.apiSort === filter.apiSort}
          class:is-loading={isLoading}
          class:hide-based-on-section={hideLabelBasedOnSection(filter.label)}
          on:click={() => setSearchFilter(filter.label)}>
          {setLabelByLanguage(filter.label, filter.languageReference)}
        </span>
      {/each}
    {/if}
  </div>

</section>
