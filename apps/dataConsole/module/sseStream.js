"use strict";

const stream_1 = require("stream");

class SseStream extends stream_1.Transform {

  constructor(req) {
    super({ objectMode: true });
    if (req) {
      req.socket.setKeepAlive(true);
      req.socket.setNoDelay(true);
      req.socket.setTimeout(0);
    }
  }

  pipe(destination, options) {
    if (destination.writeHead) {
      destination.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Transfer-Encoding': 'identity',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });
      destination.flushHeaders();
    }

    destination.write(':ok\n\n');
    return super.pipe(destination, options);
  }

  _transform(message, encoding, callback) {
    const dataString = function (data) {
      if (typeof data === 'object') {
        return dataString(JSON.stringify(data));
      }
      return data.split(/\r\n|\r|\n/).map(line => `data: ${line}\n`).join('');
    }

    if (message.comment) {
      this.push(`: ${message.comment}\n`);
    }
    if (message.event) {
      this.push(`event: ${message.event}\n`);
    }
    if (message.id) {
      this.push(`id: ${message.id}\n`);
    }
    if (message.retry) {
      this.push(`retry: ${message.retry}\n`);
    }
    if (message.data) {
      this.push(dataString(message.data));
    }
    this.push('\n');
    callback();
  }

  writeMessage(message, encoding, cb) {
    return this.write(message, encoding, cb);
  }
  
}

module.exports = SseStream;
