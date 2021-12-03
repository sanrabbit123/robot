from aiohttp import web
from router.router import routerReturn

routes = routerReturn()

async def main():
    app = web.Application()
    app.add_routes(routes)
    return app
