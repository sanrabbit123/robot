import sys
sys.path.append("/Users/baechang-gyu/uragen/homeRobot/robot/python_modules")
import aiohttp
import asyncio
async def main():
    async with aiohttp.ClientSession() as session:
        async with session.get('https://google.com') as response:
            resText = await response.text()
            print(resText)
try:
    asyncio.run(main())
except (KeyboardInterrupt, SystemExit):
    pass