// Mother 클래스를 현재 작업 디렉토리에서 가져옵니다.
const Mother = require(process.cwd() + "/apps/mother.js");
// 정보 객체를 가져옵니다.
const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
const mother = new Mother();
const address = ADDRESS;
const { errorLog, errorLogSync, emergencyAlarm } = mother;

/**
 * @class GaroseroArray
 * @extends Array
 * @description 이 클래스는 Array 클래스를 확장하여, 간단하게 가로와 세로를 나타내는 'gs' 속성만을 추출하여 배열로 반환하는 기능을 추가합니다.
 */
class GaroseroArray extends Array {
  /**
   * @method toSimple
   * @description 배열의 각 요소에서 'gs' 속성만을 추출하여 새로운 배열을 반환합니다.
   * @returns {Array} 'gs' 속성만을 포함하는 배열
   */
  toSimple() {
    // 빈 배열을 선언합니다.
    let arr = [];
    // 현재 배열(this) 내의 모든 객체에서 'gs' 속성을 추출하여 arr에 추가합니다.
    for (let { gs } of this) {
      arr.push(gs);
    }
    // 'gs' 속성만을 가진 배열을 반환합니다.
    return arr;
  }

  /**
   * @getter simple
   * @description toSimple 메서드를 호출하여 'gs' 속성만을 포함하는 배열을 반환하는 getter입니다.
   * @returns {Array} 'gs' 속성만을 포함하는 배열
   */
  get simple() {
    return this.toSimple();
  }
}

/**
 * @class ImageReader
 * @description 이 클래스는 이미지 처리와 관련된 다양한 기능을 제공하며, 이미지 변환, 크기 조정, 조합 등의 작업을 수행합니다.
 * @param {Object|null} mother - Mother 클래스의 인스턴스 또는 null
 * @param {Object|null} back - BackMaker 클래스의 인스턴스 또는 null
 * @param {Object|null} address - 주소 정보 객체 또는 null
 */
const ImageReader = function (mother = null, back = null, address = null) {
  // 만약 mother, back, address가 모두 null이 아니라면 해당 인스턴스를 사용합니다.
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother; // Mother 클래스의 인스턴스를 할당합니다.
    this.back = back; // BackMaker 클래스의 인스턴스를 할당합니다.
    this.address = address; // 주소 정보 객체를 할당합니다.
  } else {
    // 모두 null일 경우, 각 클래스를 새로 불러와 인스턴스를 생성합니다.
    const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스를 현재 작업 디렉토리에서 불러옵니다.
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // BackMaker 클래스를 불러옵니다.
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js"); // 주소 정보를 포함한 객체를 불러옵니다.
    this.mother = new Mother(); // Mother 클래스의 인스턴스를 생성하여 this.mother에 할당합니다.
    this.back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성하여 this.back에 할당합니다.
    this.address = ADDRESS; // 불러온 주소 정보 객체를 this.address에 할당합니다.
  }
  // 이미지 리더 관련 작업 디렉토리 경로를 설정합니다.
  this.dir = process.cwd() + "/apps/imageReader";
  // 임시 파일을 저장할 디렉토리 경로를 설정합니다.
  this.tempDir = process.cwd() + "/temp";
  // 소스 이미지 파일이 위치한 디렉토리 경로를 설정합니다.
  this.sourceDir = this.dir + "/source";
  // 다양한 크기의 공식 이미지 사이즈를 설정합니다.
  this.officialSize = {
    s749: [ 749, 1060 ], // 749x1060 사이즈
    s780: [ 780, 1103 ], // 780x1103 사이즈
    s1000: [ 1000, 1415 ], // 1000x1415 사이즈
    s1500: [ 1060, 1500 ], // 1060x1500 사이즈
    s3508: [ 2480, 3508 ], // 2480x3508 사이즈
  };
}

/**
 * @method convertImage
 * @description 이미지를 지정된 모드로 변환합니다. 리사이즈 또는 크롭 모드를 지원하며, 변환된 이미지를 저장합니다.
 * @param {Object} obj - 이미지 변환에 필요한 정보를 포함한 객체
 * @param {string} obj.input - 원본 이미지 파일의 경로
 * @param {number} obj.width - 목표 너비
 * @param {number} obj.height - 목표 높이
 * @param {number} obj.quality - 이미지 품질
 * @param {string} obj.output - 결과 이미지 파일의 경로
 * @param {string} [obj.mode="resize"] - 변환 모드("resize" 또는 "crop")
 * @param {number} [obj.x] - 크롭 시 x 좌표 (옵션)
 * @param {number} [obj.y] - 크롭 시 y 좌표 (옵션)
 * @returns {Promise<Object|null>} 변환이 성공하면 성공 메시지를 포함한 객체를 반환하며, 실패 시 null을 반환합니다.
 */
ImageReader.prototype.convertImage = async function (obj) {
  // 인스턴스 참조를 위한 상수를 선언합니다.
  const instance = this;
  // mother 클래스의 shellExec, shellLink, fileSystem 메서드를 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, fileSystem } = this.mother;
  try {
    let targetImage; // 변환할 이미지의 경로를 저장할 변수입니다.
    let targetWidth; // 변환할 이미지의 목표 너비를 저장할 변수입니다.
    let targetHeight; // 변환할 이미지의 목표 높이를 저장할 변수입니다.
    let qualityConst; // 변환할 이미지의 품질을 저장할 변수입니다.
    let middleTarget; // 중간 결과물의 경로를 저장할 변수입니다.
    let thisDir; // 변환 후 이미지가 저장될 디렉토리 경로를 저장할 변수입니다.
    let thisDirContents; // 변환 후 디렉토리의 내용을 저장할 변수입니다.
    let thisFileName; // 변환 후 파일 이름을 저장할 변수입니다.
    let thisFileExe; // 변환 후 파일 확장자를 저장할 변수입니다.
    let mode; // 변환 모드를 저장할 변수입니다.
    let cropMatrix; // 크롭할 영역의 정보를 저장할 변수입니다.
    let moveX; // 크롭 시 이동할 x 좌표를 저장할 변수입니다.
    let moveY; // 크롭 시 이동할 y 좌표를 저장할 변수입니다.
    let inputDir; // 원본 이미지의 디렉토리 경로를 저장할 변수입니다.
    let inputFileName; // 원본 이미지의 파일 이름을 저장할 변수입니다.
    let inputFileExe; // 원본 이미지의 파일 확장자를 저장할 변수입니다.
    let inputDirContents; // 원본 이미지가 있는 디렉토리의 내용을 저장할 변수입니다.

    // obj에서 변환 모드를 가져오며, 기본값은 "resize"입니다.
    mode = obj.mode || "resize";

    // obj에서 원본 이미지 경로, 목표 너비와 높이, 품질, 출력 경로를 가져옵니다.
    targetImage = obj.input;
    targetWidth = obj.width;
    targetHeight = obj.height;
    qualityConst = obj.quality;
    middleTarget = obj.output;

    // 원본 이미지 경로에서 디렉토리 경로와 파일 이름 및 확장자를 분리하여 저장합니다.
    inputDir = targetImage.split("/").slice(0, -1).join("/");
    inputFileName = targetImage.split("/")[targetImage.split("/").length - 1];
    inputFileExe = inputFileName.split(".")[inputFileName.split(".").length - 1];
    inputFileName = inputFileName.split(".").slice(0, -1).join(".");

    // 출력 이미지 경로에서도 마찬가지로 디렉토리 경로와 파일 이름 및 확장자를 분리합니다.
    thisDir = middleTarget.split("/").slice(0, -1).join("/");
    thisFileName = middleTarget.split("/")[middleTarget.split("/").length - 1];
    thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
    thisFileName = thisFileName.split(".").slice(0, -1).join(".");

    // shellExec 메서드를 사용하여 이미지의 방향을 자동으로 맞추고, 메타데이터를 제거합니다.
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, targetImage ]);
    // fileSystem 메서드를 사용하여 파일이 존재하는지 확인합니다.
    if (!(await fileSystem(`exist`, [ targetImage ]))) {
      // 파일이 존재하지 않으면 해당 디렉토리의 파일 목록을 읽어옵니다.
      inputDirContents = await fileSystem(`readFolder`, [ inputDir ]);
      // 원본 파일 이름 패턴에 맞는 파일만 필터링합니다.
      inputDirContents = inputDirContents.filter((str) => { return (new RegExp(inputFileName + "-[0-9]+." + inputFileExe, "g")).test(str) });
      // 변환에 실패하면 오류를 던집니다.
      if (inputDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        // 성공 시 파일을 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(inputDir + "/" + inputDirContents[0])} ${shellLink(inputDir + "/" + inputFileName + "." + inputFileExe)}`)
        for (let str of inputDirContents) {
          await shellExec(`rm -rf ${shellLink(inputDir + "/" + str)}`);
        }
      }
    }

    // 변환 모드가 "resize"인 경우, convert 명령어를 사용하여 이미지를 리사이즈합니다.
    if (mode === "resize") {
      await shellExec(`convert ${shellLink(targetImage)} -resize ${String(targetWidth)}x${String(targetHeight)}! -quality ${String(qualityConst)} ${shellLink(middleTarget)}`);
    // 변환 모드가 "crop"인 경우, 크롭할 좌표를 계산하여 이미지를 크롭합니다.
    } else if (mode === "crop") {
      moveX = obj.x;
      moveY = obj.y;
      cropMatrix = String(targetWidth) + "x" + String(targetHeight) + "+" + String(moveX) + "+" + String(moveY);
      await shellExec(`convert ${shellLink(targetImage)} -crop ${cropMatrix} -quality ${String(qualityConst)} ${shellLink(middleTarget)}`);
    } else {
      // 지원하지 않는 모드일 경우 오류를 던집니다.
      throw new Error("invalid mode");
    }

    // 변환 후 파일이 제대로 생성되었는지 확인합니다.
    if (!(await fileSystem(`exist`, [ middleTarget ]))) {
      // 파일이 생성되지 않았을 경우, 해당 디렉토리의 파일 목록을 읽어옵니다.
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      // 파일 이름 패턴에 맞는 파일만 필터링합니다.
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      // 변환 실패 시 오류를 던집니다.
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        // 성공 시 파일을 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    // 최종적으로 이미지의 방향을 자동으로 맞추고, 메타데이터를 제거합니다.
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, middleTarget ]);
    // 최종 파일이 존재하는지 확인합니다.
    if (!(await fileSystem(`exist`, [ middleTarget ]))) {
      // 파일이 존재하지 않을 경우, 변환에 실패했다는 오류를 던집니다.
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    // 성공 시 성공 메시지를 포함한 객체를 반환합니다.
    return { message: "done" };

  } catch (e) {
    // 오류가 발생하면 콘솔에 로그를 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * @method compositeImage
 * @description 두 개의 이미지를 합성하여 하나의 이미지로 만드는 메서드입니다. 상단 이미지와 하단 이미지를 겹쳐서 지정된 위치에 맞게 결합합니다.
 * @param {Object} obj - 이미지 합성에 필요한 정보를 포함하는 객체
 * @param {string} obj.up - 상단 레이어 이미지 파일의 경로
 * @param {string} obj.down - 하단 레이어 이미지 파일의 경로
 * @param {string} obj.output - 결과 이미지 파일의 경로
 * @param {number} [obj.x=0] - 상단 레이어의 x 좌표 (옵션)
 * @param {number} [obj.y=0] - 상단 레이어의 y 좌표 (옵션)
 * @returns {Promise<Object|null>} 이미지 합성이 성공하면 성공 메시지를 포함한 객체를 반환하며, 실패 시 null을 반환합니다.
 */
ImageReader.prototype.compositeImage = async function (obj) {
  // 인스턴스 참조를 위한 상수를 선언합니다.
  const instance = this;
  // Mother 클래스의 shellExec, shellLink, fileSystem 메서드를 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, fileSystem } = this.mother;

  try {
    // 합성에 사용할 상단 레이어와 하단 레이어 이미지의 경로를 저장할 변수를 선언합니다.
    let upLayer, downLayer;
    // 합성 결과를 저장할 파일의 경로를 저장할 변수를 선언합니다.
    let resultTarget;
    // 결과 이미지가 저장될 디렉토리 경로를 저장할 변수를 선언합니다.
    let thisDir;
    // 결과 파일의 이름과 확장자를 저장할 변수를 선언합니다.
    let thisFileName, thisFileExe;
    // 결과 디렉토리의 내용을 저장할 변수를 선언합니다.
    let thisDirContents;
    // 상단 레이어가 이동할 x와 y 좌표를 저장할 변수를 선언합니다.
    let moveX, moveY;

    // obj에서 상단 레이어와 하단 레이어, 결과 파일의 경로를 가져옵니다.
    upLayer = obj.up;
    downLayer = obj.down;
    resultTarget = obj.output;
    // x와 y 좌표는 지정되지 않은 경우 기본값으로 0을 사용합니다.
    moveX = (typeof obj.x === "number" ? obj.x : 0);
    moveY = (typeof obj.y === "number" ? obj.y : 0);

    // 결과 파일 경로에서 디렉토리 경로와 파일 이름 및 확장자를 분리하여 저장합니다.
    thisDir = resultTarget.split("/").slice(0, -1).join("/");
    thisFileName = resultTarget.split("/")[resultTarget.split("/").length - 1];
    thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
    thisFileName = thisFileName.split(".").slice(0, -1).join(".");

    // shellExec 메서드를 사용하여 상단 레이어와 하단 레이어를 지정된 위치에 합성하여 결과 이미지를 생성합니다.
    await shellExec(`composite -geometry +${String(moveX)}+${String(moveY)} ${shellLink(upLayer)} ${shellLink(downLayer)} ${shellLink(resultTarget)}`);

    // fileSystem 메서드를 사용하여 결과 이미지 파일이 존재하는지 확인합니다.
    if (!(await fileSystem(`exist`, [ resultTarget ]))) {
      // 결과 파일이 존재하지 않으면, 해당 디렉토리의 파일 목록을 읽어옵니다.
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      // 결과 파일 이름 패턴에 맞는 파일만 필터링합니다.
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      // 변환에 실패하면 오류를 던집니다.
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        // 성공 시 파일을 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    // shellExec 메서드를 사용하여 결과 이미지의 방향을 자동으로 맞추고, 메타데이터를 제거합니다.
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, resultTarget ]);

    // 최종 파일이 존재하는지 확인합니다.
    if (!(await fileSystem(`exist`, [ resultTarget ]))) {
      // 파일이 존재하지 않을 경우, 변환에 실패했다는 오류를 던집니다.
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    // 성공 시 성공 메시지를 포함한 객체를 반환합니다.
    return { message: "done" };

  } catch (e) {
    // 오류가 발생하면 콘솔에 로그를 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * @method pdfToJpg
 * @description PDF 파일을 JPG 이미지 파일로 변환하는 메서드입니다. 페이지 수에 따라 여러 개의 JPG 파일이 생성될 수 있으며, 옵션에 따라 원본 PDF 파일을 삭제할 수 있습니다.
 * @param {string} filePath - PDF 파일의 절대 경로
 * @param {boolean} [removeMode=false] - 변환 후 원본 PDF 파일을 삭제할지 여부를 결정하는 옵션 (기본값: false)
 * @returns {Promise<Array<string>>} 변환된 JPG 파일들의 경로를 담은 배열을 반환합니다.
 */
ImageReader.prototype.pdfToJpg = function (filePath, removeMode = false) {
  // filePath가 문자열인지 확인합니다. 문자열이 아닐 경우 오류를 발생시킵니다.
  if (typeof filePath !== "string") {
    throw new Error("invaild input");
  }
  
  // filePath가 절대 경로인지 확인합니다. 절대 경로가 아닐 경우 오류를 발생시킵니다.
  if (!/^\//.test(filePath)) {
    throw new Error("must be absolute path");
  }
  
  // Node.js의 child_process 모듈에서 spawn 함수를 가져옵니다. spawn은 시스템 명령어를 실행할 때 사용됩니다.
  const { spawn } = require("child_process");
  
  // PDF 파일을 변환할 때 사용할 해상도를 정의합니다. 기본값은 300dpi입니다.
  const RESOLUTION = 300;
  // PDF를 변환할 파일 형식을 정의합니다. 이 메서드에서는 JPEG 형식을 사용합니다.
  const FORMAT = "jpeg";
  // 변환된 파일의 번호를 표현할 자릿수를 정의합니다. 기본값은 4자리입니다.
  const DIGIT = 4;

  // filePath에서 파일 이름을 추출합니다.
  const fileName = filePath.split('/')[filePath.split('/').length - 1];
  // filePath에서 디렉토리 경로를 추출합니다.
  const fileDir = filePath.split('/').slice(0, -1).join('/');
  
  // 추출한 파일 이름이 PDF 파일인지 확인합니다. PDF 파일이 아닐 경우 오류를 발생시킵니다.
  if (!/\.pdf$/.test(fileName)) {
    throw new Error("must be pdf file");
  }
  
  // 파일 이름에서 확장자를 제거한 순수 파일 이름을 추출합니다.
  const filePureName = fileName.replace(/\.pdf$/i, '');
  // 변환될 JPG 파일의 경로를 정의합니다. 파일 이름 뒤에 4자리의 숫자가 추가됩니다.
  const targetJpg = fileDir + "/" + filePureName + "%0" + String(DIGIT) + "d.jpg";
  
  // PDF를 JPG로 변환하는 비동기 작업을 Promise로 감싸서 반환합니다.
  return new Promise((resolve, reject) => {
    // Ghostscript(gz) 명령을 사용하여 PDF를 JPG로 변환합니다. 
    // -dNOPAUSE: 각 페이지를 중단 없이 변환합니다.
    // -sDEVICE: 출력 형식을 지정합니다.
    // -r: 해상도를 지정합니다.
    // -sOutputFile: 출력 파일의 이름을 지정합니다.
    const gs = spawn("gs", [ `-dNOPAUSE`, `-sDEVICE=${FORMAT}`, `-r${String(RESOLUTION)}`, `-sOutputFile=${targetJpg}`, filePath ]);
    
    // 각 페이지 번호를 저장할 배열을 선언합니다.
    let arr, maxLength, results;
    arr = [];
    
    // Ghostscript의 표준 출력(stdout)을 처리합니다.
    gs.stdout.on("data", (data) => {
      // 출력 데이터가 페이지 정보일 경우, 해당 페이지 번호를 배열에 추가합니다.
      if (/^Page/i.test(String(data).trim())) {
        arr.push(Number(String(data).trim().replace(/[^0-9]/gi, '')));
      } 
      // 변환이 완료되면, 페이지 번호를 기준으로 정렬하고, 결과 파일 경로 배열을 생성합니다.
      else if (String(data).trim() === "GS>") {
        gs.kill();  // 변환 프로세스를 종료합니다.

        // 페이지 번호 배열을 내림차순으로 정렬합니다.
        arr.sort((a, b) => { return b - a; });
        // 최대 페이지 번호를 구합니다.
        maxLength = arr[0];
        // 결과 파일들의 경로를 저장할 배열을 선언합니다.
        results = [];
        
        // 각 페이지에 대해 결과 파일 경로를 생성합니다.
        for (let i = 0; i < maxLength; i++) {
          results.push(fileDir + "/" + filePureName + 
            (new Array(DIGIT - String(i + 1).length)).fill(0, 0).map((num) => { return String(num) }).join('') + 
            String(i + 1) + ".jpg");
        }

        // 원본 PDF 파일을 삭제하지 않는 경우, 결과 파일 경로 배열을 resolve합니다.
        if (!removeMode) {
          resolve(results);
        } 
        // 원본 PDF 파일을 삭제하는 경우, 파일을 삭제한 후 결과 파일 경로 배열을 resolve합니다.
        else {
          const rm = spawn("rm", [ `-rf`, filePath ]);
          rm.on("close", (code) => { resolve(results); });
        }
      } 
      // 변환 중 오류가 발생할 경우, 프로세스를 종료하고 파일을 삭제한 후 reject합니다.
      else if (/error occurred/gi.test(String(data)) || /Error\:/gi.test(String(data))) {
        gs.kill();
        const rm = spawn("rm", [ `-rf`, filePath ]);
        rm.on("close", (code) => { reject("pdf to jpg fail"); });
      }
    });
  });
}

/**
 * @method readImage
 * @description 이미지 파일을 읽어들여 정보를 추출하고, 옵션에 따라 JSON 파일로 저장하는 메서드입니다.
 * @param {string} filePath - 읽어들일 이미지 파일의 절대 경로
 * @param {boolean} [toJson=false] - 이미지 정보를 JSON 파일로 저장할지 여부를 결정하는 옵션 (기본값: false)
 * @returns {Promise<Object>} 이미지 정보 객체를 반환합니다.
 */
ImageReader.prototype.readImage = async function (filePath, toJson = false) {
  // 현재 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, uniqueValue, fileSystem } = this.mother;

  try {
    // filePath가 문자열인지 확인합니다. 문자열이 아닐 경우 오류를 발생시킵니다.
    if (typeof filePath !== "string") {
      throw new Error("invaild input");
    }

    // filePath가 절대 경로인지 확인합니다. 절대 경로가 아닐 경우 오류를 발생시킵니다.
    if (!/^\//.test(filePath)) {
      throw new Error("must be absolute path");
    }

    // filePath에서 파일 이름을 추출합니다.
    const fileName = filePath.split('/')[filePath.split('/').length - 1];

    // filePath에서 디렉토리 경로를 추출합니다.
    const fileDir = filePath.split('/').slice(0, -1).join('/');

    // 파일 이름에서 확장자를 제거한 순수 파일 이름을 추출합니다.
    const filePureName = fileName.split('.').slice(0, -1).join('.');

    // 파일 이름에서 확장자를 추출합니다.
    const fileExe = fileName.split('.')[fileName.split('.').length - 1];

    // 임시 JSON 파일을 저장할 디렉토리 경로를 설정합니다.
    const tempDir = process.cwd() + "/temp";

    // 임시 JSON 파일의 경로를 생성합니다. 이때 uniqueValue 메서드를 사용하여 고유한 파일 이름을 생성합니다.
    const tempJson = tempDir + "/" + uniqueValue("hex") + ".json";

    // 디렉토리 내용을 저장할 변수를 선언합니다.
    let thisDirContents;

    // shellExec 메서드를 사용하여 이미지의 방향을 자동으로 맞추고, 메타데이터를 제거합니다.
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, filePath ]);

    // 파일이 존재하는지 확인합니다.
    if (!(await fileSystem(`exist`, [ filePath ]))) {
      // 파일이 존재하지 않을 경우, 디렉토리 내용을 읽어옵니다.
      thisDirContents = await fileSystem(`readFolder`, [ fileDir ]);

      // 파일 이름 패턴에 맞는 파일만 필터링합니다.
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(filePureName + "-[0-9]+." + fileExe, "g")).test(str) });

      // mogrify에 실패하면 오류를 발생시킵니다.
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        // 첫 번째 파일을 원본 파일로 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(fileDir + "/" + thisDirContents[0])} ${shellLink(filePath)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(fileDir + "/" + str)}`);
        }
      }
    }

    // 이미지를 JSON 형식으로 변환하여 임시 파일에 저장합니다.
    await shellExec(`convert`, [ filePath, tempJson ]);

    // 변환 후 파일이 제대로 생성되었는지 확인합니다.
    if (!(await fileSystem(`exist`, [ filePath ]))) {
      // 파일이 존재하지 않을 경우, 디렉토리 내용을 읽어옵니다.
      thisDirContents = await fileSystem(`readFolder`, [ fileDir ]);

      // 파일 이름 패턴에 맞는 파일만 필터링합니다.
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(filePureName + "-[0-9]+." + fileExe, "g")).test(str) });

      // mogrify에 실패하면 오류를 발생시킵니다.
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        // 첫 번째 파일을 원본 파일로 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(fileDir + "/" + thisDirContents[0])} ${shellLink(filePath)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(fileDir + "/" + str)}`);
        }
      }
    }

    // 임시 JSON 파일에서 이미지 정보를 읽어옵니다.
    const [ { image } ] = await fileSystem(`readJson`, [ tempJson ]);

    // 불필요한 version 속성을 제거합니다.
    delete image.version;

    // baseName 속성을 name으로 변경합니다.
    image.name = image.baseName;
    delete image.baseName;

    // 이미지의 경로를 추가합니다.
    image.path = filePath;

    // 임시 JSON 파일을 삭제합니다.
    await shellExec(`rm`, [ `-rf`, tempJson ]);

    // toJson 옵션이 true이면, 이미지 정보를 JSON 파일로 저장합니다.
    if (toJson) {
      await fileSystem(`writeJson`, [ `${fileDir}/${filePureName}.json`, image ]);
    }

    // 이미지 정보를 반환합니다.
    return image;

  } catch (e) {
    // 오류가 발생하면 콘솔에 로그를 출력합니다.
    errorLogSync(e);
  }
}

/**
 * @method resizeImage
 * @description 이미지 파일을 주어진 너비와 높이로 리사이즈합니다. 원본 파일을 대체하거나 원본 파일을 유지할 수 있습니다.
 * @param {string} filePath - 리사이즈할 이미지 파일의 절대 경로
 * @param {number|string} [width=1500] - 리사이즈할 목표 너비 (픽셀), 또는 'auto'
 * @param {number|string} [height="auto"] - 리사이즈할 목표 높이 (픽셀), 또는 'auto'
 * @param {boolean} [original=false] - 원본 파일을 유지할지 여부를 결정하는 옵션 (기본값: false)
 * @returns {Promise<string|null>} 리사이즈된 이미지 파일의 경로를 반환하며, 실패 시 null을 반환합니다.
 */
ImageReader.prototype.resizeImage = async function (filePath, width = 1500, height = "auto", original = false) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // Mother 클래스의 메서드를 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, uniqueValue, fileSystem } = this.mother;

  try {
    // filePath가 문자열인지 확인합니다. 문자열이 아닐 경우 오류를 발생시킵니다.
    if (typeof filePath !== "string") {
      throw new Error("invaild input");
    }

    // filePath가 절대 경로인지 확인합니다. 절대 경로가 아닐 경우 오류를 발생시킵니다.
    if (!/^\//.test(filePath)) {
      throw new Error("must be absolute path");
    }

    // width가 null이거나 0일 경우, "auto"로 설정합니다.
    if (width === null || width === 0) {
      width = "auto";
    }

    // height가 null이거나 0일 경우, "auto"로 설정합니다.
    if (height === null || height === 0) {
      height = "auto";
    }

    // filePath에서 파일 이름을 추출합니다.
    const fileName = filePath.split('/')[filePath.split('/').length - 1];

    // filePath에서 디렉토리 경로를 추출합니다.
    const fileDir = filePath.split('/').slice(0, -1).join('/');

    // 파일 이름에서 확장자를 제거한 순수 파일 이름을 추출합니다.
    const filePureName = fileName.split('.').slice(0, -1).join('.');

    // 파일 이름에서 확장자를 추출합니다.
    const fileExe = fileName.split('.')[fileName.split('.').length - 1];

    // 임시 결과 파일을 저장할 디렉토리 경로를 설정합니다.
    const tempDir = process.cwd() + "/temp";

    // 임시 결과 파일의 이름을 생성합니다. 이때 uniqueValue 메서드를 사용하여 고유한 파일 이름을 생성합니다.
    const tempResultPureName = filePureName + "_" + uniqueValue("hex");

    // 임시 결과 파일의 전체 경로를 생성합니다.
    const tempResult = tempDir + "/" + tempResultPureName + "." + fileExe;

    // 디렉토리 내용을 저장할 변수를 선언합니다.
    let thisDirContents, inputDirContents;

    // shellExec 메서드를 사용하여 이미지의 방향을 자동으로 맞추고, 메타데이터를 제거합니다.
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, filePath ]);

    // 파일이 존재하는지 확인합니다.
    if (!(await fileSystem(`exist`, [ filePath ]))) {
      // 파일이 존재하지 않을 경우, 디렉토리 내용을 읽어옵니다.
      inputDirContents = await fileSystem(`readFolder`, [ fileDir ]);

      // 파일 이름 패턴에 맞는 파일만 필터링합니다.
      inputDirContents = inputDirContents.filter((str) => { return (new RegExp(filePureName + "-[0-9]+." + fileExe, "g")).test(str) });

      // mogrify에 실패하면 오류를 발생시킵니다.
      if (inputDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        // 첫 번째 파일을 원본 파일로 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(fileDir + "/" + inputDirContents[0])} ${shellLink(fileDir + "/" + filePureName + "." + fileExe)}`);
        for (let str of inputDirContents) {
          await shellExec(`rm -rf ${shellLink(fileDir + "/" + str)}`);
        }
      }
    }

    // 너비가 숫자이고 높이가 "auto"인 경우, 너비에 맞춰 리사이즈합니다.
    if (typeof width === "number" && height === "auto") {
      await shellExec(`convert`, [ filePath, "-resize", String(width) + "x", tempResult ]);
    }
    // 너비가 "auto"이고 높이가 숫자인 경우, 높이에 맞춰 리사이즈합니다.
    else if (width === "auto" && typeof height === "number") {
      await shellExec(`convert`, [ filePath, "-resize", "x" + String(height), tempResult ]);
    }
    // 너비와 높이가 모두 숫자인 경우, 주어진 크기로 리사이즈합니다.
    else if (typeof width === "number" && typeof height === "number") {
      await shellExec(`convert`, [ filePath, "-resize", String(width) + "x" + String(height), tempResult ]);
    }
    // 지원하지 않는 입력일 경우, 오류를 발생시킵니다.
    else {
      throw new Error("invalid input");
    }

    // 변환된 파일이 제대로 생성되었는지 확인합니다.
    if (!(await fileSystem(`exist`, [ tempResult ]))) {
      // 파일이 생성되지 않았을 경우, 임시 디렉토리 내용을 읽어옵니다.
      thisDirContents = await fileSystem(`readFolder`, [ tempDir ]);

      // 임시 파일 이름 패턴에 맞는 파일만 필터링합니다.
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(tempResultPureName + "-[0-9]+." + fileExe, "g")).test(str) });

      // 변환 실패 시 오류를 발생시킵니다.
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        // 첫 번째 파일을 변환 결과 파일로 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(tempDir + "/" + thisDirContents[0])} ${shellLink(tempResult)}`);
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(tempDir + "/" + str)}`);
        }
      }
    }

    // 최종 변환된 이미지의 방향을 자동으로 맞추고, 메타데이터를 제거합니다.
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, tempResult ]);

    // 최종 파일이 존재하는지 확인합니다.
    if (!(await fileSystem(`exist`, [ tempResult ]))) {
      // 파일이 존재하지 않을 경우, 임시 디렉토리 내용을 읽어옵니다.
      thisDirContents = await fileSystem(`readFolder`, [ tempDir ]);

      // 임시 파일 이름 패턴에 맞는 파일만 필터링합니다.
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(tempResultPureName + "-[0-9]+." + fileExe, "g")).test(str) });

      // mogrify에 실패하면 오류를 발생시킵니다.
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        // 첫 번째 파일을 변환 결과 파일로 이동시키고, 나머지 임시 파일들을 삭제합니다.
        await shellExec(`mv ${shellLink(tempDir + "/" + thisDirContents[0])} ${shellLink(tempResult)}`);
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(tempDir + "/" + str)}`);
        }
      }
    }

    // original 옵션이 true일 경우, 원본 파일을 "_original"로 이름을 변경하여 이동시킵니다.
    if (original) {
      await shellExec(`mv`, [ filePath, fileDir + "/" + filePureName + "_original" + "." + fileExe ]);
    }
    // original 옵션이 false일 경우, 원본 파일을 삭제합니다.
    else {
      await shellExec(`rm`, [ `-rf`, filePath ]);
    }

    // 변환된 파일을 원본 경로로 이동시킵니다.
    await shellExec(`mv`, [ tempResult, filePath ]);

    // 최종적으로 리사이즈된 파일의 경로를 반환합니다.
    return filePath;
  } catch (e) {
    // 오류가 발생하면 콘솔에 로그를 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * @method recursivePdfConvert
 * @description 지정된 폴더 내의 모든 PDF 파일을 찾아 JPG 파일로 변환하는 메서드입니다. 변환된 PDF 파일은 삭제됩니다.
 * @param {string} folderPath - PDF 파일을 검색할 폴더의 절대 경로
 * @returns {Promise<Array<string>>} 변환된 PDF 파일들의 경로를 담은 배열을 반환합니다.
 */
ImageReader.prototype.recursivePdfConvert = async function (folderPath) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // Mother 클래스의 shellExec, shellLink 메서드를 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink } = this.mother;

  try {
    // folderPath가 문자열인지 확인합니다. 문자열이 아닐 경우 오류를 발생시킵니다.
    if (typeof folderPath !== "string") {
      throw new Error("invaild input");
    }

    // folderPath가 절대 경로인지 확인합니다. 절대 경로가 아닐 경우 오류를 발생시킵니다.
    if (!/^\//.test(folderPath)) {
      throw new Error("must be absolute path");
    }

    // 폴더 내의 PDF 파일 경로들을 저장할 배열을 선언합니다.
    let stdoutArr, targets;

    // shellExec 메서드를 사용하여 폴더 내의 모든 PDF 파일을 찾습니다.
    // `find` 명령어는 폴더를 재귀적으로 탐색하여 .pdf 확장자를 가진 파일을 찾습니다.
    stdoutArr = (await shellExec(`find`, [ folderPath, `-name`, `*.pdf` ])).split("\n");

    // 찾은 경로 중에서 문자열로 시작하고, 절대 경로 형식인 파일들만 필터링합니다.
    targets = stdoutArr.filter((str) => { return (typeof str === "string" && /^\//.test(str)) });

    // 필터링된 PDF 파일들의 경로를 콘솔에 출력합니다.
    console.log(targets);

    // 필터링된 각 PDF 파일 경로에 대해 JPG로 변환을 수행합니다.
    for (let path of targets) {
      // pdfToJpg 메서드를 호출하여 PDF 파일을 JPG로 변환합니다. 변환 후 원본 PDF 파일은 삭제됩니다.
      await this.pdfToJpg(path, true);

      // 변환이 완료된 파일 경로를 콘솔에 출력합니다.
      console.log(`${path} to jpg done`);
    }

    // 변환된 파일들의 경로 배열을 반환합니다.
    return targets;

  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 내용을 출력합니다.
    errorLogSync(e);
  }
}

/**
 * @method toOfficialImage
 * @description 주어진 이미지를 지정된 크기에 맞춰 공식 이미지로 변환하는 메서드입니다. 가로 또는 세로 비율에 따라 이미지를 리사이즈하고 크롭하여 원하는 크기로 만듭니다.
 * @param {string} targetImage - 변환할 이미지 파일의 경로
 * @param {number} [type=3508] - 공식 이미지로 변환할 크기 타입 (기본값: 3508)
 * @returns {Promise<Object|null>} 변환된 이미지의 경로와 원본 경로를 포함한 객체를 반환하며, 실패 시 null을 반환합니다.
 */
ImageReader.prototype.toOfficialImage = async function (targetImage, type = 3508) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // this에서 tempDir과 officialSize 속성을 구조 분해 할당으로 가져옵니다.
  const { tempDir: tempFolder, officialSize: size } = this;

  // 중간 결과 파일과 최종 결과 파일의 접두사 및 파일 관련 상수들을 선언합니다.
  const middleConst = "tempResult_";  // 중간 결과 파일의 접두사
  const resultConst = "convertResult_";  // 최종 결과 파일의 접두사
  const typeConst = "s";  // 크기 타입의 접두사
  const exe = "jpg";  // 파일 확장자
  const qualityConst = 95;  // 변환된 이미지의 품질 설정

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;

  try {
    // 필요한 변수들을 선언합니다.
    let targetInfo;  // 원본 이미지의 정보
    let gs;  // 이미지의 가로/세로 방향을 저장할 변수
    let width, height;  // 원본 이미지의 너비와 높이
    let sampleWidth0, sampleHeight0;  // 샘플 크기 계산을 위한 변수들
    let sampleWidth1, sampleHeight1;
    let targetWidth, targetHeight;  // 최종 리사이즈할 목표 너비와 높이
    let middleTarget;  // 중간 결과 파일의 경로
    let middleInfo;  // 중간 결과 파일의 정보
    let middleWidth, middleHeight;  // 중간 결과 파일의 너비와 높이
    let cropMatrix;  // 크롭할 영역의 매트릭스
    let moveX, moveY;  // 크롭할 때의 이동 좌표
    let typeKeywords;  // 크기 타입 키워드
    let resultTarget;  // 최종 결과 파일의 경로
    let resultObj;  // 결과 객체
    let tempObj;  // 임시 객체

    // 크기 타입 키워드를 설정합니다.
    typeKeywords = typeConst + String(type);

    // 주어진 타입이 공식 크기 목록에 있는지 확인합니다.
    if (size[typeKeywords] === undefined) {
      throw new Error("invalid type");  // 유효하지 않은 타입일 경우 오류를 발생시킵니다.
    }

    // 중간 결과 파일과 최종 결과 파일의 경로를 설정합니다.
    middleTarget = tempFolder + "/" + middleConst + uniqueValue("hex") + "." + exe;
    resultTarget = tempFolder + "/" + resultConst + uniqueValue("hex") + "." + exe;

    // 원본 이미지의 정보를 읽어옵니다.
    targetInfo = await this.readImage(targetImage);

    // 원본 이미지의 가로/세로 비율에 따라 gs 값을 설정합니다.
    if (targetInfo.geometry.width >= targetInfo.geometry.height) {
      gs = "garo";  // 가로 비율이 더 큰 경우
    } else if (targetInfo.geometry.width < targetInfo.geometry.height) {
      gs = "sero";  // 세로 비율이 더 큰 경우
    }

    // 가로 비율이 더 큰 경우
    if (gs === "garo") {

      // 원본 이미지의 너비와 높이를 설정합니다.
      width = targetInfo.geometry.width;
      height = targetInfo.geometry.height;

      // 주어진 크기에 맞춰 샘플 크기를 계산합니다.
      sampleWidth0 = Math.ceil(width * (size[typeKeywords][1] / width));
      sampleHeight0 = Math.ceil(height * (size[typeKeywords][1] / width));

      sampleWidth1 = Math.ceil(width * (size[typeKeywords][0] / height));
      sampleHeight1 = Math.ceil(height * (size[typeKeywords][0] / height));

      // 샘플 크기에 따라 최종 리사이즈할 크기를 결정합니다.
      if (Math.floor(sampleHeight0) >= size[typeKeywords][0] && Math.floor(sampleWidth0) >= size[typeKeywords][1]) {
        targetWidth = Math.ceil(sampleWidth0);
        targetHeight = Math.ceil(sampleHeight0);
      } else {
        targetWidth = Math.ceil(sampleWidth1);
        targetHeight = Math.ceil(sampleHeight1);
      }

      // 이미지 리사이즈 작업을 수행합니다.
      await this.convertImage({
        input: targetImage,
        width: targetWidth,
        height: targetHeight,
        quality: qualityConst,
        output: middleTarget,
        mode: "resize",
        size: size[typeKeywords],
      });

      // 중간 결과 파일의 정보를 읽어옵니다.
      middleInfo = await this.readImage(middleTarget);
      middleWidth = middleInfo.geometry.width;
      middleHeight = middleInfo.geometry.height;
      
      // 크롭할 때의 이동 좌표를 계산합니다.
      moveX = Math.floor((middleWidth - size[typeKeywords][1]) / 2);
      moveY = Math.floor((middleHeight - size[typeKeywords][0]) / 2);
      
      // 크롭 작업을 수행하여 최종 결과 파일을 생성합니다.
      await this.convertImage({
        input: middleTarget,
        width: size[typeKeywords][1],
        height: size[typeKeywords][0],
        x: moveX,
        y: moveY,
        quality: qualityConst,
        output: resultTarget,
        mode: "crop",
      });

    } 
    // 세로 비율이 더 큰 경우
    else if (gs === "sero") {

      // 원본 이미지의 너비와 높이를 설정합니다.
      width = targetInfo.geometry.width;
      height = targetInfo.geometry.height;

      // 주어진 크기에 맞춰 샘플 크기를 계산합니다.
      sampleWidth0 = Math.ceil(width * (size[typeKeywords][0] / width));
      sampleHeight0 = Math.ceil(height * (size[typeKeywords][0] / width));

      sampleWidth1 = Math.ceil(width * (size[typeKeywords][1] / height));
      sampleHeight1 = Math.ceil(height * (size[typeKeywords][1] / height));

      // 샘플 크기에 따라 최종 리사이즈할 크기를 결정합니다.
      if (Math.floor(sampleWidth0) >= size[typeKeywords][0] && Math.floor(sampleHeight0) >= size[typeKeywords][1]) {
        targetWidth = Math.ceil(sampleWidth0);
        targetHeight = Math.ceil(sampleHeight0);
      } else {
        targetWidth = Math.ceil(sampleWidth1);
        targetHeight = Math.ceil(sampleHeight1);
      }

      // 이미지 리사이즈 작업을 수행합니다.
      await this.convertImage({
        input: targetImage,
        width: targetWidth,
        height: targetHeight,
        quality: qualityConst,
        output: middleTarget,
        mode: "resize",
        size: size[typeKeywords],
      });

      // 중간 결과 파일의 정보를 읽어옵니다.
      middleInfo = await this.readImage(middleTarget);
      middleWidth = middleInfo.geometry.width;
      middleHeight = middleInfo.geometry.height;
      
      // 크롭할 때의 이동 좌표를 계산합니다.
      moveX = Math.floor((middleWidth - size[typeKeywords][0]) / 2);
      moveY = Math.floor((middleHeight - size[typeKeywords][1]) / 2);
      
      // 크롭 작업을 수행하여 최종 결과 파일을 생성합니다.
      await this.convertImage({
        input: middleTarget,
        width: size[typeKeywords][0],
        height: size[typeKeywords][1],
        x: moveX,
        y: moveY,
        quality: qualityConst,
        output: resultTarget,
        mode: "crop",
      });

    }

    // 중간 결과 파일을 삭제합니다.
    await shellExec(`rm`, [ `-rf`, middleTarget ]);

    // 결과 객체를 생성하여 원본 이미지와 최종 변환된 이미지를 포함합니다.
    resultObj = {
      original: targetImage,
      output: resultTarget,
    };

    // 변환이 완료된 파일 경로를 콘솔에 출력합니다.
    console.log("converting success => " + resultObj.output);

    // 최종 결과 객체를 반환합니다.
    return resultObj;

  } catch (e) {
    // 오류가 발생하면 콘솔에 로그를 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * @method overOfficialImage
 * @description 주어진 이미지를 지정된 크기의 공식 이미지로 변환하고, 원본 이미지를 대체합니다. 변환된 이미지는 JPG 형식으로 저장됩니다.
 * @param {string} targetImage - 변환할 이미지 파일의 경로
 * @param {number} [type=3508] - 공식 이미지로 변환할 크기 타입 (기본값: 3508)
 * @returns {Promise<Object|null>} 변환이 성공하면 완료 메시지를 포함한 객체를 반환하며, 실패 시 null을 반환합니다.
 */
ImageReader.prototype.overOfficialImage = async function (targetImage, type = 3508) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // this에서 tempDir과 officialSize 속성을 구조 분해 할당으로 가져옵니다.
  const { tempDir: tempFolder, officialSize: size } = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;

  try {
    // 임시 객체를 선언합니다. 이 객체는 변환된 이미지 정보를 담습니다.
    let tempObj;

    // 주어진 이미지를 공식 이미지로 변환하는 메서드를 호출합니다.
    tempObj = await this.toOfficialImage(targetImage, type);

    // 변환된 후 원본 이미지를 삭제합니다.
    await shellExec(`rm`, [ `-rf`, targetImage ]);

    // 변환된 이미지를 원본 이미지 경로로 이동시켜 원본을 대체합니다.
    await shellExec(`mv ${shellLink(tempObj.output)} ${shellLink(targetImage.split(".").slice(0, -1).join(".") + ".jpg")}`);

    // 작업이 완료되면 "done" 메시지를 반환합니다.
    return { message: "done" };

  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 내용을 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * @method createOfficialCanvas
 * @description 지정된 크기와 방향의 빈 캔버스를 생성하여 이미지 파일로 저장하는 메서드입니다. 기본 배경색은 rgba(254,255,255,1)로 설정됩니다.
 * @param {number} [type=3508] - 생성할 캔버스의 크기 타입 (기본값: 3508)
 * @param {string} [gs="garo"] - 캔버스의 방향 ("garo" 또는 "sero", 기본값: "garo")
 * @param {string} [exe="png"] - 생성할 이미지 파일의 확장자 (기본값: "png")
 * @returns {Promise<Object|null>} 생성된 이미지 파일의 경로를 포함한 객체를 반환하며, 실패 시 null을 반환합니다.
 */
ImageReader.prototype.createOfficialCanvas = async function (type = 3508, gs = "garo", exe = "png") {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // this에서 tempDir과 officialSize 속성을 구조 분해 할당으로 가져옵니다.
  const { tempDir: tempFolder, officialSize: size } = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;

  // 캔버스 크기와 관련된 상수들을 선언합니다.
  const typeConst = "s";  // 크기 타입 접두사
  const resultConst = "createResult_";  // 생성된 결과 파일의 접두사

  try {
    // 필요한 변수들을 선언합니다.
    let typeKeywords;  // 크기 타입 키워드
    let width, height;  // 캔버스의 너비와 높이

    // 크기 타입 키워드를 설정합니다.
    typeKeywords = typeConst + String(type);

    // 주어진 타입이 공식 크기 목록에 있는지 확인합니다.
    if (size[typeKeywords] === undefined) {
      throw new Error("invalid type");  // 유효하지 않은 타입일 경우 오류를 발생시킵니다.
    }

    // gs 값에 따라 가로 또는 세로 방향의 크기를 설정합니다.
    if (gs === "garo") {
      width = size[typeKeywords][1];  // 가로 방향일 경우 너비와 높이를 설정합니다.
      height = size[typeKeywords][0];
    } else {
      width = size[typeKeywords][0];  // 세로 방향일 경우 너비와 높이를 설정합니다.
      height = size[typeKeywords][1];
    }

    // 결과 파일의 경로를 생성합니다.
    resultTarget = tempFolder + "/" + resultConst + uniqueValue("hex") + "." + exe;

    // convert 명령어를 사용하여 지정된 크기의 빈 캔버스를 생성합니다. 기본 배경색은 rgba(254,255,255,1)입니다.
    await shellExec(`convert -size ${String(width)}x${String(height)} xc:rgba\$begin:math:text$254,255,255,1\\$end:math:text$ ${shellLink(resultTarget)}`);

    // mogrify 명령어를 사용하여 생성된 캔버스의 방향을 자동으로 맞추고, 메타데이터를 제거합니다.
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, resultTarget ]);

    // 생성된 이미지 파일의 경로를 반환합니다.
    return {
      output: resultTarget,
    };

  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 내용을 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * @method twoVerticalImages
 * @description 두 개의 이미지를 세로로 결합하여 하나의 이미지로 만드는 메서드입니다. 각 이미지는 지정된 공식 크기로 변환된 후, 하나의 캔버스에 합쳐집니다.
 * @param {Array<string>} arr - 결합할 두 이미지 파일의 경로를 담은 배열
 * @returns {Promise<Object|null>} 결합된 이미지 파일의 경로를 포함한 객체를 반환하며, 실패 시 null을 반환합니다.
 */
ImageReader.prototype.twoVerticalImages = async function (arr) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // this에서 tempDir과 officialSize 속성을 구조 분해 할당으로 가져옵니다.
  const { tempDir: tempFolder, officialSize: size } = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;

  // 중간 결과 파일과 최종 결과 파일의 접두사 및 파일 관련 상수들을 선언합니다.
  const verticalMiddleConst = "verticalMiddle_";  // 중간 결과 파일의 접두사
  const verticalResultConst = "verticalResult_";  // 최종 결과 파일의 접두사
  const exe = "png";  // 파일 확장자

  try {
    // 입력된 배열에서 두 개의 이미지 경로를 구조 분해 할당으로 가져옵니다.
    const [ target0, target1 ] = arr;

    // 중간 캔버스와 결과 파일의 경로를 저장할 변수를 선언합니다.
    let baseCanvas;
    let middleTarget, resultTarget;

    // 변환된 이미지의 경로를 저장할 변수를 선언합니다.
    let target0Converting;
    let target1Converting;

    // 첫 번째와 두 번째 이미지의 공식 크기 타입을 설정합니다.
    let officialType0, officialType1;

    // 공식 이미지 크기 타입을 설정합니다.
    officialType0 = 1500;  // 첫 번째 이미지를 위한 캔버스 크기
    officialType1 = 749;  // 두 번째 이미지를 위한 캔버스 크기

    // 중간 결과 파일과 최종 결과 파일의 경로를 설정합니다.
    middleTarget = tempFolder + "/" + verticalMiddleConst + uniqueValue("hex") + "." + exe;
    resultTarget = tempFolder + "/" + verticalResultConst + uniqueValue("hex") + "." + exe;

    // 첫 번째 이미지를 공식 이미지 크기(749)로 변환합니다.
    target0Converting = (await this.toOfficialImage(target0, officialType1, false)).output;

    // 두 번째 이미지를 공식 이미지 크기(749)로 변환합니다.
    target1Converting = (await this.toOfficialImage(target1, officialType1, false)).output;

    // 첫 번째 이미지를 담을 베이스 캔버스를 생성합니다.
    baseCanvas = (await this.createOfficialCanvas(officialType0)).output;

    // 첫 번째 이미지를 캔버스에 합성하여 중간 결과를 생성합니다.
    await this.compositeImage({
      up: target0Converting,
      down: baseCanvas,
      output: middleTarget,
      x: 0,
      y: 0,
    });

    // 두 번째 이미지를 중간 결과에 합성하여 최종 결과를 생성합니다.
    await this.compositeImage({
      up: target1Converting,
      down: middleTarget,
      output: resultTarget,
      x: officialType0 - officialType1,
      y: 0,
    });

    // 임시 파일들을 삭제합니다.
    await shellExec(`rm`, [ `-rf`, target0Converting ]);
    await shellExec(`rm`, [ `-rf`, target1Converting ]);
    await shellExec(`rm`, [ `-rf`, middleTarget ]);
    await shellExec(`rm`, [ `-rf`, baseCanvas ]);

    // 최종 결과 파일의 경로를 반환합니다.
    return {
      output: resultTarget,
    };

  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 내용을 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * @method queryImage
 * @description 이미지의 가로와 세로 비율을 확인하여 해당 이미지가 가로(g), 세로(s), 혹은 정사각형(c)인지 반환하는 메서드입니다.
 * @param {string} image - 비율을 확인할 이미지 파일의 경로
 * @returns {Promise<string>} 'g' (가로), 's' (세로), 'c' (정사각형) 중 하나를 반환합니다.
 */
ImageReader.prototype.queryImage = async function (image) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { fileSystem, shellExec, shellLink } = this.mother;

  try {
    // 이미지의 너비와 높이를 가져오기 위해 `identify` 명령어를 실행합니다.
    const res = await shellExec(`identify -ping -format '%w %h' ${shellLink(image)}`);
    
    // 결과 문자열을 분리하여 너비와 높이를 숫자로 변환합니다.
    const [ width, height ] = res.trim().split(" ").map((str) => { return Number(str.trim()) });

    // 너비와 높이를 비교하여 가로, 세로, 정사각형 중 하나를 반환합니다.
    if (width > height) {
      return 'g';  // 가로 비율일 경우 'g' 반환
    } else if (width < height) {
      return 's';  // 세로 비율일 경우 's' 반환
    } else {
      return 'c';  // 정사각형일 경우 'c' 반환
    }
  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 내용을 출력합니다.
    errorLogSync(e);
  }
}

/**
 * @method queryImages
 * @description 이미지 배열에 있는 모든 이미지의 비율을 확인하고, 각 이미지의 비율 정보를 포함하는 객체 배열을 반환하는 메서드입니다.
 * @param {Array<string>} imageArr - 비율을 확인할 이미지 파일 경로들의 배열
 * @returns {Promise<GaroseroArray>} 각 이미지의 비율 정보를 포함한 GaroseroArray 객체를 반환합니다.
 */
ImageReader.prototype.queryImages = async function (imageArr) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { fileSystem, shellExec, shellLink } = this.mother;

  try {
    // 필요한 변수들을 선언합니다.
    let target, width, height, resultObj;
    let totalTong = new GaroseroArray();  // 이미지 비율 정보를 저장할 배열
    let number = 0;
    let res, tempArr;

    // 입력된 이미지 배열의 각 이미지에 대해 반복 작업을 수행합니다.
    for (let i of imageArr) {
      // `identify` 명령어를 사용하여 각 이미지의 너비와 높이를 가져옵니다.
      res = await shellExec(`identify -ping -format '%w %h' ${shellLink(i)}`);
      [ width, height ] = res.trim().split(" ").map((str) => { return Number(str.trim()) });

      // 너비와 높이를 비교하여 가로, 세로, 정사각형 중 하나를 결정하고, 이를 totalTong 배열에 추가합니다.
      if (width > height) {
        totalTong.push({ index: number, file: i, gs: 'g' });
      } else if (width < height) {
        totalTong.push({ index: number, file: i, gs: 's' });
      } else {
        totalTong.push({ index: number, file: i, gs: 'c' });
      }
      number++;  // 이미지의 인덱스를 증가시킵니다.
    }

    // 최종 결과인 GaroseroArray 객체를 반환합니다.
    return totalTong;
  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 내용을 출력합니다.
    errorLogSync(e);
  }
}

/**
 * @method queryDirectory
 * @description 주어진 디렉토리 내의 모든 이미지 파일의 비율을 확인하고, 정렬된 결과를 반환하는 메서드입니다.
 * @param {string} dir - 이미지 파일이 위치한 디렉토리 경로
 * @returns {Promise<GaroseroArray>} 디렉토리 내 이미지 파일들의 비율 정보를 포함한 GaroseroArray 객체를 반환합니다.
 */
ImageReader.prototype.queryDirectory = async function (dir) {
  // 인스턴스를 참조하기 위한 상수입니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { shell, shellLink, fileSystem, appleScript } = this.mother;

  try {
    // 필요한 변수들을 선언합니다.
    let tongRaw, tong, result;
    let numberBoo;
    let sortFunc;

    // 지정된 디렉토리의 파일 목록을 읽어옵니다.
    tongRaw = await fileSystem(`readDir`, [ dir ]);
    tong = [];
    numberBoo = [];

    // 디렉토리 내의 파일들을 필터링하여 유효한 파일 목록을 생성합니다.
    for (let i of tongRaw) {
      if (i !== `.DS_Store`) {  // .DS_Store 파일은 제외합니다.
        tong.push(dir + "/" + i);  // 파일 경로를 tong 배열에 추가합니다.
        if (/[0-9]/g.test(i)) {  // 파일 이름에 숫자가 포함된 경우
          numberBoo.push("number");
        } else {  // 파일 이름에 숫자가 포함되지 않은 경우
          numberBoo.push("string");
        }
      }
    }

    // 파일 이름에 숫자가 포함된 경우 숫자 기반으로 정렬합니다. 그렇지 않으면 문자열로 정렬합니다.
    if (numberBoo.includes("string")) {
      tong.sort();  // 문자열로 정렬
    } else {
      // 숫자 기반 정렬을 위한 함수입니다.
      sortFunc = (str) => {
        return Number(str.replace(/_[0-9][0-9][0-9][0-9][0-9][0-9]$/, '').replace(/[^0-9]/g, ''));
      }
      // 정렬 함수에 따라 파일을 정렬합니다.
      tong.sort((a, b) => { return sortFunc(a) - sortFunc(b); });
    }

    // 정렬된 파일 목록의 이미지 비율을 확인하고 결과를 반환합니다.
    result = await this.queryImages(tong);
    return result;
  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 내용을 출력합니다.
    errorLogSync(e);
  }
}

module.exports = ImageReader;
