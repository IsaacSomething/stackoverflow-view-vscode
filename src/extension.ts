import * as vscode from 'vscode';
import { ExtensionModel, ISortTypes } from './extension-model';
import { posix } from 'path';
import { AppPageHtml } from './app-page';

export function activate(context: vscode.ExtensionContext) {

  /**
   * General stackoverflow question
   */
  let searchStackoverflow = vscode.commands.registerCommand('extension.searchStackoverflow', () => {

    // Search options
    const searchOptions: vscode.InputBoxOptions = {
      placeHolder: 'Search Stackoverflow',
      prompt: '*Required',
    };

    // Show Input
    vscode.window.showInputBox(searchOptions).then((searchQuery: string | undefined) => {

      if (searchQuery) {

        // Get language
        const currentLanguageSelection = vscode.workspace.getConfiguration().get('stackoverflow.view.language');

        // Get sort type - set isSelected property
        const currentSortSelection = vscode.workspace.getConfiguration().get('stackoverflow.view.sort');
        ExtensionModel.sortTypes.find((element: ISortTypes) => {
          const labelIsEqualToSelectedSortType = element.label === currentSortSelection;
          element.isSelected = labelIsEqualToSelectedSortType;
          return labelIsEqualToSelectedSortType;
        });

        // Create webview panel
        const stackoverflowPanel = createWebViewPanel(`SO: ${searchQuery}`, context.extensionPath);
        // Set webview - svelte - built to ./app/public/*
        stackoverflowPanel.webview.html = AppPageHtml(context.extensionPath);
        // Post search term, read in App.svelte as window.addEventListener("message"
        stackoverflowPanel.webview.postMessage({
          action: 'search',
          query: searchQuery,
          language: currentLanguageSelection,
          sortTypes: ExtensionModel.sortTypes
        });

        // Show progress loader
        showWindowProgress(stackoverflowPanel, `Loading Stackoverflow Search Results`);

        // Listen for changes to window title
        changeWindowTitle(stackoverflowPanel);

      }

    });
  });

  /**
   * Top pick stackoverflow articles
   */
  let topPickStackoverflow = vscode.commands.registerCommand('extension.topPickStackoverflow', () => {

    vscode.window.showQuickPick(ExtensionModel.topPickQuickInputItems).then((selectedTopPick: vscode.QuickPickItem | undefined) => {

      if (selectedTopPick) {

        // Get article selected artical with ID
        const selectedArticle: any = ExtensionModel.topPickIds.find((element: any) => {
          return element.label === selectedTopPick.label;
        });

        // Get language
        const language: any = ExtensionModel.languages[0];

        // Create webview panel
        const stackoverflowPanel = createWebViewPanel(`SO: ${selectedTopPick.label}`, context.extensionPath);
        // Set webview - svelte built to ./app/public/*
        stackoverflowPanel.webview.html = AppPageHtml(context.extensionPath);
        // Post article Id to app, read in App.svelte as window.addEventListener("message"
        stackoverflowPanel.webview.postMessage({
          action: 'topPick',
          questionId: selectedArticle.id,
          gif: selectedArticle.gif,
          language: language
        });

        // Show progress loader
        showWindowProgress(stackoverflowPanel, 'Loading Stackoverflow Article');

      }
    });
  });

  context.subscriptions.push(searchStackoverflow);
  context.subscriptions.push(topPickStackoverflow);

}

/**
 * Create vscode webViewPanel - sets default html with connection to /app
 * @param panelTitle string
 * @param path string
 */
function createWebViewPanel(panelTitle: string, path: string): vscode.WebviewPanel {
  return vscode.window.createWebviewPanel('webview', panelTitle, vscode.ViewColumn.Beside, {
    localResourceRoots: [vscode.Uri.file(posix.join(path, 'app', 'public'))],
    enableScripts: true,
    retainContextWhenHidden: true
  });
}

/**
 * Show progress in window - bottom left
 * @param title string
 */
function showWindowProgress(panel: vscode.WebviewPanel, title: string) {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Window,
    title: title,
  }, (progress, token) => {

    // Resolve once GET is complete 
    // message has command: "progress", action: "stop" | "start" 
    const progressPromise = new Promise(resolve => {
      panel.webview.onDidReceiveMessage(message => {

        if (message.command === 'progress') {
          switch (message.action) {
            case 'start':
              progress.report({ message: 'Loading Stackoverflow Article' });
              break;
            case 'stop':
              resolve();
              break;
          }
        }

        if (message.error) {
          vscode.window.showErrorMessage(message.errorMessage);
        }

      });
    });

    return progressPromise;
  });
}

/**
 * Change window title based on user actions in the app
 * @param panel webview panel
 */
function changeWindowTitle(panel: vscode.WebviewPanel) {

  panel.webview.onDidReceiveMessage(message => {
    if (message.command === 'titleChange') {
      panel.title = message.title;
    }
  });

}

export function deactivate() { }
