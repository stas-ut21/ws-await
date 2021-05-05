# ws-await: modification of the module [ws](https://www.npmjs.com/package/ws) to wait for a response

[![Version npm](https://img.shields.io/npm/v/ws-await.svg)](https://www.npmjs.com/package/ws-await)
[![Linux Build](https://travis-ci.org/stas-ut21/ws-await.svg?branch=master)](https://travis-ci.org/stas-ut21/ws-await)
[![Coverage Status](https://coveralls.io/repos/github/stas-ut21/ws-await/badge.svg?branch=master)](https://coveralls.io/github/stas-ut21/ws-await?branch=master)

ws-await adds new methods and options to the [ws](https://www.npmjs.com/package/ws) module to allow you to wait for a 
specific message.

**Note**: This module does not work in the browser. All the basic ws documentation is 
[here](https://github.com/websockets/ws/blob/master/README.md). This module only adds new methods and properties 
and does not affect the old ones(except Send method - it became asynchronous).

> This module has Typescript definitions!

## Table of Contents

* [Installing](#installing)
* [API docs](#api-docs)
* [WebSocketAwait options](#websocket-await-options)
* [Usage examples](#usage-examples)
  + [Simple send and receive](#simple-send-and-receive)
  + [Sending to two servers](#sending-to-two-servers)
  + [With change attachAwaitId settings and catch Error](#with-change-attachawaitid-settings-and-catch-error)
  + [Сhain from sending and receiving a message](#chain-from-sending-and-receiving-a-message)
* [Suggestions and questions](#suggestions-and-questions)
* [Changelog](#changelog)
* [License](#license)

## <a name="installing">Installing</a>

```
npm install ws-await
```

## <a name="api-docs">API docs</a>

See [`/doc/ws.md`](./doc/wsAwait.md) to view detailed information.

## <a name="websocket-await-options">WebSocketAwait options</a>

New methods and options have been added to this module. Be careful when using them: read the
 [`API documentation`](./doc/wsAwait.md) carefully.

The module includes several settings and options for convenient operation. All options are passed as options(for both 
`client` and `server`):
 
```js
const WebSocketAwait = require('ws-await');

const options = {
    awaitTimeout: 10000,
    leaveAwaitId: false,
    packMessage: data => JSON.stringify(data),
    unpackMessage: data => JSON.parse(data),
    generateAwaitId: () => `_${Math.random()
        .toString(36)
        .substr(2, 10)}`,
    attachAwaitId: (data, id) => Object.assign({awaitId: id}, data),
    extractAwaitId: data => data &&
        Object.prototype.hasOwnProperty.call(data, 'awaitId') && data.awaitId,
    deleteAwaitId: data => delete data.awaitId,
};
const wss = new WebSocketAwait.Server({port: 5050, ...options});
const ws = new WebSocketAwait(`ws://localhost:5050`, options);
```

All settings and options presented above are set by default. Please consider this. For example, the `package 
Message` method is triggered immediately before the message is sent by all available 
methods (`send, sendAwait, resAwait`). That is, by default, function `JSON.stringify(data)` will work before sending 
and JSON will be sent. The situation is similar with the `unpack Message`. The function `JSON.parse(data)` will fire 
immediately before the message event is triggered. To disable these two methods (`pack Message` and `unpack Message`),
use the `setSettings` method and set the values of these methods to `null`. Disabling works only on these two methods!

```js
const options = {
    packMessage: null,
    unpackMessage: null,
}
```

If you do not want to use the sendAwait and resAwait methods, set `extractAwaitId` to `null`(due to the fact that there 
will be no checks for the presence of the `awaitId`(default) key , performance will be improved).

```js
const options = {
    extractAwaitId: null,
}
```

All methods and properties are described in detail in the [`docs`](./doc/wsAwait.md).

## <a name="usage-examples">Usage examples</a>

Examples are for informational purposes only!

### <a name="simple-send-and-receive">Simple send and receive</a>

Send and receive a message waiting for a response.

```js
const WebSocketAwait = require('ws-await');

const wss = new WebSocketAwait.Server({
    port: 8080
});

wss.on('connection', ws => {
    ws.on('messageAwait', (msg, id) => {
        console.log(`Server get messageAwait <<< ${msg.foo} and ${id}`);
        ws.resAwait({
            bar: 'foo'
        }, id);
    });
});

const ws = new WebSocketAwait('ws://localhost:8080');

ws.on('open', async () => {
    const waiting = await ws.sendAwait({
        foo: 'bar'
    });
    console.log(`Client get waiting <<< ${waiting.bar}`);
});
```

### <a name="sending-to-two-servers">Sending to two servers</a>

Sending to two servers and waiting for messages from them using `Promise.all()`.

```js
const WebSocketAwait = require('ws-await');

const wssOne = new WebSocketAwait.Server({
    port: 5050
});

const wssTwo = new WebSocketAwait.Server({
    port: 8080
});

wssOne.on('connection', ws => {
    ws.on('messageAwait', (msg, id) => {
        console.log(`Server One get messageAwait <<< ${msg.foo} and ${id}`);
        ws.resAwait({
            bar: 'fooOne'
        }, id);
    });
});

wssTwo.on('connection', ws => {
    ws.on('messageAwait', (msg, id) => {
        console.log(`Server Two get messageAwait <<< ${msg.foo} and ${id}`);
        ws.resAwait({
            bar: 'fooTwo'
        }, id);
    });
});

const wsOne = new WebSocketAwait('ws://localhost:5050');
const wsTwo = new WebSocketAwait('ws://localhost:8080');

setTimeout(async () => {
    const wsOneData ={
        foo: 'barOne',
    };
    const wsTwoData ={
        foo: 'barTwo',
    };
    const [waitingOne, waitingTwo] = await Promise.all([wsOne.sendAwait(wsOneData), wsTwo.sendAwait(wsTwoData)]);
    console.log(`Client One get waiting <<< ${waitingOne.bar}`);
    console.log(`Client Two get waiting <<< ${waitingTwo.bar}`);
}, 1000);
```

### <a name="with-change-attachawaitid-settings-and-catch-error">With change attachAwaitId settings and catch Error</a>

Send and receive a message waiting for a response with change attachAwaitId settings and catch `Error`.

```js
const WebSocketAwait = require('ws-await');

const wss = new WebSocketAwait.Server({
    port: 8080,
});

wss.on('connection', ws => {
    ws.on('messageAwait', (msg, id) => {
        console.log(`Server get messageAwait <<< ${msg.foo} and ${id}`);
        ws.resAwait({
            bar: 'foo',
        }, id);
    });
});

const ws = new WebSocketAwait('ws://localhost:8080', {
    attachAwaitId: (data, id) => {
        if (typeof data === 'object') {
            return Object.assign({awaitId: id}, data);
        }
        throw new Error('Data is not object');
    },
});

ws.on('open', async () => {
    try {
        const waitingOne = await ws.sendAwait({
            foo: 'bar',
        });
        console.log(`Client get waiting <<< ${waitingOne.bar}`);
        const waitingTwo = await ws.sendAwait(10);
        console.log(`Client get waiting <<< ${waitingTwo.bar}`);
    } catch (err) {
        console.log(err.message);
    }
});
```

### <a name="chain-from-sending-and-receiving-a-message">Сhain from sending and receiving a message</a>

Send and receive a message waiting for a response. The server also sends a waiting message to another server and sends 
it to the first server when it receives a response.

```js
const WebSocketAwait = require('ws-await');

const wssOne = new WebSocketAwait.Server({
    port: 5050
});

const wssTwo = new WebSocketAwait.Server({
    port: 8080
});

const wsTwo = new WebSocketAwait('ws://localhost:8080');

wssOne.on('connection', ws => {
    wsOne.on('open', async () => {
        ws.on('messageAwait', async (msg, id) => {
            console.log(`Server One get messageAwait <<< ${msg.foo} and ${id}`);
            const resData = await wsTwo.sendAwait({
                foo: 'bar'
            });
            ws.resAwait(resData, id);
        });
    });
});

wssTwo.on('connection', ws => {
    ws.on('messageAwait', (msg, id) => {
        console.log(`Server Two get messageAwait <<< ${msg.foo} and ${id}`);
        ws.resAwait({
            bar: 'I am from wssTwo server'
        }, id);
    });
});

const wsOne = new WebSocketAwait('ws://localhost:5050');

wsOne.on('open', async () => {
    const waiting = await wsOne.sendAwait({
        foo: 'bar'
    });
    console.log(`Client get waiting <<< ${waiting.bar}`);
});
```

## <a name="suggestions-and-questions">Suggestions and questions</a>

Send your suggestions and questions on [GitHub](https://github.com/stas-ut21/ws-await/issues) or send to email.
`stas.ut21@gmail.com`.

## <a name="changelog">Changelog</a>

We're using the GitHub [releases](https://github.com/stas-ut21/ws-await/releases) for changelog entries.

## <a name="license">License</a>

[MIT](LICENSE)
