// Mother


for (let i = 0; i < 100; i++) {
  console.log("hello?\n");
}

// const getId = function (str) {
//   let callbackId = str.slice(0, (str.search(/[0-9]_/g) + 1));
//   return Number(callbackId);
// }
//
// const execFilter = function (str) {
//   for (let i = 0; i < 5; i++) {
//     str = str.replace(/=/g, "__secondequal__").replace(/&/g, "__secondempersend__");
//   }
//   return str;
// }
//
// let motherDir = `${process.cwd()}/apps/bridgeCloud`;
// let motherDirArr = await Mother.fileSystem("readDir", [ motherDir ]);
// let tongDir = `${motherDir}/tong`;
//
// if (!motherDirArr.includes("tong")) {
//   Mother.shell.exec("mkdir " + Mother.shellLink(tongDir));
// }
//
// let tongString;
// let tong = await Mother.fileSystem("readDir", [ tongDir ]);
//
// tong.sort((a, b) => { return getId(b) - getId(a); });
// let target = tong[0];
// let targetStr = await Mother.fileSystem("readString", [ tongDir + "/" + target ]);
//
// let response = await Mother.requestSystem("192.168.0.8", 3000, {}, { func: execFilter(targetStr) });
// console.log(response);
//
// for (let i of tong) {
//   Mother.shell.exec("rm -rf " + tongDir + "/" + i);
// }

return 0;
