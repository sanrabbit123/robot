from router.mother import *
import json

async def postProjects(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="project", find=json.loads(data["whereQuery"]), conn=mongoConnection)

=> @routes.post("/projects")
=> web.json_response(await postProjects(request, mongoConnection))
