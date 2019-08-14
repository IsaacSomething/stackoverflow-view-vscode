<script>
  export let user;
</script>

<style>

</style>

<div>
  <p>
    <a href={user.link} title="External Link: {user.link}">
      {user.display_name}
    </a>
    bronze: {user.badge_counts.bronze} silver: {user.badge_counts.silver} gold: {user.badge_counts.gold}
    {user.reputation}
  </p>
  <img
    src={user.profile_image}
    alt={user.display_name}
    height="32"
    width="32" />
</div>
