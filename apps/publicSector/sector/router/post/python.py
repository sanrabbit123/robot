from router.mother import *
import json

async def postPython(request, mongoConnection):
    data = await request.post()
    res = await requestSystem("https://home-liaison.xyz:3000/" + data["to"], json.loads(data["json"]))
    return res

=> @routes.post("/python")
=> web.json_response(await postPython(request, mongoConnection))
