import requests
from bs4 import BeautifulSoup
import json
import os

headers = { 'Content-Type': 'application/json; charset=utf-8' }
data = { 'type': 'proposal', 'proid': 'p2012_aa24s' }
target = 'http://172.30.1.17:3000/toAiServer'
params = { 'proid': 'p2012_aa24s' }

response = requests.post(target, data=json.dumps(data), headers=headers)
# response = requests.get(target, params=params)

print(response)
