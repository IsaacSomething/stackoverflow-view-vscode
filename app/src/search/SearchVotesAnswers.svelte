<script>
  export let searchItem;
</script>

<style>
  .metrics {
    text-align: center;
    float: left;
    width: 80px;
    margin: 0 22px;
  }
  .metrics div {
    padding: 10px;
  }
  .metrics h3 {
    margin: 0;
  }
  .answer-count.is-answered {
    border: 1px solid var(--vscode-textLink-foreground);
    color: var(--vscode-textLink-foreground);
    font-weight: bold;
    border-radius: 2px;
  }
  .answer-count.is-answered-full {
    background-color: var(--vscode-textLink-foreground);
    color: var(--vscode-button-foreground);
    font-weight: bold;
    border-radius: 2px;
  }
</style>

<div class="metrics">
  <div>
    <h3>{searchItem.score}</h3>
    <small>
      {#if searchItem.score === 1}vote{:else}votes{/if}
    </small>
  </div>
  <div
    class="answer-count"
    class:is-answered={searchItem.is_answered}
    class:is-answered-full={searchItem.accepted_answer_id}>
    <h3>{searchItem.answer_count}</h3>
    <small>
      {#if searchItem.answer_count === 1}answer{:else}answers{/if}
    </small>
  </div>
</div>
