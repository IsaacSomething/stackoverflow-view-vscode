<style>
  .container {
    display: table;
  }
  .container .col {
    display: table-cell;
    padding: 10px 0px 10px 10px;
  }
  .container .col:first-child {
    text-align: center;
    width: 12%;
  }
  .container .col:last-child {
    text-align: left;
    word-break: keep-all;
  }
</style>

<div class="container">
  <div class="col left">
    <slot name="left" />
  </div>
  <div class="col right">
    <slot name="right" />
  </div>
</div>
