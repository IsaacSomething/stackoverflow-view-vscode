<script>
  import { fade } from "svelte/transition";
  import { format, fromUnixTime } from "date-fns";
  export let comments;
  let commentsShowAmount = 5;
  
  $: commentsLength = comments && comments.length - commentsShowAmount - 1;

  function setDate(date) {
    const dateFromUnix = fromUnixTime(date);
    return `asked ${format(date, "MMM dd")} '${format(date, "yy")} at ${format(
      date,
      "HH:mm"
    )}`;
  }

  function toggleComments() {
    commentsShowAmount = commentsShowAmount === 5 ? comments.length : 5;
  }
</script>

<style>
  .comments-container {
    padding-bottom: 20px;
    margin-top: 30px;
    border-bottom: 2px solid var(--vscode-textSeparator-foreground);
  }
  .comments-container p {
    border-bottom: 1px solid var(--vscode-textSeparator-foreground);
    padding-bottom: 16px;
  }
  .comments-container p:last-of-type {
    border-bottom: 0;
  }
  .comments-container p i {
    text-align: right;
  }
  .comments-container p strong {
    margin: 0 15px;
  }
  .user-name {
    background-color: var(--vscode-textLink-foreground);
    color: var(--vscode-badge-foreground);
    padding: 0 4px 1px;
    font-size: 11px;
  }
</style>

{#if comments}
  <div class="comments-container" in:fade>

    {#each comments as comment, i}
      {#if i <= commentsShowAmount}
        <p>
          <strong>
            {#if comment.score === 0}-{:else}{comment.score}{/if}
          </strong>
          {@html comment.body}
          <i>
            &nbsp;&nbsp;–&nbsp;&nbsp
            <span class="user-name">{comment.owner.display_name}</span>
            &nbsp {setDate(comment.creation_date)}
          </i>
        </p>
      {/if}
    {/each}

    <span class="link" on:click={toggleComments}>
      {#if comments.length > commentsShowAmount}
        show {commentsLength} more comments
      {:else if comments.length === commentsShowAmount}hide comments{/if}
    </span>

  </div>
{/if}
