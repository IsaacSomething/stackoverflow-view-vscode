<script>
  import { fade } from "svelte/transition";
  export let searchContent;

  function firstSetOfQuestions() {}
  function previousSetOfQuestions() {}
  function nextThirtySetOfQuestions() {}
</script>

<style>
  .search-result-block-container {
    display: flex;
    margin-top: 12px;
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 18px;
  }
  .search-result-block-container.last-item {
    border: 0;
  }
  .metrics {
    text-align: center;
    float: left;
    width: 80px;
    margin-right: 30px;
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
  }
  .answer-count.is-answered-full {
    background-color: var(--vscode-textLink-foreground);
    color: var(--vscode-button-foreground);
    font-weight: bold;
  }
  .information {
    width: 100%;
  }
  .information header {
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
  }
  .information header:hover {
    color: var(--vscode-textLink-foreground);
    cursor: pointer;
  }
  .information-bottom {
    width: 100%;
  }
  .asked-info {
    text-align: right;
  }
  .tag {
    background-color: var(--vscode-badge-background);
    color: var(--vscode-badge-foreground);
    padding: 0 4px 2px;
    margin-right: 4px;
    border-radius: 2px;
    font-size: 11px;
  }
  .bottom-buttons-container {
    text-align: center;
    padding: 20px;
  }
</style>

{#each searchContent.items as searchItem, i}

  <div
    transition:fade
    class="search-result-block-container"
    class:last-item={i === searchContent.items.length - 1}>

    <div class="metrics">
      <div>
        <h3>{searchItem.score}</h3>
        <small>votes</small>
      </div>
      <div
        class="answer-count"
        class:is-answered={!searchItem.is_answered}
        class:is-answered-full={searchItem.is_answered}>
        <h3>{searchItem.answer_count}</h3>
        <small>
          {#if searchItem.answer_count > 1}answers{:else}answer{/if}
        </small>
      </div>
    </div>

    <div class="information">
      <header>{searchItem.title}</header>
      <p>{searchItem.body.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 350)}</p>
      <div class="information-bottom">
        <div>
          {#each searchItem.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
        <div class="asked-info">
          by
          <i>{searchItem.owner.display_name}</i>
        </div>
      </div>
    </div>
  </div>
{/each}

<div class="bottom-buttons-container">
  <button on:click={firstSetOfQuestions}>First</button>
  <button on:click={previousSetOfQuestions}>Previous</button>
  <button on:click={nextThirtySetOfQuestions}>Next</button>
</div>
