import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
import type { OpenEditor } from 'vscode/service-override/modelEditor';
export type InitializeServiceConfig = {
    enableDialogService?: boolean;
    enableNotificationService?: boolean;
    enableModelEditorService?: boolean;
    modelEditorServiceConfig?: {
        useDefaultFunction: boolean;
        openEditorFunc?: OpenEditor;
    };
    enableConfigurationService?: boolean;
    configurationServiceConfig?: {
        defaultWorkspaceUri: string;
    };
    enableThemeService?: boolean;
    enableKeybindingsService?: boolean;
    enableTextmateService?: boolean;
    enableLanguagesService?: boolean;
    enableAudioCueService?: boolean;
    enableDebugService?: boolean;
    enablePreferencesService?: boolean;
    enableSnippetsService?: boolean;
    userServices?: editor.IEditorOverrideServices;
    debugLogging?: boolean;
};
export declare const wasVscodeApiInitialized: () => boolean;
export declare const initServices: (config?: InitializeServiceConfig) => Promise<void>;
//# sourceMappingURL=monaco-vscode-api-services.d.ts.map