from router.mother import *
from aiohttp import web
from router.router import routerReturn
import ssl
import os

cert = os.getcwd() + "/pems/localhost/cert/server.crt"
key = os.getcwd() + "/pems/localhost/key/server.key"

routes = routerReturn()

app = web.Application()
app.add_routes(routes)

ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.load_cert_chain(cert, key)

if __name__ == "__main__":
    web.run_app(app, ssl_context=ssl_context)
