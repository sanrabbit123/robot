import subprocess
import time
import sys
from pathlib import Path
from os import path as osPath

class RobotInstall:
    def __init__(self):
        self.install = [
            [ "notion" ],
            [ "flask" ],
            [ "pymysql" ],
            [ "pymongo" ],
            [ "argparse" ],
            [ "cryptography" ],
        ]
        self.upgrade = [
            [ "google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib" ],
            [ "oauth2client" ],
        ]
        self.homeDir = str(Path.home())

        now = time.gmtime(time.time())
        tempDirName = "pythonModuleInstall" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec)
        self.tempDir = self.homeDir + "/" + tempDirName

        thisFile = osPath.abspath(__file__)
        thisFileArr = thisFile.split('/')
        thisFileArr.pop()
        self.robotPath = '/'.join(thisFileArr)
        self.moduleFolder = "python_modules"
        self.modulePath = self.robotPath + "/" + self.moduleFolder

    def setTempDir(self):
        subprocess.run([ "mkdir", self.tempDir ], shell=False, encoding='utf8')

    def moduleInstall(self):
        target = "--target=" + self.tempDir
        for module in self.install:
            commandList = []
            commandList.append("pip3")
            commandList.append("install")
            for m in module:
                commandList.append(m)
            commandList.append(target)
            subprocess.run(commandList, shell=False, encoding='utf8')
        for module in self.upgrade:
            commandList = []
            commandList.append("pip3")
            commandList.append("install")
            commandList.append("--upgrade")
            for m in module:
                commandList.append(m)
            commandList.append(target)
            subprocess.run(commandList, shell=False, encoding='utf8')

    def moveModules(self):
        bridge = self.homeDir + "/" + self.moduleFolder
        subprocess.run([ "mv", self.tempDir, bridge ], shell=False, encoding='utf8')
        subprocess.run([ "mv", bridge, self.modulePath ], shell=False, encoding='utf8')

    def ignoreDirs(self):
        targetList = [
            "/binary",
            "/temp",
            "/apps/mapMaker/svgTong",
        ]
        for dir in targetList:
            subprocess.run([ "mkdir", (self.robotPath + "/" + dir) ], shell=False, encoding='utf8')

    def returnPath(self):
        return { "robotPath": self.robotPath, "modulePath": self.modulePath }

    def installServer(self):
        self.setTempDir()
        self.ignoreDirs()
        self.moduleInstall()
        self.moveModules()

try:
    if sys.argv.__len__() == 1:
        raise Exception("invaild arguments : 'install' or 'local' or 'refresh'")
    else:
        installApps = RobotInstall()
        if sys.argv[1] == 'install':
            installApps.installServer()
        pathDic = installApps.returnPath()
        robotPath = pathDic["robotPath"]
        modulePath = pathDic["modulePath"]
        sys.path.append(modulePath)
except Exception as e:
    print(e)
    sys.exit()

from cryptography.fernet import Fernet
class EnDecrypt:
    def __init__(self, key=None):
        if key is None:
            key = Fernet.generate_key()
        self.key = key
        self.f = Fernet(self.key)

    def encrypt(self, data):
        if isinstance(data, bytes):
            ou = self.f.encrypt(data)
        else:
            ou = self.f.encrypt(data.encode('utf-8'))
        return ou

    def decrypt(self, data):
        if isinstance(data, bytes):
            ou = self.f.decrypt(data)
        else:
            ou = self.f.decrypt(data.encode('utf-8'))
        return ou.decode('utf-8')

pemsName = {
    "key": robotPath + "/pems/guguKey.pem",
    "token": robotPath + "/pems/guguToken.pem",
    "infoObj": robotPath + "/apps/infoObj.js"
}

if sys.argv[1] == 'local':
    infoObjFile = open(pemsName["infoObj"], 'r')
    infoObj = infoObjFile.read()
    infoObjFile.close()

    key = Fernet.generate_key()
    enDecrypt = EnDecrypt(key)
    token = enDecrypt.encrypt(infoObj)

    subprocess.run([ "rm", "-rf", pemsName["key"] ], shell=False, encoding='utf8')
    subprocess.run([ "rm", "-rf", pemsName["token"] ], shell=False, encoding='utf8')

    with open(pemsName["key"], 'wb') as keyFile:
        keyFile.write(key)
    with open(pemsName["token"], 'wb') as tokenFile:
        tokenFile.write(token)

    targetPemKeyInput = input("target pems : 1.database 2.bridge 3.polling 4.password : ")
    targetPassword = False
    if targetPemKeyInput == '1':
        targetPemKey = "database.pem"
    elif targetPemKeyInput == '2':
        targetPemKey = "bridge.pem"
    elif targetPemKeyInput == '3':
        targetPemKey = "polling.pem"
    elif targetPemKeyInput == '4':
        targetPemKey = ""
        targetPassword = True

    targetIdHost = input("target id, host (type 'id@host') : ")
    targetRobotPath = input("target robot path (if type 'default' : path is '/home/centos/robot') : ")
    if targetRobotPath == "default":
        targetRobotPath = "/home/centos/robot"

    if not targetPassword:
        print("scp -i ./pems/" + targetPemKey + " -r ./pems " + targetIdHost + ":" + targetRobotPath)
    else:
        print("scp -r ./pems " + targetIdHost + ":" + targetRobotPath)

elif sys.argv[1] == 'install' or sys.argv[1] == 'refresh':
    if sys.argv[1] == 'refresh':
        subprocess.run([ "rm", "-rf", pemsName["infoObj"] ], shell=False, encoding='utf8')

    with open(pemsName["key"], 'rb') as keyFile:
        infoObjKey = keyFile.read()
    with open(pemsName["token"], 'rb') as tokenFile:
        infoObjToken = tokenFile.read()

    infoEnDecrypt = EnDecrypt(infoObjKey)
    infoObjString = infoEnDecrypt.decrypt(infoObjToken)

    with open(pemsName["infoObj"], 'w') as newInfoObj:
        newInfoObj.write(infoObjString)

    if sys.argv[1] == 'install':
        print("npm install")
        print("npm install -g pm2")
