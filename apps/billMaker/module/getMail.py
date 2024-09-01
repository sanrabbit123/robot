import poplib
import json
import re
from datetime import datetime, timedelta

def extractMails(popObject, id):
    # areaToken: 이메일 본문 내에서 영역을 구분하기 위한 토큰입니다.
    areaToken = "____splitToken____"
    
    # returnToken: 줄바꿈이나 다른 문단 구분을 나타내는 토큰입니다.
    returnToken = "____returnToken____"
    
    # nameToken: 파일 이름을 구성할 때 사용되는 토큰입니다.
    nameToken = "____nameToken____"
    
    # targetEmail: 특정 이메일 주소를 지정하여 해당 이메일에서만 데이터를 추출할 수 있도록 설정된 변수입니다.
    targetEmail = "____targetEmail____"

    # 현재 날짜와 시간을 저장합니다.
    now = datetime.now()
    
    # 일주일 전의 날짜와 시간을 계산하여 저장합니다.
    beforeWeek = now - timedelta(weeks=1)

    # 서버에 저장된 이메일 메시지의 수를 가져옵니다.
    numMessages = len(popObject.list()[1])
    
    # 각 이메일 메시지를 순회합니다.
    for z in range(numMessages):
        # result: 이메일의 전체 내용을 저장할 변수입니다.
        result = ''
        
        # passNum: 특정 조건을 만족할 때만 계속 진행하기 위해 사용하는 플래그입니다.
        passNum = 0
        
        # timeString: 이메일의 발송 시간을 저장할 변수입니다.
        timeString = ''
        
        # fromString: 이메일 발송자의 주소를 저장할 변수입니다.
        fromString = ''

        # 이메일의 각 줄을 순회하며 데이터를 추출합니다.
        for i in popObject.retr(z + 1)[1]:
            # decodedString: 현재 줄을 디코딩하여 저장할 변수입니다.
            decodedString = ''
            try:
                # 이메일의 줄을 UTF-8로 디코딩합니다.
                decodedString = i.decode("utf-8")
            except Exception as e:
                # 디코딩 실패 시 빈 문자열로 설정하고, 다음 줄로 넘어갑니다.
                decodedString = ''
                continue

            # 현재 줄이 빈 줄인지 확인합니다.
            if decodedString.strip() == '':
                if passNum == 0:
                    # 헤더 부분을 분리하여 처리합니다.
                    headers = result.split(returnToken)

                    # Date로 시작하는 헤더를 찾아 발송 시간을 추출합니다.
                    r = re.compile("^Date: ")
                    timeArr = list(filter(r.match, headers))
                    timeString = timeArr[0].split(": ")[1].strip()

                    # From으로 시작하는 헤더를 찾아 발송자를 추출합니다.
                    r = re.compile("^From:")
                    fromArr = list(filter(r.match, headers))
                    rawFrontString = fromArr[0].split(":")[1].strip()

                    # 발송자의 이메일 주소를 추출합니다.
                    fromString = ''
                    if rawFrontString.split("<").__len__() > 1:
                        fromString = rawFrontString.split("<")[1][0:-1]
                    else:
                        fromString = "what?"
                        # 이메일 형식의 주소를 정규 표현식으로 추출합니다.
                        regComplie = re.compile(r'([a-z\-\_0-9]+)@([a-z\-\_0-9]+)\.([a-z\-\_0-9]+)')
                        matchResult = regComplie.match(rawFrontString.split("<")[0])
                        if matchResult is None:
                            # 이메일 형식이 맞지 않으면 기본 값을 설정합니다.
                            fromString = "unknown@unknown.unknown"
                        else:
                            # 맞으면 해당 이메일 주소를 사용합니다.
                            fromString = matchResult.group()

                    # 이메일 발송 날짜를 파싱하여 dateObject에 저장합니다.
                    if timeString.split(", ").__len__() > 1:
                        dateObject = datetime.strptime(timeString.split(", ")[1].split("+")[0].strip()[0:20], '%d %b %Y %H:%M:%S')
                    else:
                        dateObject = datetime.strptime(timeString.split("+")[0].strip()[0:20], '%d %b %Y %H:%M:%S')

                    # 이메일 발송자가 지정된 targetEmail과 같고, 발송 날짜가 일주일 이내인지 확인합니다.
                    if fromString == targetEmail and int(beforeWeek.strftime("%Y%m%d")) <= int(dateObject.strftime("%Y%m%d")):
                        # 조건을 만족하면, 이메일 내용을 계속 추출할 수 있도록 passNum을 1로 설정합니다.
                        passNum = 1
                        result += areaToken + returnToken
                    else:
                        # 조건을 만족하지 않으면, 해당 이메일을 무시하고 다음으로 넘어갑니다.
                        passNum = 2
                        break
                else:
                    # passNum이 1인 경우, 이메일 내용을 계속해서 result에 추가합니다.
                    result += areaToken + returnToken
            else:
                # 현재 줄이 빈 줄이 아닌 경우, 줄의 내용을 result에 추가합니다.
                result += decodedString + returnToken

        # passNum이 2인 경우, 해당 이메일은 스킵하고 다음 이메일로 넘어갑니다.
        if passNum == 2:
            continue

        # 파일 이름을 구성합니다. ID와 이메일의 타임스탬프 및 발송자 정보를 포함합니다.
        fileName = id + str(z) + nameToken + dateObject.strftime('%Y%m%d' + nameToken + '%H%M%S') + nameToken + nameToken.join(fromString.split("@"))

        # 결과를 파일에 저장합니다. 파일 이름은 위에서 생성한 fileName을 사용합니다.
        with open("____box____" + fileName, "wt") as f:
            f.write(result)

# 이메일 서버에 연결하고 이메일을 가져오는 과정을 시도합니다.
try:
    # 이메일 서버에 연결합니다. 서버 호스트명과 포트를 지정합니다.
    pop0 = poplib.POP3("webmail.____host____", port=110)
    
    # 사용자 ID와 비밀번호를 사용하여 이메일 서버에 로그인합니다.
    pop0.user("____id0____@____host____")
    pop0.pass_("____password0____")
    
    # extractMails 함수를 호출하여 이메일을 추출합니다. ID는 "____id0____"로 설정됩니다.
    extractMails(pop0, "____id0____")

    # 작업이 완료되면 JSON 형식으로 완료 메시지를 출력합니다.
    print(json.dumps({ "message": "done" }))
except Exception as e:
    # 오류 발생 시 오류 메시지를 JSON 형식으로 출력합니다.
    print(json.dumps({ "message": "error" }))
    