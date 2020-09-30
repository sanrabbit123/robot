# set python modules ------------------------------------------------------------------------------------------------------

from os import path as osPath
from os import getcwd
from sys import argv, path
from json import loads, dumps

# return robot path
def returnModulepath():
    rawPath = getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "robot":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    robotPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "robot": robotPath, "module": modulPath }

# return json data
def getBridge():
    pathDic = returnModulepath()

    # name setting
    thisFile = osPath.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()
    name = fileArr[count - 3]

    # get bridge data
    with open(pathDic["robot"] + "/temp/" + name + ".json", 'r') as jsonFile:
        data = jsonFile.read()

    return loads(data)

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

import argparse
from json import dumps
from apiclient.discovery import build
import httplib2
from oauth2client import client
from oauth2client import file
from oauth2client import tools

class GoogleAnalysis:

    viewId = '148670049'
    app = None
    startDate = None
    endDate = None

    def __init__(self):
        thisApp = osPath.abspath(__file__)
        parser = argparse.ArgumentParser( formatter_class=argparse.RawDescriptionHelpFormatter, parents=[tools.argparser])
        flags = parser.parse_args([])
        flow = client.flow_from_clientsecrets( thisApp[0:-6] + 'client_secrets.json', scope=[ 'https://www.googleapis.com/auth/analytics.readonly' ], message=tools.message_if_missing(thisApp[0:-6] + 'client_secrets.json'))
        storage = file.Storage(thisApp[0:-6] + 'analyticsreporting.dat')
        credentials = storage.get()
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)
        http = credentials.authorize(http=httplib2.Http())
        self.app = build('analyticsreporting', 'v4', http=http)

    def getAllClients(self, standard, dimensions, users, index):
        target = dimensions[(0 + index):(2 + index)]
        target.append(standard)
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "dateRanges": [
                            { "startDate": self.startDate, "endDate": self.endDate }
                        ],
                        "dimensions": target,
                        "metrics": [
                            { "expression": "ga:sessions" },
                        ]
                    }
                ]
            }).execute()

        resultArr = []
        for report in result.get('reports', []):
            columnHeader = report.get('columnHeader', {})
        dimensionHeaders = columnHeader.get('dimensions', [])
        metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])
        rows = report.get('data', {}).get('rows', [])
        for row in rows:
            temp = {}
            dimensions = row.get('dimensions', [])
            dateRangeValues = row.get('metrics', [])
            for header, dimension in zip(dimensionHeaders, dimensions):
                temp[header[3:]] = dimension
            for i, values in enumerate(dateRangeValues):
                for metricHeader, value in zip(metricHeaders, values.get('values')):
                    for j in range(int(value)):
                        resultArr.append(temp)

        return resultArr


    def launching(self, startDate, endDate, standard, dimensions, users, index):
        self.startDate = startDate
        self.endDate = endDate
        return dumps(self.getAllClients(standard, dimensions, users, index))


analyticsApp = GoogleAnalysis()
data = getBridge()
result = analyticsApp.launching(data["startDate"], data["endDate"], data["standard"], data["dimensions"], data["users"], int(argv[1]))

print(result)
