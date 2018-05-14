'use strict';

const WebSocketAwait = require('./lib/websocket.js');

const websocketDefaultPath = require.resolve('ws/lib/websocket.js');
require.cache[websocketDefaultPath].exports = WebSocketAwait;

WebSocketAwait.Server = require('ws/lib/websocket-server.js');
WebSocketAwait.Receiver = require('ws/lib/receiver.js');
WebSocketAwait.Sender = require('ws/lib/sender.js');

module.exports = WebSocketAwait;
