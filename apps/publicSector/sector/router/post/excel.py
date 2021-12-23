from router.mother import *
import pandas
import json
import re

async def postExcel(request, mongoConnection):
    data = await request.post()

    dic = pandas.read_excel(returnStaticFolder()["static"] + data["file"], sheet_name=None)
    arr = dic[data["sheetsName"]].values.tolist()

    columns = dic[data["sheetsName"]].columns.tolist()
    firstArr = []
    for i in columns:
        if isinstance(i, str):
            if re.search("Unnamed: ", i) is None:
                firstArr.append(i)
            else:
                firstArr.append(None)
        else:
            firstArr.append(None)
    arr.insert(0, firstArr)
    j = json.dumps(arr, ensure_ascii=False).replace("NaN", "null")

    print(j)
    return json.loads(j)


=> @routes.post("/excel")
=> web.json_response((await postExcel(request, mongoConnection)), headers={ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me" }, content_type='application/json')
