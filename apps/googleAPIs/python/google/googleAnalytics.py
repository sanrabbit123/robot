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


    def getAMonthAgo(self):
        dic = {}
        now = time.localtime(time.time())
        monthAgo = time.localtime(time.time() - (60 * 60 * 24 * 30 * 3))

        now_year = str(now.tm_year)
        if now.tm_mon < 10:
            now_month = '0' + str(now.tm_mon)
        else:
            now_month = str(now.tm_mon)
        if now.tm_mday < 10:
            now_day = '0' + str(now.tm_mday)
        else:
            now_day = str(now.tm_mday)

        past_year = str(monthAgo.tm_year)
        if monthAgo.tm_mon < 10:
            past_month = '0' + str(monthAgo.tm_mon)
        else:
            past_month = str(monthAgo.tm_mon)
        if monthAgo.tm_mday < 10:
            past_day = '0' + str(monthAgo.tm_mday)
        else:
            past_day = str(monthAgo.tm_mday)

        dic["startDate"] = past_year + "-" + past_month + "-" + past_day
        dic["endDate"] = now_year + "-" + now_month + "-" + now_day

        return dic


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


    def getTodayClients(self):
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            { "startDate": "yesterday", "endDate": "today" }
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
                                        "expressions": [ "login" ],
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

    def getClientsByDate(self, startDate, endDate, dimensions):
        dimensions.insert(0, { "name": "ga:clientId" })
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


    def getClientById(self, clientId, dimensions):
        aMonthAgo = self.getAMonthAgo()
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            { "startDate": aMonthAgo["startDate"], "endDate": aMonthAgo["endDate"] }
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
