<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import QuestionComments from "./QuestionComments.svelte";
  import QuestionUser from "./QuestionUser.svelte";
  import QuestionTitle from "./QuestionTitle.svelte";
  import Tag from "../common/Tag.svelte";

  export let questionId;
  let question;
  let comments;
  let questionTitle;

  fetch(
    `https://api.stackexchange.com/2.2/questions/${questionId}?order=desc&sort=activity&site=stackoverflow&filter=withBody`
    /* `https://api.stackexchange.com/2.2/questions/881510?order=desc&sort=activity&site=stackoverflow&filter=withcomments` */
  ).then(response => {
    console.log("data", response.clone().json());
    if (response.ok) {
      response
        .clone()
        .json()
        .then(questionData => {
          question = questionData.items[0];

          fetch(
            `https://api.stackexchange.com/2.2/questions/${questionId}/comments?order=asc&site=stackoverflow&filter=withbody`
          ).then(response => {
            console.log("comments", response.clone().json());
            if (response.ok) {
              response
                .clone()
                .json()
                .then(commentData => {
                  comments = commentData.items;
                });
            }
          });
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
{:else}
  <p>Loading Question...</p>
{/if}

{#if comments}
  <QuestionComments {comments} />
{/if}
