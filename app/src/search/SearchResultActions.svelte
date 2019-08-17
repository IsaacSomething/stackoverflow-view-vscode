<script>
  import { createEventDispatcher } from "svelte";

  export let totalResults;
  export let tagData;

  let activeSearchType = "relevance";
  const sortTypes = [
    { label: "relevance", sortDefinition: "relevance" },
    { label: "newest", sortDefinition: "creation" },
    { label: "active", sortDefinition: "activity" },
    { label: "votes", sortDefinition: "votes" }
  ];

  $: total = kFormatter(totalResults);
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  const dispatch = createEventDispatcher();
  function setSearchOrder(type) {
    activeSearchType = type.label;
    dispatch("sortChange", {
      sort: type.sortDefinition
    });
  }

  function enableSearch() {
    dispatch("enableSearch");
  }
</script>

<style>
  div {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
    display: flex;
  }
  h3 {
    margin-bottom: 7px;
    font-weight: normal;
  }
  p {
    align-self: center;
    text-align: right;
    flex: auto;
  }
  p span {
    margin-left: 10px;
    cursor: pointer;
  }
  p .active {
    color: var(--vscode-textLink-foreground);
    font-weight: bold;
    padding-bottom: 13px;
    border-bottom: 2px solid var(--vscode-textLink-foreground);
  }
</style>

{#if totalResults}
  <div>
    <h3>{total} results</h3>
    <p>
      {#if tagData}
        <span class="link" on:click={enableSearch}>search</span>
      {/if}
      {#each sortTypes as type}
        <span
          class:active={activeSearchType === type.label}
          on:click={() => setSearchOrder(type)}>
          {type.label}
        </span>
      {/each}
    </p>
  </div>
{/if}
