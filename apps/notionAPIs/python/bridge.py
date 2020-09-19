from os import path, getcwd
from json import loads

def getBridge():
    
    #name setting
    thisFile = path.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()
    name = fileArr[count - 3]

    #get bridge data
    jsonFile = open(getcwd() + "/temp/" + name + ".json", 'r')
    data = jsonFile.read()
    jsonFile.close()

    return loads(data)
