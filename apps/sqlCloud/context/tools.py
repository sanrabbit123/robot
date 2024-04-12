from apps.mother import *
from apps.infoObj import returnAddress
import pprint

address = returnAddress()

def query(queryString: str) -> list:
    return [ queryString ]

def mysql(queryString: str) -> list:
    return query(mysql)

def sheets(rows: list):

    return 0

def print(something, indentNumber: int = 2):
    pp = pprint.PrettyPrinter(indent=indentNumber)
    pp.pprint(something)
