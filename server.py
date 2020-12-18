from flask import Flask, request
import subprocess
import os

ROBOT_PATH = os.getcwd()

app = Flask(__name__)

def queryStringParsing(qs):
    tempArr = qs.split('&')
    dic = {}
    for i in tempArr:
        tempArr2 = i.split('=')
        dic[tempArr2[0]] = tempArr2[1]
    return dic

@app.route('/test')
def test():
    return "테스트입니다."

@app.route('/proposal')
def proposal():
    queryString = request.query_string.decode('utf-8')

    if queryString != '':
        proidDic = queryStringParsing(queryString)
        try:
            proid = proidDic["proid"]
            subprocess.run([ "node", ROBOT_PATH + "/robot.js", "proposal", proid ], encoding="utf-8")
            return "success"
        except Exception as e:
            return "제안서 아이디를 입력해주세요. (must be proid)"
    else:
        return "제안서 아이디를 입력해주세요."

@app.route('/illustrator')
def illustrator():
    queryString = request.query_string.decode('utf-8')
    return queryString

if __name__ == '__main__':
    app.run(host="0.0.0.0")
