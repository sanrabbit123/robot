from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import asyncio
from openai import OpenAI

class OpenAiAPIs:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/openAiAPIs"
        self.token = "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"
        self.host = "api.openai.com"
        self.client = OpenAI(api_key=self.token)
        self.model = "gpt-4-turbo-preview"

    async def chatGPT(self, query: str) -> str:
        thisText = query.strip()
        if thisText == "":
            thisText = "안녕?"

        def queryGPT(text: str):
            response = self.client.chat.completions.create(model=self.model, messages=[ { "role": "user", "content": text } ])
            try:
                targetList = listFilter(response.choices, lambda x: hasattr(x, "message"))
                targetList = listFilter(targetList, lambda x: hasattr(x.message, "content"))
                targetList = listFilter(targetList, lambda x: type(x.message.content) is str)
                finalWords = "".join(listMap(targetList, lambda x: x.message.content))
                return finalWords
            except:
                return 0

        result = queryGPT(thisText)
        safeNum = 0
        while type(result) is int:
            await sleep(3000)
            result = queryGPT(thisText)
            if safeNum > 10:
                break
            safeNum = safeNum + 1

        if type(result) is int:
            result = ""

        return result

    async def createImage(self, query: str, hdQuality: bool = False, pastMode: bool = True) -> str:
        thisText = query.strip()
        if thisText == "":
            thisText = "rabbit on pigeon"

        client = self.client
        qualityMode = "standard"
        if hdQuality:
            qualityMode = "hd"

        if pastMode:
            response = client.images.generate(
                model="dall-e-2",
                prompt=thisText,
                size="1024x1024",
                quality=qualityMode,
                n=1,
            )
        else:
            response = client.images.generate(
                model="dall-e-3",
                prompt=thisText,
                size="1792x1024",
                quality=qualityMode,
                n=1,
            )

        image_url = response.data[0].url

        return image_url

    async def fairyGPT(self, channel: str, query: str, userDict = None):
        address = self.address
        port = 3000
        path = "/fairySlack"

        result = await self.chatGPT(query)
        thisText = ""
        if type(userDict) is dict:
            thisText = "<@" + userDict["slack"]["id"] + "> " + patternReplace(result, r"\<\@[^\>]+\>", "")
        elif type(userDict) is str:
            thisText = "<@" + userDict + "> " + patternReplace(result, r"\<\@[^\>]+\>", "")
        else:
            thisText = patternReplace(result, r"\<\@[^\>]+\>", "")

        await requestSystem("https://" + address["secondinfo"]["host"] + ":" + str(port) + path, {
            "channel": channel,
            "text": thisText
        }, {
            "headers": {
                "Content-Type": "application/json"
            }
        })

        return { "message": "done" }

    async def uragenGPT(self, channel: str, query: str, userDict = None):
        address = self.address
        port = 3000
        path = "/uragenSlack"

        result = await self.chatGPT(query)
        thisText = ""
        thisText = patternReplace(result, r"\<\@[^\>]+\>", "")

        await requestSystem("https://" + address["secondinfo"]["host"] + ":" + str(port) + path, {
            "channel": channel,
            "text": thisText
        }, {
            "headers": {
                "Content-Type": "application/json"
            }
        })

        return { "message": "done" }


