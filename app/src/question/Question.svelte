<script>
  import { fade } from "svelte/transition";
  import { i18n } from "../stores/i18n.js";
  import { uriSegments } from "../models/static-models.js";
  import {
    selectedAnswerFilter,
    resultFilters
  } from "../stores/results-filter.js";
  import axios from "axios";
  import Comments from "../Common/Comments.svelte";
  import RowLayout from "../Common/RowLayout.svelte";
  import ResultsBar from "../Common/ResultsBar.svelte";
  import User from "../Common/User.svelte";
  import Tags from "../Common/Tags.svelte";
  import Loader from "../Common/Loader.svelte";
  import QuestionTitle from "./QuestionTitle.svelte";
  import QuestionAnswers from "./QuestionAnswers.svelte";
  import QuestionIndices from "./QuestionIndices.svelte";
  import QuestionNotice from "./QuestionNotice.svelte";
  import QuestionClosed from "./QuestionClosed.svelte";

  export let questionId;
  export let questionTitle;
  export let gif;
  export let vscode;
  let question;
  let answers;
  let isLoading = true;
  let relatedQuestions; // THIS IS NOT WORKING ... yet

  /* vscode.postMessage({ command: "progress", action: "start" }); */

  const site = `${$i18n.code}stackoverflow`;
  const uri = `${uriSegments.baseUri}/questions/${questionId}?order=desc&sort=activity&site=${site}&filter=${uriSegments.questionFilter}&key=${uriSegments.key}`;

  axios.get(uri).then(response => {
    isLoading = false;

    if (response.status === 200) {
      question = response.data.items[0];
      // TODO send progress message, change title?
      /* vscode.postMessage({ command: "progress", action: "stop" }); */
      fetchRelatedQuestions();
    } else {
      // TODO send message to extension
    }
  });

  function fetchRelatedQuestions() {
    isLoading = true;

    const site = `${$i18n.code}stackoverflow`;
    const uri = `${uriSegments.baseUri}/questions/${questionId}/related?order=desc&sort=activity&site=${site}&filter=${uriSegments.relatedQuestionsFilter}&key=${uriSegments.key}`;

    axios.get(uri).then(response => {
      isLoading = false;
      if (response.status === 200) {
        relatedQuestions = response.data.items;
      } else {
        // TODO send message to extension
        // Could be a quit error - just dont show the related action button?
      }
    });
  }
</script>

<style>
  .content {
    min-height: 90px;
  }
  .tags {
    margin-top: 20px;
  }
  .question-answer-bottom {
    display: block;
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
  }
  .view-online {
    width: 100%;
    align-self: center;
  }
  .view-online a {
    cursor: pointer;
    float: left;
    margin-top: 38px;
  }
  iframe {
    min-height: 500px;
    min-width: 500px;
  }
  .loader {
    margin-top: 40px;
  }
</style>

{#if question}

  {#if gif}
    <iframe src={gif} frameborder="0" title="haha" />
  {/if}

  <QuestionTitle
    title={questionTitle}
    asked={question.creation_date}
    active={question.last_activity_date}
    viewed={question.view_count}
    {relatedQuestions} />

  <RowLayout>

    <div slot="left">
      <QuestionIndices
        score={question.score}
        favorite={question.favorite_count} />
    </div>

    <div slot="right">

      <div class="content">
        {@html question.body}
      </div>

      <div class="tags">
        <Tags tags={question.tags} on:searchByTag />
      </div>

      <div class="question-answer-bottom">
        <div class="view-online">
          <a href={question.link} target="_blank">{$i18n.text.view_online}</a>
        </div>

        <User
          user={question.owner}
          createdDate={question.creation_date}
          isQuestion={true} />
      </div>

      {#if question.closed_details}
        <QuestionClosed
          details={question.closed_details}
          reason={question.closed_reason}
          closedDate={question.closed_date} />
      {/if}

      {#if question.notice}
        <QuestionNotice notice={question.notice} />
      {/if}

      {#if question.comments}
        <Comments comments={question.comments} />
      {/if}
    </div>

  </RowLayout>

  <ResultsBar results={question.answer_count} {isLoading} on:filterChange />

  {#if question.answer_count > 0}
    <QuestionAnswers {questionId} {vscode} />
  {/if}
{:else}
  <div class="loader">
    <Loader />
  </div>
  <p>
    Loading Question:
    <i>"{questionTitle}"</i>
    ...
  </p>
{/if}
