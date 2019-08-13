<script>
  import { fade } from "svelte/transition";
  export let comments;
</script>

<style>
  .comments-container {
    padding-bottom: 20px;
    margin-top: 30px;
    border-top: 2px solid var(--vscode-textSeparator-foreground);
  }
  .comments-container p {
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 16px;
  }
  .comments-container p i {
    text-align: right;
  }
  .comments-container p strong {
    margin: 0 15px;
  }
</style>

{#if comments}
  <div class="comments-container" in:fade>
    {#each comments as comment}
      <p>
        <strong>
          {#if comment.score === 0}-{:else}{comment.score}{/if}
        </strong>
        {@html comment.body}
        <i>
          &nbsp;&nbsp;–&nbsp;&nbsp;{comment.owner.display_name} {comment.creation_date}
        </i>
      </p>
    {/each}
  </div>
{/if}
