from os import path as osPath
import argparse
from json import dumps
from apiclient.discovery import build
import httplib2
from oauth2client import client
from oauth2client import file
from oauth2client import tools

class GoogleAnalytics:

    viewId = '148670049'
    app = None

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        clientSecrets = thisFolderPath + '/tokens/client_secrets.json'
        parser = argparse.ArgumentParser( formatter_class=argparse.RawDescriptionHelpFormatter, parents=[ tools.argparser ])
        flags = parser.parse_args([])
        flow = client.flow_from_clientsecrets(clientSecrets, scope=[ 'https://www.googleapis.com/auth/analytics' ], message=tools.message_if_missing(clientSecrets))
        storage = file.Storage(thisFolderPath + '/tokens/analyticsreporting.dat')
        credentials = storage.get()
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)
        http = credentials.authorize(http=httplib2.Http())

        # ready analytics app
        self.app = build('analyticsreporting', 'v4', http=http)


    def getAllClients(self, startDate, endDate, standard, dimensions, users, index):
        target = dimensions[(0 + index):(2 + index)]
        target.append(standard)
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            { "startDate": startDate, "endDate": endDate }
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
                dimensionValue = row.get('dimensions', [])
                dateRangeValues = row.get('metrics', [])
                for header, dimension in zip(dimensionHeaders, dimensionValue):
                    temp[header[3:]] = dimension
                for i, values in enumerate(dateRangeValues):
                    for metricHeader, value in zip(metricHeaders, values.get('values')):
                        for j in range(int(value)):
                            resultArr.append(temp)

        return dumps(resultArr)


    def getUserNumber(self, consulting=False):
        requestObj = {
            "viewId": self.viewId,
            "pageSize": 100000,
            "dateRanges": [
                { "startDate": "2019-03-01", "endDate": "today" }
            ],
            "dimensions": [
                { "name": "ga:year" },
                { "name": "ga:month" }
            ],
            "metrics": [
                { "expression": "ga:users" },
            ]
        }
        if consulting:
            requestObj["dimensionFilterClauses"] = [
                {
                    "filters": [
                        {
                            "dimensionName": "ga:pagePath",
                            "expressions": [ "consulting" ],
                        }
                    ]
                }
            ]

        result = self.app.reports().batchGet(
            body={
                "reportRequests": [ requestObj ]
            }).execute()

        return dumps(result)
