from __future__ import print_function
import pickle
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from json import dumps
from os import path as osPath

class GoogleSheet:

    def __init__(self):

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        creds = None
        if osPath.exists(thisFolderPath + '/tokens/sheetsToken.pickle'):
            with open((thisFolderPath + '/tokens/sheetsToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/spreadsheets' ])
                creds = flow.run_local_server(port=0)

            with open((thisFolderPath + '/tokens/sheetsToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # ready sheet app
        service = build('sheets', 'v4', credentials=creds)
        self.app = service.spreadsheets()


    def createSheets(self, title):
        spreadsheet = {
            'properties': {
                'title': title
            }
        }
        spreadsheet = self.app.create(body=spreadsheet, fields='spreadsheetId').execute()
        return dumps({ "id": spreadsheet.get('spreadsheetId') })


    def getValue(self, id, range):
        result = self.app.values().get(spreadsheetId=id, range=range).execute()
        values = result.get('values', [])
        return dumps(values)


    def updateValue(self, id, range, values):
        request = self.app.values().update(spreadsheetId=id, range=range, valueInputOption="RAW", body={ "range": range, "values": values })
        response = request.execute()
        return dumps({ "response": response })


    def addSheet(self, id, nameArr):
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
            request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
            response = request.execute()
        return dumps({ "message": "success" })


    def updateDefaultSheetName(self, id, title):
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
        request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
        response = request.execute()
        return dumps({ "message": "success" })


    def getAllSheetIds(self, id):
        sheet_metadata = self.app.get(spreadsheetId=id).execute()
        properties = sheet_metadata.get('sheets')
        sheet_ids = []
        for item in properties:
           sheet_ids.append(item.get("properties").get('sheetId'))
        return sheet_ids

    def styleInjection(self, id, sheetsIndex, requests):
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

        request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
        response = request.execute()
        return dumps({ "message": "success" })


    def cleanView(self, id):
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
            request = self.app.batchUpdate(spreadsheetId=id, body=batch_update_spreadsheet_request_body)
            response = request.execute()
        return dumps({ "message": "success" })
