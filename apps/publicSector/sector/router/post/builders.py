from router.mother import *
import json

async def postBuilders(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="builder", find=json.loads(data["whereQuery"]), conn=mongoConnection)

=> @routes.post("/builders")
=> web.json_response((await postBuilders(request, mongoConnection)), headers={ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me" }, content_type='application/json')
