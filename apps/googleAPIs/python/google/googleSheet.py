from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps
from os import path as osPath

class GoogleSheet:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/token.pickle'):
            with open((thisFolderPath + '/tokens/token.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/spreadsheets' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/token.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready sheet app
        service = build('sheets', 'v4', credentials=creds)
        self.app = service.spreadsheets()


    def getValue(self, id, range):
        result = self.app.values().get(spreadsheetId=id, range=range).execute()
        values = result.get('values', [])
        return dumps(values)


    def updateValue(self, id, range, values):
        request = self.app.values().update(spreadsheetId=id, range=range, valueInputOption="RAW", body={ "range": range, "values": values })
        response = request.execute()
        return dumps({ "response": response })
