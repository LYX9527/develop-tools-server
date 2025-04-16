#!/usr/bin/env node

/**
 * 模块依赖项。
 */
import app from '../app'
import http from 'http'
import d from 'debug';

const debug = d('graphql-demo:server');

/**
 * 从环境中获取端口并存储在 Express 中。
 */

const port = normalizePort(process.env.PORT || '3022');
app.set('port', port);

/**
 * 创建 HTTP 服务器。
 */
const server = http.createServer(app);

/**
 * 侦听所有网络接口上提供的端口。
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`服务启动成功，端口：${port}`);


/**
 * 将端口规范化为数字、字符串或 false。
 */
type normalizePortParam = string | number;

function normalizePort(val: normalizePortParam) {
    const port = parseInt(val as string, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * HTTP 服务器“错误”事件的事件侦听器。
 */

function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * 用于 HTTP 服务器“侦听”事件的事件侦听器。
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
    debug('Listening on ' + bind);
}
