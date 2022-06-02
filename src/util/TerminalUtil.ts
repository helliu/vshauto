import * as vscode from 'vscode';

export default class TerminalUtil{

    static executeCommandInTerminal(command:string){
        TerminalUtil.getActiveOrOpenNewTerminal().then((terminal) => {
            terminal.sendText(command);
        });
    }

    private static getActiveOrOpenNewTerminal(): Promise<vscode.Terminal>{
        return new Promise((resolve, reject) => {
            if(vscode.window.activeTerminal)
                resolve(vscode.window.activeTerminal);
                
                vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal").then(
                    () => {
                        var numberOfTries = 100;
    
                        var interval = setInterval(function(){
                            if(vscode.window.activeTerminal)
                                resolve(vscode.window.activeTerminal);
                            else{
                                if(--numberOfTries < 1){
                                    clearInterval(interval);
                                    reject();
                                }
                            }
                        }, 100);
                    },
                    () => {reject()});
        });
    }
}