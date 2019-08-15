<script>
  export let score;
  export let favorite;
</script>

<style>
  h1 {
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 10px;
  }
  span {
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

<span>⯅</span>
<h1>{score}</h1>
{#if favorite > 0}
  <small class="star">★</small>
  <br />
  <small class="star-score">{favorite}</small>
{/if}
