from router.mother import *
import pandas
import json
import re

STATIC_PATH = "/home/homeliaison/samba"

async def postExcel(request, mongoConnection):
    data = await request.post()

    dic = pandas.read_excel(STATIC_PATH + data["file"], sheet_name=None)
    arr = dic[data["sheetsName"]].values.tolist()

    columns = dic[data["sheetsName"]].columns.tolist()
    firstArr = []
    for i in columns:
        if re.search("Unnamed: ", i) is None:
            firstArr.append(i)
        else:
            firstArr.append(None)
    arr.insert(0, firstArr)
    j = json.dumps(arr, ensure_ascii=False).replace("NaN", "null")
    return json.loads(j)


=> @routes.post("/excel")
=> web.json_response(await postExcel(request, mongoConnection))
