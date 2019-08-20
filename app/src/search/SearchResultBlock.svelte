<script>
  import { fade } from "svelte/transition";
  import { i18n } from "../stores/i18n.js";
  import { createEventDispatcher } from "svelte";
  import { format, fromUnixTime } from "date-fns";
  import SearchVotesAnswers from "./SearchVotesAnswers.svelte";
  import Tags from "../common/Tags.svelte";

  export let searchData;
  export let isLoading;

  function setAskedValue(date) {
    const dateFromUnix = fromUnixTime(date);
    return ` ${format(dateFromUnix, "MMM dd")} '${format(dateFromUnix, "yy")}`;
  }

  const dispatch = createEventDispatcher();
  function navigateToQuestion(id, title) {
    dispatch("gotoQuestion", {
      questionId: id,
      questionTitle: title
    });
  }
</script>

<style>
  section {
    display: flex;
    margin-top: 12px;
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 18px;
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
  .is-loading {
    filter: blur(0.4);
  }
</style>

{#each searchData as searchItem, i}
  <section
    in:fade
    class:is-loading={isLoading}>

    <SearchVotesAnswers {searchItem} />

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
          {$i18n.text.asked} {setAskedValue(searchItem.creation_date)}
          {$i18n.text.by}
          <i>{searchItem.owner.display_name}</i>
        </div>
      </div>

    </div>

  </section>
{/each}
