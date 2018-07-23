'use strict';

const WebSocket = require('ws/lib/websocket.js');

/**
 * Class representing a WebSocketAwait.
 *
 * @extends WebSocket
 */
class WebSocketAwait extends WebSocket {
    /**
     * Create a new `WebSocketAwait`.
     *
     * @param {(String|url.Url|url.URL)} address The URL to which to connect
     * @param {(String|String[])} protocols The subprotocols
     * @param {Object} options Connection options
     */
    constructor(address, protocols, options) {
        super(address, protocols, options);
        this.awaitTimeout = 10;
        this.leaveAwaitId = false;
        this.nameAwaitId = 'awaitId';
        this.packMessage = msg => JSON.stringify(msg);
        this.unpackMessage = msg => JSON.parse(msg);
        this.generateAwaitId = () => `_${Math.random().toString(36).substr(2, 9)}`;
        this.attachAwaitId = (data, id) => Object.assign({[this.nameAwaitId]: id}, data);
        this.extractAwaitId = data => data &&
            Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId];
        this.waitingReplies = new Map();
    }

    /**
     * Validate settings.
     *
     * @param {Object} opt Options object
     * @param {Number} opt.awaitTimeout The timeout waiting for a response
     * @param {String} opt.nameAwaitId The name identification parameter for default attachAwaitId and extractAwaitId
     * @param {Boolean} opt.leaveAwaitId Whether to leave the identification parameter in the receiving data
     * @param {Function} opt.packMessage The message packaging function before sending
     * @param {Function} opt.unpackMessage The message un'packaging function after receiving
     * @param {Function} opt.generateAwaitId The identification parameter generation function for sendAwait
     * @param {Function} opt.attachAwaitId The function to installation identification parameter to sending messages
     * @param {Function} opt.extractAwaitId The function to extract identification parameter from incoming messages
     * @return {Array} errorList array
     * @private
     */
    static validateSettings(opt) {
        const schema = {
            opt: 'object',
            awaitTimeout: 'number',
            nameAwaitId: 'string',
            leaveAwaitId: 'boolean',
            packMessage: 'function',
            unpackMessage: 'function',
            generateAwaitId: 'function',
            attachAwaitId: 'function',
            extractAwaitId: 'function',
        };
        const errorList = [];
        if (!opt && typeof opt !== schema.opt && !Array.isArray(opt)) {
            throw new Error('Validate settings WebSocketAwait: First argument in setSettings method must be an object');
        }
        Object.keys(opt).forEach(key => {
            if (!schema[key] || !Object.prototype.hasOwnProperty.call(schema, key)) {
                errorList.push(`${opt[key]} is not exist`);
            }
            if (opt[key] === null && ['packMessage', 'unpackMessage'].indexOf(key) !== -1) {
                return;
            }
            if (typeof opt[key] !== schema[key]) {
                errorList.push(`${key} must be a type ${schema[key]}`);
            }
        });
        return errorList;
    }

    /**
     * Setting module settings.
     *
     * @param {Object} opt Options object
     * @param {Number} opt.awaitTimeout The timeout waiting for a response
     * @param {String} opt.nameAwaitId The name identification parameter for default attachAwaitId and extractAwaitId
     * @param {Boolean} opt.leaveAwaitId Whether to leave the identification parameter in the receiving data
     * @param {Function} opt.packMessage The message packaging function before sending
     * @param {Function} opt.unpackMessage The message un'packaging function after receiving
     * @param {Function} opt.generateAwaitId The identification parameter generation function for sendAwait
     * @param {Function} opt.attachAwaitId The function to installation identification parameter to sending messages
     * @param {Function} opt.extractAwaitId The function to extract identification parameter from incoming messages
     * @public
     */
    setSettings(opt) {
        const validateSettings = WebSocketAwait.validateSettings(opt);
        if (validateSettings.length > 0) {
            throw new Error(validateSettings.join());
        }
        Object.keys(opt).forEach(key => {
            this[key] = opt[key];
        });
    }

    /**
     * Modified set up the socket and the internal resources.
     *
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Number} maxPayload The maximum allowed message size
     * @private
     */
    setSocket(socket, head, maxPayload) {
        super.setSocket(socket, head, maxPayload);
        this._receiver.removeAllListeners('message');
        this._receiver.on('message', data => {
            try {
                let parseData = data;
                if (this.unpackMessage && typeof this.unpackMessage === 'function') {
                    parseData = this.unpackMessage(data);
                }
                const awaitId = this.extractAwaitId(parseData);
                if (awaitId) {
                    if (!this.checkAwaitId(awaitId)) {
                        if (!this.leaveAwaitId) {
                            delete parseData.awaitId;
                        }
                        this.emit('messageAwait', parseData, awaitId);
                        return;
                    }
                    const {resolve} = this.getAwaitId(awaitId);
                    this.deleteAwaitId(awaitId);
                    if (!this.leaveAwaitId) {
                        delete parseData.awaitId;
                    }
                    resolve(parseData);
                    return;
                }
                this.emit('message', parseData);
            } catch (error) {
                this.emit('error', new Error(`The message received but not processed: ${error.message}, ${data}`));
            }
        });
        socket.on('close', () => {
            for (const item of this.waitingReplies) {
                const {reject} = this.getAwaitId(item[0]);
                reject(new Error('The message is not sent or not response is received: Connection close'));
                this.deleteAwaitId(item[0]);
            }
        });
    }

    /**
     * Modified send method a data message.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback which is executed when data is written out
     * @public
     */
    send(data, options, cb) {
        let sendData = data;
        if (this.packMessage && typeof this.packMessage === 'function') {
            sendData = this.packMessage(data);
        }
        super.send(sendData, options, cb);
    }

    /**
     * Saving the identification parameter and setting the timer to auto-complete(reject) and delete.
     *
     * @param {String} awaitId identification parameter
     * @param {Function} resolve is resolve function
     * @param {Function} reject is reject function
     * @private
     */
    setAwaitId(awaitId, resolve, reject) {
        const timeout = setTimeout(() => {
            this.deleteAwaitId(awaitId);
            reject(new Error('The message is not sent or no response is received: Response timeout expired'));
        }, 1000 * this.awaitTimeout);
        this.waitingReplies.set(awaitId, {
            resolve,
            reject,
            timeout,
        });
    }

    /**
     * Сheck for existence identification parameter.
     *
     * @param {String} awaitId identification parameter
     * @return {Boolean} true/false existence
     * @private
     */
    checkAwaitId(awaitId) {
        return this.waitingReplies.has(awaitId);
    }

    /**
     * Getting by identification parameter object containing the functions for this identifier
     *
     * @param {String} awaitId identification parameter
     * @return {Object} is on an object containing the functions for this identifier
     * @return {Function} Object.resolve is resolve function
     * @return {Function} Object.reject is reject function
     * @private
     */
    getAwaitId(awaitId) {
        return this.waitingReplies.get(awaitId);
    }

    /**
     * Delete the identification parameter and remove the timer to auto-complete(reject) and delete.
     *
     * @param {String} awaitId identification parameter
     * @private
     */
    deleteAwaitId(awaitId) {
        const {timeout} = this.waitingReplies.get(awaitId);
        clearTimeout(timeout);
        this.waitingReplies.delete(awaitId);
    }

    /**
     * Modified send method a data message
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @return {Object} resolve/reject object with data or error or message
     * @public
     */
    sendAwait(data, options) {
        return new Promise((resolve, reject) => {
            try {
                const awaitId = this.generateAwaitId();
                const sendData = this.attachAwaitId(data, awaitId);
                if (typeof options === 'object') {
                    this.send(sendData, options);
                } else {
                    this.send(sendData);
                }
                this.setAwaitId(awaitId, resolve, reject);
            } catch (err) {
                reject(new Error(`The message is not sent or no response is received: ${err.message}`));
            }
        });
    }

    /**
     * Send method a data message had a pending message
     *
     * @param {*} data The message to send
     * @param {String} awaitId identification parameter
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @return {Object} resolve/reject object with data or error or message
     * @public
     */
    resAwait(data, awaitId, options) {
        return new Promise((resolve, reject) => {
            try {
                const sendData = this.attachAwaitId(data, awaitId);
                if (typeof options === 'object') {
                    this.send(sendData, options);
                } else {
                    this.send(sendData);
                }
                resolve(awaitId);
            } catch (err) {
                reject(new Error(`The message is not received: ${err.message}`));
            }
        });
    }
}

module.exports = WebSocketAwait;
