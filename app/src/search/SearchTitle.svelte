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
    <h1>{$i18n.text.search_results}</h1>
    <span class="link" on:click={toggleAdvancedTips}>
      {#if !showTips}
        {$i18n.text.advanced_search_tips}
      {:else}{$i18n.text.close_search_tips}{/if}
    </span>
  </div>
  {#if showTips}
    <SearchTips />
  {/if}
{:else}
  <h1>{$i18n.text.questions_tagged} [{tagData.tag_name}]</h1>
  {#if tagData.excerpt}
    <p>
      {@html tagData.excerpt}
      {#if tagData.body !== ''}
        <span class="link" on:click={learnMoreAboutTag}>
          <strong>...{$i18n.text.learn_more}</strong>
        </span>
      {/if}
    </p>
  {/if}
{/if}
