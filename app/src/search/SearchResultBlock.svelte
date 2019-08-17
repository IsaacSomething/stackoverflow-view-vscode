<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { format, fromUnixTime } from "date-fns";
  import SearchBottomActionButtons from "./SearchBottomActionButtons.svelte";
  import SearchVotesAnswers from "./SearchVotesAnswers.svelte";
  import Tags from "../common/Tags.svelte";

  export let searchData;
  export let isLoading;

  function setAskedValue(date) {
    const dateFromUnix = fromUnixTime(date);
    return ` ${format(dateFromUnix, "MMM dd")} '${format(dateFromUnix, "yy")}`;
  }

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
  .is-loading {
    filter: blur(0.4);
  }
</style>

{#each searchData as searchItem, i}

  <div
    in:fade
    class="search-result-block-container"
    class:last-item={i === searchData.length - 1}
    class:is-loading={isLoading}>

    <SearchVotesAnswers {searchItem} />

    <div class="information">

      <header on:click={() => navigateToQuestion(searchItem.question_id)}>
        {@html searchItem.title}
        {#if searchItem.closed_date && searchItem.closed_details.on_hold}
          [on hold]
        {:else if searchItem.closed_date}[closed]{/if}
      </header>

      <p>
        {@html searchItem.body.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 350)}
        {#if searchItem.body.length > 350}...{/if}
      </p>

      <div class="information-bottom">
        <Tags tags={searchItem.tags} on:searchByTag />
        <div class="asked-info">
          asked {setAskedValue(searchItem.creation_date)} by
          <i>{searchItem.owner.display_name}</i>
        </div>
      </div>

    </div>

  </div>
{/each}

<SearchBottomActionButtons />
