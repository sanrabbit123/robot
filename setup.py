import subprocess
import time
import sys
import os
import shutil
from pathlib import Path
from os import path as osPath

class RobotInstall:
    def __init__(self):
        self.install = [
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
            [ "openai" ],
            [ "prettytable" ],
        ]

        self.upgrade = [
            [ "google-api-core" ],
            [ "google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib" ],
            [ "oauth2client" ],
            [ "google-analytics-data" ],
            [ "google-generativeai" ],
            [ "openai" ],
        ]

        self.homeDir = str(Path.home())

        now = time.gmtime(time.time())
        tempDirName = "pythonModuleInstall" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec)
        self.tempDir = self.homeDir + "/" + tempDirName

        thisFileArr = os.getcwd().split('/')
        self.robotPath = '/'.join(thisFileArr)
        self.moduleFolder = "python_modules"
        self.modulePath = self.robotPath + "/" + self.moduleFolder

    def setTempDir(self):
        os.makedirs(self.tempDir)

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
        os.rename(self.tempDir, bridge)
        shutil.move(bridge, self.robotPath)

    def ignoreDirs(self):
        targetList = [
            "/temp",
        ]
        for dir in targetList:
            subprocess.run([ "mkdir", (self.robotPath + dir) ], shell=False, encoding='utf8')

    def installServer(self):
        self.setTempDir()
        self.ignoreDirs()
        self.moduleInstall(local=True)
        self.moveModules()

try:
    installApps = RobotInstall()
    installApps.installServer()

except Exception as e:
    print(e)
    sys.exit()
