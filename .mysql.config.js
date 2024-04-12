module.exports = {
  apps: [
    {
      name: "human",
      script: "./human.py",
      interpreter: "python3",
      instances: 1,
      exec_mode: "fork",
      args: [ "sqlCloud" ]
    },
  ]
};
