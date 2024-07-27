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
      name: "cron",
      script: "./cron.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "cronServer" ]
    },
  ]
};
