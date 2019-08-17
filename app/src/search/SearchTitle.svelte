<script>
  import { createEventDispatcher } from "svelte";
  import SearchTips from "./SearchTips.svelte";

  export let tagData;

  let showTips = false;
  function toggleAdvancedTips() {
    showTips = !showTips;
  }

  const dispatch = createEventDispatcher();
  function learnMoreAboutTag() {
    dispatch("gotoTag");
  }
</script>

<style>
  .title-container {
    display: block;
    width: 100%;
    height: 42px;
  }
  .title-container h1 {
    float: left;
  }
  h1 {
    margin: 0;
  }
  .title-container span {
    padding: 11px 10px 11px 20px;
    display: inline-block;
  }
  p {
    font-size: 16px;
  }
</style>

{#if !tagData}
  <div class="title-container">
    <h1>Search Results</h1>
    <span class="link" on:click={toggleAdvancedTips}>
      {#if !showTips}Advanced Search Tips{:else}Close Search Tips{/if}
    </span>
  </div>

  {#if showTips}
    <SearchTips />
  {/if}
{:else}
  <h1>Questions tagged [{tagData.tag_name}]</h1>
  <p>
    {@html tagData.excerpt}
  </p>
  <span class="link" on:click={learnMoreAboutTag}>Learn more...</span>
{/if}
