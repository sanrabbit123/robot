from apps.sqlCloud.context.tools import *

'''
< 명령 설명서 >

====================================================================================================

0. log

log(아무거나)
: 해당 정보를 콘솔에 출력한다

====================================================================================================

1. getClients

getClients(언제부터, 언제까지)
: 문의일 기준으로 두 날짜를 차례로 입력하면 그 날짜 사이에 문의한 고객님들의 정보를 불러온다.
(예) getClients("2024-04-01", "2024-04-30") => 24년 4월에 문의한 고객님들

====================================================================================================

2. getProjects

getProjects(고객들)
: 해당 고객들의 프로젝트 정보를 모두 가져온다.
(예) getProjects(getClients("2024-04-01", "2024-04-30")) => 24년 4월에 문의한 고객님들의 모든 프로젝트

====================================================================================================

3. getProposals

getProposals(고객들)
: 해당 고객들의 추천서 정보를 모두 가져온다.
(예) getProjects(getClients("2024-04-01", "2024-04-30")) => 24년 4월에 문의한 고객님들의 모든 추천서

====================================================================================================

4. getDesigners
getDesigners()
: 홈리에종의 모든 디자이너 정보를 가져온다.

====================================================================================================

5. flatMatrix
flatMatrix(리스트, 해당 키)
: 이중 리스트를 1차 리스트로 만든다.

====================================================================================================

6. sort
sort(리스트, 역순?)
: 리스트를 크기 순서대로 정렬한다
(예) sort(list, True) => 해당 리스트를 역순으로 정렬 / sort(list, False) => 해당 리스트를 순서대로 정렬

====================================================================================================

7. find
find(리스트, 키, 값)
: 해당 리스트에서 각각의 요소의 키 = 값이 해당되는 요소를 찾아 반환한다.

====================================================================================================

8. pyeong
pyeong(숫자)
: 해당 숫자를 '00평' 형식으로 바꿔준다.

====================================================================================================

9. money
pyeong(숫자)
: 해당 숫자를 '0,000원' 형식으로 바꿔준다.

'''

clients = getClients("2024-01-01", "2024-05-03")
proposals = getProposals(clients)
targetList = flatMatrix(proposals, "proposal")

everyFee = []
for d in targetList:
    everyFee.append(d["offline"])
    everyFee.append(d["online"])

everyFee = sort(everyFee, True)
maxFee = everyFee[0]

onlineFind = find(targetList, "online", maxFee)
offlineFind = find(targetList, "offline", maxFee)

if onlineFind is None:
    tragetPoposal = None
    for p in proposals:
        for proposal in p["proposal"]:
            if proposal["designer"] == offlineFind["designer"] and proposal["offline"] == offlineFind["offline"]:
                tragetPoposal = p
                break

    print("=" * 36)
    print("추천서 아이디 : " + tragetPoposal["proid"])
    print("대상 고객 : " + tragetPoposal["client"]["name"] + " (" + tragetPoposal["client"]["cliid"] + ")")
    print("대상 평수 : " + pyeong(tragetPoposal["client"]["pyeong"]))
    print("제안 디자이너 : " + offlineFind["designer"] + " (" + offlineFind["desid"] + ")")
    print("제안 유형 : 오프라인")
    print("제안 금액 : " + money(offlineFind["offline"]))
    print("=" * 36)

else:
    tragetPoposal = None
    for p in proposals:
        for proposal in p["proposal"]:
            if proposal["designer"] == onlineFind["designer"] and proposal["online"] == onlineFind["online"]:
                tragetPoposal = p
                break

    print("=" * 36)
    print("추천서 아이디 : " + tragetPoposal["proid"])
    print("대상 고객 : " + tragetPoposal["client"]["name"] + " (" + tragetPoposal["client"]["cliid"] + ")")
    print("대상 평수 : " + pyeong(tragetPoposal["client"]["pyeong"]))
    print("제안 디자이너 : " + onlineFind["designer"] + " (" + onlineFind["desid"] + ")")
    print("제안 유형 : 온라인")
    print("제안 금액 : " + money(onlineFind["online"]))
    print("=" * 36)


