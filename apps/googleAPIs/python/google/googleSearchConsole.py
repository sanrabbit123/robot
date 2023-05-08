from os import path as osPath
import argparse
from json import dumps
from apiclient.discovery import build
import httplib2
from oauth2client import client
from oauth2client import file
from oauth2client import tools

class GoogleSearchConsole:

    def __init__(self):
        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        clientSecrets = thisFolderPath + '/tokens/search_client_secrets.json'
        parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter, parents=[ tools.argparser ])
        flags = parser.parse_args([])
        flow = client.flow_from_clientsecrets(clientSecrets, scope=[ 'https://www.googleapis.com/auth/webmasters' ], message=tools.message_if_missing(clientSecrets))
        storage = file.Storage(thisFolderPath + '/tokens/webmasters.dat')
        credentials = storage.get()
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)
        http = credentials.authorize(http=httplib2.Http())

        self.app = build('webmasters', 'v3', http=http)

    def basicImpressions(self, startDate, endDate):
        request = { "startDate": startDate, "endDate": endDate, "dimensions": [ "date" ] }
        response = self.app.searchanalytics().query(siteUrl="https://home-liaison.com", body=request).execute()
        return response

    def queryImpressions(self, startDate, endDate):
        request = { "startDate": startDate, "endDate": endDate, "dimensions": [ "query" ] }
        response = self.app.searchanalytics().query(siteUrl="https://home-liaison.com", body=request).execute()
        return response
