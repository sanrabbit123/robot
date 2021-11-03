const AiProposal = function (proid = "none") {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();
  this.back = new BackMaker();
  this.text = {};
  this.proid = proid;
  this.options = this.general.options;
  this.options.static_dir = `${this.options.home_dir}/result/static`;
  this.operationStacks = [];
}

AiProposal.prototype.saveStatic = async function (path) {
  const instance = this;
  const { shell, shellLink, fileSystem, binaryRequest } = this.mother;
  try {
    let protocol;
    let targetHost, targetPath, targetName;
    let tempArr, tempArr2, tempObject, tempString;

    if (/^http:/.test(path)) {
      path = path.slice(7);
      protocol = "http";
    } else if (/^https:/.test(path)) {
      path = path.slice(8);
      protocol = "https";
    } else {
      path = path;
      protocol = "https";
    }

    tempArr = path.split('/');
    targetHost = tempArr.shift();
    targetPath = '/' + tempArr.join('/');
    targetName = tempArr.pop();

    tempArr2 = [];
    for (let i = 0; i < tempArr.length; i++) {
      tempArr2.push(tempArr[i]);
      tempString = `${shellLink(this.options.static_dir)}/${tempArr2.join('/')}`;
      if (this.operationStacks.indexOf(tempString) === -1) {
        shell.exec(`mkdir ${tempString}`);
      }
      this.operationStacks.push(tempString);
    }

    tempObject = await binaryRequest(protocol + "://" + path);
    await fileSystem(`writeBinary`, [ this.options.static_dir + targetPath, tempObject ]);

  } catch (e) {
    console.log(e);
  }
}

AiProposal.prototype.proposalLaunching = async function () {
  const instance = this;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const { shell, shellLink, fileSystem, binaryRequest, messageSend } = this.mother;
  try {
    await this.general.static_setting();
    let result_dir;
    let tempObject;
    let temp_scriptString;
    let gres, resultDir;
    let client;
    let serviceWording;
    let intoObj;
    let fromArr, toArr;
    let tempArr;

    result_dir = await fileSystem(`readDir`, [ `${this.options.home_dir}/result` ]);
    for (let i of result_dir) { if (i !== ".DS_Store") {
      shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${i};`);
    }}
    shell.exec(`mkdir ${shellLink(this.options.static_dir)};`);

    if (this.proid !== "none") {
      this.text = await this.back.getProjectById(this.proid);
    } else {
      this.text = await this.back.getLatestProject();
    }

    for (let j = 0; j < this.text.proposal.detail.length; j++) {
      for (let i = 0; i < this.text.proposal.detail[j].pictureSettings.length; i++) {
        // await this.saveStatic(ADDRESS.s3info.host + this.text.proposal.detail[j].pictureSettings[i].imgSrc);
        await this.saveStatic(ADDRESS.homeinfo.ghost.protocol + "://" + ADDRESS.homeinfo.ghost.host + this.text.proposal.detail[j].pictureSettings[i].imgSrc);
      }
    }

    client = await this.back.getClientById(this.text.cliid);
    serviceWording = '';
    intoObj = this.text.toNormal();
    intoObj.client = client.toNormal();

    if (this.text.service.serid === "s2011_aa01s") {
      serviceWording = "홈퍼니싱";
    } else if (this.text.service.serid === "s2011_aa02s") {
      serviceWording = "홈스타일링";
    } else if (this.text.service.serid === "s2011_aa03s") {
      serviceWording = "토탈 스타일링";
    }

    intoObj.serviceWording = serviceWording;

    temp_scriptString = this.general.generator.proposal_maker.proposal(this.options);
    await this.general.startAdobe({
      name: `proposal`,
      data: intoObj,
      script: temp_scriptString,
      app: `Illustrator`,
      end: false,
    });

    const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
    const gd = new GoogleDrive();

    fromArr = [];
    toArr = [];
    resultDir = await this.mother.fileSystem("readDir", [ this.options.home_dir + "/result" ]);
    for (let i of resultDir) {
      if (i !== `.DS_Store` && i !== `static`) {
        tempArr = i.split('_');
        fromArr.push(this.options.home_dir + "/result/" + i);
        toArr.push("proposalPdf/" + tempArr[0] + '_' + tempArr[1] + ".pdf");
        gres = await gd.upload_andView("1ofHfJmGJJ6TCk5qP_VttNvIvHt2IVZ21", this.options.home_dir + "/result/" + i);
      }
    }
    await this.mother.ghostFileUpload(fromArr, toArr);

    // await messageSend({ text: `${client.name} 고객님의 제안서가 완료되었습니다! 확인부탁드립니다! : ${gres}`, channel: `#403_proposal` });
    // await this.back.updateProject([ { proid: this.text.proid }, { "proposal.status": "발송 대기", "proposal.date": new Date() } ]);

    if (await fileSystem(`exist`, [ process.env.HOME + "/safe.mp4" ])) {
      shell.exec(`open ${shellLink(process.env.HOME)}/safe.mp4`);
    }
    console.log(`done`);

  } catch (e) {
    console.log(e);
  }
}

module.exports = AiProposal;
