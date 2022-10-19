import poplib
import os
import json
import re
from datetime import datetime, timedelta

def extractMails(popObject, id):
    areaToken = "____splitToken____"
    returnToken = "____returnToken____"
    nameToken = "____nameToken____"
    targetEmail = "____targetEmail____"

    now = datetime.now()
    beforeWeek = now - timedelta(weeks=1)

    numMessages = len(popObject.list()[1])
    for z in range(numMessages):
        result = ''
        passNum = 0
        timeString = ''
        fromString = ''

        for i in popObject.retr(z + 1)[1]:
            if i.decode("utf-8").strip() == '':
                if passNum == 0:
                    headers = result.split(returnToken)
                    r = re.compile("^Date: ")
                    timeString = list(filter(r.match, headers))[0].split(": ")[1]
                    r = re.compile("^From: ")
                    fromString = list(filter(r.match, headers))[0].split(": ")[1].split("<")[1][0:-1]
                    dateObject = datetime.strptime(timeString.split(", ")[1].split("+")[0].strip(), '%d %b %Y %H:%M:%S')
                    if fromString == targetEmail and int(beforeWeek.strftime("%Y%m%d")) <= int(dateObject.strftime("%Y%m%d")):
                        passNum = 1
                        result += areaToken + returnToken
                    else:
                        passNum = 2
                        break
                else:
                    result += areaToken + returnToken
            else:
                result += i.decode("utf-8") + returnToken

        if passNum == 2:
            continue

        fileName = id + str(z) + nameToken + dateObject.strftime('%Y%m%d' + nameToken + '%H%M%S') + nameToken + nameToken.join(fromString.split("@"))

        with open("____box____" + fileName, "wt") as f:
            f.write(result)


try:
    pop0 = poplib.POP3("webmail.____host____", port=110)
    pop0.user("____id0____@____host____")
    pop0.pass_("____password0____")
    extractMails(pop0, "____id0____")

    pop1 = poplib.POP3("webmail.____host____", port=110)
    pop1.user("____id1____@____host____")
    pop1.pass_("____password1____")
    extractMails(pop1, "____id1____")

    print(json.dumps({ "message": "done" }))
except Exception as e:
    print(json.dumps({ "message": "error" }))
