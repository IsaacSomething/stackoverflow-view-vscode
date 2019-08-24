import { WebviewPanel } from 'vscode';
import { Uri } from 'vscode';
import { posix } from 'path';

export function AppPageHtml(contextPath: string, panel: WebviewPanel) {

  panel.iconPath = Uri.file(posix.join(contextPath, 'src', 'images', 'logo-sml.png'));
  const cssGlobal: Uri = Uri.file(posix.join(contextPath, 'app', 'public', 'global.css')).with({ scheme: 'vscode-resource' });
  const cssBundle: Uri = Uri.file(posix.join(contextPath, 'app', 'public', 'bundle.css')).with({ scheme: 'vscode-resource' });
  const jsFile: Uri = Uri.file(posix.join(contextPath, 'app', 'public', 'bundle.js')).with({ scheme: 'vscode-resource' });
  return `
    <!doctype html>
    <html>

      <head>
        <meta charset='utf8'>
        <meta name='viewport' content='width=device-width'>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self';frame-src https://giphy.com/; connect-src https://api.stackexchange.com/2.2/; img-src vscode-resource: https:; script-src vscode-resource:; style-src vscode-resource: 'unsafe-inline';" />

        <title> Learn In Visual Studio Code </title>

        <link rel='stylesheet' href='${cssGlobal}'>
        <link rel='stylesheet' href='${cssBundle}'>

        <script defer src='${jsFile}'></script>
        
      </head>

      <body></body>

    </html>`;
}