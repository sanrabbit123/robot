import requests
from bs4 import BeautifulSoup
import json
import os

target = 'http://220.117.13.12:55556/toAiServer'

headers = { 'User-Agent': 'Mozilla/5.0' }
payload = { 'type': 'proposal', 'id': 'p2012_aa24s' }

session = requests.Session()
response = session.post(target, headers=headers, data=payload)

# params = { 'proid': 'p2012_aa24s' }
# response = requests.get(target, params=params)

print(response)
