<script>
  import { i18n } from "../stores/i18n.js";
  import { createEventDispatcher } from "svelte";
  import SearchTips from "./SearchTips.svelte";

  const dispatch = createEventDispatcher();
  export let tagData;
  let showTips = false;

  function toggleAdvancedTips() {
    showTips = !showTips;
  }

  function learnMoreAboutTag() {
    dispatch("gotoTagLearnMore");
  }
</script>

<style>
  .header-container {
    height: 40px;
    display: flex;
    justify-content: flex-start;
  }
  h1 {
    margin-top: 6px;
  }
  .advanced-search-tips {
    margin: 20px;
  }
  .learn-more {
    margin-left: 3px;
  }
</style>

<div class="header-container">
  <h1 class="text-capitalize">
    {#if !tagData}
      {$i18n.text.search_results}
    {:else}{$i18n.text.questions_tagged} [{tagData.tag_name}]{/if}
  </h1>

  {#if !tagData}
    <span class="link advanced-search-tips" on:click={toggleAdvancedTips}>
      {#if !showTips}
        {$i18n.text.advanced_search_tips}
      {:else}{$i18n.text.close_search_tips}{/if}
    </span>
  {/if}
</div>

{#if showTips}
  <SearchTips />
{/if}

{#if tagData && tagData.excerpt}
  <p>
    {@html tagData.excerpt}
    {#if tagData.body !== ''}
      <span class="link learn-more" on:click={learnMoreAboutTag}>
        <strong>...{$i18n.text.learn_more}</strong>
      </span>
    {/if}
  </p>
{/if}
