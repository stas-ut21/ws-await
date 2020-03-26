'use strict';
/* istanbul ignore file */
/* eslint-disable max-params */
const WebSocketServer = require('ws/lib/websocket-server.js');
const crypto = require('crypto');

const PerMessageDeflate = require('ws/lib/permessage-deflate');
const extension = require('ws/lib/extension');
const WebSocketAwait = require('./websocket');
const {GUID} = require('ws/lib/constants');

/**
 * Class representing a WebSocketServer.
 *
 * @extends WebSocketServer
 */
class WebSocketAwaitServer extends WebSocketServer {
    /**
     * Upgrade the connection to WebSocket.
     *
     * @param {String} key The value of the `Sec-WebSocket-Key` header
     * @param {Object} extensions The accepted extensions
     * @param {http.IncomingMessage} req The request object
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @return {*} socket destroy or cb
     * @private
     */
    completeUpgrade(key, extensions, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) {
            return socket.destroy();
        }

        const digest = crypto
            .createHash('sha1')
            .update(key + GUID)
            .digest('base64');

        const headers = [
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: websocket',
            'Connection: Upgrade',
            `Sec-WebSocket-Accept: ${digest}`,
        ];

        const ws = new WebSocketAwait(null, null, this.options);
        let protocol = req.headers['sec-websocket-protocol'];

        if (protocol) {
            protocol = protocol.trim().split(/ *, */);

            if (this.options.handleProtocols) {
                protocol = this.options.handleProtocols(protocol, req);
            } else {
                [protocol] = protocol;
            }

            if (protocol) {
                headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
                ws.protocol = protocol;
            }
        }

        if (extensions[PerMessageDeflate.extensionName]) {
            const {params} = extensions[PerMessageDeflate.extensionName];
            const value = extension.format({
                [PerMessageDeflate.extensionName]: [params],
            });
            headers.push(`Sec-WebSocket-Extensions: ${value}`);
            ws._extensions = extensions;
        }

        this.emit('headers', headers, req);

        socket.write(headers.concat('\r\n').join('\r\n'));
        socket.removeListener('error', () => this.destroy);

        ws.setSocket(socket, head, this.options.maxPayload);

        if (this.clients) {
            this.clients.add(ws);
            ws.on('close', () => this.clients.delete(ws));
        }

        cb(ws);
    }

    /**
     * Set new await timeout
     *
     * @param {Number} awaitTimeout The timeout waiting for a response
     */
    setAwaitTimeout(awaitTimeout) {
        WebSocketAwait.validateOptions({awaitTimeout});

        this.options.awaitTimeout = awaitTimeout;
    }
}

module.exports = WebSocketAwaitServer;
