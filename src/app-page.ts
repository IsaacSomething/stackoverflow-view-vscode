import { Uri } from 'vscode';
import { posix } from 'path';

export function AppPageHtml(contextPath: string) {

  const cssGlobal: Uri = Uri.file(posix.join(contextPath, 'app', 'public', 'global.css')).with({ scheme: 'vscode-resource' });
  const cssBundle: Uri = Uri.file(posix.join(contextPath, 'app', 'public', 'bundle.css')).with({ scheme: 'vscode-resource' });
  const jsFile: Uri = Uri.file(posix.join(contextPath, 'app', 'public', 'bundle.js')).with({ scheme: 'vscode-resource' });

  /* TODO:  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src vscode-resource:; style-src vscode-resource:;" /> */

  return `
  <!doctype html>
    <html>

      <head>
        <meta charset='utf8'>
        <meta name='viewport' content='width=device-width'>
        
        <title> Learn In Visual Studio Code </title>

        <link rel='stylesheet' href='${cssGlobal}'>
        <link rel='stylesheet' href='${cssBundle}'>

        <script defer src='${jsFile}'></script>
        
      </head>

      <body></body>

    </html>`;

}