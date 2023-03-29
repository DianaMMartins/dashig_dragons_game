const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { server, io } = require("../server.js");

describe("Test suite for awesome socket stuff", () => {
  let serverSocket, clientSocket;

  beforeAll((done) => {
    server.listen(() => {
      const port = server.address().port;
      clientSocket = new Client(`http://localhost:${port}`);

      io.on("connection", (socket) => {
        serverSocket = socket;
      });

      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("client receives 'world' on hello event", (done) => {
    clientSocket.on("Hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });

    serverSocket.emit("Hello", "world");
  });
});
