import subprocess
import time
import sys
from pathlib import Path
from os import path as osPath

class HumanInstall:
    def __init__(self):
        self.install = [
            [ "quart" ],
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
        ]

        self.upgrade = [
            [ "google-api-core" ],
            [ "google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib" ],
            [ "oauth2client" ],
            [ "google-analytics-data" ],
        ]

        self.homeDir = str(Path.home())

        now = time.gmtime(time.time())
        tempDirName = "pythonModuleInstall" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec)
        self.tempDir = self.homeDir + "/" + tempDirName

        thisFile = osPath.abspath(__file__)
        thisFileArr = thisFile.split('/')
        thisFileArr.pop()
        self.humanPath = '/'.join(thisFileArr)
        self.moduleFolder = "python_modules"
        self.modulePath = self.humanPath + "/" + self.moduleFolder

    def setTempDir(self):
        subprocess.run([ "mkdir", self.tempDir ], shell=False, encoding='utf8')

    def moduleInstall(self, local=True):
        target = "--target=" + self.tempDir
        for module in self.install:
            commandList = []
            if not local:
                commandList.append("sudo")
            commandList.append("pip3")
            commandList.append("install")
            for m in module:
                commandList.append(m)
            if local:
                commandList.append(target)
            subprocess.run(commandList, shell=False, encoding='utf8')
        for module in self.upgrade:
            commandList = []
            if not local:
                commandList.append("sudo")
            commandList.append("pip3")
            commandList.append("install")
            commandList.append("--upgrade")
            for m in module:
                commandList.append(m)
            if local:
                commandList.append(target)
            subprocess.run(commandList, shell=False, encoding='utf8')

    def moveModules(self):
        bridge = self.homeDir + "/" + self.moduleFolder
        subprocess.run([ "mv", self.tempDir, bridge ], shell=False, encoding='utf8')
        subprocess.run([ "mv", bridge, self.modulePath ], shell=False, encoding='utf8')

    def installServer(self):
        self.setTempDir()
        self.moduleInstall(local=True)
        self.moveModules()

try:
    installApps = HumanInstall()
    installApps.installServer()

except Exception as e:
    print(e)
    sys.exit()
