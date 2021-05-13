// 06 Designer checkList

// checkList data

DesignerJs.checkListData = function (factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight) {
  const checkListData = [
    {
      name: "일반",
      children: [
        {
          name: "성함",
          value: function (designer) {
            return designer.designer;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "연락처",
          value: function (designer) {
            return designer.information.phone;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "경력",
          value: function (designer) {
            const { information } = designer;
            const { relatedY, relatedM, startY, startM } = information.business.career;
            return `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`;
          },
          update: function (text) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let tempArr;
            let arr0, arr1;
            let relatedY, relatedM, startY, startM;
            let divText;
            updateQuery = {};
            divText = "";
            if (!/\|/g.test(text)) {
              return errorObj;
            } else {
              tempArr = text.split('|');
              if (tempArr.length !== 2) {
                return errorObj;
              } else {
                if (/년/g.test(tempArr[0]) && /년/g.test(tempArr[1])) {
                  arr0 = tempArr[0].split('년');
                  arr1 = tempArr[1].split('년');
                  if (arr0.length === 2 && arr1.length === 2) {
                    if (arr0[0].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr0[1].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr1[0].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr1[1].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr0[0].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr0[1].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr1[0].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr1[1].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    relatedY = Number(arr0[0].replace(/[^0-9]/gi, ''));
                    relatedM = Number(arr0[1].replace(/[^0-9]/gi, ''));
                    startY = Number(arr1[0].replace(/[^0-9]/gi, ''));
                    startM = Number(arr1[1].replace(/[^0-9]/gi, ''));
                    if (relatedY < 0) {
                      return errorObj;
                    }
                    if (relatedM < 0 || relatedM > 12) {
                      return errorObj;
                    }
                    if (startY < 1900 || startY > 4000) {
                      return errorObj;
                    }
                    if (startM <= 0 || startM > 12) {
                      return errorObj;
                    }
                    updateQuery["information.business.career.relatedY"] = relatedY;
                    updateQuery["information.business.career.relatedM"] = relatedM;
                    updateQuery["information.business.career.startY"] = startY;
                    updateQuery["information.business.career.startM"] = startM;
                    divText = `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`;
                  } else {
                    return errorObj;
                  }
                } else {
                  return errorObj;
                }
              }
            }
            return { updateQuery, text: divText };
          },
          height: factorHeight,
          type: "string",
        }
      ]
    },
    {
      name: "공간",
      children: [
        {
          name: "주소",
          value: function (designer) {
            return (designer.information.address.length === 0) ? "주소 없음" : designer.information.address[0];
          },
          update: function (text) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            updateQuery = {};
            divText = "";
            if (text === '') {
              return errorObj;
            } else {
              if (/없음/gi.test(text)) {
                updateQuery["information.address"] = [ text ];
              } else {
                updateQuery["information.address.0"] = text;
              }
            }
            return { updateQuery, text };
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "이동 수단",
          value: function (designer) {
            let contents, value;
            contents = [
              "대중교통",
              "자동차"
            ];
            value = [
              (/대중/.test(designer.analytics.region.transportation)) ? 1 : 0,
              (/대중/.test(designer.analytics.region.transportation)) ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "대중교통",
              "자동차"
            ];
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
                break;
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.region.transportation": target };
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "작업",
      children: [
        {
          name: "활동 범위",
          value: function (designer) {
            const { matrix } = designer.analytics.project;
            let contents, value;
            contents = [
              "홈퍼니싱 프리미엄",
              "홈스타일링 프리미엄",
              "토탈 스타일링 프리미엄",
              "설계 변경 프리미엄",
              "홈퍼니싱 일반",
              "홈스타일링 일반",
              "토탈 스타일링 일반",
              "설계 변경 일반",
            ];
            value = [
              matrix[0][2],
              matrix[1][2],
              matrix[2][2],
              matrix[3][2],
              matrix[0][1],
              matrix[1][1],
              matrix[2][1],
              matrix[3][1],
            ];
            return { contents, value };
          },
          update: function (value) {
            let xy, updateQuery;
            const positionConst = "analytics.project.matrix.";
            xy = [
              '0.2',
              '1.2',
              '2.2',
              '3.2',
              '0.1',
              '1.1',
              '2.1',
              '3.1',
            ];
            updateQuery = {};
            for (let i = 0; i < value.length; i++) {
              updateQuery[positionConst + xy[i]] = value[i];
            }
            return updateQuery;
          },
          height: factorHeight * 2,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "부분 공간",
          value: function (designer) {
            const { matrix } = designer.analytics.project;
            let contents, value;
            contents = [
              "홈퍼니싱 부분 공간",
              "홈스타일링 부분 공간",
              "토탈 스타일링 부분 공간",
              "설계 변경 부분 공간",
            ];
            value = [
              matrix[0][0],
              matrix[1][0],
              matrix[2][0],
              matrix[3][0],
            ];
            return { contents, value };
          },
          update: function (value) {
            let xy, updateQuery;
            const positionConst = "analytics.project.matrix.";
            xy = [
              '0.0',
              '1.0',
              '2.0',
              '3.0'
            ];
            updateQuery = {};
            for (let i = 0; i < value.length; i++) {
              updateQuery[positionConst + xy[i]] = value[i];
            }
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "온라인",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.project.online ? 1 : 0,
              designer.analytics.project.online ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.project.online";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "고객 예산 범위",
          value: function (designer) {
            let { min, max } = designer.analytics.project.operationBudget;
            let contentsValues;
            let tempArr;
            let contents, value;

            min = min / 10000;
            max = max / 10000;

            contents = [
              "0 - 500",
              "500 - 1000",
              "1000 - 2000",
              "2000 - 5000",
              "5000 -",
            ];

            contentsValues = [];
            for (let i = 0; i < contents.length; i++) {
              tempArr = contents[i].split(' - ');
              if (tempArr.length === 1) {
                tempArr.push("10000");
              }
              for (let j = 0; j < tempArr.length; j++) {
                tempArr[j] = Number(tempArr[j].replace(/[^0-9]/g, ''));
              }
              if (tempArr.length !== 2) {
                throw new Error("range error");
              }
              contentsValues.push(tempArr);
            }
            value = [];
            for (let i = 0; i < contents.length; i++) {
              value.push((min <= contentsValues[i][0] && contentsValues[i][1] <= max) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            let contents;
            let min = null, max = null;
            contents = [
              [ 0, 500 ],
              [ 500, 1000 ],
              [ 1000, 2000 ],
              [ 2000, 5000 ],
              [ 5000, 10000 ],
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                min = i;
                break;
              }
            }
            for (let i = contents.length - 1; i > -1; i--) {
              if (value[i] === 1) {
                max = i;
                break;
              }
            }
            if (min === null || max === null) {
              min = 0;
              max = 0;
            }
            return { "analytics.project.operationBudget": { min: (contents[min][0] * 10000), max: (contents[max][1] * 10000) } };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 5,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "1차 제안 시간",
          value: function (designer) {
            let contents, value;
            contents = [
              "1주일 이내",
              "2주일 이내",
              "3주일 이내",
              "3주 이상"
            ];
            value = [];
            for (let i = 0; i < contents.length; i++) {
              if (designer.analytics.project.time.first === ((i + 1) * 7)) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              7,
              14,
              21,
              28
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = i;
              }
            }
            return { "analytics.project.time.first": contents[target] };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "페이퍼 워크",
          value: function (designer) {
            let contents, value;
            contents = [
              "도면",
              "3D",
              "컨셉 제안",
              "마감재 제안",
              "제품 리스트",
              "참고 이미지",
              "드로잉",
            ];
            value = [];
            for (let i of contents) {
              value.push(designer.analytics.project.paperWork.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "도면",
              "3D",
              "컨셉 제안",
              "마감재 제안",
              "제품 리스트",
              "참고 이미지",
              "드로잉",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            return { "analytics.project.paperWork": target };
          },
          height: factorHeight * 2.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
      ]
    },
    {
      name: "시공",
      children: [
        {
          name: "시공 능력",
          value: function (designer) {
            let contents, value;
            contents = [ "1단계", "2단계", "3단계" ];
            value = [ 0, 0, 0 ];
            if (value[designer.analytics.construct.level - 1] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.construct.level - 1] = 1;
            return { contents, value };
          },
          update: function (value) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i + 1;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.construct.level": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "시공 감리",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.construct.possible.supervision ? 1 : 0,
              designer.analytics.construct.possible.supervision ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.possible.supervision";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "시공 방식 (S)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[0].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.0.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (S)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[0].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.0.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 방식 (T)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[1].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.1.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (T)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[1].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.1.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 방식 (XT)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[2].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.2.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (XT)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[2].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.construct.case.2.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
      ]
    },
    {
      name: "스타일링",
      children: [
        {
          name: "스타일링 능력",
          value: function (designer) {
            let contents, value;
            contents = [ "1단계", "2단계", "3단계" ];
            value = [ 0, 0, 0 ];
            if (value[designer.analytics.styling.level - 1] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.styling.level - 1] = 1;
            return { contents, value };
          },
          update: function (value) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i + 1;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.styling.level": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "제안 방식",
          value: function (designer) {
            let contents, value;
            contents = [
              "순차 제안",
              "한번에 제안"
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.analytics.styling.method) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "순차 제안",
              "한번에 제안"
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.styling.method": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "빌트인 가구 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.furniture.builtin ? 1 : 0,
              designer.analytics.styling.furniture.builtin ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.furniture.builtin";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "디자인 가구 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.furniture.design ? 1 : 0,
              designer.analytics.styling.furniture.design ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.furniture.design";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "커튼 패브릭 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.fabric.curtain ? 1 : 0,
              designer.analytics.styling.fabric.curtain ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.fabric.curtain";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "베딩 패브릭 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.fabric.bedding ? 1 : 0,
              designer.analytics.styling.fabric.bedding ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.styling.fabric.bedding";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "패브릭 발주 방식",
          value: function (designer) {
            let contents, value;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            value = [];
            for (let i of contents) {
              if (designer.analytics.styling.fabric.method === i) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.styling.fabric.method": target };
          },
          height: factorHeight * 1.5,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "스타일 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "modern",
              "classic",
              "natural",
              "mixmatch",
              "scandinavian",
              "vintage",
              "oriental",
              "exotic",
            ];
            contentsMother = {
              modern: "모던",
              classic: "클래식",
              natural: "내추럴",
              mixmatch: "믹스매치",
              scandinavian: "북유럽",
              vintage: "빈티지",
              oriental: "오리엔탈",
              exotic: "이그저틱",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.style[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.style.";
            let contents, updateQuery;
            contents = [
              "modern",
              "classic",
              "natural",
              "mixmatch",
              "scandinavian",
              "vintage",
              "oriental",
              "exotic",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 8) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "텍스처 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ];
            contentsMother = {
              darkWood: "진한 우드",
              whiteWood: "연한 우드",
              coating: "도장",
              metal: "금속",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.texture[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.texture.";
            let contents, updateQuery;
            contents = [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 4) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "컬러톤 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "darkWood",
              "whiteWood",
              "highContrast",
              "vivid",
              "white",
              "mono",
              "bright",
              "dark",
            ];
            contentsMother = {
              darkWood: "다크 우드",
              whiteWood: "화이트 우드",
              highContrast: "고대비",
              vivid: "비비드",
              white: "화이트",
              mono: "모노톤",
              bright: "밝은톤",
              dark: "어두운톤",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.color[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.color.";
            let contents, updateQuery;
            contents = [
              "darkWood",
              "whiteWood",
              "highContrast",
              "vivid",
              "white",
              "mono",
              "bright",
              "dark",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 8) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "밀도 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "maximun",
              "minimum",
            ];
            contentsMother = {
              maximun: "맥시멈",
              minimum: "미니멈",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.density[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t) {
            const position = "analytics.styling.tendency.density.";
            let contents, updateQuery;
            contents = [
              "maximun",
              "minimum",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            updateQuery[position + contents[1 - z]] = 10 - (t + 1);
            return updateQuery;
          },
          height: (tendencyFactorHeight * 2) + (factorHeight * 0.5),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
          opposite: true,
        },
      ]
    },
    {
      name: "구매",
      children: [
        {
          name: "구매 대행",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.purchase.agencies ? 1 : 0,
              designer.analytics.purchase.agencies ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.purchase.agencies";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "조립 설치 서비스",
          value: function (designer) {
            let contents, value;
            contents = [
              "제공",
              "미제공"
            ];
            value = [
              designer.analytics.purchase.setting.install ? 1 : 0,
              designer.analytics.purchase.setting.install ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.purchase.setting.install";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "정리 수납 상담",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.purchase.setting.storage ? 1 : 0,
              designer.analytics.purchase.setting.storage ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.purchase.setting.storage";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "성격",
      children: [
        {
          name: "미팅 적극성",
          value: function (designer) {
            let contents, value;
            contents = [
              "높음",
              "낮음"
            ];
            value = [
              designer.analytics.etc.personality[0].value ? 1 : 0,
              designer.analytics.etc.personality[0].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.0.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "미팅 준비성",
          value: function (designer) {
            let contents, value;
            contents = [
              "높음",
              "낮음"
            ];
            value = [
              designer.analytics.etc.personality[1].value ? 1 : 0,
              designer.analytics.etc.personality[1].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.1.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "작업 속도",
          value: function (designer) {
            let contents, value;
            contents = [
              "빠름",
              "느림"
            ];
            value = [
              designer.analytics.etc.personality[2].value ? 1 : 0,
              designer.analytics.etc.personality[2].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.2.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "진행 스타일",
          value: function (designer) {
            let contents, value;
            contents = [
              "리드",
              "순응"
            ];
            value = [
              designer.analytics.etc.personality[3].value ? 1 : 0,
              designer.analytics.etc.personality[3].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.3.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "고객 맞춤",
          value: function (designer) {
            let contents, value;
            contents = [
              "적극",
              "소극"
            ];
            value = [
              designer.analytics.etc.personality[4].value ? 1 : 0,
              designer.analytics.etc.personality[4].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value) {
            const position = "analytics.etc.personality.4.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "홈리에종 관계",
          value: function (designer) {
            let contents, value;
            contents = [
              "지속가능성 높음",
              "그냥 평범",
              "확인중",
              "좋지 않음"
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.analytics.etc.relation) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value) {
            let contents, target;
            contents = [
              "지속가능성 높음",
              "그냥 평범",
              "확인중",
              "좋지 않음"
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            return { "analytics.etc.relation": target };
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    }
  ];
  return checkListData;
}

// checkList method

DesignerJs.prototype.checkListView = async function (invisible = false) {
  const instance = this;
  try {
    const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
    const { totalMother, ea, grayBarWidth } = this;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners");
    const length = designers.length;
    let boxTong;
    let nodeArr;
    let tempObj;
    let minWidth;
    let margin;
    let width, height;
    let boxNumber;
    let status;
    let searchInput;

    this.designers = new Designers(designers);

    minWidth = 210;
    margin = 8;

    boxNumber = Math.floor((window.innerWidth - grayBarWidth) / (minWidth + margin));
    width = (window.innerWidth - grayBarWidth - ((boxNumber + 1 + 4) * margin)) / boxNumber;

    boxTong = createNode({
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(0),
        left: String(grayBarWidth) + ea,
        paddingLeft: String(margin * 3) + ea,
        paddingTop: String(margin * 3) + ea,
        paddingBottom: String(margin * 3) + ea,
        width: withOut(grayBarWidth + (margin * 3), ea),
        height: "auto",
        animation: !invisible ? "fadeup 0.3s ease forwards" : "invisible 0.3s ease forwards",
      }
    });

    this.checkListBaseList = boxTong;

    nodeArr = [];
    for (let i = 0; i < length; i++) {

      status = /완료/g.test(designers[i].information.contract.status);

      tempObj = {
        mother: boxTong,
        class: [ "hoverDefault" ],
        attribute: [
          { desid: designers[i].desid }
        ],
        events: [
          {
            type: "click",
            event: function (e) {
              const desid = this.getAttribute("desid");
              instance.checkListDetailLaunching(desid, false);
            }
          }
        ],
        style: {
          display: "inline-block",
          position: "relative",
          width: String(width) + ea,
          height: String(width) + ea,
          marginRight: String(margin) + ea,
          marginBottom: String(margin) + ea,
          borderRadius: String(5) + "px",
          background: status ? colorChip.gray1 : colorChip.gray3,
        }
      };
      nodeArr.push(tempObj);

      for (let j = 0; j < 9; j++) {
        tempObj = {
          mother: -1 * (j + 1),
          style: {
            position: "absolute",
            top: String(1 + (32 * Math.floor(j / 3)) + (1 * Math.floor(j / 3))) + '%',
            left: String(1 + (32 * (j % 3)) + (1 * (j % 3))) + '%',
            width: String(32) + '%',
            height: String(32) + '%',
            borderRadius: String(3) + "px",
            background: status ? colorChip.gray0 : colorChip.gray3,
            opacity: String(0.2 + Math.random())
          }
        };
        nodeArr.push(tempObj);
      }

      tempObj = {
        mother: -10,
        text: `checkList&nbsp;<b style="font-style:normal;font-family:'graphik';font-weight:100;color:${status ? colorChip.black : colorChip.deactive}">${designers[i].information.did}</b>`,
        style: {
          position: "absolute",
          width: String(100) + '%',
          top: "calc(50% + " + String(8) + ea + ")",
          fontSize: String(16) + ea,
          textAlign: "center",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontStyle: "italic",
          color: status ? colorChip.black : colorChip.deactive,
        }
      };
      nodeArr.push(tempObj);
      tempObj = {
        mother: -1,
        text: designers[i].designer,
        style: {
          position: "absolute",
          width: String(100) + '%',
          top: String(GeneralJs.isMac() ? -43 : -40) + ea,
          fontSize: String(32) + ea,
          textAlign: "center",
          fontWeight: String(500),
          fontStyle: "normal",
          color: status ? colorChip.black : colorChip.deactive,
        }
      };
      nodeArr.push(tempObj);
    }

    createNodes(nodeArr);

    //search event
    searchInput = this.searchInput;
    searchInput.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
        let target;
        if (value === "") {
          instance.checkListDetailLaunching("", false, true);
        } else {
          target = null;
          for (let { designer, desid } of instance.designers) {
            if (value === designer) {
              target = desid;
            }
          }
          if (target !== null) {
            instance.checkListDetailLaunching(target);
          }
        }
      }
    });

    //standard doms event
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].addEventListener("click", (e) => {
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general&desid=" + instance.standardDoms[i].getAttribute("desid");
      });
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.checkListDetailLaunching = function (desid, noAnimation = false, removeOnly = false) {
  const instance = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = totalMother.firstChild;
  let target;

  if (this.checkListBaseTong !== undefined && this.checkListBaseTong !== null && this.checkListBaseList !== undefined && this.checkListBaseList !== null) {
    this.checkListBaseTong.parentNode.removeChild(this.checkListBaseTong);
    this.checkListBaseTong = null;
    this.checkListBaseList.style.animation = "fadein 0.3s ease forwards";
    standardBar.style.position = "relative";
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.display = "block";
    }
    const mother = document.querySelector(".totalMother");
    if (this.rInitialIcon !== undefined && this.rInitialIcon !== null) {
      mother.removeChild(this.rInitialIcon);
    }
    if (this.nextIcon !== undefined && this.nextIcon !== null) {
      mother.removeChild(this.nextIcon);
    }
    if (this.mInitialIcon !== undefined && this.mInitialIcon !== null) {
      mother.removeChild(this.mInitialIcon);
    }
    if (this.previousIcon !== undefined && this.previousIcon !== null) {
      mother.removeChild(this.previousIcon);
    }
    if (this.aInitialIcon !== undefined && this.aInitialIcon !== null) {
      mother.removeChild(this.aInitialIcon);
    }
    if (this.listIcon !== undefined && this.listIcon !== null) {
      mother.removeChild(this.listIcon);
    }
    this.listIcon = null;
    this.aInitialIcon = null;
    this.previousIcon = null;
    this.mInitialIcon = null;
    this.nextIcon = null;
    this.rInitialIcon = null;

    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

  if (!removeOnly) {
    target = null;
    for (let i = 0; i < this.standardDoms.length; i++) {
      if (this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g) !== null) {
        if (desid === this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g)[0]) {
          target = i;
        }
      }
    }
    for (let i = 1; i < this.standardDoms.length; i++) {
      if (i !== target) {
        this.standardDoms[i].style.display = "none";
      } else {
        this.standardDoms[i].style.display = "block";
      }
    }
    standardBar.style.position = "fixed";
    if (/fade/gi.test(this.checkListBaseList.style.animation)) {
      this.checkListBaseList.style.animation = "fadeout 0.3s ease forwards";
    }
    totalMother.scrollTo({ top: 0, behavior: "smooth" });
    this.checkListDetail(desid, noAnimation);
    this.checkListIconSet(desid, noAnimation);
  }
}

DesignerJs.prototype.checkListDetail = function (desid, noAnimation = false) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const designer = this.designers.pick(desid);
  const { information, analytics } = designer;
  const matrixButtonConst = "matrixButtons_" + desid;
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let tempMatrix;
  let alphabetWidth;
  let temp;
  let factorHeight, factorWidth;
  let tendencyTop, tendencyHeight;
  let tendencyFactorHeight, tendencyIndent, tendencyWidthIndent;

  margin = 8;
  level1Width = 210;
  level1Left = 160;
  topMargin = GeneralJs.isMac() ? 30 : 32;
  leftMargin = 34;
  bottomMargin = 15;
  size = 17;
  tendencyTop = 3;
  tendencyHeight = 16;
  alphabetWidth = 30;

  factorHeight = 38;
  factorWidth = 210;
  tendencyFactorHeight = 30;
  tendencyIndent = 105;
  tendencyWidthIndent = -135;

  const checkListData = DesignerJs.checkListData(factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight);

  baseTong0 = createNode({
    mother: totalMother,
    style: {
      position: "absolute",
      top: String(margin * 3) + ea,
      left: String(grayBarWidth + (margin * 3)) + ea,
      width: withOut(grayBarWidth + (margin * 6), ea),
      height: "auto",
      animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + ea,
      border: "1px solid " + colorChip.gray4,
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(80) + ea,
    }
  });

  for (let i = 0; i < checkListData.length; i++) {
    nodeArr = createNodes([
      {
        mother: baseTong,
        style: {
          position: "relative",
          width: String(100) + '%',
          borderBottom: i !== checkListData.length - 1 ? "1px solid " + colorChip.gray4 : "",
        }
      },
      {
        mother: -1,
        text: checkListData[i].name,
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          top: String(topMargin) + ea,
          left: String(leftMargin) + ea,
        }
      },
      {
        mother: -2,
        style: {
          position: "absolute",
          width: String(level1Width) + ea,
          top: String(0) + ea,
          left: String(level1Left) + ea,
          paddingTop: String(topMargin) + ea,
        }
      },
      {
        mother: -3,
        style: {
          position: "relative",
          width: withOut(level1Width + level1Left, ea),
          top: String(0) + ea,
          left: String(level1Width + level1Left) + ea,
          height: String(100) + '%',
          paddingTop: String(topMargin) + ea,
          paddingBottom: String(bottomMargin) + ea,
        }
      },
      {
        mother: -4,
        text: String.fromCharCode(65 + i),
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          bottom: String(topMargin) + ea,
          right: String(leftMargin) + ea,
          zIndex: String(2),
        }
      },
    ]);

    eachTotalTong = nodeArr[0];
    eachNameTong = nodeArr[2];
    eachValueTong = nodeArr[3];

    for (let j = 0; j < checkListData[i].children.length; j++) {
      tempArr = [];
      tempObj = {
        mother: eachNameTong,
        text: String.fromCharCode(65 + i) + String(j + 1),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          height: String(checkListData[i].children[j].height) + ea,
          width: String(alphabetWidth) + ea,
        }
      };
      tempArr.push(tempObj);
      tempObj = {
        mother: eachNameTong,
        text: checkListData[i].children[j].name,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(500),
          color: colorChip.black,
          height: String(checkListData[i].children[j].height) + ea,
          width: withOut(alphabetWidth, ea),
        }
      };
      tempArr.push(tempObj);

      if (checkListData[i].children[j].type === "string") {

        tempObj = {
          mother: eachValueTong,
          text: (typeof checkListData[i].children[j].value === "function") ? checkListData[i].children[j].value(designer) : "NULL",
          attribute: [
            { x: String(i) },
            { y: String(j) },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                e.stopPropagation();
                if (/div/gi.test(e.target.nodeName)) {
                  const x = Number(this.getAttribute('x'));
                  const y = Number(this.getAttribute('y'));
                  if (typeof checkListData[x].children[y].update === "function") {
                    const [ cancelBox, inputBox ] = createNodes([
                      {
                        mother: this,
                        mode: "aside",
                        events: [
                          {
                            type: "click",
                            event: function (e) {
                              this.parentElement.removeChild(this.parentElement.querySelector("input"));
                              this.parentElement.removeChild(this.parentElement.querySelector("aside"));
                            }
                          }
                        ],
                        style: {
                          position: "fixed",
                          top: String(0) + ea,
                          left: String(0) + ea,
                          width: String(100) + '%',
                          height: String(100) + '%',
                          background: "transparent",
                          zIndex: String(1),
                        }
                      },
                      {
                        mother: this,
                        mode: "input",
                        attribute: [
                          { type: "text" },
                          { value: this.textContent },
                          { past: this.textContent },
                        ],
                        events: [
                          {
                            type: "keypress",
                            event: async function (e) {
                              try {
                                if (e.keyCode === 13) {
                                  const whereQuery = { desid };
                                  const { updateQuery, text } = checkListData[x].children[y].update(this.value);
                                  if (updateQuery === "error") {
                                    this.value = this.getAttribute("past");
                                  } else {
                                    this.parentElement.removeChild(this.parentElement.firstChild);
                                    this.parentElement.insertAdjacentHTML("beforeend", text);
                                    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                  }
                                  this.parentElement.removeChild(this.parentElement.querySelector("aside"));
                                  this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                }
                              } catch (err) {
                                console.log(err);
                              }
                            }
                          }
                        ],
                        style: {
                          display: "block",
                          position: "absolute",
                          fontSize: String(size) + ea,
                          fontWeight: String(400),
                          top: String(0),
                          left: String(0),
                          color: colorChip.green,
                          background: colorChip.white,
                          border: String(0),
                          outline: String(0),
                          width: String(this.getBoundingClientRect().width) + ea,
                          zIndex: String(1),
                        }
                      }
                    ]);
                    inputBox.focus();
                  }
                }
              }
            }
          ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            height: String(checkListData[i].children[j].height) + ea,
            cursor: "pointer",
          }
        };
        tempArr.push(tempObj);

      } else if (checkListData[i].children[j].type === "matrix") {

        tempMatrix = checkListData[i].children[j].value(designer);

        tempObj = {
          mother: eachValueTong,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            width: String(checkListData[i].children[j].totalWidth) + ea,
            height: String(checkListData[i].children[j].height) + ea,
          }
        };
        tempArr.push(tempObj);

        for (let k = 0; k < tempMatrix.contents.length; k++) {
          tempObj = {
            mother: -1 + (k * -1),
            text: tempMatrix.contents[k],
            attribute: [
              { x: String(i) },
              { y: String(j) },
              { z: String(k) },
              { toggle: String(tempMatrix.value[k]) },
            ],
            events: [
              {
                type: "click",
                event: async function (e) {
                  try {
                    const x = Number(this.getAttribute('x'));
                    const y = Number(this.getAttribute('y'));
                    const z = Number(this.getAttribute('z'));
                    const toggle = Number(this.getAttribute('toggle'));
                    const multiple = checkListData[x].children[y].multiple === true;
                    const thisButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y));
                    let anothers, resultArr;
                    let whereQuery, updateQuery;

                    anothers = [];
                    for (let dom of thisButtons) {
                      if (this !== dom) {
                        anothers.push(dom);
                      }
                    }
                    if (toggle === 0) {
                      if (!multiple) {
                        for (let dom of anothers) {
                          dom.style.color = colorChip.gray4;
                          dom.setAttribute("toggle", String(0));
                        }
                      }
                      this.style.color = colorChip.green;
                      this.setAttribute("toggle", String(1));
                    } else {
                      this.style.color = colorChip.gray4;
                      this.setAttribute("toggle", String(0));
                    }

                    resultArr = [];
                    for (let dom of thisButtons) {
                      resultArr.push(Number(dom.getAttribute("toggle")));
                    }
                    updateQuery = checkListData[x].children[y].update(resultArr);
                    whereQuery = { desid };

                    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");

                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            ],
            class: [ "hoverDefault_lite", matrixButtonConst + String(i) + String(j), matrixButtonConst + String(i) + String(j) + String(k) ],
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(checkListData[i].children[j].width) + ea,
              color: colorChip[tempMatrix.value[k] === 1 ? "green" : "gray4"],
              height: String(checkListData[i].children[j].factorHeight) + ea,
              transition: "all 0.1s ease",
            }
          };
          tempArr.push(tempObj);
        }

      } else if (checkListData[i].children[j].type === "tendency") {

        tempMatrix = checkListData[i].children[j].value(designer);
        tempObj = {
          mother: eachValueTong,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            width: String(checkListData[i].children[j].totalWidth) + ea,
            height: String(checkListData[i].children[j].height) + ea,
          }
        };
        tempArr.push(tempObj);

        for (let k = 0; k < tempMatrix.contents.length; k++) {
          tempObj = {
            mother: -1 + (k * -11),
            text: tempMatrix.contents[k],
            class: [ "hoverDefault_lite" ],
            style: {
              display: "block",
              position: "relative",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(checkListData[i].children[j].totalWidth) + ea,
              color: colorChip.black,
              height: String(checkListData[i].children[j].factorHeight) + ea,
            }
          };
          tempArr.push(tempObj);
          for (let l = 0; l < 10; l++) {
            temp = (checkListData[i].children[j].totalWidth - checkListData[i].children[j].width) / 10;
            tempObj = {
              mother: -1 + (l * -1),
              attribute: [
                { x: String(i) },
                { y: String(j) },
                { z: String(k) },
                { t: String(l) },
                { toggle: String(l <= tempMatrix.value[k] ? 1 : 0) },
              ],
              events: [
                {
                  type: "click",
                  event: async function (e) {
                    try {
                      const x = Number(this.getAttribute('x'));
                      const y = Number(this.getAttribute('y'));
                      const z = Number(this.getAttribute('z'));
                      const t = Number(this.getAttribute('t'));
                      const thisButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y) + String(z));
                      let whereQuery, updateQuery;

                      for (let i = 0; i < thisButtons.length; i++) {
                        if (i <= t) {
                          thisButtons[i].setAttribute("toggle", String(1));
                          thisButtons[i].style.background = colorChip.green;
                        } else {
                          thisButtons[i].setAttribute("toggle", String(0));
                          thisButtons[i].style.background = colorChip.gray2;
                        }
                      }

                      if (checkListData[x].children[y].opposite === true) {
                        const oppositeButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y) + String(1 - z));
                        if (oppositeButtons !== null) {
                          for (let i = 0; i < oppositeButtons.length; i++) {
                            if (i < oppositeButtons.length - t - 1) {
                              oppositeButtons[i].setAttribute("toggle", String(1));
                              oppositeButtons[i].style.background = colorChip.green;
                            } else {
                              oppositeButtons[i].setAttribute("toggle", String(0));
                              oppositeButtons[i].style.background = colorChip.gray2;
                            }
                          }
                        }
                      }

                      whereQuery = { desid };
                      updateQuery = checkListData[x].children[y].update(z, t);

                      await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }
              ],
              class: [ "hoverDefault_lite", matrixButtonConst + String(i) + String(j) + String(k) ],
              style: {
                position: "absolute",
                width: String(temp) + ea,
                left: String(checkListData[i].children[j].width + (temp * l)) + ea,
                background: colorChip[l <= tempMatrix.value[k] ? "green" : "gray2"],
                top: String(tendencyTop) + ea,
                height: String(tendencyHeight) + ea,
                transition: "all 0.1s ease",
              }
            };
            if (l === 0) {
              tempObj.style.borderTopLeftRadius = tempObj.style.borderBottomLeftRadius = String(3) + "px";
            }
            if (l === 10 - 1) {
              tempObj.style.borderTopRightRadius = tempObj.style.borderBottomRightRadius = String(3) + "px";
            }
            tempArr.push(tempObj);
          }
        }
      }
      createNodes(tempArr);
    }

  }

  this.checkListBaseTong = baseTong0;
}

DesignerJs.prototype.checkListDesignerMemo = function (desid) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const baseTong = this.checkListBaseTong;
  const designer = this.designers.pick(desid);
  return async function (e) {
    try {
      if (document.getElementById("memoTong") === null) {

        let memoTong;
        let margin;
        let innerMargin;
        let titleHeight;
        let size;
        let resObj, history, career;
        let nodeArr;

        margin = 40;
        innerMargin = 15;
        titleHeight = 28;
        size = 16;

        resObj = await ajaxJson({ method: "designer", property: "history", idArr: [ desid ] }, "/getHistoryTotal");
        if (resObj[desid] === undefined) {
          throw new Error("history error");
        }
        history = resObj[desid].history;
        career = resObj[desid].career;

        memoTong = createNode({
          mother: totalMother,
          id: "memoTong",
          events: [
            {
              type: "dblclick",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            },
            {
              type: "contextmenu",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            }
          ],
          style: {
            position: "fixed",
            width: "calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 2) - " + String(margin) + ea + ")",
            height: "calc(calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 3) * 2) - " + String(margin) + ea + ")",
            bottom: String(belowHeight + margin) + ea,
            right: String(margin) + ea,
            borderRadius: String(3) + "px",
            boxShadow: "0px 5px 18px -9px " + colorChip.shadow,
            animation: "fadeup 0.3s ease forwards",
            background: colorChip.gradientGreen2,
          }
        });

        nodeArr = createNodes([
          {
            mother: memoTong,
            text: designer.designer + " 디자이너 메모",
            style: {
              position: "absolute",
              top: String(innerMargin - 1) + ea,
              left: String(innerMargin + 2) + ea,
              fontSize: String(size) + ea,
              fontWeight: String(600),
              color: colorChip.white,
            }
          },
          {
            mother: memoTong,
            style: {
              position: "absolute",
              bottom: String(innerMargin) + ea,
              left: String(innerMargin) + ea,
              width: "calc(50% - " + String(innerMargin * 1.5) + ea + ")",
              height: withOut((innerMargin * 2) + titleHeight, ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              opacity: String(0.95),
            }
          },
          {
            mother: -1,
            style: {
              position: "absolute",
              top: String(innerMargin - 2) + ea,
              left: String(innerMargin) + ea,
              width: withOut((innerMargin - 2) * 2, ea),
              height: withOut(innerMargin * 2, ea),
              background: "aqua",
            }
          },
          {
            mother: -1,
            mode: "textarea",
            events: [
              {
                type: "blur",
                event: function (e) {
                  const cookies = GeneralJs.getCookiesAll();
                  const ajaxData = "method=designer&id=" + desid + "&column=history&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                  GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                }
              },
              {
                type: "keypress",
                event: function (e) {
                  if (e.keyCode === 13) {
                    const cookies = GeneralJs.getCookiesAll();
                    const ajaxData = "method=designer&id=" + desid + "&column=history&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                    GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                  }
                }
              },
              {
                type: "contextmenu",
                event: function (e) {
                  e.stopPropagation();
                }
              }
            ],
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              fontSize: String(size - 1) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              border: String(0),
              outline: String(0),
              overflow: "scroll",
              height: String(100) + '%',
              lineHeight: String(1.7),
            }
          },
          {
            mother: memoTong,
            text: designer.designer + " 디자이너 상세 경력",
            style: {
              position: "absolute",
              top: String(innerMargin - 1) + ea,
              left: "calc(50% + " + String(innerMargin * 0.5) + ea + ")",
              fontSize: String(size) + ea,
              fontWeight: String(600),
              color: colorChip.white,
            }
          },
          {
            mother: memoTong,
            style: {
              position: "absolute",
              bottom: String(innerMargin) + ea,
              left: "calc(50% + " + String(innerMargin * 0.5) + ea + ")",
              width: "calc(50% - " + String(innerMargin * 1.5) + ea + ")",
              height: withOut((innerMargin * 2) + titleHeight, ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              opacity: String(0.95),
            }
          },
          {
            mother: -1,
            style: {
              position: "absolute",
              top: String(innerMargin - 2) + ea,
              left: String(innerMargin) + ea,
              width: withOut((innerMargin - 2) * 2, ea),
              height: withOut(innerMargin * 2, ea),
              background: "aqua",
            }
          },
          {
            mother: -1,
            mode: "textarea",
            events: [
              {
                type: "blur",
                event: function (e) {
                  const cookies = GeneralJs.getCookiesAll();
                  const ajaxData = "method=designer&id=" + desid + "&column=career&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                  GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                }
              },
              {
                type: "keypress",
                event: function (e) {
                  if (e.keyCode === 13) {
                    const cookies = GeneralJs.getCookiesAll();
                    const ajaxData = "method=designer&id=" + desid + "&column=career&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                    GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                  }
                }
              },
              {
                type: "contextmenu",
                event: function (e) {
                  e.stopPropagation();
                }
              }
            ],
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              fontSize: String(size - 1) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              border: String(0),
              outline: String(0),
              overflow: "scroll",
              height: String(100) + '%',
              lineHeight: String(1.7),
            }
          },
        ]);
        nodeArr[3].value = history;
        nodeArr[7].value = career;

      } else {
        totalMother.removeChild(document.getElementById("memoTong"));
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.checkListIconSet = function (desid, noAnimation = false) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const mother = document.querySelector(".totalMother");
  const { createNode, createNodes, colorChip, withOut, blankHref } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const designer = this.designers.pick(desid);
  let radius;
  let left, bottom;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = 20;
  left = 40;
  bottom = 40;
  margin = 6;
  color = colorChip.gradientGreen;
  iconTop = 12.5;

  nodeArr = createNodes([
    {
      mother,
      style: {
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnHamburger(colorChip.white),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: "calc(50% - " + String(radius * 0.45) + ea + ")",
        top: String(iconTop) + ea,
      }
    },
    {
      mother,
      style: {
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom + (radius * 2) + margin) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnAinitial(colorChip.white),
      style: {
        position: "absolute",
        width: String(15) + ea,
        left: String(12.5) + ea,
        top: String(11) + ea,
      }
    },
    {
      mother,
      style: {
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnDecrease(colorChip.white),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(9.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnMinitial(colorChip.white),
      style: {
        position: "absolute",
        width: String(16.5) + ea,
        left: String(11.5) + ea,
        top: String(11.5) + ea,
      }
    },
    {
      mother,
      style: {
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnIncrease(colorChip.white),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(11.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        position: "fixed",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(belowHeight + bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        animation: noAnimation ? "" : "fadeup 0.3s ease forwards",
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnRinitial(colorChip.white),
      style: {
        position: "absolute",
        width: String(14) + ea,
        left: String(13.5) + ea,
        top: String(10.5) + ea,
      }
    },
  ]);

  listIcon = nodeArr[0];
  aInitialIcon = nodeArr[2];
  previousIcon = nodeArr[4];
  mInitialIcon = nodeArr[6];
  nextIcon = nodeArr[8];
  rInitialIcon = nodeArr[10];

  this.listIcon = listIcon;
  this.aInitialIcon = aInitialIcon;
  this.previousIcon = previousIcon;
  this.mInitialIcon = mInitialIcon;
  this.nextIcon = nextIcon;
  this.rInitialIcon = rInitialIcon;

  listIcon.addEventListener("click", (e) => { instance.checkListDetailLaunching(desid, false, true); });

  previousIcon.addEventListener("click", function (e) {
    const { desid: previousDesid } = instance.designers.previous(desid);
    instance.checkListDetailLaunching(previousDesid, true);
  });

  nextIcon.addEventListener("click", function (e) {
    const { desid: nextDesid } = instance.designers.next(desid);
    instance.checkListDetailLaunching(nextDesid, true);
  });

  rInitialIcon.addEventListener("click", function (e) {
    blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general&desid=" + desid);
  });

  mInitialIcon.addEventListener("click", instance.checkListDesignerMemo(desid));

  aInitialIcon.addEventListener("click", function (e) {
    const today = new Date();
    const dayArr = [ '일', '월', '화', '수', '목', '금', '토' ];
    let expiredString = '';

    if (today.getDay() !== 0 && today.getDay() !== 6) {
      //pyeong-day
      today.setDate(today.getDate() + 7);
    } else {
      if (today.getDay() !== 0) {
        //saturday
        today.setDate(today.getDate() + 9);
      } else {
        //sunday
        today.setDate(today.getDate() + 8);
      }
    }

    expiredString += String(today.getMonth() + 1) + "월";
    expiredString += " ";
    expiredString += String(today.getDate()) + "일";
    expiredString += " ";
    expiredString += dayArr[today.getDay()] + "요일";
    expiredString += " ";
    expiredString += String(14) + "시";

    if (window.confirm(designer.designer + " 디자이너님에게 알림톡을 전송합니다. 확실합니까?\n메세지에 기입될 마감 기한 => " + expiredString)) {
      GeneralJs.ajax("method=designerCheckList&name=" + designer.designer + "&phone=" + designer.information.phone + "&option=" + JSON.stringify({ date: expiredString, desid: desid, host: "ADDRESS[homeinfo(ghost)]" }), "/alimTalk", function (rawJson) {
        let middleDate, deadDate;
        if (JSON.parse(rawJson).message !== "success") {
          throw new Error("alimTalk error");
        } else {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
          //set deadline
          middleDate = new Date();
          middleDate.setHours(middleDate.getHours() + 8);
          deadDate = new Date();
          deadDate.setDate(deadDate.getDate() + 9);
          GeneralJs.ajax("json=" + JSON.stringify({ deadline: deadDate, middleline: middleDate, name: "designerCheckList_" + desid, mode: "set" }), "/manageDeadline", function (res) {});
        }
      });
    } else {
      instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
    }
  });

}
