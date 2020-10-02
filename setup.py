import subprocess
import time
from pathlib import Path
from os import path as osPath

# install list
install = [
    [ "notion" ],
    [ "flask" ],
    [ "pymysql" ],
    [ "pymongo" ],
    [ "argparse" ]
]

# upgrade list
upgrade = [
    [ "google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib" ],
    [ "oauth2client" ],
]

# set temp dir
now = time.gmtime(time.time())
tempDirName = "pythonModuleInstall" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec)
homeDir = str(Path.home())
tempDir = homeDir + "/" + tempDirName
subprocess.run([ "mkdir", tempDir ], shell=False, encoding='utf8')

# module install
target = "--target=" + tempDir
for module in install:
    commandList = []
    commandList.append("pip3")
    commandList.append("install")
    for m in module:
        commandList.append(m)
    commandList.append(target)
    subprocess.run(commandList, shell=False, encoding='utf8')
for module in upgrade:
    commandList = []
    commandList.append("pip3")
    commandList.append("install")
    commandList.append("--upgrade")
    for m in module:
        commandList.append(m)
    commandList.append(target)
    subprocess.run(commandList, shell=False, encoding='utf8')

# move module folder
newName = "python_modules"
thisFile = osPath.abspath(__file__)
thisFileArr = thisFile.split('/')
thisFileArr.pop()
robotPath = '/'.join(thisFileArr)
subprocess.run([ "mv", tempDir, (homeDir + "/" + newName) ], shell=False, encoding='utf8')
subprocess.run([ "mv", (homeDir + "/" + newName), (robotPath + "/" + newName) ], shell=False, encoding='utf8')
