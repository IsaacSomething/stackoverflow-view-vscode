<script>
  import { onDestroy } from "svelte";
  import { i18n, languages } from "../stores/i18n.js";
  import { kFormatter } from "../stores/k-formatter.js";
  import { section } from "../stores/section.js";
  import { createEventDispatcher } from "svelte";
  import {
    resultFilters,
    selectedSearchFilter,
    selectedAnswerFilter
  } from "../stores/results-filter.js";

  export let results;

  $: total = kFormatter(results);
  $: title = $section === "search" ? $i18n.text.results : $i18n.text.answers;
  $: titleForNoResults = $section === "search" ? "" : $i18n.text.no_answers;
  $: selectedFilter =
    $section === "search" ? selectedSearchFilter : selectedAnswerFilter;

  function setLabelByLanguage(label, languageReference) {
    const languageSet = $languages.find(
      languageSet => languageSet.language === $i18n.language
    );
    return languageSet.text[languageReference];
  }

  function hideLabelBasedOnSection(label) {
    if (
      ($section === "search" && label === "Oldest") ||
      ($section === "question" && ["Relevance", "Newest"].includes(label))
    ) {
      return true;
    } else {
      return false;
    }
  }

  function setSearchOrder(filterIndex) {
    dispatch("filterChange", {
      selectedFilter: resultsFilter[filterIndex]
    });
  }
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
  div:first-of-type h2 {
    margin: 8px 0;
  }
  div:last-of-type {
    width: 70%;
    text-align: right;
  }
  div:last-of-type span {
    margin-left: 16px;
  }
  .active {
    color: var(--vscode-textLink-foreground);
    font-weight: bold;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--vscode-textLink-foreground);
  }
  .hide-based-on-section {
    display: none;
  }
</style>

<section>

  <div>
    {#if results > 0}
      <h2>{total} {title}</h2>
    {:else}
      <h2 class="text-capitalize">{titleForNoResults}</h2>
    {/if}
  </div>

  <div>
    {#if results > 2}
      {#each resultFilters as filter, i}
        <span
          class="link"
          class:active={$selectedFilter.label === filter.label}
          class:hide-based-on-section={hideLabelBasedOnSection(filter.label)}
          on:click={() => setSearchOrder(i)}>
          {setLabelByLanguage(filter.label, filter.languageReference)}
        </span>
      {/each}
    {/if}
  </div>

</section>
