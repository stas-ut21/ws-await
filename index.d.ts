// This types extents @types/ws
// Thank you to the creators of the original: Paul Loyd <https://github.com/loyd>
//                 Matt Silverlock <https://github.com/elithrar>
//                 Margus Lamp <https://github.com/mlamp>
//                 Philippe D'Alva <https://github.com/TitaneBoy>
//                 reduckted <https://github.com/reduckted>
//                 teidesu <https://github.com/teidesu>
//                 Bartosz Wojtkowiak <https://github.com/wojtkowiak>
//                 Kyle Hensel <https://github.com/k-yle>

/// <reference types="node" />

import * as events from 'events';
import * as http from 'http';
import * as https from 'https';
import * as net from 'net';
import * as url from 'url';
import * as zlib from 'zlib';
import * as stream from 'stream';
import {SecureContextOptions} from 'tls';

// WebSocketAwait socket.
declare class WebSocketAwait extends events.EventEmitter {
    /** The connection is not yet open. */
    static CONNECTING: 0;
    /** The connection is open and ready to communicate. */
    static OPEN: 1;
    /** The connection is in the process of closing. */
    static CLOSING: 2;
    /** The connection is closed. */
    static CLOSED: 3;

    static WebSocketAwaitValidationError: WebSocketAwait.WebSocketAwaitValidationError;
    static WebSocketAwaitConnectionCloseError: WebSocketAwait.WebSocketAwaitConnectionCloseError;
    static WebSocketAwaitTimeoutAwaitError: WebSocketAwait.WebSocketAwaitTimeoutAwaitError;
    static WebSocketAwaitSendError: WebSocketAwait.WebSocketAwaitSendError;
    static WebSocketAwaitProcessedError: WebSocketAwait.WebSocketAwaitProcessedError;

    binaryType: string;
    bufferedAmount: number;
    extensions: string;
    protocol: string;
    /** The current state of the connection */
    readyState:
        | typeof WebSocketAwait.CONNECTING
        | typeof WebSocketAwait.OPEN
        | typeof WebSocketAwait.CLOSING
        | typeof WebSocketAwait.CLOSED;
    url: string;

    /** The connection is not yet open. */
    CONNECTING: 0;
    /** The connection is open and ready to communicate. */
    OPEN: 1;
    /** The connection is in the process of closing. */
    CLOSING: 2;
    /** The connection is closed. */
    CLOSED: 3;

    onopen: (event: WebSocketAwait.OpenEvent) => void;
    onerror: (event: WebSocketAwait.ErrorEvent) => void;
    onclose: (event: WebSocketAwait.CloseEvent) => void;
    onmessage: (event: WebSocketAwait.MessageEvent) => void;

    constructor(address: string | url.URL, options?: WebSocketAwait.ClientOptions | http.ClientRequestArgs);
    constructor(address: string | url.URL, protocols?: string | string[], options?: WebSocketAwait.ClientOptions | http.ClientRequestArgs);

    get awaitListSize(): number;

    close(code?: number, data?: string): void;

    ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;

    pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;

    send(data: any, cb?: (err?: Error) => void): Promise<void>;
    send(data: any, options: { mask?: boolean; binary?: boolean; compress?: boolean; fin?: boolean }, cb?: (err?: Error) => void): Promise<void>;

    sendAwait(data: any, options?: { mask?: boolean; binary?: boolean; compress?: boolean; fin?: boolean }): Promise<any | WebSocketAwait.WebSocketAwaitTimeoutAwaitError | WebSocketAwait.WebSocketAwaitSendError | WebSocketAwait.WebSocketAwaitProcessedError>;

    resAwait(data: any, awaitId: any, options?: { mask?: boolean; binary?: boolean; compress?: boolean; fin?: boolean }): Promise<any | WebSocketAwait.WebSocketAwaitSendError | WebSocketAwait.WebSocketAwaitProcessedError>;

    static validateOptions(options: Partial<Pick<WebSocketAwait.ClientOptions, ('awaitTimeout' | 'leaveAwaitId' | 'packMessage' | 'unpackMessage' | 'generateAwaitId' | 'attachAwaitId' | 'extractAwaitId' | 'deleteAwaitId')>>): void | WebSocketAwait.WebSocketAwaitValidationError;

    terminate(): void;

    // HTML5 WebSocketAwait events
    addEventListener(method: 'message', cb: (event: {
        data: any;
        type: string;
        target: WebSocketAwait
    }) => void, options?: WebSocketAwait.EventListenerOptions): void;
    addEventListener(method: 'close', cb: (event: {
        wasClean: boolean; code: number;
        reason: string; target: WebSocketAwait
    }) => void, options?: WebSocketAwait.EventListenerOptions): void;
    addEventListener(method: 'error', cb: (event: {
        error: any,
        message: any,
        type: string,
        target: WebSocketAwait
    }) => void, options?: WebSocketAwait.EventListenerOptions): void;
    addEventListener(method: 'open', cb: (event: { target: WebSocketAwait }) => void, options?: WebSocketAwait.EventListenerOptions): void;
    addEventListener(method: string, listener: () => void, options?: WebSocketAwait.EventListenerOptions): void;

    removeEventListener(method: 'message', cb?: (event: { data: any; type: string; target: WebSocketAwait }) => void): void;
    removeEventListener(method: 'close', cb?: (event: {
        wasClean: boolean; code: number;
        reason: string; target: WebSocketAwait
    }) => void): void;
    removeEventListener(method: 'error', cb?: (event: { error: any, message: any, type: string, target: WebSocketAwait }) => void): void;
    removeEventListener(method: 'open', cb?: (event: { target: WebSocketAwait }) => void): void;
    removeEventListener(method: string, listener?: () => void): void;

    // Events
    on(event: 'close', listener: (this: WebSocketAwait, code: number, reason: string) => void): this;
    on(event: 'error', listener: (this: WebSocketAwait, err: Error) => void): this;
    on(event: 'upgrade', listener: (this: WebSocketAwait, request: http.IncomingMessage) => void): this;
    on(event: 'message', listener: (this: WebSocketAwait, data: WebSocketAwait.Data) => void): this;
    on(event: 'open', listener: (this: WebSocketAwait) => void): this;
    on(event: 'ping' | 'pong', listener: (this: WebSocketAwait, data: Buffer) => void): this;
    on(event: 'unexpected-response', listener: (this: WebSocketAwait, request: http.ClientRequest, response: http.IncomingMessage) => void): this;
    on(event: string | symbol, listener: (this: WebSocketAwait, ...args: any[]) => void): this;

    once(event: 'close', listener: (this: WebSocketAwait, code: number, reason: string) => void): this;
    once(event: 'error', listener: (this: WebSocketAwait, err: Error) => void): this;
    once(event: 'upgrade', listener: (this: WebSocketAwait, request: http.IncomingMessage) => void): this;
    once(event: 'message', listener: (this: WebSocketAwait, data: WebSocketAwait.Data) => void): this;
    once(event: 'open', listener: (this: WebSocketAwait) => void): this;
    once(event: 'ping' | 'pong', listener: (this: WebSocketAwait, data: Buffer) => void): this;
    once(event: 'unexpected-response', listener: (this: WebSocketAwait, request: http.ClientRequest, response: http.IncomingMessage) => void): this;
    once(event: string | symbol, listener: (this: WebSocketAwait, ...args: any[]) => void): this;

    off(event: 'close', listener: (this: WebSocketAwait, code: number, reason: string) => void): this;
    off(event: 'error', listener: (this: WebSocketAwait, err: Error) => void): this;
    off(event: 'upgrade', listener: (this: WebSocketAwait, request: http.IncomingMessage) => void): this;
    off(event: 'message', listener: (this: WebSocketAwait, data: WebSocketAwait.Data) => void): this;
    off(event: 'open', listener: (this: WebSocketAwait) => void): this;
    off(event: 'ping' | 'pong', listener: (this: WebSocketAwait, data: Buffer) => void): this;
    off(event: 'unexpected-response', listener: (this: WebSocketAwait, request: http.ClientRequest, response: http.IncomingMessage) => void): this;
    off(event: string | symbol, listener: (this: WebSocketAwait, ...args: any[]) => void): this;

    addListener(event: 'close', listener: (code: number, message: string) => void): this;
    addListener(event: 'error', listener: (err: Error) => void): this;
    addListener(event: 'upgrade', listener: (request: http.IncomingMessage) => void): this;
    addListener(event: 'message', listener: (data: WebSocketAwait.Data) => void): this;
    addListener(event: 'open', listener: () => void): this;
    addListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
    addListener(event: 'unexpected-response', listener: (request: http.ClientRequest, response: http.IncomingMessage) => void): this;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;

    removeListener(event: 'close', listener: (code: number, message: string) => void): this;
    removeListener(event: 'error', listener: (err: Error) => void): this;
    removeListener(event: 'upgrade', listener: (request: http.IncomingMessage) => void): this;
    removeListener(event: 'message', listener: (data: WebSocketAwait.Data) => void): this;
    removeListener(event: 'open', listener: () => void): this;
    removeListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
    removeListener(event: 'unexpected-response', listener: (request: http.ClientRequest, response: http.IncomingMessage) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
}

declare namespace WebSocketAwait {
    /**
     * Data represents the message payload received over the WebSocketAwait.
     */
    type Data = string | Buffer | ArrayBuffer | Buffer[];

    /**
     * CertMeta represents the accepted types for certificate & key data.
     */
    type CertMeta = string | string[] | Buffer | Buffer[];

    /**
     * VerifyClientCallbackSync is a synchronous callback used to inspect the
     * incoming message. The return value (boolean) of the function determines
     * whether or not to accept the handshake.
     */
    type VerifyClientCallbackSync = (info: { origin: string; secure: boolean; req: http.IncomingMessage }) => boolean;

    /**
     * VerifyClientCallbackAsync is an asynchronous callback used to inspect the
     * incoming message. The return value (boolean) of the function determines
     * whether or not to accept the handshake.
     */
    type VerifyClientCallbackAsync = (info: { origin: string; secure: boolean; req: http.IncomingMessage }
        , callback: (res: boolean, code?: number, message?: string, headers?: http.OutgoingHttpHeaders) => void) => void;

    interface WebSocketAwaitValidationError extends Error {
    }

    interface WebSocketAwaitConnectionCloseError extends Error {
    }

    interface WebSocketAwaitTimeoutAwaitError extends Error {
    }

    interface WebSocketAwaitSendError extends Error {
    }

    interface WebSocketAwaitProcessedError extends Error {
    }

    interface ClientOptions extends SecureContextOptions {
        awaitTimeout?: number;
        leaveAwaitId?: boolean;
        packMessage?: (data: any) => any;
        unpackMessage?: (data: any) => any;
        generateAwaitId?: () => any;
        attachAwaitId?: (data: any, id: any) => any;
        extractAwaitId?: (data: any) => any;
        deleteAwaitId?: (data: any) => void;
        protocol?: string;
        followRedirects?: boolean;
        handshakeTimeout?: number;
        maxRedirects?: number;
        perMessageDeflate?: boolean | PerMessageDeflateOptions;
        localAddress?: string;
        protocolVersion?: number;
        headers?: { [key: string]: string };
        origin?: string;
        agent?: http.Agent;
        host?: string;
        family?: number;

        checkServerIdentity?(servername: string, cert: CertMeta): boolean;

        rejectUnauthorized?: boolean;
        maxPayload?: number;
    }

    interface PerMessageDeflateOptions {
        serverNoContextTakeover?: boolean;
        clientNoContextTakeover?: boolean;
        serverMaxWindowBits?: number;
        clientMaxWindowBits?: number;
        zlibDeflateOptions?: {
            flush?: number;
            finishFlush?: number;
            chunkSize?: number;
            windowBits?: number;
            level?: number;
            memLevel?: number;
            strategy?: number;
            dictionary?: Buffer | Buffer[] | DataView;
            info?: boolean;
        };
        zlibInflateOptions?: zlib.ZlibOptions;
        threshold?: number;
        concurrencyLimit?: number;
    }

    interface OpenEvent {
        target: WebSocketAwait;
    }

    interface ErrorEvent {
        error: any;
        message: string;
        type: string;
        target: WebSocketAwait;
    }

    interface CloseEvent {
        wasClean: boolean;
        code: number;
        reason: string;
        target: WebSocketAwait;
    }

    interface MessageEvent {
        data: Data;
        type: string;
        target: WebSocketAwait;
    }

    interface EventListenerOptions {
        once?: boolean;
    }

    interface ServerOptions {
        host?: string;
        port?: number;
        backlog?: number;
        server?: http.Server | https.Server;
        verifyClient?: VerifyClientCallbackAsync | VerifyClientCallbackSync;
        handleProtocols?: any;
        path?: string;
        noServer?: boolean;
        clientTracking?: boolean;
        perMessageDeflate?: boolean | PerMessageDeflateOptions;
        maxPayload?: number;
    }

    interface AddressInfo {
        address: string;
        family: string;
        port: number;
    }

    // WebSocketAwait Server
    class Server extends events.EventEmitter {
        options: ServerOptions;
        path: string;
        clients: Set<WebSocketAwait>;

        constructor(options?: ServerOptions, callback?: () => void);

        address(): AddressInfo | string;

        close(cb?: (err?: Error) => void): void;

        handleUpgrade(request: http.IncomingMessage, socket: net.Socket,
                      upgradeHead: Buffer, callback: (client: WebSocketAwait, request: http.IncomingMessage) => void): void;

        shouldHandle(request: http.IncomingMessage): boolean | Promise<boolean>;

        // Events
        on(event: 'connection', cb: (this: Server, socket: WebSocketAwait, request: http.IncomingMessage) => void): this;
        on(event: 'error', cb: (this: Server, error: Error) => void): this;
        on(event: 'headers', cb: (this: Server, headers: string[], request: http.IncomingMessage) => void): this;
        on(event: 'close' | 'listening', cb: (this: Server) => void): this;
        on(event: string | symbol, listener: (this: Server, ...args: any[]) => void): this;

        once(event: 'connection', cb: (this: Server, socket: WebSocketAwait, request: http.IncomingMessage) => void): this;
        once(event: 'error', cb: (this: Server, error: Error) => void): this;
        once(event: 'headers', cb: (this: Server, headers: string[], request: http.IncomingMessage) => void): this;
        once(event: 'close' | 'listening', cb: (this: Server) => void): this;
        once(event: string | symbol, listener: (...args: any[]) => void): this;

        off(event: 'connection', cb: (this: Server, socket: WebSocketAwait, request: http.IncomingMessage) => void): this;
        off(event: 'error', cb: (this: Server, error: Error) => void): this;
        off(event: 'headers', cb: (this: Server, headers: string[], request: http.IncomingMessage) => void): this;
        off(event: 'close' | 'listening', cb: (this: Server) => void): this;
        off(event: string | symbol, listener: (this: Server, ...args: any[]) => void): this;

        addListener(event: 'connection', cb: (client: WebSocketAwait) => void): this;
        addListener(event: 'error', cb: (err: Error) => void): this;
        addListener(event: 'headers', cb: (headers: string[], request: http.IncomingMessage) => void): this;
        addListener(event: 'close' | 'listening', cb: () => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;

        removeListener(event: 'connection', cb: (client: WebSocketAwait) => void): this;
        removeListener(event: 'error', cb: (err: Error) => void): this;
        removeListener(event: 'headers', cb: (headers: string[], request: http.IncomingMessage) => void): this;
        removeListener(event: 'close' | 'listening', cb: () => void): this;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    // WebSocketAwait stream
    function createWebSocketAwaitStream(websocket: WebSocketAwait, options?: stream.DuplexOptions): stream.Duplex;
}

export = WebSocketAwait;