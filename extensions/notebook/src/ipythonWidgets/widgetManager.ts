/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { shims } from '@jupyter-widgets/base';

import { Kernel } from '@jupyterlab/services';
import * as jupyterlab from '@jupyter-widgets/jupyterlab-manager';
import { RenderMimeRegistry, standardRendererFactories } from '@jupyterlab/rendermime';
import { DocumentContext } from './documentContext';

export class WidgetManager extends jupyterlab.WidgetManager {

	public kernel: Kernel.IKernelConnection;
	public el: HTMLElement;

	constructor(kernel: Kernel.IKernelConnection, el: HTMLElement) {
		super(new DocumentContext(kernel),
			new RenderMimeRegistry({
				initialFactories: standardRendererFactories
			}),
			{ saveState: false });
		this.kernel = kernel;

		kernel.registerCommTarget(this.comm_target_name, async (comm, msg) => {
			const oldComm = new shims.services.Comm(comm);
			await this.handle_comm_open(oldComm, msg);
		});
	}


	/**
	 * Create a comm.
	 */
	async _create_comm(
		target_name: string,
		model_id: string,
		data?: any,
		metadata?: any
	): Promise<shims.services.Comm> {
		const comm = this.kernel.connectToComm(target_name, model_id);
		if (data || metadata) {
			comm.open(data, metadata);
		}
		return Promise.resolve(new shims.services.Comm(comm));
	}

	/**
	 * Get the currently-registered comms.
	 */
	_get_comm_info(): Promise<any> {
		return this.kernel
			.requestCommInfo({ target_name: this.comm_target_name })
			.then((reply: { content: any; }) => (reply.content as any).comms);
	}

}
