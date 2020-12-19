import requests
from bs4 import BeautifulSoup
import json
import os

headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
data = { 'type': 'proposal', 'id': 'p2012_aa24s' }
target = 'http://220.117.13.12:55556/toAiServer'

response = requests.post(target, json=data, headers=headers)
# response = requests.get(target, params=data)

print(response)
