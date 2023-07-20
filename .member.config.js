module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "member" ]
    },
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "client" ]
    },
  ]
};
