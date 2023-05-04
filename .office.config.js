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
      name: "robot",
      script: "./robot.js",
      instances: 10,
      exec_mode: "cluster",
      args: [ "static" ]
    },
    {
      name: "clown",
      script: "./clown.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "graphicServer" ]
    }
  ]
};
