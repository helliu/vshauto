import * as vscode from 'vscode';
import { VSHAuto } from './VSHAuto';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('vshauto.showCommands', () => {
		VSHAuto.showCommandsInPickUp(context);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
