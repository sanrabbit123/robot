import sys

def returnModulepath():
    rawPath = os.getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "sector":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    sectorPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "sector": sectorPath, "module": modulPath }

try:
    pathDic = returnModulepath()
    sys.path.append(pathDic["module"])
except Exception as e:
    print(e)
