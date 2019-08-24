<script>
  import { i18n } from "../stores/i18n.js";

  export let searchItem;
</script>

<style>
  section {
    text-align: center;
    float: left;
    width: 80px;
    margin: 0 22px;
  }
  section div {
    padding: 10px;
  }
  section h3 {
    margin: 0;
  }
  .answer-count.is-answered {
    border: 1px solid var(--vscode-textLink-foreground);
    color: var(--vscode-textLink-foreground);
    font-weight: bold;
    border-radius: 2px;
  }
  .answer-count.is-answered-full {
    background-color: var(--vscode-textLink-foreground);
    color: var(--vscode-button-foreground);
    font-weight: bold;
    border-radius: 2px;
  }
  @media screen and (max-width: 765px) {
    section {
      margin: 0 22px 0 0;
    }
  }
</style>

<section>
  <div>
    <h3>{searchItem.score}</h3>
    <small>
      {#if searchItem.score === 1}
        {$i18n.text.vote}
      {:else}{$i18n.text.votes}{/if}
    </small>
  </div>
  <div
    class="answer-count"
    class:is-answered={searchItem.is_answered}
    class:is-answered-full={searchItem.accepted_answer_id}>
    <h3>{searchItem.answer_count}</h3>
    <small>
      {#if searchItem.answer_count === 1}
        {$i18n.text.answer}
      {:else}{$i18n.text.answers}{/if}
    </small>
  </div>
</section>
