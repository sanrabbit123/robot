module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "static" ]
    },
    {
      name: "robot2",
      script: "./robot2.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "back" ]
    }
  ]
};
