module.exports = {
  apps: [
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 4,
      exec_mode: "cluster",
      args: [ "server" ]
    }
  ]
};
