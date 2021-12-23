from router.mother import *

async def postStatic(request, mongoConnection):
    data = await request.post()
    return returnStaticFolder()

=> @routes.post("/static")
=> web.json_response((await postStatic(request, mongoConnection)), headers={ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me" }, content_type='application/json')
