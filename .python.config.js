module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "pythonCloud" ]
    },
    {
      name: "robot",
      script: "./robot.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "pythonWatcher" ]
    },
  ]
};
