# ws-await: modification of the module [ws](https://www.npmjs.com/package/ws) to wait for a response

[![Linux Build](https://travis-ci.org/stas-ut21/ws-await.svg?branch=master)](https://travis-ci.org/stas-ut21/ws-await)
[![Coverage Status](https://coveralls.io/repos/github/stas-ut21/ws-await/badge.svg?branch=master)](https://coveralls.io/github/stas-ut21/ws-await?branch=master)

ws-await adds new methods and options to the [ws](https://www.npmjs.com/package/ws) module to allow you to wait for a 
specific message.

**Note**: This module does not work in the browser. All the basic ws documentation is 
[here](https://github.com/websockets/ws/blob/master/doc/ws.md). This module only adds new methods and properties 
and does not affect the old ones(except packMessage and unpackMessage methods, which can be found here).

## Table of Contents

* [Installing](#installing)
* [WebSocketAwait settings](#websocketawait-settings)
* [Usage examples](#usage-examples)
  + [Send and receive a message waiting for a response](#send-and-receive-a-message-waiting-for-a-response)
  + [Sending to two servers and waiting for messages from them using Promise.all](#sending-to-two-servers-and-waiting-for-messages-from-them-using-promise.all)
  + [Send and receive a message waiting for a response with change attachAwaitId settings and catch Error](#send-and-receive-a-message-waiting-for-a-response-with-change-attachAwaitId-settings-and-catch-error)
  + [Сhain from sending and receiving a message waiting for a response](#сhain-from-sending-and-receiving-a-message-waiting-for-a-response)
* [Changelog](#changelog)
* [License](#license)

## Installing

```
npm install --save ws-await
```

## API docs

See [`/doc/ws.md`](./doc/wsAwait.md) to view detailed information.

## WebSocketAwait settings

New methods and options have been added to this module. Be careful when using them: read the
 [`API documentation`](./doc/wsAwait.md) carefully.

The module includes several settings and options for convenient operation. The method responsible for their installation
 is called `setSettings`. Use only this method to set the settings and options. Below is an example work `setSettings`:
 
```js
ws.setSettings({
    awaitTimeout: 10,
    leaveAwaitId: true,
    nameAwaitId: 'awaitId',
    packMessage: data => JSON.stringify(data),
    unpackMessage: data => JSON.parse(data),
    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 10)}`,
    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
    extractAwaitId: data => data &&
    Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
});
```

All settings and options presented above are set by default. Please consider this. For example, the `package 
Message` method is triggered immediately before the message is sent by all available 
methods (`send, sendAwait, resAwait`). That is, by default, function `JSON.stringify(data)` will work before sending 
and JSON will be sent. The situation is similar with the `unpack Message`. The function `JSON.parse(data)` will fire 
immediately before the message event is triggered. To disable these two methods (`pack Message` and `unpack Message`),
use the `setSettings` method and set the values of these methods to `null`. Disabling works only on these two methods!

```js
ws.setSettings({
    packMessage: null,
    unpackMessage: null,
});
```

All methods and properties are described in detail in the [`docs`](./doc/wsAwait.md).

## Usage examples

Examples are for informational purposes only!

### Send and receive a message waiting for a response 

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

### Sending to two servers and waiting for messages from them using Promise.all

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

### Send and receive a message waiting for a response with change attachAwaitId settings and catch Error

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

ws.setSettings({
    attachAwaitId: (data, id) => {
        if (typeof data === 'object') {
            return Object.assign({[ws.nameAwaitId]: id}, data);
        }
        throw new Error('Data is not object');
    },
});

ws.on('open', async () => {
    try {
        const waitingOne = await ws.sendAwait({
            foo: 'bar'
        });
        console.log(`Client get waiting <<< ${waitingOne.bar}`);
        const waitingTwo = await ws.sendAwait(10);
        console.log(`Client get waiting <<< ${waitingTwo.bar}`);
    } catch (err) {
        console.log(err.message);
    }
});
```

### Сhain from sending and receiving a message waiting for a response

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

## Suggestions and questions

Send your suggestions and questions on [GitHub](https://github.com/stas-ut21/ws-await/issues) or send to email.
`stas.ut21@gmail.com`

## Changelog

We're using the GitHub [releases](https://github.com/stas-ut21/ws-await/releases) for changelog entries.

## License

[MIT](LICENSE)
