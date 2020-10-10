from flask import Flask, request
import subprocess
import os

app = Flask(__name__)

def queryStringParsing(qs):
    tempArr = qs.split('&')
    dic = {}
    for i in tempArr:
        tempArr2 = i.split('=')
        dic[tempArr2[0]] = tempArr2[1]
    return dic

@app.route('/proposal')
def index():
    order = queryStringParsing(str(request.query_string))
    out = subprocess.check_output([ "node", os.getcwd() + "/test.js" ], encoding="utf-8")
    return order

if __name__ == '__main__':
    app.run()
