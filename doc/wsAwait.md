# ws

Here we will consider only updates Class: WebSocketAwait as Class: WebSocket.Server uses it.

**Note**: All the basic ws documentation is [here](https://github.com/websockets/ws/blob/master/doc/ws.md).This module
 only adds new methods and properties and does not affect 
the old ones(except packMessage and unpackMessage methods, which can be found here).

## Class: WebSocketAwait

### Event: 'messageAwait'

- `data` {*}
- `awaitId` {string}

Emitted when a message is received from the server and triggered in case: unpacked (using `unpackMessage`) the 
message identifier was waiting (by `extractAwaitId`) the message. The type is unknown, as it depends on you how you will
 unpack the message

### websocket.setSettings(opt)

- `opt` {Object} Options object.
- `opt.awaitTimeout` {Number} The timeout waiting for a response.
- `opt.nameAwaitId` {String} The name identification parameter for default attachAwaitId and extractAwaitId.
- `opt.leaveAwaitId` {Boolean} The leaving identification parameter in data after receiving with sendAwait.
- `opt.packMessage` {Function} The message packaging function before sending.
- `opt.unpackMessage` {Function} The message un'packaging function after receiving.
- `opt.generateAwaitId` {Function} The identification parameter generation function for sendAwait.
- `opt.attachAwaitId` {Function} The installation feature identification parameter for sendAwait.
- `opt.extractAwaitId` {Function} The un'installation feature identification parameter for sendAwait.

Setting module settings. Be careful: they are not checked for content, only pass type validation before they are replaced!
Settings `attachAwaitId` and `extractAwaitId` can use `websocket.nameAwaitId`.

### websocket.send(data[, options][, callback])

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
- `callback` {Function} An optional callback which is invoked when `data` is
  written out.

Before shipping, checks for a `packMessage`, and if it has uses it on `data`, then sends it. Otherwise, just sends `data`.

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
packages it (by `attachAwaitId`).  It returns `promise`: resolve - if come waiting, reject : if Error or response 
timeout expired installed `awaitTimeout` setting;

