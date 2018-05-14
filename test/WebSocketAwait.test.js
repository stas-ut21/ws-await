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
    withAwaitIdJSON: '{"awaitId": "_id", "foo": 1}'
};

class CustomAgent extends http.Agent {
    addRequest() {

    };
}

describe('WebSocketAwait', () => {
    describe('module settings', () => {
        describe('check module settings for the presence', () => {
            it('awaitTimeout option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.strictEqual(ws.awaitTimeout, 10);
                            wss.close(done);
                        };
                    }
                );
            });
            it('leaveAwaitId option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.strictEqual(ws.leaveAwaitId, false);
                            wss.close(done);
                        };
                    }
                );
            });
            it('nameAwaitId option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.strictEqual(ws.nameAwaitId, 'awaitId');
                            wss.close(done);
                        };
                    }
                );
            });
            it('packMessage option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.packMessage, 'function');
                            wss.close(done);
                        };
                    }
                );
            });
            it('unpackMessage option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.unpackMessage, 'function');
                            wss.close(done);
                        };
                    }
                );
            });
            it('generateAwaitId option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.generateAwaitId, 'function');
                            wss.close(done);
                        };
                    }
                );
            });
            it('attachAwaitId option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.attachAwaitId, 'function');
                            wss.close(done);
                        };
                    }
                );
            });
            it('extractAwaitId option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.extractAwaitId, 'function');
                            wss.close(done);
                        };
                    }
                );
            });
            it('waitingReplies option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.waitingReplies, 'object');
                            assert.strictEqual(ws.waitingReplies.size, 0);
                            wss.close(done);
                        };
                    }
                );
            });
            it('resolvesObj option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.resolvesObj, 'object');
                            assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                            wss.close(done);
                        };
                    }
                );
            });
            it('rejectsObj option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.rejectsObj, 'object');
                            assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                            wss.close(done);
                        };
                    }
                );
            });
            it('timeoutsObj option in constructor', done => {
                const wss = new WebSocketAwait.Server(
                    {port: 0},
                    () => {
                        const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                        ws.onopen = () => {
                            assert.deepStrictEqual(typeof ws.timeoutsObj, 'object');
                            assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                            wss.close(done);
                        };
                    }
                );
            });
        });
        describe('check the functions of the module in the module settings', () => {
            describe('generateAwaitId function', () => {
                it('generateAwaitId without args', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(typeof ws.generateAwaitId(), 'string');
                                wss.close(done);
                            };
                        }
                    );
                });
                it('generateAwaitId without args', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(typeof ws.generateAwaitId(testData.default), 'string');
                                wss.close(done);
                            };
                        }
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
                                    ws.attachAwaitId(testData.default, testData.withAwaitId.awaitId),
                                    {awaitId: '_id', foo: 1}
                                );
                                wss.close(done);
                            };
                        }
                    );
                });
                it('attachAwaitId with empty data and with id {String}', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(
                                    ws.attachAwaitId({}, testData.withAwaitId.awaitId),
                                    {awaitId: '_id',}
                                );
                                wss.close(done);
                            };
                        }
                    );
                });
                it('attachAwaitId without data and without id', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(
                                    ws.attachAwaitId(),
                                    {awaitId: undefined}
                                );
                                wss.close(done);
                            };
                        }
                    );
                });
            });
            describe('extractAwaitId function', () => {
                it('attachAwaitId with data {Object} with key awaitId', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.deepStrictEqual(
                                    ws.extractAwaitId(testData.withAwaitId),
                                    testData.withAwaitId.awaitId
                                );
                                wss.close(done);
                            };
                        }
                    );
                });
                it('attachAwaitId with data {Object} without key awaitId', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.strictEqual(
                                    ws.extractAwaitId(testData.default),
                                    false
                                );
                                wss.close(done);
                            };
                        }
                    );
                });
                it('attachAwaitId without data', done => {
                    const wss = new WebSocketAwait.Server(
                        {port: 0},
                        () => {
                            const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                            ws.onopen = () => {
                                assert.strictEqual(
                                    ws.extractAwaitId(),
                                    undefined
                                );
                                wss.close(done);
                            };
                        }
                    );
                });
            });
        });
    });
    describe('method setSettings', () => {
        it('setSettings with valid options', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        const opt = {
                            awaitTimeout: 15,
                            leaveAwaitId: true,
                            nameAwaitId: 'testId',
                            packMessage: data => JSON.stringify(data),
                            unpackMessage: data => JSON.parse(data),
                            generateAwaitId: () => `_${Math.random().toString(36).substr(2, 10)}`,
                            attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                            extractAwaitId: data => data &&
                                Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                        };
                        ws.setSettings(opt);
                        assert.strictEqual(ws.awaitTimeout, opt.awaitTimeout);
                        assert.strictEqual(ws.leaveAwaitId, opt.leaveAwaitId);
                        assert.strictEqual(ws.nameAwaitId, opt.nameAwaitId);
                        assert.strictEqual(ws.packMessage, opt.packMessage);
                        assert.strictEqual(ws.unpackMessage, opt.unpackMessage);
                        assert.strictEqual(ws.attachAwaitId, opt.attachAwaitId);
                        assert.strictEqual(ws.extractAwaitId, opt.extractAwaitId);
                        wss.close(done);
                    };
                }
            );
        });
        it('setSettings disable packMessage,unpackMessage', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        const opt = {
                            awaitTimeout: 15,
                            leaveAwaitId: true,
                            nameAwaitId: 'testId',
                            packMessage: null,
                            unpackMessage: null,
                            generateAwaitId: () => `_${Math.random().toString(36).substr(2, 10)}`,
                            attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                            extractAwaitId: data => data &&
                                Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                        };
                        ws.setSettings(opt);
                        assert.strictEqual(ws.awaitTimeout, opt.awaitTimeout);
                        assert.strictEqual(ws.leaveAwaitId, opt.leaveAwaitId);
                        assert.strictEqual(ws.nameAwaitId, opt.nameAwaitId);
                        assert.strictEqual(ws.packMessage, opt.packMessage);
                        assert.strictEqual(ws.unpackMessage, opt.unpackMessage);
                        assert.strictEqual(ws.attachAwaitId, opt.attachAwaitId);
                        assert.strictEqual(ws.extractAwaitId, opt.extractAwaitId);
                        wss.close(done);
                    };
                }
            );
        });
        it('setSettings disable generateAwaitId, awaitTimeout', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: null,
                                    leaveAwaitId: false,
                                    nameAwaitId: 'awaitId',
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: null,
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: awaitTimeout must be a type number,generateAwaitId must be a type function/
                        );
                        wss.close(done);
                    };
                }
            );
        });
        it('setSettings with valid options except awaitTimeout', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: '10',
                                    leaveAwaitId: false,
                                    nameAwaitId: 'awaitId',
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 9)}`,
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: awaitTimeout must be a type number/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with valid options except leaveAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: 10,
                                    leaveAwaitId: 'false',
                                    nameAwaitId: 'awaitId',
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 9)}`,
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: leaveAwaitId must be a type boolean/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with valid options except nameAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: 10,
                                    leaveAwaitId: true,
                                    nameAwaitId: undefined,
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 9)}`,
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: nameAwaitId must be a type string/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with valid options except packMessage', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: 10,
                                    leaveAwaitId: true,
                                    nameAwaitId: 'awaitId',
                                    packMessage: 'test',
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 9)}`,
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: packMessage must be a type function/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with valid options except unpackMessage', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: 10,
                                    leaveAwaitId: true,
                                    nameAwaitId: 'awaitId',
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: 'test',
                                    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 9)}`,
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: unpackMessage must be a type function/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with valid options except generateAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: 10,
                                    leaveAwaitId: true,
                                    nameAwaitId: 'awaitId',
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: 'test',
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: generateAwaitId must be a type function/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with valid options except attachAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: 10,
                                    leaveAwaitId: true,
                                    nameAwaitId: 'awaitId',
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 9)}`,
                                    attachAwaitId: 'test',
                                    extractAwaitId: data => data &&
                                        Object.prototype.hasOwnProperty.call(data, this.nameAwaitId) && data[this.nameAwaitId],
                                });
                            },
                            /Error: attachAwaitId must be a type function/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with valid options except extractAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: 10,
                                    leaveAwaitId: true,
                                    nameAwaitId: 'awaitId',
                                    packMessage: msg => JSON.stringify(msg),
                                    unpackMessage: msg => JSON.parse(msg),
                                    generateAwaitId: () => `_${Math.random().toString(36).substr(2, 9)}`,
                                    attachAwaitId: (data, id) => Object.assign({[this.nameAwaitId]: id}, data),
                                    extractAwaitId: 'test',
                                });
                            },
                            /Error: extractAwaitId must be a type function/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with invalid options', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    awaitTimeout: '10',
                                    leaveAwaitId: 'true',
                                    nameAwaitId: 10,
                                    packMessage: 'test',
                                    unpackMessage: 'test',
                                    generateAwaitId: 'test',
                                    attachAwaitId: 'test',
                                    extractAwaitId: 'test',
                                });
                            },
                            Error
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings with not exist options', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings({
                                    test: 'test'
                                });
                            },
                            /Error: test is not exist/
                        );
                        wss.close(done);
                    };
                });
        });
        it('setSettings without options', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        assert.throws(
                            () => {
                                ws.setSettings();
                            },
                            /Error: Validate settings WebSocketAwait: First argument in setSettings method must be an object/
                        );
                        wss.close(done);
                    };
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
                            wss.close(done);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        ws.send(testData.default);
                    };
                });
        });
        it('send with data {JSON} and disabled packMessage and unpackMessage', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.setSettings({
                            unpackMessage: null,
                        });
                        ws.on('message', msg => {
                            assert.deepStrictEqual(msg, testData.defaultJSON);
                            wss.close(done);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.setSettings({
                        packMessage: null,
                    });
                    ws.onopen = () => {
                        ws.send(testData.defaultJSON);
                    };
                });
        });
        it('send without data and disabled packMessage and unpackMessage', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.setSettings({
                            unpackMessage: null,
                        });
                        ws.on('message', msg => {
                            assert.strictEqual(typeof msg, 'object');
                            assert.strictEqual(Object.keys(msg).length, 0);
                            wss.close(done);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.setSettings({
                        packMessage: null,
                    });
                    ws.onopen = () => {
                        ws.send();
                    };
                });
        });
        it('send with data {Object} and with WebSocket is not open', done => {
            const ws = new WebSocketAwait('ws://localhost', {
                agent: new CustomAgent()
            });
            assert.throws(
                () => {
                    ws.send(testData.default);
                },
                /^Error: WebSocket is not open: readyState 0 \(CONNECTING\)$/
            );
            ws.send(testData.default, err => {
                assert.ok(err instanceof Error);
                assert.strictEqual(
                    err.message,
                    'WebSocket is not open: readyState 0 (CONNECTING)'
                );
            });
            ws.send(testData.default, {test: 'test'}, err => {
                assert.ok(err instanceof Error);
                assert.strictEqual(
                    err.message,
                    'WebSocket is not open: readyState 0 (CONNECTING)'
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
                            wss.close(done);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        ws.sendAwait(testData.default);
                        assert.strictEqual(ws.waitingReplies.size, 1);
                        assert.strictEqual(Object.keys(ws.resolvesObj).length, 1);
                        assert.strictEqual(Object.keys(ws.rejectsObj).length, 1);
                        assert.strictEqual(Object.keys(ws.timeoutsObj).length, 1);
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
                            wss.close(done);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        ws.sendAwait(testData.default, () => {
                            throw new Error('Callback is passed to sendAwait method')
                        });
                        assert.strictEqual(ws.waitingReplies.size, 1);
                        assert.strictEqual(Object.keys(ws.resolvesObj).length, 1);
                        assert.strictEqual(Object.keys(ws.rejectsObj).length, 1);
                        assert.strictEqual(Object.keys(ws.timeoutsObj).length, 1);
                    };
                });
        });
        it('sendAwait with data {Object} and error in attachAwaitId', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.setSettings({
                        attachAwaitId: () => {
                            throw new Error('Test');
                        },
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                                assert.strictEqual(err.message, 'The message is not received: Test');
                                wss.close(done);
                            });
                    };
                });
        });
        it('sendAwait with data {Object} and timeout error', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.setSettings({
                        awaitTimeout: 0,
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                                assert.strictEqual(err.message, 'The message is not received: Response timeout expired');
                                wss.close(done);
                            });
                    };
                });
        });
        it('sendAwait with data {Object} and with WebSocket is not open', done => {
            const ws = new WebSocketAwait('ws://localhost', {
                agent: new CustomAgent()
            });
            ws.sendAwait(testData.default)
                .catch(err => {
                    assert.strictEqual(ws.waitingReplies.size, 0);
                    assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                    assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                    assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                    assert.strictEqual(err.message, 'The message is not received: WebSocket is not open: readyState 0 (CONNECTING)');
                    done();
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
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                                wss.close(done);
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('sendAwait with data {Object}, nameAwaitId = testId, leaveAwaitId = true and await waiting', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.setSettings({
                            nameAwaitId: 'testId',
                            leaveAwaitId: true,
                        });
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['testId', 'foo']);
                            ws.resAwait(testData.default, id);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.setSettings({
                        nameAwaitId: 'testId',
                        leaveAwaitId: true,
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .then(waiting => {
                                assert.strictEqual(typeof waiting, 'object');
                                assert.strictEqual(typeof waiting.testId, 'string');
                                assert.strictEqual(typeof waiting.foo, 'number');
                                assert.deepStrictEqual(Object.keys(waiting), ['testId', 'foo']);
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                                wss.close(done);
                            })
                            .catch(err => {
                                throw new Error(`This test without Errors: ${err}`);
                            });
                    };
                });
        });
        it('sendAwait with data {Object}, leaveAwaitId = true and await waiting', done => {
            const wss = new WebSocketAwait.Server(
                {port: 0},
                () => {
                    wss.on('connection', ws => {
                        ws.setSettings({
                            leaveAwaitId: true,
                        });
                        ws.on('messageAwait', (msg, id) => {
                            assert.strictEqual(typeof id, 'string');
                            assert.strictEqual(typeof msg, 'object');
                            assert.deepStrictEqual(Object.keys(msg), ['awaitId', 'foo']);
                            ws.resAwait(testData.default, id);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.setSettings({
                        leaveAwaitId: true,
                    });
                    ws.onopen = () => {
                        ws.sendAwait(testData.default)
                            .then(waiting => {
                                assert.strictEqual(typeof waiting, 'object');
                                assert.strictEqual(typeof waiting.awaitId, 'string');
                                assert.strictEqual(typeof waiting.foo, 'number');
                                assert.deepStrictEqual(Object.keys(waiting), ['awaitId', 'foo']);
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                                wss.close(done);
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
                            wss.close(done);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        const awaitId = ws.generateAwaitId();
                        ws.resAwait(testData.default, awaitId)
                            .then(status => {
                                assert.strictEqual(awaitId, status);
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
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
                            wss.close(done);
                        });
                    });
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.onopen = () => {
                        const awaitId = ws.generateAwaitId();
                        ws.resAwait(testData.default, awaitId, () => {
                            throw new Error('Callback is passed to sendAwait method')
                        })
                            .then(status => {
                                assert.strictEqual(awaitId, status);
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
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
                    const ws = new WebSocketAwait(`ws://localhost:${wss.address().port}`);
                    ws.setSettings({
                        attachAwaitId: () => {
                            throw new Error('Test');
                        },
                    });
                    ws.onopen = () => {
                        ws.resAwait(testData.default)
                            .catch(err => {
                                assert.strictEqual(ws.waitingReplies.size, 0);
                                assert.strictEqual(Object.keys(ws.resolvesObj).length, 0);
                                assert.strictEqual(Object.keys(ws.rejectsObj).length, 0);
                                assert.strictEqual(Object.keys(ws.timeoutsObj).length, 0);
                                assert.strictEqual(err.message, 'The message is not received: Test');
                                wss.close(done);
                            });
                    };
                });
        });
    });
});
