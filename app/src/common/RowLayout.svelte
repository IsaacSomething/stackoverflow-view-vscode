<style>
  .container {
    display: block;
  }
  .left {
    text-align: center;
    float: left;
  }
  .right {
  }
</style>

<div class="container">
  <div class="left">
    <slot name="left" />
  </div>
  <div class="right">
    <slot name="right" />
  </div>
</div>
