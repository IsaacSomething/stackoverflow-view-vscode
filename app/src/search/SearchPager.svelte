<script>
  import { createEventDispatcher } from "svelte";
  import { i18n } from "../stores/i18n.js";
  import { page } from "../stores/common.js";

  export let totalResults;
  let pageNumbers = [9, 10, 20, 30, 40];

  const dispatch = createEventDispatcher();
  function gotoPage(pageIndex) {
    pageIndex ? page.set(pageIndex) : page.set(($page += 1));
    dispatch("searchByPage");
  }
</script>

<style>
  section {
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

<section>
  {#each pageNumbers as pageNumber, i}
    {#if totalResults > pageNumber}
      <button
        class="outline"
        class:active={$page === i + 1}
        on:click={() => gotoPage(i + 1)}>
        {i + 1}
      </button>
    {/if}
  {/each}
  {#if totalResults > 10 && $page !== pageNumbers.length}
    <button class="outline" on:click={() => gotoPage(null)}>
      {$i18n.text.next}
    </button>
  {/if}
</section>
