from router.mother import *
import json

async def postBuilders(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="builder", find=json.loads(data["whereQuery"]), conn=mongoConnection)

=> @routes.post("/builders")
=> web.json_response(await postBuilders(request, mongoConnection))
