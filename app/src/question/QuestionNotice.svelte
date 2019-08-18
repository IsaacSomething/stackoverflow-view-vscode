<script>
  import { format, fromUnixTime } from "date-fns";
  export let notice;
  export let language;

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
    <strong>{language.text.locked}</strong>
    on {atTime}
  </header>
  {@html notice.body}
</blockquote>
