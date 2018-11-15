'use strict';

/**
 * Class of error of connection close
 *
 * @extends Error
 */
class WebSocketAwaitConnectionCloseError extends Error {
    /**
     * Create a new `WebSocketAwaitConnectionCloseError`.
     *
     * @param {*} args Error message
     */
    constructor(args) {
        super(args);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = WebSocketAwaitConnectionCloseError;
