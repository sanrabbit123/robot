const NaverAPIs = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  this.chrome = new GoogleChrome();

  this.dir = process.cwd() + "/apps/naverAPIs";
  this.pythonApp = this.dir + "/python/app.py";

  this.naverToken = "01000000001df72459c6f186739e0778461122cfee6a0fddea2bb30df35e82c92f20944587";
  this.naverSecret = "AQAAAAAd9yRZxvGGc54HeEYRIs/uQCeezUnYnLfpaLvLRNMcyg==";
  this.naverId = "1608132";
  this.naverUrl = "https://api.naver.com";

  this.naverMapVersion = "v5";
  this.naverMapUrl = "https://map.naver.com";
  this.naverMapSearch = "/" + this.naverMapVersion + "/api/search";

  this.naverLandUrl = "https://new.land.naver.com";
  this.naverLandAuthorizationKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJFQUxFU1RBVEUiLCJpYXQiOjE2ODc3NzAzNzgsImV4cCI6MTY4Nzc4MTE3OH0.JpP5_LSy9qBTrGtO_uCaH7-vMcR_F7OEqCzzNySAfxw";

  this.complexIdKeyword = "land_complex_";

}

NaverAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3) {
  const instance = this;
  const back = this.back;
  const { naverToken, naverSecret, naverId, naverUrl } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  try {
    const campaignCollection = "dailyCampaign";
    let tempRows;
    let res, res2, url;
    let json;
    let from, to;
    let startDate;
    let num, num2;
    let key;
    let now;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    url = "/ncc/campaigns";
    res = await requestSystem(naverUrl + url, {
      recordSize: 200,
      timeRange: JSON.stringify({
        since: dateToString(startDate),
        until: dateToString(new Date()),
      }),
    }, {
      method: "get",
      headers: {
        "X-Timestamp": String(now.valueOf()),
        "X-API-KEY": naverToken,
        "X-Customer": naverId,
        "X-Signature": sha256Hmac(naverSecret, String(now.valueOf()) + ".GET." + url)
      }
    });

    for (let i = 0; i < dayNumber; i++) {

      await sleep(1000);

      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      url = "/stats";
      num2 = 0;
      for (let { nccCampaignId, customerId, name, campaignTp } of res.data) {

        await sleep(100);

        try {
          res2 = await requestSystem(naverUrl + url, {
            id: nccCampaignId,
            fields: JSON.stringify([ "impCnt", "clkCnt", "salesAmt", "ccnt" ]),
            timeRange: JSON.stringify({
              since: dateToString(from),
              until: dateToString(from),
            }),
          }, {
            method: "get",
            headers: {
              "X-Timestamp": String(now.valueOf()),
              "X-API-KEY": naverToken,
              "X-Customer": naverId,
              "X-Signature": sha256Hmac(naverSecret, String(now.valueOf()) + ".GET." + url)
            }
          });
          if (!(res2.data.data[0].impCnt === 0 && res2.data.data[0].clkCnt === 0 && res2.data.data[0].salesAmt === 0)) {

            key = dateToString(from).replace(/\-/gi, '') + "_" + nccCampaignId;

            json = {
              camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'n' + String.fromCharCode(97 + num2) + zeroAddition(from.getDate()) + 's',
              key,
              date: { from, to },
              value: {
                charge: Number(res2.data.data[0].salesAmt),
                performance: {
                  impressions: Number(res2.data.data[0].impCnt),
                  clicks: Number(res2.data.data[0].clkCnt),
                },
              },
              information: {
                mother: "naver",
                type: campaignTp,
                id: {
                  account: String(customerId),
                  campaign: nccCampaignId,
                },
                name: name,
              }
            };

            tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
            if (tempRows.length !== 0) {
              await back.mongoDelete(campaignCollection, { key }, { selfMongo });
            }

            await back.mongoCreate(campaignCollection, json, { selfMongo })
            console.log(json);

            num2++
          }
        } catch (e) {
          await errorLog("NaverAPIs.dailyCampaign error : " + "too much requests");
          console.log("there is nothing")
        }
      }
    }


  } catch (e) {
    await errorLog("NaverAPIs.dailyCampaign error : " + e.message);
    console.log(e);
  }
}

NaverAPIs.prototype.spellChecker = async function (text) {
  const instance = this;
  try {
    let res = await this.mother.pythonExecute(this.pythonApp, [ "spell" ], { target: text });
    return res;
  } catch (e) {
    console.log(e);
  }
}

NaverAPIs.prototype.paragraphChecker = async function (paragraph) {
  const instance = this;
  const exceptionList = [
    [ "홈피에 종", "홈리에종" ],
    [ "홈 리에 종", "홈리에종" ],
    [ "홈 리에종", "홈리에종" ],
    [ "홈리에 종", "홈리에종" ],
    [ "홈리 에종", "홈리에종" ],
    [ "고급 진", "고급진" ],
    [ "홈 스타일링", "홈스타일링" ],
    [ "컬 러", "컬러" ],
    [ "고객 님", "고객님" ],
    [ "스탠드 가", "스탠드가" ],
    [ "톤 다운", "톤다운" ],
    [ "새 아파트", "새아파트" ],
    [ "수납 역", "수납력" ],
    [ "모 양", "모양" ],
    [ "없는 데", "없는데" ],
    [ "우리 집", "우리집" ],
    [ "변경한 기로", "변경하기로" ],
    [ "제안 드렸", "제안드렸" ],
    [ "구 매", "구매" ],
    [ "하셨어 요", "하셨어요" ],
    [ "주 고", "주고" ],
    [ "홈 피니싱", "홈퍼니싱" ],
    [ "홈피니싱", "홈퍼니싱" ],
    [ "스타 필링", "스타일링" ],
    [ "게스 트롬은", "게스트롬은" ],
    [ "화이 트", "화이트" ],
    [ "였 던", "였던" ],
    [ "내주시 고", "내주시고" ],
    [ "되 어", "되어" ],
    [ "전 문가", "전문가" ],
    [ "스크린 을", "스크린을" ],
    [ "해 주시는", "해주시는" ],
    [ "주시 고", "주시고" ],
    [ "디자이너 분", "디자이너분" ],
    [ "했 어요", "했어요" ],
    [ "마 무리", "마무리" ],
    [ "마무 리", "마무리" ],
    [ "스타 일", "스타일" ],
    [ "주방 은", "주방은" ],
    [ "실 로도", "실로도" ],
    [ "만셀 프", "반셀프" ],
    [ "인 더스타 리얼", "인더스트리얼" ],
    [ "조 명", "조명" ],
    [ "문제 가", "문제가" ],
    [ "어 느", "어느" ],
    [ "파 우더", "파우더" ],
    [ "장 으로", "장으로" ],
    [ "신경 써서", "신경써서" ],
    [ "어린 이", "어린이" ],
    [ "데코 해", "데코해" ],
    [ "손님 방", "손님방" ],
    [ "제품이에 요", "제품이에요" ],
    [ "함 께", "함께" ],
    [ "공간 이", "공간이" ],
    [ "하나씩같이", "하나씩 같이" ],
    [ "꾸 머나", "꾸며" ],
    [ "시계 와", "시계와" ],
    [ "결 과", "결과" ],
    [ "열 일", "열일" ],
    [ "배치한 고", "배치하고" ],
    [ "저 랑", "저랑" ],
    [ "러그 가", "러그가" ],
    [ "포인 트", "포인트" ],
    [ "이사가 실", "이사가실" ],
    [ "제품들 을", "제품들을" ],
    [ "파스텔컬러", "파스텔 컬러" ],
    [ "벽 지", "벽지" ],
    [ "아이 방", "아이방" ],
    [ "셰어 하우스", "셰어하우스" ],
    [ "사 항", "사항" ],
    [ "꼬여 어요", "꼬여 있었어요" ],
    [ "마 년 했", "마련했" ],
    [ "사용자 들", "사용자들" ],
    [ "아무래 도", "아무래도" ],
    [ "들어볼까 요", "들어볼까요" ],
    [ "신경 써야", "신경써야" ],
    [ "운영할 시다", "운영하시다" ],
    [ "바라 셨어요", "바라셨어요" ],
    [ "입 체적인", "입체적인" ],
    [ "가 구", "가구" ],
    [ "디자이너들 이", "디자이너들이" ],
    [ "이상하 게", "이상하게" ],
    [ "답 답해", "답답해" ],
    [ "터라 조", "테라조" ],
    [ "사워", "샤워" ],
    [ "포 인트", "포인트" ],
    [ "셨 어요", "셨어요" ],
    [ "좋 아", "좋아" ],
    [ "홈 파티", "홈파티" ],
    [ "연 결되", "연결된" ],
    [ "셨어 요", "셨어요" ],
    [ "소 파", "소파" ],
    [ "제작한 고", "제작하고" ],
    [ "매 립", "매립" ],
    [ "주 방", "주방" ],
    [ "타운화 우스", "타운하우스" ],
    [ "화 이트", "화이트" ],
    [ "이렇 게", "이렇게" ],
    [ "훨 신", "훨씬" ],
    [ "같아 요", "같아요" ],
    [ "조 절", "조절" ],
    [ "이 구요", "이구요" ],
    [ "이구 요", "이구요" ],
    [ "있어 요", "있어요" ],
    [ "있 어요", "있어요" ],
    [ "니스", "니즈" ],
    [ "정 말", "정말" ],
    [ "기자 이너", "디자이너" ],
    [ "홈 카페", "홈카페" ],
    [ "한 서 원", "한서원" ],
    [ "앤티크", "앤틱" ],
    [ "홍미영", "홍민영" ],
    [ "누드", "우드" ],
    [ "앤틱 한", "앤틱한" ],
    [ "구성비", "가성비" ],
    [ "제안해 주셔서", "제안해주셔서" ],
    [ "스타일 대로", "스타일대로" ],
    [ "비비드 한", "비비드한" ],
    [ "콘셉트", "컨셉" ],
    [ "셀렉 해", "셀렉해" ],
    [ "설루션", "솔루션" ],
    [ "시폰", "쉬폰" ],
    [ "셀렉 했습니다", "셀렉했습니다" ],
    [ "스폿", "스팟" ],
    [ "우드 톤", "우드톤" ],
    [ "냉장 고장", "냉장고장" ],
    [ "신경 서서", "신경써서" ],
    [ "그레이 톤", "그레이톤" ],
    [ "리모델렝", "리모델링" ],
    [ "채선은", "채성은" ],
    [ "컨셉가", "컨셉이" ],
    [ "컬러 토", "컬러톤" ],
    [ "셀렉 하", "선택하" ],
    [ "셀렉 했", "선택했" ],
    [ "컬러 톤", "컬러톤" ],
    [ "셀렉 드", "셀렉드" ],
    [ "펜트 리", "펜트리" ],
    [ "셀릭 드", "선택해 드" ],
    [ "스타일링 했", "스타일링했" ],
    [ "제안 드", "제안드" ],
    [ "더 숍", "더 샵" ],
    [ "다크 한", "다크한" ],
    [ "화이트 한", "화이트한" ],
    [ "그레이 색", "그레이색" ],
    [ "신경 쓰며", "신경쓰며" ],
    [ "꿀 템", "꿀템" ],
    [ "조합하는 기", "조합하기" ],
    [ "완성해 주는", "완성해주는" ],
    [ "우아미", "우다미" ],
    [ "형 대감", "형태감" ],
    [ "조명 색", "조명색" ],
    [ "되자 이 님", "디자이너님" ],
    [ "되자 이", "디자이너" ],
    [ "되자 너 님", "디자이너님" ],
    [ "놓았다 번", "놓았다면," ],
    [ "컨셉를", "컨셉을" ],
    [ "이 사", "이사" ],
    [ "공간 별로", "공간별로" ],
    [ "토털", "토탈" ],
    [ "오지희", "호지희" ],
    [ "황지연", "왕지연" ],
    [ "레 미안", "레미안" ],
    [ "아이들 와", "아이들과" ],
    [ "홈 오피스", "홈오피스" ],
    [ "슬 라이딩", "슬라이딩" ],
    [ "가지 고", "가지고" ],
    [ "크리스털", "크리스탈" ],
    [ "뉴트럴 한", "뉴트럴한" ],
    [ "홈 스튜디오", "홈스튜디오" ],
    [ "아이 바리", "아이보리" ],
    [ "선 반잔", "선반장" ],
    [ "셀릭 해", "선택해" ],
    [ "셀릭", "선택" ],
    [ "선택 해", "선택해" ],
    [ "아일랜드 바", "아일랜드바" ],
    [ "수납공간", "수납 공간" ],
    [ "TV 장", "TV장" ],
    [ "무 무선", "무문선" ],
    [ "넓어졌어 오", "넓어졌어요" ],
    [ "졌어 요", "졌어요" ],
    [ "타볼", "탑볼" ],
    [ "아들이사용", "아들이 사용" ],
    [ "딸이사용", "딸이 사용" ],
    [ "콘택트", "선택" ],
    [ "선택 해", "선택해" ],
    [ "안 미친", "안미진" ],
    [ "많이사용", "많이 사용" ],
    [ "컬러 콘", "컬러톤" ],
    [ "칸 키톤", "카키톤" ],
    [ "칸 키", "카키" ],
    [ "권민정", "권미정" ],
    [ "숲 세 권", "숲세권" ],
    [ "숲 세건의 서", "숲세권에서" ],
    [ "포셀린", "포세린" ],
    [ "키 큰 장", "키큰장" ],
    [ "키 큰장", "키큰장" ],
    [ "시프트 업", "시프트업" ],
    [ "프라이빗 한", "프라이빗한" ],
    [ "디피 할", "디피할" ],
    [ "예 전집", "예전 집" ],
    [ "올드 한", "올드한" ],
    [ "웨일스 코팅", "웨인스코팅" ],
    [ "웨일스코팅", "웨인스코팅" ],
    [ "웨인스 코팅", "웨인스코팅" ],
    [ "올리브그린", "올리브 그린" ],
    [ "다크 하지", "다크하지" ],
    [ "피트 니즈 룸", "피트니스룸" ],
    [ "오로 사", "오로사" ],
    [ "이사 와", "이사와" ],
    [ "초등학 색시", "초등학생이" ],
    [ "선택 한", "선택한" ],
    [ "안내해 주신", "안내해주신" ],
    [ "해결 되었", "해결되었" ],
    [ "연출 감히", "연출감이" ],
    [ "스타일링 하게", "스타일링하게" ],
    [ "고객님 다은", "고객님다운" ],
    [ "명품숍", "명품샵" ],
    [ "숍", "샵" ],
    [ "수납려", "수납력" ],
    [ "식탁 등", "식탁등" ],
    [ "전 허", "전혀" ],
    [ "차 드렸고", "짜드렸고" ],
    [ "북 카페", "북카페" ],
    [ "티브이 장", "티비장" ],
    [ "타곤", "타공" ],
    [ "타곤 판", "타공판" ],
    [ "타공 판", "타공판" ],
    [ "집 순이", "집순이" ],
    [ "폴로 하", "팔로우하" ],
    [ "새시", "샤시" ],
    [ "딥 그린", "딥그린" ],
    [ "커튼 봉", "커튼봉" ],
    [ "빅포 스터", "빅포스터" ],
    [ "홈 퍼러니 싱", "홈퍼니싱" ],
    [ "피아 니즈 트", "피아니스트" ],
    [ "피아니즈트", "피아니스트" ],
    [ "테러 조", "테라조" ],
    [ "기존의 자", "기존 의자" ],
    [ "월 플렉스", "월플렉스" ],
  ];
  try {
    let resultArr = [];
    let temp, tempReg;
    let paragraphArr = paragraph.split(". ");
    for (let p of paragraphArr) {
      for (let [ from, to ] of exceptionList) {
        tempReg = new RegExp(from, 'g');
        p = p.replace(tempReg, to);
      }
      temp = await this.spellChecker(p);
      resultArr.push(temp.result);
    }

    let finalText = resultArr.join(". ");

    for (let [ from, to ] of exceptionList) {
      tempReg = new RegExp(from, 'g');
      finalText = finalText.replace(tempReg, to);
    }

    return finalText;
  } catch (e) {
    console.log(e);
  }
}

NaverAPIs.prototype.mapVersionCheck = async function () {
  const instance = this;
  const { emergencyAlarm } = this.mother;
  const { chrome, naverMapUrl, naverMapVersion } = this;
  try {
    const test = await chrome.frontScript(naverMapUrl, async function () {
      return window.location.href;
    })
    const version = test.replace(new RegExp(naverMapUrl, "gi"), "").split("/").find((str) => { return /^v/i.test(str) });
    if (version !== naverMapVersion) {
      await emergencyAlarm("네이버 주소 버전 바뀌었음 작업 필요 : " + JSON.stringify(new Date()));
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

NaverAPIs.prototype.mapSearch = async function (query, justWordingMode = false) {
  const instance = this;
  const { equalJson, requestSystem } = this.mother;
  const { chrome, naverMapUrl, naverMapSearch } = this;
  const querystring = require("querystring");
  try {
    const queryStr = querystring.stringify({
      caller: "pcweb",
      query,
      searchCoord: "127.05840838974427;37.75015390090829",
      page: "1",
      displayCount: "20",
      isPlaceRecommendationReplace: "true",
      lang: "ko"
    });
    const targetUrl = naverMapUrl + naverMapSearch + "?" + queryStr;
    const queryResult = await chrome.frontScript(targetUrl, (async function () {
      try {
        const targetUrl = "__targetUrl__";
        const res = await fetch(targetUrl);
        const json = await res.json();
        return JSON.stringify(json);
      } catch (e) {
        return JSON.stringify({});
      }
    }).toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '').replace(/__targetUrl__/gi, targetUrl))
    const { result } = queryResult;
    let targetAddress;
    let resultList;

    if (typeof result !== "object") {
      throw new Error("query fail");
    }

    targetAddress = null;
    if (result.address !== null) {
      if (result.address.roadAddress !== null) {
        targetAddress = equalJson(JSON.stringify(result.address.roadAddress));
      } else {
        targetAddress = equalJson(JSON.stringify(result.address.jibunsAddress));
      }
      resultList = targetAddress.list;
      resultList = resultList.map((obj) => {
        if (obj.siteRepName === null) {
          throw new Error("invalid address");
        }
        return {
          name: (obj.addressElements.buildName === null || obj.addressElements.buildName === undefined) ? "" : (obj.addressElements.buildName.trim() === "" ? obj.siteRepName.trim() : obj.addressElements.buildName.trim()),
          address: obj.fullAddress,
          elements: obj.addressElements,
        }
      });
    } else if (result.place !== null) {
      resultList = result.place.list;
      resultList = resultList.map((obj) => {
        return {
          name: obj.name,
          address: obj.roadAddress,
          elements: {
            id: obj.id,
            bcode: '',
            hcode: '',
            complexId: obj.poiInfo.land === null ? "" : obj.poiInfo.land.shapeKey.shapeID,
          },
        }
      })

    } else {
      return null;
    }

    if (resultList.length === 0) {
      return null;
    }

    if (justWordingMode) {
      if (resultList[0].elements.bcode === '' && resultList[0].elements.hcode === '' && resultList[0].elements.complexId === '' && resultList[0].elements.id !== "") {
        const finalRes = await requestSystem("https://map.naver.com/v5/api/sites/summary/" + resultList[0].elements.id + "?lang=ko")
        if (finalRes.data.theme.isLand) {
          resultList[0].elements.complexId = finalRes.data.theme.extKey;
        }
      }
    }

    return {
      first: resultList[0],
      list: resultList,
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

NaverAPIs.prototype.complexSearch = async function (query, complexIdMode = false) {
  const instance = this;
  const { equalJson, requestSystem, dateToString, stringToDate, zeroAddition } = this.mother;
  const { chrome, naverMapUrl, naverMapSearch, naverLandUrl, naverLandAuthorizationKey } = this;
  try {
    const naverMapResult = await this.mapSearch(query);
    if (naverMapResult === null) {
      throw new Error("no result");
    } else {
      const response = await requestSystem(naverLandUrl + "/api/search", { keyword: naverMapResult.first.name }, { method: "get" });
      const { bcode, hcode } = naverMapResult.first.elements;
      let target, complexId;
      let resultObj;

      if (bcode === "" && hcode === "" && typeof naverMapResult.first.elements.complexId === "string" && naverMapResult.first.elements.complexId !== "") {
        complexId = naverMapResult.first.elements.complexId;
      } else {
        if (!Array.isArray(response.data.complexes)) {
          throw new Error("there is no information");
        }
        if (response.data.complexes.length === 0) {
          throw new Error("there is no information 2");
        }
        target = response.data.complexes.find((obj) => {
          if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
            return true;
          } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
            return true;
          } else {
            return false;
          }
        })
        if (target === undefined) {
          throw new Error("there is no information 3");
        }
        complexId = target.complexNo;
      }

      if (complexIdMode) {
        return complexId;
      }

      resultObj = await this.complexModeling(complexId, naverMapResult);

      return resultObj;

    }
  } catch (e) {
    try {
      let justAddress;

      if (query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) === -1) {
        justAddress = query.split(" ").slice(0, query.split(" ").findIndex((str) => { return /[동로가]$/gi.test(str) }) + 2).join(" ");
      } else {
        justAddress = query.split(" ").slice(0, query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) + 2).join(" ");
      }
      
      const justAddressResult = await this.mapSearch(justAddress);
      if (justAddressResult === null) {
        throw new Error("no result");
      } else {
        const response = await requestSystem(naverLandUrl + "/api/search", { keyword: justAddressResult.first.name }, { method: "get" });
        const { bcode, hcode } = justAddressResult.first.elements;
        let target, complexId;
        let resultObj;
  
        if (bcode === "" && hcode === "" && typeof justAddressResult.first.elements.complexId === "string" && justAddressResult.first.elements.complexId !== "") {
          complexId = justAddressResult.first.elements.complexId;
        } else {
          if (!Array.isArray(response.data.complexes)) {
            throw new Error("there is no information");
          }
          if (response.data.complexes.length === 0) {
            throw new Error("there is no information 2");
          }
          target = response.data.complexes.find((obj) => {
            if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
              return true;
            } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
              return true;
            } else {
              return false;
            }
          })
          if (target === undefined) {
            throw new Error("there is no information 3");
          }
          complexId = target.complexNo;
        }
  
        if (complexIdMode) {
          return complexId;
        }
  
        resultObj = await this.complexModeling(complexId, justAddressResult);
  
        return resultObj;
      }
    } catch (e) {
      try {
        let nameAddress;
        if (query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) === -1) {
          nameAddress = query.split(" ").slice(query.split(" ").findIndex((str) => { return /[동로가]$/gi.test(str) }) + 2);
        } else {
          nameAddress = query.split(" ").slice(query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) + 2);
        }
        nameAddress = nameAddress.filter((str) => { return !/[동호]$/gi.test(str.trim()) });
        nameAddress = nameAddress.join(" ");

        const nameAddressResult = await this.mapSearch(nameAddress);
        if (nameAddressResult === null) {
          throw new Error("no result");
        } else {
          const response = await requestSystem(naverLandUrl + "/api/search", { keyword: nameAddressResult.first.name }, { method: "get" });
          const { bcode, hcode } = nameAddressResult.first.elements;
          let target, complexId;
          let resultObj;
    
          if (bcode === "" && hcode === "" && typeof nameAddressResult.first.elements.complexId === "string" && nameAddressResult.first.elements.complexId !== "") {
            complexId = nameAddressResult.first.elements.complexId;
          } else {
            if (!Array.isArray(response.data.complexes)) {
              throw new Error("there is no information");
            }
            if (response.data.complexes.length === 0) {
              throw new Error("there is no information 2");
            }
            target = response.data.complexes.find((obj) => {
              if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
                return true;
              } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
                return true;
              } else {
                return false;
              }
            })
            if (target === undefined) {
              throw new Error("there is no information 3");
            }
            complexId = target.complexNo;
          }
    
          if (complexIdMode) {
            return complexId;
          }
          resultObj = await this.complexModeling(complexId, nameAddressResult);
          return resultObj;
        }
      } catch (e) {
        try {
          const targetWordsArr = query.split(" ").map((str) => { return str.trim().replace(/[\, \(\)]/gi, '') }).filter((str) => { return !/[0-9]$/gi.test(str) }).filter((str) => { return !/[동로가]$/gi.test(str) }).filter((str) => { return !/[로길]$/gi.test(str) }).filter((str) => { return !/[호]$/gi.test(str) });
          const targetWords = targetWordsArr[targetWordsArr.length - 1];
        
          const nameAddressResult = await this.mapSearch(targetWords, true);
          if (nameAddressResult === null) {
            throw new Error("no result");
          } else {
            const response = await requestSystem(naverLandUrl + "/api/search", { keyword: nameAddressResult.first.name }, { method: "get" });
            const { bcode, hcode } = nameAddressResult.first.elements;
            let target, complexId;
            let resultObj;
      
            if (bcode === "" && hcode === "" && typeof nameAddressResult.first.elements.complexId === "string" && nameAddressResult.first.elements.complexId !== "") {
              complexId = nameAddressResult.first.elements.complexId;
            } else {
              if (!Array.isArray(response.data.complexes)) {
                throw new Error("there is no information");
              }
              if (response.data.complexes.length === 0) {
                throw new Error("there is no information 2");
              }
              target = response.data.complexes.find((obj) => {
                if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
                  return true;
                } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
                  return true;
                } else {
                  return false;
                }
              })
              if (target === undefined) {
                throw new Error("there is no information 3");
              }
              complexId = target.complexNo;
            }
      
            if (complexIdMode) {
              return complexId;
            }
            resultObj = await this.complexModeling(complexId, nameAddressResult);
            return resultObj;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    }
  }
}

NaverAPIs.prototype.complexModeling = async function (complexId, naverMapResult = null) {
  const instance = this;
  const { equalJson, requestSystem, dateToString, stringToDate, zeroAddition } = this.mother;
  const { chrome, naverMapUrl, naverMapSearch, naverLandUrl, naverLandAuthorizationKey, complexIdKeyword } = this;
  try {
    let resultObj;
    let complexDetail, complexPyeongDetailList;
    let addressValue;

    ({ complexDetail, complexPyeongDetailList } = (await chrome.frontScript(naverLandUrl + "/complexes/" + complexId, (async function () {
      const res = await fetch("/api/complexes/__complexId__?sameAddressGroup=false", { headers: { "Authorization": "Bearer " + "__authorizationKey__" } })
      const json = await res.json();
      return JSON.stringify(json);
    }).toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '').replace(/__authorizationKey__/gi, naverLandAuthorizationKey).replace(/__complexId__/gi, complexId))));

    if (complexDetail.roadAddress !== undefined) {
      addressValue = (complexDetail.roadAddressPrefix + " " + complexDetail.roadAddress).trim() === "" ? complexDetail.address + " " + complexDetail.detailAddress : complexDetail.roadAddressPrefix + " " + complexDetail.roadAddress;
    } else {
      addressValue = complexDetail.address;
    }
    if (naverMapResult === null) {
      naverMapResult = await this.mapSearch(addressValue);
    }

    resultObj = {};
    resultObj.id = complexIdKeyword + complexDetail.complexNo;
    resultObj.name = complexDetail.complexName;
    resultObj.date = new Date();
    resultObj.address = {
      value: addressValue,
      latitude: complexDetail.latitude,
      longitude: complexDetail.longitude,
      zipCode: complexDetail.roadZipCode === undefined ? "" : complexDetail.roadZipCode,
      detail: naverMapResult === null ? {} : naverMapResult.first.elements,
    }
    resultObj.information = {};

    if (complexDetail.useApproveYmd.length > 6) {
      resultObj.information.date = new Date(Number(complexDetail.useApproveYmd.slice(0, 4)), Number(complexDetail.useApproveYmd.slice(4, 6)) - 1, Number(complexDetail.useApproveYmd.slice(6)));
    } else {
      resultObj.information.date = new Date(Number(complexDetail.useApproveYmd.slice(0, 4)), Number(complexDetail.useApproveYmd.slice(4)) - 1, 1);
    }
    resultObj.information.count = {
      household: complexDetail.totalHouseholdCount,
      dong: complexDetail.totalDongCount,
      parking: complexDetail.parkingPossibleCount,
    };
    resultObj.information.floor = {
      low: complexDetail.lowFloor,
      high: complexDetail.highFloor,
    };
    resultObj.information.type = {};
    resultObj.information.type.length = complexPyeongDetailList.length;
    resultObj.information.type.detail = complexPyeongDetailList.map((obj) => {
      return {
        name: obj.pyeongName,
        area: {
          supply: obj.supplyAreaDouble,
          exclusive: Number(obj.exclusiveArea),
          pyeong: Number(obj.supplyPyeong),
          exclusivePyeong: Number(obj.exclusivePyeong),
        },
        count: {
          household: Number.isNaN(Number(obj.householdCountByPyeong)) ? 0 : Number(obj.householdCountByPyeong),
          room: Number.isNaN(Number(obj.roomCnt)) ? 0 : Number(obj.roomCnt),
          bathroom: Number.isNaN(Number(obj.bathroomCnt)) ? 0 : Number(obj.bathroomCnt),
        }
      }
    });

    return resultObj;

  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = NaverAPIs;
