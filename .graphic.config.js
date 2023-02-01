module.exports = {
  apps: [
    {
      name: "clown",
      script: "./clown.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "cronServer" ]
    }
  ]
};
