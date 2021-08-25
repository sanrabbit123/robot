import os
import sys
import json
import re
import time
sys.path.append("/Users/baechang-gyu/uragen/homeRobot/robot/python_modules")
import subprocess
import aiohttp
import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler

async def callHistory():
    async with aiohttp.ClientSession() as session:
        async with session.get('http://localhost:3000/callHistory') as response:
            resText = await response.text()
            print(resText)


scheduler = AsyncIOScheduler()
scheduler.add_job(callHistory, 'interval', minutes=10)
scheduler.start()
try:
    asyncio.get_event_loop().run_forever()
except (KeyboardInterrupt, SystemExit):
    pass