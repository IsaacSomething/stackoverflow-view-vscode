<script>
  export let score;
  export let isAccepted;
</script>

<style>
  h2 {
    margin: 0;
  }
  .vote-up,
  .vote-down {
    font-size: 22px;
  }
  .answer-tick {
    fill: #45a163;
    margin-top: 16px;
  }
</style>

{#if score > 0}
  <div class="vote-up">⯅</div>
{/if}
<div>
  <h2>{score}</h2>
</div>
{#if score < 0}
  <div class="vote-down">⯆</div>
{/if}
{#if isAccepted}
  <svg
    aria-hidden="true"
    class="answer-tick"
    width="36"
    height="36"
    viewBox="0 0 36 36">
    <path d="M6 14l8 8L30 6v8L14 30l-8-8v-8z" />
  </svg>
{/if}
