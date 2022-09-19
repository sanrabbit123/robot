const LogReport = function (MONGOC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mongo = MONGOC;
  this.host = this.address.testinfo.host;
}

LogReport.prototype.dailyReports = async function () {
  const instance = this;
  const back = this.back;
  const { host } = this;
  const { mongo, mongoinfo, requestSystem, autoComma, dateToString, stringToDate, errorLog, messageLog, messageSend, sha256Hmac } = this.mother;
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  try {
    const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
    const selfCoreMongo = new mongo(mongoinfo, { useUnifiedTopology: true });
    const selfMongo = this.mongo;
    const sheets = new GoogleSheet();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate());
    const startDay = new Date(2022, 5, 1);
    let slackMessage;

    await selfCoreMongo.connect();

    const marketingBasicMatrix = async (startDate) => {
      try {
        const clients = await back.getClientsByQuery({}, { selfMongo: selfCoreMongo, withTools: true });
        const projects = await back.getProjectsByQuery({}, { selfMongo: selfCoreMongo, withTools: true });

        const campaignEntireRows = await back.mongoRead("dailyCampaign", {}, { selfMongo });
        const analyticsEntireRows = await back.mongoRead("dailyAnalytics", {}, { selfMongo });
        const clientsEntireRows = await back.mongoRead("dailyClients", {}, { selfMongo });

        const getReportsByDate = async (targetDate, campaignEntireRows, analyticsEntireRows, clientsEntireRows, clients, projects) => {
          const campaignCollection = "dailyCampaign";
          const analyticsCollection = "dailyAnalytics";
          const clientsCollection = "dailyClients";
          const keyMaker = (date) => {
            const keyRegMaker = (date) => {
              return `${String(date.getFullYear())}${zeroAddition(date.getMonth() + 1)}${zeroAddition(date.getDate())}_`;
            }
            const analyticsIdMaker = (date) => {
              return `n${String(date.getFullYear()).slice(2)}${zeroAddition(date.getMonth() + 1)}_aa${zeroAddition(date.getDate())}s`;
            }
            const clientsIdMaker = (date) => {
              return `y${String(date.getFullYear()).slice(2)}${zeroAddition(date.getMonth() + 1)}_aa${zeroAddition(date.getDate())}s`;
            }
            return {
              campaign: keyRegMaker(date),
              analytics: analyticsIdMaker(date),
              clients: clientsIdMaker(date),
            }
          };
          const facebookCampaignBoo = (str) => {
            return ((/^[A-Z]/.test(str) || /^t/.test(str) || /^s/.test(str) || /^link/.test(str) || /^facebook/.test(str) || /^main_video/.test(str) || /^Mag/.test(str) || /^maposketch/.test(str) || /^MV/.test(str) || /^appeal/.test(str) || /^De_image/.test(str) || /^video_mom/.test(str)) && !/^home/.test(str) && !/^PO3/.test(str) && !/^M_DA/.test(str) && !/^apart/.test(str) && !/^interior/.test(str) && !/^about/.test(str) && !/^local/.test(str) && !/^consul/.test(str) && !/not set/g.test(str) && !/^mini/.test(str) && !/^local/.test(str) && !/^naver/.test(str));
          }
          const naverCampaignBoo = (str) => {
            return ((/^home/.test(str) || /^naver/.test(str) || /^[0-9]/.test(str) || /^PO3/.test(str) || /^M_DA/.test(str) || /^conver/.test(str) || /^mini/.test(str) || /^local/.test(str) || /^conver/.test(str)  || /^apart/.test(str) || /^about/.test(str)  || /^interior/.test(str) || /^new/.test(str) || /^port/.test(str) || /^recruit/.test(str) || /^review/.test(str) || /^traffic/.test(str) || /^consul/.test(str)) && !/not set/g.test(str) && !/^link/g.test(str) && !/^facebook/g.test(str) && !/^main_video/g.test(str));
          }
          const {
            campaign: campaignKey,
            analytics: analyticsKey,
            clients: clientsKey
          } = keyMaker(targetDate);
          const requests = clients.getRequestsTong();
          let campaignRows, analyticsRows, clientsRows;
          let campaignCharge, campaignImpressions, campaignClicks;
          let totalUsers, pageViews;
          let consultingViews;
          let popupOpenEvents;
          let from, to;
          let requestsNumber;
          let contractsNumber;
          let facebookRows;
          let facebookCharge;
          let facebookReach;
          let facebookImpressions;
          let facebookClicks;
          let facebookFromUsers;
          let facebookFromClicks;
          let facebookFromPopups;
          let facebookFromSubmit;
          let naverRows;
          let naverCharge;
          let naverImpressions;
          let naverClicks;
          let naverFromUsers;
          let naverFromClicks;
          let naverFromPopups;
          let naverFromSubmit;
          let firstMatrix;
          let secondMatrix;
          let thirdMatrix;
          let fourthMatrix;
          let facebookCtr;
          let facebookCpc;
          let facebookClicksConverting;
          let facebookSubmitChargeConverting;
          let facebookSubmitConverting;
          let facebookClicksChargeConverting;
          let naverCtr;
          let naverCpc;
          let naverClicksConverting;
          let naverSubmitChargeConverting;
          let naverSubmitConverting;
          let naverClicksChargeConverting;

          from = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
          to = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
          to.setDate(to.getDate() + 1);

          // get data

          campaignRows = campaignEntireRows.filter((obj) => { return (new RegExp("^" + campaignKey)).test(obj.key); });
          analyticsRows = analyticsEntireRows.find((obj) => { return obj.anaid === analyticsKey });
          clientsRows = clientsEntireRows.find((obj) => { return obj.ancid === clientsKey });
          if (analyticsRows === undefined || clientsRows === undefined) {
            throw new Error("invaild date");
          }

          // 1

          campaignCharge = campaignRows.reduce((acc, curr) => {
            return acc + curr.value.charge;
          }, 0);
          campaignImpressions = campaignRows.reduce((acc, curr) => {
            return acc + curr.value.performance.impressions;
          }, 0);
          campaignClicks = campaignRows.reduce((acc, curr) => {
            return acc + curr.value.performance.clicks;
          }, 0);

          totalUsers = analyticsRows.data.users.total;
          pageViews = analyticsRows.data.views.total;

          consultingViews = analyticsRows.data.views.detail.pagePath.cases.filter((obj) => {
            return /consulting\.php/gi.test(obj.case)
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          popupOpenEvents = analyticsRows.data.views.detail.eventAction.cases.filter((obj) => {
            return /popupOpen/gi.test(obj.case)
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          requestsNumber = requests.filter(({ request }) => {
            const thisValue = request.timeline.toNormal().valueOf();
            return thisValue >= from.valueOf() && thisValue < to.valueOf();
          }).length;

          contractsNumber = projects.toNormal().filter(({ process }) => {
            const thisValue = process.contract.first.date.valueOf();
            return thisValue >= from.valueOf() && thisValue < to.valueOf();
          }).length;

          firstMatrix = [
            [
              dateToString(targetDate),
              campaignCharge,
              campaignImpressions,
              campaignClicks,
              totalUsers,
              pageViews,
              consultingViews,
              popupOpenEvents,
              requestsNumber,
              contractsNumber,
            ]
          ];

          // 2
          // facebook

          facebookRows = campaignRows.filter((obj) => {
            return /facebook/gi.test(obj.information.mother);
          });
          if (facebookRows.length > 0) {
            facebookCharge = facebookRows.reduce((acc, curr) => {
              return acc + curr.value.charge;
            }, 0);
            facebookReach = facebookRows.reduce((acc, curr) => {
              return acc + curr.value.performance.reach;
            }, 0);
            facebookImpressions = facebookRows.reduce((acc, curr) => {
              return acc + curr.value.performance.impressions;
            }, 0);
            facebookClicks = facebookRows.reduce((acc, curr) => {
              return acc + curr.value.performance.clicks;
            }, 0);
          } else {
            facebookCharge = 0;
            facebookReach = 0;
            facebookImpressions = 0;
            facebookClicks = 0;
          }

          facebookFromUsers = analyticsRows.data.users.detail.campaign.cases.filter((obj) => {
            return facebookCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          facebookFromClicks = analyticsRows.data.conversion[1].detail.campaign.cases.filter((obj) => {
            return facebookCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          facebookFromPopups = analyticsRows.data.conversion[0].detail.campaign.cases.filter((obj) => {
            return facebookCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          facebookFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).flat().map((obj) => {
            return obj.source.campaign;
          }).filter((str) => { return facebookCampaignBoo(str) }).length;

          facebookCtr = 0;
          facebookCpc = 0;
          facebookClicksConverting = 0;
          facebookClicksChargeConverting = 0;
          facebookSubmitConverting = 0;
          facebookSubmitChargeConverting = 0;

          if (facebookImpressions !== 0) {
            facebookCtr = facebookClicks / facebookImpressions;
            facebookCtr = Math.floor(facebookCtr * 10000) / 10000;
          }
          if (facebookClicks !== 0) {
            facebookCpc = Math.round(facebookCharge / facebookClicks);
          }
          if (facebookClicks !== 0) {
            facebookClicksConverting = (facebookFromClicks + facebookFromPopups) / facebookClicks;
            facebookClicksConverting = Math.floor(facebookClicksConverting * 10000) / 10000;
          }
          if (facebookFromClicks + facebookFromPopups !== 0) {
            facebookClicksChargeConverting = Math.round(facebookCharge / (facebookFromClicks + facebookFromPopups));
          }
          if (facebookClicks !== 0) {
            facebookSubmitConverting = facebookFromSubmit / facebookClicks;
            facebookSubmitConverting = Math.floor(facebookSubmitConverting * 10000) / 10000;
          }
          if (facebookFromSubmit !== 0) {
            facebookSubmitChargeConverting = Math.round(facebookCharge / facebookFromSubmit);
          }

          secondMatrix = [
            [
              dateToString(targetDate),
              facebookCharge,
              facebookReach,
              facebookImpressions,
              facebookClicks,
              facebookFromUsers,
              facebookFromClicks,
              facebookFromPopups,
              facebookFromSubmit,
              facebookCtr,
              facebookCpc,
              facebookClicksConverting,
              facebookClicksChargeConverting,
              facebookSubmitConverting,
              facebookSubmitChargeConverting,
            ]
          ];

          // 3
          // naver

          naverRows = campaignRows.filter((obj) => {
            return /naver/gi.test(obj.information.mother);
          });
          if (naverRows.length > 0) {
            naverCharge = naverRows.reduce((acc, curr) => {
              return acc + curr.value.charge;
            }, 0);
            naverImpressions = naverRows.reduce((acc, curr) => {
              return acc + curr.value.performance.impressions;
            }, 0);
            naverClicks = naverRows.reduce((acc, curr) => {
              return acc + curr.value.performance.clicks;
            }, 0);
          } else {
            naverCharge = 0;
            naverImpressions = 0;
            naverClicks = 0;
          }

          naverFromUsers = analyticsRows.data.users.detail.campaign.cases.filter((obj) => {
            return naverCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          naverFromClicks = analyticsRows.data.conversion[1].detail.campaign.cases.filter((obj) => {
            return naverCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          naverFromPopups = analyticsRows.data.conversion[0].detail.campaign.cases.filter((obj) => {
            return naverCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          naverFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).flat().map((obj) => {
            return obj.source.campaign;
          }).filter((str) => { return naverCampaignBoo(str) }).length;

          naverCtr = 0;
          naverCpc = 0;
          naverClicksConverting = 0;
          naverClicksChargeConverting = 0;
          naverSubmitConverting = 0;
          naverSubmitChargeConverting = 0;

          if (naverImpressions !== 0) {
            naverCtr = naverClicks / naverImpressions;
            naverCtr = Math.floor(naverCtr * 10000) / 10000;
          }
          if (naverClicks !== 0) {
            naverCpc = Math.round(naverCharge / naverClicks);
          }
          if (naverClicks !== 0) {
            naverClicksConverting = (naverFromClicks + naverFromPopups) / naverClicks;
            naverClicksConverting = Math.floor(naverClicksConverting * 10000) / 10000;
          }
          if (naverFromClicks + naverFromPopups !== 0) {
            naverClicksChargeConverting = Math.round(naverCharge / (naverFromClicks + naverFromPopups));
          }
          if (naverClicks !== 0) {
            naverSubmitConverting = naverFromSubmit / naverClicks;
            naverSubmitConverting = Math.floor(naverSubmitConverting * 10000) / 10000;
          }
          if (naverFromSubmit !== 0) {
            naverSubmitChargeConverting = Math.round(naverCharge / naverFromSubmit);
          }

          thirdMatrix = [
            [
              dateToString(targetDate),
              naverCharge,
              naverImpressions,
              naverClicks,
              naverFromUsers,
              naverFromClicks,
              naverFromPopups,
              naverFromSubmit,
              naverCtr,
              naverCpc,
              naverClicksConverting,
              naverClicksChargeConverting,
              naverSubmitConverting,
              naverSubmitChargeConverting,
            ]
          ];

          // 4

          fourthMatrix = clientsRows.data.detail.map((obj) => { return { cliid: obj.cliid, ids: obj.users.map((user) => { return user.id }).join(", ") } });
          fourthMatrix = fourthMatrix.map(({ cliid, ids }) => {
            const targetRequest = requests.find((obj) => { return obj.cliid === cliid });
            return [
              dateToString(targetDate),
              cliid,
              ids,
              dateToString(targetRequest.request.timeline, true),
              targetRequest.request.space.address.value,
              targetRequest.request.space.pyeong.value,
              (targetRequest.request.space.resident.living ? "거주중" : "이사"),
              (targetRequest.request.space.resident.living ? "해당 없음" : dateToString(targetRequest.request.space.resident.expected)),
            ];
          })

          return [
            firstMatrix,
            secondMatrix,
            thirdMatrix,
            fourthMatrix
          ];
        }

        let matrix, resMatrix;
        let now;
        let standardDate;
        let dateNumber;
        let numberDate;

        matrix = [
          [
            [
              "날짜",
              "총 비용",
              "총 노출",
              "총 클릭",
              "MAU",
              "페이지뷰",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "계약수",
            ]
          ],
          [
            [
              "날짜",
              "비용",
              "도달",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
          [
            [
              "날짜",
              "비용",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
          [
            [
              "날짜",
              "아이디",
              "GA",
              "문의일",
              "주소",
              "평수",
              "거주중 여부",
              "입주 예정일",
            ]
          ],
        ];

        now = new Date();

        standardDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        standardDate.setDate(standardDate.getDate() - 1);

        numberDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        numberDate.setDate(numberDate.getDate() - 1);

        dateNumber = 0;
        while (numberDate.valueOf() >= startDate.valueOf()) {
          numberDate.setDate(numberDate.getDate() - 1);
          dateNumber++;
        }

        for (let i = 0; i < dateNumber; i++) {
          resMatrix = await getReportsByDate(standardDate, campaignEntireRows, analyticsEntireRows, clientsEntireRows, clients, projects);
          for (let i = 0; i < matrix.length; i++) {
            for (let arr of resMatrix[i]) {
              matrix[i].push(arr);
            }
          }
          standardDate.setDate(standardDate.getDate() - 1);
        }

        return matrix;

      } catch (e) {
        console.log(e);
      }
    }

    const firstSheetsId = "1QaJfS2EkrPxek3l1OFBFBoJrOjDh7BiEXFO5tx4rJP4";
    const secondSheetsId = "14xqEKuEhIlTEQL44RlgwPGgdO3TiI8SidNCb7k1y4PU";
    const thirdSheetsId = "1X3PeZPj06C6hTsVJWQKCQ8WCF05NhmqUWd6Huyhnd0k";
    const fourthSheetsId = "13wUb5uTXktWHRTAezsKKMXO0b7P6slsSQWboeItsYQU";
    const [ first, second, third, fourth ] = await marketingBasicMatrix(startDay);

    console.log(first, second, third, fourth);

    await sheets.update_value_inPython(firstSheetsId, "", first);
    await sheets.update_value_inPython(secondSheetsId, "", second);
    await sheets.update_value_inPython(thirdSheetsId, "", third);
    await sheets.update_value_inPython(fourthSheetsId, "", fourth);

    console.log("sheets update all done");

    await selfCoreMongo.close();

    slackMessage = '';
    slackMessage += dateToString(today) + " =============================";
    slackMessage += "\n";
    slackMessage += dateToString(startDay) + " ~ " + dateToString(yesterday) + " 기간의 지표를 업데이트하였습니다!";
    slackMessage += "\n";
    slackMessage += "1) Total funnul : " + "https://docs.google.com/spreadsheets/d/" + firstSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "2) Clients info : " + "https://docs.google.com/spreadsheets/d/" + secondSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "3) Facebook paid : " + "https://docs.google.com/spreadsheets/d/" + thirdSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "4) Naver paid : " + "https://docs.google.com/spreadsheets/d/" + fourthSheetsId + "/edit?usp=sharing";

    await requestSystem("https://" + host + "/marketingMessage", {
      text: slackMessage,
      channel: "#marketing",
    }, {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = LogReport;
