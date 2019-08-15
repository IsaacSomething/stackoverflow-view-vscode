import * as vscode from 'vscode';
import { ExtensionModel } from './extension-model';
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
        // Create webview panel
        const stackoverflowPanel = vscode.window.createWebviewPanel('webview', `SO: ${searchQuery}`, vscode.ViewColumn.Beside, {
          localResourceRoots: [vscode.Uri.file(posix.join(context.extensionPath, 'app', 'public'))],
          enableScripts: true,
          retainContextWhenHidden: true
        });

        // Set webview - svelte built to ./app/public/*
        stackoverflowPanel.webview.html = AppPageHtml(context.extensionPath);

        // Post search term
        stackoverflowPanel.webview.postMessage({
          action: 'search',
          query: searchQuery
        });

      }

    });
  });

  /**
   * Random top pick stackoverflow article
   */
  let topPickStackoverflow = vscode.commands.registerCommand('extension.topPickStackoverflow', () => {

    vscode.window.showQuickPick(ExtensionModel.topPickQuickInputItems).then((selectedTopPick: vscode.QuickPickItem | undefined) => {

      if (selectedTopPick) {
        const selectedArticle: any = ExtensionModel.topPickIds.find((element: any) => {
          return element.label === selectedTopPick.label;
        });

        // Create webview panel
        const stackoverflowPanel = vscode.window.createWebviewPanel('webview', `SO: ${selectedTopPick.label}`, vscode.ViewColumn.Beside, {
          localResourceRoots: [vscode.Uri.file(posix.join(context.extensionPath, 'app', 'public'))],
          enableScripts: true,
          retainContextWhenHidden: true
        });

        // Set webview - svelte built to ./app/public/*
        stackoverflowPanel.webview.html = AppPageHtml(context.extensionPath);

        // Post article Id
        stackoverflowPanel.webview.postMessage({
          action: 'topPick',
          questionId: selectedArticle.id
        });

        showWindowProgress(`Loading Stackoverflow Article`, stackoverflowPanel);

      }
    });
  });

  context.subscriptions.push(searchStackoverflow);
  context.subscriptions.push(topPickStackoverflow);

}

/**
 * Show built in loader
 * @param title string
 */
function showWindowProgress(title: string, panel: vscode.WebviewPanel) {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Window,
    title: title,
  }, (progress, token) => {

    const progressPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 5000);
      // TODO: resolve once fetch() is complete - needs a listener
    });

    // Resolve once fetch() is complete - needs a listener
    panel.webview.onDidReceiveMessage(message => {
      console.log('message', message);
      if (message.command === 'progress' && message.action === 'stop') {
        console.log('TEST');
      }
    });

    return progressPromise;
  });
}

export function deactivate() { }
