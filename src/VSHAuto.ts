import * as vscode from 'vscode';
import { FileUtil } from './util/fileUtil';
import './util/TerminalUtil';
import _TerminalUtil from './util/TerminalUtil';
import _EditorUtil from './util/EditorUtil';
import DefaultTemplates from './templates/defaultTemplates'


//make classes availe inside eval
var TerminalUtil = _TerminalUtil;
var EditorUtil = _EditorUtil;

export class VSHAuto{
    

    static showCommandsInPickUp(context: vscode.ExtensionContext){
        const SCRIPT_PATH = context.extensionPath.replace(/\\/g, "/") + "/scripts";

        VSHAuto.createScriptFolderIfNotExists(SCRIPT_PATH);

        FileUtil.createFolderIfNotExists(SCRIPT_PATH);

        let scriptNames: string[] = FileUtil.getDirectoryFilesList(SCRIPT_PATH);
        let scriptNameWithoutExt: string[] = FileUtil.removeExtension(SCRIPT_PATH);

        vscode.window.showQuickPick(scriptNameWithoutExt).then(selection => {
            let selectedIndex:number = scriptNameWithoutExt.indexOf('' + selection);
 
            let selectedFilePath:string = `${SCRIPT_PATH}/${scriptNames[selectedIndex]}`;

            let fileContent:string = require("fs").readFileSync(selectedFilePath).toString();

            eval(fileContent);
        });
    }
    static createScriptFolderIfNotExists(scriptPath: string) {
        const fs = require("fs");
        
        if(!fs.existsSync(scriptPath)){
            fs.mkdirSync(scriptPath);

            let templates =  DefaultTemplates.get();

            for(let i = 0; i < templates.length; i++){
                const template = templates[i];
                const templatePath = `${scriptPath}/${template.fileName}`;

                fs.writeFileSync(templatePath, template.template, {encoding: "utf8"});
            }
        }
    }
}