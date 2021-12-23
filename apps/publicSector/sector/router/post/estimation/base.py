from router.mother import *

async def postBase(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="constructInvoice", find={ "links.buiid": data["buiid"] }, conn=mongoConnection)

=> @routes.post("/base")
=> web.json_response((await postBase(request, mongoConnection)), headers={ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me" }, content_type='application/json')
