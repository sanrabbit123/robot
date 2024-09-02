from os import path as osPath  # os 모듈의 경로 관련 기능을 가져옴
import pickle  # 파이썬 객체를 직렬화 및 역직렬화하는 데 사용되는 모듈
from googleapiclient.discovery import build  # Google API 클라이언트 라이브러리에서 API 서비스를 생성하는 함수
from google_auth_oauthlib.flow import InstalledAppFlow  # OAuth 2.0 인증을 위한 흐름을 관리하는 클래스
from google.auth.transport.requests import Request  # Google API 클라이언트 라이브러리에서 HTTP 요청을 처리하는 클래스
from json import dumps  # JSON 데이터를 문자열로 변환하는 데 사용되는 함수

class GoogleYoutube:

    def __init__(self):
        """
        GoogleYoutube 클래스의 생성자 메서드로, YouTube API에 접근하기 위한 인증을 처리하고 
        YouTube Analytics API 서비스를 초기화합니다.
        """

        # 현재 스크립트 파일의 절대 경로를 가져옴
        thisAppPath = osPath.abspath(__file__)

        # 경로를 '/'로 분리하여 리스트로 변환
        thisAppPathArr = thisAppPath.split('/')

        # 리스트의 마지막 요소(파일명)를 제거
        thisAppPathArr.pop()

        # 리스트를 다시 '/'로 결합하여 현재 디렉토리 경로를 생성
        thisFolderPath = '/'.join(thisAppPathArr)

        # 접근 토큰을 저장할 변수를 초기화
        creds = None

        # 기존의 저장된 토큰 파일이 있는지 확인
        if osPath.exists(thisFolderPath + '/tokens/youtubeToken.pickle'):
            # 토큰 파일이 존재하면 파일을 열고 내용을 creds 변수에 로드
            with open((thisFolderPath + '/tokens/youtubeToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        # creds가 존재하지 않거나 유효하지 않다면 새로운 인증을 시도
        if not creds or not creds.valid:
            # creds가 만료되었고 갱신 토큰이 있다면 갱신을 시도
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                # 그렇지 않다면 새로 인증을 받아야 하므로 클라이언트 비밀 파일을 로드하고 인증 흐름을 시작
                flow = InstalledAppFlow.from_client_secrets_file(
                    thisFolderPath + ('/tokens/youtube_client_secrets.json'), 
                    ['https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube']
                )
                creds = flow.run_local_server(port=0)

            # 인증을 완료한 후 새로운 토큰을 파일에 저장
            with open((thisFolderPath + '/tokens/youtubeToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # YouTube Analytics API 서비스를 초기화하고 self.app 속성에 할당
        youtube = build('youtubeAnalytics', 'v2', credentials=creds)
        self.app = youtube

    def channelNumbers(self, startDate, endDate):
        """
        YouTube 채널의 조회수, 좋아요 수, 구독자 수 증가, 공유 수를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @return: 조회된 통계 데이터의 리스트 (조회수, 좋아요 수, 구독자 수 증가, 공유 수)
        """
        # YouTube Analytics API를 사용하여 통계를 조회하고 결과를 반환
        result = self.app.reports().query(
            ids='channel==MINE', 
            startDate=startDate, 
            endDate=endDate, 
            dimensions="channel", 
            metrics='views,likes,subscribersGained,shares'
        ).execute()

        # 조회된 결과에서 통계 데이터를 추출하여 반환
        return result['rows'][0][1:]