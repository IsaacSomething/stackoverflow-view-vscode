import * as vscode from 'vscode';
import { ExtensionModel } from './extension-model';
import { posix, resolve } from 'path';
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

        // Create webview panel
        const stackoverflowPanel = createWebViewPanel(`SO: ${searchQuery}`, context.extensionPath);
        // Set webview - svelte built to ./app/public/*
        stackoverflowPanel.webview.html = AppPageHtml(context.extensionPath);
        // Post search term, read in App.svelte as window.addEventListener("message"
        stackoverflowPanel.webview.postMessage({
          action: 'search',
          query: searchQuery
        });

        // Show progress loader
        showWindowProgress(`Loading Stackoverflow Search Results`, stackoverflowPanel);

      }

    });
  });

  /**
   * Random top pick stackoverflow article
   */
  let topPickStackoverflow = vscode.commands.registerCommand('extension.topPickStackoverflow', () => {

    vscode.window.showQuickPick(ExtensionModel.topPickQuickInputItems).then((selectedTopPick: vscode.QuickPickItem | undefined) => {

      if (selectedTopPick) {

        // Get article selected artical with ID
        const selectedArticle: any = ExtensionModel.topPickIds.find((element: any) => {
          return element.label === selectedTopPick.label;
        });

        // Create webview panel
        const stackoverflowPanel = createWebViewPanel(`SO: ${selectedTopPick.label}`, context.extensionPath);
        // Set webview - svelte built to ./app/public/*
        stackoverflowPanel.webview.html = AppPageHtml(context.extensionPath);
        // Post article Id to app, read in App.svelte as window.addEventListener("message"
        stackoverflowPanel.webview.postMessage({
          action: 'topPick',
          questionId: selectedArticle.id,
          gif: selectedArticle.gif
        });

        // Show progress loader
        showWindowProgress(`Loading Stackoverflow Article`, stackoverflowPanel);

        stackoverflowPanel.webview.onDidReceiveMessage(message => {
          if (message.command === 'progress' && message.action === 'start') {
            showWindowProgress(`Loading Stackoverflow Question`, stackoverflowPanel);
          }
        });

      }
    });
  });

  context.subscriptions.push(searchStackoverflow);
  context.subscriptions.push(topPickStackoverflow);

}

/**
 * Create a vscode webViewPanel
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
 * Show progress in window (bottom left)
 * @param title string
 */
function showWindowProgress(title: string, panel: vscode.WebviewPanel) {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Window,
    title: title,
  }, (progress, token) => {

    // Resolve once fetch() is complete 
    // message has command: "progress", action: "stop" | "start" 
    const progressPromise = new Promise(resolve => {
      panel.webview.onDidReceiveMessage(message => {
        if (message.command === 'progress' && message.action === 'stop') {
          resolve();
        }
      });
    });

    return progressPromise;
  });
}

export function deactivate() { }
