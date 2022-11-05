
export default class DefaultTemplates{

    static get(){
        return [
        {fileName: '01 - open scritps in vscode project.js', template:`// command: vshauto.open_scripts_new_instance
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

TerminalUtil.executeCommandInTerminal(\`code '\${SCRIPT_PATH}'\`);`},
    
        {fileName: '02 - open scripts in this vscode instance.js', template:`// command: vshauto.open_scripts
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

let workspaceFolders = vscode.workspace.workspaceFolders;

vscode.workspace.updateWorkspaceFolders(workspaceFolders ? workspaceFolders.length : 0,
    null,
    {
        uri: vscode.Uri.file(SCRIPT_PATH),
        name: require('path').basename(SCRIPT_PATH)
    });
`},
    
        {fileName: '03 - edit file.js', template:`// command: vshauto.edit_file
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

let fileContent = EditorUtil.getSelectedFileContent();

let changedFileContent = \`this file content was changed the original content is >>>\n \${fileContent} \n>>> end of original content\`;

EditorUtil.setSelectedFileContent(changedFileContent);`},
    
        {fileName: '04 - insert text at cursor position.js', template:`// command: vshauto.insert_text_at_cursor
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

EditorUtil.insertText("<INSERTED AT CURSOR>");`},
    
        {fileName: '05 - edit selected text.js', template:`// command: vshauto.edit_selected_text
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

EditorUtil.insertInSelection("CHANGED");`},
    
        {fileName: '06 - save current file.js', template:`// command: vshauto.save_current_file
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

vscode.commands.executeCommand('workbench.action.files.save');`},
    
        {fileName: '07 - messagebox example.js', template:`// command: vshauto.messagebox_example
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

vscode.window.showInformationMessage('HELLO!!!');`},
    
        {fileName: '08 - webview example.js', template:`// command: vshauto.webview_example
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

const panel = vscode.window.createWebviewPanel(
    'indentifierID', 
    'Window Title',
    vscode.ViewColumn.One,
    {}
);

panel.webview.html = \`
    <html>

    <head>
    </head>

    <body>
       <h1>My WebView</h1>
    </body>

    </html>
\`;`},
    
        {fileName: '09 - execute command in terminal.js', template:`// command: vshauto.execute_in_terminal
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

TerminalUtil.executeCommandInTerminal("ls");`},
    
        {fileName: '10 - get paths.js', template:`// command: vshauto.get_paths
// restart vscode is needed when command name is changed
// to add shortcut go to File -> Preferences -> Keyboard Shortcuts

const vscode = require('vscode');

let filePath = EditorUtil.getSelectedFileName();
let fileFolderPath = EditorUtil.getSelectedFileFolder();
let workspacePath = vscode.workspace.workspaceFolders.length > 0 ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';

TerminalUtil.executeCommandInTerminal(\`echo 'selected file: \${filePath}'\`);
TerminalUtil.executeCommandInTerminal(\`echo 'selected file folder: \${fileFolderPath}'\`);
TerminalUtil.executeCommandInTerminal(\`echo 'workspace folder: \${workspacePath}'\`);`},
    ];
    }

}