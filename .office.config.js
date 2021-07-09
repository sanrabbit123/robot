module.exports = {
  apps: [
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 1,
      exec_mode: "fork",
      args: [ "server" ]
    },
    {
      name: "robot",
      script: "./robot.js",
      instances: 1,
      exec_mode: "fork",
      args: [ "graphicServer" ]
    }
  ]
};
