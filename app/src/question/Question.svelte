<script>
  import { fade } from "svelte/transition";
  import axios from "axios";
  import Comments from "../common/Comments.svelte";
  import User from "../common/User.svelte";
  import Tags from "../common/Tags.svelte";
  import Loader from "../common/Loader.svelte";
  import QuestionTitle from "./QuestionTitle.svelte";
  import QuestionAnswers from "./QuestionAnswers.svelte";
  import QuestionIndices from "./QuestionIndices.svelte";
  import QuestionNotice from "./QuestionNotice.svelte";
  import QuestionClosed from "./QuestionClosed.svelte";

  export let questionId;
  export let gif;
  export let vscode;
  export let language = { language: "English", code: "" };
  let question;
  let answers;

  const baseUri = "https://api.stackexchange.com/2.2";
  const filter =
    "!846.ilK3D.2Pl0pgfPfmnelLqFsIyM(vhzUILxWBbRUYVMGZZc56l7wJcBD70KfJmVD"; // NB!! If this is changed PLEASE UPDATE the filters.md
  const key = "VP5SbX4dbH8MJUft7hjoaA((";
  const site = `${language.code}stackoverflow`;
  const uri = `${baseUri}/questions/${questionId}?order=desc&sort=activity&site=${site}&filter=${filter}&key=${key}`;

  vscode.postMessage({ command: "progress", action: "start" });

  // Get question
  axios.get(uri).then(response => {
    if (response.status === 200) {
      question = response.data.items[0];
      vscode.postMessage({ command: "progress", action: "stop" });
    } else {
      // TODO send message to extension
      console.log("ERROR:", error);
    }
  });
</script>

<style>
  .left {
    text-align: center;
    margin: 2%;
  }
  .right {
    width: 100%;
  }
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
  }
  .view-online {
    width: 100%;
    align-self: center;
  }
  .view-online a {
    cursor: pointer;
    float: left;
    margin-top: 30px;
  }
  .answers-count-container {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
  }
  iframe {
    min-height: 500px;
    min-width: 500px;
  }
</style>

{#if question}

  {#if gif}
    <iframe src={gif} frameborder="0" title="haha" />
  {/if}

  <QuestionTitle
    title={question.title}
    asked={question.creation_date}
    active={question.last_activity_date}
    viewed={question.view_count}
    {language} />

  <div class="row">

    <div class="left">
      <QuestionIndices
        score={question.score}
        favorite={question.favorite_count}
        {language} />
    </div>

    <div class="right">

      <div class="content">
        {@html question.body}
      </div>

      <div class="tags">
        <Tags tags={question.tags} />
      </div>

      <div class="question-answer-bottom">
        <div class="view-online">
          <a href={question.link} target="_blank">
            {language.text.view_online}
          </a>
        </div>

        <User
          user={question.owner}
          createdDate={question.creation_date}
          isQuestion={true}
          {language} />
      </div>

      {#if question.closed_details}
        <QuestionClosed
          details={question.closed_details}
          reason={question.closed_reason}
          closedDate={question.closed_date}
          {language} />
      {/if}

      {#if question.notice}
        <QuestionNotice notice={question.notice} />
      {/if}

      <Comments comments={question.comments} {language} />

    </div>

  </div>

  <div class="answers-count-container">
    {#if question.answer_count > 0}
      <h2>{question.answer_count} {language.text.answers}</h2>
    {:else}
      <h2>{language.text.no_answers}</h2>
    {/if}
  </div>

  {#if question.answer_count > 0}
    <QuestionAnswers {questionId} {language} {vscode} />
  {/if}
{:else}
  <Loader />
{/if}
