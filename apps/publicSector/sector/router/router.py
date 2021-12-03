from router.mother import *
from aiohttp import web
from pymongo import MongoClient

# from router.get.status import getStatus
# from router.get.base import getBase

routes = web.RouteTableDef()
mongoConnection = MongoClient("mongodb://localhost:27017/")

# @routes.get('/info/status')
# async def get_status(request):
#     return web.json_response(await getStatus(request, mongoConnection))
#
# @routes.get('/{name}')
# async def get_base(request):
#     return web.Response(content_type="text/html", text=getBase(request, mongoConnection))

def routerReturn():
    return routes
