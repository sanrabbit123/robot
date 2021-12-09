from router.mother import *

async def postStatic(request, mongoConnection):
    data = await request.post()
    return returnStaticFolder()

=> @routes.post("/static")
=> web.json_response(await postStatic(request, mongoConnection))
