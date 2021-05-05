'use strict';

const WebSocket = require('ws/lib/websocket.js');
const defaultOptions = require('./default-options.js');
const {
    WebSocketAwaitValidationError,
    WebSocketAwaitConnectionCloseError,
    WebSocketAwaitTimeoutAwaitError,
    WebSocketAwaitSendError,
    WebSocketAwaitProcessedError,
} = require('./errors/index.js');

/**
 * Class representing a WebSocketAwait.
 *
 * @extends WebSocket
 */
class WebSocketAwait extends WebSocket {
    /**
     * Create a new `WebSocketAwait` instance.
     *
     * @param {(String|url.Url|url.URL)} address The URL to which to connect
     * @param {(String|String[])} protocols The subprotocols
     * @param {Object} options Connection options
     */
    constructor(address, protocols, options) {
        super(address, protocols, options);

        if (typeof protocols === 'object' && protocols !== null) {
            options = protocols;
            protocols = null;
        }

        if (options) {
            WebSocketAwait.validateOptions(options);
        }

        this._options = Object.assign({}, defaultOptions, options);
        this._awaitList = new Map();
    }

    /**
     * Getter to get the number of expected messages
     *
     * @return {Number} await list size
     * @public
     */
    get awaitListSize() {
        return this._awaitList.size;
    }

    /**
     * Validate settings.
     *
     * @param {Object} options Options object
     * @param {Number} options.awaitTimeout The timeout waiting for a response
     * @param {Boolean} options.leaveAwaitId Whether to leave the identification parameter in the receiving data
     * @param {Function|Null} options.packMessage The message packaging function before sending
     * @param {Function|Null} options.unpackMessage The message un'packaging function after receiving
     * @param {Function} options.generateAwaitId The identification parameter generation function for sendAwait
     * @param {Function} options.attachAwaitId The function to installation identification parameter to sending messages
     * @param {Function} options.extractAwaitId The function to extract identification parameter from incoming messages
     * @param {Function|Null} options.deleteAwaitId The function to delete identification parameter from incoming messages
     * @throws {WebSocketAwait.WebSocketAwaitValidationError} if validation error
     */
    static validateOptions(options) {
        const schema = {
            awaitTimeout: 'number',
            leaveAwaitId: 'boolean',
            packMessage: 'function|null',
            unpackMessage: 'function|null',
            generateAwaitId: 'function',
            attachAwaitId: 'function',
            extractAwaitId: 'function|null',
            deleteAwaitId: 'function',
        };

        for (const option in options) {
            if (
                Object.prototype.hasOwnProperty.call(options, option) &&
                Object.prototype.hasOwnProperty.call(schema, option)
            ) {
                const schemaArray = schema[option].split('|');

                if (options[option] === null && schemaArray.indexOf('null') !== -1) {
                    return;
                }

                if (schemaArray.indexOf(typeof options[option])) {
                    throw new WebSocketAwait.WebSocketAwaitValidationError(
                        `The "${option}" argument must be of type ${schema[option]}. ` +
                        `Received type ${typeof options[option]}`,
                    );
                }
            }
        }
    }

    /**
     * Set new await timeout
     *
     * @param {Number} awaitTimeout The timeout waiting for a response
     */
    setAwaitTimeout(awaitTimeout) {
        WebSocketAwait.validateOptions({awaitTimeout});

        this._options.awaitTimeout = awaitTimeout;
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
                const parsedData = this._options.unpackMessage ? this._options.unpackMessage(data) : data;

                if (!this._options.extractAwaitId) {
                    return this.emit('message', parsedData);
                }

                const awaitId = this._options.extractAwaitId(parsedData);

                if (awaitId) {
                    if (!this._options.leaveAwaitId) {
                        this._options.deleteAwaitId(parsedData);
                    }

                    if (this._checkAwaitId(awaitId)) {
                        const {resolve} = this._getAwaitId(awaitId);

                        this._deleteAwaitId(awaitId);

                        resolve(parsedData);
                    } else {
                        this.emit('messageAwait', parsedData, awaitId);
                    }
                } else {
                    this.emit('message', parsedData);
                }
            } catch (error) {
                this.emit('error', new WebSocketAwait.WebSocketAwaitProcessedError(
                    'The message received but not processed: ' +
                    `${error.message}, ${data}`,
                ));
            }
        });

        socket.on('close', () => {
            for (const item of this._awaitList) {
                const {reject} = this._getAwaitId(item[0]);

                reject(new WebSocketAwait.WebSocketAwaitConnectionCloseError(
                    'The message is not sent or not response is received: Connection close',
                ));
                this._deleteAwaitId(item[0]);
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
     * @return {Promise} result or error
     * @public
     */
    send(data, options) {
        return new Promise((resolve, reject) => {
            options = typeof options === 'function' ? {} : options;
            super.send((this._options.packMessage ? this._options.packMessage(data) : data), options, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Saving the identification parameter and setting the timer to auto-complete(reject) and delete.
     *
     * @param {String} awaitId identification parameter
     * @param {Function} resolve is resolve function
     * @param {Function} reject is reject function
     * @private
     */
    _setAwaitId(awaitId, resolve, reject) {
        const timeout = setTimeout(() => {
            this._deleteAwaitId(awaitId);
            reject(new WebSocketAwait.WebSocketAwaitTimeoutAwaitError(
                'No response is received: Response timeout expired',
            ));
        }, this._options.awaitTimeout);

        this._awaitList.set(awaitId, {
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
    _checkAwaitId(awaitId) {
        return this._awaitList.has(awaitId);
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
    _getAwaitId(awaitId) {
        return this._awaitList.get(awaitId);
    }

    /**
     * Delete the identification parameter and remove the timer to auto-complete(reject) and delete.
     *
     * @param {String} awaitId identification parameter
     * @private
     */
    _deleteAwaitId(awaitId) {
        const {timeout} = this._awaitList.get(awaitId);

        clearTimeout(timeout);
        this._awaitList.delete(awaitId);
    }

    /**
     * Send a message waiting for a response
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
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            let awaitId;

            try {
                awaitId = this._options.generateAwaitId();

                this._setAwaitId(awaitId, resolve, reject);
                await this.send(this._options.attachAwaitId(data, awaitId), options);
            } catch (error) {
                if (this._checkAwaitId(awaitId)) {
                    this._deleteAwaitId(awaitId);
                }

                reject(new WebSocketAwait.WebSocketAwaitSendError(`The message is not sent: ${error.message}`));
            }
        });
    }

    /**
     * Sending a response to the message which is waiting for answer
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
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                await this.send(this._options.attachAwaitId(data, awaitId), options);
                resolve(awaitId);
            } catch (error) {
                reject(new WebSocketAwait.WebSocketAwaitSendError(`The message is not sent: ${error.message}`));
            }
        });
    }
}

WebSocketAwait.WebSocketAwaitValidationError = WebSocketAwaitValidationError;
WebSocketAwait.WebSocketAwaitConnectionCloseError = WebSocketAwaitConnectionCloseError;
WebSocketAwait.WebSocketAwaitTimeoutAwaitError = WebSocketAwaitTimeoutAwaitError;
WebSocketAwait.WebSocketAwaitSendError = WebSocketAwaitSendError;
WebSocketAwait.WebSocketAwaitProcessedError = WebSocketAwaitProcessedError;

module.exports = WebSocketAwait;
