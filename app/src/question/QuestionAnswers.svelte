<script>
  import Comments from "../common/Comments.svelte";
  import User from "../common/User.svelte";
  import Tags from "../common/Tags.svelte";

  export let questionId;
  export let language;
  let answers;

  console.log("questionId", questionId);

  // Fetch answers page 1
  const baseUri = "https://api.stackexchange.com/2.2";
  const filter = "!M7iu1KROAgtzactMhHlgZ19xUsGuQJ(WdBhiYR*(Bw_PhIcdWN*FF1u"; // NB!! If this is changed PLEASE UPDATE the filters.md
  const key = "VP5SbX4dbH8MJUft7hjoaA((";
  const site = `${language.code}stackoverflow`;
  const uri = `${baseUri}/questions/${questionId}/answers?order=desc&sort=activity&site=${site}&filter=${filter}&key=${key}`;

  fetch(uri).then(response => {
    if (response.status === 200) {
      response
        .clone()
        .json()
        .then(answersData => {
          console.log("answers", answersData);
          answers = answersData.items;
        });
    }
  });
</script>

<style>
  .svg-icon.iconCheckmarkLg {
    color: #45a163 !important;
  }
</style>

{#if answers}
  {#each answers as answer, i}
    <div>
      <h2>
        <small>⯅</small>
        {answer.score}
        {#if answer.is_accepted}
          <svg
            aria-hidden="true"
            class="svg-icon iconCheckmarkLg"
            width="36"
            height="36"
            viewBox="0 0 36 36">
            <path d="M6 14l8 8L30 6v8L14 30l-8-8v-8z" />
          </svg>
        {/if}
      </h2>
    </div>
    <div>
      {@html answer.body}
    </div>
    {#if answer.tags}
      <Tags tags={answer.tags} />
    {/if}
    <User user={answer.owner} createdDate={answer.creation_date} />
    <br />
    {#if answer.comments}
      <Comments comments={answer.comments} />
    {/if}
  {/each}
{/if}
