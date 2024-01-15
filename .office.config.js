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
      name: "ghost",
      script: "./ghost.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "server" ]
    },
    {
      name: "koala",
      script: "./koala.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "cronServer" ]
    },
    {
      name: "clown",
      script: "./clown.js",
      instances: 1,
      exec_mode: "cluster",
      args: [ "notionCenter" ]
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
