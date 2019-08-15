<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import SearchBottomActionButtons from "./SearchBottomActionButtons.svelte";
  import Tag from "../common/Tag.svelte";

  export let searchData;

  const dispatch = createEventDispatcher();
  function navigateToQuestion(questionId) {
    dispatch("gotoQuestion", {
      questionId: questionId
    });
  }
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
</style>

{#each searchData as searchItem, i}

  <div
    in:fade
    class="search-result-block-container"
    class:last-item={i === searchData.length - 1}
    on:click={() => navigateToQuestion(searchItem.question_id)}>

    <div class="metrics">
      <div>
        <h3>{searchItem.score}</h3>
        <small>
          {#if searchItem.score === 1}vote{:else}votes{/if}
        </small>
      </div>
      <div
        class="answer-count"
        class:is-answered={!searchItem.is_answered}
        class:is-answered-full={searchItem.is_answered}>
        <h3>{searchItem.answer_count}</h3>
        <small>
          {#if searchItem.answer_count === 1}answer{:else}answers{/if}
        </small>
      </div>
    </div>

    <div class="information">

      <header>{searchItem.title}</header>

      <p>
        {searchItem.body_markdown
          .replace(/<\/?[^>]+(>|$)/g, '')
          .substring(0, 350)}
        {#if searchItem.body_markdown.length > 350}...{/if}
      </p>

      <div class="information-bottom">

        {#each searchItem.tags as tag}
          <Tag {tag} />
        {/each}

        <div class="asked-info">
          by
          <i>{searchItem.owner.display_name}</i>
        </div>
      </div>

    </div>

  </div>
{/each}

<SearchBottomActionButtons />
