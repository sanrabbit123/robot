from setup import mother
import sys
import os
import re
import clipboard

template = os.getcwd() + "/template"
inputArgumentConst = "__inputArgumentConst__"

def __copyTemplate__(msg):
    msglist = msg.split("\n")
    filtered = []
    for i in msglist:
        filtered.append(i.strip())
    firstIndex = 0
    lastIndex = 0
    numberList = list(range(len(filtered)))
    for i in numberList:
        if filtered[i] != '':
            firstIndex = i
            break
    numberList.reverse()
    for i in numberList:
        if filtered[i] != '':
            lastIndex = i
            break
    result = filtered[firstIndex:lastIndex + 1]
    resultStr = "\n".join(result)
    print('')
    print("copy complete " + ('=' * 40))
    print('')
    print(resultStr)
    print('')
    print('=' * (40 + "copy complete ".__len__()))
    print('')
    clipboard.copy(resultStr)
    return { "list": result, "string": resultStr }

if __name__ == "__main__":
    if sys.argv.__len__() == 1:
        argument = input("템플릿 이름을 알려주세요: \n").strip()
    else:
        argument = sys.argv[1]
    try:
        with open(f"{template}/{argument}.py", "rt") as message_raw:
            message = "\n" + message_raw.read().strip()
            messageList = message.split(":")
            defIndex = 0
            for i in range(len(messageList)):
                if re.search(r"def", messageList[i]) != None:
                    defIndex = i
                    break
            arguments = re.sub(r"def [^\(]+", '', re.search(r"def [^\(]+\([^\)]+\)", messageList[defIndex]).string).strip()
            arguments = re.sub(r"^\(", '', arguments)
            arguments = re.sub(r"\)$", '', arguments)
            argumentsList_raw = arguments.split(',')
            argumentsList = []
            for i in argumentsList_raw:
                argumentsList.append(i.strip())
            messageList[defIndex] = re.sub(r"def [^\(]+", f"def {argument}", messageList[defIndex])
            executeFunc = ":".join(messageList)
    except Exception as e:
        print("알 수 없는 템플릿 이름입니다.")
        exit()
    inputList = []
    for a in argumentsList:
        temp = input(f"{a}를 입력하세요: \n")
        inputList.append(temp.strip())
    executeFunc = f"{inputArgumentConst} = {str(inputList)}\n\n{executeFunc}\n\n__messageResult__ = {argument}(*{inputArgumentConst})"
    exec(executeFunc)
    __copyTemplate__(__messageResult__)
