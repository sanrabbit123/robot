from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps
from os import path as osPath
import time

class GoogleForms:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/formsToken.pickle'):
            with open((thisFolderPath + '/tokens/formsToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/forms', 'https://www.googleapis.com/auth/drive' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/formsToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready sheet app
        service = build('forms', 'v1', credentials=creds)
        self.app = service.forms()

    def createForms(self, title="none"):
        form = self.app.create(body={ 'info': { 'title': title, 'documentTitle': title } }).execute()
        return form["formId"]

