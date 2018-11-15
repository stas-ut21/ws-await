'use strict';

/**
 * Class of error of timeout await
 *
 * @extends Error
 */
class WebSocketAwaitTimeoutAwaitError extends Error {
    /**
     * Create a new `WebSocketAwaitTimeoutAwaitError`.
     *
     * @param {*} args Error message
     */
    constructor(args) {
        super(args);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = WebSocketAwaitTimeoutAwaitError;
