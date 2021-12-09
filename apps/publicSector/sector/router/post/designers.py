from router.mother import *
import json

async def postDesigners(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="designer", find=json.loads(data["whereQuery"]), conn=mongoConnection)

=> @routes.post("/designers")
=> web.json_response(await postDesigners(request, mongoConnection))
