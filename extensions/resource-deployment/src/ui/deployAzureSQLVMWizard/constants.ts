/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();

// Deploy Azure SQL VM wizard constants
export const WizardTitle = localize('deployAzureSQLVM.NewSQLVMTitle', "Deploy Azure SQL VM");
export const WizardDoneButtonLabel = localize('deployAzureSQLVM.ScriptToNotebook', "Script to Notebook");
export const MissingRequiredInformationErrorMessage = localize('deployCluster.MissingRequiredInfoError', "Please fill out the required fields marked with red asterisks.");

// Azure settings page constants
export const AzureSettingsPageTitle = localize('deployAzureSQLVM.AzureSettingsPageTitle', "Azure settings");
export const AzureSettingsPageDescription = localize('deployAzureSQLVM.AzureSettingsPageDescription', "Configure the settings to create an Azure SQL Virtual Machine");
export const AzureAccountDropdownLabel = localize('deployAzureSQLVM.AzureAccountDropdownLabel', "Azure Account");
export const AzureAccountSubscriptionDropdownLabel = localize('deployAzureSQLVM.AzureSubscriptionDropdownLabel', "Azure Subscription");
export const AzureAccountResourceGroupDropdownLabel = localize('deployAzureSQLVM.ResourceGroup', "Resource Group");
export const AzureAccountRegionDropdownLabel = localize('deployAzureSQLVM.AzureRegionDropdownLabel', "Azure Region");

// VM settings page constants
export const VmSettingsPageTitle = localize('deployeAzureSQLVM.VmSettingsPageTitle', "Virtual machine settings");
export const VmSettingsPageDescription = localize('deployAzureSQLVM.VmSettingsPageDescription', "Configure the settings to create an Azure SQL Virtual Machine");
export const VmNameTextBoxLabel = localize('deployAzureSQLVM.VmNameTextBoxLabel', "Virtual machine name");
export const VmAdminUsernameTextBoxLabel = localize('deployAzureSQLVM.VmAdminUsernameTextBoxLabel', "Virtual machine username");
export const VmAdminPasswordTextBoxLabel = localize('deployAzureSQLVM.VmAdminPasswordTextBoxLabel', "Virtual machine password");
export const VmAdminConfirmPasswordTextBoxLabel = localize('deployAzureSQLVM.VmAdminConfirmPasswordTextBoxLabel', "Confirm password");
export const VmImageDropdownLabel = localize('deployAzureSQLVM.VmImageDropdownLabel', "Image");
export const VmSkuDropdownLabel = localize('deployAzureSQLVM.VmSkuDropdownLabel', "Image SKU");
export const VmVersionDropdownLabel = localize('deployAzureSQLVM.VmImageVersionDropdownLabel', "Image Version");
export const VmSizeDropdownLabel = localize('deployAzureSQLVM.VmSizeDropdownLabel', "Size");

// Network settings page constants
export const NetworkSettingsPageTitle = localize('deployAzureSQLVM.NetworkSettingsPageTitle', "Networking");
export const NetworkSettingsPageDescription = localize('deployAzureSQLVM.NetworkSettingsPageDescription', "Configure network settings");
export const VirtualNetworkDropdownLabel = localize('deployAzureSQLVM.VirtualNetworkDropdownLabel', "Virtual Network");
export const PublicIPDropdownLabel = localize('deployAzureSQLVM.PublicIPDropdownLabel', "Public IP");
export const RDPAllowCheckboxLabel = localize('deployAzureSQLVM.VmRDPAllowCheckboxLabel', "Enable RDP(3389) inbound Port");
