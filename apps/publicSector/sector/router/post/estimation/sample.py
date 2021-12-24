from router.mother import *
import pandas
import json
import re

async def postSample(request, mongoConnection):
    data = await request.post()
    sampleFile = "estimationSample.xlsx"
    sampleSheetsName = "내역서"

    dic = pandas.read_excel(returnStaticFolder()["static"] + "/publicSector/" + sampleFile, sheet_name=None)
    arr = dic[sampleSheetsName].values.tolist()

    columns = dic[sampleFile].columns.tolist()
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


=> @routes.post("/sample")
=> web.json_response((await postSample(request, mongoConnection)), headers={ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me" }, content_type='application/json')
