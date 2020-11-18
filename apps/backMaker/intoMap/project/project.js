module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = new Date(1800, 0, 1);
  const dateToNumberArr = function (str, detail = false) {
    let strArr, strArr2, strArr3;
    let year, month, date, hour, minute, second;
    if (!detail) {
      strArr = str.split("-");
      year = Number(strArr[0]);
      month = Number(strArr[1].replace(/^0/, '')) - 1;
      date = Number(strArr[2].replace(/^0/, ''));
      return [ year, month, date ];
    } else {
      strArr = str.split(' ');
      strArr2 = strArr[0].split("-");
      strArr3 = strArr[1].split(":");
      year = Number(strArr2[0]);
      month = Number(strArr2[1].replace(/^0/, '')) - 1;
      date = Number(strArr2[2].replace(/^0/, ''));
      hour = Number(strArr3[0].replace(/^0/, ''));
      minute = Number(strArr3[1].replace(/^0/, ''));
      second = Number(strArr3[2].replace(/^0/, ''));
      return [ year, month, date, hour, minute, second ];
    }
  }
  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;
      let tempFee;

      totalTong = [];

      for (let past of row) {
        tempObj = map().structure;
        tempObj.proid = past.proid;
        tempObj.cliid = past.cliid;
        tempObj.desid = "";

        tempObj.service = {};
        tempObj.service.serid = "";
        tempObj.service.xValue = "";

        if (/^홈스/.test(past.service)) {
          tempObj.service.serid = "s2011_aa02s";
        } else if (/^홈퍼/.test(past.service)) {
          tempObj.service.serid = "s2011_aa01s";
        } else {
          tempObj.service.serid = "s2011_aa03s";
        }

        if (/mini/gi.test(past.service)) {
          tempObj.service.xValue = "M";
        } else if (/basic/gi.test(past.service)) {
          tempObj.service.xValue = "B";
        } else {
          tempObj.service.xValue = "P";
        }

        tempObj.proposal.status = past.status;
        tempObj.proposal.date = EMPTYDATE;
        tempObj.proposal.detail = [];

        tempArr = past.proposal;
        for (let i of tempArr) {
          tempObjDetail = {};
          tempObjDetail2 = i.picture_settings.pop();

          tempObjDetail.desid = i.desid;
          tempObjDetail.fee = [];
          for (let j of i.fee) {
            tempFee = {};
            tempFee.method = j.method;
            tempFee.partial = j.partial;
            tempFee.amount = j.money;
            tempObjDetail.fee.push(tempFee);
          }
          tempObjDetail.pictureSettings = i.picture_settings;

          for (let j of tempObjDetail.pictureSettings) {
            if (/a04/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a04/g, 'a4');
              j.imgSrc = j.imgSrc.replace(/a04/g, 'a4');
            }
            if (/a05/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a05/g, 'a5');
              j.imgSrc = j.imgSrc.replace(/a05/g, 'a5');
            }
            if (/a08/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a08/g, 'a8');
              j.imgSrc = j.imgSrc.replace(/a08/g, 'a8');
            }
            if (/a09/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a09/g, 'a9');
              j.imgSrc = j.imgSrc.replace(/a09/g, 'a9');
            }
            if (/a01/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a01/g, 'p1');
              j.imgSrc = j.imgSrc.replace(/a01/g, 'p1');
            }
            if (/a31/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a31/g, 'p2');
              j.imgSrc = j.imgSrc.replace(/a31/g, 'p2');
            }
            if (/a12/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a12/g, 'p3');
              j.imgSrc = j.imgSrc.replace(/a12/g, 'p3');
            }
            if (/a43/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a43/g, 'p4');
              j.imgSrc = j.imgSrc.replace(/a43/g, 'p4');
            }
            if (/a44/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/a44/g, 'p5');
              j.imgSrc = j.imgSrc.replace(/a44/g, 'p5');
            }
            if (/p06/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/p06/g, 'p6');
              j.imgSrc = j.imgSrc.replace(/p06/g, 'p6');
            }
            if (/p07/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/p07/g, 'p7');
              j.imgSrc = j.imgSrc.replace(/p07/g, 'p7');
            }
            if (/p08/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/p08/g, 'p8');
              j.imgSrc = j.imgSrc.replace(/p08/g, 'p8');
            }
            if (/p09/g.test(j.styleText)) {
              j.styleText = j.styleText.replace(/p09/g, 'p9');
              j.imgSrc = j.imgSrc.replace(/p09/g, 'p9');
            }
          }

          tempObjDetail.description = Object.values(tempObjDetail2);

          tempObj.proposal.detail.push(tempObjDetail);
        }

        totalTong.push(tempObj);
      }

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
