<script>
  import { onMount } from "svelte";
  import { i18n } from "../stores/i18n.js";
  import { vscodeProgress } from "../stores/vscode-api.js";
  import { uriSegments } from "../stores/static-models.js";
  import {
    selectedAnswerFilter,
    resultFilters
  } from "../stores/results-filter.js";
  import axios from "axios";
  import Comments from "../common/Comments.svelte";
  import RowLayout from "../common/RowLayout.svelte";
  import ResultsBar from "../Common/ResultsBar.svelte";
  import Loader from "../Common/Loader.svelte";
  import User from "../Common/User.svelte";
  import Tags from "../Common/Tags.svelte";
  import QuestionAnswerIndicies from "./QuestionAnswerIndicies.svelte";

  export let questionId;
  let answers = [];
  let isLoading = true;

  onMount(() => {
    fetchAnswers();
  });

  function handleFilterChangeSearch(event) {
    isLoading = true;
    fetchAnswers();
  }

  function fetchAnswers() {
    const site = `${$i18n.code}stackoverflow`;
    const uri = `${uriSegments.baseUri}/questions/${questionId}/answers?order=${$selectedAnswerFilter.apiOrder}&sort=${$selectedAnswerFilter.apiSort}&site=${site}&filter=${uriSegments.answersFilter}&key=${uriSegments.key}`;

    axios.get(uri).then(response => {
      isLoading = false;
      if (response.status === 200) {
        answers = response.data.items;
      } else {
        vscodeProgress("stop", null, true);
      }
    });
  }
</script>

<style>
  section {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
  }
  section:last-of-type {
    border-bottom: 0;
  }
  /* Duplicate styles from Questions.svelte */
  .question-answer-bottom {
    display: block;
    width: 100%;
    height: 82px;
  }
</style>

<ResultsBar
  {isLoading}
  results={answers.length}
  on:filterChange={handleFilterChangeSearch} />

{#if isLoading}
  <Loader />
{/if}

{#if answers}
  {#each answers as answer, i}
    <section>
      <RowLayout>

        <div slot="left">
          <QuestionAnswerIndicies
            score={answer.score}
            isAccepted={answer.is_accepted} />
        </div>

        <div slot="right">
          <div>
            {@html answer.body}
          </div>

          {#if answer.tags}
            <Tags tags={answer.tags} />
          {/if}

          <div class="question-answer-bottom">
            <User user={answer.owner} createdDate={answer.creation_date} />
          </div>

          {#if answer.comments}
            <Comments comments={answer.comments} />
          {/if}
        </div>
      </RowLayout>
    </section>
  {/each}
{/if}
