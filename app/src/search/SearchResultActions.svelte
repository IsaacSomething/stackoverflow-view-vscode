<script>
  import { createEventDispatcher } from "svelte";

  export let totalResults;
  export let tagData;
  export let sortTypes;
  export let language;

  $: total = kFormatter(totalResults);
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  const dispatch = createEventDispatcher();
  function setSearchOrder(sortTypeIndex) {
    sortTypes.forEach((element, key) => {
      element.isSelected = key !== sortTypeIndex ? false : true;
    });
    dispatch("sortChange", {
      selectedSort: sortTypes[sortTypeIndex]
    });
  }

  function enableSearch() {
    dispatch("enableSearch");
  }

  function setLabel(label, index) {
    switch (language.code) {
      case "es.":
        return sortTypes[index].text.spanish;
        break;
      case "ru.":
        return sortTypes[index].text.russian;
        break;
      case "pt.":
        return sortTypes[index].text.portuguese;
        break;
      case "ja.":
        return sortTypes[index].text.japanese;
        break;
      default:
        return sortTypes[index].text.english;
        break;
    }
    return;
  }
</script>

<style>
  div {
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
    display: flex;
    height: 45px;
  }
  h3 {
    margin: 0;
    align-self: center;
    font-weight: normal;
  }
  p {
    align-self: center;
    text-align: right;
    flex: auto;
    margin: 0;
  }
  p span {
    margin-left: 10px;
    cursor: pointer;
    font-size: 14px;
  }
  p .active {
    color: var(--vscode-textLink-foreground);
    font-weight: bold;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--vscode-textLink-foreground);
  }
</style>

{#if totalResults}
  <div>
    <h3>
      {total}
      {#if language}{language.text.results}{/if}
    </h3>
    <p>
      {#if tagData}
        <span class="link" on:click={enableSearch}>
          <strong>{language.text.search}</strong>
        </span>
      {/if}
      {#each sortTypes as sort, i}
        <span class:active={sort.isSelected} on:click={() => setSearchOrder(i)}>
          {setLabel(sort.label, i)}
        </span>
      {/each}
    </p>
  </div>
{/if}
