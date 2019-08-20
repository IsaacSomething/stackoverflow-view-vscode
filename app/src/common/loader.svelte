<style>
  .loader-item {
    height: 2px;
    background: var(--vscode-textSeparator-foreground);
    overflow: hidden;
    position: absolute;
    top: 0;
    width: calc(100% - 48px);
  }
  .loader-item::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: var(--vscode-textLink-foreground);
    animation: loader-item 600ms linear infinite;
  }
  @keyframes loader-item {
    0% {
      transform: translateX(-90vw);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>

<div class="loader-item" />
