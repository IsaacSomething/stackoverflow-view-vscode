<script>
  export let user;
</script>

<div>
  <p>
    <a href={user.link} title="External Link: {user.link}">
      {user.display_name}
    </a>
    {user.reputation}
  </p>
  <img
    src={user.profile_image}
    alt={user.display_name}
    height="32"
    width="32" />
</div>
