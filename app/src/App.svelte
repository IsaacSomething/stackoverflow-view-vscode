<script>
  import Leet from "./common/Leet.svelte";
  import Question from "./question/Question.svelte";
  import Search from "./search/Search.svelte";

  const vscode = acquireVsCodeApi();
  let searchQuery;
  let searchData;
  let section;
  let questionId;

  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    if (searchQuery === "1337") {
      section = "leeeeeeet";
    } else if (event.data.action === "topPick") {
      questionId = event.data.questionId;
      section = "question";
    } else if (event.data.action === "search") {
      searchQuery = event.data.query;
      section = "search";
    }
  });

  // From SearchResultBlock component
  function handleGotoQuestion(event) {
    section = "question";
    questionId = event.detail.questionId;
  }

  function handleGotoSearch() {
    section = "search";
  }
</script>

<style>
  h3 {
    font-weight: normal;
    color: var(--vscode-textLink-foreground);
    margin: 0;
  }
</style>

<h3>
  Stack
  <strong>overflow</strong>
</h3>

{#if section === 'question'}
  <Question on:gotoSearch={handleGotoSearch} {questionId} {vscode} />
{:else if section === 'leeeeeeet'}
  <Leet />
{:else if section === 'search'}
  <Search {searchQuery} {vscode} />
{/if}
