# vshauto README

VSHAuto allow you to write scripts to automate tasks inside VSCode. The scripts are in javascript, nodejs and have access to the VSCode plugin api.

## Features

**To use** press Ctrl + Alt + P select the script you want to execute.

![Demo](https://github.com/helliu/vshauto/blob/main/img/showScripts.gif?raw=true)

**To edit scripts** press Ctrl + Alt + , edit existent or add new scripts.

![Demo](https://github.com/helliu/vshauto/blob/main/img/editScripts.gif?raw=true)

Alternatively new scripts can be added by executing the buildin script "01 - open scritps in vscode project" or "02 - open scripts in this vscode instance", edit any script or add new js files as your news scripts!

**To add shortcuts** to scripts, add command name in the begining of script using:
```
// command: myCommandName
```
**Restart vscode is needed when command name is changed.**
\
After that go to File -> Preferences -> Keyboard Shortcuts.
