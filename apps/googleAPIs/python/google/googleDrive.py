import pickle 
from googleapiclient.discovery import build  # Google API 클라이언트 라이브러리에서 API 서비스를 생성하는 함수
from googleapiclient.http import MediaFileUpload  # 파일 업로드를 관리하는 Google API 클라이언트 라이브러리의 클래스
from googleapiclient.errors import HttpError  # Google API 클라이언트 라이브러리에서 발생하는 HTTP 오류를 처리하기 위한 클래스
from googleapiclient.http import MediaIoBaseDownload  # Google API 클라이언트 라이브러리에서 파일 다운로드를 관리하는 클래스
from google_auth_oauthlib.flow import InstalledAppFlow  # OAuth 2.0 인증을 위한 흐름을 관리하는 클래스
from google.auth.transport.requests import Request  # Google API 클라이언트 라이브러리에서 HTTP 요청을 처리하는 클래스
from json import dumps  # JSON 데이터를 문자열로 변환하는 데 사용되는 함수
from os import path as osPath  # os 모듈의 경로 관련 기능을 가져오고 'osPath'라는 이름으로 사용
import io  # 입출력 작업을 위한 기본 파이썬 모듈

class GoogleDrive:

    def __init__(self):
        # 이 클래스의 초기화 메서드로, GoogleDrive 객체가 생성될 때 호출됨

        # 이 앱의 파일 경로를 절대 경로로 얻음
        thisAppPath = osPath.abspath(__file__)
        # 경로를 '/'로 분리하여 리스트로 변환함
        thisAppPathArr = thisAppPath.split('/')
        # 리스트의 마지막 요소(파일명)를 제거함
        thisAppPathArr.pop()
        # 리스트를 다시 '/'로 결합하여 현재 디렉토리 경로를 만듦
        thisFolderPath = '/'.join(thisAppPathArr)

        # 접근 토큰을 생성하기 위한 변수 초기화
        creds = None
        # 기존의 저장된 토큰 파일이 있는지 확인함
        if osPath.exists(thisFolderPath + '/tokens/driveToken.pickle'):
            # 토큰 파일이 존재하면 파일을 열고 내용을 creds 변수에 로드함
            with open((thisFolderPath + '/tokens/driveToken.pickle'), 'rb') as token:
                creds = pickle.load(token)

        # creds가 존재하지 않거나 유효하지 않다면 새로운 인증을 시도함
        if not creds or not creds.valid:
            # creds가 만료되었고 갱신 토큰이 있다면 갱신을 시도함
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                # 그렇지 않다면 새로 인증을 받아야 하므로 클라이언트 비밀 파일을 로드하고 인증 흐름을 시작함
                flow = InstalledAppFlow.from_client_secrets_file(thisFolderPath + ('/tokens/client_secrets.json'), [ 'https://www.googleapis.com/auth/drive' ])
                creds = flow.run_local_server(port=0)

            # 인증을 완료한 후 새로운 토큰을 파일에 저장함
            with open((thisFolderPath + '/tokens/driveToken.pickle'), 'wb') as token:
                pickle.dump(creds, token)

        # Google Drive API 서비스를 초기화하여 self.app 속성에 할당함
        service = build('drive', 'v3', credentials=creds)
        self.app = service  # Google Drive API 서비스 객체를 클래스의 속성으로 저장


    def fileUpload(self, folder_id, file):
        # Google Drive에 파일을 업로드하는 메서드

        try:
            # 파일 경로를 '/'로 분리하여 파일명만 추출함
            fileArr = file.split("/")
            # 업로드할 파일의 메타데이터를 정의함
            file_metadata = { 'name': fileArr[fileArr.__len__() - 1], 'parents': [ folder_id ] }
            # 업로드할 파일의 미디어 객체를 생성함
            media = MediaFileUpload(file)
            # 파일을 Google Drive에 생성하고 결과를 받아옴
            result = self.app.files().create(body=file_metadata, media_body=media, fields='id').execute()
        except HttpError as error:
            # 파일 업로드 중 오류가 발생하면 오류 내용을 출력함
            print(F'An error occurred: {error}')
        # 업로드된 파일의 ID를 JSON 형태로 반환함
        return dumps({ "id": result.get('id') })


    def makeFolder(self, folderName):
        # Google Drive에 폴더를 생성하는 메서드

        # 생성할 폴더의 메타데이터를 정의함
        file_metadata = {
            'name': folderName,
            'mimeType': 'application/vnd.google-apps.folder'
        }
        # 폴더를 Google Drive에 생성하고 결과를 받아옴
        file = self.app.files().create(body=file_metadata, fields='id').execute()
        # 생성된 폴더의 ID를 JSON 형태로 반환함
        return dumps({ "id": file.get('id') })


    def moveFolder(self, targetId, parent):
        # Google Drive에서 폴더를 다른 위치로 이동시키는 메서드

        # 이동시킬 폴더의 부모 ID를 가져옴
        file = self.app.files().get(fileId=targetId, fields='parents').execute()
        # 이전 부모 ID들을 쉼표로 연결하여 문자열로 만듦
        previous_parents = ",".join(file.get('parents'))
        # 폴더를 새로운 부모 폴더로 이동시키고 결과를 받아옴
        file = self.app.files().update(fileId=targetId, addParents=parent, removeParents=previous_parents, fields='id, parents').execute()
        # 성공 메시지를 JSON 형태로 반환함
        return dumps({ "message": "success" })


    def permissionsOn(self, id):
        # Google Drive 파일에 대해 공개 읽기 권한을 부여하는 메서드

        def callback(request_id, response, exception):
            # 배치 요청에 대한 콜백 함수, 요청 처리 결과를 처리함
            if exception:
                # 예외가 발생하면 그 내용을 출력함
                print(exception)
            else:
                # 요청이 성공적으로 처리되면 파일 ID를 출력함
                print(response.get('id'))

        # 배치 요청을 생성하고 콜백 함수를 연결함
        batch = self.app.new_batch_http_request(callback=callback)
        # 공개 읽기 권한을 설정함
        user_permission = {
            'type': 'anyone',
            'role': 'reader',
        }
        # 권한을 파일에 추가하는 요청을 배치에 추가함
        batch.add(self.app.permissions().create(
                fileId=id,
                body=user_permission,
                fields='id',
        ))
        # 배치 요청을 실행함
        batch.execute()
        # 파일의 웹 보기 링크를 가져옴
        webViewLink = self.app.files().get(
                fileId=id,
                fields='webViewLink',
        ).execute()
        # 웹 보기 링크를 JSON 형태로 반환함
        return dumps({ "link": webViewLink["webViewLink"] })

    def webPublish(self, file_id):
        # Google Drive 파일을 웹에 게시하는 메서드

        # 게시 설정을 담은 딕셔너리를 생성함
        revision = {}
        revision['published'] = True
        revision['publishAuto'] = True
        # 파일의 개정판을 업데이트하여 웹에 게시함
        self.app.revisions().update(fileId=file_id, revisionId='1', body=revision).execute()
        # 게시된 파일의 웹 링크를 JSON 형태로 반환함
        return dumps({ "link": "https://docs.google.com/spreadsheets/d/" + file_id + "/pubhtml?widget=true&headers=false&embedded=true" })

    def deleteFile(self, file_id):
        # Google Drive에서 파일을 삭제하는 메서드

        # 지정된 파일 ID를 삭제함
        self.app.files().delete(fileId=file_id).execute()
        # 성공 메시지를 JSON 형태로 반환함
        return dumps({ "message": "done" })

    def searchId(self, name):
        # Google Drive에서 파일 이름으로 파일 ID를 검색하는 메서드

        # 파일 이름이 특정 문자열을 포함하는 파일을 검색함
        response = self.app.files().list(q=f"name contains '{name}'", spaces='drive', fields="files(id, name)").execute()
        id = None  # 검색된 파일의 ID를 저장할 변수 초기화
        for file in response.get('files', []):
            # 검색된 파일이 있다면 첫 번째 파일의 ID를 저장함
            id = file.get('id')
            break  # 첫 번째 결과만 사용하므로 루프 종료
        # 검색된 파일의 ID를 JSON 형태로 반환함
        return dumps({ "id": id })

    def searchFolderId(self, name, parentId):
        # 특정 부모 폴더 내에서 폴더 이름으로 폴더 ID를 검색하는 메서드

        # 지정된 부모 폴더 내에서 특정 이름을 가진 폴더를 검색함
        response = self.app.files().list(q=f"mimeType = 'application/vnd.google-apps.folder' and name = '{name}' and '{parentId}' in parents", spaces='drive', fields="files(id, name)").execute()
        id = None  # 검색된 폴더의 ID를 저장할 변수 초기화
        for file in response.get('files', []):
            # 검색된 폴더가 있다면 첫 번째 폴더의 ID를 저장함
            id = file.get('id')
            break  # 첫 번째 결과만 사용하므로 루프 종료
        # 검색된 폴더의 ID를 JSON 형태로 반환함
        return dumps({ "id": id })

    def searchFileId(self, name, parentId):
        # 특정 부모 폴더 내에서 파일 이름으로 파일 ID를 검색하는 메서드

        # 지정된 부모 폴더 내에서 특정 이름을 가진 파일을 검색함
        response = self.app.files().list(q=f"name = '{name}' and '{parentId}' in parents", spaces='drive', fields="files(id, name)").execute()
        id = None  # 검색된 파일의 ID를 저장할 변수 초기화
        for file in response.get('files', []):
            # 검색된 파일이 있다면 첫 번째 파일의 ID를 저장함
            id = file.get('id')
            break  # 첫 번째 결과만 사용하므로 루프 종료
        # 검색된 파일의 ID를 JSON 형태로 반환함
        return dumps({ "id": id })

    def getTargetInfo(self, target_id, absolute_mode = False):
        # Google Drive 파일 또는 폴더의 정보를 가져오는 메서드

        parent = None  # 부모 폴더 ID를 저장할 변수 초기화
        # 파일 또는 폴더의 정보를 가져옴
        response = self.app.files().get(fileId=target_id, fields='kind,id,name,mimeType,resourceKey,parents').execute()

        parentString = ''  # 절대 경로를 저장할 문자열 초기화
        if absolute_mode:
            # 절대 경로 모드가 활성화된 경우, 상위 폴더를 따라가며 경로를 생성함
            while "parents" in response and response["parents"].__len__() > 0:
                parent = response["parents"]
                response = self.app.files().get(fileId=parent[0], fields='kind,id,name,mimeType,resourceKey,parents').execute()
                parentString = response["name"] + "/" + parentString

        # 다시 타겟 파일의 정보를 가져옴
        response = self.app.files().get(fileId=target_id, fields='kind,id,name,mimeType,resourceKey,parents').execute()

        if absolute_mode:
            # 절대 경로 모드가 활성화된 경우, 부모 폴더 정보와 절대 경로를 추가함
            if "parents" in response and parentString != "":
                response["parents"] = response["parents"][0]
                response["absolute"] = parentString[6:] + response["name"]

        # 파일 또는 폴더의 정보를 JSON 형태로 반환함
        return dumps(response)

    def readFolderFiles(self, folder_id):
        # 지정된 폴더 내의 모든 파일 목록을 가져오는 메서드

        files = []  # 파일 목록을 저장할 리스트 초기화
        page_token = None  # 페이지 토큰 초기화
        while True:
            # 폴더 내의 파일 목록을 가져옴
            response = self.app.files().list(q=f"'{folder_id}' in parents",
                                            spaces="drive",
                                            fields="nextPageToken, files(id, name)",
                                            pageToken=page_token).execute()
            # 파일 목록에 가져온 파일들을 추가함
            files.extend(response.get('files', []))
            # 다음 페이지 토큰을 가져옴
            page_token = response.get('nextPageToken', None)
            if page_token is None:
                # 더 이상 페이지가 없으면 루프 종료
                break
        # 파일 목록을 JSON 형태로 반환함
        return dumps(files)

    def downloadFile(self, target_id, target_folder):
        # Google Drive에서 파일을 다운로드하는 메서드

        # 다운로드할 파일의 정보를 가져옴
        info = self.app.files().get(fileId=target_id).execute()
        # 파일의 내용을 다운로드할 요청 객체를 생성함
        request = self.app.files().get_media(fileId=target_id)
        file = io.BytesIO()  # 파일 내용을 임시로 저장할 바이너리 스트림 객체 생성
        downloader = MediaIoBaseDownload(file, request)  # 다운로드 관리자 생성
        done = False  # 다운로드 완료 여부를 저장할 변수 초기화
        while done is False:
            # 다운로드의 다음 청크를 받아옴
            (status, done) = downloader.next_chunk()
        # 다운로드한 내용을 지정된 폴더에 파일로 저장함
        with open(target_folder + "/" + info["name"], "wb") as f:
            f.write(file.getvalue())
        # 다운로드 완료 메시지를 JSON 형태로 반환함
        return dumps({ "message": info["name"] + " download done" })