<script>
  import { createEventDispatcher } from "svelte";
  export let section;
  export let language;
  export let eventAction;

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
  }
</style>

<h3>
  {#if (section === 'question' && eventAction === 'search') || section === 'tag'}
    <div class="back" on:click={goBack}>
      <span />
      Back to search
      <strong>results</strong>
    </div>
  {:else if section === 'leeeeeeet'}
    5t4©k
    <strong>0\/3rf10w</strong>
  {:else}
    Stack
    <strong>overflow</strong>
    {#if language && language.code !== ''}
      <small>
        &nbsp;
        <i>{language.language}</i>
      </small>
    {/if}
  {/if}
</h3>
