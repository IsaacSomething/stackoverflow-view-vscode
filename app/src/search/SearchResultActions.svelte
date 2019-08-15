<script>
  export let totalResults;
</script>

<style>
  div {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
    display: flex;
  }
  h3 {
    margin-bottom: 7px;
  }
  p {
    align-self: center;
    text-align: right;
    flex: auto;
  }
</style>

{#if totalResults}
  <div>
    <h3>{totalResults} results</h3>
    <p>Relevance newest active votes</p>
  </div>
{/if}
