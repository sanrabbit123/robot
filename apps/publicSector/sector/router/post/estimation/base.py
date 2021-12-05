from router.mother import *

async def postBase(request, mongoConnection):
    data = await request.post()
    result = {}
    result["message"] = "ok"
    return result

=> @routes.post("/test")
=> web.json_response(await postBase(request, mongoConnection))
