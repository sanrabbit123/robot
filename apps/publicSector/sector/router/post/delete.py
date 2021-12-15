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
=> web.json_response(await postDelete(request, mongoConnection))
