<script>
  import QuestionsRelated from "./QuestionsRelated.svelte";
  import { i18n } from "../stores/i18n.js";
  import { kFormatter } from "../stores/k-formatter.js";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { fromUnixTime, formatDistanceToNow } from "date-fns";

  export let title;
  export let asked;
  export let active;
  export let viewed;
  export let relatedQuestions;
  let showRelatedQuestions = false;

  $: totalViews = kFormatter(viewed);

  function toggleRelatedQuestions() {
    showRelatedQuestions = !showRelatedQuestions;
  }
</script>

<style>
  .question-title-container {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 13px;
    margin-bottom: 4px;
  }
  h1 {
    margin: 6px 0;
    word-break: break-word;
  }
  .metrics {
    margin-top: 10px;
  }
  .metrics span {
    margin-right: 20px;
  }
  .view-related-questions,
  .hide-related-questions {
    margin-right: 0;
  }
  .view-related-questions {
    float: right;
  }
  .hide-related-questions {
    color: var(--vscode-textLink-activeForeground);
  }
</style>

<div class="question-title-container" in:fade>
  <h1>
    {@html title}
  </h1>

  <div class="metrics">
    {$i18n.text.asked}
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(asked))}</strong>
    </span>
    {$i18n.text.active}
    <span>
      <strong>{formatDistanceToNow(fromUnixTime(active))}</strong>
    </span>
    {$i18n.text.viewed}
    <span>
      <strong>{totalViews}</strong>
      {$i18n.text.times}
    </span>

    <span
      class="link view-related-questions"
      class:hide-related-questions={showRelatedQuestions}
      on:click={toggleRelatedQuestions}>
      {#if !showRelatedQuestions}
        {$i18n.text.view_related_questions}
      {:else}{$i18n.text.hide_related_questions}{/if}
    </span>

    {#if showRelatedQuestions}
      <QuestionsRelated {relatedQuestions} on:gotoRelatedQuestion />
    {/if}
  </div>
</div>
