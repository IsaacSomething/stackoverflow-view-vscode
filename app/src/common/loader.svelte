<style>
  div {
    position: relative;
    display: block;
    width: 100%;
    height: 2px;
    overflow: hidden;
    background-color: var(--vscode-textSeparator-foreground);
    margin: -2px auto;
  }

  div:before {
    position: absolute;
    content: "";
    top: 0;
    left: -25%;
    width: 50%;
    height: 100%;
    background-color: var(--vscode-button-background);
    animation: loader 1.25s ease infinite;
  }

  @keyframes loader {
    0% {
    }
    50% {
      left: 75%;
    }
    100% {
    }
  }
</style>

<div class="loader" />
