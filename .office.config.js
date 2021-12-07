module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "cronServer" ]
    },
    {
      name: "ghost",
      script: "./ghost.js",
      instances: 6,
      exec_mode: "cluster",
      args: [ "server" ]
    },
    {
      name: "alien",
      script: "./alien.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "office" ]
    },
    {
      name: "koala",
      script: "./koala.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "publicSector" ]
    }
  ]
};
