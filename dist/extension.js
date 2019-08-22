module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app-page.ts":
/*!*************************!*\
  !*** ./src/app-page.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
const path_1 = __webpack_require__(/*! path */ "path");
function AppPageHtml(contextPath) {
    const cssGlobal = vscode_1.Uri.file(path_1.posix.join(contextPath, 'app', 'public', 'global.css')).with({ scheme: 'vscode-resource' });
    const cssBundle = vscode_1.Uri.file(path_1.posix.join(contextPath, 'app', 'public', 'bundle.css')).with({ scheme: 'vscode-resource' });
    const jsFile = vscode_1.Uri.file(path_1.posix.join(contextPath, 'app', 'public', 'bundle.js')).with({ scheme: 'vscode-resource' });
    // TODO: <meta http-equiv="Content-Security-Policy" content="default-src 'none';connect-src https://api.stackexchange.com/2.2/; img-src vscode-resource: https:; script-src vscode-resource:; style-src vscode-resource:;" />
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
exports.AppPageHtml = AppPageHtml;


/***/ }),

/***/ "./src/extension-model.ts":
/*!********************************!*\
  !*** ./src/extension-model.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ExtensionModel {
}
ExtensionModel.languages = [
    { language: 'English' },
    { language: 'Spanish' },
    { language: 'Russian' },
    { language: 'Portuguese' },
    { language: 'Japanese' },
];
ExtensionModel.topPickQuickInputItems = [{
        label: 'Why does HTML think "chucknorris" is a color?',
        detail: '712^ (Asked 7 years, 8 months ago)'
    }, {
        label: 'What\'s your favorite "programmer" cartoon?',
        detail: '835^ (Asked 10 years, 11 months ago)'
    }, {
        label: 'What is the best comment in source code you have ever encountered?',
        detail: '360^ (Asked 10 years, 10 months ago)'
    }, {
        label: 'How to pair socks from a pile efficiently?',
        detail: '3810^ (Asked 6 years, 6 months ago)'
    }, {
        label: 'What\'s the difference between JavaScript and Java?',
        detail: '77^ (Asked 10 years, 9 months ago)'
    }, {
        label: 'Strangest language feature',
        detail: '975^ (Asked 9 years, 7 months ago)'
    }, {
        label: 'Why does ++[[]][+[]]+[+[]] return the string "10"?',
        detail: '1582^ (Asked 7 years, 11 months ago)'
    }, {
        label: 'What\'s the least useful comment you\'ve ever seen?',
        detail: '20^ (10 years, 10 months ago)'
    }, {
        label: 'What was the strangest coding standard rule that you were forced to follow?',
        detail: '173^ (Asked 10 years, 9 months ago)'
    }, {
        label: 'What is the coolest thing you can do in <10 lines of simple code? Help me inspire beginners!',
        detail: '406^ (Asked 10 years, 3 months ago)'
    }, {
        label: 'What\'s your most controversial programming opinion?',
        detail: '363^ (Asked 10 years, 7 months ago)'
    }];
ExtensionModel.topPickIds = [{
        label: 'Why does HTML think "chucknorris" is a color?',
        id: '8318911',
        gif: 'https://giphy.com/embed/3yhmYJ0A5lQv6'
    }, {
        label: 'What\'s your favorite "programmer" cartoon?',
        id: '84556',
        gif: 'https://thecodinglove.com/wp-content/uploads/2019/07/img_2661-1.jpg'
    }, {
        label: 'What is the best comment in source code you have ever encountered?',
        id: '184618',
        gif: 'https://giphy.com/embed/ZHlGzvZb130nm'
    }, {
        label: 'How to pair socks from a pile efficiently?',
        id: '14415881',
        gif: 'https://giphy.com/embed/y65VoOlimZaus'
    }, {
        label: 'What\'s the difference between JavaScript and Java?',
        id: '245062',
        gif: 'https://giphy.com/embed/l36kU80xPf0ojG0Erg'
    }, {
        label: 'Strangest language feature',
        id: '1995113',
        gif: 'https://giphy.com/embed/5WhcSpUjK02f30sDQr'
    }, {
        label: 'Why does ++[[]][+[]]+[+[]] return the string "10"?',
        id: '7202157',
        gif: 'https://giphy.com/embed/8fjedJmOkkcTu'
    }, {
        label: 'What\'s the least useful comment you\'ve ever seen?',
        id: '143429',
        gif: 'https://giphy.com/embed/lz67zZWfWPsWnuGH0s'
    }, {
        label: 'What was the strangest coding standard rule that you were forced to follow?',
        id: '218123',
        gif: 'https://giphy.com/embed/c4u2gld3Or69i'
    }, {
        label: 'What is the coolest thing you can do in <10 lines of simple code? Help me inspire beginners!',
        id: '811074',
        gif: 'https://giphy.com/embed/Z543HuFdQAmkg'
    }, {
        label: 'What\'s your most controversial programming opinion?',
        id: '406760',
        gif: 'https://giphy.com/embed/UTY42CoHu6wixtxTDh'
    }];
exports.ExtensionModel = ExtensionModel;


/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(/*! vscode */ "vscode");
const extension_model_1 = __webpack_require__(/*! ./extension-model */ "./src/extension-model.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const app_page_1 = __webpack_require__(/*! ./app-page */ "./src/app-page.ts");
function activate(context) {
    /**
     * General stackoverflow question
     */
    let searchStackoverflow = vscode.commands.registerCommand('extension.searchStackoverflow', () => {
        // Search options
        const searchOptions = {
            placeHolder: 'Search Stackoverflow',
            prompt: '*Required',
        };
        // Show Input
        vscode.window.showInputBox(searchOptions).then((searchQuery) => {
            if (searchQuery) {
                // Get language
                const currentLanguageSelection = vscode.workspace.getConfiguration().get('stackoverflow.view.language');
                // Get sort type
                const currentSortTypeSelection = vscode.workspace.getConfiguration().get('stackoverflow.view.sort');
                // Create webview panel
                const stackoverflowPanel = createWebViewPanel(`SO: ${searchQuery}`, context.extensionPath);
                // Set webview - svelte - built to ./app/public/*
                stackoverflowPanel.webview.html = app_page_1.AppPageHtml(context.extensionPath);
                // Post search term, read in App.svelte as window.addEventListener("message"
                stackoverflowPanel.webview.postMessage({
                    action: 'search',
                    query: searchQuery,
                    language: currentLanguageSelection,
                    sortType: currentSortTypeSelection
                });
                // Show progress loader
                showWindowProgress(stackoverflowPanel);
                // Listen for changes to window title
                changeWindowTitle(stackoverflowPanel);
            }
        });
    });
    /**
     * Top pick stackoverflow articles
     */
    let topPickStackoverflow = vscode.commands.registerCommand('extension.topPickStackoverflow', () => {
        vscode.window.showQuickPick(extension_model_1.ExtensionModel.topPickQuickInputItems).then((selectedTopPick) => {
            if (selectedTopPick) {
                // Get article selected artical with ID
                const selectedArticle = extension_model_1.ExtensionModel.topPickIds.find((element) => {
                    return element.label === selectedTopPick.label;
                });
                // Get language
                const language = extension_model_1.ExtensionModel.languages[0];
                // Create webview panel
                const stackoverflowPanel = createWebViewPanel(`SO: ${selectedTopPick.label}`, context.extensionPath);
                // Set webview - svelte built to ./app/public/*
                stackoverflowPanel.webview.html = app_page_1.AppPageHtml(context.extensionPath);
                // Post article Id to app, read in App.svelte as window.addEventListener("message"
                stackoverflowPanel.webview.postMessage({
                    action: 'topPick',
                    language: language,
                    questionId: selectedArticle.id,
                    label: selectedArticle.label,
                    gif: selectedArticle.gif
                });
                // Show progress loader
                showWindowProgress(stackoverflowPanel);
            }
        });
    });
    context.subscriptions.push(searchStackoverflow);
    context.subscriptions.push(topPickStackoverflow);
}
exports.activate = activate;
/**
 * Create vscode webViewPanel - sets default html with connection to /app
 * @param panelTitle string
 * @param path string
 */
function createWebViewPanel(panelTitle, path) {
    return vscode.window.createWebviewPanel('webview', panelTitle, vscode.ViewColumn.Beside, {
        localResourceRoots: [vscode.Uri.file(path_1.posix.join(path, 'app', 'public'))],
        enableScripts: true,
        retainContextWhenHidden: true
    });
}
/**
 * Show progress in window - bottom left
 * @param title string
 */
function showWindowProgress(panel) {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window
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
function changeWindowTitle(panel) {
    panel.webview.onDidReceiveMessage(message => {
        if (message.command === 'titleChange') {
            panel.title = message.title;
        }
    });
}
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map