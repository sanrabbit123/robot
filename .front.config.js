module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "logTest" ]
    },
    {
      name: "human",
      script: "./human.py",
      interpreter: "python3",
      instances: 1,
      args: [ "historyCloud" ]
    },
  ]
};
