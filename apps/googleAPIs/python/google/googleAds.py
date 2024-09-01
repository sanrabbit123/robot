from os import path as osPath
import argparse
from json import dumps, loads
import httplib2
from oauth2client import client
from oauth2client import file
from oauth2client import tools
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

class GoogleAds:
    """
    GoogleAds 클래스는 Google Ads API와의 상호작용을 위한 클래스로,
    인증을 관리하고 광고 캠페인 데이터를 조회하는 기능을 제공합니다.
    """

    def __init__(self):
        """
        GoogleAds 클래스의 생성자입니다. 인증 및 설정을 초기화하고,
        API 호출을 위한 준비를 수행합니다.
        """

        # 고정된 토큰 값을 초기화합니다. 이 토큰은 개발자 토큰입니다.
        self.token = "AwmracVDQzHAuSXbwPgeEA"

        # 고정된 광고 계정 ID를 초기화합니다.
        self.id = 9572526494

        # 고정된 하위 광고 계정 ID를 초기화합니다.
        self.childId = 3902376917

        # 현재 파일의 절대 경로를 가져옵니다.
        thisAppPath = osPath.abspath(__file__)

        # 경로를 '/'를 기준으로 분리하여 배열로 만듭니다.
        thisAppPathArr = thisAppPath.split('/')

        # 배열의 마지막 요소를 제거하여 디렉토리 경로를 만듭니다.
        thisAppPathArr.pop()

        # 배열을 '/'로 다시 결합하여 디렉토리 경로를 문자열로 만듭니다.
        thisFolderPath = '/'.join(thisAppPathArr)

        # client_secrets.json 파일의 경로를 만듭니다.
        clientSecrets = thisFolderPath + '/tokens/client_secrets.json'

        # 명령행 인수 파서를 생성합니다.
        parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter, parents=[tools.argparser])

        # 파싱된 인수를 저장합니다. 여기서는 빈 배열을 사용합니다.
        flags = parser.parse_args([])

        # 클라이언트 비밀 정보와 OAuth 2.0 흐름을 설정합니다.
        flow = client.flow_from_clientsecrets(clientSecrets, scope=['https://www.googleapis.com/auth/adwords'], message=tools.message_if_missing(clientSecrets))

        # 토큰을 저장할 위치를 지정합니다.
        storage = file.Storage(thisFolderPath + '/tokens/ads.dat')

        # 저장된 인증 정보를 가져옵니다.
        credentials = storage.get()

        # 인증 정보가 없거나 무효한 경우 새로 인증을 수행합니다.
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)

        # 인증된 HTTP 객체를 만듭니다.
        http = credentials.authorize(http=httplib2.Http())

        # YAML 설정 파일을 작성합니다.
        with open(thisFolderPath + '/tokens/ads.dat', "rt") as raw:
            thisJson = loads(raw.read())
            yamlContents = ''
            yamlContents += "developer_token: "           # 개발자 토큰 추가
            yamlContents += self.token
            yamlContents += "\nuse_proto_plus: TRUE\n"    # proto_plus 사용 설정
            yamlContents += "client_id: "                 # 클라이언트 ID 추가
            yamlContents += thisJson["client_id"]
            yamlContents += "\nclient_secret: "           # 클라이언트 비밀키 추가
            yamlContents += thisJson["client_secret"]
            yamlContents += "\nrefresh_token: "           # 리프레시 토큰 추가
            yamlContents += thisJson["refresh_token"]
            yamlContents += "\nlogin_customer_id: "       # 로그인 고객 ID 추가
            yamlContents += str(self.id)

            # 작성된 YAML 파일을 저장합니다.
            with open(thisFolderPath + '/tokens/ads.yaml', "wt") as f:
                f.write(yamlContents)

        # 생성된 YAML 파일의 경로를 저장합니다.
        self.yaml = thisFolderPath + '/tokens/ads.yaml'

        # Google Ads 클라이언트를 초기화합니다.
        self.app = GoogleAdsClient.load_from_storage(self.yaml)

    def getCampaignList(self, targetDate):
        """
        특정 날짜에 대한 Google Ads 캠페인 목록을 가져오는 메서드입니다.

        @param {str} targetDate - 조회할 날짜입니다. 'YYYY-MM-DD' 형식이어야 합니다.
        @returns {str} - 캠페인 목록이 JSON 문자열로 반환됩니다.
        """
        
        # Google Ads 서비스 객체를 가져옵니다.
        ga_service = self.app.get_service("GoogleAdsService")
        
        # SQL 형식의 쿼리를 작성하여 특정 날짜에 대한 캠페인 데이터를 조회합니다.
        query = f"SELECT campaign.id, campaign.name, campaign.advertising_channel_type, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.interactions FROM campaign WHERE segments.date >= '{targetDate}' AND segments.date <= '{targetDate}'"
        
        # 쿼리를 실행하여 스트림으로 결과를 가져옵니다.
        stream = ga_service.search_stream(customer_id=str(self.childId), query=query)
        
        # 캠페인 데이터를 저장할 빈 리스트를 초기화합니다.
        tong = []

        # 스트림에서 결과를 반복하며 데이터를 추출합니다.
        for batch in stream:
            for row in batch.results:
                # 각 캠페인 데이터를 딕셔너리로 저장하고 리스트에 추가합니다.
                tong.append({
                    "account": str(self.childId),                    # 하위 광고 계정 ID
                    "id": str(row.campaign.id),                      # 캠페인 ID
                    "name": str(row.campaign.name),                  # 캠페인 이름
                    "type": str(row.campaign.advertising_channel_type), # 광고 채널 유형
                    "cost_micros": str(row.metrics.cost_micros),     # 광고비 (마이크로 단위)
                    "impressions": str(row.metrics.impressions),     # 노출 수
                    "clicks": str(row.metrics.clicks),               # 클릭 수
                    "interactions": str(row.metrics.interactions)    # 상호작용 수
                })

        # 수집된 캠페인 데이터를 JSON 문자열로 변환하여 반환합니다.
        return dumps(tong)