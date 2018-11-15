'use strict';

/**
 * Class of error of send
 *
 * @extends Error
 */
class WebSocketAwaitSendError extends Error {
    /**
     * Create a new `WebSocketAwaitSendError`.
     *
     * @param {*} args Error message
     */
    constructor(args) {
        super(args);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = WebSocketAwaitSendError;
