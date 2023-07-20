const Ghost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Ghost.stacks = {
  socket: null,
}

Ghost.prototype.ghostClient = async function () {
  const instance = this;
  const address = this.address;
  const { requestSystem, errorLog, equalJson } = this.mother;
  try {
    const WebSocket = require("ws");
    const url = "wss://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.wss) + "/general";
    let ws;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;
    
    ws = {};

    wsOpenEvent = async () => {
      try {
        setInterval(() => {
          ws.send(JSON.stringify({ message: "hi" }));
        }, 10 * 1000);
      } catch (e) {
        await errorLog(e.message);
        process.exit();
      }
    }
    wsMessageEvent = async (buffer) => {
      try {
        const message = String(buffer);
        console.log(message);
        console.log(JSON.parse(message));
      } catch (e) {
        await errorLog(e.message);
        console.log(e);
        process.exit();
      }
    }
    wsCloseEvent = async () => {
      try {
        ws = wsLaunching();
      } catch (e) {
        await errorLog(e.message);
        process.exit();
      }
    }
    wsLaunching = () => {
      let ws;
      ws = new WebSocket(url);
      ws.on("open", wsOpenEvent);
      ws.on("message", wsMessageEvent);
      ws.on("close", wsCloseEvent);
      return ws;
    }
    ws = wsLaunching();

  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.routerPatch = function (app) {
  const instance = this;
  const address = this.address;
  const { shellExec, shellLink, fileSystem, setQueue, equalJson, errorLog, sleep, messageSend, messageLog } = this.mother;

  app.get("/", async (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const member = [ ...Ghost.stacks.socket.clients ][0];
      if (member !== undefined && typeof member.send === "function") {
        member.send(JSON.stringify({ message: "hi" }));
      }      
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

  app.post("/printText", async (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const member = [ ...Ghost.stacks.socket.clients ][0];
      const thisBody = equalJson(req.body);
      if (member !== undefined && typeof member.send === "function") {
        member.send(JSON.stringify({ path: "/printText", body: thisBody }));
      }      
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

  app.post("/textToVoice", async (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const member = [ ...Ghost.stacks.socket.clients ][0];
      const thisBody = equalJson(req.body);
      if (member !== undefined && typeof member.send === "function") {
        member.send(JSON.stringify({ path: "/textToVoice", body: thisBody }));
      }      
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

}

Ghost.prototype.wssLaunching = async function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, errorLog, equalJson } = this.mother;
  try {
    const https = require("https");
    const express = require("express");
    const app = express();
    const useragent = require("express-useragent");
    const WebSocket = require("ws");
    const url = require("url");
    const port = address.officeinfo.ghost.wss;
    let generalSocket;
    let sockets, server;
    let pems, pemsLink;
    let certDir, keyDir, caDir;
    let memberAlive;

    app.use(useragent.express());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.ghost.host;

    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);

    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }
    pems.allowHTTP1 = true;

    // routing
    this.routerPatch(app);

    generalSocket = new WebSocket.Server({ noServer: true });
    generalSocket.on("connection", (ws) => {
      ws.on("message", (buffer) => {
        try {
          const message = String(buffer);    
        } catch (e) {
          console.log(e);
        }
      });
    });
    Ghost.stacks.socket = generalSocket;

    server = https.createServer(pems, app);

    server.on("upgrade", (request, socket, head) => {
      const { pathname } = url.parse(request.url);
      if (/general/gi.test(pathname)) {
        generalSocket.handleUpgrade(request, socket, head, (ws) => {
          generalSocket.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    server.listen(port, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nWss server running\n`); });

  } catch (e) {
    console.log(e);
  }
}

const ghost = new Ghost();

if (/server/gi.test(process.argv[2])) {
  ghost.wssLaunching().catch((err) => {
    console.log(err);
  });
} else if (/client/gi.test(process.argv[2])) {
  ghost.ghostClient().catch((err) => {
    console.log(err);
  });
}