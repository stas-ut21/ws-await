# ws

Here we will consider only updates `Class: WebSocketAwait` as `Class: WebSocket.Server` uses it. 
`Class: WebSocket.Server` supports all options and methods described below!

**Note**: All the basic ws documentation is [here](https://github.com/websockets/ws/blob/master/doc/ws.md).This module 
only adds new methods and properties and does not affect the old ones(except `send` method - it became asynchronous).

## Class: WebSocketAwait

This class represents a WebSocket server. It extends the `WebSocket` class. The following describes the add-ons! 
Full support for the old api!

### new WebSocket(address[, protocols][, options])

- `options` {Object}
    - `awaitTimeout` {Number} The timeout waiting for a response.
    - `leaveAwaitId` {Boolean} Whether to leave the identification parameter in the receiving data.
    - `packMessage` {Function|Null} The message packaging function before sending.
    - `unpackMessage` {Function|Null} The message un'packaging function after receiving.
    - `generateAwaitId` {Function} The identification parameter generation function for sendAwait.
    - `attachAwaitId` {Function} The function to installation identification parameter to sending messages.
    - `extractAwaitId` {Function|Null} The function to extract identification parameter from incoming messages.
    - `deleteAwaitId` {Function} The function to delete identification parameter from incoming messages.
    
If `protocols` is `Object` that `options` equal `protocols`!
 
### Event: 'messageAwait'

- `data` {*}
- `awaitId` {string}

Emitted when a message is received from the server but resolution is not found by `awaitId`. The type of `data` is 
unknown, as it depends on you how you will unpack the message.

### websocket.awaitListSize

Getter to get the number of awaits expected messages. May be useful for balancing.

### websocket.send(data[, options])

- `data` {Any} The data to send (Do not forget about `packMessage`).
- `options` {Object}
  - `compress` {Boolean} Specifies whether `data` should be compressed or not.
    Defaults to `true` when permessage-deflate is enabled.
  - `binary` {Boolean} Specifies whether `data` should be sent as a binary or not.
    Default is autodetected.
  - `mask` {Boolean} Specifies whether `data` should be masked or not. Defaults
    to `true` when `websocket` is not a server client.
  - `fin` {Boolean} Specifies whether `data` is the last fragment of a message or
    not. Defaults to `true`.

It became asynchronous! Before shipping, checks for a `packMessage`, and if it has uses it on `data`, then sends it. 
Otherwise, just sends `data`.

### websocket.sendAwait(data[, options])

- `data` {Any} The data to send (Do not forget about `packMessage`).
- `options` {Object}
  - `compress` {Boolean} Specifies whether `data` should be compressed or not.
    Defaults to `true` when permessage-deflate is enabled.
  - `binary` {Boolean} Specifies whether `data` should be sent as a binary or not.
    Default is autodetected.
  - `mask` {Boolean} Specifies whether `data` should be masked or not. Defaults
    to `true` when `websocket` is not a server client.
  - `fin` {Boolean} Specifies whether `data` is the last fragment of a message or
    not. Defaults to `true`.

This method does not `callback` argument. Generates an awaitId (by `generateAwaitId`) before shipping , and then 
packages it (by `attachAwaitId`).  It returns `promise`: resolve - if come waiting, reject : if Error at sending or 
response timeout expired installed in `awaitTimeout` setting.

### websocket.resAwait(data[, awaitId][, options])

- `data` {Any} The data to send (Do not forget about `packMessage`).
- `awaitId` {Any} The awaitId identification parameter.
- `options` {Object}
  - `compress` {Boolean} Specifies whether `data` should be compressed or not.
    Defaults to `true` when permessage-deflate is enabled.
  - `binary` {Boolean} Specifies whether `data` should be sent as a binary or not.
    Default is autodetected.
  - `mask` {Boolean} Specifies whether `data` should be masked or not. Defaults
    to `true` when `websocket` is not a server client.
  - `fin` {Boolean} Specifies whether `data` is the last fragment of a message or
    not. Defaults to `true`.

This method does not `callback` argument. The `awaitId` argument is required(if it is not then an error will occur). 
The next step is packages it (by `attachAwaitId`).  It returns `promise`: resolve `awaitId` - if send, reject : if Error
at sending.

### Option: awaitTimeout

- {Number}

How long will the `sendAwait` method wait for a response.

### Option: leaveAwaitId

- {Boolean}

Whether to leave the identification parameter in the receiving data.

### Option: packMessage

- {Function|Null}

The message packaging function before sending. Occurs after `attachAwaitId`.

### Option: unpackMessage

- {Function|Null}

The message un'packaging function after receiving. Occurs before `extractAwaitId`.

### Option: generateAwaitId

- {Function}

The identification parameter generation function for sendAwait.

### Option: attachAwaitId

- {Function}

The function to installation identification parameter to incoming messages. Occurs before `packMessage`.

### Option: extractAwaitId

- {Function|Null}

The function to extract identification parameter from incoming messages. Occurs after `unpackMessage`.

### Option: deleteAwaitId

- {Function|Null}

The function to delete identification parameter from incoming messages. Occurs before emit `messageAwait` event. 


### Error: WebSocketAwaitConnectionCloseError

- {Error}

When you close the connection, all pending messages sent will be rejected with this error.

### Error: WebSocketAwaitProcessedError

- {Error}

This error will be returned if the received message is not processed successfully.

### Error: WebSocketAwaitSendError

- {Error}

This error will be returned when sending failed in `sendAwait` and `resAwait` methods.(Method `Send` returns the 
native error).

### Error: WebSocketAwaitTimeoutAwaitError

- {Error}

This error will be returned if you do not wait for a response within the specified interval `awaitTimeout`.

### Error: WebSocketAwaitValidationError

- {Error}

This error will be returned with invalid options (only options added within this module).
