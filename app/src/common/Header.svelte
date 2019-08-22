<script>
  import { i18n } from "../stores/i18n.js";
  import { section } from "../stores/common.js";
  import { createEventDispatcher } from "svelte";

  export let extensionAction;

  const dispatch = createEventDispatcher();
  function goBack() {
    dispatch("goBack");
  }
</script>

<style>
  h3 {
    font-weight: normal;
    color: var(--vscode-textLink-foreground);
    margin: 0;
  }
  .back {
    cursor: pointer;
  }
  .back span::before {
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    display: inline-block;
    height: 0.45em;
    left: 0;
    position: relative;
    top: 6px;
    transform: rotate(-135deg);
    vertical-align: top;
    width: 0.45em;
    cursor: pointer;
  }
  small {
    color: var(--vscode-textLink-foreground);
    margin-left: 12px;
  }
</style>

<h3 class="text-capitalize">
  {#if ($section === 'question' && extensionAction === 'search') || $section === 'tag'}
    <div class="back text-capitalize" on:click={goBack}>
      <span />
      {$i18n.text.back_to_search_results}
    </div>
  {:else}
    Stack
    <strong>overflow</strong>
    {#if $i18n && $i18n.code !== ''}
      <small>
        <i>{$i18n.language}</i>
      </small>
    {/if}
  {/if}
</h3>
