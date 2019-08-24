<script>
  import { i18n } from "../stores/i18n.js";
  import { fade } from "svelte/transition";

  export let tagData;
</script>

<style>
  div {
    position: relative;
  }
  h1 {
    margin: 0;
    display: inline-flex;
    text-transform: capitalize;
    margin-top: 6px;
  }
  div span {
    background-color: var(--vscode-badge-background);
    color: var(--vscode-badge-foreground);
    padding: 0 4px 4px 4px;
    margin: 12px;
    border-radius: 2px;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
  }
  .excerpt {
    border: 2px solid var(--vscode-textSeparator-foreground);
    padding: 10px;
  }
</style>

<div in:fade>
  <h1>{$i18n.text.about}</h1>
  <span>{tagData.tag_name}</span>

  <h3 class="text-capitalize">{$i18n.text.tag_info}</h3>

  <div class="excerpt">
    {@html tagData.excerpt}
  </div>

  {@html tagData.body}
</div>
