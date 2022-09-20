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

    def __init__(self):

        self.token = "AwmracVDQzHAuSXbwPgeEA"
        self.id = 9572526494
        self.childId = 3902376917

        # make this folder path
        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)

        # make access token
        clientSecrets = thisFolderPath + '/tokens/client_secrets.json'
        parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter, parents=[ tools.argparser ])
        flags = parser.parse_args([])
        flow = client.flow_from_clientsecrets(clientSecrets, scope=[ 'https://www.googleapis.com/auth/adwords' ], message=tools.message_if_missing(clientSecrets))
        storage = file.Storage(thisFolderPath + '/tokens/ads.dat')
        credentials = storage.get()
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, flags)
        http = credentials.authorize(http=httplib2.Http())

        # write yaml
        with open(thisFolderPath + '/tokens/ads.dat', "rt") as raw:
            thisJson = loads(raw.read())
            yamlContents = ''
            yamlContents += "developer_token: "
            yamlContents += self.token
            yamlContents += "\n"
            yamlContents += "use_proto_plus: "
            yamlContents += "TRUE"
            yamlContents += "\n"
            yamlContents += "client_id: "
            yamlContents += thisJson["client_id"]
            yamlContents += "\n"
            yamlContents += "client_secret: "
            yamlContents += thisJson["client_secret"]
            yamlContents += "\n"
            yamlContents += "refresh_token: "
            yamlContents += thisJson["refresh_token"]
            yamlContents += "\n"
            yamlContents += "login_customer_id: "
            yamlContents += str(self.id)
            with open(thisFolderPath + '/tokens/ads.yaml', "wt") as f:
                f.write(yamlContents)

        self.yaml = thisFolderPath + '/tokens/ads.yaml'
        self.app = GoogleAdsClient.load_from_storage(self.yaml)

    def getCampaignList(self, targetDate):
        ga_service = self.app.get_service("GoogleAdsService")
        query = f"SELECT campaign.id, campaign.name, campaign.advertising_channel_type, metrics.impressions, metrics.clicks, metrics.cost_micros FROM campaign WHERE segments.date >= '{targetDate}' AND segments.date <= '{targetDate}'"
        stream = ga_service.search_stream(customer_id=str(self.childId), query=query)
        tong = []
        for batch in stream:
            for row in batch.results:
                tong.append({
                    "account": str(self.childId),
                    "id": str(row.campaign.id),
                    "name": str(row.campaign.name),
                    "type": str(row.campaign.advertising_channel_type),
                    "cost_micros": str(row.metrics.cost_micros),
                    "impressions": str(row.metrics.impressions),
                    "clicks": str(row.metrics.clicks),
                })
        return dumps(tong)
