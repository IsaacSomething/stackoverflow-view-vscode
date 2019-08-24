<script>
  import { onMount } from "svelte";
  import { i18n } from "../stores/i18n.js";
  import { searchQuery } from "../stores/common.js";

  let query;

  onMount(() => {
    query = $searchQuery;
  });
</script>

<p>
  {$i18n.text.no_results_abbr_01}
  <strong>
    <i>"{query}"</i>
    .
  </strong>
  {$i18n.text.no_results_abbr_02}
</p>
