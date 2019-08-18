<script>
  export let language;
  let activePage = 1;

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
    margin-right: 5px;
  }
  button.active {
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
  }
</style>

<div class="bottom-buttons-container">
  <button
    class="outline"
    class:active={activePage === 1}
    on:click={firstSetOfQuestions}>
    1
  </button>
  <button
    class="outline"
    class:active={activePage === 2}
    on:click={previousSetOfQuestions}>
    2
  </button>
  <button
    class="outline"
    class:active={activePage === 3}
    on:click={nextThirtySetOfQuestions}>
    3
  </button>
  <button
    class="outline"
    class:active={activePage === 3}
    on:click={nextThirtySetOfQuestions}>
    4
  </button>
  <button
    class="outline"
    class:active={activePage === 4}
    on:click={nextThirtySetOfQuestions}>
    5
  </button>
  <button class="outline" on:click={nextThirtySetOfQuestions}>{language.text.next}</button>
</div>
