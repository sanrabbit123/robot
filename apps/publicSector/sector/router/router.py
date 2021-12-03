from router.mother import *
from aiohttp import web
from pymongo import MongoClient

=> module

routes = web.RouteTableDef()
mongoConnection = MongoClient("mongodb://localhost:27017/")

=> function

def routerReturn():
    return routes
