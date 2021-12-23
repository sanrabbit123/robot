from router.mother import *
import json

async def postDelete(request, mongoConnection):
    data = await request.post()
    if data["target"] == "publicSector":
        targetFolder = returnStaticFolder()["static"] + "/publicSector/temp"
        await shellExec([ "rm", "-rf", targetFolder ])
        await shellExec([ "mkdir", targetFolder ])
    return { "message": "done" }

=> @routes.post("/delete")
=> web.json_response((await postDelete(request, mongoConnection)), headers={ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me" }, content_type='application/json')
