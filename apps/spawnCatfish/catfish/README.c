## 사용 설명서

# 기본 모델

{
    "campaign": "캠페인",
    "device": {
        "mobileDevice": "None",
        "os": "Android",
        "type": "None"
    },
    "firstTimeline": "2021-02-03T14:53:00.000Z",
    "history": [
        {
            "page": "디자이너 포트폴리오 | 홈리에종",
            "page_raw": "/portfolio.php?fbclid=PAAaYEcnr2_d1gvMYmu-_s6Cvm0Z1m1i5Vt2O_xeQnZuGPpSHwTDYaRmyytac",
            "time": "2021-02-03T14:53:00.000Z"
        }
    ],
    "latestTimeline": "2021-02-03T14:53:00.000Z",
    "referrer": {
        "detail": {
            "host": "http://instagram.com/",
            "queryString": "{}"
        },
        "name": "facebook",
        "raw": "http://instagram.com/"
    },
    "region": {
        "city": "Yongin-si",
        "country": "South Korea"
    },
    "userType": "New Visitor",
    "userid": "604744307.1612363990",
    "submit": "no"
}


# 기본 콘솔 출력

=> view(json)


# 기본 검색

=> json.search(pattern)


# 상세 검색

=> json.searchAnd([ pattern0, pattern1, pattern2 ... ]) // AND 연산 검색
=> json.searchOr([ pattern0, pattern1, pattern2 ... ]) // OR 연산 검색


# 시간 객체

=> dateObject.toString() // 읽을 수 있는 형태로 출력 (return: string)
=> dateObject.compare(dateObject) // 두 시간간의 차이를 분단위로 출력 (return: int)


# 히스토리 간격 출력

=> historyObject.report() // 페이지 제목, 간격을 순서대로 담는 list 출력


# Direct property 기능

=> users list에서 직접 property를 부르면 바로 해당 property list를 출력
