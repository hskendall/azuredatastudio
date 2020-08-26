/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as azdata from 'azdata';
import { MigrationWizardPage } from '../models/migrationWizardPage';
import { SOURCE_CONFIGURATION_PAGE_TITLE, COLLECTING_SOURCE_CONFIGURATIONS, COLLECTING_SOURCE_CONFIGURATIONS_INFO, COLLECTING_SOURCE_CONFIGURATIONS_ERROR } from '../models/strings';
import { MigrationStateModel, StateChangeEvent, State } from '../models/stateMachine';
import { Disposable } from 'vscode';

export class SourceConfigurationPage extends MigrationWizardPage {
	constructor(migrationStateModel: MigrationStateModel) {
		super(azdata.window.createWizardPage(SOURCE_CONFIGURATION_PAGE_TITLE), migrationStateModel);
	}

	public async registerWizardContent(): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			this.wizardPage.registerContent(async (view) => {
				try {
					await this.registerContent(view);
					resolve();
				} catch (ex) {
					reject(ex);
				} finally {
					reject(new Error());
				}
			});
		});
	}

	private async registerContent(view: azdata.ModelView) {
		await this.initialState(view);
	}

	private gatheringInfoComponent!: azdata.FormComponent;
	private async initialState(view: azdata.ModelView) {
		this.gatheringInfoComponent = this.createGatheringInfoComponent(view);
		const form = view.modelBuilder.formContainer().withFormItems(
			[
				this.gatheringInfoComponent
			],
			{
				titleFontSize: '20px'
			}
		).component();

		await view.initializeModel(form);
	}

	// private async createInformationGatheredPage(view: azdata.ModelView){

	// }

	private async enterErrorState() {
		const component = this.gatheringInfoComponent.component as azdata.TextComponent;
		component.value = COLLECTING_SOURCE_CONFIGURATIONS_ERROR(this.migrationStateModel.gatheringInformationError);
	}

	private async enterTargetSelectionState() {

	}

	//#region component builders
	private createGatheringInfoComponent(view: azdata.ModelView): azdata.FormComponent {
		let explaination = view.modelBuilder.text().withProperties<azdata.TextComponentProperties>({
			value: COLLECTING_SOURCE_CONFIGURATIONS_INFO,
			CSSStyles: {
				'font-size': '14px'
			}
		});

		return {
			component: explaination.component(),
			title: COLLECTING_SOURCE_CONFIGURATIONS
		};
	}
	//#endregion

	private eventListener: Disposable | undefined;
	public async onPageEnter(): Promise<void> {
		this.eventListener = this.migrationStateModel.stateChangeEvent(async (e) => this.onStateChangeEvent(e));
	}

	public async onPageLeave(): Promise<void> {
		this.eventListener?.dispose();
	}

	protected async handleStateChange(e: StateChangeEvent): Promise<void> {
		switch (e.newState) {
			case State.COLLECTION_SOURCE_INFO_ERROR:
				return this.enterErrorState();
			case State.TARGET_SELECTION:
				return this.enterTargetSelectionState();
		}
	}
}
