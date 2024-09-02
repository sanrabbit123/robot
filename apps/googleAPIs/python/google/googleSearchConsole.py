from os import path as osPath  # os 모듈의 경로 관련 기능을 가져옴
import argparse  # 명령줄 인자를 쉽게 처리하기 위한 모듈
from json import dumps  # JSON 데이터를 문자열로 변환하는 데 사용되는 함수
from apiclient.discovery import build  # Google API 클라이언트 라이브러리에서 API 서비스를 생성하는 함수
import httplib2  # HTTP 클라이언트 라이브러리
from oauth2client import client  # OAuth 2.0 클라이언트 라이브러리
from oauth2client import file  # OAuth 2.0 클라이언트의 파일 스토리지
from oauth2client import tools  # OAuth 2.0 클라이언트의 도구들

class GoogleSearchConsole:

    def __init__(self):
        """
        GoogleSearchConsole 클래스의 생성자 메서드로, Google Search Console API에 접근하기 위한 인증을 처리하고 
        Search Console API 서비스를 초기화합니다.
        """

        # 현재 스크립트 파일의 절대 경로를 가져옴
        thisAppPath = osPath.abspath(__file__)

        # 경로를 '/'로 분리하여 리스트로 변환
        thisAppPathArr = thisAppPath.split('/')

        # 리스트의 마지막 요소(파일명)를 제거
        thisAppPathArr.pop()

        # 리스트를 다시 '/'로 결합하여 현재 디렉토리 경로를 생성
        thisFolderPath = '/'.join(thisAppPathArr)

        # 클라이언트 비밀 파일 경로를 설정
        clientSecrets = thisFolderPath + '/tokens/search_client_secrets.json'

        # 명령줄 인자 파서를 설정
        parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter, parents=[tools.argparser])

        # 명령줄 인자를 파싱하여 플래그로 변환
        flags = parser.parse_args([])

        # OAuth 2.0 플로우를 설정
        flow = client.flow_from_clientsecrets(clientSecrets, scope=['https://www.googleapis.com/auth/webmasters'], message=tools.message_if_missing(clientSecrets))

        # 토큰을 저장할 파일 스토리지를 설정
        storage = file.Storage(thisFolderPath + '/tokens/webmasters.dat')

        # 저장된 자격 증명을 로드
        credentials = storage.get()

        # 자격 증명이 없거나 유효하지 않으면 새로 인증을 시도
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)

        # 인증된 HTTP 객체를 생성
        http = credentials.authorize(http=httplib2.Http())

        # Search Console API 서비스를 초기화하고 self.app 속성에 할당
        self.app = build('webmasters', 'v3', http=http)

    def basicImpressions(self, startDate, endDate):
        """
        지정된 기간 동안의 기본 노출 수를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @return: 조회된 통계 데이터의 응답 객체
        """
        # 요청을 생성하여 시작 날짜와 종료 날짜를 설정하고, 날짜별로 노출 수를 조회
        request = {"startDate": startDate, "endDate": endDate, "dimensions": ["date"]}

        # Search Console API를 사용하여 데이터를 조회하고 응답을 반환
        response = self.app.searchanalytics().query(siteUrl="https://home-liaison.com", body=request).execute()
        return response

    def queryImpressions(self, startDate, endDate):
        """
        지정된 기간 동안의 검색 쿼리별 노출 수를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @return: 조회된 통계 데이터의 응답 객체
        """
        # 요청을 생성하여 시작 날짜와 종료 날짜를 설정하고, 쿼리별로 노출 수를 조회
        request = {"startDate": startDate, "endDate": endDate, "dimensions": ["query"]}

        # Search Console API를 사용하여 데이터를 조회하고 응답을 반환
        response = self.app.searchanalytics().query(siteUrl="https://home-liaison.com", body=request).execute()
        return response