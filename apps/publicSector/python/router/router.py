from router.get.status import getStatus
from aiohttp import web
routes = web.RouteTableDef()

@routes.get('/')
async def get_status(request):
    return web.json_response(await getStatus(request))

def routerReturn():
    return routes
