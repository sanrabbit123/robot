from router.get.status import getStatus
from aiohttp import web
routes = web.RouteTableDef()

@routes.get('/')
async def get_status(request):
    return web.json_response(await getStatus(request))

@routes.get('/{name}')
async def return_base(request):
    return web.Response(content_type='text/html', text=f"""
    <!DOCTYPE html>
    <html lang="ko" dir="ltr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
            <title>{request.match_info['name']}</title>
            <style></style>
        </head>
        <body>
            <div id="totalcontents"></div>
            <script src='/publicSector/{request.match_info['name']}.js'></script>
        </body>
    </html>""")

def routerReturn():
    return routes
