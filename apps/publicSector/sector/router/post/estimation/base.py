from router.mother import *
import json

async def postBase(request, mongoConnection):
    data = await request.post()
    return mongoRead(collection="constructInvoice", find={ "links.buiid": data["buiid"] }, conn=mongoConnection)

=> @routes.post("/base")
=> web.json_response(await postBase(request, mongoConnection))
