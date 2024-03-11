module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 6,
      exec_mode: "cluster",
      args: [ "static" ]
    },
  ]
};
