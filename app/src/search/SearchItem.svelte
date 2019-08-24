<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { i18n } from "../stores/i18n.js";
  import { formatDate } from "../stores/format-date.js";
  import SearchItemScore from "./SearchItemScore.svelte";
  import Tags from "../common/Tags.svelte";

  export let searchData;
  export let isLoading;

  const dispatch = createEventDispatcher();
  function navigateToQuestion(id, title) {
    if (!isLoading) {
      dispatch("gotoQuestion", {
        questionId: id,
        questionTitle: title
      });
    }
  }
</script>

<style>
  section {
    display: flex;
    margin-top: 12px;
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 15px;
  }
  section:last-child {
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
  p {
    margin-top: 8px;
  }
  .is-loading {
    filter: blur(2px);
  }
  .is-loading header:hover {
    cursor: not-allowed;
  }
</style>

{#each searchData as searchItem, i}
  <section in:fade class:is-loading={isLoading}>

    <SearchItemScore {searchItem} />

    <div class="information">

      <header
        on:click={() => navigateToQuestion(searchItem.question_id, searchItem.title)}>
        {@html searchItem.title}
        {#if searchItem.closed_date && searchItem.closed_details.on_hold}
          [{$i18n.text.on_hold}]
        {:else if searchItem.closed_date}[{$i18n.text.closed}]{/if}
      </header>

      <p>
        {@html searchItem.body.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 350)}
        {#if searchItem.body.length > 350}...{/if}
      </p>

      <div class="information-bottom">
        <Tags tags={searchItem.tags} on:searchByTag />
        <div class="asked-info">
          {formatDate(searchItem.creation_date, $i18n, 'search')}
          {$i18n.text.by}
          <i>{searchItem.owner.display_name}</i>
        </div>
      </div>

    </div>

  </section>
{/each}
