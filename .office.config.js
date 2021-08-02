module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "back" ]
    },
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 4,
      exec_mode: "cluster",
      args: [ "server" ]
    },
    {
      name: "alien",
      script: "./alien.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "office" ]
    }
  ]
};
