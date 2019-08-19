<script>
  import { i18n } from "../stores/i18n.js";

  export let totalResults;
  export let page;
  let activePage = 0;
  let pageNumbers = [10, 20, 30, 40, 50];

  function gotoPage(page, index) {
    activePage = index;
  }

  function gotoPageNext() {
    activePage += 1;
  }
</script>

<style>
  .bottom-buttons-container {
    padding: 20px 20px 20px 0;
  }
  button {
    min-width: auto;
    margin-right: 5px;
  }
  button.active {
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
  }
</style>

<div class="bottom-buttons-container">
  {#each pageNumbers as page, i}
    {#if totalResults > page}
      <button
        class="outline"
        class:active={activePage === i}
        on:click={() => gotoPage(page, i)}>
        {i + 1}
      </button>
    {/if}
  {/each}
  {#if totalResults > 11 && activePage !== 4}
    <button class="outline" on:click={gotoPageNext}>{$i18n.text.next}</button>
  {/if}
</div>
