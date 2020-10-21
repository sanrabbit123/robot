module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = emptyDate();

  const conidMaker = function (past) {
    return "something";
  }

  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;

      totalTong = [];


      let portfolio, review;

      for (let past of row) {
        tempObj = map().structure;

        tempObj.conid = conidMaker(past);
        tempObj.desid = past.designer;

        portfolio = tempObj.contents.portfolio;

        portfolio.pid = past.p_id;

        portfolio.spaceInfo.space = past.space;
        portfolio.spaceInfo.pyeong = past.pyeong;
        portfolio.spaceInfo.region = past.sub_titles.portivec.region;
        portfolio.spaceInfo.method = past.sub_titles.portivec.method;

        portfolio.title.main = past.title;
        portfolio.title.sub = past.sub_titles.portivec.sub;

        portfolio.color.main = past.sub_titles.main_color_object.main;
        portfolio.color.sub = past.sub_titles.main_color_object.sub;
        portfolio.color.title = past.sub_titles.main_color_object.title;

        portfolio.detailInfo.photodae = past.p_info.photodae;
        portfolio.detailInfo.photosg = past.p_info.photosg;
        portfolio.detailInfo.slide = past.p_info.slide.split(" ");
        portfolio.detailInfo.tag = past.p_info.tag.split(",");
        portfolio.detailInfo.service = past.p_info.service;
        portfolio.detailInfo.sort.key8 = past.p_info.key8;
        portfolio.detailInfo.sort.key9 = past.p_info.key9;

        portfolio.contents.suggestion = past.suggestion;
        portfolio.contents.detail = [];







        review = tempObj.contents.review;




        tempObj.proid = past.proid;
        tempObj.cliid = past.cliid;
        tempObj.desid = "";
        tempObj.serid = past.service;
        tempObj.proposal.status = past.status;

        tempObj.proposal.detail = [];

        tempArr = past.proposal;
        for (let i of tempArr) {
          tempObjDetail = {};
          tempObjDetail2 = i.picture_settings.pop();

          tempObjDetail.desid = i.desid;
          tempObjDetail.fee = i.fee;
          tempObjDetail.pictureSettings = i.picture_settings;
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
