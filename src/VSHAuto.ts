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
 
            VSHAuto.executeScriptByName(context, scriptNames[selectedIndex]);
        });
    }

    static executeScriptByName(context: vscode.ExtensionContext, scriptName: string) {
        const SCRIPT_PATH = context.extensionPath.replace(/\\/g, "/") + "/scripts";

        let selectedFilePath:string = `${SCRIPT_PATH}/${scriptName}`;

        let fileContent:string = require("fs").readFileSync(selectedFilePath).toString();

        eval(fileContent);
    }

    static showCommandsToEditInPickUp(context: vscode.ExtensionContext){
        const SCRIPT_PATH = context.extensionPath.replace(/\\/g, "/") + "/scripts";

        VSHAuto.createScriptFolderIfNotExists(SCRIPT_PATH);

        FileUtil.createFolderIfNotExists(SCRIPT_PATH);

        let scriptNames: string[] = FileUtil.getDirectoryFilesList(SCRIPT_PATH);
        let scriptNameWithoutExt: string[] = FileUtil.removeExtension(SCRIPT_PATH);

        scriptNameWithoutExt = ["Create new Script..."].concat(scriptNameWithoutExt);

        vscode.window.showQuickPick(scriptNameWithoutExt).then(async selection => {
            let selectedIndex:number = scriptNameWithoutExt.indexOf('' + selection);

            if(selectedIndex == 0){
                let newScriptFileName = await vscode.window.showInputBox({title: "New script file name"});

                newScriptFileName = newScriptFileName.toLowerCase().endsWith(".js") ? newScriptFileName : newScriptFileName + ".js";
                
                let newScriptFilePath = `${SCRIPT_PATH}/${newScriptFileName}`;

                require("fs").writeFileSync(newScriptFilePath, "const vscode = require('vscode');\n\n", {encoding: "utf8"});
                EditorUtil.openFile(newScriptFilePath);
            }else{
                let selectedFilePath:string = `${SCRIPT_PATH}/${scriptNames[selectedIndex-1]}`;
                EditorUtil.openFile(selectedFilePath);
            }
        });
    }
    
	static listAllScriptsInfo(context: vscode.ExtensionContext): any[] {
        let commands = [];
		const SCRIPT_PATH = context.extensionPath.replace(/\\/g, "/") + "/scripts";

        VSHAuto.createScriptFolderIfNotExists(SCRIPT_PATH);

        FileUtil.createFolderIfNotExists(SCRIPT_PATH);

        let scriptNames: string[] = FileUtil.getDirectoryFilesList(SCRIPT_PATH);

        for(let i = 0; i < scriptNames.length; i++){
            const selectedFilePath:string = `${SCRIPT_PATH}/${scriptNames[i]}`;
            const fileContent:string =  require("fs").readFileSync(selectedFilePath).toString();
            const scriptName = scriptNames[i];
            const commandName:string = VSHAuto.extractCommandName(fileContent);

            commands.push({commandName, scriptName});
        }

        return commands;
	}

    private static extractCommandName(fileContent:string){
        //matches '// command: '
        const CMD_REGEX = /\/\/( )*?command( )*?:( )*?/;  
        
        let lines = fileContent.split('\n');

        if(lines.length == 0)
           return null;

        let firstScriptLine = fileContent.split('\n')[0];

        if(!CMD_REGEX.test(firstScriptLine))
            return null;        

        return firstScriptLine.replace(CMD_REGEX, '').replace(/ /g, '');
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