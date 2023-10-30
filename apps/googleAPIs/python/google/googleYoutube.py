from __future__ import print_function
import os
from os import path as osPath
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps

class GoogleYoutube:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/youtubeToken.pickle'):
            with open((thisFolderPath + '/tokens/youtubeToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/youtube_client_secrets.json'), [ 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/youtubeToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready youtube app
        youtube = build('youtubeAnalytics', 'v2', credentials=creds)
        self.app = youtube

    def channelNumbers(self, startDate, endDate):
        result = self.app.reports().query(ids='channel==MINE', startDate=startDate, endDate=endDate, dimensions="channel", metrics='views,likes,subscribersGained,shares').execute()
        return result['rows'][0][1:]
