<script>
  export let tagData;
  console.log("tagData pag", tagData);
</script>

<style>
  div {
    position: relative;
  }
  div h1 {
    margin: 0;
    display: inline-flex;
  }
  div span {
    background-color: var(--vscode-badge-background);
    color: var(--vscode-badge-foreground);
    padding: 0 4px 2px;
    margin: 8px 10px;
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

<div>
  <h1>About</h1>
  <span>{tagData.tag_name}</span>
</div>

<h3>Tag Info</h3>

<div class="excerpt">
  {@html tagData.excerpt}
</div>
{@html tagData.body}
