from router.mother import *
from aiohttp import web
from pymongo import MongoClient

=> module

routes = web.RouteTableDef()
mongoConnection = MongoClient(__mongo__)

=> function

def routerReturn():
    return routes
