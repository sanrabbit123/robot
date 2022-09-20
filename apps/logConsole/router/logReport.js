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
  const address = this.address;
  const { host } = this;
  const { mongo, mongoinfo, requestSystem, autoComma, dateToString, stringToDate, errorLog, messageLog, messageSend, serviceParsing } = this.mother;
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  try {
    const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
    const selfCoreMongo = new mongo(mongoinfo, { useUnifiedTopology: true });
    const selfMongo = this.mongo;
    const sheets = new GoogleSheet();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const startDay = new Date(2022, 5, 1);
    let slackMessage;

    await selfCoreMongo.connect();

    // day report
    const marketingBasicMatrix = async (startDate) => {
      try {
        const queryStandardDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        queryStandardDate.setMonth(queryStandardDate.getMonth() - 3);

        const clients = await back.getClientsByQuery({ requests: { $elemMatch: { "request.timeline": { $gte: queryStandardDate } } } }, { selfMongo: selfCoreMongo, withTools: true });
        const projects = await back.getProjectsByQuery({ "proposal.date": { $gte: queryStandardDate } }, { selfMongo: selfCoreMongo, withTools: true });
        const clientHistories = (await requestSystem("https://" + address.backinfo.host + "/getHistoryProperty", {
          idArr: clients.toNormal().map((obj) => { return obj.cliid }),
          property: "curation",
          method: "client",
        }, { headers: { "Content-Type": "application/json" } })).data;

        const campaignEntireRows = await back.mongoRead("dailyCampaign", {}, { selfMongo });
        const analyticsEntireRows = await back.mongoRead("dailyAnalytics", {}, { selfMongo });
        const clientsEntireRows = await back.mongoRead("dailyClients", {}, { selfMongo });

        const getReportsByDate = async (targetDate, campaignEntireRows, analyticsEntireRows, clientsEntireRows, clients, projects, clientHistories) => {
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
            return ((/^[A-Z]/.test(str) || /^t/.test(str) || /^s/.test(str) || /^link/.test(str) || /^facebook/.test(str) || /^main_video/.test(str) || /^Mag/.test(str) || /^maposketch/.test(str) || /^MV/.test(str) || /^appeal/.test(str) || /^De_image/.test(str) || /^video_mom/.test(str)) && !/^home/.test(str) && !/^PO3/.test(str) && !/^M_DA/.test(str) && !/^apart/.test(str) && !/^interior/.test(str) && !/^about/.test(str) && !/^local/.test(str) && !/^consul/.test(str) && !/not set/g.test(str) && !/^mini/.test(str) && !/^local/.test(str) && !/^naver/.test(str) && !/^google/.test(str));
          }
          const naverCampaignBoo = (str) => {
            return ((/^home/.test(str) || /^naver/.test(str) || /^[0-9]/.test(str) || /^PO3/.test(str) || /^M_DA/.test(str) || /^conver/.test(str) || /^mini/.test(str) || /^local/.test(str) || /^conver/.test(str)  || /^apart/.test(str) || /^about/.test(str)  || /^interior/.test(str) || /^new/.test(str) || /^port/.test(str) || /^recruit/.test(str) || /^review/.test(str) || /^traffic/.test(str) || /^consul/.test(str)) && !/not set/g.test(str) && !/^link/g.test(str) && !/^facebook/g.test(str) && !/^main_video/g.test(str) && !/^google/.test(str));
          }
          const googleCampaignBoo = (str) => {
            return ((/^[ㄱ-ㅎ]/.test(str) || /^[가-힣]/.test(str) || /^google/.test(str)) && !/not set/g.test(str) && !/^home/g.test(str) && !/^facebook/g.test(str) && !/^link/g.test(str) && !/^local/g.test(str) && !/^naver/g.test(str));
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
          let fifthMatrix;
          let fifthMatrixFactorArr;
          let sixthMatrix;
          let googleRows;
          let googleCharge;
          let googleImpressions;
          let googleClicks;
          let googleFromUsers;
          let googleFromClicks;
          let googleFromPopups;
          let googleFromSubmit;
          let googleCtr;
          let googleCpc;
          let googleClicksConverting;
          let googleClicksChargeConverting;
          let googleSubmitConverting;
          let googleSubmitChargeConverting;
          let seventhMatrix;


          from = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
          to = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
          to.setDate(to.getDate() + 1);

          // get data

          campaignRows = campaignEntireRows.filter((obj) => { return (new RegExp("^" + campaignKey)).test(obj.key); });
          analyticsRows = analyticsEntireRows.find((obj) => { return obj.anaid === analyticsKey });
          clientsRows = clientsEntireRows.find((obj) => { return obj.ancid === clientsKey });
          if (analyticsRows === undefined || clientsRows === undefined) {
            console.log(analyticsKey, clientsKey);
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

          fourthMatrix = clientsRows.data.detail.map((obj) => { return { cliid: obj.cliid, users: obj.users, ids: obj.users.map((user) => { return user.id }).join(", ") } });
          fourthMatrix = fourthMatrix.map(({ cliid, users, ids }) => {
            const targetRequest = requests.find((obj) => { return obj.cliid === cliid });
            const targetHistory = clientHistories[cliid];
            let returnType;
            let source, sourceArr;
            let campaign, campaignArr;
            let device;
            let referrer, referrerArr;
            let service;

            if (users.every((obj) => { return /^New/.test(obj.type); })) {
              returnType = "신규";
            } else {
              returnType = "재방문";
            }

            sourceArr = users.map((obj) => { return obj.source.mother }).filter((str) => { return str !== "(direct)" });
            campaignArr = users.map((obj) => { return obj.source.campaign }).filter((str) => { return str !== "(not set)" });

            if (sourceArr.length > 0) {
              source = sourceArr[0];
            } else {
              source = "(direct)";
            }

            if (campaignArr.length > 0) {
              campaign = campaignArr[0];
            } else {
              campaign = "(not set)";
            }

            if (users.length > 0) {
              device = users[0].device.kinds;
            } else {
              device = "(not set)";
            }

            referrerArr = users.map((obj) => { return obj.source.referrer }).flat();
            referrerArr.sort((a, b) => { return b.length - a.length });
            if (referrerArr.length > 0) {
              referrer = referrerArr[0];
            } else {
              referrer = "(not set)";
            }

            if (targetHistory.service.serid.length > 0) {
              service = serviceParsing(targetHistory.service.serid[0]);
            } else {
              service = "알 수 없음";
            }

            return [
              dateToString(targetDate),
              cliid,
              targetRequest.name,
              ids,
              dateToString(targetRequest.request.timeline, true),
              returnType,
              source,
              campaign,
              device,
              referrer,
              targetRequest.request.space.address.value,
              targetRequest.request.space.pyeong.value,
              (targetRequest.request.space.resident.living ? "거주중" : "이사"),
              (targetRequest.request.space.resident.living ? "해당 없음" : dateToString(targetRequest.request.space.resident.expected)),
              service,
            ];
          });

          // 5

          fifthMatrix = [];

          for (let campaignRow of campaignRows) {
            fifthMatrixFactorArr = [];
            fifthMatrixFactorArr.push(dateToString(targetDate));
            fifthMatrixFactorArr.push(campaignRow.information.mother);
            fifthMatrixFactorArr.push(campaignRow.information.type);
            fifthMatrixFactorArr.push(campaignRow.information.id.campaign);
            fifthMatrixFactorArr.push(campaignRow.information.name);
            fifthMatrixFactorArr.push(campaignRow.value.charge);
            fifthMatrixFactorArr.push(campaignRow.value.performance.impressions);
            fifthMatrixFactorArr.push(campaignRow.value.performance.clicks);
            fifthMatrix.push(fifthMatrixFactorArr);
          }


          // 6

          sixthMatrix = clientsRows.data.detail.map((obj) => { return { cliid: obj.cliid, users: obj.users, ids: obj.users.map((user) => { return user.id }).join(", ") } });
          sixthMatrix = sixthMatrix.map(({ cliid, users, ids }) => {
            const targetRequest = requests.find((obj) => { return obj.cliid === cliid });
            const targetHistory = clientHistories[cliid];
            const targetProjects = projects.toNormal().filter((obj) => { return obj.cliid === cliid });
            let targetProject;
            let returnType;
            let source, sourceArr;
            let campaign, campaignArr;
            let device;
            let referrer, referrerArr;
            let service;

            if (users.every((obj) => { return /^New/.test(obj.type); })) {
              returnType = "신규";
            } else {
              returnType = "재방문";
            }

            sourceArr = users.map((obj) => { return obj.source.mother }).filter((str) => { return str !== "(direct)" });
            campaignArr = users.map((obj) => { return obj.source.campaign }).filter((str) => { return str !== "(not set)" });

            if (sourceArr.length > 0) {
              source = sourceArr[0];
            } else {
              source = "(direct)";
            }

            if (campaignArr.length > 0) {
              campaign = campaignArr[0];
            } else {
              campaign = "(not set)";
            }

            if (users.length > 0) {
              device = users[0].device.kinds;
            } else {
              device = "(not set)";
            }

            referrerArr = users.map((obj) => { return obj.source.referrer }).flat();
            referrerArr.sort((a, b) => { return b.length - a.length });
            if (referrerArr.length > 0) {
              referrer = referrerArr[0];
            } else {
              referrer = "(not set)";
            }

            if (targetHistory.service.serid.length > 0) {
              service = serviceParsing(targetHistory.service.serid[0]);
            } else {
              service = "알 수 없음";
            }

            targetProject = targetProjects.find((obj) => {
              obj.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            });
            if (targetProject === undefined && targetProjects.length > 0) {
              targetProject = targetProjects[0];
            }
            if (targetProject === undefined) {
              targetProject = null;
            }

            return [
              dateToString(targetDate),
              cliid,
              targetRequest.name,
              ids,
              dateToString(targetRequest.request.timeline, true),
              targetProject === null ? "1800-01-01" : dateToString(targetProject.process.contract.first.date, true),
              returnType,
              source,
              campaign,
              device,
              referrer,
              targetRequest.request.space.address.value,
              targetRequest.request.space.pyeong.value,
              targetRequest.request.budget.value,
              targetRequest.request.family.value,
              (targetRequest.request.space.resident.living ? "거주중" : "이사"),
              (targetRequest.request.space.resident.living ? "해당 없음" : dateToString(targetRequest.request.space.resident.expected)),
              (targetRequest.request.space.partial.boo ? "부분 공간" : "전체 공간"),
              targetProject === null ? "알 수 없음" : (targetProject.service.online ? "온라인" : "오프라인"),
              service,
              targetProject === null ? "알 수 없음" : serviceParsing(targetProject.service.serid),
            ];
          }).filter((arr) => {
            const cliid = arr[1];
            const targetProject = projects.toNormal().find((obj) => { return obj.cliid === cliid });
            if (targetProject === undefined || targetProject === null) {
              return false;
            } else {
              return targetProject.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf();
            }
          });


          // 7
          // google

          googleRows = campaignRows.filter((obj) => {
            return /google/gi.test(obj.information.mother);
          });
          if (googleRows.length > 0) {
            googleCharge = googleRows.reduce((acc, curr) => {
              return acc + curr.value.charge;
            }, 0);
            googleImpressions = googleRows.reduce((acc, curr) => {
              return acc + curr.value.performance.impressions;
            }, 0);
            googleClicks = googleRows.reduce((acc, curr) => {
              return acc + curr.value.performance.clicks;
            }, 0);
          } else {
            googleCharge = 0;
            googleImpressions = 0;
            googleClicks = 0;
          }

          googleFromUsers = analyticsRows.data.users.detail.campaign.cases.filter((obj) => {
            return googleCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          googleFromClicks = analyticsRows.data.conversion[1].detail.campaign.cases.filter((obj) => {
            return googleCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          googleFromPopups = analyticsRows.data.conversion[0].detail.campaign.cases.filter((obj) => {
            return googleCampaignBoo(obj.case);
          }).reduce((acc, curr) => {
            return acc + curr.value;
          }, 0);

          googleFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).flat().map((obj) => {
            return obj.source.campaign;
          }).filter((str) => { return googleCampaignBoo(str) }).length;

          googleCtr = 0;
          googleCpc = 0;
          googleClicksConverting = 0;
          googleClicksChargeConverting = 0;
          googleSubmitConverting = 0;
          googleSubmitChargeConverting = 0;

          if (googleImpressions !== 0) {
            googleCtr = googleClicks / googleImpressions;
            googleCtr = Math.floor(googleCtr * 10000) / 10000;
          }
          if (googleClicks !== 0) {
            googleCpc = Math.round(googleCharge / googleClicks);
          }
          if (googleClicks !== 0) {
            googleClicksConverting = (googleFromClicks + googleFromPopups) / googleClicks;
            googleClicksConverting = Math.floor(googleClicksConverting * 10000) / 10000;
          }
          if (googleFromClicks + googleFromPopups !== 0) {
            googleClicksChargeConverting = Math.round(googleCharge / (googleFromClicks + googleFromPopups));
          }
          if (googleClicks !== 0) {
            googleSubmitConverting = googleFromSubmit / googleClicks;
            googleSubmitConverting = Math.floor(googleSubmitConverting * 10000) / 10000;
          }
          if (googleFromSubmit !== 0) {
            googleSubmitChargeConverting = Math.round(googleCharge / googleFromSubmit);
          }

          seventhMatrix = [
            [
              dateToString(targetDate),
              googleCharge,
              googleImpressions,
              googleClicks,
              googleFromUsers,
              googleFromClicks,
              googleFromPopups,
              googleFromSubmit,
              googleCtr,
              googleCpc,
              googleClicksConverting,
              googleClicksChargeConverting,
              googleSubmitConverting,
              googleSubmitChargeConverting,
            ]
          ];

          return [
            firstMatrix,
            secondMatrix,
            thirdMatrix,
            fourthMatrix,
            fifthMatrix,
            sixthMatrix,
            seventhMatrix,
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
              "고객명",
              "GA",
              "문의일",
              "재방문 여부",
              "소스",
              "캠패인",
              "디바이스",
              "레퍼럴",
              "주소",
              "평수",
              "거주중 여부",
              "입주 예정일",
              "희망 서비스",
            ]
          ],
          [
            [
              "날짜",
              "채널",
              "종류",
              "아이디",
              "이름",
              "비용",
              "노출",
              "클릭",
            ]
          ],
          [
            [
              "날짜",
              "아이디",
              "고객명",
              "GA",
              "문의일",
              "계약일",
              "재방문 여부",
              "소스",
              "캠패인",
              "디바이스",
              "레퍼럴",
              "주소",
              "평수",
              "예산",
              "가족 구성원",
              "거주중 여부",
              "입주 예정일",
              "부분 여부",
              "온라인 여부",
              "희망 서비스",
              "계약 서비스",
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
          resMatrix = await getReportsByDate(standardDate, campaignEntireRows, analyticsEntireRows, clientsEntireRows, clients, projects, clientHistories);
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

    // week report
    const saDefaultMatrix = async (startDate) => {
      try {
        const now = new Date();
        const res = await requestSystem("https://" + address.backinfo.host + "/getClientReport", {
          startYear: String(startDate.getFullYear()),
          startMonth: String(startDate.getMonth() + 1),
          endYear: String(now.getFullYear()),
          endMonth: String(now.getMonth() + 1),
        }, {
          headers: { "Content-Type": "application/json" }
        });
        let weekMatrix;
        let thisYear, thisMonth;
        let clientSum, proposalSum, recommendSum, contractSum, processSum;

        weekMatrix = [];
        weekMatrix.push([ "년도", "월", "주 시작일", "주 종료일", "문의수", "제안수", "추천수", "계약수", "진행수" ]);

        for (let arr of res.data) {

          clientSum = 0;
          proposalSum = 0;
          recommendSum = 0;
          contractSum = 0;
          processSum = 0;

          for (let { startDay, endDay, client, proposal, recommend, contract, process } of arr) {
            [ thisYear, thisMonth ] = startDay.split('-').map((str) => { return Number(str); });
            weekMatrix.push([
              thisYear,
              thisMonth,
              startDay,
              endDay,
              client,
              proposal,
              recommend,
              contract,
              process
            ]);

            clientSum += client;
            proposalSum += proposal;
            recommendSum += recommend;
            contractSum += contract;
            processSum += process;

          }

          weekMatrix.push([
            '',
            '',
            '',
            String(thisMonth) + "월 총합",
            clientSum,
            proposalSum,
            recommendSum,
            contractSum,
            processSum,
          ]);

          weekMatrix.push([
            '',
            '',
            '',
            '',
            '',
            "제안율",
            (clientSum === 0 ? 0 : String((Math.round((proposalSum / clientSum) * 10000)) / 100) + '%'),
            "진행율",
            (clientSum === 0 ? 0 : String((Math.round((processSum / clientSum) * 10000)) / 100) + '%'),
          ]);

          weekMatrix.push([
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ]);

        }

        return [ weekMatrix ];

      } catch (e) {
        console.log(e);
      }
    }

    const firstSheetsId = "1QaJfS2EkrPxek3l1OFBFBoJrOjDh7BiEXFO5tx4rJP4";
    const secondSheetsId = "14xqEKuEhIlTEQL44RlgwPGgdO3TiI8SidNCb7k1y4PU";
    const thirdSheetsId = "1X3PeZPj06C6hTsVJWQKCQ8WCF05NhmqUWd6Huyhnd0k";
    const fourthSheetsId = "13wUb5uTXktWHRTAezsKKMXO0b7P6slsSQWboeItsYQU";
    const fifthSheetsId = "1QFr_a5cnexPyvcKAsIDvcq7SCwHKLAbiQcQGkcoeuAo";
    const sixthSheetsId = "1d64IEb9S4MIfb0rTQW1ojWI9Tq6utyzdE6MEsEbVvcs";
    const seventhSheetsId = "1XvZGAalipoQFzwWM178_c8Ect6n2hRf_MV5OfSXGfl8";
    const eighthSheetsId = "1TPSsXlaNz8ZssqImPZUYTZvnsqRuInSQXaAoFJ-CttU";
    const [ first, second, third, fourth, fifth, sixth, seventh ] = await marketingBasicMatrix(startDay);
    const [ eighth ] = await saDefaultMatrix(startDay);

    console.log(first, second, third, fourth, fifth, sixth, seventh);

    await sheets.update_value_inPython(firstSheetsId, "", first);
    await sheets.update_value_inPython(secondSheetsId, "", second);
    await sheets.update_value_inPython(thirdSheetsId, "", third);
    await sheets.update_value_inPython(fourthSheetsId, "", fourth);
    await sheets.update_value_inPython(fifthSheetsId, "", fifth);
    await sheets.update_value_inPython(sixthSheetsId, "", sixth);
    await sheets.update_value_inPython(seventhSheetsId, "", seventh);
    await sheets.update_value_inPython(eighthSheetsId, "", eighth);

    console.log("sheets update all done");

    await selfCoreMongo.close();

    slackMessage = '';
    slackMessage += dateToString(today) + " ====================================================";
    slackMessage += "\n";
    slackMessage += dateToString(startDay) + " ~ " + dateToString(yesterday) + " 기간의 지표를 업데이트하였습니다!";
    slackMessage += "\n";
    slackMessage += "1) Total funnel : " + "https://docs.google.com/spreadsheets/d/" + firstSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "2) Clients info : " + "https://docs.google.com/spreadsheets/d/" + fourthSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "3) Contracts info : " + "https://docs.google.com/spreadsheets/d/" + sixthSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "4) Statistics weekly : " + "https://docs.google.com/spreadsheets/d/" + eighthSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "5) Facebook paid : " + "https://docs.google.com/spreadsheets/d/" + secondSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "6) Naver paid : " + "https://docs.google.com/spreadsheets/d/" + thirdSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "7) Google paid : " + "https://docs.google.com/spreadsheets/d/" + seventhSheetsId + "/edit?usp=sharing";
    slackMessage += "\n";
    slackMessage += "8) Campaign paid : " + "https://docs.google.com/spreadsheets/d/" + fifthSheetsId + "/edit?usp=sharing";

    // await requestSystem("https://" + host + "/marketingMessage", {
    //   text: slackMessage,
    //   channel: "#marketing",
    // }, {
    //   headers: { "Content-Type": "application/json" }
    // });

  } catch (e) {
    console.log(e);
  }
}

module.exports = LogReport;
