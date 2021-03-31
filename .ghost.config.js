module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 3,
      exec_mode: "cluster",
      args: [ "back" ]
    },
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "file" ]
    }
  ]
};
