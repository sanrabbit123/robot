module.exports = {
  apps: [
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "server" ]
    },
    {
      name: "robot",
      script: "./robot.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "static" ]
    },
  ]
};
