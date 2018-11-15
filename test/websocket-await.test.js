'use strict';

const assert = require('assert');
const http = require('http');
const WebSocketAwait = require('..');

const testData = {
    default: {
        foo: 1,
    },
    defaultJSON: '{"foo":1}',
    withAwaitId: {
        awaitId: '_id',
        foo: 1,
    },
    withAwaitIdJSON: '{"awaitId": "_id", "foo": 1}',
};

class CustomAgent extends http.Agent {
    addRequest() {

    };
}

describe('WebSocketAwait', () => {
    describe('default options', () => {
        describe('check default options for the presence', () => {
            it('awaitTimeout option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.strictEqual(ws._options.awaitTimeout, 10000);
                            wss.close(done);
                        };
                    },
                );
            });
            it('leaveAwaitId option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.strictEqual(ws._options.leaveAwaitId, false);
                            wss.close(done);
                        };
                    },
                );
            });
            it('packMessage option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws._options.packMessage, 'function');
                            wss.close(done);
                        };
                    },
                );
            });
            it('unpackMessage option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws._options.unpackMessage, 'function');
                            wss.close(done);
                        };
                    },
                );
            });
            it('generateAwaitId option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws._options.generateAwaitId, 'function');
                            wss.close(done);
                        };
                    },
                );
            });
            it('attachAwaitId option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws._options.attachAwaitId, 'function');
                            wss.close(done);
                        };
                    },
                );
            });
            it('extractAwaitId option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws._options.extractAwaitId, 'function');
                            wss.close(done);
                        };
                    },
                );
            });
            it('deleteAwaitId option in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws._options.deleteAwaitId, 'function');
                            wss.close(done);
                        };
                    },
                );
            });
            it('awaitList in _options', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws._awaitList, 'object');
                            assert.strictEqual(ws.awaitListSize, 0);
                            wss.close(done);
                        };
                    },
                );
            });
        });
        describe('check the functions in the default options', () => {
            describe('generateAwaitId function', () => {
                it('generateAwaitId without args', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(typeof ws._options.generateAwaitId(), 'string');
                                wss.close(done);
                            };
                        },
                    );
                });
                it('generateAwaitId without args', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(typeof ws._options.generateAwaitId(testData.default), 'string');
                                wss.close(done);
                            };
                        },
                    );
                });
            });
            describe('attachAwaitId function', () => {
                it('attachAwaitId with data {Object} and id {String}', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(
                                    ws._options.attachAwaitId(testData.default, testData.withAwaitId.awaitId),
                                    {awaitId: '_id', foo: 1},
                                );
                                wss.close(done);
                            };
                        },
                    );
                });
                it('attachAwaitId with empty data and with id {String}', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(
                                    ws._options.attachAwaitId({}, testData.withAwaitId.awaitId),
                                    {awaitId: '_id'},
                                );
                                wss.close(done);
                            };
                        },
                    );
                });
                it('attachAwaitId without data and without id', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(
                                    ws._options.attachAwaitId(),
                                    {awaitId: undefined},
                                );
                                wss.close(done);
                            };
                        },
                    );
                });
            });
            describe('extractAwaitId function', () => {
                it('extractAwaitId with data {Object} with key awaitId', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(
                                    ws._options.extractAwaitId(testData.withAwaitId),
                                    testData.withAwaitId.awaitId,
                                );
                                wss.close(done);
                            };
                        },
                    );
                });
                it('extractAwaitId with data {Object} without key awaitId', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.strictEqual(
                                    ws._options.extractAwaitId(testData.default),
                                    false,
                                );
                                wss.close(done);
                            };

                        },
                    );
                });
                it('extractAwaitId without data', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.strictEqual(
                                    ws._options.extractAwaitId(),
                                    undefined,
                                );
                                wss.close(done);
                            };
                        },
                    );
                });
            });
        });
        describe('setting options', () => {
            it('setting valid options and check in ws', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const testOptions = {
                            awaitTimeout: 20000,
                            leaveAwaitId: true,
                            packMessage: data => data,
                            unpackMessage: data => data,
                            generateAwaitId: () => `_${Math.random()
                                .toString(46)
                                .substr(2, 10)}`,
                            attachAwaitId: (data, id) => Object.assign({'testId': id}, data),
                            extractAwaitId: data => data && Object.prototype.hasOwnProperty.call(data, 'testId') && data.testId,
                            deleteAwaitId: data => delete data.testId,
                        };
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, testOptions);
                        ws.onopen = () => {
                            assert.strict(
                                ws._options,
                                testOptions,
                            );
                            wss.close(done);
                        };
                    },
                );
            });
            it('setting invalid option awaitTimeout in Client', () => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        assert.throws(
                            () => {
                                new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                                    awaitTimeout: true,
                                });
                            },
                            /^WebSocketAwaitValidationError: The "awaitTimeout" argument must be of type number. Received type boolean$/,
                        );
                    },
                );
            });
        });
    });
    describe('method send', () => {
        it('send with data {Object}', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('message', msg => {
                            assert.deepStrictEqual(msg, testData.default);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = async () => {
                        await ws.send(testData.default);
                    };
                });
        });
        it('send with data {Object} and get in Server without option extractAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {
                    port: 0,
                    extractAwaitId: null,
                },
                () => {
                    wss.on('connection', ws => {
                        ws.on('message', msg => {
                            assert.deepStrictEqual(msg, testData.default);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = async () => {
                        await ws.send(testData.default);
                    };
                });
        });
        it('send with data {JSON} and disabled packMessage and unpackMessage', done => {
            const wss = new WebSocketAwait.Server(
                {
                    port: 0,
                    unpackMessage: null,
                },
                () => {
                    wss.on('connection', ws => {
                        ws.on('message', msg => {
                            assert.deepStrictEqual(msg, testData.defaultJSON);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {packMessage: null});
                    ws.onopen = async () => {
                        await ws.send(testData.defaultJSON);
                    };
                });
        });
        it('send without data and disabled packMessage and unpackMessage', done => {
            const wss = new WebSocketAwait.Server(
                {
                    port: 0,
                    unpackMessage: null,
                },
                () => {
                    wss.on('connection', ws => {
                        ws.on('message', msg => {
                            assert.strictEqual(typeof msg, 'object');
                            assert.strictEqual(Object.keys(msg).length, 0);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {packMessage: null});
                    ws.onopen = async () => {
                        await ws.send();
                    };
                });
        });
        it('send with data {Object} and with WebSocket is not open', done => {
            const ws = new WebSocketAwait('ws://localhost', {
                agent: new CustomAgent(),
            });
            ws.send(testData.default)
                .catch(error => {
                    assert.throws(
                        () => {
                            throw error;
                        },
                        /^Error: WebSocket is not open: readyState 0 \(CONNECTING\)$/,
                    );
                });
            ws.send(testData.default)
                .catch(error => {
                    assert.ok(error instanceof Error);
                    assert.strictEqual(
                        error.message,
                        'WebSocket is not open: readyState 0 (CONNECTING)',
                    );
                });
            ws.send(testData.default, {test: 'test'})
                .catch(error => {
                    assert.ok(error instanceof Error);
                    assert.strictEqual(
                        error.message,
                        'WebSocket is not open: readyState 0 (CONNECTING)',
                    );
                });
            done();
        });
    });
    describe('method sendAwait', () => {
        it('sendAwait with data {Object}', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = async () => {
                        await ws.sendAwait(testData.default);
                        for (const item of ws._awaitList) {
                            assert.strictEqual(typeof item[0], 'string');
                            assert.deepStrictEqual(Object.keys(item[1]), ['resolve', 'reject', 'timeout']);
                        }
                        assert.strictEqual(ws.awaitListSize, 1);
                    };
                });
        });
        it('sendAwait with data {Object} and check for trigger messageAwait', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = async () => {
                        ws.on('messageAwait', (msg, id) => {
                            throw new Error('The event should not fire if there is a resolve object');
                        });
                        await ws.sendAwait(testData.default);
                        for (const item of ws._awaitList) {
                            assert.strictEqual(typeof item[0], 'string');
                            assert.deepStrictEqual(Object.keys(item[1]), ['resolve', 'reject', 'timeout']);
                        }
                        assert.strictEqual(ws.awaitListSize, 1);
                    };
                });
        });
        it('sendAwait with data {Object} and check for passed callback', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = async () => {
                        await ws.sendAwait(testData.default, () => {
                            throw new Error('Callback is passed to sendAwait method');
                        });
                        for (const item of ws._awaitList) {
                            assert.strictEqual(typeof item[0], 'string');
                            assert.deepStrictEqual(Object.keys(item[1]), ['resolve', 'reject', 'timeout']);
                        }
                        assert.strictEqual(ws.awaitListSize, 1);
                    };
                });
        });
        it('sendAwait with data {Object} and set options {Object}', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = async () => {
                        await ws.sendAwait(testData.default, {});
                        for (const item of ws._awaitList) {
                            assert.strictEqual(typeof item[0], 'string');
                            assert.deepStrictEqual(Object.keys(item[1]), ['resolve', 'reject', 'timeout']);
                        }
                        assert.strictEqual(ws.awaitListSize, 1);
                    };
                });
        });
        it('sendAwait with data {Object} and error in generateAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                        generateAwaitId: () => {
                            throw new Error('Test');
                        },
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.awaitListSize, 0);
                                assert.strictEqual(err.message, 'The message is not sent: Test');
                                done();
                            });
                    };
                });
        });
        it('sendAwait with data {Object} and error in attachAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                        attachAwaitId: () => {
                            throw new Error('Test');
                        },
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.awaitListSize, 0);
                                assert.strictEqual(err.message, 'The message is not sent: Test');
                                done();
                            });
                    };
                });
        });
        it('sendAwait with data {Object} and error in unpackMessage', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            ws.resAwait(testData.default, id);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                        unpackMessage: () => {
                            throw new Error('Test');
                        },
                    });
                    ws.onerror = err => {
                        assert.strictEqual(typeof err.message, 'string');
                        assert.strictEqual(err.message.length > 0, true);
                        done();
                    };
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .then(waiting => {
                                throw new Error(`This test without Waiting: ${waiting}`);
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('sendAwait with data {Object} and timeout error', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                        awaitTimeout: 0,
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.awaitListSize, 0);
                                assert.strictEqual(err.message, 'No response is received: Response timeout expired');
                                wss.close(done);
                            });
                    };
                });
        });
        it('sendAwait with data {Object} and with WebSocket is not open', done => {
            const ws = new WebSocketAwait('ws://localhost', {
                agent: new CustomAgent(),
            });
            ws.sendAwait(testData.default)
                .catch(err => {
                    assert.strictEqual(ws.awaitListSize, 0);
                    assert.strictEqual(err.message, 'The message is not sent: WebSocket is not open: readyState 0 (CONNECTING)');
                    done();
                });
        });
        it('sendAwait with data {Object} and with WebSocket is closed by server after get messageAwait', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            ws.close();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.awaitListSize, 0);
                                assert.strictEqual(err.message, 'The message is not sent or not response is received: Connection close');
                                done();
                            });
                    };
                });
        });
        it('sendAwait with data {Object} and await waiting', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            ws.resAwait(testData.default, id);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .then(waiting => {
                                assert.deepStrictEqual(waiting, testData.default);
                                assert.strictEqual(ws.awaitListSize, 0);
                                done();
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('sendAwait with data {Object}, leaveAwaitId = true and await waiting', done => {
            const wss = new WebSocketAwait.Server(
                {
                    port: 0,
                    leaveAwaitId: true,
                    attachAwaitId: (data, id) => Object.assign({'testId': id}, data),
                    extractAwaitId: data => data && Object.prototype.hasOwnProperty.call(data, 'testId') && data.testId,
                    deleteAwaitId: data => delete data.testId,
                },
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['testId', 'foo']);
                            ws.resAwait(testData.default, id);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                        leaveAwaitId: true,
                        attachAwaitId: (data, id) => Object.assign({'testId': id}, data),
                        extractAwaitId: data => data && Object.prototype.hasOwnProperty.call(data, 'testId') && data.testId,
                        deleteAwaitId: data => delete data.testId,
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .then(waiting => {
                                assert.strictEqual(typeof waiting, 'object');
                                assert.strictEqual(typeof waiting.testId, 'string');
                                assert.strictEqual(typeof waiting.foo, 'number');
                                assert.deepStrictEqual(Object.keys(waiting), ['testId', 'foo']);
                                assert.strictEqual(ws.awaitListSize, 0);
                                done();
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('sendAwait with data {Object}, leaveAwaitId = true and await waiting', done => {
            const wss = new WebSocketAwait.Server(
                {
                    port: 0,
                    leaveAwaitId: true,
                },
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['awaitId', 'foo']);
                            ws.resAwait(testData.default, id);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                        leaveAwaitId: true,
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .then(waiting => {
                                assert.strictEqual(typeof waiting, 'object');
                                assert.strictEqual(typeof waiting.awaitId, 'string');
                                assert.strictEqual(typeof waiting.foo, 'number');
                                assert.deepStrictEqual(Object.keys(waiting), ['awaitId', 'foo']);
                                assert.strictEqual(ws.awaitListSize, 0);
                                done();
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
    });
    describe('method resAwait', () => {
        it('resAwait with data {Object}', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        const awaitId = ws._options.generateAwaitId();
                        ws.resAwait(testData.default, awaitId)
                            .then(status => {
                                assert.strictEqual(awaitId, status);
                                assert.strictEqual(ws.awaitListSize, 0);
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('resAwait with data {Object} and check for passed callback', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        const awaitId = ws._options.generateAwaitId();
                        ws.resAwait(testData.default, awaitId, () => {
                            throw new Error('Callback is passed to sendAwait method');
                        })
                            .then(status => {
                                assert.strictEqual(awaitId, status);
                                assert.strictEqual(ws.awaitListSize, 0);
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('resAwait with data {Object} and set options', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['foo']);
                            done();
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        const awaitId = ws._options.generateAwaitId();
                        ws.resAwait(testData.default, awaitId, {})
                            .then(status => {
                                assert.strictEqual(awaitId, status);
                                assert.strictEqual(ws.awaitListSize, 0);
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('resAwait with data {Object} and error in attachAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`, {
                        attachAwaitId: () => {
                            throw new Error('Test');
                        },
                    });
                    ws.onopen = () => {
                        ws.resAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.awaitListSize, 0);
                                assert.strictEqual(err.message, 'The message is not sent: Test');
                                done();
                            });
                    };
                });
        });
    });
});
