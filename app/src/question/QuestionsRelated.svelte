<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let relatedQuestions;

  const dispatch = createEventDispatcher();
  function gotoRelatedQuestion(questionId, questionTitle) {
    dispatch("relatedQuestionSearch", {
      questionId: questionId,
      questionTitle: questionTitle
    });
    dispatch("closeRelatedQuestions");
  }
</script>

<style>
  section {
    margin-top: 26px;
  }
  header {
    float: left;
    font-size: 11px;
    min-width: 40px;
    text-align: center;
    margin-right: 16px;
    padding: 1px 4px;
    font-weight: bold;
  }
  .is-answered,
  .has-answer {
    border-radius: 2px;
  }
  .is-answered {
    background-color: var(--vscode-textLink-foreground);
    color: var(--vscode-badge-foreground);
  }
  .has-answer {
    border: 1px solid var(--vscode-textLink-foreground);
  }
  p {
    font-size: 13px;
  }
</style>

<section in:fade>
  {#each relatedQuestions as question}
    <header
      class:is-answered={question.is_answered}
      class:has-answer={question.answer_count}>
      {question.score}
    </header>
    <p
      class="link"
      on:click={() => gotoRelatedQuestion(question.question_id, question.title)}>
      {@html question.title}
    </p>
  {/each}
</section>
