<script>
  function firstSetOfQuestions() {}
  function previousSetOfQuestions() {}
  function nextThirtySetOfQuestions() {}
</script>

<style>
  .bottom-buttons-container {
    padding: 20px 20px 20px 0;
  }
  button {
    min-width: auto;
  }
</style>

<div class="bottom-buttons-container">
  <button on:click={firstSetOfQuestions}>1</button>
  <button on:click={previousSetOfQuestions}>2</button>
  <button on:click={nextThirtySetOfQuestions}>3</button>
  <button on:click={nextThirtySetOfQuestions}>4</button>
  <button on:click={nextThirtySetOfQuestions}>5</button>
  <button on:click={nextThirtySetOfQuestions}>next</button>
</div>
