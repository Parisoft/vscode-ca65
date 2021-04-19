// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-ca65" is now active!');

	// Get the java home from the process environment.
	const { JAVA_HOME } = process.env;

	console.log(`Using java from JAVA_HOME: ${JAVA_HOME}`);
	// If java home is available continue.
	if (JAVA_HOME) {
		// Java execution path.
		let excecutable: string = path.join(JAVA_HOME, 'bin', 'java');

		// path to the launcher.jar
		let jarfile = path.join(__dirname, '..', 'lsp', 'ca65-language-server.jar');
		let debug = '-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8484';
		const args: string[] = [debug, '-jar', jarfile];

		// Set the server options 
		// -- java execution path
		// -- argument to be pass when executing the java command
		let serverOptions: ServerOptions = {
			command: excecutable,
			args: args,
			options: {}
		};

		// Options to control the language client
		let clientOptions: LanguageClientOptions = {
			// Register the server for plain text documents
			documentSelector: [{ scheme: 'file', language: 'ca65' }]
		};

		// Create the language client and start the client.
		let disposable = new LanguageClient('vscode-ca65', 'ca65 Language Server', serverOptions, clientOptions).start();

		// Disposables to remove on deactivation.
		context.subscriptions.push(disposable);
	}
}

// this method is called when your extension is deactivated
export function deactivate() { 
	console.log('Your extension "vscode-ca65" is now deactivated!');
}
