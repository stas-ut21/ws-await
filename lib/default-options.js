'use strict';

/**
 * Default options
 */
module.exports = {
    /**
     * The timeout waiting for a response
     */
    awaitTimeout: 10000,
    /**
     * Whether to leave the identification parameter in the receiving data
     */
    leaveAwaitId: false,
    /**
     * The message packaging function before sending
     *
     * @param {*} data is data to convert
     * @return {String} json data
     */
    packMessage: data => JSON.stringify(data),
    /**
     * The message un'packaging function after receiving
     *
     * @param {*} data is data to convert
     * @return {Object} is parse result
     */
    unpackMessage: data => JSON.parse(data),
    /**
     * The identification parameter generation function for sendAwait
     *
     * @return {String} is random string
     */
    generateAwaitId: () => `_${Math.random()
        .toString(36)
        .substr(2, 10)}`,
    /**
     * The function to installation identification parameter to sending messages
     *
     * @param {*} data is data where to attach
     * @param {*} id is what to attach
     * @return {Object} is the result of the installation
     */
    attachAwaitId: (data, id) => Object.assign({awaitId: id}, data),
    /**
     * The function to extract identification parameter from incoming messages
     *
     * @param {*} data is data where to extract
     * @return {Object} is the result of the extraction
     */
    extractAwaitId: data => data && Object.prototype.hasOwnProperty.call(data, 'awaitId') && data.awaitId,
    /**
     * The function to delete identification parameter from incoming messages
     *
     * @param {*} data is data where to delete
     * @return {Object} is the result of the deletion
     */
    deleteAwaitId: data => delete data.awaitId,
};
