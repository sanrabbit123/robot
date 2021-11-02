Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPort = void 0;
function getRandomPort() {
  const http_1 = require("http");
  return new Promise((resolve, reject) => {
      const server = http_1.createServer();
      server.listen(0);
      server.once('listening', () => {
          const { port } = server.address();
          server.close(() => resolve(port));
      });
      server.once('error', reject);
  });
}
exports.getRandomPort = getRandomPort;
