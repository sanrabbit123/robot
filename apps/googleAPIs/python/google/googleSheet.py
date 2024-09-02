import pickle
from googleapiclient.discovery import build  # Google API 클라이언트 라이브러리에서 API 서비스를 생성하는 함수
from google_auth_oauthlib.flow import InstalledAppFlow  # OAuth 2.0 인증을 위한 흐름을 관리하는 클래스
from google.auth.transport.requests import Request  # Google API 클라이언트 라이브러리에서 HTTP 요청을 처리하는 클래스
from json import dumps  # JSON 데이터를 문자열로 변환하는 데 사용되는 함수
from os import path as osPath  # os 모듈의 경로 관련 기능을 가져오고 'osPath'라는 이름으로 사용

class GoogleSheet:
    
    def __init__(self):
        """
        GoogleSheet 클래스의 생성자 메서드로, Google Sheets API에 접근하기 위한 인증을 처리하고 
        Google Sheets API 서비스를 초기화합니다.
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
        if osPath.exists(thisFolderPath + '/tokens/sheetsToken.pickle'):
            # 토큰 파일이 존재하면 파일을 열고 내용을 creds 변수에 로드
            with open((thisFolderPath + '/tokens/sheetsToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        # creds가 존재하지 않거나 유효하지 않다면 새로운 인증을 시도
        if not creds or not creds.valid:
            # creds가 만료되었고 갱신 토큰이 있다면 갱신을 시도
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                # 그렇지 않다면 새로 인증을 받아야 하므로 클라이언트 비밀 파일을 로드하고 인증 흐름을 시작
                flow = InstalledAppFlow.from_client_secrets_file(
                    thisFolderPath + ('/tokens/client_secrets.json'), 
                    ['https://www.googleapis.com/auth/spreadsheets']
                )
                creds = flow.run_local_server(port=0)

            # 인증을 완료한 후 새로운 토큰을 파일에 저장
            with open((thisFolderPath + '/tokens/sheetsToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # Google Sheets API 서비스를 초기화하고 self.app 속성에 할당
        service = build('sheets', 'v4', credentials=creds)
        self.app = service.spreadsheets()

    def createSheets(self, title):
        """
        Google Sheets 문서를 생성하는 메서드로, 문서의 제목을 설정합니다.
        
        @param title: 생성할 Google Sheets 문서의 제목
        @return: 생성된 문서의 ID를 JSON 형식으로 반환
        """
        spreadsheet = {
            'properties': {
                'title': title
            }
        }
        # Google Sheets 문서를 생성하고 결과를 반환
        spreadsheet = self.app.create(body=spreadsheet, fields='spreadsheetId').execute()
        return dumps({ "id": spreadsheet.get('spreadsheetId') })

    def getValue(self, id, range):
        """
        특정 범위의 값을 Google Sheets 문서에서 가져오는 메서드입니다.
        
        @param id: Google Sheets 문서의 ID
        @param range: 값을 가져올 범위 (예: "Sheet1!A1:C10")
        @return: 범위 내의 값을 JSON 형식으로 반환
        """
        # Google Sheets API를 통해 특정 범위의 값을 가져옴
        result = self.app.values().get(spreadsheetId=id, range=range).execute()
        values = result.get('values', [])
        return dumps(values)

    def updateValue(self, id, range, values):
        """
        특정 범위의 값을 Google Sheets 문서에 업데이트하는 메서드입니다.
        
        @param id: Google Sheets 문서의 ID
        @param range: 값을 업데이트할 범위 (예: "Sheet1!A1:C10")
        @param values: 업데이트할 값들의 배열
        @return: 업데이트 결과를 JSON 형식으로 반환
        """
        request = self.app.values().update(
            spreadsheetId=id, 
            range=range, 
            valueInputOption="USER_ENTERED", 
            body={ "range": range, "values": values }
        )
        response = request.execute()
        return dumps({ "response": response })

    def addSheet(self, id, nameArr):
        """
        Google Sheets 문서에 새로운 시트를 추가하는 메서드입니다.
        
        @param id: Google Sheets 문서의 ID
        @param nameArr: 추가할 시트 이름들의 배열
        @return: 성공 메시지를 JSON 형식으로 반환
        """
        for name in nameArr:
            batch_update_spreadsheet_request_body = {
                "requests": [
                    {
                        "addSheet": {
                            "properties": { "title": name }
                        }
                    }
                ]
            }
            # 새로운 시트를 문서에 추가하고 결과를 반환
            request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
            response = request.execute()
        return dumps({ "message": "success" })

    def updateDefaultSheetName(self, id, title):
        """
        기본 시트의 이름을 업데이트하는 메서드입니다.
        
        @param id: Google Sheets 문서의 ID
        @param title: 업데이트할 새로운 시트 이름
        @return: 성공 메시지를 JSON 형식으로 반환
        """
        batch_update_spreadsheet_request_body = {
            "requests": [
                {
                    "updateSheetProperties": {
                        "properties": {
                            "title": title
                        },
                        "fields": "title"
                    }
                }
            ]
        }
        # 기본 시트의 이름을 업데이트하고 결과를 반환
        request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
        response = request.execute()
        return dumps({ "message": "success" })

    def getAllSheetIds(self, id):
        """
        Google Sheets 문서 내의 모든 시트 ID를 가져오는 메서드입니다.
        
        @param id: Google Sheets 문서의 ID
        @return: 문서 내 모든 시트 ID들의 배열
        """
        # 문서의 메타데이터를 가져옴
        sheet_metadata = self.app.get(spreadsheetId=id).execute()
        properties = sheet_metadata.get('sheets')
        sheet_ids = []
        for item in properties:
            # 각 시트의 ID를 배열에 추가
            sheet_ids.append(item.get("properties").get('sheetId'))
        return sheet_ids

    def styleInjection(self, id, sheetsIndex, requests):
        """
        특정 시트에 스타일을 적용하는 메서드입니다.
        
        @param id: Google Sheets 문서의 ID
        @param sheetsIndex: 스타일을 적용할 시트의 인덱스
        @param requests: 추가로 적용할 스타일 요청들의 배열
        @return: 성공 메시지를 JSON 형식으로 반환
        """
        batch_update_spreadsheet_request_body = {
            "requests": [
                {
                    "updateDimensionProperties": {
                        "range": {
                            "sheetId": sheetsIndex,
                            "dimension": "COLUMNS",
                            "startIndex": 0,
                        },
                        "properties": {
                            "pixelSize": 120
                        },
                        "fields": "pixelSize"
                    }
                },
                {
                    "updateDimensionProperties": {
                        "range": {
                            "sheetId": sheetsIndex,
                            "dimension": "ROWS",
                            "startIndex": 0,
                        },
                        "properties": {
                            "pixelSize": 30
                        },
                        "fields": "pixelSize"
                    }
                },
                {
                    "repeatCell": {
                        "range": {
                            "sheetId": sheetsIndex,
                            "startRowIndex": 0,
                        },
                        "cell": {
                            "userEnteredFormat": {
                                "backgroundColor": {
                                    "red": 1.0,
                                    "green": 1.0,
                                    "blue": 1.0
                                },
                                "horizontalAlignment" : "CENTER",
                                "verticalAlignment": "MIDDLE",
                                "textFormat": {
                                    "fontSize": 10,
                                }
                            }
                        },
                        "fields": "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment,verticalAlignment)"
                    }
                }
            ]
        }

        for obj in requests:
            batch_update_spreadsheet_request_body["requests"].append(obj)

        # 배치 업데이트 요청을 실행하여 스타일을 적용
        request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
        response = request.execute()
        return dumps({ "message": "success" })

    def cleanView(self, id):
        """
        특정 Google Sheets 문서의 모든 시트에 기본 스타일을 적용하여 보기 화면을 초기화하는 메서드입니다.
        
        @param id: Google Sheets 문서의 ID
        @return: 성공 메시지를 JSON 형식으로 반환
        """
        # 문서 내 모든 시트 ID를 가져옴
        sheet_ids = self.getAllSheetIds(id)

        for i in sheet_ids:
            batch_update_spreadsheet_request_body = {
                "requests": [
                    {
                        "updateDimensionProperties": {
                            "range": {
                                "sheetId": i,
                                "dimension": "COLUMNS",
                                "startIndex": 0,
                            },
                            "properties": {
                                "pixelSize": 120
                            },
                            "fields": "pixelSize"
                        }
                    },
                    {
                        "updateDimensionProperties": {
                            "range": {
                                "sheetId": i,
                                "dimension": "ROWS",
                                "startIndex": 0,
                            },
                            "properties": {
                                "pixelSize": 30
                            },
                            "fields": "pixelSize"
                        }
                    },
                    {
                        "repeatCell": {
                            "range": {
                                "sheetId": i,
                                "startRowIndex": 1,
                            },
                            "cell": {
                                "userEnteredFormat": {
                                    "backgroundColor": {
                                        "red": 1.0,
                                        "green": 1.0,
                                        "blue": 1.0
                                    },
                                    "horizontalAlignment" : "CENTER",
                                    "verticalAlignment": "MIDDLE",
                                    "textFormat": {
                                        "fontSize": 10,
                                    }
                                }
                            },
                            "fields": "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment,verticalAlignment)"
                        }
                    },
                    {
                        "repeatCell": {
                            "range": {
                                "sheetId": i,
                                "startRowIndex": 0,
                                "endRowIndex": 1
                            },
                            "cell": {
                                "userEnteredFormat": {
                                    "backgroundColor": {
                                        "red": 166,
                                        "green": 120,
                                        "blue": 47
                                    },
                                    "horizontalAlignment" : "CENTER",
                                    "verticalAlignment": "MIDDLE",
                                    "textFormat": {
                                        "foregroundColor": {
                                            "red": 1.0,
                                            "green": 1.0,
                                            "blue": 1.0
                                        },
                                        "fontSize": 10,
                                        "bold": True
                                    }
                                }
                            },
                            "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)"
                        }
                    }
                ]
            }
            # 배치 업데이트 요청을 실행하여 각 시트의 스타일을 초기화
            request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
            response = request.execute()
        return dumps({ "message": "success" })