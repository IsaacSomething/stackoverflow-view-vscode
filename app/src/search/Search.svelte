<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";
  import SearchResultBlock from "./SearchResultBlock.svelte";

  export let searchQuery;

  const baseUri = "https://api.stackexchange.com/2.2/";
  const filter = "!)IMBoe*2yeLILOlNN)9vQ.Bnz8)vScF8LGsz";
  const key = "VP5SbX4dbH8MJUft7hjoaA((";
  const site = "stackoverflow";
  const uri = `${baseUri}search/advanced?q=${searchQuery}?pagesize=10&order=desc&sort=relevance&site=${site}&filter=${filter}&key=${key}`;

  fetch(uri).then(response => {
    if (response.status === 200) {
      console.log("search", response);

      response
        .clone()
        .json()
        .then(data => {
          console.log("searchData", data);
          searchData = data;

          const vscode = acquireVsCodeApi();
          vscode.postMessage({
            command: "progress",
            action: "stop"
          });
        });
    }
  });
</script>

<SearchTitle />
<h1>{searchQuery}</h1>
<!-- <SearchInput {searchQuery} {searchData} />
<SearchResultBlock {searchData} on:gotoQuestion={handleGotoQuestion} /> -->
