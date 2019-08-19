<style>
  .loader {
    height: 30px;
    width: 200px;
    position: absolute;
    top: 0;
    right: 10px;
  }
  .loader-item {
    width: 200px;
    height: 2px;
    background: var(--vscode-textSeparator-foreground);
    position: relative;
    overflow: hidden;
  }
  .loader-item::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 200px;
    background: var(--vscode-textLink-foreground);
    animation: loader-item 800ms linear infinite;
  }
  @keyframes loader-item {
    0% {
      transform: translateX(-300px);
    }
    100% {
      transform: translateX(300px);
    }
  }
</style>

<div class="loader">
  <div class="loader loader-item" />
</div>
