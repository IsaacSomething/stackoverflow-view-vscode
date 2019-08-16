<script>
  export let totalResults;

  let activeSearchType = "relevance";

  $: total = kFormatter(totalResults);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  function setSearchOrder(type) {
    activeSearchType = type;
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
      <span
        class:active={activeSearchType === 'relevance'}
        on:click={() => setSearchOrder('relevance')}>
        relevance
      </span>
      <span
        class:active={activeSearchType === 'newest'}
        on:click={() => setSearchOrder('newest')}>
        newest
      </span>
      <span
        class:active={activeSearchType === 'active'}
        on:click={() => setSearchOrder('active')}>
        active
      </span>
      <span
        class:active={activeSearchType === 'votes'}
        on:click={() => setSearchOrder('votes')}>
        votes
      </span>
    </p>
  </div>
{/if}
