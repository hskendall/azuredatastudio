/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as azdata from 'azdata';
import * as vscode from 'vscode';
import { MigrationStateModel } from '../models/stateMachine';
import { SourceConfigurationPage } from './sourceConfigurationPage';
import { WIZARD_TITLE } from '../models/strings';
import { MigrationWizardPage } from '../models/migrationWizardPage';

export class WizardController {
	constructor(private readonly extensionContext: vscode.ExtensionContext) {

	}

	public async openWizard(profile: azdata.connection.Connection): Promise<void> {
		const stateModel = new MigrationStateModel(profile);
		this.extensionContext.subscriptions.push(stateModel);

		this.createWizard(stateModel);
	}

	private async createWizard(stateModel: MigrationStateModel): Promise<void> {
		const wizard = azdata.window.createWizard(WIZARD_TITLE, 'wide');
		wizard.generateScriptButton.enabled = false;
		const sourceConfigurationPage = new SourceConfigurationPage(stateModel);

		const pages: MigrationWizardPage[] = [sourceConfigurationPage];

		wizard.pages = pages.map(p => p.getwizardPage());

		const wizardSetupPromises: Thenable<void>[] = [];
		wizardSetupPromises.push(sourceConfigurationPage.registerWizardContent());
		wizardSetupPromises.push(wizard.open());

		wizard.onPageChanged(async (pageChangeInfo: azdata.window.WizardPageChangeInfo) => {
			const newPage = pageChangeInfo.newPage;
			const lastPage = pageChangeInfo.lastPage;

			await pages[lastPage]?.onPageLeave();
			await pages[newPage]?.onPageEnter();
		});


		await Promise.all(wizardSetupPromises);
		await pages[0].onPageEnter();
	}
}
