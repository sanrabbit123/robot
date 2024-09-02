/**
 * GoogleDrive 클래스는 Google Drive API와 상호작용하기 위한 도구입니다.
 * 이 클래스는 주로 Mother 클래스의 유틸리티 메서드들을 사용하여 Google Drive API 호출을 처리합니다.
 * @class
 */
const GoogleDrive = function () {
  // 현재 작업 디렉토리에서 Mother 클래스 파일을 가져옵니다.
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  
  // Mother 클래스의 인스턴스를 생성하여 this.mother 속성에 할당합니다.
  // Mother 클래스는 MongoDB와의 연결 정보 및 기타 유틸리티 기능을 제공합니다.
  this.mother = new Mother();
  
  // Google API 관련 작업을 수행할 디렉토리 경로를 설정합니다.
  this.dir = process.cwd() + "/apps/googleAPIs";
  
  // 파이썬 앱의 경로를 설정합니다.
  this.pythonApp = this.dir + "/python/app.py";
  
  // 토큰이 저장될 디렉토리 경로를 설정합니다.
  this.tokenDir = this.dir + "/python/google/tokens";
}

/**
 * Google Drive API 클라이언트를 Node.js 환경에서 가져오는 메서드입니다.
 * 이 메서드는 인증 과정을 처리하고 Google Drive API 클라이언트를 반환합니다.
 * @returns {Promise<Object|null>} Google Drive API 클라이언트 객체 또는 null
 */
GoogleDrive.prototype.getClient_inNode = async function () {
  // 현재 인스턴스를 변수에 할당합니다.
  const instance = this;

  // Google API를 인증하기 위한 모듈을 가져옵니다.
  const { authenticate } = require("@google-cloud/local-auth");
  
  // Google API 클라이언트 라이브러리를 가져옵니다.
  const { google } = require("googleapis");

  // Mother 클래스에서 제공하는 파일 시스템 작업 유틸리티를 가져옵니다.
  const { fileSystem } = this.mother;

  // 토큰 디렉토리 경로를 가져옵니다.
  const { tokenDir } = this;

  try {
    // 클라이언트 시크릿 파일의 경로를 설정합니다.
    const credentials = `${tokenDir}/client_secrets.json`;

    // 드라이브 토큰 파일의 경로를 설정합니다.
    const driveToken = `${tokenDir}/driveToken.json`;

    // Google Drive API에 접근하기 위한 범위를 설정합니다.
    const scopes = [ "https://www.googleapis.com/auth/drive" ];

    /**
     * 기존에 저장된 자격 증명이 있는지 확인하고 있으면 로드하는 함수입니다.
     * @returns {Promise<Object|null>} 자격 증명 객체 또는 null
     */
    const loadSavedCredentialsIfExist = async function () {
      try {
        // 파일 시스템 유틸리티를 사용하여 JSON 형식의 드라이브 토큰 파일을 읽어옵니다.
        const credentials = await fileSystem(`readJson`, [ driveToken ]);
        
        // Google API 클라이언트에서 JSON을 사용하여 자격 증명 객체를 생성합니다.
        return google.auth.fromJSON(credentials);
      } catch (err) {
        // 에러 발생 시 null을 반환합니다.
        return null;
      }
    }

    /**
     * 새로 얻은 자격 증명을 저장하는 함수입니다.
     * @param {Object} client - 저장할 자격 증명 클라이언트 객체
     * @returns {Promise<void|null>} 성공 시에는 아무것도 반환하지 않으며, 실패 시 null을 반환합니다.
     */
    const saveCredentials = async function (client) {
      try {
        // 파일 시스템 유틸리티를 사용하여 클라이언트 시크릿 JSON 파일을 읽어옵니다.
        const keys = await fileSystem(`readJson`, [ credentials ]);
        
        // 클라이언트 시크릿 정보에서 설치형 또는 웹 애플리케이션용 키를 추출합니다.
        const key = keys.installed || keys.web;

        // 새로 인증된 사용자 자격 증명을 파일로 저장합니다.
        await fileSystem(`writeJson`, [ driveToken, {
          type: "authorized_user",
          client_id: key.client_id,
          client_secret: key.client_secret,
          refresh_token: client.credentials.refresh_token,
        } ]);
      } catch (e) {
        // 에러 발생 시 null을 반환합니다.
        return null;
      }
    }

    /**
     * Google Drive API에 접근하기 위해 클라이언트를 인증하는 함수입니다.
     * @returns {Promise<Object>} 인증된 Google API 클라이언트 객체
     */
    const authorize = async function () {
      let client;

      // 기존 자격 증명이 있으면 로드합니다.
      client = await loadSavedCredentialsIfExist();
      
      // 기존 자격 증명이 있다면 그 클라이언트를 반환합니다.
      if (client) {
        return client;
      }

      // 기존 자격 증명이 없으면 새로운 인증을 수행합니다.
      client = await authenticate({
        scopes,  // 설정된 범위를 사용합니다.
        keyfilePath: credentials,  // 클라이언트 시크릿 파일 경로를 설정합니다.
      });

      // 새로운 자격 증명을 성공적으로 받았다면 이를 저장합니다.
      if (client.credentials) {
        await saveCredentials(client);
      }

      // 인증된 클라이언트를 반환합니다.
      return client;
    }

    // authorize 함수를 호출하여 인증된 Google API 클라이언트를 얻습니다.
    const authClient = await authorize();

    // Google Drive API 클라이언트를 생성하고 반환합니다.
    const drive = google.drive({version: 'v3', auth: authClient});

    return drive;
  } catch (e) {
    // 인증 또는 클라이언트 생성 과정에서 오류가 발생하면 오류를 출력하고 null을 반환합니다.
    console.log(e);
    return null;
  }
}

/**
 * Google Drive에서 파일을 Python 스크립트를 사용하여 다운로드하는 메서드입니다.
 * 이 메서드는 Mother 클래스의 pythonExecute 메서드를 사용하여 Python 스크립트를 실행합니다.
 * @param {string} file_id - 다운로드할 파일의 ID
 * @param {string} target_folder - 파일을 저장할 대상 폴더 경로
 * @returns {Promise<string|null>} 파일 다운로드 결과를 반환하거나, 오류 발생 시 null을 반환합니다.
 */
GoogleDrive.prototype.get_file_inPython = async function (file_id, target_folder) {
  // 현재 인스턴스를 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 파이썬 스크립트 실행 유틸리티를 가져옵니다.
  const { pythonExecute } = this.mother;

  try {
    // pythonExecute 메서드를 사용하여 파이썬 스크립트를 실행하고 결과를 얻습니다.
    const res = await pythonExecute(instance.pythonApp, [ "drive", "downloadFile" ], { targetId: file_id, targetFolder: target_folder });

    // 실행 결과를 반환합니다.
    return res;
  } catch (e) {
    // 오류가 발생하면 오류 메시지를 출력합니다.
    console.log("error : " + e.message);
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 통해 Google Drive에서 특정 파일 또는 폴더의 정보를 가져옵니다.
 * @param {string} id - 정보를 가져올 대상의 ID
 * @returns {Promise<Object|null>} 대상의 정보를 담은 객체 또는 오류 발생 시 null
 */
GoogleDrive.prototype.get_targetInfo_inPython = async function (id) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 불러옴
  const { fileSystem, shellExec, shellLink, sleep, pythonExecute } = this.mother;

  try {
    // pythonExecute 메서드를 사용하여 Python 스크립트를 실행하고 대상의 정보를 가져옴
    const target_info = await pythonExecute(this.pythonApp, [ "drive", "getTargetAbsolute" ], { targetId: id });

    // 가져온 정보가 객체가 아니거나 null이면 오류를 발생시킴
    if (typeof target_info !== "object" || target_info === null) {
      throw new Error("invalid id");
    }

    // 대상이 폴더인지 여부를 확인하여 isFolder 속성에 저장
    target_info.isFolder = /google\-apps\.folder/gi.test(target_info.mimeType);

    // 대상의 정보를 반환
    return target_info;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 통해 Google Drive에서 특정 폴더를 다운로드하고 처리합니다.
 * @param {string} folder_id - 다운로드할 폴더의 ID
 * @param {string|null} folder_name - 저장할 폴더의 이름, 기본값은 null
 * @param {boolean} is_photo - 폴더 내 사진 파일을 처리할지 여부, 기본값은 false
 * @returns {Promise<string|null>} 다운로드된 폴더 경로 또는 오류 발생 시 null
 */
GoogleDrive.prototype.get_folder_inPython = async function (folder_id, folder_name = null, is_photo = false) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 불러옴
  const { fileSystem, shellExec, shellLink, sleep, pythonExecute } = this.mother;

  // 파일을 저장하는 내부 함수
  const fileSave = async function (file_id, file_name, target_folder) {
    try {
      // Python 스크립트를 실행하여 파일을 다운로드
      const res = await pythonExecute(instance.pythonApp, [ "drive", "downloadFile" ], { targetId: file_id, targetFolder: target_folder });

      // 500밀리초 대기
      await sleep(500);

      // 다운로드 결과 반환
      return res;
    } catch (e) {
      // 오류 발생 시 파일 이름과 오류 메시지를 출력
      console.log(file_name, "error : " + e.message);
    }
  }

  // folder_id가 URL이거나 Google 관련 식별자인지 확인하여 ID로 변환
  if (/^http/.test(folder_id) || /google/gi.test(folder_id)) {
    folder_id = this.parsingId(folder_id);
  }

  try {
    // Python 스크립트를 실행하여 폴더의 정보를 가져옴
    const folder_info = await pythonExecute(this.pythonApp, [ "drive", "getTargetInfo" ], { targetId: folder_id });

    // 폴더 이름을 가져옴
    const folderName = folder_info.name;

    // Python 스크립트를 실행하여 폴더 내 파일 목록을 가져옴
    const files = await pythonExecute(this.pythonApp, [ "drive", "readFolderFiles" ], { targetId: folder_id });

    // 다운로드 경로와 임시 폴더 경로를 설정
    const targetFolderNameConst = "drive";
    const tempFolder = process.cwd() + "/temp";

    // 임시 폴더의 디렉토리 목록을 읽어옴
    const tempFolderDir = await fileSystem(`readDir`, [ tempFolder ]);

    // 폴더 경로를 설정하고 특수 문자를 '_'로 대체
    const folderPath = tempFolder + "/" + targetFolderNameConst + "/" + folderName.replace(/[\\\/\&\= ]/g, '_');

    let driveFolderDir, index;
    let folderInside;
    let thisExec;
    let tempArr, motherPath, length;
    let tempObj;
    let errorSafeNum;

    // 초기 설정: targetFolderNameConst 폴더가 없으면 생성
    if (!tempFolderDir.includes(targetFolderNameConst)) {
      await shellExec(`mkdir ${shellLink(tempFolder + "/" + targetFolderNameConst)}`);
    }

    // drive 폴더 내 기존 내용을 삭제
    driveFolderDir = await fileSystem(`readDir`, [ tempFolder + "/" + targetFolderNameConst ]);
    for (let i of driveFolderDir) {
      await shellExec(`rm -rf ${shellLink(tempFolder + "/" + targetFolderNameConst + "/" + i)}`);
    }

    // 새로운 폴더를 임시 폴더 내에 생성
    await shellExec(`mkdir ${shellLink(folderPath)}`);

    // 파일 다운로드 시작
    console.log(files);
    index = 0;
    for (let { id, name } of files) {
      // 각 파일을 다운로드하며 100밀리초 대기
      await sleep(100);

      // 파일을 저장하고 그 결과를 tempObj에 저장
      tempObj = await fileSave(id, name, folderPath);

      // 오류 안전 카운터 초기화
      errorSafeNum = 0;

      // 파일이 정상적으로 다운로드되지 않은 경우 재시도
      while (typeof tempObj !== "object" || tempObj === null || tempObj === undefined || typeof tempObj === "string") {
        if (errorSafeNum > 10) {
          break;
        }
        console.log("error => ", id, index);
        await sleep(100);
        tempObj = await fileSave(id, name, folderPath);
        errorSafeNum++;
      }

      // 다운로드된 파일이 .DS_Store 파일이면 삭제
      if (tempObj.name === ".DS_Store") {
        await shellExec("rm", [ `-rf`, `${folderPath}/.DS_Store` ]);
      } else {
        // 성공적으로 다운로드된 파일을 로그로 출력
        console.log(index, "success", tempObj);
      }

      // 인덱스를 증가
      index = index + 1;
    }

    // 사진 파일 처리
    if (is_photo) {
      folderInside = await fileSystem(`readFolder`, [ folderPath ]);
      for (let i = 0; i < folderInside.length; i++) {
        if (/\.(jpg|jpeg)$/i.test(folderInside[i])) {
          thisExec = ".jpg";
        } else if (/\.(png)$/i.test(folderInside[i])) {
          thisExec = ".png";
        } else {
          console.log(`remove ${shellLink(folderPath + "/" + folderInside[i])}`);
          await shellExec(`rm -rf ${shellLink(folderPath + "/" + folderInside[i])}`);
        }
        await shellExec(`mv ${shellLink(folderPath + "/" + folderInside[i])} ${shellLink(folderPath)}/pictureFromDrive${String(i + 1)}${thisExec}`);
      }
    }

    // 폴더 경로를 분리하여 배열로 저장
    tempArr = folderPath.split("/");

    // motherPath 초기화
    motherPath = '';

    // 경로 길이를 계산
    length = (tempArr[tempArr.length - 1] === '' ? tempArr.length - 2 : tempArr.length - 1);

    // 경로를 재구성하여 motherPath에 저장
    for (let i = 0; i < length; i++) {
      motherPath += tempArr[i];
      motherPath += '/';
    }
    motherPath = motherPath.slice(0, -1);

    // folder_name이 주어졌다면 폴더 이름을 변경
    if (folder_name !== null) {
      if (shellLink(folderPath) !== shellLink(motherPath + "/" + folder_name)) {
        await shellExec(`mv ${shellLink(folderPath)} ${shellLink(motherPath)}/${shellLink(folder_name)}`);
      }
    }

    // 전체 파일 수를 로그로 출력
    console.log(`total: ${String(index)}`);

    // 폴더 이름이 주어졌다면 새로운 폴더 경로를 반환, 그렇지 않다면 기존 경로 반환
    if (folder_name !== null) {
      return `${motherPath}/${folder_name}`;
    } else {
      return folderPath;
    }

  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력
    console.log(e);
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 Google Drive에서 파일 또는 폴더의 ID를 검색합니다.
 * @param {string} name - 검색할 대상의 이름
 * @returns {Promise<string|null>} 검색된 대상의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.searchId_inPython = async function (name) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 대상의 ID를 검색
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "searchId" ], { name });

    // 검색된 결과의 ID를 반환
    return result.id;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 특정 부모 폴더 내에서 폴더의 ID를 검색합니다.
 * @param {string} name - 검색할 폴더의 이름
 * @param {string} parentId - 부모 폴더의 ID
 * @returns {Promise<string|null>} 검색된 폴더의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.searchFolderId_inPython = async function (name, parentId) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 부모 폴더 내에서 폴더의 ID를 검색
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "searchFolderId" ], { name, parentId });

    // 검색된 결과의 ID를 반환
    return result.id;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 특정 부모 폴더 내에서 파일의 ID를 검색합니다.
 * @param {string} name - 검색할 파일의 이름
 * @param {string} parentId - 부모 폴더의 ID
 * @returns {Promise<string|null>} 검색된 파일의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.searchFileId_inPython = async function (name, parentId) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 부모 폴더 내에서 파일의 ID를 검색
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "searchFileId" ], { name, parentId });

    // 검색된 결과의 ID를 반환
    return result.id;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 Google Drive에 파일을 업로드합니다.
 * @param {string} folder_id - 파일을 업로드할 폴더의 ID
 * @param {string} file - 업로드할 파일의 경로
 * @returns {Promise<string|null>} 업로드된 파일의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.upload_inPython = async function (folder_id, file) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 파일을 업로드하고 결과를 저장
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "fileUpload" ], { folder_id, file });

    // 업로드된 결과가 객체이며 ID가 정의되어 있으면 그 ID를 반환
    if (typeof result === "object" && result.id !== undefined) {
      return result.id;
    } else {
      // 그렇지 않다면 오류를 발생시킴
      throw new Error(result);
    }
  } catch (e) {
    // Python 업로드 중 오류가 발생하면 오류 메시지를 출력
    console.log(e);

    try {
      // Node.js 환경에서 파일 업로드를 시도
      const id = await this.upload_inNode(folder_id, file);

      // 업로드 결과가 문자열이 아니면 오류를 발생시킴
      if (typeof id !== "string") {
        throw new Error("upload fail");
      }

      // 업로드된 파일의 ID를 반환
      return id;
    } catch (e) {
      // Node.js 업로드 중 오류가 발생하면 오류 메시지를 출력하고 null을 반환
      console.log(e);
      return null;
    }
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Node.js 환경에서 Google Drive에 파일을 업로드합니다.
 * @param {string} folder_id - 파일을 업로드할 폴더의 ID
 * @param {string} file - 업로드할 파일의 경로
 * @returns {Promise<string|null>} 업로드된 파일의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.upload_inNode = async function (folder_id, file) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스에서 제공하는 파일 시스템 유틸리티를 가져옴
  const { fileSystem } = this.mother;

  try {
    // Google Drive API 클라이언트를 가져옴
    const drive = await this.getClient_inNode();

    let fileArr; // 파일 경로를 분할한 배열을 저장할 변수
    let metaData; // 파일의 메타데이터를 저장할 변수
    let fileStream; // 파일 스트림을 저장할 변수
    let media; // 파일의 미디어 객체를 저장할 변수

    // 파일 경로를 '/'로 분할하여 파일명 추출
    fileArr = file.split("/");

    // 파일의 메타데이터를 설정, 파일명과 폴더 ID를 포함
    metaData = {
      name: fileArr[fileArr.length - 1], // 파일명 설정
      fields: folder_id // 폴더 ID 설정
    };

    // 파일 시스템 유틸리티를 사용하여 파일 스트림을 생성
    fileStream = await fileSystem(`readStream`, [ file ]);

    // 미디어 객체 생성, 파일 스트림을 body로 설정
    media = { body: fileStream };

    // Google Drive에 파일을 생성하고 업로드, 결과를 result에 저장
    const result = await drive.files.create({
      requestBody: metaData, // 요청 본문에 메타데이터 포함
      media, // 업로드할 미디어 포함
    });

    // 업로드 결과를 콘솔에 출력
    console.log(result);

    // 업로드된 파일의 ID를 반환
    return result.data.id;

  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 Google Drive에서 파일 또는 폴더를 삭제합니다.
 * @param {string} id - 삭제할 대상의 ID
 * @returns {Promise<string|null>} 삭제된 대상의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.delete_inPython = async function (id) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 파일 또는 폴더를 삭제하고 결과를 저장
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "delete" ], { targetId: this.parsingId(id) });

    // 삭제된 대상의 ID를 반환
    return result.id;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 Google Drive에 폴더를 생성합니다.
 * @param {string} folderName - 생성할 폴더의 이름
 * @returns {Promise<string|null>} 생성된 폴더의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.makeFolder_inPython = async function (folderName) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 폴더를 생성하고 결과를 저장
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "makeFolder" ], { folderName });

    // 생성된 폴더의 ID를 반환
    return result.id;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 Google Drive에서 폴더를 다른 위치로 이동시킵니다.
 * @param {string} targetId - 이동할 폴더의 ID
 * @param {string} parent - 새 부모 폴더의 ID
 * @returns {Promise<string|null>} 이동 성공 메시지 또는 오류 발생 시 null
 */
GoogleDrive.prototype.moveFolder_inPython = async function (targetId, parent) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 폴더를 이동시키고 결과를 저장
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "moveFolder" ], { targetId, parent });

    // 이동 성공 메시지를 반환
    return result.message;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, 폴더를 생성한 후 해당 폴더를 지정된 부모 폴더로 이동시킵니다.
 * @param {string} folderName - 생성할 폴더의 이름
 * @param {string} parent - 새 부모 폴더의 ID
 * @returns {Promise<string|null>} 생성된 폴더의 ID 또는 오류 발생 시 null
 */
GoogleDrive.prototype.makeFolder_andMove_inPython = async function (folderName, parent) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  try {
    // makeFolder_inPython 메서드를 호출하여 폴더를 생성하고 그 ID를 저장
    let id = await this.makeFolder_inPython(folderName);

    // moveFolder_inPython 메서드를 호출하여 생성된 폴더를 지정된 부모 폴더로 이동
    await this.moveFolder_inPython(id, parent);

    // 생성된 폴더의 ID를 반환
    return id;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 Google Drive 파일의 웹 보기 링크를 가져옵니다.
 * @param {string} targetId - 웹 보기 링크를 가져올 대상의 ID
 * @returns {Promise<string|null>} 웹 보기 링크 또는 오류 발생 시 null
 */
GoogleDrive.prototype.read_webView_inPython = async function (targetId) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 파일에 대한 공개 권한을 설정하고 결과를 저장
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "permissionsOn" ], { targetId });

    // 결과 문자열에서 JSON 객체를 추출하여 파싱
    let resultObj = JSON.parse(result.slice(/\{/.exec(result).index, /\}/.exec(result).index + 1));

    // 파싱된 객체에서 웹 보기 링크를 반환
    return resultObj.link;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 Google Drive 파일을 웹에 게시합니다.
 * @param {string} targetId - 웹에 게시할 대상의 ID
 * @returns {Promise<string|null>} 게시된 파일의 웹 링크 또는 오류 발생 시 null
 */
GoogleDrive.prototype.webPublish_inPython = async function (targetId) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 파일을 웹에 게시하고 결과를 저장
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "webPublish" ], { targetId });

    // 게시된 파일의 웹 링크를 반환
    return result.link;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e.message);
    return null;
  }
}

/**
 * GoogleDrive 클래스의 메서드로, Google Drive 링크에서 파일 또는 폴더의 ID를 추출합니다.
 * @param {string} link - Google Drive 링크
 * @returns {string} 추출된 ID
 */
GoogleDrive.prototype.parsingId = function (link) {
  let linkArr, target;

  // 링크가 HTTP로 시작하는지 확인
  if (/^http/i.test(link)) {
    // 링크를 '?'로 분리한 후 '/'로 분할하여 배열로 변환
    linkArr = (link.split('?'))[0].split('/');

    // 배열의 각 요소를 순회하며 특정 패턴에 맞지 않는 요소 중 ID로 추정되는 값을 찾음
    for (let i of linkArr) {
      if (!/docs/gi.test(i) && !/document/gi.test(i) && !/spreadsheets/gi.test(i) && !/drive/gi.test(i) && !/google/gi.test(i) && !/file/gi.test(i) && !/folders/gi.test(i) && !/view/gi.test(i)) {
        if (i.length > 12) {
          // 길이가 12자 이상인 경우 ID로 간주하여 target 변수에 저장
          target = i;
        }
      }
    }
  } else {
    // 링크가 HTTP로 시작하지 않는 경우, 링크 자체를 ID로 간주
    target = link;
  }

  // 추출된 ID를 반환
  return target;
}

/**
 * GoogleDrive 클래스의 메서드로, Python 스크립트를 사용하여 특정 폴더 내의 파일 목록을 가져옵니다.
 * @param {string} folder_id - 파일 목록을 가져올 폴더의 ID
 * @returns {Promise<Array|null>} 폴더 내의 파일 목록 또는 오류 발생 시 null
 */
GoogleDrive.prototype.listFiles_inPython = async function (folder_id) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스에서 제공하는 여러 유틸리티 메서드를 불러옴
  const { fileSystem, shellExec, shellLink, sleep, pythonExecute } = this.mother;

  // folder_id가 링크인지 여부를 확인하고, 링크라면 ID를 추출
  if (/^http/.test(folder_id) || /google/gi.test(folder_id)) {
    folder_id = this.parsingId(folder_id);
  }

  try {
    // Python 스크립트를 실행하여 폴더 내 파일 목록을 가져오고 결과를 저장
    const files = await pythonExecute(this.pythonApp, [ "drive", "readFolderFiles" ], { targetId: folder_id });

    // 파일 목록을 반환
    return files;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

module.exports = GoogleDrive;
