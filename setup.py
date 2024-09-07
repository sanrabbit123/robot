import subprocess
import time
import sys
import os
import shutil
from pathlib import Path
from os import path as osPath

class RobotInstall:
    """
    RobotInstall 클래스는 파이썬 모듈 설치 및 환경 설정을 돕는 클래스입니다.
    모듈 설치, 업그레이드, 디렉토리 설정 등 설치와 관련된 여러 작업을 자동으로 처리합니다.
    """

    def __init__(self):
        """
        클래스 초기화 메서드입니다.
        설치해야 할 모듈 목록과 업그레이드할 모듈 목록을 정의하고,
        임시 설치 디렉토리 및 경로 정보를 설정합니다.
        """
        self.install = [
            # 설치할 기본 파이썬 모듈 목록
            [ "quart" ],
            [ "quart-uploads" ],
            [ "motor" ],
            [ "pymongo" ],
            [ "argparse" ],
            [ "cryptography" ],
            [ "requests" ],
            [ "requests-toolbelt" ],
            [ "boto3" ],
            [ "bs4" ],
            [ "html5lib" ],
            [ "lxml" ],
            [ "wheel" ],
            [ "apscheduler" ],
            [ "aiohttp" ],
            [ "aiofiles" ],
            [ "aiomysql" ],
            [ "cloudconvert" ],
            [ "psutil" ],
            [ "getmac" ],
            [ "netifaces" ],
            [ "pandas" ],
            [ "openpyxl" ],
            [ "xlsxwriter" ],
            [ "xlrd" ],
            [ "numpy" ],
            [ "pillow" ],
            [ "google-ads" ],
            [ "colour" ],
            [ "colour-science" ],
            [ "opencv-python" ],
            [ "opencv-contrib-python" ],
            [ "hypercorn" ],
            [ "google.ads" ],
            [ "binascii" ],
            [ "google-generativeai" ],
            [ "prettytable" ],
        ]

        self.upgrade = [
            # 업그레이드할 파이썬 모듈 목록
            [ "google-api-core" ],
            [ "google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib" ],
            [ "oauth2client" ],
            [ "google-analytics-data" ],
            [ "google-generativeai" ],
        ]

        # 사용자 홈 디렉토리 경로를 설정합니다.
        self.homeDir = str(Path.home())

        # 현재 시간 정보를 가져와 임시 디렉토리 이름을 설정합니다.
        now = time.gmtime(time.time())
        tempDirName = "pythonModuleInstall" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec)
        self.tempDir = self.homeDir + "/" + tempDirName

        # 현재 작업 디렉토리 경로와 모듈 폴더 경로를 설정합니다.
        thisFileArr = os.getcwd().split('/')
        self.robotPath = '/'.join(thisFileArr)
        self.moduleFolder = "python_modules"
        self.modulePath = self.robotPath + "/" + self.moduleFolder

    def setTempDir(self):
        """
        임시 모듈 설치 디렉토리를 생성합니다.
        """
        os.makedirs(self.tempDir)  # 임시 디렉토리를 생성합니다.

    def moduleInstall(self, local=True):
        """
        파이썬 모듈을 설치하고 업그레이드합니다.
        설치할 모듈과 업그레이드할 모듈은 self.install 및 self.upgrade에 정의되어 있습니다.
        @param {bool} local - 로컬에 모듈을 설치할지 여부를 결정합니다. 기본값은 True입니다.
        """
        target = "--target=" + self.tempDir  # 설치 경로를 설정합니다.

        # 기본 모듈을 설치하는 루프
        for module in self.install:
            commandList = []
            if not local:
                commandList.append("sudo")  # 로컬 설치가 아닐 경우 sudo 명령어를 추가합니다.
            commandList.append("pip3")
            commandList.append("install")
            for m in module:
                commandList.append(m)  # 설치할 모듈을 추가합니다.
            if local:
                commandList.append(target)  # 로컬 설치 시 타겟 경로를 추가합니다.
            subprocess.run(commandList, shell=False, encoding='utf8')  # pip 명령어를 실행합니다.

        # 업그레이드할 모듈을 처리하는 루프
        for module in self.upgrade:
            commandList = []
            if not local:
                commandList.append("sudo")
            commandList.append("pip3")
            commandList.append("install")
            commandList.append("--upgrade")  # 업그레이드 플래그를 추가합니다.
            for m in module:
                commandList.append(m)
            if local:
                commandList.append(target)
            subprocess.run(commandList, shell=False, encoding='utf8')

    def moveModules(self):
        """
        임시 디렉토리에 설치된 모듈을 최종 모듈 디렉토리로 이동합니다.
        """
        bridge = self.homeDir + "/" + self.moduleFolder  # 홈 디렉토리의 모듈 폴더 경로를 설정합니다.
        os.rename(self.tempDir, bridge)  # 임시 디렉토리를 모듈 폴더로 변경합니다.
        shutil.move(bridge, self.robotPath)  # 모듈 폴더를 최종 경로로 이동합니다.

    def ignoreDirs(self):
        """
        설치 중 무시할 디렉토리를 설정합니다.
        여기서는 /temp 디렉토리를 생성합니다.
        """
        targetList = [
            "/temp",
        ]
        for dir in targetList:
            subprocess.run([ "mkdir", (self.robotPath + dir) ], shell=False, encoding='utf8')  # 지정된 디렉토리를 생성합니다.

    def installServer(self):
        """
        서버 설치 프로세스를 처리하는 메서드입니다.
        임시 디렉토리를 생성하고, 필요한 모듈을 설치하고, 디렉토리를 설정합니다.
        """
        self.setTempDir()  # 임시 디렉토리를 설정합니다.
        self.ignoreDirs()  # 무시할 디렉토리를 설정합니다.
        self.moduleInstall(local=True)  # 로컬에 모듈을 설치합니다.
        self.moveModules()  # 모듈을 최종 디렉토리로 이동합니다.

try:
    installApps = RobotInstall()  # RobotInstall 클래스의 인스턴스를 생성합니다.
    installApps.installServer()  # 서버 설치 작업을 실행합니다.

except Exception as e:
    """
    설치 중 오류가 발생하면 이를 처리합니다.
    """
    print(e)  # 오류 메시지를 출력합니다.
    sys.exit()  # 스크립트를 종료합니다.