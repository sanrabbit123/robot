module.exports = {
  apps: [
    {
      name: "alien",
      script: "./alien.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "receiveSms" ]
    },
    {
      name: "koala",
      script: "./koala.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "cronServer" ]
    },
    {
      name: "robot",
      script: "./robot.js",
      instances: 12,
      exec_mode: "cluster",
      args: [ "static" ]
    },
  ]
};
