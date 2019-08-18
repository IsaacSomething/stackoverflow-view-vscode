<script>
  const gifs = [
    "https://giphy.com/embed/LcfBYS8BKhCvK",
    "https://giphy.com/embed/Z543HuFdQAmkg",
    "https://giphy.com/embed/YQitE4YNQNahy",
    "https://giphy.com/embed/TOWeGr70V2R1K",
    "https://giphy.com/embed/11CXAq0P8h50GI",
    "https://giphy.com/embed/5ntdy5Ban1dIY",
    "https://giphy.com/embed/VcoeHax1CEpCE",
    "https://giphy.com/embed/yEMONcnJvnDRS",
    "https://giphy.com/embed/TfxRdpszkO0lq",
    "https://giphy.com/embed/137EaR4vAOCn1S",
    "https://giphy.com/embed/3oEdvcmeRvmKVVGfO8",
    "https://giphy.com/embed/yK3PyRmUj0T3W",
    "https://giphy.com/embed/3ohhwzREa9aeCP0Dio"
  ];
  const random = gifs[Math.floor(Math.random() * gifs.length)];
</script>

<style>
  iframe {
    margin: 42px 0;
    display: block;
  }
</style>

<iframe
  src={random}
  width="480"
  height="239"
  frameBorder="0"
  class="giphy-embed"
  allowFullScreen
  title="leet" />
