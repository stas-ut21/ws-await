'use strict';

/**
 * Class of error of processed
 *
 * @extends Error
 */
class WebSocketAwaitProcessedError extends Error {
    /**
     * Create a new `WebSocketAwaitProcessedError`.
     *
     * @param {*} args Error message
     */
    constructor(args) {
        super(args);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = WebSocketAwaitProcessedError;
