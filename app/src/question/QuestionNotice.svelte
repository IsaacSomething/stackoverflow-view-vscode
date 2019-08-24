<script>
  import { i18n } from "../stores/i18n.js";
  import { formatDate } from "../stores/format-date.js";

  export let notice;
  
  $: atTime = formatDate(notice.creation_date,$i18n,'generic')
</script>

<style>
  blockquote {
    background-color: var(--vscode-textBlockQuote-background);
    color: var(--vscode-errorForeground);
    margin: 30px 0 20px;
    border: 0;
    padding: 20px 13px 10px 20px;
  }
  header {
    font-size: 15px;
  }
</style>

<blockquote>
  <header>
    <strong class="text-capitalize">{$i18n.text.locked}</strong>
    {$i18n.text.on} {atTime}
  </header>
  {@html notice.body}
</blockquote>
