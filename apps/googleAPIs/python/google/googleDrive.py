from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps
from os import path as osPath

class GoogleDrive:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/driveToken.pickle'):
            with open((thisFolderPath + '/tokens/driveToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/drive' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/driveToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready sheet app
        service = build('drive', 'v3', credentials=creds)
        self.app = service


    def fileUpload(self, folder_id, file):
        fileArr = file.split("/")
        file_metadata = { 'name': fileArr[fileArr.__len__() - 1], 'parents': [ folder_id ] }
        media = MediaFileUpload(file)
        result = self.app.files().create(body=file_metadata, media_body=media, fields='id').execute()
        return dumps({ "id": result.get('id') })


    def makeFolder(self, folderName):
        file_metadata = {
            'name': folderName,
            'mimeType': 'application/vnd.google-apps.folder'
        }
        file = self.app.files().create(body=file_metadata, fields='id').execute()
        return dumps({ "id": file.get('id') })


    def moveFolder(self, targetId, parent):
        file = self.app.files().get(fileId=targetId, fields='parents').execute()
        previous_parents = ",".join(file.get('parents'))
        file = self.app.files().update(fileId=targetId,
                                            addParents=parent,
                                            removeParents=previous_parents,
                                            fields='id, parents').execute()
        return dumps({ "message": "success" })


    def permissionsOn(self, id):
        def callback(request_id, response, exception):
            if exception:
                print(exception)
            else:
                print(response.get('id'))

        batch = self.app.new_batch_http_request(callback=callback)
        user_permission = {
            'type': 'anyone',
            'role': 'reader',
        }
        batch.add(self.app.permissions().create(
                fileId=id,
                body=user_permission,
                fields='id',
        ))
        batch.execute()
        webViewLink = self.app.files().get(
                fileId=id,
                fields='webViewLink',
        ).execute()
        return dumps({ "link": webViewLink["webViewLink"] })

    def webPublish(self, file_id):
        revision = {}
        revision['published'] = True
        revision['publishAuto'] = True
        self.app.revisions().update(fileId=file_id, revisionId='1', body=revision).execute()
        return dumps({ "link": "https://docs.google.com/spreadsheets/d/" + file_id + "/pubhtml?widget=true&headers=false&embedded=true" })

    def searchId(self, name):
        response = self.app.files().list(q=f"name contains '{name}'", spaces='drive').execute()
        id = None
        for file in response.get('files', []):
            id = file.get('id')
            break
        return dumps({ "id": id })
