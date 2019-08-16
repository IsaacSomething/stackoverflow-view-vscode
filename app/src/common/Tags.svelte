<script>
  import { createEventDispatcher } from "svelte";
  export let tags;

  const dispatch = createEventDispatcher();
  function searchByTag(tag) {
    dispatch("searchByTag", { tag: tag });
  }
</script>

<style>
  .tag {
    background-color: var(--vscode-badge-background);
    color: var(--vscode-badge-foreground);
    padding: 0 4px 2px;
    margin-right: 4px;
    border-radius: 2px;
    font-size: 11px;
    cursor: pointer;
  }
</style>

{#each tags as tag}
  <strong class="tag" on:click={() => searchByTag(tag)}>{tag}</strong>
{/each}
