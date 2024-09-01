from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps, loads
from os import path as osPath
import datetime

class GoogleCalendar:
    """
    GoogleCalendar 클래스는 Google Calendar API와의 상호작용을 관리하며, 
    이벤트 조회, 생성, 수정, 삭제 등의 작업을 수행할 수 있습니다.
    """

    def __init__(self):
        """
        GoogleCalendar 클래스의 생성자입니다. 
        인증을 처리하고 Google Calendar 서비스 객체를 초기화합니다.
        """

        # 현재 파일의 절대 경로를 가져옵니다.
        thisAppPath = osPath.abspath(__file__)

        # 경로를 '/'를 기준으로 분리하여 배열로 만듭니다.
        thisAppPathArr = thisAppPath.split('/')

        # 배열의 마지막 요소를 제거하여 디렉토리 경로를 만듭니다.
        thisAppPathArr.pop()

        # 배열을 '/'로 다시 결합하여 디렉토리 경로를 문자열로 만듭니다.
        thisFolderPath = '/'.join(thisAppPathArr)

        # 인증 토큰을 저장할 변수 creds를 초기화합니다.
        creds = None

        # 인증 토큰 파일이 존재하는지 확인합니다.
        if osPath.exists(thisFolderPath + '/tokens/calendarToken.pickle'):
            # 인증 토큰 파일이 존재할 경우, 파일을 읽어와서 creds 변수에 저장합니다.
            with open((thisFolderPath + '/tokens/calendarToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        # 인증 토큰이 없거나, 유효하지 않을 경우
        if not creds or not creds.valid:
            # 토큰이 존재하지만 만료되었고, 리프레시 토큰이 있을 경우 토큰을 갱신합니다.
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                # 그렇지 않으면 사용자 인증을 수행하여 새 토큰을 발급받습니다.
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), ['https://www.googleapis.com/auth/calendar'])
                creds = flow.run_local_server(port=0)

            # 새로운 인증 토큰을 파일에 저장합니다.
            with open((thisFolderPath + '/tokens/calendarToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # Google Calendar API 서비스 객체를 초기화하여 self.app에 저장합니다.
        service = build('calendar', 'v3', credentials=creds)
        self.app = service


    def listEvents(self, id, query):
        """
        주어진 캘린더 ID와 검색 쿼리에 따라 캘린더 이벤트를 조회합니다.

        @param {str} id - 조회할 캘린더의 ID입니다.
        @param {str} query - 이벤트를 검색할 쿼리 문자열입니다.
        @returns {str} - 조회된 이벤트 목록을 JSON 문자열로 반환합니다.
        """
        tong = []  # 이벤트 목록을 저장할 리스트를 초기화합니다.
        nextToken = None  # 페이지 토큰을 초기화합니다.

        while True:
            # Google Calendar API를 사용하여 이벤트 목록을 조회합니다.
            events_result = self.app.events().list(calendarId=id, showDeleted=False,
                                                  showHiddenInvitations=True, singleEvents=True,
                                                  maxResults=250, orderBy='startTime', q=query,
                                                  pageToken=nextToken,
                                                  timeZone='Asia/Seoul').execute()
            # 조회된 이벤트 목록을 가져옵니다.
            events = events_result.get('items', [])
            
            # 이벤트가 없으면 빈 리스트를 추가합니다.
            if not events:
                tong.extend([])
            else:
                # 이벤트가 있을 경우 tong 리스트에 추가합니다.
                tong.extend(events)
            
            # 다음 페이지 토큰이 있는지 확인합니다.
            if "nextPageToken" in events_result:
                nextToken = events_result["nextPageToken"]
            else:
                # 다음 페이지가 없으면 반복을 종료합니다.
                break

        # 최종적으로 수집된 이벤트 목록을 JSON 문자열로 변환하여 반환합니다.
        return dumps(tong)

    def listEventsNonePast(self, id, query):
        """
        현재 시점을 기준으로 과거가 아닌 이벤트만 조회합니다.

        @param {str} id - 조회할 캘린더의 ID입니다.
        @param {str} query - 이벤트를 검색할 쿼리 문자열입니다.
        @returns {str} - 조회된 이벤트 목록을 JSON 문자열로 반환합니다.
        """
        tong = []  # 이벤트 목록을 저장할 리스트를 초기화합니다.
        nextToken = None  # 페이지 토큰을 초기화합니다.

        # 현재 시점을 가져옵니다.
        minTime = datetime.datetime.now()
        # 현재 시점을 밀리초 단위로 변환하고, 14일 전의 시간을 계산합니다.
        minTimeValue = ((int)(minTime.timestamp())) * 1000
        minTimeValue = (minTimeValue + ((-14) * (1000 * 60 * 60 * 24))) / 1000
        # 14일 전의 시점을 다시 datetime 객체로 변환합니다.
        newMinTime = datetime.datetime.fromtimestamp(minTimeValue)

        while True:
            # Google Calendar API를 사용하여 과거가 아닌 이벤트 목록을 조회합니다.
            events_result = self.app.events().list(calendarId=id, showDeleted=False,
                                                  showHiddenInvitations=True, singleEvents=True,
                                                  maxResults=250, orderBy='startTime', q=query,
                                                  pageToken=nextToken,
                                                  timeZone='Asia/Seoul',
                                                  timeMin=newMinTime.isoformat(timespec="microseconds")[0:19] + ".000Z").execute()
            # 조회된 이벤트 목록을 가져옵니다.
            events = events_result.get('items', [])
            
            # 이벤트가 없으면 빈 리스트를 추가합니다.
            if not events:
                tong.extend([])
            else:
                # 이벤트가 있을 경우 tong 리스트에 추가합니다.
                tong.extend(events)
            
            # 다음 페이지 토큰이 있는지 확인합니다.
            if "nextPageToken" in events_result:
                nextToken = events_result["nextPageToken"]
            else:
                # 다음 페이지가 없으면 반복을 종료합니다.
                break

        # 최종적으로 수집된 이벤트 목록을 JSON 문자열로 변환하여 반환합니다.
        return dumps(tong)

    def makeSchedule(self, id, body):
        """
        새로운 캘린더 이벤트를 생성합니다.

        @param {str} id - 이벤트를 생성할 캘린더의 ID입니다.
        @param {dict} body - 생성할 이벤트의 세부 정보가 포함된 딕셔너리입니다.
        @returns {str} - 생성된 이벤트의 ID와 링크를 JSON 문자열로 반환합니다.
        """
        # Google Calendar API를 사용하여 새로운 이벤트를 생성합니다.
        event = self.app.events().insert(calendarId=id, body=body).execute()
        # 생성된 이벤트의 ID와 링크를 JSON 문자열로 반환합니다.
        return dumps({ "id": event.get("id"), "link": event.get("htmlLink") })

    def updateSchedule(self, id, event, body):
        """
        기존의 캘린더 이벤트를 수정합니다.

        @param {str} id - 이벤트가 포함된 캘린더의 ID입니다.
        @param {str} event - 수정할 이벤트의 ID입니다.
        @param {dict} body - 수정할 이벤트의 세부 정보가 포함된 딕셔너리입니다.
        @returns {str} - 수정 작업의 결과 메시지를 JSON 문자열로 반환합니다.
        """
        # Google Calendar API를 사용하여 이벤트를 수정합니다.
        self.app.events().update(calendarId=id, eventId=event, body=body).execute()
        # 수정 작업이 완료되었음을 나타내는 메시지를 JSON 문자열로 반환합니다.
        return dumps({ "message": "done" })

    def deleteSchedule(self, id, event):
        """
        기존의 캘린더 이벤트를 삭제합니다.

        @param {str} id - 이벤트가 포함된 캘린더의 ID입니다.
        @param {str} event - 삭제할 이벤트의 ID입니다.
        @returns {str} - 삭제 작업의 결과 메시지를 JSON 문자열로 반환합니다.
        """
        # Google Calendar API를 사용하여 이벤트를 삭제합니다.
        self.app.events().delete(calendarId=id, eventId=event).execute()
        # 삭제 작업이 완료되었음을 나타내는 메시지를 JSON 문자열로 반환합니다.
        return dumps({ "message": "done" })

    def deleteSchedules(self, id, eventIdArr):
        """
        여러 개의 캘린더 이벤트를 삭제합니다.

        @param {str} id - 이벤트가 포함된 캘린더의 ID입니다.
        @param {str} eventIdArr - 삭제할 이벤트 ID 목록이 JSON 문자열로 인코딩된 배열입니다.
        @returns {str} - 삭제 작업의 결과 메시지를 JSON 문자열로 반환합니다.
        """
        # JSON 문자열로 인코딩된 이벤트 ID 배열을 파싱합니다.
        targetArr = loads(eventIdArr)
        # 각 이벤트 ID에 대해 삭제 작업을 수행합니다.
        for targetId in targetArr:
            self.app.events().delete(calendarId=id, eventId=targetId).execute()
        # 삭제 작업이 완료되었음을 나타내는 메시지를 JSON 문자열로 반환합니다.
        return dumps({ "message": "done" })