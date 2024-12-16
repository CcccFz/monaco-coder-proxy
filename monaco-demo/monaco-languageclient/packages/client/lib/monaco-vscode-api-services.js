/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api.js';
import { initialize as initializeMonacoService } from 'vscode/services';
import { initialize as initializeVscodeExtensions } from 'vscode/extensions';
export const wasVscodeApiInitialized = () => {
    return window.MonacoEnvironment?.vscodeApiInitialised === true;
};
export const initServices = async (config) => {
    await importAllServices(config);
    if (config?.debugLogging === true) {
        console.log('initializeMonacoService completed successfully');
    }
    await initializeVscodeExtensions();
    if (config?.debugLogging === true) {
        console.log('initializeVscodeExtensions completed successfully');
    }
    (window.MonacoEnvironment ?? {}).vscodeApiInitialised = true;
};
const importAllServices = async (config) => {
    const promises = [];
    const serviceNames = [];
    const lc = config ?? {};
    const userServices = lc.userServices ?? {};
    const addService = (name, promise) => {
        promises.push(promise);
        serviceNames.push(name);
    };
    // files service is required
    addService('files', import('vscode/service-override/files'));
    if (lc.enableModelEditorService === true && lc.modelEditorServiceConfig !== undefined) {
        addService('modelEditor', import('vscode/service-override/modelEditor'));
    }
    if (lc.enableConfigurationService === true && lc.configurationServiceConfig !== undefined) {
        addService('configuration', import('vscode/service-override/configuration'));
    }
    if (lc.enableDialogService === true) {
        addService('dialogs', import('vscode/service-override/dialogs'));
    }
    if (lc.enableNotificationService === true) {
        addService('notifications', import('vscode/service-override/notifications'));
    }
    if (lc.enableThemeService === true) {
        addService('theme', import('vscode/service-override/theme'));
        // theme requires textmate
        lc.enableTextmateService = true;
    }
    if (lc.enableTextmateService === true) {
        addService('textmate', import('vscode/service-override/textmate'));
    }
    if (lc.enableKeybindingsService === true) {
        addService('keybindings', import('vscode/service-override/keybindings'));
    }
    if (lc.enableLanguagesService === true) {
        addService('languages', import('vscode/service-override/languages'));
    }
    if (lc.enableAudioCueService === true) {
        addService('audioCue', import('vscode/service-override/audioCue'));
    }
    if (lc.enableDebugService === true) {
        addService('debug', import('vscode/service-override/debug'));
    }
    if (lc.enablePreferencesService === true) {
        addService('preferences', import('vscode/service-override/preferences'));
    }
    if (lc.enableSnippetsService === true) {
        addService('snippets', import('vscode/service-override/snippets'));
    }
    const reportServiceLoading = (origin, services, debugLogging) => {
        for (const serviceName of Object.keys(services)) {
            if (debugLogging) {
                console.log(`Loading ${origin} service: ${serviceName}`);
            }
        }
    };
    const mergeServices = (services, overrideServices) => {
        for (const [name, service] of Object.entries(services)) {
            overrideServices[name] = service;
        }
    };
    let count = 0;
    const loadedImports = await Promise.all(Object.values(promises));
    const overrideServices = {};
    if (userServices) {
        mergeServices(userServices, overrideServices);
        reportServiceLoading('user', userServices, lc.debugLogging === true);
    }
    for (const loadedImport of loadedImports) {
        const serviceName = serviceNames[count];
        if (lc.debugLogging === true) {
            console.log(`Initialising provided service: ${serviceName}`);
        }
        let services = {};
        if (serviceName === 'modelEditor' && lc.enableModelEditorService) {
            const defaultOpenEditorFunc = async (model, options, sideBySide) => {
                console.log('Trying to open a model', model, options, sideBySide);
                return undefined;
            };
            if (lc.modelEditorServiceConfig?.useDefaultFunction) {
                services = loadedImport.default(defaultOpenEditorFunc);
            }
            else if (lc.modelEditorServiceConfig?.openEditorFunc) {
                services = loadedImport.default(lc.modelEditorServiceConfig.openEditorFunc);
            }
        }
        else if (serviceName === 'configuration' && lc.enableConfigurationService) {
            const uri = Uri.file(lc.configurationServiceConfig.defaultWorkspaceUri);
            services = loadedImport.default(uri);
        }
        else {
            services = loadedImport.default();
        }
        mergeServices(services, overrideServices);
        reportServiceLoading('user', services, lc.debugLogging === true);
        count++;
    }
    await initializeMonacoService(overrideServices);
};
//# sourceMappingURL=monaco-vscode-api-services.js.map