import * as vscode from 'vscode';
import { VSHAuto } from './VSHAuto';

export function activate(context: vscode.ExtensionContext) {

	let showCommands = vscode.commands.registerCommand('vshauto.showCommands', () => {
		VSHAuto.showCommandsInPickUp(context);
	});

	let editCommands = vscode.commands.registerCommand('vshauto.editCommands', () => {
		VSHAuto.showCommandsToEditInPickUp(context);
	});

	context.subscriptions.push(showCommands);
	context.subscriptions.push(editCommands);

	registerScriptCommands(context);
}

function registerScriptCommands(context: vscode.ExtensionContext){
	let scriptInfos = VSHAuto.listAllScriptsInfo(context);
	
	for(let i = 0; i < scriptInfos.length; i++){
		if(scriptInfos[i].commandName){
			let scriptCommand = vscode.commands.registerCommand(scriptInfos[i].commandName, () => VSHAuto.executeScriptByName(context, scriptInfos[i].scriptName));
 
			context.subscriptions.push(scriptCommand);
		}
	}
}

export function deactivate() {}
