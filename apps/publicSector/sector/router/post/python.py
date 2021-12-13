from router.mother import *
import json

async def postPython(request, mongoConnection):
    data = await request.post()
    print(data)
    res = await requestSystem("https://home-liaison.xyz:3000/" + data["to"], data["json"])
    print(res)
    return res

=> @routes.post("/python")
=> web.json_response(await postPython(request, mongoConnection))
