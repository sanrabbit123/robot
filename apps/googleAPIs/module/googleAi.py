from os import path as osPath
import google.generativeai as genai
from apps.mother import *

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

        return []
