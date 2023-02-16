module.exports = {
  apps: [
    {
      name: "robot",
      script: "./robot.js",
      instances: 2,
      exec_mode: "cluster",
      args: [ "static" ]
    },
    // {
    //   name: "clown",
    //   script: "./clown.js",
    //   instances: 1,
    //   exec_mode: "cluster",
    //   args: [ "graphicServer" ]
    // }
  ]
};
