<script>
  import { i18n } from "../stores/i18n.js";
  import { format, fromUnixTime } from "date-fns";
  export let notice;

  const date = fromUnixTime(notice.creation_date);
  $: atTime = `${format(date, "MMM dd")} '${format(date, "yy")} at ${format(
    date,
    "HH:mm"
  )}`;
</script>

<style>
  blockquote {
    background-color: var(--vscode-textBlockQuote-background);
    color: var(--vscode-errorForeground);
    margin: 30px 0 20px;
    border: 0;
  }
</style>

<blockquote>
  <header>
    <strong>{$i18n.text.locked}</strong>
    {$i18n.text.on} {atTime}
  </header>
  {@html notice.body}
</blockquote>
