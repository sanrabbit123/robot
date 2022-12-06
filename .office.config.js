module.exports = {
  apps: [
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "server" ]
    }
  ]
};
