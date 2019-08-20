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
  div {
    display: block;
    width: 100%;
    height: 42px;
  }
  div h1 {
    float: left;
    margin-top: 6px;
  }
  div span {
    padding: 20px 10px 11px 10px;
    display: inline-block;
  }
  h1 {
    margin-bottom: 0;
  }
</style>

{#if !tagData}
  <div>
    <h1 class="text-capitalize">{$i18n.text.search_results}</h1>
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
  <h1 class="text-capitalize">{$i18n.text.questions_tagged} [{tagData.tag_name}]</h1>
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
