from os import path as osPath
import argparse
from json import dumps
from apiclient.discovery import build
import httplib2
from oauth2client import client
from oauth2client import file
from oauth2client import tools
import time
import calendar

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


    def getSubmitClients(self, startDate, endDate, cliid):
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
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:pagePath",
                                        "operator": "REGEXP",
                                        "expressions": [ cliid ],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            { "expression": "ga:pageviews" },
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getInputBlurUsers(self, startDate, endDate):
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
                            { "name": "ga:dateHourMinute" },
                        ],
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:eventAction",
                                        "operator": "REGEXP",
                                        "expressions": [ "input" ],
                                    },
                                    {
                                        "dimensionName": "ga:eventAction",
                                        "operator": "REGEXP",
                                        "expressions": [ "address" ],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            { "expression": "ga:pageviews" },
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getGeneralMetric(self, startDate, endDate, dimensions):
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            { "startDate": startDate, "endDate": endDate }
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            { "expression": "ga:pageviews" },
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getEventMetric(self, startDate, endDate, dimensions):
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            { "startDate": startDate, "endDate": endDate }
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            { "expression": "ga:totalEvents" },
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getUserById(self, startDate, endDate, clientId, dimensions):
        dimensions.insert(0, { "name": "ga:dateHourMinute" })
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            { "startDate": startDate, "endDate": endDate }
                        ],
                        "dimensions": dimensions,
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:clientId",
                                        "expressions": [ clientId ],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            { "expression": "ga:pageviews" },
                        ]
                    }
                ]
            }).execute()

        return dumps(result)
