from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from os import path as osPath
import time

class GoogleDocs:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/docsToken.pickle'):
            with open((thisFolderPath + '/tokens/docsToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/documents' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/docsToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready sheet app
        service = build('docs', 'v1', credentials=creds)
        self.app = service.documents()

    def readDocs(self, id):
        document = self.app.get(documentId=id).execute()
        return document

    def createDocs(self, title="none"):
        document = self.app.create(body={ 'title': title }).execute()
        return document["documentId"]

    def insertText(self, id, longText):
        textList = longText.split("\n")
        requests = []
        num = 1
        for i in textList:
            requests.append({ "insertText": { "location": { "index": num, }, "text": i + "\n" } })
            num = num + i.__len__() + 1
        self.app.batchUpdate(documentId=id, body={ "requests": requests }).execute()

    def insertWords(self, id, index, text):
        try:
            requests = []
            requests.append({ "insertText": { "location": { "index": index, }, "text": text + "\n" } })
            self.app.batchUpdate(documentId=id, body={ "requests": requests }).execute()
            return index + text.__len__() + 1
        except Exception as e:
            return "error"

    def insertImage(self, id, index, url, gs="g"):
        try:
            seroUnit = 222
            garoUnit = 448
            unit = garoUnit
            if gs == "g":
                unit = garoUnit
            else:
                unit = seroUnit
            requests = []
            requests.append({
                "insertInlineImage": {
                    "location": { "index": index },
                    "uri": url,
                    "objectSize": {
                        "width": { "magnitude": unit, "unit": "PT" }
                    }
                }
            })
            self.app.batchUpdate(documentId=id, body={ "requests": requests }).execute()
            return index + 1
        except Exception as e:
            return "error"

    def insertContents(self, id, arr):
        index = 1
        pastIndex = 1
        num = 0
        for i in arr:
            if isinstance(i, list):
                pastIndex = index
                index = self.insertImage(id, index, i[0], i[1])
                while index == "error":
                    time.sleep(10)
                    index = pastIndex
                    index = self.insertImage(id, index, i[0], i[1])
                if i[1] == 'g':
                    pastIndex = index
                    index = self.insertWords(id, index, "\n")
                    while index == "error":
                        time.sleep(10)
                        index = pastIndex
                        index = self.insertWords(id, index, "\n")
                else:
                    num = num + 1
                    num = num % 2
                    if num == 0:
                        pastIndex = index
                        index = self.insertWords(id, index, "\n")
                        while index == "error":
                            time.sleep(10)
                            index = pastIndex
                            index = self.insertWords(id, index, "\n")
            else:
                pastIndex = index
                index = self.insertWords(id, index, i)
                while index == "error":
                    time.sleep(10)
                    index = pastIndex
                    index = self.insertWords(id, index, i)
