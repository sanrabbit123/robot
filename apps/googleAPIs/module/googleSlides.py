from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps
from os import path as osPath
import time

class GoogleSlides:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/slidesToken.pickle'):
            with open((thisFolderPath + '/tokens/slidesToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/presentations' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/slidesToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready sheet app
        service = build('slides', 'v1', credentials=creds)
        self.app = service.presentations()

    def createSlides(self, title="none"):
        presentation = self.app.create(body={ 'title': title }).execute()
        return presentation["presentationId"]
