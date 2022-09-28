from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps
from os import path as osPath

class GoogleCalendar:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/calendarToken.pickle'):
            with open((thisFolderPath + '/tokens/calendarToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/calendar' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/calendarToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready sheet app
        service = build('calendar', 'v3', credentials=creds)
        self.app = service


    def listEvents(self, id, query):
        tong = []
        nextToken = None
        while True:
            events_result = self.app.events().list(calendarId=id, showDeleted=False,
                                                  showHiddenInvitations=True, singleEvents=True,
                                                  maxResults=250, orderBy='startTime', q=query,
                                                  pageToken=nextToken,
                                                  timeZone='Asia/Seoul').execute()
            events = events_result.get('items', [])
            if not events:
                tong.extend([])
            else:
                tong.extend(events)
            if "nextPageToken" in events_result:
                nextToken = events_result["nextPageToken"]
            else:
                break

        return dumps(tong)


    def makeSchedule(self, id, body):
        event = self.app.events().insert(calendarId=id, body=body).execute()
        return dumps({ "id": event.get("id"), "link": event.get("htmlLink") })


    def updateSchedule(self, id, event, body):
        self.app.events().update(calendarId=id, eventId=event, body=body).execute()
        return dumps({ "message": "done" })


    def deleteSchedule(self, id, event):
        self.app.events().delete(calendarId=id, eventId=event).execute()
        return dumps({ "message": "done" })
