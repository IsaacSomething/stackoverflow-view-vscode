<script>
  import QuestionComments from "./QuestionComments.svelte";
  import QuestionUser from "./QuestionUser.svelte";
  export let answer;
</script>

<style>
  .svg-icon.iconCheckmarkLg {
    color: #45a163 !important;
  }
</style>

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
  <p>last activity: {answer.is_accepted}</p>
  <div>
    {@html answer.body}
  </div>
  <QuestionUser user={answer.owner} />
  <br />
  <h1>{answer.comment_count}</h1>
  <QuestionComments comments={answer.comments} />
</div>
