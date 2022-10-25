module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "back" ]
    }
  ]
};
