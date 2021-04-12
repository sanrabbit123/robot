module.exports = {
  apps: [
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "server" ]
    }
  ]
};
