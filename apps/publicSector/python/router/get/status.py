import aiohttp
import platform, psutil
import multiprocessing
import socket
import getmac
from netifaces import interfaces, ifaddresses, AF_INET

async def request(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return (await resp.text()).strip()

def getInnerIpArr():
    result = []
    for ifaceName in interfaces():
        for i in ifaddresses(ifaceName).setdefault(AF_INET, [ None ]):
            if i is not None:
                if i["addr"] != "127.0.0.1":
                    result.append(i)

    final = []
    for dic in result:
        newDic = {
            "address": dic["addr"],
            "netmask": dic["netmask"],
            "broadcast": dic["broadcast"],
        }
        final.append(newDic)

    return final


async def getStatus(req):
    result = {}

    result["os"] = {}
    result["os"]["type"] = platform.system()
    result["os"]["version"] = platform.version()

    result["cpu"] = {}
    result["cpu"]["information"] = platform.processor()
    result["cpu"]["architecture"] = platform.machine()
    result["cpu"]["count"] = int(multiprocessing.cpu_count())

    result["ram"] = {}
    result["ram"]["size"] = str(round(psutil.virtual_memory().total / (1024.0 ** 3))) + "GB"

    result["network"] = {}
    result["network"]["hostname"] = socket.gethostname().strip()
    result["network"]["mac"] = getmac.get_mac_address().strip()
    result["network"]["ip"] = {}
    result["network"]["ip"]["outer"] = await request("https://icanhazip.com")
    result["network"]["ip"]["inner"] = getInnerIpArr()

    return result
