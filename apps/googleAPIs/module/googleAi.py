from os import path as osPath
import google.generativeai as genai
from apps.mother import *
from apps.openAiAPIs.openAiAPIs import OpenAiAPIs

class GoogleAi:

    def __init__(self):

        self.model = "gemini-pro"

        thisAppPath = osPath.abspath(__file__)
        thisAppPathArr = thisAppPath.split('/')
        thisAppPathArr.pop()
        thisFolderPath = '/'.join(thisAppPathArr)
        targetKeyFile = thisFolderPath + "/tokens/ai.key"

        keyText = ""
        with open(targetKeyFile, "rt") as raw:
            keyText = raw.read()

        genai.configure(api_key=keyText)
        gemini = genai.GenerativeModel(self.model)

        self.gemini = gemini
        self.app = gemini

    async def talkToGemini(self, inputString: str) -> str:
        delta = 2000
        gemini = self.gemini
        try:
            response = gemini.generate_content(inputString)
            return str(response.text)
        except:
            await sleep(delta)
            try:
                response = gemini.generate_content(inputString)
                return str(response.text)
            except:
                await sleep(delta)
                try:
                    response = gemini.generate_content(inputString)
                    return str(response.text)
                except:
                    await sleep(delta)
                    try:
                        response = gemini.generate_content(inputString)
                        return str(response.text)
                    except:
                        return ""

    async def extractKeywords(self, sentence: str) -> list:
        gpt = OpenAiAPIs()

        delta = 8

        finalSentence = f"다음 문장의 키워드를 추출해봐, 각각 최소한 {str(delta)}자 이상으로, 쉼표로 구분해서, 특수 문자 사용 없이, 각각의 단어는 띄어쓰기 제대로 되어 있어야 해"
        finalSentence = finalSentence + "\n\n"
        finalSentence = finalSentence + sentence.strip()

        response0 = await self.talkToGemini(finalSentence)
        response1 = await self.talkToGemini(finalSentence)

        responseList0 = response0.split(",")
        responseList1 = response1.split(",")

        responseList0 = listMap(responseList0, lambda x: x.strip())
        responseList1 = listMap(responseList1, lambda x: x.strip())

        responseList0 = listMap(responseList0, lambda x: patternReplace(x, r"[^0-9a-zA-Z가-힣 ]", ""))
        responseList1 = listMap(responseList1, lambda x: patternReplace(x, r"[^0-9a-zA-Z가-힣 ]", ""))

        responseSet0 = set(responseList0)
        responseSet1 = set(responseList1)

        responseList0 = list(responseSet0)
        responseList1 = list(responseSet1)


        gptResponse0 = await gpt.chatGPT(finalSentence)
        gptResponse1 = await gpt.chatGPT(finalSentence)

        gptResponseList0 = gptResponse0.split(",")
        gptResponseList1 = gptResponse1.split(",")

        gptResponseList0 = listMap(gptResponseList0, lambda x: x.strip())
        gptResponseList1 = listMap(gptResponseList1, lambda x: x.strip())

        gptResponseList0 = listMap(gptResponseList0, lambda x: patternReplace(x, r"[^0-9a-zA-Z가-힣 ]", ""))
        gptResponseList1 = listMap(gptResponseList1, lambda x: patternReplace(x, r"[^0-9a-zA-Z가-힣 ]", ""))

        gptResponseSet0 = set(gptResponseList0)
        gptResponseSet1 = set(gptResponseList1)

        gptResponseList0 = list(gptResponseSet0)
        gptResponseList1 = list(gptResponseSet1)

        finalResult = [ *responseList0, *responseList1, *gptResponseList0, *gptResponseList1 ]
        finalResult = list(set(finalResult))
        finalResult = listMap(finalResult, lambda x: x.strip())
        finalResult = listFilter(finalResult, lambda x: x != "")

        return finalResult
