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
      name: "alien",
      script: "./alien.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "office" ]
    }
  ]
};
