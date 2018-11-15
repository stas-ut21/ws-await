'use strict';

/**
 * Class of error of validation
 *
 * @extends Error
 */
class WebSocketAwaitValidationError extends Error {
    /**
     * Create a new `WebSocketAwaitValidationError`.
     *
     * @param {*} args Error message
     */
    constructor(args) {
        super(args);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = WebSocketAwaitValidationError;
