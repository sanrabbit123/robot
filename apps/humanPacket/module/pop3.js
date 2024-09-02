const net = require("net"); // 기본 TCP 네트워킹을 위한 Node.js 내장 모듈을 가져옵니다.
const tls = require("tls"); // TLS(Transport Layer Security)를 위한 Node.js 내장 모듈을 가져옵니다.
const util = require("util"); // 유틸리티 함수들을 제공하는 Node.js 내장 모듈을 가져옵니다.
const crypto = require("crypto"); // 암호화 관련 기능을 제공하는 Node.js 내장 모듈을 가져옵니다.
const events = require("events"); // 이벤트를 관리하는 Node.js 내장 모듈을 가져옵니다.

/**
 * Pop3Client 클래스는 POP3 이메일 서버와의 통신을 관리합니다.
 * @class
 * @param {number} port - POP3 서버의 포트 번호입니다.
 * @param {string} host - POP3 서버의 호스트 주소입니다.
 * @param {object} [options={}] - 연결 설정 옵션을 담은 객체입니다.
 */
const Pop3Client = function (port, host, options = {}) {

  // 옵션으로 받은 TLS 사용 여부 설정을 가져오거나 기본값(false)을 사용합니다.
  let enabletls = options.enabletls !== undefined ? options.enabletls : false;
  // TLS 인증 오류 무시 여부 설정을 가져오거나 기본값(false)을 사용합니다.
  let ignoretlserrs = options.ignoretlserrs !== undefined ? options.ignoretlserrs : false;
  // 디버그 모드 여부 설정을 가져오거나 기본값(false)을 사용합니다.
  let debug = options.debug || false;

  // TLS 직접 옵션 설정을 가져오거나 빈 객체를 사용합니다.
  let tlsDirectOpts = options.tlsopts !== undefined ? options.tlsopts : {};

  // 클래스 내부에서 사용될 변수들을 정의합니다.
  let self = this; // 현재 객체를 참조하기 위해 this를 self에 할당합니다.
  let response = null; // 서버의 응답을 저장할 변수입니다.
  let checkResp = true; // 응답 확인 플래그입니다.
  let bufferedData = ""; // 서버로부터 받은 데이터를 버퍼링하기 위한 변수입니다.
  let state = 0; // 클라이언트의 현재 상태를 나타냅니다.
  let locked = false; // 클라이언트가 잠긴 상태인지를 나타내는 플래그입니다.
  let multiline = false; // 다중 라인 응답을 처리할지 여부를 나타냅니다.
  let socket = null; // 서버와의 TCP 연결 소켓을 저장하는 변수입니다.
  let tlssock = null; // TLS 연결 소켓을 저장하는 변수입니다.

  // 서버 응답에 대한 콜백 함수입니다. 초기에는 연결 이벤트를 처리합니다.
  let callback = (resp, data) => {

    // 서버 응답이 실패했을 경우
    if (resp === false) {

      locked = false; // 클라이언트 잠금 해제
      callback = function() {}; // 콜백 초기화
      self.emit("connect", false, data); // 연결 실패 이벤트 발생

    } else {

      let banner = data.trim(); // 서버로부터 받은 배너 메시지의 앞뒤 공백을 제거합니다.
      let bannerComponents = banner.split(" "); // 배너 메시지를 공백으로 분리합니다.

      // APOP 인증을 지원하는지 확인합니다.
      for (let i = 0; i < bannerComponents.length; i++) {
        if (bannerComponents[i].indexOf("@") > 0) {
          self.data["apop"] = true; // APOP 지원 플래그 설정
          self.data["apop-timestamp"] = bannerComponents[i]; // APOP 타임스탬프 저장
          break;
        }
      }

      state = 1; // 클라이언트 상태를 1로 설정 (연결 성공 상태)
      self.data["banner"] = banner; // 배너 메시지를 데이터에 저장합니다.
      self.emit("connect", true, data); // 연결 성공 이벤트 발생

    }
  };

  // 클라이언트의 연결 정보 및 상태를 저장하는 객체입니다.
  this.data = {
    host: host, // 서버 호스트 주소
    port: port, // 서버 포트 번호
    banner: "", // 서버 배너 메시지
    stls: false, // STLS(STARTTLS) 사용 여부
    apop: false, // APOP 인증 사용 여부
    username: "", // 사용자 이름
    tls: enabletls, // TLS 사용 여부
    ignoretlserrs: ignoretlserrs // TLS 인증 오류 무시 여부
  };

  // 특권 메서드(클래스 내에서만 접근 가능한 메서드) 정의
  this.setCallback = function(cb) { callback = cb; }; // 콜백 함수를 설정합니다.
  this.getCallback = function() { return callback }; // 현재 설정된 콜백 함수를 반환합니다.
  this.setState = function(val) { state = val; }; // 클라이언트 상태를 설정합니다.
  this.getState = function() { return state; }; // 현재 클라이언트 상태를 반환합니다.
  this.setLocked = function(val) { locked = val; }; // 클라이언트 잠금 상태를 설정합니다.
  this.getLocked = function() { return locked; }; // 현재 클라이언트 잠금 상태를 반환합니다.
  this.setMultiline = function(val) { multiline = val; }; // 다중 라인 처리 플래그를 설정합니다.
  this.getMultiline = function() { return multiline; }; // 현재 다중 라인 처리 플래그를 반환합니다.

  /**
   * 서버로 명령어를 전송합니다.
   * @param {string} command - 전송할 POP3 명령어입니다.
   * @param {string} [argument] - 명령어에 대한 추가 인수입니다.
   */
  this.write = function (command, argument) {
    let text = command;

    // 인수가 있는 경우 명령어 뒤에 추가합니다.
    if (argument !== undefined) text = text + " " + argument + "\r\n";
    else text = text + "\r\n"; // 인수가 없으면 명령어만 전송합니다.

    // 디버그 모드가 활성화된 경우 명령어를 출력합니다.
    if (debug) console.log("Client: " + util.inspect(text));

    socket.write(text); // 소켓을 통해 서버로 명령어를 전송합니다.
  };

  /**
   * 소켓 연결을 종료합니다.
   */
  this.end = () => { socket.end(); };

  /**
   * TLS 연결을 시작합니다.
   * @param {object} options - TLS 옵션을 설정합니다.
   */
  this.starttls = function(options) {

    let s = socket; // 기존 소켓을 저장합니다.
    s.removeAllListeners("end"); // 기존 소켓의 'end' 이벤트 리스너를 제거합니다.
    s.removeAllListeners("data"); // 기존 소켓의 'data' 이벤트 리스너를 제거합니다.
    s.removeAllListeners("error"); // 기존 소켓의 'error' 이벤트 리스너를 제거합니다.
    socket = null; // 기존 소켓을 초기화합니다.

    let sslcontext = require('crypto').createCredentials(options); // TLS 연결에 필요한 인증서를 생성합니다.
    let pair = tls.createSecurePair(sslcontext, false); // TLS 연결을 위한 SecurePair를 생성합니다.
    let cleartext = pipe(pair); // SecurePair를 통해 암호화된 소켓을 생성합니다.

    // TLS 연결이 보안 상태로 설정된 후 호출되는 이벤트 핸들러입니다.
    pair.on('secure', function() {

      let verifyError = pair.ssl.verifyError(); // TLS 인증 오류를 확인합니다.
      cleartext.authorized = true; // 기본적으로 인증된 상태로 설정합니다.

      if (verifyError) {

        cleartext.authorized = false; // 인증 오류가 있으면 인증된 상태를 해제합니다.
        cleartext.authorizationError = verifyError; // 인증 오류 정보를 저장합니다.

      }

      // TLS 연결된 소켓에 이벤트 리스너를 설정합니다.
      cleartext.on("data", onData);
      cleartext.on("error", onError);
      cleartext.on("end", onEnd);
      socket = cleartext; // TLS 소켓을 클라이언트의 소켓으로 설정합니다.
      (self.getCallback())(cleartext.authorized, cleartext.authorizationError); // 콜백을 호출하여 연결 상태를 전달합니다.

    });

    cleartext._controlReleased = true; // SecurePair의 제어를 해제합니다.

    /**
     * SecurePair를 통해 암호화된 데이터를 파이프 처리하는 함수입니다.
     * @param {object} pair - SecurePair 객체입니다.
     * @returns {object} cleartext - 암호화된 소켓을 반환합니다.
     */
    function pipe(pair) {

      pair.encrypted.pipe(s); // 기존 소켓을 암호화된 쌍의 암호화된 스트림에 연결합니다.
      s.pipe(pair.encrypted); // 기존 소켓의 데이터를 암호화된 쌍에 파이프합니다.

      pair.fd = s.fd; // 기존 소켓의 파일 디스크립터를 SecurePair에 설정합니다.
      let cleartext = pair.cleartext; // 암호화된 소켓을 설정합니다.
      cleartext.socket = s; // 기존 소켓을 암호화된 소켓에 연결합니다.
      cleartext.encrypted = pair.encrypted; // 암호화된 데이터를 설정합니다.
      cleartext.authorized = false; // 기본적으로 인증되지 않은 상태로 설정합니다.

      /**
       * 소켓 오류 발생 시 호출되는 이벤트 핸들러입니다.
       * @param {Error} e - 발생한 오류 객체입니다.
       */
      function onerror(e) {
        if (cleartext._controlReleased) cleartext.emit('error', e);
      }

      /**
       * 소켓이 종료될 때 호출되는 이벤트 핸들러입니다.
       */
      function onclose() {
        s.removeListener('error', onerror); // 소켓의 오류 이벤트 리스너를 제거합니다.
        s.removeListener('close', onclose); // 소켓의 종료 이벤트 리스너를 제거합니다.
      }

      s.on('error', onerror); // 소켓의 오류 이벤트 리스너를 설정합니다.
      s.on('close', onclose); // 소켓의 종료 이벤트 리스너를 설정합니다.
      return cleartext; // 암호화된 소켓을 반환합니다.

    }
  };

  // Private methods follow
  // Event handlers follow
  /**
   * 서버로부터 데이터를 수신할 때 호출되는 이벤트 핸들러입니다.
   * @param {Buffer} data - 서버로부터 수신된 데이터입니다.
   */
  function onData(data) {

    data = data.toString("ascii"); // 데이터를 ASCII 문자열로 변환합니다.
    bufferedData += data; // 수신된 데이터를 버퍼에 추가합니다.

    if (debug) console.log("Server: " + util.inspect(data)); // 디버그 모드가 활성화된 경우 수신된 데이터를 출력합니다.

    // 응답 검사를 수행하는 로직입니다.
    if (checkResp === true) {

      if (bufferedData.substr(0, 3) === "+OK") {

        checkResp = false; // 응답 검사를 비활성화합니다.
        response = true; // 응답이 성공적임을 표시합니다.

      } else if (bufferedData.substr(0, 4) === "-ERR") {

        checkResp = false; // 응답 검사를 비활성화합니다.
        response = false; // 응답이 실패했음을 표시합니다.

      // SASL에서 사용되는 로직입니다.
      } else if (multiline === false) {

        checkResp = false; // 응답 검사를 비활성화합니다.
        response = true; // 응답이 성공적임을 표시합니다.

      }
    }

    // 응답 검사가 완료된 후 추가 처리를 수행합니다.
    if (checkResp === false) {

      // 다중 라인 응답을 처리하는 로직입니다.
      if (multiline === true && (response === false || bufferedData.substr(bufferedData.length - 5) === "\r\n.\r\n")) {

        let responseCopy = response; // 응답 상태를 복사합니다.
        let bufferedDataCopy = bufferedData; // 버퍼링된 데이터를 복사합니다.

        response = null; // 응답 상태를 초기화합니다.
        checkResp = true; // 응답 검사를 다시 활성화합니다.
        multiline = false; // 다중 라인 응답 처리를 비활성화합니다.
        bufferedData = ""; // 버퍼링된 데이터를 초기화합니다.

        callback(responseCopy, bufferedDataCopy); // 콜백을 호출하여 처리 결과를 전달합니다.

      } else if (multiline === false) {

        let responseCopy = response; // 응답 상태를 복사합니다.
        let bufferedDataCopy = bufferedData; // 버퍼링된 데이터를 복사합니다.

        response = null; // 응답 상태를 초기화합니다.
        checkResp = true; // 응답 검사를 다시 활성화합니다.
        multiline = false; // 다중 라인 응답 처리를 비활성화합니다.
        bufferedData = ""; // 버퍼링된 데이터를 초기화합니다.

        callback(responseCopy, bufferedDataCopy); // 콜백을 호출하여 처리 결과를 전달합니다.

      }
    }
  }

  /**
   * 소켓 오류 발생 시 호출되는 이벤트 핸들러입니다.
   * @param {Error} err - 발생한 오류 객체입니다.
   */
  function onError(err) {

    if (err.errno === 111) self.emit("connect", false, err); // 연결 오류 시 connect 이벤트를 발생시킵니다.
    else self.emit("error", err); // 일반 오류 시 error 이벤트를 발생시킵니다.

  }

  /**
   * 소켓 연결이 종료될 때 호출되는 이벤트 핸들러입니다.
   * @param {Buffer} data - 연결 종료 시 남은 데이터입니다.
   */
  function onEnd(data) {
    self.setState(0); // 클라이언트 상태를 0으로 설정합니다.
    socket = null; // 소켓을 초기화합니다.
  }

  /**
   * 소켓이 완전히 닫힐 때 호출되는 이벤트 핸들러입니다.
   */
  function onClose() {
    self.emit("close"); // close 이벤트를 발생시킵니다.
  }

  // EventEmitter 클래스를 상속받습니다.
  events.EventEmitter.call(this);

  // TLS 사용 여부에 따라 연결 방식을 설정합니다.
  if (enabletls === true) {

    // TLS 연결을 설정합니다.
    tlssock = tls.connect({
            host: host, // 호스트 주소
            port: port, // 포트 번호
            rejectUnauthorized: !self.data.ignoretlserrs // 인증 오류 무시 여부
        }, function() {

            // TLS 연결 인증 상태를 확인합니다.
            if (tlssock.authorized === false &&
                self.data["ignoretlserrs"] === false)
                    self.emit("tls-error", tlssock.authorizationError); // TLS 인증 오류 이벤트를 발생시킵니다.

        }
    );

    socket = tlssock; // TLS 소켓을 클라이언트의 소켓으로 설정합니다.

  } else {
    socket = new net.createConnection(port, host); // 일반 TCP 소켓 연결을 설정합니다.
  }

  // 소켓에 이벤트 리스너를 설정합니다.
  socket.on("data", onData);
  socket.on("error", onError);
  socket.on("end", onEnd);
  socket.on("close", onClose);

}

// util.inherits를 사용하여 Pop3Client가 EventEmitter를 상속받도록 설정합니다.
util.inherits(Pop3Client, events.EventEmitter);

/**
 * Pop3Client 클래스의 connect 메서드는 서버와의 연결을 시도하고, 
 * 연결 성공 여부에 따라 Promise를 반환합니다.
 * 
 * @returns {Promise<boolean>} 서버 연결 성공 시 true를 반환하고, 실패 시 null을 반환하는 Promise입니다.
 */
Pop3Client.prototype.connect = function () {
  const self = this; // 현재 객체를 self에 참조합니다.
  
  // 서버 연결을 시도하는 Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // "connect" 이벤트가 발생하면 콜백 함수가 실행됩니다.
    self.on("connect", (boo) => {
      // 연결이 성공적일 경우
      if (boo) {
        resolve(true); // Promise를 성공 상태로 true를 반환합니다.
      } else {
        // 연결이 실패한 경우
        reject(null); // Promise를 실패 상태로 null을 반환합니다.
      }
    });
  });
}

/**
 * Pop3Client 클래스의 login 메서드는 POP3 서버에 로그인합니다.
 * 
 * @param {string} username - 로그인할 사용자의 이름입니다.
 * @param {string} password - 로그인할 사용자의 비밀번호입니다.
 * @returns {Promise<string>} 로그인 시도 후 서버의 응답 데이터를 포함하는 Promise입니다.
 */
Pop3Client.prototype.login = function (username, password) {
  const self = this; // 현재 객체를 self에 참조합니다.

  // 로그인 시도 과정을 처리하는 Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // 현재 상태가 1이 아닌 경우, 즉 연결이 되어 있지 않은 경우
    if (self.getState() !== 1) {
      self.emit("invalid-state", "login"); // "invalid-state" 이벤트를 발생시켜 로그인 불가 상태를 알립니다.
    }
    // 현재 클라이언트가 잠겨있는 경우
    else if (self.getLocked() === true) {
      self.emit("locked", "login"); // "locked" 이벤트를 발생시켜 로그인 시도를 차단합니다.
    } 
    else {
      // 클라이언트를 잠금 상태로 설정합니다.
      self.setLocked(true);
      
      // 서버 응답에 대한 콜백을 설정합니다.
      self.setCallback((resp, data) => {
        // 서버 응답이 실패한 경우
        if (resp === false) {
          self.setLocked(false); // 클라이언트의 잠금을 해제합니다.
          self.setCallback(function() {}); // 콜백을 초기화합니다.
          reject(data); // Promise를 실패 상태로 설정하고 서버 응답 데이터를 반환합니다.
        } 
        else {
          // 비밀번호 전송 후 응답을 처리하는 콜백을 설정합니다.
          self.setCallback((resp, data) => {
            self.setLocked(false); // 클라이언트의 잠금을 해제합니다.
            self.setCallback(function() {}); // 콜백을 초기화합니다.
            
            if (resp !== false) self.setState(2); // 서버 응답이 성공적이면 상태를 2(로그인 완료)로 설정합니다.
            resolve(data); // Promise를 성공 상태로 설정하고 서버 응답 데이터를 반환합니다.
          });

          // 다중 라인 응답을 비활성화하고, 비밀번호를 서버로 전송합니다.
          self.setMultiline(false);
          self.write("PASS", password);
        }
      });

      // 다중 라인 응답을 비활성화하고, 사용자 이름을 서버로 전송합니다.
      self.setMultiline(false);
      self.write("USER", username);
    }
  });
};

/**
 * Pop3Client 클래스의 auth 메서드는 POP3 서버에 인증을 시도합니다.
 * 
 * @param {string} type - 사용할 인증 유형 ("PLAIN" 또는 "CRAM-MD5")입니다.
 * @param {string} username - 인증에 사용할 사용자 이름입니다.
 * @param {string} password - 인증에 사용할 비밀번호입니다.
 */
Pop3Client.prototype.auth = function (type, username, password) {

  // 인증 유형을 대문자로 변환합니다.
  type = type.toUpperCase();
  let self = this; // 현재 객체를 self에 참조합니다.
  let types = {"PLAIN": 1, "CRAM-MD5": 1}; // 허용되는 인증 유형을 정의합니다.
  let initialresp = ""; // 초기 응답 변수를 선언합니다.

  // 현재 클라이언트의 상태가 1이 아닌 경우, 즉 연결이 되어 있지 않은 경우
  if (self.getState() !== 1) {
    self.emit("invalid-state", "auth"); // "invalid-state" 이벤트를 발생시켜 인증 불가 상태를 알립니다.
  } 
  // 현재 클라이언트가 잠겨있는 경우
  else if (self.getLocked() === true) {
    self.emit("locked", "auth"); // "locked" 이벤트를 발생시켜 인증 시도를 차단합니다.
  }

  // 입력된 인증 유형이 허용되지 않는 경우
  if ((type in types) === false) {
    self.emit("auth", false, "Invalid auth type", null); // "auth" 이벤트를 발생시키고, 인증 실패를 알립니다.
    return; // 함수 실행을 종료합니다.
  }

  // TLS가 설정된 경우 인증 절차를 수행하는 함수
  function tlsok() {

    // 인증 유형이 "PLAIN"인 경우
    if (type === "PLAIN") {

      // 초기 응답을 생성하여 base64로 인코딩합니다.
      initialresp = " " + Buffer.from(username + "\u0000" + username + "\u0000" + password).toString("base64") + "=";
      
      // 서버 응답에 대한 콜백을 설정합니다.
      self.setCallback(function(resp, data) {
        // 인증이 성공적이면 상태를 2로 설정합니다.
        if (resp !== false) self.setState(2);
        // "auth" 이벤트를 발생시켜 인증 결과를 전달합니다.
        self.emit("auth", resp, data, data);
      });

    // 인증 유형이 "CRAM-MD5"인 경우
    } else if (type === "CRAM-MD5") {

      // 서버로부터 초기 도전 문자열을 수신한 후의 콜백을 설정합니다.
      self.setCallback(function(resp, data) {

        // 서버가 -ERR로 응답한 경우 인증 실패를 알립니다.
        if (resp === false) {
          self.emit("auth", resp, "Server responded -ERR to AUTH CRAM-MD5", data);
        } else {

          // 서버로부터 받은 도전 문자열을 base64로 디코딩하여 생성합니다.
          let challenge = Buffer.from(data.trim().substr(2), "base64").toString();
          // HMAC-MD5 알고리즘을 사용하여 비밀번호로 응답을 생성합니다.
          let hmac = crypto.createHmac("md5", password);
          let response = Buffer.from(username + " " + hmac.update(challenge).digest("hex")).toString("base64");

          // 서버의 응답을 처리하는 콜백을 설정합니다.
          self.setCallback(function(resp, data) {

            let errmsg = null;

            // 인증이 성공적이면 상태를 2로 설정합니다.
            if (resp !== false) self.setState(2);
            else errmsg = "Server responded -ERR to response"; // 실패 시 오류 메시지를 설정합니다.

            // "auth" 이벤트를 발생시켜 인증 결과를 전달합니다.
            self.emit("auth", resp, null, data);
          });

          // 생성된 응답을 서버로 전송합니다.
          self.write(response);
        }
      });
    }

    // AUTH 명령과 초기 응답을 서버로 전송합니다.
    self.write("AUTH " + type + initialresp);
  }

  // TLS가 활성화되지 않은 경우 STLS를 시작합니다.
  if (self.data["tls"] === false && self.data["stls"] === false) {

    // 기존의 STLS 리스너들을 모두 제거합니다.
    self.removeAllListeners("stls");

    // STLS 핸들러를 설정합니다.
    self.on("stls", function(resp, rawdata) {

      // STLS 업그레이드에 실패한 경우
      if (resp === false) {

        // Self-signed 인증서를 무시할지 여부를 확인하여 처리합니다.
        if (self.data["ignoretlserrs"] === true && rawdata === "DEPTH_ZERO_SELF_SIGNED_CERT") {
          tlsok(); // 무시하고 인증을 계속 진행합니다.
        } else {
          self.emit("auth", false, "Unable to upgrade connection to STLS", rawdata); // STLS 실패를 알립니다.
        }

      } else {
        // STLS 업그레이드가 성공한 경우 인증을 진행합니다.
        tlsok();
      }
    });

    // STLS 명령을 실행합니다.
    self.stls();

  } else {
    // TLS가 이미 활성화된 경우 바로 인증 절차를 시작합니다.
    tlsok();
  }
};

/**
 * Pop3Client 클래스의 apop 메서드는 POP3 서버에 APOP 명령어를 사용하여 인증을 시도합니다.
 * APOP은 MD5 해시 알고리즘을 사용한 인증 방법으로, 서버가 APOP을 지원하는 경우에만 사용할 수 있습니다.
 * 
 * @param {string} username - APOP 인증에 사용할 사용자 이름입니다.
 * @param {string} password - APOP 인증에 사용할 비밀번호입니다.
 */
Pop3Client.prototype.apop = function (username, password) {

  let self = this; // 현재 Pop3Client 객체를 참조합니다.

  // 현재 상태가 1(연결된 상태)이 아닌 경우
  if (self.getState() !== 1) {
    self.emit("invalid-state", "apop"); // "invalid-state" 이벤트를 발생시켜 잘못된 상태임을 알립니다.
  } 
  // 클라이언트가 잠겨 있는 경우
  else if (self.getLocked() === true) {
    self.emit("locked", "apop"); // "locked" 이벤트를 발생시켜 잠겨 있음을 알립니다.
  } 
  // 서버가 APOP을 지원하지 않는 경우
  else if (self.data["apop"] === false) {
    self.emit("apop", false, "APOP support not detected on remote server"); // "apop" 이벤트를 발생시켜 APOP 지원이 없음을 알립니다.
  } 
  // APOP 인증 절차를 진행할 수 있는 경우
  else {

    // 클라이언트를 잠금 상태로 설정합니다.
    self.setLocked(true);

    // 서버 응답에 대한 콜백을 설정합니다.
    self.setCallback(function(resp, data) {

      // 응답을 받은 후, 클라이언트를 잠금 해제합니다.
      self.setLocked(false);
      // 기존의 콜백을 초기화합니다.
      self.setCallback(function() {});

      // 인증이 성공한 경우 상태를 2로 변경합니다.
      if (resp === true) self.setState(2);
      // "apop" 이벤트를 발생시켜 인증 결과를 전달합니다.
      self.emit("apop", resp, data);

    });

    // 멀티라인 응답을 비활성화합니다.
    self.setMultiline(false);

    // APOP 명령어와 함께 사용자 이름과 암호화된 비밀번호를 서버로 전송합니다.
    // 비밀번호는 서버에서 제공한 APOP 타임스탬프와 결합되어 MD5 해시로 암호화됩니다.
    self.write("APOP", username + " " + crypto.createHash("md5").update(self.data["apop-timestamp"] + password).digest("hex"));

  }
};

/**
 * Pop3Client 클래스의 stls 메서드는 POP3 세션에서 STLS 명령어를 사용하여 
 * 현재 연결을 TLS(Transport Layer Security)로 업그레이드합니다.
 * 이 과정은 연결 보안을 강화하는 데 사용됩니다.
 */
Pop3Client.prototype.stls = function () {

  let self = this; // 현재 Pop3Client 객체를 참조합니다.

  // 현재 상태가 1(연결된 상태)이 아닌 경우
  if (self.getState() !== 1) {
    self.emit("invalid-state", "stls"); // "invalid-state" 이벤트를 발생시켜 잘못된 상태임을 알립니다.
  } 
  // 클라이언트가 잠겨 있는 경우
  else if (self.getLocked() === true) {
    self.emit("locked", "stls"); // "locked" 이벤트를 발생시켜 잠겨 있음을 알립니다.
  } 
  // 이미 TLS 연결이 설정된 경우
  else if (self.data["tls"] === true) {
    self.emit("stls", false, "Unable to execute STLS as TLS connection already established"); 
    // "stls" 이벤트를 발생시켜 이미 TLS 연결이 설정되었음을 알립니다.
  } 
  // STLS 명령어를 실행할 수 있는 경우
  else {

    // 클라이언트를 잠금 상태로 설정합니다.
    self.setLocked(true);

    // 서버 응답에 대한 콜백을 설정합니다.
    self.setCallback(function(resp, data) {

      // 응답을 받은 후, 클라이언트를 잠금 해제합니다.
      self.setLocked(false);
      // 기존의 콜백을 초기화합니다.
      self.setCallback(function() {});

      // 응답이 성공적인 경우
      if (resp === true) {

        // STLS 후속 작업을 위한 콜백 설정
        self.setCallback(function(resp, data) {

          // TLS 인증서 오류를 무시해야 하는 경우
          if (resp === false && self.data["ignoretlserrs"] === true && data === "DEPTH_ZERO_SELF_SIGNED_CERT")
            resp = true;

          // STLS 성공 상태를 설정합니다.
          self.data["stls"] = true;
          // "stls" 이벤트를 발생시켜 결과를 전달합니다.
          self.emit("stls", resp, data);

        });

        // TLS 연결을 시작합니다.
        self.starttls();

      } else {
        // 응답이 실패한 경우 "stls" 이벤트를 발생시킵니다.
        self.emit("stls", false, data);
      }
    });

    // 멀티라인 응답을 비활성화합니다.
    self.setMultiline(false);
    // STLS 명령어를 서버로 전송합니다.
    self.write("STLS");

  }
};

/**
 * Pop3Client 클래스의 top 메서드는 POP3 서버에서 특정 메시지의 헤더와 지정된 줄 수만큼의 본문을 가져옵니다.
 * 
 * @param {number} msgnumber - 가져오려는 메시지의 번호입니다.
 * @param {number} lines - 메시지의 헤더 아래에 포함될 본문의 줄 수를 지정합니다.
 */
Pop3Client.prototype.top = function (msgnumber, lines) {

  let self = this; // 현재 Pop3Client 객체를 참조합니다.

  // 현재 상태가 2(인증 완료된 상태)가 아닌 경우
  if (self.getState() !== 2) {
    self.emit("invalid-state", "top"); // "invalid-state" 이벤트를 발생시켜 잘못된 상태임을 알립니다.
  }
  // 클라이언트가 잠겨 있는 경우
  else if (self.getLocked() === true) {
    self.emit("locked", "top"); // "locked" 이벤트를 발생시켜 잠겨 있음을 알립니다.
  } 
  // 명령어를 실행할 수 있는 경우
  else {

    // 서버 응답에 대한 콜백을 설정합니다.
    self.setCallback(function(resp, data) {

      let returnValue = null; // 반환할 값을 초기화합니다.
      self.setLocked(false); // 잠금을 해제합니다.
      self.setCallback(function() {}); // 기존의 콜백을 초기화합니다.

      // 응답이 성공적인 경우
      if (resp !== false) {

        returnValue = ""; // 반환할 값을 빈 문자열로 초기화합니다.
        let startOffset = data.indexOf("\r\n", 0) + 2; // 메시지 본문의 시작 오프셋을 계산합니다.
        let endOffset = data.indexOf("\r\n.\r\n", 0) + 2; // 메시지 본문의 끝 오프셋을 계산합니다.

        // 본문이 유효한 경우 해당 부분을 추출합니다.
        if (endOffset > startOffset)
          returnValue = data.substr(startOffset, endOffset - startOffset);

      }

      // "top" 이벤트를 발생시켜 결과를 전달합니다.
      self.emit("top", resp, msgnumber, returnValue, data);

    });

    // 멀티라인 응답을 활성화합니다.
    self.setMultiline(true);
    // TOP 명령어를 서버로 전송합니다.
    self.write("TOP", msgnumber + " " + lines);

  }
};

/**
 * Pop3Client 클래스의 list 메서드는 지정된 메시지 번호의 정보를 가져오거나, 메시지 번호가 지정되지 않은 경우 모든 메시지의 목록을 가져옵니다.
 * 
 * @param {number} [msgnumber] - 가져오려는 특정 메시지의 번호입니다. 지정되지 않으면 모든 메시지 목록을 가져옵니다.
 * @returns {Promise<Object>} - 메시지의 개수와 메시지 데이터를 포함한 객체를 반환하는 Promise입니다.
 */
Pop3Client.prototype.list = function (msgnumber) {

  const self = this; // 현재 Pop3Client 객체를 참조합니다.

  // Promise를 반환하여 비동기 처리를 수행합니다.
  return new Promise((resolve, reject) => {

    // 현재 상태가 2(인증 완료된 상태)가 아닌 경우
    if (self.getState() !== 2) {
      self.emit("invalid-state", "list"); // "invalid-state" 이벤트를 발생시켜 잘못된 상태임을 알립니다.
    } 
    // 클라이언트가 잠겨 있는 경우
    else if (self.getLocked() === true) {
      self.emit("locked", "list"); // "locked" 이벤트를 발생시켜 잠겨 있음을 알립니다.
    } 
    // 명령어를 실행할 수 있는 경우
    else {

      self.setLocked(true); // 클라이언트를 잠급니다.
      
      // 서버 응답에 대한 콜백을 설정합니다.
      self.setCallback(function(resp, data) {

        let returnValue = null; // 반환할 값을 초기화합니다.
        let msgcount = 0; // 메시지 개수를 초기화합니다.
        self.setLocked(false); // 잠금을 해제합니다.
        self.setCallback(function() {}); // 기존의 콜백을 초기화합니다.

        // 응답이 성공적인 경우
        if (resp !== false) {

          returnValue = []; // 반환할 배열을 초기화합니다.

          // 특정 메시지 번호가 지정된 경우
          if (msgnumber !== undefined) {

            msgcount = 1; // 메시지 개수를 1로 설정합니다.
            listitem = data.split(" "); // 데이터를 공백을 기준으로 분리합니다.
            returnValue[listitem[1]] = listitem[2]; // 메시지 번호와 크기를 저장합니다.

          } 
          // 메시지 번호가 지정되지 않은 경우, 모든 메시지 목록을 가져옵니다.
          else {

            let offset = 0;
            let listitem = "";
            let newoffset = 0;
            let returnValue = [];
            let startOffset = data.indexOf("\r\n", 0) + 2; // 데이터의 시작 오프셋을 계산합니다.
            let endOffset = data.indexOf("\r\n.\r\n", 0) + 2; // 데이터의 끝 오프셋을 계산합니다.

            // 데이터가 유효한 경우
            if (endOffset > startOffset) {

              data = data.substr(startOffset, endOffset - startOffset); // 유효한 데이터를 추출합니다.

              while (true) {

                if (offset > endOffset)
                  break;

                newoffset = data.indexOf("\r\n", offset); // 줄 단위로 데이터를 나눕니다.

                if (newoffset < 0)
                  break;

                msgcount++; // 메시지 개수를 증가시킵니다.
                listitem = data.substr(offset, newoffset - offset); // 한 줄을 추출합니다.
                listitem = listitem.split(" "); // 공백을 기준으로 분리합니다.
                returnValue[listitem[0]] = listitem[1]; // 메시지 번호와 크기를 저장합니다.
                offset = newoffset + 2; // 다음 오프셋으로 이동합니다.

              }
            }
          }
        }

        // 응답이 실패한 경우
        if (!resp) {
          reject(null); // Promise를 거부합니다.
        } 
        // 응답이 성공한 경우
        else {
          resolve({
            count: msgcount, // 메시지 개수를 반환합니다.
            data // 메시지 데이터를 반환합니다.
          });
        }
      });

      // 특정 메시지 번호가 지정된 경우 멀티라인 모드를 비활성화합니다.
      if (msgnumber !== undefined) self.setMultiline(false);
      // 모든 메시지 목록을 가져오는 경우 멀티라인 모드를 활성화합니다.
      else self.setMultiline(true);

      // LIST 명령어를 서버로 전송합니다.
      self.write("LIST", msgnumber);

    }
  });
};

/**
 * Pop3Client 클래스의 stat 메서드는 메일박스의 상태를 확인하는 명령어를 서버에 전송합니다.
 * 이 명령어는 서버로부터 메일박스에 있는 메시지의 개수와 전체 크기를 반환받습니다.
 *
 * @returns {void}
 */
Pop3Client.prototype.stat = function () {

  let self = this; // Pop3Client 객체를 참조합니다.

  // 현재 상태가 2(인증 완료된 상태)가 아닌 경우
  if (self.getState() !== 2) {
    self.emit("invalid-state", "stat"); // "invalid-state" 이벤트를 발생시켜 잘못된 상태임을 알립니다.
  } 
  // 클라이언트가 잠겨 있는 경우
  else if (self.getLocked() === true) {
    self.emit("locked", "stat"); // "locked" 이벤트를 발생시켜 클라이언트가 잠겨 있음을 알립니다.
  } 
  // 명령어를 실행할 수 있는 경우
  else {

    self.setLocked(true); // 클라이언트를 잠금 상태로 설정합니다.

    // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
    self.setCallback(function(resp, data) {

      let returnValue = null; // 반환할 값을 초기화합니다.
      self.setLocked(false); // 클라이언트 잠금을 해제합니다.
      self.setCallback(function() {}); // 기존의 콜백을 초기화합니다.

      // 응답이 성공적인 경우
      if (resp !== false) {

        // 서버로부터 받은 데이터를 공백 기준으로 나눕니다.
        listitem = data.split(" ");
        returnValue = {

          // 메시지의 개수와 전체 크기를 반환합니다.
          "count": listitem[1].trim(), 
          "octets": listitem[2].trim(),

        };
      }

      // "stat" 이벤트를 발생시켜 응답 결과를 알립니다.
      self.emit("stat", resp, returnValue, data);

    });

    self.setMultiline(false); // 멀티라인 응답을 처리하지 않도록 설정합니다.
    self.write("STAT", undefined); // 서버에 "STAT" 명령어를 전송합니다.

  }
};

/**
 * Pop3Client 클래스의 uidl 메서드는 POP3 서버에서 각 이메일 메시지의 고유 식별자 목록을 요청합니다.
 * 이 식별자는 메시지를 고유하게 식별할 수 있는 문자열이며, 메시지 번호와 함께 반환됩니다.
 * 
 * @param {number} [msgnumber] - 특정 메시지 번호를 지정하면 해당 메시지의 UID만 요청합니다. 
 *                               번호를 지정하지 않으면 전체 메시지의 UID 목록을 요청합니다.
 * @returns {void}
 */
Pop3Client.prototype.uidl = function (msgnumber) {

  let self = this; // Pop3Client 객체를 참조합니다.

  // 현재 상태가 2(인증 완료된 상태)가 아닌 경우
  if (self.getState() !== 2) {
    self.emit("invalid-state", "uidl"); // "invalid-state" 이벤트를 발생시켜 잘못된 상태임을 알립니다.
  } 
  // 클라이언트가 잠겨 있는 경우
  else if (self.getLocked() === true) {
    self.emit("locked", "uidl"); // "locked" 이벤트를 발생시켜 클라이언트가 잠겨 있음을 알립니다.
  } 
  // 명령어를 실행할 수 있는 경우
  else {

    self.setLocked(true); // 클라이언트를 잠금 상태로 설정합니다.

    // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
    self.setCallback(function(resp, data) {

      let returnValue = null; // 반환할 값을 초기화합니다.
      self.setLocked(false); // 클라이언트 잠금을 해제합니다.
      self.setCallback(function() {}); // 기존의 콜백을 초기화합니다.

      // 응답이 성공적인 경우
      if (resp !== false) {

        returnValue = []; // 반환할 값을 배열로 초기화합니다.

        // 특정 메시지 번호가 지정된 경우
        if (msgnumber !== undefined) {

          listitem = data.split(" "); // 데이터를 공백 기준으로 나눕니다.
          returnValue[listitem[1]] = listitem[2].trim(); // 메시지 번호와 UID를 배열에 저장합니다.

        } 
        // 전체 메시지의 UID 목록을 요청한 경우
        else {

          let offset = 0; // 데이터를 읽어올 시작 위치를 초기화합니다.
          let listitem = ""; // 데이터를 저장할 변수를 초기화합니다.
          let newoffset = 0; // 새로운 위치를 저장할 변수를 초기화합니다.
          let returnValue = []; // 반환할 배열을 초기화합니다.
          let startOffset = data.indexOf("\r\n", 0) + 2; // 데이터의 시작 위치를 찾습니다.
          let endOffset = data.indexOf("\r\n.\r\n", 0) + 2; // 데이터의 끝 위치를 찾습니다.

          // 데이터의 끝 위치가 시작 위치보다 큰 경우에만
          if (endOffset > startOffset) {

            data = data.substr(startOffset, endOffset-startOffset); // 데이터를 잘라냅니다.
            endOffset -= startOffset; // 상대적인 끝 위치를 계산합니다.

            // 데이터를 끝까지 읽어올 때까지 반복합니다.
            while (offset < endOffset) {

              newoffset = data.indexOf("\r\n", offset); // 새로운 줄의 위치를 찾습니다.
              listitem = data.substr(offset, newoffset-offset); // 데이터를 잘라냅니다.
              listitem = listitem.split(" "); // 데이터를 공백 기준으로 나눕니다.
              returnValue[listitem[0]] = listitem[1]; // 메시지 번호와 UID를 배열에 저장합니다.
              offset = newoffset + 2; // 다음 위치로 이동합니다.

            }
          }
        }
      }

      // "uidl" 이벤트를 발생시켜 응답 결과를 알립니다.
      self.emit("uidl", resp, msgnumber, returnValue, data);

    });

    // 메시지 번호가 지정된 경우와 지정되지 않은 경우에 따라 멀티라인 설정을 조정합니다.
    if (msgnumber !== undefined) self.setMultiline(false);
    else self.setMultiline(true);

    // 서버에 "UIDL" 명령어를 전송합니다.
    self.write("UIDL", msgnumber);

  }
};

/**
 * Pop3Client 클래스의 retr 메서드는 POP3 서버로부터 지정된 번호의 이메일 메시지를 가져옵니다.
 * 이 메서드는 서버로부터 해당 메시지를 요청한 후, 성공적으로 가져오면 메시지 데이터를 반환합니다.
 *
 * @param {number} msgnumber - 가져올 이메일 메시지의 번호를 지정합니다.
 * @returns {Promise<Object>} 서버로부터 가져온 메시지 데이터를 포함한 Promise 객체를 반환합니다.
 *                            성공 시 메시지 본문과 원본 데이터를 반환하며, 실패 시 null을 반환합니다.
 */
Pop3Client.prototype.retr = function (msgnumber) {
  const self = this; // Pop3Client 객체를 참조합니다.

  // Promise를 반환하여 비동기적으로 메시지를 가져옵니다.
  return new Promise((resolve, reject) => {

    // 클라이언트가 인증된 상태인지 확인합니다.
    if (self.getState() !== 2) {
      // 인증되지 않은 상태라면 "invalid-state" 이벤트를 발생시킵니다.
      self.emit("invalid-state", "retr");
    } 
    // 클라이언트가 잠겨 있는지 확인합니다.
    else if (self.getLocked() === true) {
      // 클라이언트가 잠겨 있으면 "locked" 이벤트를 발생시킵니다.
      self.emit("locked", "retr");
    } 
    // 정상적으로 상태가 확인되었을 경우
    else {

      // 클라이언트를 잠금 상태로 설정합니다.
      self.setLocked(true);

      // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
      self.setCallback(function (resp, data) {

        let returnValue = null; // 반환할 값을 초기화합니다.
        self.setLocked(false); // 클라이언트 잠금을 해제합니다.
        self.setCallback(function () {}); // 기존의 콜백을 초기화합니다.

        // 서버의 응답이 성공적일 경우
        if (resp !== false) {
          let startOffset = data.indexOf("\r\n", 0) + 2; // 데이터의 시작 위치를 찾습니다.
          let endOffset = data.indexOf("\r\n.\r\n", 0); // 데이터의 끝 위치를 찾습니다.
          returnValue = data.substr(startOffset, endOffset - startOffset); // 메시지 본문을 잘라냅니다.
        }

        // 성공적으로 메시지를 가져온 경우 resolve로 반환합니다.
        if (resp) {
          resolve({
            data: returnValue, // 메시지 본문 데이터
            raw: data, // 원본 데이터
          });
        } 
        // 실패한 경우 reject로 null을 반환합니다.
        else {
          reject(null);
        }

      });

      // 서버에서 여러 줄의 데이터를 받아야 하므로 멀티라인 모드를 활성화합니다.
      self.setMultiline(true);
      // 서버에 "RETR" 명령어와 메시지 번호를 전송하여 해당 메시지를 요청합니다.
      self.write("RETR", msgnumber);

    }
  });
};

/**
 * Pop3Client 클래스의 dele 메서드는 POP3 서버에서 지정된 번호의 이메일 메시지를 삭제합니다.
 * 서버에 DELE 명령어를 전송하여 해당 메시지를 삭제하며, 작업이 완료되면 dele 이벤트를 발생시킵니다.
 *
 * @param {number} msgnumber - 삭제할 이메일 메시지의 번호를 지정합니다.
 */
Pop3Client.prototype.dele = function (msgnumber) {

  let self = this; // Pop3Client 객체를 참조합니다.

  // 클라이언트의 상태가 메시지 수신 상태(2)인지 확인합니다.
  if (self.getState() !== 2) {
    // 클라이언트가 올바른 상태가 아니면 "invalid-state" 이벤트를 발생시킵니다.
    self.emit("invalid-state", "dele");
  } 
  // 클라이언트가 잠겨 있는지 확인합니다.
  else if (self.getLocked() === true) {
    // 클라이언트가 잠겨 있으면 "locked" 이벤트를 발생시킵니다.
    self.emit("locked", "dele");
  } 
  // 정상적인 상태와 잠금 상태가 아닐 경우, 명령어를 실행합니다.
  else {

    // 클라이언트를 잠금 상태로 설정합니다.
    self.setLocked(true);

    // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
    self.setCallback(function(resp, data) {

      // 응답을 받은 후 클라이언트 잠금을 해제합니다.
      self.setLocked(false);
      // 기존의 콜백을 초기화합니다.
      self.setCallback(function() {});
      // "dele" 이벤트를 발생시켜 메시지 삭제 결과를 전달합니다.
      self.emit("dele", resp, msgnumber, data);

    });

    // 서버에서 한 줄의 응답만 받으므로 멀티라인 모드를 비활성화합니다.
    self.setMultiline(false);
    // 서버에 "DELE" 명령어와 메시지 번호를 전송하여 메시지 삭제를 요청합니다.
    self.write("DELE", msgnumber);

  }
};

/**
 * Pop3Client 클래스의 noop 메서드는 POP3 서버에 NOOP 명령을 전송하여 서버와의 연결을 유지하는 데 사용됩니다.
 * NOOP 명령은 서버에 아무런 작업도 수행하지 않지만, 연결이 유효한지 확인할 수 있습니다.
 * 서버의 응답에 따라 noop 이벤트가 발생됩니다.
 */
Pop3Client.prototype.noop = function () {

  let self = this; // Pop3Client 객체를 참조합니다.

  // 클라이언트의 상태가 메시지 수신 상태(2)인지 확인합니다.
  if (self.getState() !== 2) {
    // 클라이언트가 올바른 상태가 아니면 "invalid-state" 이벤트를 발생시킵니다.
    self.emit("invalid-state", "noop");
  } 
  // 클라이언트가 잠겨 있는지 확인합니다.
  else if (self.getLocked() === true) {
    // 클라이언트가 잠겨 있으면 "locked" 이벤트를 발생시킵니다.
    self.emit("locked", "noop");
  } 
  // 정상적인 상태와 잠금 상태가 아닐 경우, 명령어를 실행합니다.
  else {

    // 클라이언트를 잠금 상태로 설정합니다.
    self.setLocked(true);

    // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
    self.setCallback(function(resp, data) {

      // 응답을 받은 후 클라이언트 잠금을 해제합니다.
      self.setLocked(false);
      // 기존의 콜백을 초기화합니다.
      self.setCallback(function() {});
      // "noop" 이벤트를 발생시켜 서버의 응답을 전달합니다.
      self.emit("noop", resp, data);

    });

    // 서버에서 한 줄의 응답만 받으므로 멀티라인 모드를 비활성화합니다.
    self.setMultiline(false);
    // 서버에 "NOOP" 명령어를 전송하여 아무런 작업 없이 연결을 유지합니다.
    self.write("NOOP", undefined);

  }
};

/**
 * Pop3Client의 rset 메서드는 삭제 요청을 초기화하고, 서버에서 삭제 마크된 메일들을 복구하는 데 사용됩니다.
 * 이 명령은 메일을 삭제하지 않고 원래 상태로 되돌립니다.
 * 서버의 응답에 따라 rset 이벤트가 발생됩니다.
 */
Pop3Client.prototype.rset = function () {

  let self = this; // Pop3Client 객체를 참조합니다.

  // 클라이언트가 메일 수신 가능 상태(2)인지 확인합니다.
  if (self.getState() !== 2) {
    // 상태가 올바르지 않으면 "invalid-state" 이벤트를 발생시킵니다.
    self.emit("invalid-state", "rset");
  }
  // 클라이언트가 잠겨있는지 확인합니다.
  else if (self.getLocked() === true) {
    // 클라이언트가 잠겨 있으면 "locked" 이벤트를 발생시킵니다.
    self.emit("locked", "rset");
  }
  // 정상적인 상태와 잠금 상태가 아닐 경우, 명령어를 실행합니다.
  else {

    // 클라이언트를 잠금 상태로 설정합니다.
    self.setLocked(true);

    // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
    self.setCallback(function(resp, data) {

      // 응답을 받은 후 클라이언트 잠금을 해제합니다.
      self.setLocked(false);
      // 기존의 콜백을 초기화합니다.
      self.setCallback(function() {});
      // "rset" 이벤트를 발생시켜 서버의 응답을 전달합니다.
      self.emit("rset", resp, data);

    });

    // 멀티라인 모드를 비활성화합니다. (RSET 명령은 한 줄의 응답을 예상합니다.)
    self.setMultiline(false);
    // 서버에 "RSET" 명령어를 전송하여 삭제 마크된 메일들을 복구합니다.
    self.write("RSET", undefined);

  }
};

/**
 * Pop3Client의 capa 메서드는 서버의 기능(확장 명령어 등)을 조회하는 데 사용됩니다.
 * 서버의 응답으로 기능 목록을 받아옵니다.
 * 서버의 응답에 따라 capa 이벤트가 발생됩니다.
 */
Pop3Client.prototype.capa = function () {

  let self = this; // Pop3Client 객체를 참조합니다.

  // 클라이언트의 상태가 초기 상태(0)인지 확인합니다.
  if (self.getState() === 0) {
    // 상태가 초기 상태일 경우 "invalid-state" 이벤트를 발생시킵니다.
    self.emit("invalid-state", "capa");
  }
  // 클라이언트가 잠겨있는지 확인합니다.
  else if (self.getLocked() === true) {
    // 클라이언트가 잠겨 있으면 "locked" 이벤트를 발생시킵니다.
    self.emit("locked", "capa");
  }
  // 정상적인 상태와 잠금 상태가 아닐 경우, 명령어를 실행합니다.
  else {

    // 클라이언트를 잠금 상태로 설정합니다.
    self.setLocked(true);

    // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
    self.setCallback(function(resp, data) {

      let returnValue = null; // 서버의 응답 데이터를 저장할 변수입니다.
      // 응답을 받은 후 클라이언트 잠금을 해제합니다.
      self.setLocked(false);
      // 기존의 콜백을 초기화합니다.
      self.setCallback(function() {});

      if (resp === true) {

        // 서버의 응답 데이터에서 기능 목록을 추출합니다.
        let startOffset = data.indexOf("\r\n", 0) + 2;
        let endOffset = data.indexOf("\r\n.\r\n", 0);
        returnValue = data.substr(startOffset, endOffset - startOffset);
        // 기능 목록을 줄 단위로 분리합니다.
        returnValue = returnValue.split("\r\n");

      }

      // "capa" 이벤트를 발생시켜 서버의 응답을 전달합니다.
      self.emit("capa", resp, returnValue, data);

    });

    // 멀티라인 모드를 활성화합니다. (CAPA 명령은 여러 줄의 응답을 예상합니다.)
    self.setMultiline(true);
    // 서버에 "CAPA" 명령어를 전송하여 서버의 기능을 조회합니다.
    self.write("CAPA", undefined);

  }
};

/**
 * Pop3Client의 quit 메서드는 서버와의 연결을 종료하는 데 사용됩니다.
 * 서버에 QUIT 명령어를 전송한 후 연결을 닫습니다.
 * 서버의 응답에 따라 Promise가 resolve 또는 reject됩니다.
 * @returns {Promise<boolean>} 서버와의 연결이 성공적으로 종료되면 true, 실패하면 null이 반환됩니다.
 */
Pop3Client.prototype.quit = function () {
  const self = this; // Pop3Client 객체를 참조합니다.
  return new Promise((resolve, reject) => {
    // 클라이언트의 상태가 초기 상태(0)인지 확인합니다.
    if (self.getState() === 0) {
      // 상태가 초기 상태일 경우 "invalid-state" 이벤트를 발생시킵니다.
      self.emit("invalid-state", "quit");
    }
    // 클라이언트가 잠겨있는지 확인합니다.
    else if (self.getLocked() === true) {
      // 클라이언트가 잠겨 있으면 "locked" 이벤트를 발생시킵니다.
      self.emit("locked", "quit");
    }
    // 정상적인 상태와 잠금 상태가 아닐 경우, 명령어를 실행합니다.
    else {

      // 클라이언트를 잠금 상태로 설정합니다.
      self.setLocked(true);

      // 서버로부터의 응답을 처리할 콜백 함수를 설정합니다.
      self.setCallback(function(resp, data) {

        // 응답을 받은 후 클라이언트 잠금을 해제합니다.
        self.setLocked(false);
        // 기존의 콜백을 초기화합니다.
        self.setCallback(function() {});

        // 서버와의 연결을 종료합니다.
        self.end();
        if (resp) {
          resolve(true); // 서버가 정상적으로 응답하면 Promise를 resolve합니다.
        } else {
          reject(null); // 서버가 오류를 반환하면 Promise를 reject합니다.
        }

      });

      // 멀티라인 모드를 비활성화합니다. (QUIT 명령은 한 줄의 응답을 예상합니다.)
      self.setMultiline(false);
      // 서버에 "QUIT" 명령어를 전송하여 연결을 종료합니다.
      self.write("QUIT", undefined);

    }
  });
};

module.exports = Pop3Client;
