import { Position, Range } from "vscode";

const vscode = require('vscode');

export default class EditorUtil{

    static openFile(filePath: string){
        var fileUri = vscode.Uri.file(filePath);

        vscode.workspace.openTextDocument(fileUri).then((doc: any) => {
            vscode.window.showTextDocument(doc);
        });
    }

    static getSelectedFileFolder(): string|null{
        let selectedFileName = EditorUtil.getSelectedFileName();

        if(selectedFileName == null)
            return null;

        return require('path').dirname(selectedFileName);
    }

    static getSelectedFileName(): string|null{
        if(vscode.window.activeTextEditor == null)
             return null;

        return vscode.window.activeTextEditor.document.fileName;
    }

    static getSelectedFileContent(): string{
        if(vscode.window.activeTextEditor == null)
             return "";

        return vscode.window.activeTextEditor.document.getText();
    }

    static setSelectedFileContent(fileContent: string){
        if(vscode.window.activeTextEditor == null)
             return;

        vscode.window.activeTextEditor.edit(b => {
            let line = 0;
            let column = 0;
            b.delete(new Range(new Position(0, 0), new Position(vscode.window.activeTextEditor.document.lineCount-1, EditorUtil.getSelectedFileContent().length)));
            b.insert(new vscode.Position(line, column), fileContent);
        });
    }

    static insertText(text: string){
        if(vscode.window.activeTextEditor == null)
             return;

        vscode.window.activeTextEditor.edit(b => {            
            b.insert(vscode.window.activeTextEditor.selection.end, text);
        });
    }

    static insertInSelection(text: string){
        if(vscode.window.activeTextEditor == null)
             return;

        vscode.window.activeTextEditor.edit(b => { 
            let selectionStart = vscode.window.activeTextEditor.selection.end;
               
            b.delete(vscode.window.activeTextEditor.selection);
            b.insert(selectionStart, text);
        });
    }
}