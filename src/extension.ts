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
}

export function deactivate() {}
