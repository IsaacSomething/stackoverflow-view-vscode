<script>
  import { createEventDispatcher } from "svelte";
  import SearchTips from "./SearchTips.svelte";

  const dispatch = createEventDispatcher();
  export let tagData;
  export let language;
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
    <h1>{language.text.search_results}</h1>
    <span class="link" on:click={toggleAdvancedTips}>
      {#if !showTips}
        {language.text.advanced_search_tips}
      {:else}{language.text.close_search_tips}{/if}
    </span>
  </div>
  {#if showTips}
    <SearchTips />
  {/if}
{:else}
  <h1>{language.text.questions_tagged} [{tagData.tag_name}]</h1>
  {#if tagData.excerpt}
    <p>
      {@html tagData.excerpt}
      {#if tagData.body !== ''}
        <span class="link" on:click={learnMoreAboutTag}>
          <strong>...{language.text.learn_more}</strong>
        </span>
      {/if}
    </p>
  {/if}
{/if}
