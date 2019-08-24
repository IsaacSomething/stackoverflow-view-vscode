<script>
  import { i18n } from "../stores/i18n.js";
  import { formatNumber } from "../stores/common.js";
  import { formatDate } from "../stores/format-date.js";

  export let user;
  export let createdDate;
  export let isQuestion = false;

  const isTypeOf = isQuestion ? "question" : "answer";
  $: atTime = formatDate(createdDate, $i18n, isTypeOf);
  $: rep = formatNumber(user.reputation);
</script>

<style>
  section {
    background-color: var(--vscode-textLink-foreground);
    color: var(--vscode-badge-foreground);
    max-width: 200px;
    min-width: 200px;
    padding: 10px;
    font-size: 13px;
    float: right;
  }
  section a {
    color: var(--vscode-badge-foreground);
    padding-top: 2px;
  }
  section.is-question {
    background-color: transparent;
    color: var(--vscode-foreground);
  }
  section.is-question a {
    color: var(--vscode-textLink-foreground);
  }
  img {
    float: left;
    margin-right: 10px;
    margin-top: 5px;
  }
  .gold {
    color: gold;
  }
  .silver {
    color: silver;
  }
  .bronze {
    color: peru;
  }
</style>

<section class:is-question={!isQuestion}>
  {atTime}
  <br />
  {#if user.profile_image}
    <img
      src={user.profile_image}
      alt={user.display_name}
      height="32"
      width="32" />
  {/if}
  {#if user.link}
    <a href={user.link} title="External Link: {user.link}">
      {user.display_name}
    </a>
  {:else}{user.display_name}{/if}
  <br />
  {#if rep}
    <strong>{rep}</strong>
  {/if}
  {#if user.badge_counts}
    <span class="gold">●</span>
    {user.badge_counts.gold}
    <span class="silver">●</span>
    {user.badge_counts.silver}
    <span class="bronze">●</span>
    {user.badge_counts.bronze}
  {/if}
</section>
