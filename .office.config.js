module.exports = {
  apps: [
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 6,
      exec_mode: "cluster",
      args: [ "server" ]
    }
  ]
};
