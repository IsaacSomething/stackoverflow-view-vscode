<script>
  import { createEventDispatcher } from "svelte";

  export let totalResults;
  export let tagData;
  export let sortTypes;

  $: total = kFormatter(totalResults);
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  const dispatch = createEventDispatcher();
  function setSearchOrder(sortTypeIndex) {
    sortTypes.forEach((element, key) => {
      element.isSelected = key !== sortTypeIndex ? false : true;
    });
    dispatch("sortChange", {
      selectedSort: sortTypes[sortTypeIndex]
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
        <span class="link" on:click={enableSearch}>
          <strong>search</strong>
        </span>
      {/if}
      {#each sortTypes as sort, i}
        <span
          class:active={sort.isSelected}
          on:click={() => setSearchOrder(i)}>
          {sort.label.toLowerCase()}
        </span>
      {/each}
    </p>
  </div>
{/if}
