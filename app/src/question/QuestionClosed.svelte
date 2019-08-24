<script>
  import { i18n } from "../stores/i18n.js";
  import { formatDate } from "../stores/format-date.js";

  export let details;
  export let closedDate;
  export let reason;

  $: atTime = formatDate(closedDate, $i18n, "generic");
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
    <strong class="text-capitalize">{$i18n.text.closed}</strong>
    {$i18n.text.as}
    <strong>
      {@html reason}
    </strong>
    {$i18n.text.on} {atTime}
  </header>
  <p>
    {@html details.description}
  </p>
</blockquote>
