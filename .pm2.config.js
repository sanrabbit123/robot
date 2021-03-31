module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 0,
      exec_mode: "cluster",
      args: [ "back" ]
    }
  ]
};
