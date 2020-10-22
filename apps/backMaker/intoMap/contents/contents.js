module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { fileSystem, orderSystem } = Mother;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = emptyDate();

  let ORDER = {};

  const orderMaker = function (date) {
    let thisDate = date.slice(2, 4) + date.slice(5, 7);
    if (ORDER[thisDate] === undefined) {
      ORDER[thisDate] = 1;
    } else {
      ORDER[thisDate] = ORDER[thisDate] + 1;
    }
    return orderSystem(ORDER[thisDate]);
  }

  const conidMaker = function (date) {
    let conid = 't' + date.slice(2, 4) + date.slice(5, 7) + '_' + orderMaker(date) + 's';
    return conid;
  }

  const dateMaker = function (dateRaw) {
    let date;
    date = "20" + dateRaw.slice(0, 2) + "-" + dateRaw.slice(2, 4) + "-" + dateRaw.slice(4);
    return date;
  }

  const resourceDir_P = `${Mother.ghostPath()}/binary/corePortfolio/original`;
  const resourceDir_A = `${Mother.ghostPath()}/binary/corePortfolio/original/_A`;

  const contentsSort0 = function (portfolio) {
    let portfolioNum = Number(portfolio.pid.replace(/[^0-9]/g, ''));
    return Number(portfolio.date.replace(/-/g, '') + (portfolioNum < 10 ? '0' : '') + portfolio.pid.replace(/[^0-9]/g, ''));
  }

  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;
      let portfolio, review;

      const resourceDirArr_P_raw = await fileSystem(`readDir`, [ resourceDir_P ]);
      const resourceDirArr_A_raw = await fileSystem(`readDir`, [ resourceDir_A ]);

      let resourceDirArr = [];
      let resourceTemp;

      for (let name of resourceDirArr_P_raw) {
        if (name !== "_A" && name !== "_D" && name !== ".DS_Store") {
          resourceTemp = name.split("_");
          resourceDirArr.push({ pid: resourceTemp[0], date: resourceTemp[3] });
        }
      }

      for (let name of resourceDirArr_A_raw) {
        if (name !== "_A" && name !== "_D" && name !== ".DS_Store") {
          resourceTemp = name.split("_");
          resourceDirArr.push({ pid: resourceTemp[0], date: resourceTemp[2] });
        }
      }

      totalTong = [];

      for (let past of row) {
        tempObj = map().structure;

        tempObj.conid = conidMaker(past);
        tempObj.desid = past.designer;

        portfolio = tempObj.contents.portfolio;

        portfolio.pid = past.p_id;

        portfolio.spaceInfo.space = past.space;
        portfolio.spaceInfo.pyeong = Number(past.pyeong);
        portfolio.spaceInfo.region = past.sub_titles.portivec.region;
        portfolio.spaceInfo.method = past.sub_titles.portivec.method;

        portfolio.title.main = past.title;
        portfolio.title.sub = past.sub_titles.portivec.sub;

        portfolio.color.main = past.sub_titles.main_color_object.main;
        portfolio.color.sub = past.sub_titles.main_color_object.sub;
        portfolio.color.title = past.sub_titles.main_color_object.title;

        portfolio.detailInfo.photodae = past.p_info.photodae;
        portfolio.detailInfo.photosg = past.p_info.photosg;

        portfolio.detailInfo.slide = [];
        for (let i of past.p_info.slide.split(" ")) {
          portfolio.detailInfo.slide.push(Number(i));
        }

        portfolio.detailInfo.tag = past.p_info.tag.split(",");
        portfolio.detailInfo.service = past.p_info.service;
        portfolio.detailInfo.sort.key8 = past.p_info.key8;
        portfolio.detailInfo.sort.key9 = past.p_info.key9;

        portfolio.contents.suggestion = past.suggestion;
        portfolio.contents.detail = [];

        for (let { title, main_contents, smalltalk_yn, smalltalk_contents, photo_key } of past.contents) {
          tempObjDetail = {
            photoKey: 0,
            title: "",
            contents: "",
            smallTalk: {
              title: "",
              contents: "",
            },
          };

          tempObjDetail.photoKey = photo_key;
          tempObjDetail.title = title;
          tempObjDetail.contents = main_contents;
          tempObjDetail.smallTalk.title = smalltalk_yn;
          tempObjDetail.smallTalk.contents = smalltalk_contents;

          portfolio.contents.detail.push(tempObjDetail);
        }


        review = tempObj.contents.review;

        if (past.r_id !== "re999") {

          review.rid = past.r_id;

          review.title.main = past.sub_titles.rev_main_title.replace(/\n/, ", ");
          review.title.sub = past.sub_titles.rev_name_card.main.replace(/\n/, ", ");

          review.detailInfo.photodae = past.r_info.photodae;
          review.detailInfo.order = past.r_info.order;

          review.contents.detail = [];

          for (let { type, photos, contents } of past.reviews) {
            tempObjDetail = {
              type: "",
              photos: [],
              contents: [
                {
                  quest: "",
                  answer: "",
                }
              ]
            };
            tempObjDetail.type = type;
            tempObjDetail.photos = photos;
            tempObjDetail.contents = [];
            for (let obj of contents) {
              tempObjDetail.contents.push({ quest: obj.quest, answer: obj.answer });
            }

            review.contents.detail.push(tempObjDetail);
          }

        } else {
          review.rid = "re999";
          review.contents.detail = [];
        }

        for (let { pid, date } of resourceDirArr) {
          if (portfolio.pid === pid) {
            portfolio.date = dateMaker(date);
            review.date = dateMaker(date);
          }
        }

        totalTong.push(tempObj);
      }

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
