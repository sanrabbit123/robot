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
    startDate = None
    endDate = None


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
