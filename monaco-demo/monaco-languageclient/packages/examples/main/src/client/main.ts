/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { buildWorkerDefinition } from 'monaco-editor-workers';
import { createDefaultJsonContent, createJsonEditor, createUrl, createWebSocket } from '../common.js';

buildWorkerDefinition('../../../node_modules/monaco-editor-workers/dist/workers/', new URL('', window.location.href).href, false);

const start = async () => {
    // use the same common method to create a monaco editor for json
    await createJsonEditor({
        htmlElement: document.getElementById('container')!,
        content: createDefaultJsonContent(),
        init: true
    });

    // create the web socket
    const url = createUrl('192.168.110.100', 80, '/ws/coder?user_id=2&chip_id=risc_v');
    createWebSocket(url);
};

start();
