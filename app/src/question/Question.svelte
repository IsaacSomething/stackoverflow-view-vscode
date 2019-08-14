<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import QuestionComments from "./QuestionComments.svelte";
  import QuestionUser from "./QuestionUser.svelte";
  import QuestionTitle from "./QuestionTitle.svelte";
  import QuestionAnswer from "./QuestionAnswer.svelte";
  import Tag from "../common/Tag.svelte";

  export let questionId;
  let question;

  const baseUri = "https://api.stackexchange.com/2.2/";
  const filter = "!GHc3(WllPAn.XMe9k80za9VhmRPZ7fIxYdF8E188YvKl9udQvPaRSmW3kg-";
  const key = "VP5SbX4dbH8MJUft7hjoaA((";
  const site = "stackoverflow";
  const uri = `${baseUri}questions/${questionId}?order=desc&sort=votes&site=${site}&filter=${filter}&key=${key}`;

  /**
   * Fetch question
   */
  fetch(uri).then(response => {
    console.log("response", response);
    if (response.status === 200) {
      response
        .clone()
        .json()
        .then(questionData => {
          console.log("questionData", questionData);
          question = questionData.items[0];

          /**
           * Fetch answers page 1
           */
          const baseUriAnswers = "https://api.stackexchange.com/2.2/";
          const filterAnswers =
            "!GHc3(WllPAn.XMe9k80za9VhmRPZ7fIxYdF8E188YvKl9udQvPaRSmW3kg-";
          const keyAnswers = "VP5SbX4dbH8MJUft7hjoaA((";
          const siteAnswers = "stackoverflow";
          const uriAnswers = `${baseUri}answers/${questionId}?order=desc&sort=votes&site=${site}&filter=${filter}&key=${key}`;
        });
    }
  });

  const dispatch = createEventDispatcher();
  function navigateBack() {
    dispatch("gotoSearch");
  }
</script>

<style>
  .question-container {
    font-size: 14px;
  }
</style>

{#if question}
  <QuestionTitle
    title={question.title}
    asked={question.creation_date}
    active={question.last_activity_date}
    viewed={question.view_count} />

  <div class="question-container">
    <h1>
      <small>⯅</small>
      {question.score}
    </h1>
    {@html question.body}
    <br />
    {#each question.tags as tag}
      <Tag {tag} />
    {/each}
  </div>

  <a href={question.link} target="_blank">view online</a>

  <QuestionUser user={question.owner} />
  <QuestionComments comments={question.comments} />

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
