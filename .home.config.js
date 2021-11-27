module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 12,
      exec_mode: "cluster",
      args: [ "back" ]
    },
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 4,
      exec_mode: "cluster",
      args: [ "file" ]
    }
  ]
};
