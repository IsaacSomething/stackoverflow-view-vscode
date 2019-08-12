<script>
  import SearchInput from "./SearchInput.svelte";
  import SearchTitle from "./SearchTitle.svelte";

  let searchQuery;
  // Search post from extension.ts on showInputBox()
  window.addEventListener("message", event => {
    console.log("event", event);
    if (event.data.action === "search") {
      console.log("query", event.data.query);
      //
      searchQuery = event.data.query;
    }
  });
</script>

<style>

</style>

<SearchTitle />
<SearchInput {searchQuery} />

<div>
  <h3>192</h3>
  <small>votes</small>
  <h3>23</h3>
  <small>answers</small>
</div>

<div>
  <header>Q: [this is the question]</header>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sint doloremque,
    iure excepturi aut ipsum, modi suscipit velit ducimus iusto laboriosam cum
    iste labore earum maiores explicabo facere asperiores inventore.
  </p>
</div>

<div>
  <span>[tag]</span>
  <span>[tag]</span>
  <span>[tag]</span>
</div>

<div>asked [date] by [user]</div>
