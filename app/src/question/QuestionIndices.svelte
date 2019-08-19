<script>
  export let score;
  export let favorite;
</script>

<style>
  h1 {
    font-size: 1.4rem;
    margin: 0;
  }
  .vote-up,
  .vote-down {
    font-size: 22px;
  }
  small {
    opacity: 0.5;
    font-size: 1rem;
  }
  .star-score {
    margin-left: -5px;
  }
</style>

{#if score > 0}
  <div class="vote-up">⯅</div>
{/if}
<h1>{score}</h1>
{#if score < 0}
  <div class="vote-down">⯆</div>
{/if}
{#if favorite > 0}
  <small class="star">★</small>
  <br />
  <small class="star-score">{favorite}</small>
{/if}
