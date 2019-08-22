<script>
  import { i18n } from "../stores/i18n.js";

  export let searchQuery;
</script>

<style>
  p {
    font-size: 15px;
  }
</style>

<p>
  {$i18n.text.no_results_abbr_01}
  <strong>
    <i>"{searchQuery}"</i>
    .
  </strong>
  {$i18n.text.no_results_abbr_02}
</p>
