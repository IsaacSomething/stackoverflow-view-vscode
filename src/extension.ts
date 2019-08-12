import * as vscode from 'vscode';
import { posix } from 'path';
import { AppPageHtml } from './app-page';

export function activate(context: vscode.ExtensionContext) {

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let searchStackoverflow = vscode.commands.registerCommand('extension.searchStackoverflow', () => {

    // Search options
    const searchOptions: vscode.InputBoxOptions = {
      placeHolder: 'Search Stackoverflow',
      prompt: '*Required'
    };

    // Show Input
    vscode.window.showInputBox(searchOptions).then((searchQuery: string | undefined) => {
      console.log('searchTerm', searchQuery);

      if (searchQuery) {
        // Create webview panel
        const stackoverflowPanel = vscode.window.createWebviewPanel('webview', 'Stackoverflow:', vscode.ViewColumn.Active, {
          localResourceRoots: [vscode.Uri.file(posix.join(context.extensionPath, 'app', 'public'))],
          enableScripts: true,
          retainContextWhenHidden: true
        });

        // Set webview - svelte built to ./app/public/*
        stackoverflowPanel.webview.html = AppPageHtml(context.extensionPath);

        stackoverflowPanel.webview.postMessage({
          action: 'search',
          query: searchQuery
        });

        // Post search term
      } else {
        // Error: InputBox is empty
        vscode.window.showErrorMessage('Search value was null: Please enter a valid search string in order to search stackoverflow');
      }

    });


  });

  context.subscriptions.push(searchStackoverflow);
}

export function deactivate() { }
