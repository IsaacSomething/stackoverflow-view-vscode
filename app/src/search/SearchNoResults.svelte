<script>
  export let searchQuery;
  export let language;
</script>

<style>
  p {
    font-size: 15px;
  }
</style>

<p>
  {language.text.no_results_abbr_01}
  <strong>
    <i>"{searchQuery}"</i>
    .
  </strong>
  {language.text.no_results_abbr_02}
</p>
