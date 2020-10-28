def getAddressList():
    resultList = [
      {
        "name": "서울특별시 종로구",
        "code": "11110"
      },
      {
        "name": "서울특별시 중구",
        "code": "11140"
      },
      {
        "name": "서울특별시 용산구",
        "code": "11170"
      },
      {
        "name": "서울특별시 성동구",
        "code": "11200"
      },
      {
        "name": "서울특별시 광진구",
        "code": "11215"
      },
      {
        "name": "서울특별시 동대문구",
        "code": "11230"
      },
      {
        "name": "서울특별시 중랑구",
        "code": "11260"
      },
      {
        "name": "서울특별시 성북구",
        "code": "11290"
      },
      {
        "name": "서울특별시 강북구",
        "code": "11305"
      },
      {
        "name": "서울특별시 도봉구",
        "code": "11320"
      },
      {
        "name": "서울특별시 노원구",
        "code": "11350"
      },
      {
        "name": "서울특별시 은평구",
        "code": "11380"
      },
      {
        "name": "서울특별시 서대문구",
        "code": "11410"
      },
      {
        "name": "서울특별시 마포구",
        "code": "11440"
      },
      {
        "name": "서울특별시 양천구",
        "code": "11470"
      },
      {
        "name": "서울특별시 강서구",
        "code": "11500"
      },
      {
        "name": "서울특별시 구로구",
        "code": "11530"
      },
      {
        "name": "서울특별시 금천구",
        "code": "11545"
      },
      {
        "name": "서울특별시 영등포구",
        "code": "11560"
      },
      {
        "name": "서울특별시 동작구",
        "code": "11590"
      },
      {
        "name": "서울특별시 관악구",
        "code": "11620"
      },
      {
        "name": "서울특별시 서초구",
        "code": "11650"
      },
      {
        "name": "서울특별시 강남구",
        "code": "11680"
      },
      {
        "name": "서울특별시 송파구",
        "code": "11710"
      },
      {
        "name": "서울특별시 강동구",
        "code": "11740"
      },
      {
        "name": "부산광역시 중구",
        "code": "26110"
      },
      {
        "name": "부산광역시 서구",
        "code": "26140"
      },
      {
        "name": "부산광역시 동구",
        "code": "26170"
      },
      {
        "name": "부산광역시 영도구",
        "code": "26200"
      },
      {
        "name": "부산광역시 부산진구",
        "code": "26230"
      },
      {
        "name": "부산광역시 동래구",
        "code": "26260"
      },
      {
        "name": "부산광역시 남구",
        "code": "26290"
      },
      {
        "name": "부산광역시 북구",
        "code": "26320"
      },
      {
        "name": "부산광역시 해운대구",
        "code": "26350"
      },
      {
        "name": "부산광역시 사하구",
        "code": "26380"
      },
      {
        "name": "부산광역시 금정구",
        "code": "26410"
      },
      {
        "name": "부산광역시 강서구",
        "code": "26440"
      },
      {
        "name": "부산광역시 연제구",
        "code": "26470"
      },
      {
        "name": "부산광역시 수영구",
        "code": "26500"
      },
      {
        "name": "부산광역시 사상구",
        "code": "26530"
      },
      {
        "name": "부산광역시 기장군",
        "code": "26710"
      },
      {
        "name": "대구광역시 중구",
        "code": "27110"
      },
      {
        "name": "대구광역시 동구",
        "code": "27140"
      },
      {
        "name": "대구광역시 서구",
        "code": "27170"
      },
      {
        "name": "대구광역시 남구",
        "code": "27200"
      },
      {
        "name": "대구광역시 북구",
        "code": "27230"
      },
      {
        "name": "대구광역시 수성구",
        "code": "27260"
      },
      {
        "name": "대구광역시 달서구",
        "code": "27290"
      },
      {
        "name": "대구광역시 달성군",
        "code": "27710"
      },
      {
        "name": "인천광역시 중구",
        "code": "28110"
      },
      {
        "name": "인천광역시 동구",
        "code": "28140"
      },
      {
        "name": "인천광역시 미추홀구",
        "code": "28177"
      },
      {
        "name": "인천광역시 연수구",
        "code": "28185"
      },
      {
        "name": "인천광역시 남동구",
        "code": "28200"
      },
      {
        "name": "인천광역시 부평구",
        "code": "28237"
      },
      {
        "name": "인천광역시 계양구",
        "code": "28245"
      },
      {
        "name": "인천광역시 서구",
        "code": "28260"
      },
      {
        "name": "인천광역시 강화군",
        "code": "28710"
      },
      {
        "name": "인천광역시 옹진군",
        "code": "28720"
      },
      {
        "name": "광주광역시 동구",
        "code": "29110"
      },
      {
        "name": "광주광역시 서구",
        "code": "29140"
      },
      {
        "name": "광주광역시 남구",
        "code": "29155"
      },
      {
        "name": "광주광역시 북구",
        "code": "29170"
      },
      {
        "name": "광주광역시 광산구",
        "code": "29200"
      },
      {
        "name": "대전광역시 동구",
        "code": "30110"
      },
      {
        "name": "대전광역시 중구",
        "code": "30140"
      },
      {
        "name": "대전광역시 서구",
        "code": "30170"
      },
      {
        "name": "대전광역시 유성구",
        "code": "30200"
      },
      {
        "name": "대전광역시 대덕구",
        "code": "30230"
      },
      {
        "name": "울산광역시 중구",
        "code": "31110"
      },
      {
        "name": "울산광역시 남구",
        "code": "31140"
      },
      {
        "name": "울산광역시 동구",
        "code": "31170"
      },
      {
        "name": "울산광역시 북구",
        "code": "31200"
      },
      {
        "name": "울산광역시 울주군",
        "code": "31710"
      },
      {
        "name": "세종특별자치시",
        "code": "36110"
      },
      {
        "name": "경기도 수원시",
        "code": "41110"
      },
      {
        "name": "경기도 수원시",
        "code": "41111"
      },
      {
        "name": "경기도 수원시",
        "code": "41113"
      },
      {
        "name": "경기도 수원시",
        "code": "41115"
      },
      {
        "name": "경기도 수원시",
        "code": "41117"
      },
      {
        "name": "경기도 성남시",
        "code": "41130"
      },
      {
        "name": "경기도 성남시",
        "code": "41131"
      },
      {
        "name": "경기도 성남시",
        "code": "41133"
      },
      {
        "name": "경기도 성남시",
        "code": "41135"
      },
      {
        "name": "경기도 의정부시",
        "code": "41150"
      },
      {
        "name": "경기도 안양시",
        "code": "41170"
      },
      {
        "name": "경기도 안양시",
        "code": "41171"
      },
      {
        "name": "경기도 안양시",
        "code": "41173"
      },
      {
        "name": "경기도 부천시",
        "code": "41190"
      },
      {
        "name": "경기도 광명시",
        "code": "41210"
      },
      {
        "name": "경기도 평택시",
        "code": "41220"
      },
      {
        "name": "경기도 동두천시",
        "code": "41250"
      },
      {
        "name": "경기도 안산시",
        "code": "41270"
      },
      {
        "name": "경기도 안산시",
        "code": "41271"
      },
      {
        "name": "경기도 안산시",
        "code": "41273"
      },
      {
        "name": "경기도 고양시",
        "code": "41280"
      },
      {
        "name": "경기도 고양시",
        "code": "41281"
      },
      {
        "name": "경기도 고양시",
        "code": "41285"
      },
      {
        "name": "경기도 고양시",
        "code": "41287"
      },
      {
        "name": "경기도 과천시",
        "code": "41290"
      },
      {
        "name": "경기도 구리시",
        "code": "41310"
      },
      {
        "name": "경기도 남양주시",
        "code": "41360"
      },
      {
        "name": "경기도 오산시",
        "code": "41370"
      },
      {
        "name": "경기도 시흥시",
        "code": "41390"
      },
      {
        "name": "경기도 군포시",
        "code": "41410"
      },
      {
        "name": "경기도 의왕시",
        "code": "41430"
      },
      {
        "name": "경기도 하남시",
        "code": "41450"
      },
      {
        "name": "경기도 용인시",
        "code": "41460"
      },
      {
        "name": "경기도 용인시",
        "code": "41461"
      },
      {
        "name": "경기도 용인시",
        "code": "41463"
      },
      {
        "name": "경기도 용인시",
        "code": "41465"
      },
      {
        "name": "경기도 파주시",
        "code": "41480"
      },
      {
        "name": "경기도 이천시",
        "code": "41500"
      },
      {
        "name": "경기도 안성시",
        "code": "41550"
      },
      {
        "name": "경기도 김포시",
        "code": "41570"
      },
      {
        "name": "경기도 화성시",
        "code": "41590"
      },
      {
        "name": "경기도 광주시",
        "code": "41610"
      },
      {
        "name": "경기도 양주시",
        "code": "41630"
      },
      {
        "name": "경기도 포천시",
        "code": "41650"
      },
      {
        "name": "경기도 여주시",
        "code": "41670"
      },
      {
        "name": "경기도 연천군",
        "code": "41800"
      },
      {
        "name": "경기도 가평군",
        "code": "41820"
      },
      {
        "name": "경기도 양평군",
        "code": "41830"
      },
      {
        "name": "강원도 춘천시",
        "code": "42110"
      },
      {
        "name": "강원도 원주시",
        "code": "42130"
      },
      {
        "name": "강원도 강릉시",
        "code": "42150"
      },
      {
        "name": "강원도 동해시",
        "code": "42170"
      },
      {
        "name": "강원도 태백시",
        "code": "42190"
      },
      {
        "name": "강원도 속초시",
        "code": "42210"
      },
      {
        "name": "강원도 삼척시",
        "code": "42230"
      },
      {
        "name": "강원도 홍천군",
        "code": "42720"
      },
      {
        "name": "강원도 횡성군",
        "code": "42730"
      },
      {
        "name": "강원도 영월군",
        "code": "42750"
      },
      {
        "name": "강원도 평창군",
        "code": "42760"
      },
      {
        "name": "강원도 정선군",
        "code": "42770"
      },
      {
        "name": "강원도 철원군",
        "code": "42780"
      },
      {
        "name": "강원도 화천군",
        "code": "42790"
      },
      {
        "name": "강원도 양구군",
        "code": "42800"
      },
      {
        "name": "강원도 인제군",
        "code": "42810"
      },
      {
        "name": "강원도 고성군",
        "code": "42820"
      },
      {
        "name": "강원도 양양군",
        "code": "42830"
      },
      {
        "name": "충청북도 청주시",
        "code": "43110"
      },
      {
        "name": "충청북도 청주시",
        "code": "43111"
      },
      {
        "name": "충청북도 청주시",
        "code": "43112"
      },
      {
        "name": "충청북도 청주시",
        "code": "43113"
      },
      {
        "name": "충청북도 청주시",
        "code": "43114"
      },
      {
        "name": "충청북도 충주시",
        "code": "43130"
      },
      {
        "name": "충청북도 제천시",
        "code": "43150"
      },
      {
        "name": "충청북도 보은군",
        "code": "43720"
      },
      {
        "name": "충청북도 옥천군",
        "code": "43730"
      },
      {
        "name": "충청북도 영동군",
        "code": "43740"
      },
      {
        "name": "충청북도 증평군",
        "code": "43745"
      },
      {
        "name": "충청북도 진천군",
        "code": "43750"
      },
      {
        "name": "충청북도 괴산군",
        "code": "43760"
      },
      {
        "name": "충청북도 음성군",
        "code": "43770"
      },
      {
        "name": "충청북도 단양군",
        "code": "43800"
      },
      {
        "name": "충청남도 천안시",
        "code": "44130"
      },
      {
        "name": "충청남도 천안시",
        "code": "44131"
      },
      {
        "name": "충청남도 천안시",
        "code": "44133"
      },
      {
        "name": "충청남도 공주시",
        "code": "44150"
      },
      {
        "name": "충청남도 보령시",
        "code": "44180"
      },
      {
        "name": "충청남도 아산시",
        "code": "44200"
      },
      {
        "name": "충청남도 서산시",
        "code": "44210"
      },
      {
        "name": "충청남도 논산시",
        "code": "44230"
      },
      {
        "name": "충청남도 계룡시",
        "code": "44250"
      },
      {
        "name": "충청남도 당진시",
        "code": "44270"
      },
      {
        "name": "충청남도 금산군",
        "code": "44710"
      },
      {
        "name": "충청남도 부여군",
        "code": "44760"
      },
      {
        "name": "충청남도 서천군",
        "code": "44770"
      },
      {
        "name": "충청남도 청양군",
        "code": "44790"
      },
      {
        "name": "충청남도 홍성군",
        "code": "44800"
      },
      {
        "name": "충청남도 예산군",
        "code": "44810"
      },
      {
        "name": "충청남도 태안군",
        "code": "44825"
      },
      {
        "name": "전라북도 전주시",
        "code": "45110"
      },
      {
        "name": "전라북도 전주시",
        "code": "45111"
      },
      {
        "name": "전라북도 전주시",
        "code": "45113"
      },
      {
        "name": "전라북도 군산시",
        "code": "45130"
      },
      {
        "name": "전라북도 익산시",
        "code": "45140"
      },
      {
        "name": "전라북도 정읍시",
        "code": "45180"
      },
      {
        "name": "전라북도 남원시",
        "code": "45190"
      },
      {
        "name": "전라북도 김제시",
        "code": "45210"
      },
      {
        "name": "전라북도 완주군",
        "code": "45710"
      },
      {
        "name": "전라북도 진안군",
        "code": "45720"
      },
      {
        "name": "전라북도 무주군",
        "code": "45730"
      },
      {
        "name": "전라북도 장수군",
        "code": "45740"
      },
      {
        "name": "전라북도 임실군",
        "code": "45750"
      },
      {
        "name": "전라북도 순창군",
        "code": "45770"
      },
      {
        "name": "전라북도 고창군",
        "code": "45790"
      },
      {
        "name": "전라북도 부안군",
        "code": "45800"
      },
      {
        "name": "전라남도 목포시",
        "code": "46110"
      },
      {
        "name": "전라남도 여수시",
        "code": "46130"
      },
      {
        "name": "전라남도 순천시",
        "code": "46150"
      },
      {
        "name": "전라남도 나주시",
        "code": "46170"
      },
      {
        "name": "전라남도 광양시",
        "code": "46230"
      },
      {
        "name": "전라남도 담양군",
        "code": "46710"
      },
      {
        "name": "전라남도 곡성군",
        "code": "46720"
      },
      {
        "name": "전라남도 구례군",
        "code": "46730"
      },
      {
        "name": "전라남도 고흥군",
        "code": "46770"
      },
      {
        "name": "전라남도 보성군",
        "code": "46780"
      },
      {
        "name": "전라남도 화순군",
        "code": "46790"
      },
      {
        "name": "전라남도 장흥군",
        "code": "46800"
      },
      {
        "name": "전라남도 강진군",
        "code": "46810"
      },
      {
        "name": "전라남도 해남군",
        "code": "46820"
      },
      {
        "name": "전라남도 영암군",
        "code": "46830"
      },
      {
        "name": "전라남도 무안군",
        "code": "46840"
      },
      {
        "name": "전라남도 함평군",
        "code": "46860"
      },
      {
        "name": "전라남도 영광군",
        "code": "46870"
      },
      {
        "name": "전라남도 장성군",
        "code": "46880"
      },
      {
        "name": "전라남도 완도군",
        "code": "46890"
      },
      {
        "name": "전라남도 진도군",
        "code": "46900"
      },
      {
        "name": "전라남도 신안군",
        "code": "46910"
      },
      {
        "name": "경상북도 포항시",
        "code": "47110"
      },
      {
        "name": "경상북도 포항시",
        "code": "47111"
      },
      {
        "name": "경상북도 포항시",
        "code": "47113"
      },
      {
        "name": "경상북도 경주시",
        "code": "47130"
      },
      {
        "name": "경상북도 김천시",
        "code": "47150"
      },
      {
        "name": "경상북도 안동시",
        "code": "47170"
      },
      {
        "name": "경상북도 구미시",
        "code": "47190"
      },
      {
        "name": "경상북도 영주시",
        "code": "47210"
      },
      {
        "name": "경상북도 영천시",
        "code": "47230"
      },
      {
        "name": "경상북도 상주시",
        "code": "47250"
      },
      {
        "name": "경상북도 문경시",
        "code": "47280"
      },
      {
        "name": "경상북도 경산시",
        "code": "47290"
      },
      {
        "name": "경상북도 군위군",
        "code": "47720"
      },
      {
        "name": "경상북도 의성군",
        "code": "47730"
      },
      {
        "name": "경상북도 청송군",
        "code": "47750"
      },
      {
        "name": "경상북도 영양군",
        "code": "47760"
      },
      {
        "name": "경상북도 영덕군",
        "code": "47770"
      },
      {
        "name": "경상북도 청도군",
        "code": "47820"
      },
      {
        "name": "경상북도 고령군",
        "code": "47830"
      },
      {
        "name": "경상북도 성주군",
        "code": "47840"
      },
      {
        "name": "경상북도 칠곡군",
        "code": "47850"
      },
      {
        "name": "경상북도 예천군",
        "code": "47900"
      },
      {
        "name": "경상북도 봉화군",
        "code": "47920"
      },
      {
        "name": "경상북도 울진군",
        "code": "47930"
      },
      {
        "name": "경상북도 울릉군",
        "code": "47940"
      },
      {
        "name": "경상남도 창원시",
        "code": "48120"
      },
      {
        "name": "경상남도 창원시",
        "code": "48121"
      },
      {
        "name": "경상남도 창원시",
        "code": "48123"
      },
      {
        "name": "경상남도 창원시",
        "code": "48125"
      },
      {
        "name": "경상남도 창원시",
        "code": "48127"
      },
      {
        "name": "경상남도 창원시",
        "code": "48129"
      },
      {
        "name": "경상남도 진주시",
        "code": "48170"
      },
      {
        "name": "경상남도 통영시",
        "code": "48220"
      },
      {
        "name": "경상남도 사천시",
        "code": "48240"
      },
      {
        "name": "경상남도 김해시",
        "code": "48250"
      },
      {
        "name": "경상남도 밀양시",
        "code": "48270"
      },
      {
        "name": "경상남도 거제시",
        "code": "48310"
      },
      {
        "name": "경상남도 양산시",
        "code": "48330"
      },
      {
        "name": "경상남도 의령군",
        "code": "48720"
      },
      {
        "name": "경상남도 함안군",
        "code": "48730"
      },
      {
        "name": "경상남도 창녕군",
        "code": "48740"
      },
      {
        "name": "경상남도 고성군",
        "code": "48820"
      },
      {
        "name": "경상남도 남해군",
        "code": "48840"
      },
      {
        "name": "경상남도 하동군",
        "code": "48850"
      },
      {
        "name": "경상남도 산청군",
        "code": "48860"
      },
      {
        "name": "경상남도 함양군",
        "code": "48870"
      },
      {
        "name": "경상남도 거창군",
        "code": "48880"
      },
      {
        "name": "경상남도 합천군",
        "code": "48890"
      },
      {
        "name": "제주특별자치도 제주시",
        "code": "50110"
      },
      {
        "name": "제주특별자치도 서귀포시",
        "code": "50130"
      }
    ]

    return resultList
