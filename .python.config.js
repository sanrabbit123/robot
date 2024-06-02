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
      name: "robot2",
      script: "./robot2.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "cronServer" ]
    },
  ]
};
