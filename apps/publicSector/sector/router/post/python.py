from router.mother import *
import json

async def postPython(request, mongoConnection):
    data = await request.post()
    urlTong = returnHost("pythoninfo")
    url = urlTong["protocol"] + "://" + urlTong["host"] + ":" + str(urlTong["port"])
    res = await requestSystem(url + "/" + data["to"], json.loads(data["json"]))
    return res["data"]

=> @routes.post("/python")
=> web.json_response(await postPython(request, mongoConnection))
