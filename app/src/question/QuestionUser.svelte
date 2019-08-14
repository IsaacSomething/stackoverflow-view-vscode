<script>
  import { format, fromUnixTime } from "date-fns";
  export let user;
  export let createdDate;
  console.log(createdDate);

  const date = fromUnixTime(createdDate);
  $: atTime = `asked ${format(date, "MMM dd")} '${format(
    date,
    "yy"
  )} at ${format(date, "HH:mm")}`;
</script>

<style>
  div {
    background-color: var(--vscode-badge-background);
    color: var(--vscode-badge-foreground);
    min-width: 200px;
    padding: 10px;
  }
  div a {
    color: var(--vscode-badge-foreground);
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

<div>
  {atTime}
  <br />
  <img
    src={user.profile_image}
    alt={user.display_name}
    height="32"
    width="32" />
  <a href={user.link} title="External Link: {user.link}">{user.display_name}</a>
  <br />
  <strong>{user.reputation}</strong>
  <span class="gold">●</span>
  {user.badge_counts.gold}
  <span class="silver">●</span>
  {user.badge_counts.silver}
  <span class="bronze">●</span>
  {user.badge_counts.bronze}
</div>
