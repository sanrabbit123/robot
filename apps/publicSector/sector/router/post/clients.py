from router.mother import *
import json

async def postClients(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="client", find=json.loads(data["whereQuery"]), conn=mongoConnection)

=> @routes.post("/clients")
=> web.json_response(await postClients(request, mongoConnection))
