from os import path as osPath
import argparse
from json import dumps
from apiclient.discovery import build
import httplib2
from oauth2client import client
from oauth2client import file
from oauth2client import tools

class GoogleAnalytics:

    def __init__(self):

        self.viewId = '148670049'

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        clientSecrets = thisFolderPath + '/tokens/client_secrets.json'
        parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter, parents=[ tools.argparser ])
        flags = parser.parse_args([])
        flow = client.flow_from_clientsecrets(clientSecrets, scope=[ 'https://www.googleapis.com/auth/analytics' ], message=tools.message_if_missing(clientSecrets))
        storage = file.Storage(thisFolderPath + '/tokens/analyticsreporting.dat')
        credentials = storage.get()
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)
        http = credentials.authorize(http=httplib2.Http())

        # ready analytics app
        self.app = build('analyticsreporting', 'v4', http=http)


    def clientsIdTesting(self, startDate, endDate):
        total = self.app.reports().batchGet(body={ "reportRequests": [ { "viewId": self.viewId, "pageSize": 100000, "dateRanges": [ { "startDate": startDate, "endDate": endDate } ], "dimensions": [], "metrics": [ { "expression": "ga:users" } ] } ] }).execute()
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            { "startDate": startDate, "endDate": endDate }
                        ],
                        "dimensions": [
                            { "name": "ga:clientId" },
                        ],
                        "metrics": [
                            { "expression": "ga:users" },
                        ]
                    }
                ]
            }).execute()
        return dumps({ "totalNum": int(total["reports"][0]["data"]["totals"][0]["values"][0]), "data": result["reports"][0]["data"] })


    def getAllClients(self, startDate, endDate, dimensionsList, clientsBox):
        totalTong = {}
        for c in range(10):
            result = self.app.reports().batchGet(
                body={
                    "reportRequests": [
                        {
                            "viewId": self.viewId,
                            "pageSize": 100000,
                            "dateRanges": [
                                { "startDate": startDate, "endDate": endDate }
                            ],
                            "dimensions": dimensionsList,
                            "dimensionFilterClauses": [
                                {
                                    "filters": [
                                        {
                                            "dimensionName": "ga:clientId",
                                            "expressions": [ clientsBox[c] ],
                                        }
                                    ]
                                }
                            ],
                            "metrics": [
                                { "expression": "ga:users" },
                            ]
                        }
                    ]
                }).execute()
            totalTong[c] = result

        return dumps(totalTong)


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


    def getAgeGender(self):
        def returnObj(dimension):
            return {
                "viewId": self.viewId,
                "pageSize": 100000,
                "dateRanges": [
                    { "startDate": "2019-03-01", "endDate": "today" }
                ],
                "dimensions": [
                    dimension,
                ],
                "metrics": [
                    { "expression": "ga:users" },
                ]
            }

        dic0 = returnObj({ "name": "ga:userAgeBracket" })
        dic1 = returnObj({ "name": "ga:userGender" })

        result0 = self.app.reports().batchGet(body={ "reportRequests": [ dic0 ] }).execute()
        result1 = self.app.reports().batchGet(body={ "reportRequests": [ dic1 ] }).execute()

        return dumps({ "age": result0, "gender": result1 })
