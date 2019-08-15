<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import QuestionComments from "./QuestionComments.svelte";
  import QuestionUser from "./QuestionUser.svelte";
  import QuestionTitle from "./QuestionTitle.svelte";
  import QuestionAnswer from "./QuestionAnswer.svelte";
  import QuestionIndices from "./QuestionIndices.svelte";
  import QuestionNotice from "./QuestionNotice.svelte";
  import QuestionClosed from "./QuestionClosed.svelte";
  import Tag from "../common/Tag.svelte";

  export let questionId;
  export let vscode;
  let question;

  const baseUri = "https://api.stackexchange.com/2.2/";
  const filter =
    "!846.ilK3D.2Pl0pgfPfmnelLqFsIyM(vhzUILxWBbRUYVMGZZc56l7wJcBD70KfJmVD"; // NB!! If this is changed PLEASE UPDATE the filters.md
  const key = "VP5SbX4dbH8MJUft7hjoaA((";
  const site = "stackoverflow";
  const uri = `${baseUri}questions/${questionId}?order=desc&sort=activity&site=${site}&filter=${filter}&key=${key}`;

  /**
   * Fetch question
   */
  fetch(uri).then(
    response => {
      if (response.status === 200) {
        response
          .clone()
          .json()
          .then(questionData => {
            question = questionData.items[0];
            // Fetch answers page 1
            // const baseUriAnswers = "https://api.stackexchange.com/2.2/";
            // const filterAnswers =
            //   "!*i5bc-n8Kaka(2FRl(J-bw8Z3rwRuHp(OQGhtQ6ITye3YjQT1q7a5PTE9i1E8.eAJPcta5"; // NB!! If this is changed PLEASE UPDATE the filters.md
            // const keyAnswers = "VP5SbX4dbH8MJUft7hjoaA((";
            // const siteAnswers = "stackoverflow";
            // const uriAnswers = `${baseUri}answers/${questionId}?order=desc&sort=votes&site=${site}&filter=${filter}&key=${key}`; */
            vscode.postMessage({
              command: "progress",
              action: "stop"
            });
          });
      }
    },
    error => {
      console.log("ERROR:", error);
    }
  );

  const dispatch = createEventDispatcher();
  function navigateBack() {
    dispatch("gotoSearch");
  }
</script>

<style>
  .question-container {
    font-size: 14px;
    display: flex;
  }
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
  .question-left-bottom {
    display: flex;
  }
  .view-online {
    width: 100%;
    align-self: center;
  }
  .view-online a {
    cursor: pointer;
  }
  .answers-count-container {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
  }
</style>

{#if question}

  <QuestionTitle
    title={question.title}
    asked={question.creation_date}
    active={question.last_activity_date}
    viewed={question.view_count}
    on:back />

  <div class="question-container">

    <div class="left">
      <QuestionIndices
        score={question.score}
        favorite={question.favorite_count} />
    </div>

    <div class="right">

      <div class="content">
        {@html question.body}
      </div>

      <div class="tags">
        {#each question.tags as tag}
          <Tag {tag} />
        {/each}
      </div>

      <div class="question-left-bottom">
        <div class="view-online">
          <a href={question.link} target="_blank">view online</a>
        </div>

        <QuestionUser
          user={question.owner}
          createdDate={question.creation_date} />
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

      <QuestionComments comments={question.comments} />

    </div>

  </div>

  <div class="answers-count-container">
    {#if question.answer_count > 0}
      <h2>{question.answer_count} Answers</h2>
    {/if}
  </div>

  <!-- <h2>{question.answer_count} Answers</h2>

  {#if question.answers.length > 0}
    {#each question.answers as answer, i}
      {#if i < 10}
        <QuestionAnswer {answer} />
      {/if}
    {/each}
  {/if} -->
{:else}
  <p>Loading Question...</p>
{/if}
