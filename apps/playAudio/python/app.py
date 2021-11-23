# set python modules ------------------------------------------------------------------------------------------------------

from os import path as osPath
from os import getcwd
from sys import argv, path
from json import loads, dumps

# return robot path
def returnModulepath():
    rawPath = getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "robot":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    robotPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "robot": robotPath, "module": modulPath }

# return json data
def getBridge():
    pathDic = returnModulepath()

    # name setting
    thisFile = osPath.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()
    name = fileArr[count - 3]

    # get bridge data
    try:
        with open(pathDic["robot"] + "/temp/" + name + ".json", 'r') as jsonFile:
            data = jsonFile.read()
    except Exception as e:
        data = {}

    return loads(data)

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

import boto3
import subprocess
import re
import time
import cloudconvert
import urllib

try:
    cloudconvertToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDM0YjY1ZWIzYjkxMTk0ZWU4ZDg5NTkxODA0ZDkzYTdlMmU4OTlkMzYwMTFiZTczNWViZmRhMmY1MThlM2UzYjU4YWRmODc5M2Y4M2QzNWMiLCJpYXQiOjE2Mzc2NDUxMDguMDY0ODg0LCJuYmYiOjE2Mzc2NDUxMDguMDY0ODg2LCJleHAiOjQ3OTMzMTg3MDguMDQ1Mjk3LCJzdWIiOiI1NDgyNjMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.V57hJjpxQtpTEiQgMn2RZsE3JsIZQOq9CHZx-lG4hPk7Td3j4r-cvbxyGQHd-FnkuoyZGVfgVb9D8GCCEiAWzky67Tl7c6zDiOIeQS6vQ34KOQ4C0nsxz0G0EAEeJ-f_C_FM93xwCgGdtatfm4ZY-E-TR9ghV8JGpFucduSrLIUjcAzdVOso1MghoMZBynORs4-Q3bfLGTgyVm-0EwH0NIONNDXZVZRPZZdYukSUbJT6r17ibePFX8haOuc_0nmbTzuoRPLNmw9sMYtSi1wJOnA82s6l1oIPwI8X2vTVRods7215_sUvCzb7iHKkVnoRpYL21UQ5NahoYICqUnBG27PwMY3HMIhNa809lYJLo9tqTxOg7S45x2OwxPT-yKICg6ET6DQ9mnzmoq0bGlIh3RHSCtSU0BQaZrS9E6IRSAGv1b5mX9aNM6eSTTlWaTj2g6tYX7skrxinE2S98kjp_VpRopr8_XzJET6fYjImS4U1cdh-ifxh7HPTsD7EyWk-S7ih2MvnRceprpS6itJBnvjZb_5JbaSt1AMUz5R1JbDJajJYu6-DANfab6H_8dO1R49ChOzs0WNeEBHefnk0_vKw5O9GXoUYpV90lBaDZ33iMHIlXZB7TlqDIlC1435dETiKzwipLeTrz4TNdEkyL5kY6Wu4JKMMCDyf0kfKZxE"
    BUCKETNAMECONST = "homeliaisonbucket"
    data = getBridge()

    if argv[1] == "transcribe":
        transcribe = boto3.client("transcribe")
        transcribe.start_transcription_job(TranscriptionJobName=data["name"], Media={ "MediaFileUri": data["uri"] }, MediaFormat=data["exe"], LanguageCode="ko-KR")

        while True:
            result = transcribe.get_transcription_job(TranscriptionJobName=data["name"])
            if result["TranscriptionJob"]["TranscriptionJobStatus"] in ["COMPLETED", "FAILED"]:
                break
            time.sleep(15)
        if result["TranscriptionJob"]["TranscriptionJobStatus"] == "COMPLETED":
            print(result)

    elif argv[1] == "convert":

        cloudconvert.configure(api_key=cloudconvertToken, sandbox = False)

        job = cloudconvert.Job.create(payload={ "tasks": { "upload-my-file": { "operation": "import/upload" } } })

        upload_task_id = job["tasks"][0]["id"]
        upload_task = cloudconvert.Task.find(id=upload_task_id)

        res = cloudconvert.Task.upload(file_name=data["input"], task=upload_task)
        res = cloudconvert.Task.find(id=upload_task_id)

        job2 = cloudconvert.Job.create(payload={
            "tasks": {
                "convert-my-file": {
                    "operation": "convert",
                    "input": res["id"],
                    "input_format": data["from"],
                    "output_format": data["to"]
                },
                "export-my-file": {
                    "operation": "export/url",
                    "input": "convert-my-file"
                }
            }
        })

        export_task_id = job2["tasks"][1]["id"]
        res = cloudconvert.Task.wait(id=export_task_id)
        file = res.get("result").get("files")[0]

        urllib.request.urlretrieve(file["url"], (data["folder"] + "/" + file["filename"]))
        print(dumps({ "output": data["folder"] + "/" + file["filename"] }))


except Exception as e:
    print(e)
