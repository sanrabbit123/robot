import requests
from bs4 import BeautifulSoup
import json
import os

# headers = { 'Content-Type': 'application/json; charset=utf-8' }
# data = {}
target = 'http://220.117.13.12'
params = { 'proid': 'p2012_aa23s' }

# response = requests.post(target, data=json.dumps(data), headers=headers)
response = requests.get(target, params=params)

print(response)
