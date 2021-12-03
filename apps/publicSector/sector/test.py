from aiohttp import web
from router.router import routerReturn

routes = routerReturn()

app = web.Application()
app.add_routes(routes)
web.run_app(app)
