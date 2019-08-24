<style>
  section {
    height: 2px;
  }
  .loader {
    position: relative;
    display: block;
    width: 100%;
    height: 2px;
    overflow: hidden;
    background-color: var(--vscode-textSeparator-foreground);
    margin: -2px auto;
  }

  .loader:before {
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
    50% {
      left: 75%;
    }
  }
</style>

<section>
  <div class="loader" />
</section>
