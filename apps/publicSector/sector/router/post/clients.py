from router.mother import *
import json

async def postClients(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="client", find=json.loads(data["whereQuery"]), conn=mongoConnection)

=> @routes.post("/clients")
=> web.json_response((await postClients(request, mongoConnection)), headers={ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me" }, content_type='application/json')
