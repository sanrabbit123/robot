from os import path as osPath  # os 모듈의 경로 관련 기능을 가져옴
import argparse  # 명령줄 인자를 쉽게 처리하기 위한 모듈
from json import dumps  # JSON 데이터를 문자열로 변환하는 데 사용되는 함수
from apiclient.discovery import build  # Google API 클라이언트 라이브러리에서 API 서비스를 생성하는 함수
import httplib2  # HTTP 클라이언트 라이브러리
from oauth2client import client  # OAuth 2.0 클라이언트 라이브러리
from oauth2client import file  # OAuth 2.0 클라이언트의 파일 스토리지
from oauth2client import tools  # OAuth 2.0 클라이언트의 도구들

class GoogleAnalytics:

    def __init__(self):
        """
        GoogleAnalytics 클래스의 생성자 메서드로, Google Analytics API에 접근하기 위한 인증을 처리하고 
        Analytics Reporting API 서비스를 초기화합니다.
        """

        # Google Analytics 계정에서 조회할 View ID를 설정
        self.viewId = '148670049'

        # 현재 스크립트 파일의 절대 경로를 가져옴
        thisAppPath = osPath.abspath(__file__)

        # 경로를 '/'로 분리하여 리스트로 변환
        thisAppPathArr = thisAppPath.split('/')

        # 리스트의 마지막 요소(파일명)를 제거
        thisAppPathArr.pop()

        # 리스트를 다시 '/'로 결합하여 현재 디렉토리 경로를 생성
        thisFolderPath = '/'.join(thisAppPathArr)

        # 클라이언트 비밀 파일 경로를 설정
        clientSecrets = thisFolderPath + '/tokens/client_secrets.json'

        # 명령줄 인자 파서를 설정
        parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter, parents=[tools.argparser])

        # 명령줄 인자를 파싱하여 플래그로 변환
        flags = parser.parse_args([])

        # OAuth 2.0 플로우를 설정
        flow = client.flow_from_clientsecrets(clientSecrets, scope=['https://www.googleapis.com/auth/analytics'], message=tools.message_if_missing(clientSecrets))

        # 토큰을 저장할 파일 스토리지를 설정
        storage = file.Storage(thisFolderPath + '/tokens/analyticsreporting.dat')

        # 저장된 자격 증명을 로드
        credentials = storage.get()

        # 자격 증명이 없거나 유효하지 않으면 새로 인증을 시도
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)

        # 인증된 HTTP 객체를 생성
        http = credentials.authorize(http=httplib2.Http())

        # Analytics Reporting API 서비스를 초기화하고 self.app 속성에 할당
        self.app = build('analyticsreporting', 'v4', http=http)


    def getSubmitClients(self, startDate, endDate, cliid):
        """
        특정 기간 동안 제출된 클라이언트 ID와 관련된 페이지 조회수를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param cliid: 조회할 클라이언트 ID에 대한 정규식 표현
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": [
                            {"name": "ga:clientId"},
                        ],
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:pagePath",
                                        "operator": "REGEXP",
                                        "expressions": [cliid],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            {"expression": "ga:pageviews"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getInputBlurUsers(self, startDate, endDate):
        """
        특정 기간 동안 'input' 및 'address' 이벤트가 발생한 사용자들의 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": [
                            {"name": "ga:clientId"},
                            {"name": "ga:dateHourMinute"},
                        ],
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:eventAction",
                                        "operator": "REGEXP",
                                        "expressions": ["input"],
                                    },
                                    {
                                        "dimensionName": "ga:eventAction",
                                        "operator": "REGEXP",
                                        "expressions": ["address"],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            {"expression": "ga:pageviews"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getGeneralMetric(self, startDate, endDate, dimensions):
        """
        특정 기간 동안의 일반적인 메트릭 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            {"expression": "ga:pageviews"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getGeneralMetricById(self, startDate, endDate, clientId, dimensions):
        """
        특정 클라이언트 ID에 대한 일반적인 메트릭 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param clientId: 조회할 클라이언트 ID
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:clientId",
                                        "expressions": [clientId],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            {"expression": "ga:pageviews"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getUserMetric(self, startDate, endDate, dimensions):
        """
        특정 기간 동안의 사용자 관련 메트릭 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            {"expression": "ga:users"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getTimeMetric(self, startDate, endDate, dimensions):
        """
        특정 기간 동안의 세션 시간 관련 메트릭 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            {"expression": "ga:sessionDuration"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getOutMetric(self, startDate, endDate, dimensions):
        """
        특정 기간 동안의 이탈 관련 메트릭 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            {"expression": "ga:bounces"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getSessionMetric(self, startDate, endDate, dimensions):
        """
        특정 기간 동안의 세션 관련 메트릭 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            {"expression": "ga:sessions"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getEventMetric(self, startDate, endDate, dimensions):
        """
        특정 기간 동안의 이벤트 관련 메트릭 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "metrics": [
                            {"expression": "ga:totalEvents"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getPopupOpenDetail(self, startDate, endDate, dimensions):
        """
        특정 기간 동안 'popupOpen' 이벤트와 관련된 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:eventAction",
                                        "operator": "REGEXP",
                                        "expressions": ["popupOpen"],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            {"expression": "ga:totalEvents"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getConsultingPageDetail(self, startDate, endDate, dimensions):
        """
        특정 기간 동안 'consulting.php' 페이지와 관련된 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # Analytics Reporting API를 사용하여 데이터를 조회하고 응답을 반환
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:pagePath",
                                        "operator": "REGEXP",
                                        "expressions": ["consulting.php"],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            {"expression": "ga:pageviews"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)


    def getUserById(self, startDate, endDate, clientId, dimensions):
        """
        특정 클라이언트 ID에 대한 사용자 데이터를 조회하는 메서드입니다.
        
        @param startDate: 조회할 통계의 시작 날짜 (YYYY-MM-DD 형식)
        @param endDate: 조회할 통계의 종료 날짜 (YYYY-MM-DD 형식)
        @param clientId: 조회할 클라이언트 ID
        @param dimensions: 조회할 차원들 (예: ga:pagePath, ga:browser 등)
        @return: 조회된 통계 데이터의 JSON 문자열
        """
        # 클라이언트 ID와 관련된 사용자 데이터를 조회
        dimensions.insert(0, {"name": "ga:dateHourMinute"})
        result = self.app.reports().batchGet(
            body={
                "reportRequests": [
                    {
                        "viewId": self.viewId,
                        "pageSize": 100000,
                        "dateRanges": [
                            {"startDate": startDate, "endDate": endDate}
                        ],
                        "dimensions": dimensions,
                        "dimensionFilterClauses": [
                            {
                                "filters": [
                                    {
                                        "dimensionName": "ga:clientId",
                                        "expressions": [clientId],
                                    }
                                ]
                            }
                        ],
                        "metrics": [
                            {"expression": "ga:pageviews"},
                        ]
                    }
                ]
            }).execute()

        return dumps(result)