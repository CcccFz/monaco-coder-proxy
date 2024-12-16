#!/usr/bin/env node

import * as http from 'http';
import * as ws from 'ws';
import * as url from 'url';
import * as rpc from '@sourcegraph/vscode-ws-jsonrpc';
import * as rpcServer from '@sourcegraph/vscode-ws-jsonrpc/lib/server';

const serverPort = 8001;

const wss : ws.Server = new ws.Server({
  port: serverPort,
  path: '/ws/coder',
  perMessageDeflate: false
}, () => {
  console.log(`Listening to http and ws requests on ${serverPort}`);
});

wss.on('connection', async (client: ws, request: http.IncomingMessage) => {
  const socket : rpc.IWebSocket = toSocket(client);
  const connection = rpcServer.createWebSocketConnection(socket);

  let { path } = url.parse(request.url, true).query;
  path = path as string

  const localConnection = rpcServer.createServerProcess(`project ${path}`, 'clangd', ['-log=error'], {cwd: path});
  rpcServer.forward(connection, localConnection);
  console.log('Forwarding new client');

  socket.onClose((code, reason) => {
    console.log(`Client closed[${code}]`, reason);
    localConnection.dispose();
  });
});

function toSocket(webSocket: ws): rpc.IWebSocket {
  return {
    send: content => webSocket.send(content),
    onMessage: cb => webSocket.onmessage = event => cb(event.data),
    onError: cb => webSocket.onerror = event => {
      if ('message' in event) {
          cb((event as any).message)
      }
    },
    onClose: cb => webSocket.onclose = event => cb(event.code, event.reason),
    dispose: () => webSocket.close()
  }
}
