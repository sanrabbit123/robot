import os
import urllib.request
from bs4 import BeautifulSoup
from json import dumps

class Immovables:

    def __init__(self, addressList):

        self.SERVICE_KEY = [
            'ewq0pom2MYJ8kDlDIzUPNAgikMmk4GmPwWpJnGHaot3JtLg5ilhlUkWjsrT40EZBNJZQF6qYRT5zkmh9TWDW4g%3D%3D',
            'jn8TzcbXN%2BA7unOqQCG%2Fv%2F5heYxXqAUyel6pgWL8WvF%2FXpoX7pcPBL4nffqnL6%2FyHmOnNA%2F4Mcugfot%2FidvTHQ%3D%3D',
            'YJUvTyof3JhAhLKUvwE7UEtMXkt9CaEXOmnMgHQ0lqiyntrH1mI5cUQVSSxrZKDq0p9B%2FFwCWIsnzILKiZb%2BMg%3D%3D',
            'n1baytG0kFhQT9f3opvPQ1eMFtaPZ9MBV0xpr2ODDx%2FBLrcwDu4H%2BmzXw62V09HLCc5XfAc9z0wwYxUHz%2Fymbg%3D%3D',
            '%2F%2F8dKsOyrQiVJDb6pIF5fgsWQvIrDekCZEkAvJ8lSd53dSchhRbOwdf%2FYgDn6EQ45hiNmmp3m2sRAu6ieI%2FkKA%3D%3D',
            'Lkevcm0SZIIUSIlsTI0w5Exy65ZbQiJMWdaE7%2FcJ172uhNxxIHJMrrBWSScym%2FJ8Uo%2BdD4fKzuDGl%2B01U6E%2Fxg%3D%3D',
        ]

        self.KEY_ARRAY = [
            "apartTrade",
            "apartRent",
            "officetelTrade",
            "officetelRent",
            "multigenerationalTrade",
            "multigenerationalRent",
            "homeTrade",
            "homeRent",
        ]

        self.SUBJECT_DIC = {
            "apartTrade": "아파트 매매",
            "apartRent": "아파트 전월세",
            "officetelTrade": "오피스텔 매매",
            "officetelRent": "오피스텔 전월세",
            "multigenerationalTrade": "연립다세대 매매",
            "multigenerationalRent": "연립다세대 전월세",
            "homeTrade": "단독/다가구 매매",
            "homeRent": "단독/다가구 전월세",
        }

        self.URI_DIC = {
            "apartTrade": "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev",
            "apartRent": "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent",
            "officetelTrade": "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiTrade",
            "officetelRent": "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiRent",
            "multigenerationalTrade": "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHTrade",
            "multigenerationalRent": "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHRent",
            "homeTrade": "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHTrade",
            "homeRent": "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent",
        }

        self.ADDRESS_CODE = addressList


    def queryToSting(self):
        queryString = ''
        for i in self.query:
            queryString += i + '='
            queryString += self.query[i] + '&'
        queryString = queryString[0:-1]
        return queryString


    def sendRequest(self, button, keyIndex, address, month):
        self.query = {
            "LAWD_CD": address,
            "DEAL_YMD": month,
            "serviceKey": self.SERVICE_KEY[keyIndex]
        }
        res = urllib.request.urlopen(self.URI_DIC[button] + '?' + self.queryToSting())
        result = res.read().decode('utf-8')
        soup = BeautifulSoup(result, 'html.parser')
        items = soup.findAll('item')
        resultList = []
        for i in items:
            resultList.append(str(i))

        return resultList


    def launching(self, dateMatrix, targetPath):

        fileNameArr = []

        keyLength = dateMatrix.__len__()
        for keyNumber in range(keyLength):
            monthLength = dateMatrix[keyNumber].__len__()
            for monthNumber in range(monthLength):
                for address in self.ADDRESS_CODE:
                    for target in self.KEY_ARRAY:
                        resultList = self.sendRequest(target, keyNumber, address["code"], dateMatrix[keyNumber][monthNumber])
                        jsonResult = dumps(resultList)
                        fileName = target + "_" + address["name"].replace(" ", "_") + "_" + dateMatrix[keyNumber][monthNumber] + ".json"
                        with open(targetPath + "/d" + dateMatrix[keyNumber][monthNumber] + "/" + fileName, "w") as f:
                            f.write(jsonResult)
                        fileNameArr.append(fileName)

        return fileNameArr
