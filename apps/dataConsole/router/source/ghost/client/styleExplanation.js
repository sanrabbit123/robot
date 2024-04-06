/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('홈리에종 서비스 큐레이션 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 큐레이션 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "styleExplanation",
  "hangul": "서비스 큐레이션",
  "route": [
    "styleExplanation"
  ]
} %/%/g

const StyleExplanationJs = function () {
  this.mother = new GeneralJs();
}

StyleExplanationJs.binaryPath = "/middle/style";

StyleExplanationJs.randomPick = function (photos, contentsArr, pictureNumber, roomsIntersection = false) {
  if (typeof photos !== "object" || typeof contentsArr !== "object" || typeof pictureNumber !== "number" || typeof roomsIntersection !== "boolean") {
    throw new Error("invaild input");
  }
  const photoLength = photos.length;
  const conidArr = Array.from(new Set(photos.map((obj) => { return obj.conid })));
  const standard = 50;
  const stackName = "styleCheckNum";
  const limit = 1;
  let randoms;
  let randomPick, randomPick_raw, contentsPick;
  let randomPickFiles, randomPickFiles_new;
  let temp, temp2, tempArr;
  let rooms, room;
  let accumulation;
  let num, num2;
  let length0, length1;

  if (typeof GeneralJs.stacks[stackName] !== "number") {
    throw new Error("stack first");
  }

  num2 = 0;
  do {
    if (num >= standard) {
      break;
    }
    do {
      temp = [];
      num = 0;
      while (num < standard + pictureNumber) {
        if (temp.length === pictureNumber) {
          break;
        }
        temp2 = Math.floor(Math.random() * conidArr.length);
        if (num < standard) {
          if (!temp.includes(temp2) && conidArr.length >= temp2) {
            temp.push(temp2);
          }
        } else {
          if (conidArr.length >= temp2) {
            temp.push(temp2);
          }
        }
        num++;
      }
      temp.sort((a, b) => { return a - b; });
      randoms = [];
      for (let n of temp) {
        randoms.push(conidArr[n]);
      }
      contentsPick = [];
      for (let conid of randoms) {
        for (let obj of contentsArr) {
          if (conid === obj.conid) {
            contentsPick.push(obj);
          }
        }
      }
      rooms = [];
      for (let obj of contentsPick) {
        tempArr = [];
        for (let { title } of obj.contents.portfolio.contents.detail) {
          if (title !== "init") {
            tempArr.push(title);
          }
        }
        rooms.push(tempArr);
      }
      accumulation = [];
      for (let arr of rooms) {
        tempArr = [];
        for (let a of arr) {
          if (roomsIntersection) {
            if (!accumulation.includes(a)) {
              tempArr.push(a);
            }
          } else {
            tempArr.push(a);
          }
        }
        if (tempArr.length > 0) {
          room = tempArr[Math.floor(Math.random() * tempArr.length)];
          accumulation.push(room);
        }
      }
    } while (accumulation.length !== randoms.length);
    randomPick_raw = [];
    for (let i = 0; i < randoms.length; i++) {
      for (let obj of photos) {
        if (obj.conid === randoms[i] && obj.room === accumulation[i] && obj.gs === 'g') {
          randomPick_raw.push(obj);
          break;
        }
      }
    }

    randomPickFiles = randomPick_raw.map((obj) => { return obj.file; });
    randomPick = [];
    for (let obj of randomPick_raw) {
      randomPickFiles_new = [];
      length0 = randomPickFiles.length;
      for (let file of randomPickFiles) {
        if (obj.file !== file) {
          randomPickFiles_new.push(file);
        }
      }
      randomPickFiles = JSON.parse(JSON.stringify(randomPickFiles_new));
      length1 = randomPickFiles.length;
      if (length0 !== length1) {
        randomPick.push(obj);
      }
    }

    num2++;
  } while (randomPick.length !== pictureNumber);

  if (randomPick.length !== pictureNumber || GeneralJs.stacks[stackName] > limit) {
    return { complete: true, photos };
  } else {
    return randomPick;
  }
}

StyleExplanationJs.photoFilter = function (photos, picks) {
  if (typeof photos !== "object" || !Array.isArray(picks)) {
    throw new Error("invaild input");
  }
  if (picks.length < 3) {
    throw new Error("invaild picks");
  }
  const ratio = 0.7;
  const [ pick0, pick1, pick2 ] = picks;
  let threePick;
  let set0, set1, set2;
  let tendencyMatrix;
  let files;

  files = [];
  for (let obj of picks) {
    files.push(obj.file);
  }

  set0 = new Set(pick0.keywords);
  set1 = new Set(pick1.keywords);
  set2 = new Set(pick2.keywords);

  threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)));
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set0));
  }
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set1));
  }
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set2));
  }

  photos = photos.filter((obj) => { return obj.keywords.some((s) => { return threePick.includes(s); }) });
  photos = photos.filter((obj) => { return !files.includes(obj.file); });

  tendencyMatrix = new Array(pick0.tendency.length);
  for (let i = 0; i < tendencyMatrix.length; i++) {
    tendencyMatrix[i] = Math.round(((pick0.tendency[i] + pick1.tendency[i] + pick2.tendency[i]) / 3) * 100) / 100;
  }

  photos.sort((a, b) => {
    const length = tendencyMatrix.length;
    let sum0, sum1;
    sum0 = 0;
    sum1 = 0;
    for (let i = 0; i < length; i++) {
      sum0 += Math.abs(a.tendency[i] - tendencyMatrix[i]);
      sum1 += Math.abs(b.tendency[i] - tendencyMatrix[i]);
    }
    sum0 = sum0 / length;
    sum1 = sum1 / length;
    return sum0 - sum1;
  });

  return photos.slice(0, Math.floor(photos.length * ratio));
}

StyleExplanationJs.prototype.styleCheck = function (mother) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, colorExtended, cleanChildren, isMac, sleep, ajaxJson, equalJson } = GeneralJs;
  const { photos, contentsArr, designers, ghostBaseClassName } = this;
  const pictureBoxClassName = "pictureBoxClassName";
  const pictureWordingTargetClassName = "pictureWordingTargetClassName";
  const greenClassName = "greenRemoveTarget";
  const stackName = "styleCheckNum";
  const loadingName = "loading";
  let pictureNumber, columnNumber;
  let randomPick, targetPhotos;
  let pictureBox;
  let innerMargin;
  let pictureMargin;
  let pannelHeight;
  let pannelWordsSize;
  let pannelWordsPadding;
  let pannelLineTop;
  let arrowTop, arrowWidth;
  let tempDom;
  let photoHeight, photoWidth, photoWidthCss, photoHeightCss;
  let resetEvent;
  let arrowEvent;
  let pickupDesigners;
  let image;
  let firstPhoto;
  let questionBlock;
  let whiteMargin;
  let arrowZoneHeight;
  let questionWording;
  let completeWording;

  GeneralJs.stacks[stackName] = 0;
  GeneralJs.stacks[loadingName] = false;

  pictureNumber = <%% 15, 12, 12, 12, 8 %%>;
  columnNumber = <%% 5, 4, 4, 4, 2 %%>;

  innerMargin = 0;
  pictureMargin = <%% 6, 6, 6, 4, 1 %%>;

  pannelHeight = <%% 114, 114, 114, 90, 18 %%>;
  pannelPaddingTop = <%% 18, 18, 18, 18, 0 %%>;
  pannelWordsSize = <%% 20, 20, 20, 20, 4 %%>;
  pannelWordsPadding = <%% 10, 10, 10, 10, 10 %%>;
  pannelLineTop = <%% 31, 31, 31, 31, 25 %%>;

  arrowTop = <%% 27, 27, 27, 27, 2 %%>;
  arrowWidth = <%% 10, 10, 10, 8, 2 %%>;

  arrowZoneHeight = <%% 28, 28, 28, 28, 28 %%>;

  whiteMargin = 0;

  questionWording = "마음에 드는 사진을 3장 골라주세요!";
  completeWording = "하단의 '선택 완료하기' 버튼을 눌러주세요!"

  image = [];

  firstPhoto = <&& [ "t22p18.jpg", "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p102.jpg", "t3p41.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] &&>;

  if (Math.random() < 0.5) {
    randomPick = photos.filter((obj) => { return firstPhoto.includes(obj.file) }).reverse();
  } else {
    randomPick = photos.filter((obj) => { return firstPhoto.includes(obj.file) });
  }

  this.randomPick = randomPick;
  targetPhotos = randomPick.map((obj) => { return BRIDGEHOST.replace(/\:3000$/gi, '') + obj.path; });
  this.photoPosition = [];

  mother.style.paddingTop = desktop ? String(innerMargin) + ea : String(0) + ea;
  if (mobile) {
    mother.style.background = "";
    mother.style.boxShadow = "";
  }

  if (desktop) {
    photoWidth = (this.mother.standardWidth - (whiteMargin * 2) - (innerMargin * 2) - (pictureMargin * (columnNumber - 1))) / columnNumber;
  } else {
    photoWidth = (this.mother.standardWidth - (whiteMargin * 2) - (0 * 2) - (pictureMargin * (columnNumber - 1))) / columnNumber;
  }
  photoWidthCss = "calc(calc(100% - " + String(pictureMargin * (columnNumber - 1)) + ea + ") / " + String(columnNumber) + ")";
  photoHeight = (205 / 297) * (photoWidth);
  photoHeightCss = String(photoHeight) + ea;

  pickupDesigners = function () {
    const photos = instance.photos;
    if (photos.length !== 0) {
      let tendencyAverage, designers, average;
      designers = JSON.parse(JSON.stringify(instance.designers));
      tendencyAverage = (new Array(photos[0].tendency.length)).fill(0, 0);
      for (let { tendency } of photos) {
        for (let i = 0; i < tendency.length; i++) {
          tendencyAverage[i] += tendency[i];
        }
      }
      tendencyAverage = tendencyAverage.map((n) => { return Math.round((n / photos.length) * 100) / 100; });

      for (let designer of designers) {
        average = 0;
        for (let i = 0; i < tendencyAverage.length; i++) {
          average += Math.abs(tendencyAverage[i] - designer.tendency[i]);
        }
        designer.tendencyLength = average;
      }

      designers.sort((a, b) => { return a.tendencyLength - b.tendencyLength });
      designers = designers.filter((d) => { return /완료/gi.test(d.information.contract.status); });
      designers = designers.map((obj) => { return obj.desid; });

      instance.totalValues[12] = GeneralJs.objectDeepCopy(image);
      document.querySelector('.' + ghostBaseClassName).parentNode.style.height = String(<&& 1420 | 1323 | 1174 | 1323 | 132 &&>) + ea;

      ajaxJson({
        page: "styleCuration",
        mode: "update",
        cliid: instance.client.cliid,
        update: { x: "style", y: 0, value: designers }
      }, BACKHOST + "/ghostClient_updateAnalytics").then(() => {
        return ajaxJson({
          page: "styleCuration",
          mode: "image",
          cliid: instance.client.cliid,
          image: image
        }, BACKHOST + "/ghostClient_updateAnalytics");
      }).then(() => {
        return ajaxJson({
          cliid: instance.client.cliid,
          name: instance.client.name,
          image: image,
        }, BACKHOST + "/styleCuration_styleCheckComplete");
      }).then(() => {
        return GeneralJs.homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "styleCheck",
          data: {
            cliid: instance.client.cliid,
            name: instance.client.name,
            image: image,
          },
        });
      }).catch((err) => {
        GeneralJs.ajaxJson({ message: "StyleExplanationJs.styleCheck.pickupDesigners : " + err.message }, BACKHOST + "/errorLog").catch((e) => {});
      });

    }
  }

  resetEvent = function (forceQuit = false) {
    let rowLength, thisTime;
    let greenTargets;
    let style;
    let loading;
    let loadingWidth, completePaddingTop;
    let animationTime, delayTime, animationTimes, animationTimesTemp;
    let targetPhotos;

    loadingWidth = <%% 40, 40, 36, 30, 10 %%>;
    completePaddingTop = <%% 10, 10, 9, 8, 0 %%>;
    animationTime = 0.2;
    delayTime = 0.1;
    animationTimes = [];

    greenTargets = mother.querySelectorAll('.' + greenClassName);
    for (let dom of greenTargets) {
      dom.style.animation = "justfadeoutnine " + String(animationTime * 2) + "s ease forwards";
    }

    rowLength = Math.round(pictureNumber / columnNumber);
    animationTimesTemp = [];
    for (let i = 0; i < instance.photoPosition.length; i++) {
      animationTimesTemp.push(animationTime + ((i % rowLength) * delayTime));
      if (animationTimesTemp.length === columnNumber) {
        animationTimes.push(animationTimesTemp);
        animationTimesTemp = [];
      }
    }
    if (Math.random() > 0.5) {
      animationTimes = animationTimes.map((arr) => { return arr.reverse(); });
    }
    animationTimes = animationTimes.flat();

    for (let i = 0; i < instance.photoPosition.length; i++) {
      thisTime = String(animationTimes[i]) + 's';
      instance.photoPosition[i].style.animation = "fadedownlite " + String(animationTime) + "s ease " + thisTime + " forwards";
    }

    animationTimes.sort((a, b) => { return b - a; });

    loading = instance.mother.returnLoadingIcon();
    style = {
      position: "absolute",
      width: String(loadingWidth) + ea,
      height: String(loadingWidth) + ea,
      top: withOut(50, loadingWidth * (desktop ? (3 / 4) : 0.55), ea),
      left: withOut(50, loadingWidth * (1 / 2), ea),
    };
    for (let i in style) {
      loading.style[i] = style[i];
    }
    mother.querySelector("." + pictureBoxClassName).appendChild(loading);

    instance.randomPick = StyleExplanationJs.randomPick(instance.photos, contentsArr, pictureNumber);
    if (!Array.isArray(instance.randomPick) || forceQuit === true) {
      sleep((animationTimes[0] * 1000) + 100).then(async () => {
        try {
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.backgroundImage = "";
            instance.photoPosition[i].style.height = String(0);
            instance.photoPosition[i].setAttribute("complete", "true");
          }
          mother.style.paddingTop = String(completePaddingTop) + ea;
          mother.querySelector("." + pictureBoxClassName).removeChild(loading);
          mother.querySelector('.' + pictureWordingTargetClassName).textContent = completeWording;
          for (let dom of greenTargets) {
            dom.remove();
          }
          await sleep(100);
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.display = "none";
          }
          GeneralJs.stacks[loadingName] = false;

          if (forceQuit !== true) {
            pickupDesigners();
          }

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleExplanationJs.resetEvent.sleep.true : " + e.message }, BACKHOST + "/errorLog");
        }
      });
    } else {
      targetPhotos = instance.randomPick.map((obj) => { return BRIDGEHOST.replace(/\:3000$/gi, '') + obj.path; });
      sleep((animationTimes[0] * 1000) + (animationTime * 1000)).then(async () => {
        try {
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.backgroundImage = "url('" + targetPhotos[i] + "')";
          }
          await sleep(animationTime * 1000);
          mother.querySelector("." + pictureBoxClassName).removeChild(loading);
          for (let dom of greenTargets) {
            dom.remove();
          }
          await sleep(100);
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.animation = "fadeupmiddle " + String(animationTime) + "s ease forwards";
          }
          GeneralJs.stacks[loadingName] = false;
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleExplanationJs.resetEvent.sleep.false : " + e.message }, BACKHOST + "/errorLog");
        }
      });
    }
  }

  arrowEvent = function () {
    instance.selectPhotos = [];
    GeneralJs.stacks[loadingName] = true;
    GeneralJs.setTimeout(() => {
      resetEvent(false);
    }, 201);
  }

  pictureBox = createNode({
    mother,
    class: [ pictureBoxClassName ],
    style: {
      display: "block",
      position: "relative",
      marginLeft: desktop ? String(innerMargin) + ea : "",
      width: desktop ? withOut(innerMargin * 2, ea) : "",
    }
  });

  for (let i = 0; i < pictureNumber; i++) {
    tempDom = createNode({
      mother: pictureBox,
      class: [ "hoverDefault_lite" ],
      attribute: [
        { index: String(i) },
        { complete: "false" },
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (this.getAttribute("complete") === "false" && !GeneralJs.stacks[loadingName]) {
              const index = Number(this.getAttribute("index"));
              const mother = this.parentNode;
              let radius, circleVisual;
              let greenTop, greenLeft;

              radius = <%% 22, 18, 17, 14, 4 %%>;
              circleVisual = <%% 4, 3, 3, 2, 0.5 %%>;

              greenTop = this.getBoundingClientRect().top - this.parentNode.getBoundingClientRect().top;
              greenLeft = this.getBoundingClientRect().left - this.parentNode.getBoundingClientRect().left;
              
              createNode({
                mother,
                class: [ greenClassName, greenClassName + "_" + String(index) ],
                attribute: [
                  { file: instance.randomPick[index].file },
                  { index: String(index) }
                ],
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.stopPropagation();
                      const file = this.getAttribute("file");
                      const thisIndex = this.getAttribute("index");
                      let index, removeTargets;
                      index = null;
                      for (let i = 0; i < instance.selectPhotos.length; i++) {
                        if (instance.selectPhotos[i].file === file) {
                          index = i;
                          break;
                        }
                      }
                      if (index !== null) {
                        instance.selectPhotos.splice(index, 1);
                      }
                      removeTargets = mother.querySelectorAll('.' + greenClassName + "_" + thisIndex);
                      for (let dom of removeTargets) {
                        mother.removeChild(dom);
                      }
                    },
                  }
                ],
                style: {
                  position: "absolute",
                  width: photoWidthCss,
                  height: photoHeightCss,
                  top: String(greenTop) + ea,
                  left: String(greenLeft) + ea,
                  borderRadius: String(3) + "px",
                  cursor: "pointer",
                  overflow: "hidden",
                  background: colorExtended.focusBlue,
                  "mix-blend-mode": "multiply",
                }
              });
              createNode({
                mother,
                class: [ greenClassName, greenClassName + "_" + String(index) ],
                attribute: [
                  { file: instance.randomPick[index].file },
                  { index: String(index) }
                ],
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.stopPropagation();
                      const file = this.getAttribute("file");
                      const thisIndex = this.getAttribute("index");
                      let index, removeTargets;
                      index = null;
                      for (let i = 0; i < instance.selectPhotos.length; i++) {
                        if (instance.selectPhotos[i].file === file) {
                          index = i;
                          break;
                        }
                      }
                      if (index !== null) {
                        instance.selectPhotos.splice(index, 1);
                      }
                      removeTargets = mother.querySelectorAll('.' + greenClassName + "_" + thisIndex);
                      for (let dom of removeTargets) {
                        mother.removeChild(dom);
                      }
                    },
                  }
                ],
                mode: "svg",
                source: instance.mother.returnCheckCircle(colorChip.white),
                style: {
                  position: "absolute",
                  width: String(radius * 2) + ea,
                  top: String(greenTop + (photoHeight / 2) - (radius + circleVisual)) + ea,
                  left: String(greenLeft + (photoWidth / 2) - radius) + ea,
                  cursor: "pointer",
                },
              });

              instance.selectPhotos.push(instance.randomPick[index]);
              image.push(instance.randomPick[index].file);

              ajaxJson({ cliid: client.cliid, name: client.name, phone: client.phone, photos: equalJson(JSON.stringify(instance.selectPhotos)) }, BACKHOST + "/styleCuration_styleChecking").catch((err) => {
                console.log(err);
              });

              if (instance.selectPhotos.length >= 3) {
                instance.photos = StyleExplanationJs.photoFilter(instance.photos, instance.selectPhotos);
                instance.selectPhotos = [];
                GeneralJs.stacks[loadingName] = true;
                GeneralJs.stacks[stackName] = GeneralJs.stacks[stackName] + 1;
                resetEvent(false);
              }

            }
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: photoWidthCss,
        height: photoHeightCss,
        borderRadius: String(3) + "px",
        marginRight: String(i % columnNumber === (columnNumber - 1) ? 0 : pictureMargin) + ea,
        marginBottom: String(pictureMargin) + ea,
        overflow: "hidden",
        background: colorChip.gray2
      }
    });
    this.photoPosition.push(tempDom);
  }

  for (let i = 0; i < pictureNumber; i++) {
    this.photoPosition[i].style.backgroundImage = "url('" + targetPhotos[i] + "')";
    this.photoPosition[i].style.backgroundPosition = "50% 50%";
    this.photoPosition[i].style.backgroundSize = "100% auto";
  }

  questionBlock = createNode({
    mother,
    style: {
      display: desktop ? "block" : "flex",
      position: "relative",
      width: String(100) + '%',
      height: String(arrowZoneHeight) + ea,
      paddingTop: desktop ? String(pannelPaddingTop) + ea : "",
      textAlign: "center",
      boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
      background: mobile ? colorChip.white : "",
      borderRadius: mobile ? String(5) + "px" : "",
      justifyContent: mobile ? "center" : "",
      alignItems: mobile ? "center" : ""
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          width: withOut(innerMargin * 2, ea),
          left: String(innerMargin) + ea,
          top: String(0) + ea,
          height: String(pannelLineTop) + ea,
          borderBottom: "1px dashed " + colorChip.gray3,
        }
      },
      {
        mode: "svg",
        source: this.mother.returnArrow("left", colorExtended.focusBlue),
        events: [
          {
            type: "click",
            event: arrowEvent
          }
        ],
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          left: String(innerMargin) + ea,
          top: String(arrowTop) + ea,
          width: String(arrowWidth) + ea,
          paddingRight: String(pannelWordsPadding) + ea,
          background: colorChip.white,
          cursor: "pointer"
        }
      },
      {
        mode: "svg",
        source: this.mother.returnArrow("right", colorExtended.focusBlue),
        events: [
          {
            type: "click",
            event: arrowEvent
          }
        ],
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          right: String(innerMargin) + ea,
          top: String(arrowTop) + ea,
          width: String(arrowWidth) + ea,
          paddingLeft: String(pannelWordsPadding) + ea,
          background: colorChip.white,
          cursor: "pointer"
        }
      },
      {
        class: [ pictureWordingTargetClassName ],
        text: questionWording,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(pannelWordsSize) + ea,
          fontWeight: String(300),
          color: colorExtended.black,
          paddingRight: desktop ? String(pannelWordsPadding) + ea : "",
          paddingLeft: desktop ? String(pannelWordsPadding) + ea : "",
          paddingTop: desktop ? (isMac() ? "" : String(2) + ea) : "",
          background: colorChip.white,
          width: desktop ? "" : String(100) + '%',
          top: mobile ? String(-0.3) + ea : "",
        },
        bold: {
          fontWeight: String(700),
          color: colorExtended.black,
        },
        under: {
          fontWeight: String(600),
          color: colorExtended.focusBlue,
        }
      }
    ]
  });

}

StyleExplanationJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { initAreaClassName } = this;
  try {
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let firstBasePaddingBottom;
    let subTitleSize, subTitleWeight, subTitleMarginTop;
    let buttonMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonSize;
    let buttonTextTop;
    let buttonWeight;
    let firstBasePaddingTop;
    let mobileLeftPaddingVisual;
    let titleSize, titleWeight, titleVisualTop, titleVisualLeft;
    let titleLineHeight;
    let descriptionSize, descriptionLineHeight;
    let descriptionMarginTop;
    let mainImageTop, mainImageHeight;
    let pointOpacity;
    let descriptionPointBoldPaddingLeft;
    let descriptionPointBoldPaddingTop;
    let descriptionPointBoldPaddingBottom;
    let descriptionPointBoldMargin;
    let buttonBetween;
    let mobileImageRight;
    let mobileSubImageMarginTop;
    let description;
    let blanketHeight, blanketVisualTop, blanketOpacity, blanketMargin;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 26, 24, 24, 24, 8 %%>;
    firstBasePaddingBottom = <%% 180, 170, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 16, 3.7 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% (isMac() ? 4 : 6), (isMac() ? 3 : 5), (isMac() ? 1 : 4), (isMac() ? 1 : 4), 0.5 %%>;

    buttonMarginTop = <%% 165, 160, 132, 110, 3.6 %%>;
    buttonWidth = <%% 190, 190, 186, 168, 31 %%>;
    buttonHeight = <%% 32, 32, 30, 28, 9 %%>;
    buttonSize = <%% 14, 14, 13, 12, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonBetween = <%% 8, 8, 7, 6, 1 %%>;

    titleSize = <%% 57, 51, 48, 39, 8 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.5 %%>;
    titleVisualLeft = <%% 2, 2, 2, 2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 338, 314, 39 %%>;

    descriptionSize = <%% 15, 14, 14, 13, 3.2 %%>;
    descriptionLineHeight = <%% 1.9, 1.9, 1.9, 1.8, 1.9 %%>;

    mobileLeftPaddingVisual = 1;

    descriptionMarginTop = <%% 40, 40, 36, 30, 81.5 %%>;

    descriptionPointBoldPaddingLeft = <%% 8, 8, 8, 8, 1.6 %%>;
    descriptionPointBoldPaddingTop = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 3), (isMac() ? 2 : 3), 0.4 %%>;
    descriptionPointBoldPaddingBottom = <%% (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 0.8 %%>;
    descriptionPointBoldMargin = <%% 2, 2, 2, 2, 1 %%>;

    blanketHeight = <%% 50, 40, 40, 40, 40 %%>;
    blanketVisualTop = <%% 1, 1, 1, 1, 1 %%>;
    blanketOpacity = <%% 0.3, 0.3, 0.3, 0.3, 0.3 %%>;
    blanketMargin = <%% 34, 32, 30, 30, 34 %%>;

    if (desktop && window.innerHeight > 1100) {
      titleSize = <%% 59, 51, 43, 39, 9 %%>;
      subTitleSize = <%% 19, 18, 17, 16, 3.6 %%>;
      firstBasePaddingTop = <%% 80, 48, 30, 28, 50 %%>;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingBottom = <%% 240, 210, 160, 130, 210 %%>;
      mainImageTop = <%% 42, 32, 18, 16, 32 %%>;
      mainImageHeight = <%% 390, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 146, 146, 132, 110, 3.6 %%>;
    }

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.black;
    document.body.style.background = colorExtended.black;

    description = [
      "홈리에종의 서비스 진행을 위해서는 다음 큐레이션 과정이 필요합니다.",
      "서비스 신청서를 모두 작성 후, <b%디자이너의 1:1 맞춤 상담%b>을 받아보세요!"
    ];

    firstBase = createNode({
      mother: baseTong,
      class: [ initAreaClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(firstBasePaddingTop) + ea,
        flexDirection: "column",
        paddingBottom: String(firstBasePaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: desktop ? String((-1 * baseTop) + naviHeight) + ea : "calc(calc(" + String(naviHeight - naviHeight) + "px" + ") - " + String(baseTop) + ea + ")",
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.darkDarkBlack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(1 * ((-1 * baseTop) + naviHeight), ea),
        }
      }
    });
  
    // main title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: desktop ? "start" : "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: (desktop ? "Service curation<b%.%b>" : "Service curation<b%.%b>"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.white,
            fontFamily: "mont",
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.white,
            fontFamily: "mont",
            opacity: String(pointOpacity),
          }
        }
      ]
    });

    // sub title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "서비스 상세 큐레이션",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            textAlign: "center",
          }
        }
      ]
    });

    // description
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(descriptionMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.5s ease 0s 1 normal forwards running fadeupdelay2",
        textAlign: "center",
        flexDirection: "row",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: StyleExplanationJs.binaryPath + "/blanketLeft.svg",
          },
          style: {
            display: "inline-block",
            position: "relative",
            height: String(blanketHeight) + ea,
            opacity: String(blanketOpacity),
            marginRight: String(blanketMargin) + ea,
            top: String(blanketVisualTop) + ea,
          }
        },
        {
          text: description.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(400),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
          },
          bold: {
            color: colorExtended.darkDarkBlack,
            fontWeight: String(700),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
            background: colorExtended.gradientBlue,
            padding: String(descriptionPointBoldPaddingLeft) + ea,
            paddingTop: String(descriptionPointBoldPaddingTop) + ea,
            paddingBottom: String(descriptionPointBoldPaddingBottom) + ea,
            "border-radius": String(5) + "px",
            margin: String(descriptionPointBoldMargin) + ea,
          }
        },
        {
          mode: "img",
          attribute: {
            src: StyleExplanationJs.binaryPath + "/blanketRight.svg",
          },
          style: {
            display: "inline-block",
            position: "relative",
            height: String(blanketHeight) + ea,
            opacity: String(blanketOpacity),
            marginLeft: String(blanketMargin) + ea,
            top: String(blanketVisualTop) + ea,
          }
        },
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, secondBaseClassName } = this;
  const colorConvertPoint0ClassName = "colorConvertPoint0ClassName";
  const colorConvertPoint1ClassName = "colorConvertPoint1ClassName";
  const colorConvertPoint2ClassName = "colorConvertPoint2ClassName";
  const selectionBaseClassName = "selectionBaseClassName";
  const finalSelectionCompleteFirstButtonClassName = "finalSelectionCompleteFirstButtonClassName";
  try {
    let minusLeft;
    let secondBase;
    let serviceBase;
    let textContent;
    let descriptionSize;
    let createServiceBlock;
    let titleSize;
    let descriptionMarginTop;
    let boxWidth;
    let betweenMargin;
    let serviceMother;
    let target;
    let checkCircleWidth;
    let buttonHeight;
    let wordsMother, buttonMother;
    let wordsMotherMarginTop;
    let numberSize, numberWeight;
    let numberBarHeight, numberBarMarginLeft;
    let numberBarTop;
    let titleMarginTop, titleWeight;
    let descriptionWeight, descriptionVisualLeft;
    let serviceAreMarginTop, serviceAreMarginBottom;
    let serviceNameBoxWidth;
    let serviceNameBoxHeight;
    let serviceNameSize;
    let serviceNameWeight;
    let serviceNameTop;
    let circleWidth0, circleWidth1, circleWidth2;
    let circleBetween;
    let circleGroupMarginTop;
    let circleGroupMarginBottom;
    let imageRatio;
    let triangleZoneHeight;
    let triangleWidth;
    let serviceDescriptionHeight;
    let serviceDescriptionSize, serviceDescriptionWeight;
    let serviceDescriptionLineHeight;
    let serviceDescriptionTextTop;
    let plusSize, plusWeight, plusPaddingLeft, plusPaddingTop, plusPaddingBottom;
    let plusBoxHeight, plusBoxMarginRight;
    let checkCircleAreaHeight;
    let buttonMotherMarginBottom;
    let buttonWidth, buttonSize, buttonWeight, buttonTextTop;
    let selectionDomMaker;
    let numbersAreaMarginTop;
    let originalSecondBaseHeight;
    let transitionString;
    let selectionForceEvent;
    let focusAnimation;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 12, 25 %%>;
    titleSize = <%% 25, 24, 22, 20, 4 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;
    descriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
    descriptionVisualLeft = <%% -1, -1, -1, -1, -1 %%>;

    betweenMargin = <%% 26, 16, 12, 8, 26 %%>;

    wordsMotherMarginTop = <%% 120, 120, 110, 100, 12 %%>;
    numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

    numberSize = <%% 28, 26, 24, 21, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    serviceAreMarginTop = <%% 100, 80, 60, 40, 10 %%>;
    serviceAreMarginBottom = <%% 100, 80, 60, 40, 10 %%>;

    serviceNameBoxWidth = <%% 156, 140, 130, 120, 156 %%>;
    serviceNameBoxHeight = <%% 40, 36, 32, 28, 40 %%>;
    serviceNameSize = <%% 17, 16, 14, 12, 17 %%>;
    serviceNameWeight = <%% 800, 800, 800, 800, 800 %%>;
    serviceNameTop = <%% -0.5, -0.5, -0.5, -0.5, -0.5 %%>;

    circleWidth0 = <%% 8, 8, 8, 8, 8 %%>;
    circleWidth1 = <%% 6, 6, 6, 6, 6 %%>;
    circleWidth2 = <%% 4, 4, 4, 4, 4 %%>;
    circleBetween = <%% 6, 6, 6, 6, 6 %%>;

    circleGroupMarginTop = <%% 11, 11, 11, 11, 11 %%>;
    circleGroupMarginBottom = <%% 13, 13, 13, 13, 13 %%>;

    imageRatio = <%% 75, 80, 82, 85, 75 %%>;

    triangleZoneHeight = <%% 50, 45, 40, 35, 50 %%>;
    triangleWidth = <%% 12, 11, 10, 9, 12 %%>;

    serviceDescriptionHeight = <%% 98, 86, 76, 72, 98 %%>;
    serviceDescriptionSize = <%% 16, 15, 13, 12, 16 %%>;
    serviceDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    serviceDescriptionLineHeight = <%% 1.52, 1.52, 1.52, 1.52, 1.52 %%>;
    serviceDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    plusSize = <%% 15, 15, 15, 15, 15 %%>;
    plusWeight = <%% 700, 700, 700, 700, 700 %%>;
    plusPaddingLeft = <%% 3, 3, 3, 3, 3 %%>;
    plusPaddingTop = <%% 0, 0, 0, 0, 0 %%>;
    plusPaddingBottom = <%% 2, 2, 2, 2, 2 %%>;
    plusBoxHeight = <%% 11, 11, 11, 11, 11 %%>;
    plusBoxMarginRight = <%% 4.5, 4.5, 4.5, 4.5, 4.5 %%>;

    checkCircleAreaHeight = <%% 80, 64, 52, 56, 80 %%>;
    checkCircleWidth = <%% 23, 21, 19, 17, 23 %%>;

    buttonMotherMarginBottom = <%% 140, 140, 120, 100, 140 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 42 %%>;
    buttonWidth = <%% 120, 120, 110, 100, 120 %%>;
    buttonSize = <%% 17, 17, 16, 15, 17 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    originalSecondBaseHeight = <%% 1398, 1203, 1035, 1035, 1203 %%>;

    instance.totalValues[0] = 1;

    instance.animationStop = true;
    focusAnimation = "focusProgress 4s ease infinite";

    selectionForceEvent = (isOn = true) => {
      const target = document.querySelector('.' + finalSelectionCompleteFirstButtonClassName);
      if (isOn) {
        target.style.animation = focusAnimation;
        target.style.background = colorExtended.ultimateBlack;
      } else {
        target.style.animation = "";
        target.style.background = colorExtended.darkBlack;
      }
    }

    transitionString = "all 0.4s ease";

    secondBase = createNode({
      mother: baseTong,
      class: [ secondBaseClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        height: String(originalSecondBaseHeight) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        },
        next: {
          style: {
            position: "absolute",
            top: String(0),
            left: String(-1 * minusLeft) + ea,
            background: colorExtended.gradientBlue,
            width: withOut(-1 * (minusLeft * 2), ea),
            height: withOut(0, ea),
            transition: "all 0.6s ease",
          },
        }
      }
    });

    selectionDomMaker = (secondBase, returnMode = false) => {

      textContent = [
        {
          title: "홈퍼니싱",
          description: [
            "시공 없이 스타일링만!",
            "가구 소품 패브릭 조명으로 진행",
          ],
          source: StyleExplanationJs.binaryPath + "/service_f.svg",
          plus: false,
          default: instance.totalValues[0] === null ? false : (instance.totalValues[0] === 0),
          margin: false,
          value: "s2011_aa01s",
        },
        {
          title: "홈스타일링",
          description: [
            "부분 시공 (빌트인 제작 가구 포함)",
            "스타일링 (가구 소품 패브릭)",
          ],
          source: StyleExplanationJs.binaryPath + "/service_s.svg",
          plus: true,
          default: instance.totalValues[0] === null ? true : (instance.totalValues[0] === 1),
          margin: true,
          value: "s2011_aa02s",
        },
        {
          title: "토탈 스타일링",
          description: [
            "전체 시공 (주방 혹은 화장실 설비 교체 포함)",
            "스타일링 (가구 소품 패브릭)",
          ],
          source: StyleExplanationJs.binaryPath + "/service_t.svg",
          plus: true,
          default: instance.totalValues[0] === null ? false : (instance.totalValues[0] === 2),
          margin: false,
          value: "s2011_aa03s",
        },
      ];
      boxWidth = (standardWidth - (betweenMargin * (textContent.length - 1))) / textContent.length;
      instance.totalMenu[0] = objectDeepCopy(textContent);

      if (returnMode) {
        secondBase.style.height = String(originalSecondBaseHeight) + ea;
      }

      wordsMother = createNode({
        mother: secondBase,
        class: [ firstFadeOutTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: String(!returnMode ? wordsMotherMarginTop : numbersAreaMarginTop) + ea,
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderBottom: "1.5px solid " + colorExtended.blueDark,
            },
            children: [
              {
                text: "1",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontFamily: "mont",
                  fontSize: String(numberSize) + ea,
                  fontWeight: String(numberWeight),
                  color: colorExtended.white,
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  height: String(numberBarHeight) + ea,
                  width: String(0),
                  borderRight: "2px solid " + colorExtended.white,
                  transform: "rotate(25deg)",
                  marginLeft: String(numberBarMarginLeft) + ea,
                  marginRight: String(numberBarMarginLeft) + ea,
                  top: String(numberBarTop) + ea,
                }
              },
              {
                text: "6",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontFamily: "mont",
                  fontSize: String(numberSize) + ea,
                  fontWeight: String(numberWeight),
                  color: colorExtended.white,
                  opacity: String(0.4),
                }
              },
            ]
          },
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: String(titleMarginTop) + ea,
            },
            children: [
              {
                text: "생각하는 서비스 유형을 선택해 주세요!",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorExtended.black,
                }
              },
              {
                text: "*스타일링 없는 단순 시공은 제공하지 않습니다.",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(descriptionSize) + ea,
                  fontWeight: String(descriptionWeight),
                  color: colorExtended.black,
                  marginTop: String(descriptionMarginTop) + ea,
                  left: String(descriptionVisualLeft) + ea,
                }
              },
            ]
          },
        ]
      });
      serviceMother = createNode({
        mother: secondBase,
        class: [ firstFadeOutTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          paddingTop: String(serviceAreMarginTop) + ea,
          paddingBottom: String(serviceAreMarginBottom) + ea,
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        }
      });
      createServiceBlock = (index, thisMother = serviceMother) => {
        if (typeof index === "number") {
          target = textContent[index];
        } else {
          target = objectDeepCopy(index);
        }
        serviceBase = createNode({
          mother: thisMother,
          attribute: {
            index: String(index),
            toggle: (target.default ? "on" : "off"),
            draggable: "false",
          },
          class: [ selectionBaseClassName ],
          event: {
            click: async function (e) {
              try {
                const itemList = [ ...document.querySelectorAll('.' + selectionBaseClassName) ];
                const index = Number(this.getAttribute("index"));
                const valueIndex = 0;
                const toggle = this.getAttribute("toggle");
                let target0, target1, target2;
                if (toggle === "on") {
                  for (let dom of itemList) {

                    target0 = dom.querySelector('.' + colorConvertPoint0ClassName);
                    target1 = dom.querySelector('.' + colorConvertPoint1ClassName);
                    target2 = dom.querySelector('.' + colorConvertPoint2ClassName);

                    if (Number(dom.getAttribute("index")) === index) {
                      dom.style.opacity = String(0.5);
                      dom.setAttribute("toggle", "off");
                      target1.style.background = colorExtended.blueDark;
                      target1.firstChild.style.color = colorExtended.darkBlack;
                      target2.style.opacity = String(1);
                    } else {
                      dom.style.opacity = String(0.5);
                      dom.setAttribute("toggle", "off");
                      target1.style.background = colorExtended.blueDark;
                      target1.firstChild.style.color = colorExtended.darkBlack;
                      target2.style.opacity = String(1);
                    }
                  }
                  instance.totalValues[valueIndex] = null;
                  selectionForceEvent(false);
                } else {
                  for (let dom of itemList) {

                    target0 = dom.querySelector('.' + colorConvertPoint0ClassName);
                    target1 = dom.querySelector('.' + colorConvertPoint1ClassName);
                    target2 = dom.querySelector('.' + colorConvertPoint2ClassName);

                    if (Number(dom.getAttribute("index")) === index) {
                      dom.style.opacity = String(1);
                      dom.setAttribute("toggle", "on");
                      target1.style.background = colorExtended.blueDim;
                      target1.firstChild.style.color = colorExtended.white;
                      target2.style.opacity = String(0);
                    } else {
                      dom.style.opacity = String(0.5);
                      dom.setAttribute("toggle", "off");
                      target1.style.background = colorExtended.blueDark;
                      target1.firstChild.style.color = colorExtended.darkBlack;
                      target2.style.opacity = String(1);
                    }
                  }
                  instance.totalValues[valueIndex] = index;
                  selectionForceEvent(true);
                }
              } catch (e) {
                console.log(e);
              }
            },
            mouseenter: function (e) {
              if (!instance.animationStop) {
                const toggle = this.getAttribute("toggle");
                const target0 = this.querySelector('.' + colorConvertPoint0ClassName);
                const target1 = this.querySelector('.' + colorConvertPoint1ClassName);
                this.style.opacity = String(1);
                target0.firstChild.style.color = colorExtended.focusBlue;
                target1.style.background = colorExtended.blueDim;
                target1.firstChild.style.color = colorExtended.white;
              }
            },
            mouseleave: function (e) {
              if (!instance.animationStop) {
                const toggle = this.getAttribute("toggle");
                const target0 = this.querySelector('.' + colorConvertPoint0ClassName);
                const target1 = this.querySelector('.' + colorConvertPoint1ClassName);
                if (toggle === "on") {
                  this.style.opacity = String(1);
                } else {
                  this.style.opacity = String(0.5);
                  target1.style.background = colorExtended.blueDark;
                  target1.firstChild.style.color = colorExtended.darkBlack;
                }
                target0.firstChild.style.color = colorExtended.black;
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: desktop ? String(boxWidth) + ea : withOut(0, ea),
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            opacity: String(target.default ? 1 : 0.5),
            marginLeft: (desktop && target.margin) ? String(betweenMargin) + ea : "",
            marginRight: (desktop && target.margin) ? String(betweenMargin) + ea : "",
            transition: transitionString,
            cursor: "pointer",
          }
        });
        createNode({
          mother: serviceBase,
          class: [ colorConvertPoint0ClassName ],
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(serviceNameBoxWidth) + ea,
            height: String(serviceNameBoxHeight) + ea,
            borderRadius: String(serviceNameBoxHeight) + ea,
            background: colorExtended.white,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 2px 12px -9px " + colorExtended.darkShadow,
            transition: transitionString,
          },
          child: {
            text: target.title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(serviceNameSize) + ea,
              fontWeight: String(serviceNameWeight),
              color: colorExtended.black,
              top: String(serviceNameTop) + ea,
              transition: transitionString,
            }
          }
        });
        createNode({
          mother: serviceBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(circleWidth0) + ea,
            height: String(circleWidth0) + ea,
            borderRadius: String(circleWidth0) + ea,
            background: colorExtended.white,
            marginTop: String(circleGroupMarginTop) + ea,
          }
        });
        createNode({
          mother: serviceBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(circleWidth1) + ea,
            height: String(circleWidth1) + ea,
            borderRadius: String(circleWidth1) + ea,
            background: colorExtended.white,
            marginTop: String(circleBetween) + ea,
            opacity: String(0.7),
          }
        });
        createNode({
          mother: serviceBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(circleWidth2) + ea,
            height: String(circleWidth2) + ea,
            borderRadius: String(circleWidth2) + ea,
            background: colorExtended.white,
            marginTop: String(circleBetween) + ea,
            opacity: String(0.4),
          }
        });
        createNode({
          mother: serviceBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(boxWidth) + ea,
            height: String(boxWidth) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.gradientWhite2,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 3px 15px -9px " + colorExtended.darkShadow,
            marginTop: String(circleGroupMarginBottom) + ea,
          },
          child: {
            mode: "img",
            attribute: {
              src: target.source,
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(imageRatio) + '%',
            }
          }
        });
        createNode({
          mother: serviceBase,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(triangleZoneHeight) + ea,
            alignItems: "center",
            justifyContent: "center",
          },
          child: {
            mode: "svg",
            source: svgMaker.generalTriangle(colorExtended.blueDark),
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(triangleWidth) + ea,
            }
          }
        });
        createNode({
          mother: serviceBase,
          class: [ colorConvertPoint1ClassName ],
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(boxWidth) + ea,
            height: String(serviceDescriptionHeight) + ea,
            borderRadius: String(8) + "px",
            background: (target.default ? colorExtended.blueDim : colorExtended.blueDark),
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 2px 12px -9px " + colorExtended.blueDim,
            transition: transitionString,
          },
          child: {
            text: target.description.join(target.plus ? "\n<b%+%b>" : "\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(serviceDescriptionSize) + ea,
              fontWeight: String(serviceDescriptionWeight),
              color: (target.default ? colorExtended.white : colorExtended.darkBlack),
              textAlign: "center",
              lineHeight: String(serviceDescriptionLineHeight),
              top: String(serviceDescriptionTextTop) + ea,
              transition: transitionString,
            },
            bold: {
              display: "inline-flex",
              position: "relative",
              "justify-content": "center",
              "align-items": "center",
              color: colorExtended.mainBlue,
              fontWeight: String(plusWeight),
              fontSize: String(plusSize) + ea,
              background: colorExtended.white,
              padding: String(plusPaddingLeft) + ea,
              paddingTop: String(plusPaddingTop) + ea,
              paddingBottom: String(plusPaddingBottom) + ea,
              height: String(plusBoxHeight) + ea,
              "border-radius": String(8) + ea,
              marginRight: String(plusBoxMarginRight) + ea,
            }
          }
        });
        createNode({
          mother: serviceBase,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(checkCircleAreaHeight) + ea,
            alignItems: "center",
            justifyContent: "center",
          },
          child: {
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(checkCircleWidth) + ea,
              height: String(checkCircleWidth) + ea,
              borderRadius: String(checkCircleWidth) + ea,
            },
            child: {
              mode: "svg",
              source: svgMaker.checkCircle(colorExtended.white),
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(checkCircleWidth) + ea,
              },
              previous: {
                class: [ colorConvertPoint2ClassName ],
                style: {
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  width: String(checkCircleWidth) + ea,
                  height: String(checkCircleWidth) + ea,
                  borderRadius: String(checkCircleWidth) + ea,
                  background: colorExtended.white,
                  opacity: String(target.default ? 0 : 1),
                },
              }
            }
          }
        });
      }
      for (let i = 0; i < textContent.length; i++) {
        createServiceBlock(i);
      }
      buttonMother = createNode({
        mother: secondBase,
        class: [ firstFadeOutTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: String(buttonHeight) + ea,
          marginBottom: String(buttonMotherMarginBottom) + ea,
          opacity: String(0),
          transform: "translateY(30px)",
          animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        },
        child: {
          class: [ finalSelectionCompleteFirstButtonClassName ],
          event: {
            click: async function (e) {
              const targets = [ ...document.querySelectorAll('.' + selectionBaseClassName) ];
              const target = targets.find((d) => { return d.getAttribute("toggle") === "on" });
              let convertingFunction, thisIndex;
              if (target === undefined) {
                window.alert("서비스를 선택해주세요!");
              } else {
                thisIndex = Number(target.getAttribute("index"));
                instance.totalValues[0] = thisIndex;
                window.history.pushState({ mode: "first" }, "");
                if (thisIndex === 0) {
                  convertingFunction = instance.thirdConverting(true).bind(this);
                } else {
                  convertingFunction = instance.firstConverting().bind(this);
                }
                await convertingFunction(e);
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
            opacity: String(1),
            transformOrigin: "center",
            transform: "scale(1)",
            animation: "",
            transition: "all 0.5s ease",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorExtended.white,
              top: String(buttonTextTop) + ea,
            }
          }
        }
      });
    }
    instance.selectionDomMaker = selectionDomMaker;

    selectionDomMaker(secondBase, false);

    return secondBase;

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.constructPopupEvent = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const promptAsideClassName = "promptAsideClassName";
  try {
    const zIndex = 5;
    let blackTongBase, blockPrompt;
    let whiteWidth;
    let whiteHeight;
    let paddingTop;
    let paddingLeft;
    let paddingBottom;
    let size0, size1;
    let wordingVisual;
    let returnEvent;
    let timeOutEventId;
    let delta;

    whiteWidth = 580;
    whiteHeight = 180;
    paddingTop = 17;
    paddingLeft = 23;
    paddingBottom = 62;
    size1 = 16;
    wordingVisual = GeneralJs.isMac() ? -1 : 1;
    delta = 5 * 1000;

    timeOutEventId = {};

    returnEvent = () => {
      return async function (e) {
        try {
          const convertingFunc = instance.firstReturn().bind(this);
          await convertingFunc(e);
          clearTimeout(timeOutEventId);
          removeByClass(promptAsideClassName);
        } catch (e) {
          console.log(e);
        }
      }
    }

    timeOutEventId = setTimeout(async () => {
      try {
        const converting = returnEvent();
        await converting(new Event("click", { bubbles: true }));
        clearTimeout(timeOutEventId);
      } catch (e) {
        console.log(e);
      }
    }, delta);

    blackTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e) => { e.stopPropagation(); },
        dblclick: (e) => { e.stopPropagation(); },
        drop: (e) => { e.stopPropagation(); },
        keyup: (e) => { e.stopPropagation(); },
        keydown: (e) => { e.stopPropagation(); },
        keypress: (e) => { e.stopPropagation(); },
        click: returnEvent(),
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(0) + ea + ")",
        background: "transparent",
        zIndex: String(zIndex),
        cursor: "pointer",
      }
    });
  
    blockPrompt = createNode({
      mother: blackTongBase,
      event: {
        click: (e) => { e.stopPropagation(); },
      },
      style: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: String(whiteWidth) + ea,
        height: String(whiteHeight) + ea,
        borderRadius: String(10) + "px",
        boxShadow: "0px 3px 15px -9px " + colorExtended.ultimateBlack,
        background: colorExtended.darkBlack,
        animation: desktop ? "fadeuplite 0.4s ease forwards" : "fadeuplite 0.3s ease forwards",
      }
    });

    createNode({
      mother: blockPrompt,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(36) + ea,
        height: String(36) + ea,
        borderRadius: String(36) + ea,
        border: "1px solid " + colorExtended.white,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: String(12) + ea,
      },
      child: {
        text: "!",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(1) + ea,
          fontSize: String(28) + ea,
          fontWeight: String(700),
          color: colorExtended.mainBlue,
          fontFamily: "cabinet",
        }
      }
    });

    createNode({
      mother: blockPrompt,
      text: [
        "화장실 시공, 주방 시공과 같은 전체 철거는 토탈 스타일링 서비스에 해당합니다.",
        "포함되는 경우 토탈 스타일링 유형을 선택해 주세요.",
      ].join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(size1) + ea,
        fontWeight: String(700),
        color: colorExtended.white,
        top: String(wordingVisual) + ea,
        lineHeight: String(1.7),
        textAlign: "center",
        marginBottom: String(5) + ea,
      }
    });

    

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertThirdBox = async function (thirdBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName, secondFadeOutTargetClassName } = this;
  const selectionBaseThirdClassName = "selectionBaseThirdClassName";
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let tempSecondHeight;
    let thirdSelectionEvent;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 12, 25 %%>;
    titleSize = <%% 25, 24, 22, 20, 4 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 7, 5, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

    imageAreaMarginTop = <%% 70, 70, 50, 30, 70 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 65, 110 %%>;
    imageWidth = <%% 510, 500, 450, 400, 510 %%>;

    yesButtonAreaMarginTop = <%% 50, 40, 30, 20, 50 %%>;
    yesButtonWidth = <%% 160, 140, 130, 120, 160 %%>;
    yesButtonHeight = <%% 40, 36, 34, 22, 40 %%>;
    yesButtonBetween = <%% 12, 10, 9, 8, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.5 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 100, 120 %%>;
    completeButtonAreaMarginBottom = <%% 150, 150, 120, 90, 150 %%>;
    completeButtonSize = <%% 17, 17, 16, 15, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 32, 30, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 9, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -1.5 %%>;

    tempSecondHeight = <%% 1067.84, 1037, 875, 875, 1067.84 %%>;

    thirdSelectionEvent = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseThirdClassName);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              } else {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
                instance.totalValues[1] = Number(dom.getAttribute("index"));
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
                instance.totalValues[1] = Number(dom.getAttribute("index"));
              } else {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    ghostBase = {};

    if (instance.totalValues[1] === null) {
      instance.totalValues[1] = 1;
    }
    instance.totalMenu[1] = [
      {
        value: "부분 철거",
      },
      {
        value: "전체 철거",
      },
    ]

    thirdBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(20);
    thirdBase.style.transition = "all 0.6 ease";
    thirdBase.style.height = String(tempSecondHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: thirdBase,
      class: [ ghostBaseClassName, secondFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "2",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "6",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "전체 공간을 철거하고 재시공을 원하시나요?",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(imageAreaMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: StyleExplanationJs.binaryPath + "/construct.svg",
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(imageWidth) + ea,
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: [
            {
              class: [ selectionBaseThirdClassName ],
              attribute: {
                toggle: instance.totalValues[1] === 0 ? "on" : "off",
                index: String(0),
              },
              event: {
                selectstart: (e) => { e.preventDefault() },
                click: thirdSelectionEvent(0),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: instance.totalValues[1] !== 0 ? "1.5px solid " + colorExtended.mainBlue : "1.5px solid " + colorExtended.darkBlack,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: instance.totalValues[1] !== 0 ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: instance.totalValues[1] !== 0 ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                marginRight: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                },
                text: "아니요",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: instance.totalValues[1] !== 0 ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            },
            {
              class: [ selectionBaseThirdClassName ],
              attribute: {
                toggle: instance.totalValues[1] === 1 ? "on" : "off",
                index: String(1),
              },
              event: {
                selectstart: (e) => { e.preventDefault() },
                click: thirdSelectionEvent(1),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: instance.totalValues[1] !== 1 ? "1.5px solid " + colorExtended.mainBlue : "1.5px solid " + colorExtended.darkBlack,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: instance.totalValues[1] !== 1 ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: instance.totalValues[1] !== 1 ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                cursor: "pointer",
              },
              child: {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                },
                text: "예",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: instance.totalValues[1] !== 1 ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            },
          ]
        }
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.firstReturn(),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: "1.5px solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              if (instance.totalValues[0] === 2 && instance.totalValues[1] === 0) {
                await instance.constructPopupEvent();
              } else {
                window.history.pushState({ mode: "second" }, "");
                convertingFunction = instance.secondConverting().bind(this);
                await convertingFunction(e);
              }
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertFourthBox = async function (fourthBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  const selectionBaseFourthClassName0 = "selectionBaseFourthClassName0";
  const selectionBaseFourthClassName1 = "selectionBaseFourthClassName1";
  const fourthNoticeBoxClassName = "fourthNoticeBoxClassName";
  const fourthDescriptionBoxClassName = "fourthDescriptionBoxClassName";
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + secondFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let tempSecondHeight;
    let fourthSelectionEvent;
    let fourthSelectionEvent2;
    let blackDescriptionBoxHeight;
    let blackDescriptionBoxWidth;
    let blackDescriptionBoxIndent;
    let blackDescriptionSize, blackDescriptionWeight, blackDescriptionLineHeight;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 12, 25 %%>;
    titleSize = <%% 25, 24, 22, 20, 4 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 7, 5, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

    imageAreaMarginTop = <%% 45, 40, 35, 30, 45 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 65, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 25 %%>;
    yesButtonWidth = <%% 160, 140, 130, 120, 160 %%>;
    yesButtonHeight = <%% 40, 36, 34, 22, 40 %%>;
    yesButtonBetween = <%% 12, 10, 9, 8, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.5 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 100, 120 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 90, 129 %%>;
    completeButtonSize = <%% 17, 17, 16, 15, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 32, 30, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 9, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -1.5 %%>;

    middleLineMarginBottom = <%% 90, 85, 75, 65, 90 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 80 %%>;

    blueBoxHeight = <%% 70, 68, 60, 56, 70 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 15 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    tempSecondHeight = <%% 1067.84, 995, 853, 853, 1067.84 %%>;

    blackDescriptionBoxHeight = <%% 56, 56, 56, 56, 56 %%>;
    blackDescriptionBoxWidth = <%% 196, 196, 196, 196, 196 %%>;
    blackDescriptionBoxIndent = <%% 10, 10, 10, 10, 10 %%>;

    blackDescriptionSize = <%% 12, 12, 12, 12, 12 %%>;
    blackDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blackDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

    if (instance.totalValues[3] === null) {
      instance.totalValues[3] = 2;
    }

    fourthSelectionEvent = (index) => {
      return async function (e) {
        try {
          const targets = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ];
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              } else {
                // dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                // dom.style.background = colorExtended.mainBlue;
                // dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                // dom.firstChild.style.color = colorExtended.darkBlack;
                // dom.setAttribute("toggle", "on");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              } else {
                // dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                // dom.style.background = colorExtended.white;
                // dom.style.boxShadow = "";
                // dom.firstChild.style.color = colorExtended.blueDark;
                // dom.setAttribute("toggle", "off");
              }
            }
          }

          instance.totalValues[2] = [ ...document.querySelectorAll('.' + selectionBaseFourthClassName0) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });

        } catch (e) {
          console.log(e);
        }
      }
    }

    fourthSelectionEvent2 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFourthClassName1);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
                instance.totalValues[3] = null;
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
                instance.totalValues[3] = Number(dom.getAttribute("index"));
              } else {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          }

          if (instance.totalValues[3] === 0 || instance.totalValues[3] === 1) {
            document.querySelector('.' + fourthNoticeBoxClassName).children[0].style.opacity = String(0);
            document.querySelector('.' + fourthNoticeBoxClassName).children[1].style.opacity = String(0.7);
            document.querySelector('.' + fourthNoticeBoxClassName).children[2].style.color = colorExtended.darkBlack;
            document.querySelector('.' + fourthNoticeBoxClassName).children[2].querySelector('b').style.color = colorExtended.blueDark;
          } else {
            document.querySelector('.' + fourthNoticeBoxClassName).children[0].style.opacity = String(1);
            document.querySelector('.' + fourthNoticeBoxClassName).children[1].style.opacity = String(0);
            document.querySelector('.' + fourthNoticeBoxClassName).children[2].style.color = colorExtended.deactive;
            document.querySelector('.' + fourthNoticeBoxClassName).children[2].querySelector('b').style.color = colorExtended.deactive;
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    constructItems = [
      {
        title: "철거",
        description: "철거, 기존에 있던 것을\n모두 제거하는 작업",
        styling: true,
        alert: true,
        notice: "전체 철거는 토탈 스타일링에서만 가능합니다!",
      },
      {
        title: "보양",
        description: "복도, 엘리베이터 등에 기스 나지\n않도록 비닐을 씌우는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "목공",
        description: "나무를 사용한 모든 작업\n걸레 받이, 몰딩, 문짝, 천정 평탄화 등",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "전기",
        description: "집 내부의 전기 배선\n구성을 바꾸는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "타일",
        description: "공화장실, 주방 등에 타일을\n바꾸는 작업",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 덧방 공사만 가능합니다!",
      },
      {
        title: "바닥",
        description: "집의 바닥 공사\n장판, 마루, 타일이 있음",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 장판과 마루 공사만 가능합니다!",
      },
      {
        title: "욕실",
        description: "화장실 공사, 홈스타일링에서는\n부분 악세사리 교체만 가능",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
      },
      {
        title: "주방",
        description: "주방 공사, 홈스타일링에서는\n부분 악세사리 교체만 가능",
        styling: true,
        alert: true,
        notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
      },
      {
        title: "필름",
        description: "필름지를 씌어서 해당 면의\n색상이나 재질감을 바꾸는 제공",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "도배",
        description: "벽에 도배지를 바르는 작업\n합지와 실크가 있음",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "도장",
        description: "페인팅, 탄성코트 등\n면의 도료를 칠하는 공사",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "중문",
        description: "현관에 중문을\n새로 달거나 바꾸는 작업",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "발코니",
        description: "발코니의 확장 및\n확장 부분 단열 공사",
        styling: false,
        alert: false,
        notice: "",
      },
      {
        title: "금속 샤시",
        description: "모든 금속 공사와\n샤시 교체 작업",
        styling: false,
        alert: false,
        notice: "",
      },
      {
        title: "조명",
        description: "스타일링을 위한 조명\n배치부터 조명 제품 선택",
        styling: true,
        alert: false,
        notice: "",
      },
      {
        title: "제작 가구",
        description: "대가구, 소가구로 나뉘며\n제작이 필요한 모든 가구",
        styling: true,
        alert: false,
        notice: "",
      },
    ];
    statusItems = [
      {
        title: "거주 중이며 가구 있음",
      },
      {
        title: "거주 중이며 보관 이사 계획",
      },
      {
        title: "거주하지 않으며 공실 상태",
      },
    ];

    instance.totalMenu[2] = objectDeepCopy(constructItems);
    instance.totalMenu[3] = objectDeepCopy(statusItems);

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((constructItems.length / 2) - 1))) / (constructItems.length / 2);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((statusItems.length / 1) - 1))) / (statusItems.length / 1);

    ghostBase = {};

    fourthBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(40);
    fourthBase.style.transition = "all 0.6 ease";
    fourthBase.style.height = String(tempSecondHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: fourthBase,
      class: [ ghostBaseClassName, thirdFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "3",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "6",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "생각하시는 시공을 모두 체크해 주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: constructItems.map((o, index) => {
            return {
              class: [ selectionBaseFourthClassName0 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: async function (e) {
                  const index = Number(this.getAttribute("index"));
                  const thisObj = objectDeepCopy(constructItems[index]);
                  const thisFunction = fourthSelectionEvent(index).bind(this);
                  if (instance.totalValues[0] === 2) {
                    await thisFunction(e);
                  } else {
                    if (thisObj.styling) {
                      if (thisObj.alert) {
                        if (this.getAttribute("toggle") === "off") {
                          GeneralJs.alert(thisObj.notice, true, true);
                        }
                      }
                      await thisFunction(e);
                    } else {
                      GeneralJs.alert("홈스타일링에서는 불가능한 공사입니다!", true, true);
                    }
                  }
                },
                mouseenter: function (e) {
                  this.querySelector('.' + fourthDescriptionBoxClassName).style.display = "flex";
                },
                mouseleave: function (e) {
                  this.querySelector('.' + fourthDescriptionBoxClassName).style.display = "none";
                }
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? "1.5px solid " + colorExtended.mainBlue : "1.5px solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (constructItems.length / 2) === (constructItems.length / 2) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[2]) && instance.totalValues[2]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                },
                next: {
                  class: [ fourthDescriptionBoxClassName ],
                  style: {
                    display: "none",
                    position: "absolute",
                    top: Math.floor(index / (constructItems.length / 2)) === 0 ? String(-1 * (blackDescriptionBoxIndent + blackDescriptionBoxHeight)) + ea : String(yesButtonHeight + blackDescriptionBoxIndent - (1.5 * 2)) + ea,
                    left: withOut(50, blackDescriptionBoxWidth / 2, ea),
                    height: String(blackDescriptionBoxHeight) + ea,
                    width: String(blackDescriptionBoxWidth) + ea,
                    borderRadius: String(8) + "px",
                    background: colorExtended.black,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 3px 15px -9px " + colorExtended.darkDarkBlack,
                  },
                  child: {
                    text: o.description,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(yesButtonTextTop) + ea,
                      fontSize: String(blackDescriptionSize) + ea,
                      fontWeight: String(blackDescriptionWeight),
                      color: colorExtended.white,
                      textAlign: "center",
                      lineHeight: String(blackDescriptionLineHeight),
                    },
                  }
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "시공 당일의 주거 환경을 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(imageAreaMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          class: [ fourthNoticeBoxClassName ],
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gray2,
                opacity: (instance.totalValues[3] === 0 || instance.totalValues[3] === 1) ? String(0) : String(1),
                transition: "all 0.6s ease",
              }
            },
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gradientBlue,
                opacity: (instance.totalValues[3] === 0 || instance.totalValues[3] === 1) ? String(0.7) : String(0),
                transition: "all 0.6s ease",
              }
            },
            {
              text: "<b%*%b>거주 중일 경우, 먼지 확산과 시공 외 범위에 대한 관리가 어려워 홈리에종 시공사 이용이 어려울 수 있습니다.",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: (instance.totalValues[3] === 0 || instance.totalValues[3] === 1) ? colorExtended.darkBlack : colorExtended.deactive,
                transition: "all 0.6s ease",
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: (instance.totalValues[3] === 0 || instance.totalValues[3] === 1) ? colorExtended.blueDark : colorExtended.deactive,
              }
            }
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: statusItems.map((o, index) => {
            return {
              class: [ selectionBaseFourthClassName1 ],
              attribute: {
                index: String(index),
                toggle: index === instance.totalValues[3] ? "on" : "off"
              },
              event: {
                click: fourthSelectionEvent2(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: index === instance.totalValues[3] ? "1.5px solid " + colorExtended.darkBlack : "1.5px solid " + colorExtended.mainBlue,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: index === instance.totalValues[3] ? colorExtended.mainBlue : colorExtended.white,
                boxShadow: index === instance.totalValues[3] ? "0px 3px 15px -9px " + colorExtended.darkShadow : "",
                marginRight: String(index % (statusItems.length / 1) === (statusItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: index === instance.totalValues[3] ? colorExtended.darkBlack : colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.secondReturn(),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: "1.5px solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              if (instance.totalValues[2] === null) {
                instance.totalValues[2] = [];
              }
              if (instance.totalValues[3] === null) {
                GeneralJs.alert("시공 당일의 주거 환경을 알려주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              window.history.pushState({ mode: "third" }, "");
              convertingFunction = instance.thirdConverting().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertFifthBox = async function (fourthBase, furnishingMode = false) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstFadeOutTargetClassName, fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName } = this;
  const selectionBaseFifthClassName0 = "selectionBaseFifthClassName0";
  const selectionBaseFifthClassName1 = "selectionBaseFifthClassName1";
  const selectionBaseFifthClassName2 = "selectionBaseFifthClassName2";
  const blueBlockClassName0 = "blueBlockClassName0";
  const blueBlockClassName1 = "blueBlockClassName1";
  const blueBlockBarFactorClassName = "blueBlockBarFactorClassName";
  const blueBlockBarFactorIndexClassName = "blueBlockBarFactorClassName_index_";
  const blueBlockBarWordsIndexClassName = "blueBlockBarWordsClassName_index_";
  try {
    const fadeOutTargets0 = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
    const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight, blueBoxHeight2;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let fabricItems;
    let yesButtonWidthNoMargin;
    let processBarHeight;
    let defaultBudgetValue;
    let blueWhiteFactorsAreaMarginTop;
    let blueWhiteFactorLineWidth, blueWhiteFactorLineMarginRight;
    let blueWhiteFactorWidth, blueWhiteFactorHeight;
    let blueWhiteFactorTextTop, blueWhiteFactorSize, blueWhiteFactorWeight;
    let blueWhitePlusCircleWidth, blueWhitePlusCircleSize, blueWhitePlusCircleWeight, blueWhitePlusCircleTextTop;
    let blueWhitePlusCircleMargin;
    let processValuesRatio;
    let processValueSize, processValueWeight;
    let convertingBaseHeight;
    let barClickEvent;
    let fifthSelectionEvent2, fifthSelectionEvent3;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 12, 25 %%>;
    titleSize = <%% 25, 24, 22, 20, 4 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 7, 5, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

    imageAreaMarginTop = <%% 45, 40, 35, 30, 45 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 65, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 25 %%>;
    yesButtonWidth = <%% 160, 140, 130, 120, 160 %%>;
    yesButtonHeight = <%% 40, 36, 34, 22, 40 %%>;
    yesButtonBetween = <%% 12, 10, 9, 8, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.5 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 100, 120 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 90, 129 %%>;
    completeButtonSize = <%% 17, 17, 16, 15, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 32, 30, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 9, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -1.5 %%>;

    middleLineMarginBottom = <%% 100, 90, 80, 70, 100 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 80 %%>;

    blueBoxHeight = <%% 130, 120, 105, 95, 120 %%>;
    blueBoxHeight2 = <%% 70, 68, 60, 56, 70 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 15 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    processBarHeight = <%% 24, 21, 18, 15, 24 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 11 %%>;
    blueWhiteFactorLineWidth = <%% 352, 280, 240, 200, 352 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 10 %%>;
    blueWhiteFactorWidth = <%% 180, 150, 120, 90, 180 %%>;
    blueWhiteFactorHeight = <%% 36, 30, 26, 21, 36 %%>;
    blueWhiteFactorTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhiteFactorSize = <%% 15, 14, 12, 11, 3 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 19, 17, 15, 22 %%>;
    blueWhitePlusCircleSize = <%% 20, 19, 16, 15, 20 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 7, 6, 5, 8 %%>;

    processValueSize = <%% 15, 13, 12, 11, 15 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = <%% 1540, 1392, 1220, 1392, 1392 %%>;

    processValuesRatio = 99.4;

    constructItems = [
      { title: "500만원 이하", value: "500만원 이하" },
      { title: "1,000만원", value: "1,000만원" },
      { title: "1,500만원", value: "1,500만원" },
      { title: "2,000만원", value: "2,000만원" },
      { title: "3,000만원", value: "3,000만원" },
      { title: "4,000만원", value: "4,000만원" },
      { title: "5,000만원", value: "5,000만원 이상" },
      { title: "6,000만원", value: "6,000만원 이상" },
      { title: "7,000만원", value: "7,000만원 이상" },
      { title: "8,000만원", value: "8,000만원 이상" },
      { title: "9,000만원", value: "9,000만원 이상" },
      { title: "1억원 이상", value: "1억원 이상" },
    ]
    statusItems = [
      {
        title: "빌트인 제작 가구",
      },
      {
        title: "단순 붙박이장",
      },
      {
        title: "구매형 가구",
      },
    ];
    fabricItems = [
      {
        title: "커튼, 블라인드 등 외부 창문 패브릭",
      },
      {
        title: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
      },
      {
        title: "구매형 침구류, 카펫 등 패브릭",
      },
    ];

    instance.totalMenu[4] = objectDeepCopy(constructItems);
    instance.totalMenu[5] = objectDeepCopy(statusItems);
    instance.totalMenu[6] = objectDeepCopy(fabricItems);

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((statusItems.length / 1) - 1))) / (statusItems.length / 1);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems.length / 1) - 1))) / (constructItems.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems.length / 1) - 1))) / (fabricItems.length / 1);

    if (instance.totalValues[4] === null) {
      instance.totalValues[4] = defaultBudgetValue;
    } else {
      defaultBudgetValue = instance.totalValues[4];
    }

    barClickEvent = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlockBarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlockBarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlockClassName0);
            blue1 = dom.querySelector('.' + blueBlockClassName1);
            wordsTarget = document.querySelector('.' + blueBlockBarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[4] = index;

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent2 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName1);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
                instance.totalValues[5] = null;
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
                instance.totalValues[5] = Number(dom.getAttribute("index"));
              }
            }
          }

          instance.totalValues[5] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName1) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });

        } catch (e) {
          console.log(e);
        }
      }
    }

    fifthSelectionEvent3 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseFifthClassName2);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[6] = [ ...document.querySelectorAll('.' + selectionBaseFifthClassName2) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });

        } catch (e) {
          console.log(e);
        }
      }
    }

    ghostBase = {};

    fourthBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(56);
    fourthBase.style.transition = "all 0.6s ease";
    fourthBase.style.height = String(convertingBaseHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets0) {
        dom.remove();
      }
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: fourthBase,
      class: [ ghostBaseClassName, fourthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "4",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "6",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "인테리어 전체 가용 예산을 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gradientBlue,
                opacity: String(0.7),
              }
            },
            {
              text: "<b%*%b>홈리에종 인테리어 예산은 아래 세 가지를 포함합니다.",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: colorExtended.black,
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: colorExtended.blueDark,
              }
            },
            {
              style: {
                display: "flex",
                position: "relative",
                marginTop: String(blueWhiteFactorsAreaMarginTop) + ea,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
              children: [
                {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(blueWhiteFactorLineWidth) + ea,
                    height: String(0),
                    borderBottom: "2px dotted " + colorExtended.blueWhite,
                    marginRight: String(blueWhiteFactorLineMarginRight) + ea,
                  }
                },
                {
                  style: {
                    width: String(blueWhiteFactorWidth) + ea,
                    height: String(blueWhiteFactorHeight) + ea,
                    borderRadius: String(blueWhiteFactorHeight) + ea,
                    background: colorExtended.white,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "디자인비",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhiteFactorTextTop) + ea,
                      fontSize: String(blueWhiteFactorSize) + ea,
                      fontWeight: String(blueWhiteFactorWeight),
                      color: colorExtended.blueDark,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhitePlusCircleWidth) + ea,
                    height: String(blueWhitePlusCircleWidth) + ea,
                    borderRadius: String(blueWhitePlusCircleWidth) + ea,
                    background: colorExtended.blueDark,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: String(blueWhitePlusCircleMargin) + ea,
                    marginRight: String(blueWhitePlusCircleMargin) + ea,
                  },
                  child: {
                    text: "+",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhitePlusCircleTextTop) + ea,
                      fontSize: String(blueWhitePlusCircleSize) + ea,
                      fontWeight: String(blueWhitePlusCircleWeight),
                      color: colorExtended.white,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhiteFactorWidth) + ea,
                    height: String(blueWhiteFactorHeight) + ea,
                    borderRadius: String(blueWhiteFactorHeight) + ea,
                    background: colorExtended.white,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "시공비",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhiteFactorTextTop) + ea,
                      fontSize: String(blueWhiteFactorSize) + ea,
                      fontWeight: String(blueWhiteFactorWeight),
                      color: colorExtended.blueDark,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhitePlusCircleWidth) + ea,
                    height: String(blueWhitePlusCircleWidth) + ea,
                    borderRadius: String(blueWhitePlusCircleWidth) + ea,
                    background: colorExtended.blueDark,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: String(blueWhitePlusCircleMargin) + ea,
                    marginRight: String(blueWhitePlusCircleMargin) + ea,
                  },
                  child: {
                    text: "+",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhitePlusCircleTextTop) + ea,
                      fontSize: String(blueWhitePlusCircleSize) + ea,
                      fontWeight: String(blueWhitePlusCircleWeight),
                      color: colorExtended.white,
                    }
                  }
                },
                {
                  style: {
                    width: String(blueWhiteFactorWidth) + ea,
                    height: String(blueWhiteFactorHeight) + ea,
                    borderRadius: String(blueWhiteFactorHeight) + ea,
                    background: colorExtended.white,
                    display: "inline-flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "제품 구매비",
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      top: String(blueWhiteFactorTextTop) + ea,
                      fontSize: String(blueWhiteFactorSize) + ea,
                      fontWeight: String(blueWhiteFactorWeight),
                      color: colorExtended.blueDark,
                    }
                  }
                },
                {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(blueWhiteFactorLineWidth) + ea,
                    height: String(0),
                    borderBottom: "2px dotted " + colorExtended.blueWhite,
                    marginLeft: String(blueWhiteFactorLineMarginRight) + ea,
                  }
                },
              ]
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: constructItems.map((o, index) => {
            return [
              {
                class: [ blueBlockBarFactorClassName, blueBlockBarFactorIndexClassName + String(index) ],
                attribute: {
                  index: String(index),
                  toggle: (index === defaultBudgetValue ? "on" : "off"),
                },
                event: {
                  click: barClickEvent(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: "1.5px solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? "1.5px solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                  cursor: "pointer",
                },
                children: [
                  {
                    class: [ blueBlockClassName0 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index < defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                  {
                    class: [ blueBlockClassName1 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: "1.5px solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: String(processBarHeight) + ea,
                      borderBottomRightRadius: String(processBarHeight) + ea,
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index === defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                ]
              },
            ]
          }).flat()
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: constructItems.map((o, index) => {
            return {
              class: [ blueBlockBarWordsIndexClassName + String(index) ],
              attribute: {
                index: String(index),
              },
              event: {
                click: barClickEvent(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(processValueSize) + ea,
                  fontWeight: String(processValueWeight),
                  transition: "all 0.2 ease",
                  color: index === defaultBudgetValue ? colorExtended.darkBlack : colorExtended.mainBlue,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "생각하는 가구 영역을 모두 체크해 주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight2) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gray2,
                opacity: String(1),
              }
            },
            {
              text: "<b%*%b>빌트인 제작 가구 :&nbsp;&nbsp;<u%싱크대 전체 교체, 거실 북카페, 전체 제작 책상 및 서재 연출 등%u>&nbsp;&nbsp;&nbsp;<b%/%b>&nbsp;&nbsp;&nbsp;단순 붙박이장 :&nbsp;&nbsp;<u%옷장, 신발장 등%u>",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: colorExtended.black,
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: colorExtended.blueDark,
              },
              under: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(400),
                color: colorExtended.black,
              },
            }
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: statusItems.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName1 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[5]) && instance.totalValues[5]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent2(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[5]) && instance.totalValues[5]?.includes(index)) ? "1.5px solid " + colorExtended.mainBlue : "1.5px solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[5]) && instance.totalValues[5]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[5]) && instance.totalValues[5]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (statusItems.length / 1) === (statusItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[5]) && instance.totalValues[5]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "생각하는 패브릭 영역을 모두 체크해 주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems.map((o, index) => {
            return {
              class: [ selectionBaseFifthClassName2 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: fifthSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "1.5px solid " + colorExtended.mainBlue : "1.5px solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (fabricItems.length / 1) === (fabricItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[6]) && instance.totalValues[6]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.thirdReturn(furnishingMode),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: "1.5px solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              if (instance.totalValues[4] === null) {
                GeneralJs.alert("인테리어 전체 가용 예산을 알려주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              if (instance.totalValues[5] === null) {
                GeneralJs.alert("생각하는 가구 영역을 모두 체크해 주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              if (instance.totalValues[6] === null) {
                instance.totalValues[6] = [];
              }
              window.history.pushState({ mode: "fourth" }, "");
              convertingFunction = instance.fourthConverting().bind(this);
              await convertingFunction(e);
              return 1;
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertSixthBox = async function (fifthBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { fourthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName, fifthFadeOutTargetClassName } = this;
  const selectionBaseSixthClassName0 = "selectionBaseSixthClassName0";
  const selectionBaseSixthClassName1 = "selectionBaseSixthClassName1";
  const selectionBaseSixthClassName2 = "selectionBaseSixthClassName2";
  const selectionBaseSixthClassName3 = "selectionBaseSixthClassName3";
  const blueBlock2ClassName0 = "blueBlock2ClassName0";
  const blueBlock2ClassName1 = "blueBlock2ClassName1";
  const blueBlock2BarFactorClassName = "blueBlock2BarFactorClassName";
  const blueBlock2BarFactorIndexClassName = "blueBlock2BarFactorClassName_index_";
  const blueBlock2BarWordsIndexClassName = "blueBlock2BarWordsClassName_index_";
  const sixthNoticeBoxClassName = "sixthNoticeBoxClassName";
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight, blueBoxHeight2;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let fabricItems;
    let yesButtonWidthNoMargin;
    let processBarHeight;
    let defaultBudgetValue;
    let blueWhiteFactorsAreaMarginTop;
    let blueWhiteFactorLineWidth, blueWhiteFactorLineMarginRight;
    let blueWhiteFactorWidth, blueWhiteFactorHeight;
    let blueWhiteFactorTextTop, blueWhiteFactorSize, blueWhiteFactorWeight;
    let blueWhitePlusCircleWidth, blueWhitePlusCircleSize, blueWhitePlusCircleWeight, blueWhitePlusCircleTextTop;
    let blueWhitePlusCircleMargin;
    let processValuesRatio;
    let processValueSize, processValueWeight;
    let convertingBaseHeight;
    let ageItems;
    let yesButtonWidth3;
    let barClickEvent;
    let sixSelectionEvent2;
    let sixSelectionEvent3;
    let sixSelectionEvent4;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 12, 25 %%>;
    titleSize = <%% 25, 24, 22, 20, 4 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 7, 5, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

    imageAreaMarginTop = <%% 45, 40, 35, 30, 45 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 65, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 25 %%>;
    yesButtonWidth = <%% 160, 140, 130, 120, 160 %%>;
    yesButtonHeight = <%% 40, 36, 34, 22, 40 %%>;
    yesButtonBetween = <%% 12, 10, 9, 8, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.5 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 100, 120 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 90, 129 %%>;
    completeButtonSize = <%% 17, 17, 16, 15, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 32, 30, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 9, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -1.5 %%>;

    middleLineMarginBottom = <%% 100, 90, 80, 70, 100 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 80 %%>;

    blueBoxHeight = <%% 130, 120, 105, 95, 120 %%>;
    blueBoxHeight2 = <%% 70, 68, 60, 56, 70 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 15 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    processBarHeight = <%% 24, 21, 18, 15, 24 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 11 %%>;
    blueWhiteFactorLineWidth = <%% 352, 280, 240, 200, 352 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 10 %%>;
    blueWhiteFactorWidth = <%% 180, 150, 140, 120, 180 %%>;
    blueWhiteFactorHeight = <%% 36, 30, 26, 21, 36 %%>;
    blueWhiteFactorTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhiteFactorSize = <%% 15, 14, 13, 12, 3 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 19, 17, 15, 22 %%>;
    blueWhitePlusCircleSize = <%% 20, 19, 16, 15, 20 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 7, 6, 5, 8 %%>;

    processValueSize = <%% 15, 13, 12, 11, 15 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = <%% 1808, 1638, 1442, 1442, 1808 %%>;

    processValuesRatio = 99.4;

    constructItems = [
      { title: "미정 / 거주중" },
      { title: "1개월 이내" },
      { title: "2개월 이내" },
      { title: "3개월 이내" },
      { title: "4개월 이내" },
      { title: "5개월 이내" },
      { title: "6개월 이내" },
      { title: "1년 이내" },
      { title: "1년 이상" },
    ]
    statusItems = [
      {
        title: "기존 가구 재배치",
      },
      {
        title: "일부 신규 구매",
      },
      {
        title: "전체 신규 구매",
      },
    ];
    fabricItems = [
      {
        title: "1인 가구",
      },
      {
        title: "부부 (자녀 없음)",
      },
      {
        title: "부부 + 유아기 자녀",
      },
      {
        title: "부부 + 학령기 자녀",
      },
      {
        title: "기타",
      },
    ];
    ageItems = [
      {
        title: "29세 이하",
      },
      {
        title: "30세 - 39세",
      },
      {
        title: "40세 - 49세",
      },
      {
        title: "50세 - 59세",
      },
      {
        title: "60세 이상",
      },
    ];

    instance.totalMenu[7] = objectDeepCopy(constructItems);
    instance.totalMenu[8] = objectDeepCopy(statusItems);
    instance.totalMenu[9] = objectDeepCopy(fabricItems);
    instance.totalMenu[10] = objectDeepCopy(ageItems);

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((statusItems.length / 1) - 1))) / (statusItems.length / 1);
    yesButtonWidthNoMargin = (standardWidth - (0 * ((constructItems.length / 1) - 1))) / (constructItems.length / 1);
    yesButtonWidth2 = (standardWidth - (yesButtonBetween * ((fabricItems.length / 1) - 1))) / (fabricItems.length / 1);
    yesButtonWidth3 = (standardWidth - (yesButtonBetween * ((ageItems.length / 1) - 1))) / (ageItems.length / 1);

    if (instance.totalValues[7] === null) {
      instance.totalValues[7] = defaultBudgetValue;
    } else {
      defaultBudgetValue = instance.totalValues[7];
    }

    barClickEvent = (i) => {
      return async (e) => {
        try {
          const target = document.querySelector('.' + blueBlock2BarFactorIndexClassName + String(i));
          const index = Number(target.getAttribute("index"));
          const siblings = [ ...target.parentElement.querySelectorAll('.' + blueBlock2BarFactorClassName) ];
          const toggle = target.getAttribute("toggle");
          let blue0, blue1, num, wordsTarget;

          siblings.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) })

          num = 0;
          for (let dom of siblings) {
            blue0 = dom.querySelector('.' + blueBlock2ClassName0);
            blue1 = dom.querySelector('.' + blueBlock2ClassName1);
            wordsTarget = document.querySelector('.' + blueBlock2BarWordsIndexClassName + String(num));
            if (index > num) {
              blue0.style.opacity = String(1);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            } else if (index === num) {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(1);
              wordsTarget.firstChild.style.color = colorExtended.darkBlack;
              dom.setAttribute("toggle", "on");
            } else {
              blue0.style.opacity = String(0);
              blue1.style.opacity = String(0);
              wordsTarget.firstChild.style.color = colorExtended.mainBlue;
              dom.setAttribute("toggle", "off");
            }
            num++;
          }

          instance.totalValues[7] = index;

        } catch (e) {
          console.log(e);
        }
      }
    }

    sixSelectionEvent2 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseSixthClassName1);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
                instance.totalValues[8] = null;
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
                instance.totalValues[8] = Number(dom.getAttribute("index"));
              } else {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          }

          if (instance.totalValues[8] === 0) {
            document.querySelector('.' + sixthNoticeBoxClassName).children[0].style.opacity = String(0);
            document.querySelector('.' + sixthNoticeBoxClassName).children[1].style.opacity = String(0.7);
            document.querySelector('.' + sixthNoticeBoxClassName).children[2].style.color = colorExtended.darkBlack;
            document.querySelector('.' + sixthNoticeBoxClassName).children[2].querySelectorAll('b')[0].style.color = colorExtended.blueDark;
            document.querySelector('.' + sixthNoticeBoxClassName).children[2].querySelectorAll('b')[1].style.color = colorExtended.darkBlack;
          } else {
            document.querySelector('.' + sixthNoticeBoxClassName).children[0].style.opacity = String(1);
            document.querySelector('.' + sixthNoticeBoxClassName).children[1].style.opacity = String(0);
            document.querySelector('.' + sixthNoticeBoxClassName).children[2].style.color = colorExtended.deactive;
            document.querySelector('.' + sixthNoticeBoxClassName).children[2].querySelectorAll('b')[0].style.color = colorExtended.deactive;
            document.querySelector('.' + sixthNoticeBoxClassName).children[2].querySelectorAll('b')[1].style.color = colorExtended.deactive;
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    sixSelectionEvent3 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseSixthClassName2);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
                instance.totalValues[9] = null;
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
                instance.totalValues[9] = Number(dom.getAttribute("index"));
              } else {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    sixSelectionEvent4 = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseSixthClassName3);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
                instance.totalValues[10] = null;
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
                instance.totalValues[10] = Number(dom.getAttribute("index"));
              } else {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    ghostBase = {};

    fifthBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(68);
    fifthBase.style.transition = "all 0.6s ease";
    fifthBase.style.height = String(convertingBaseHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: fifthBase,
      class: [ ghostBaseClassName, fifthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "5",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "6",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "입주 예정 시기를 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: constructItems.map((o, index) => {
            return [
              {
                class: [ blueBlock2BarFactorClassName, blueBlock2BarFactorIndexClassName + String(index) ],
                attribute: {
                  index: String(index),
                  toggle: (index === defaultBudgetValue ? "on" : "off"),
                },
                event: {
                  click: barClickEvent(index),
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(yesButtonWidthNoMargin) + ea,
                  height: String(processBarHeight) + ea,
                  border: "1.5px solid " + colorExtended.mainBlue,
                  borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.mainBlue : ""),
                  borderLeft: (index === 0 ? "1.5px solid " + colorExtended.mainBlue : "1px dashed " + colorExtended.mainBlue),
                  boxSizing: "border-box",
                  borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                  borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                  background: colorExtended.white,
                  cursor: "pointer",
                },
                children: [
                  {
                    class: [ blueBlock2ClassName0 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: (index === constructItems.length - 1 ? "1.5px solid " + colorExtended.darkBlack : ""),
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      borderBottomRightRadius: (index === constructItems.length - 1 ? String(processBarHeight) + ea : ""),
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index < defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                  {
                    class: [ blueBlock2ClassName1 ],
                    style: {
                      display: "inline-flex",
                      position: "absolute",
                      width: String(yesButtonWidthNoMargin) + ea,
                      height: String(processBarHeight) + ea,
                      top: String(-1.5) + "px",
                      left: String(-1.5) + "px",
                      border: "1.5px solid " + colorExtended.darkBlack,
                      borderRight: "1.5px solid " + colorExtended.darkBlack,
                      borderLeft: (index === 0 ? "1.5px solid " + colorExtended.darkBlack : "1px dashed " + colorExtended.darkBlack),
                      boxSizing: "border-box",
                      borderTopLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderBottomLeftRadius: (index === 0 ? String(processBarHeight) + ea : ""),
                      borderTopRightRadius: String(processBarHeight) + ea,
                      borderBottomRightRadius: String(processBarHeight) + ea,
                      background: colorExtended.mainBlue,
                      zIndex: String(1),
                      transition: "all 0s ease",
                      opacity: index === defaultBudgetValue ? String(1) : String(0),
                    }
                  },
                ]
              },
            ]
          }).flat()
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(processValuesRatio) + '%',
          },
          children: constructItems.map((o, index) => {
            return {
              class: [ blueBlock2BarWordsIndexClassName + String(index) ],
              attribute: {
                index: String(index),
              },
              event: {
                click: barClickEvent(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: "calc(100% / " + String(constructItems.length) + ")",
                height: String(yesButtonHeight) + ea,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(processValueSize) + ea,
                  fontWeight: String(processValueWeight),
                  color: index === defaultBudgetValue ? colorExtended.darkBlack : colorExtended.mainBlue,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "가구 구매 정도를 알려주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          class: [ sixthNoticeBoxClassName ],
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight2) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gray2,
                opacity: (instance.totalValues[8] === 0) ? String(0) : String(1),
                transition: "all 0.6s ease",
              }
            },
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gradientBlue,
                opacity: (instance.totalValues[8] === 0) ? String(0.7) : String(0),
                transition: "all 0.6s ease",
              }
            },
            {
              text: "<b%*%b>기존 가구 재배치 :&nbsp;&nbsp;<u%가구의 새로운 구매 없이 기존 가구 그대로 사용%u>",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: (instance.totalValues[8] === 0) ? colorExtended.darkBlack : colorExtended.deactive,
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: (instance.totalValues[8] === 0) ? colorExtended.blueDark : colorExtended.deactive,
              },
              under: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(400),
                color: (instance.totalValues[8] === 0) ? colorExtended.darkBlack : colorExtended.deactive,
              },
            }
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: statusItems.map((o, index) => {
            return {
              class: [ selectionBaseSixthClassName1 ],
              attribute: {
                index: String(index),
                toggle: index === instance.totalValues[8] ? "on" : "off"
              },
              event: {
                click: sixSelectionEvent2(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: index === instance.totalValues[8] ? "1.5px solid " + colorExtended.darkBlack : "1.5px solid " + colorExtended.mainBlue,
                background: index === instance.totalValues[8] ? colorExtended.mainBlue : colorExtended.white,
                boxShadow: index === instance.totalValues[8] ? "0px 3px 15px -9px " + colorExtended.darkShadow : "",
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (statusItems.length / 1) === (statusItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: index === instance.totalValues[8] ? colorExtended.darkBlack : colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "해당 가족 구성원을 체크해 주세요!",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: fabricItems.map((o, index) => {
            return {
              class: [ selectionBaseSixthClassName2 ],
              attribute: {
                index: String(index),
                toggle: index === instance.totalValues[9] ? "on" : "off"
              },
              event: {
                click: sixSelectionEvent3(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth2) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: index === instance.totalValues[9] ? "1.5px solid " + colorExtended.darkBlack : "1.5px solid " + colorExtended.mainBlue,
                background: index === instance.totalValues[9] ? colorExtended.mainBlue : colorExtended.white,
                boxShadow: index === instance.totalValues[9] ? "0px 3px 15px -9px " + colorExtended.darkShadow : "",
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (fabricItems.length / 1) === (fabricItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: index === instance.totalValues[9] ? colorExtended.darkBlack : colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "고객님의 연령대를 체크해 주세요!",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(blueBoxHeight2) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gray2,
                opacity: String(1),
              }
            },
            {
              text: "<b%*%b>고객님의 연령대에 맞는 경험과 노하우의 디자이너를 추천해 드려요!",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionWeight),
                color: colorExtended.black,
              },
              bold: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(blueDescriptionBoldWeight),
                color: colorExtended.blueDark,
              },
              under: {
                fontSize: String(blueDescriptionSize) + ea,
                fontWeight: String(400),
                color: colorExtended.black,
              },
            }
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            marginTop: String(yesButtonAreaMarginTop) + ea,
          },
          children: ageItems.map((o, index) => {
            return {
              class: [ selectionBaseSixthClassName3 ],
              attribute: {
                index: String(index),
                toggle: index === instance.totalValues[10] ? "on" : "off"
              },
              event: {
                click: sixSelectionEvent4(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth3) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: index === instance.totalValues[10] ? "1.5px solid " + colorExtended.darkBlack : "1.5px solid " + colorExtended.mainBlue,
                background: index === instance.totalValues[10] ? colorExtended.mainBlue : colorExtended.white,
                boxShadow: index === instance.totalValues[10] ? "0px 3px 15px -9px " + colorExtended.darkShadow : "",
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (ageItems.length / 1) === (ageItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: index === instance.totalValues[10] ? colorExtended.darkBlack : colorExtended.blueDark,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.fourthReturn(),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: "1.5px solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              if (instance.totalValues[7] === null) {
                GeneralJs.alert("입주 예정 시기를 알려주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              if (instance.totalValues[8] === null) {
                GeneralJs.alert("가구 구매 정도를 알려주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              if (instance.totalValues[9] === null) {
                GeneralJs.alert("해당 가족 구성원을 체크해 주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              if (instance.totalValues[10] === null) {
                GeneralJs.alert("고객님의 연령대를 체크해 주세요!", true, true);
                return 0;
              }
              window.history.pushState({ mode: "fifth" }, "");
              convertingFunction = instance.fifthConverting().bind(this);
              await convertingFunction(e);
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.fileChangeEvent = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, fileClickWordsClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { fileTongClassName } = this;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let barTop;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let grayHeight, grayWording, grayTextTop;
  let pannelWordsSize;
  let grayMargin;
  let cardWidthNumber, cardHeightNumber, cardMargin, cardHeight;
  let cardInnerMargin, cardInnerMarginTop;
  let xIconWidth, xIconTop, xVisual;
  let cardWordingSize;

  bottomMargin = <%% 16, 16, 16, 12, 4 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  barTop = <%% 15, 15, 15, 15, 2.6 %%>;

  titleBottom = <%% 15, 15, 15, 12, 0 %%>;
  grayHeight = <%% 120, 120, 120, 120, 36 %%>;

  pannelWordsSize = <%% 23, 23, 23, 21, 4 %%>;

  grayTextTop = <%% 40, 40, 39, 39, 14 %%>;
  grayMargin = <%% 16, 16, 16, 16, 3 %%>;
  if (desktop) {
    grayTextTop = grayTextTop + (isMac() ? 0 : 2);
  }

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  cardWidthNumber = <%% 8, 6, 5, 4, 2 %%>;
  cardHeightNumber = <%% 2, 2, 2, 2, 3 %%>;
  cardMargin = <%% 6, 6, 6, 6, 1 %%>;
  cardHeight = (grayHeight - (desktop ? grayMargin * 2 : (grayMargin * 2) + 2) - (cardMargin * (cardHeightNumber - 1))) / cardHeightNumber;

  cardWordingSize = <%% 13, 13, 13, 13, 3 %%>;
  cardInnerMargin = <%% 16, 16, 16, 16, 3 %%>;
  cardInnerMarginTop = <%% 11, 11, 11, 11, 2.1 %%>;
  if (desktop) {
    cardInnerMarginTop = cardInnerMarginTop + (isMac() ? 0 : 1);
  }
  xIconWidth = <%% 10, 10, 10, 10, 2 %%>;
  xIconTop = <%% 14, 14, 14, 14, 3 %%>;
  xVisual = <%% 4, 4, 4, 4, 1 %%>;

  return function (e) {
    const self = this;
    const mother = document.querySelector('.' + fileTongClassName);
    const cardMaker = (fileObj, index) => {
      createNode({
        mother,
        events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } }, { type: "selectstart", event: (e) => { e.preventDefault(); } } ],
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(100% - " + String(cardMargin * (cardWidthNumber - 1)) + ea + ") / " + String(cardWidthNumber) + ")",
          height: String(cardHeight) + ea,
          marginRight: String(index % cardWidthNumber === cardWidthNumber - 1 ? 0 : cardMargin) + ea,
          marginBottom: String(cardMargin) + ea,
          background: colorExtended.white,
          borderRadius: String(3) + "px",
        },
        children: [
          {
            event: { selectstart: (e) => { e.preventDefault() } },
            style: {
              position: "relative",
              top: String(cardInnerMarginTop) + ea,
              left: String(cardInnerMargin) + ea,
              width: withOut(xIconWidth + (cardInnerMargin * 2.8), ea),
              height: withOut(cardInnerMarginTop, ea),
              overflow: "hidden",
            },
            children: [
              {
                event: { selectstart: (e) => { e.preventDefault() } },
                text: fileObj.name,
                style: {
                  position: "absolute",
                  fontSize: String(cardWordingSize) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                  width: String(900) + ea,
                }
              }
            ]
          },
          {
            attribute: [
              { index }
            ],
            events: [
              {
                type: "click",
                event: function (e) {
                  const index = Number(this.getAttribute("index"));
                  let cancel;
                  cancel = JSON.parse(instance.fileInput.getAttribute("cancel"));
                  cancel.push(index);
                  instance.fileInput.setAttribute("cancel", JSON.stringify(cancel));
                  this.parentElement.parentElement.removeChild(this.parentElement);
                  if (cancel.length === self.files.length) {
                    document.querySelector('.' + fileClickWordsClassName).style.display = "inline-block";
                  } else {
                    document.querySelector('.' + fileClickWordsClassName).style.display = "none";
                  }
                }
              }
            ],
            style: {
              position: "absolute",
              background: colorChip.white,
              width: String(xIconWidth) + ea,
              height: String(xIconWidth) + ea,
              right: String(cardInnerMargin) + ea,
              top: String(xIconTop) + ea,
            },
            children: [
              {
                style: {
                  position: "absolute",
                  background: colorChip.white,
                  width: String(xIconWidth + (xVisual * 2)) + ea,
                  height: String(xIconWidth + (xVisual * 2)) + ea,
                  right: String(-1 * xVisual) + ea,
                  top: String(-1 * xVisual) + ea,
                }
              },
              {
                mode: "svg",
                source: instance.mother.returnCancel(colorExtended.focusBlue),
                style: {
                  position: "absolute",
                  background: colorChip.white,
                  width: String(xIconWidth) + ea,
                  right: String(0) + ea,
                  top: String(0) + ea,
                }
              }
            ]
          }
        ]
      });
    }
    instance.fileInput.setAttribute("cancel", JSON.stringify([]));
    cleanChildren(mother);
    for (let i = 0; i < this.files.length; i++) {
      cardMaker(this.files[i], i);
    }

    if (this.files.length === 0) {
      document.querySelector('.' + fileClickWordsClassName).style.display = "inline-block";
    } else {
      document.querySelector('.' + fileClickWordsClassName).style.display = "none";
    }
  }
}

StyleExplanationJs.prototype.insertSeventhBox = async function (fifthBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { fifthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName, fileTongClassName, sixthFadeOutTargetClassName, fileInputClassName, fileClickWordsClassName } = this;
  const selectionBaseSeventhClassName0 = "selectionBaseSeventhClassName0";
  const selectionBaseSeventhClassName1 = "selectionBaseSeventhClassName1";
  const selectionBaseSeventhClassName2 = "selectionBaseSeventhClassName2";
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + fifthFadeOutTargetClassName) ];
    let minusLeft;
    let descriptionSize;
    let titleSize;
    let descriptionMarginTop;
    let betweenMargin;
    let checkCircleWidth;
    let buttonHeight;
    let ghostBase;
    let wordsMotherMarginTop;
    let numberSize;
    let numberWeight;
    let numberBarHeight;
    let numberBarMarginLeft;
    let numberBarTop;
    let numbersAreaMarginTop;
    let titleMarginTop;
    let titleWeight;
    let titleSquareWidth, titleSquareMarginRight, titleSquareTop;
    let imageAreaMarginTop, imageAreaMarginBottom;
    let imageWidth;
    let yesButtonAreaMarginTop;
    let yesButtonWidth, yesButtonWidth2;
    let yesButtonHeight;
    let yesButtonBetween;
    let yesButtonTextTop;
    let yesButtonSize;
    let yesButtonWeight;
    let completeButtonWidth, completeButtonAreaMarginBottom;
    let completeButtonSize, completeButtonWeight, completeButtonTextTop;
    let returnCircleWidth;
    let returnCircleMarginRight;
    let returnCicleArrowWidth, returnCicleArrowLeft;
    let constructItems;
    let statusItems;
    let blueBoxHeight, blueBoxHeight2;
    let middleLineMarginBottom;
    let middleLinePaddingTop;
    let blueDescriptionSize, blueDescriptionWeight, blueDescriptionBoldWeight, blueDescriptionTextTop;
    let fabricItems;
    let yesButtonWidthNoMargin;
    let processBarHeight;
    let defaultBudgetValue;
    let blueWhiteFactorsAreaMarginTop;
    let blueWhiteFactorLineWidth, blueWhiteFactorLineMarginRight;
    let blueWhiteFactorWidth, blueWhiteFactorHeight;
    let blueWhiteFactorTextTop, blueWhiteFactorSize, blueWhiteFactorWeight;
    let blueWhitePlusCircleWidth, blueWhitePlusCircleSize, blueWhitePlusCircleWeight, blueWhitePlusCircleTextTop;
    let blueWhitePlusCircleMargin;
    let processValuesRatio;
    let processValueSize, processValueWeight;
    let convertingBaseHeight;
    let ageItems;
    let yesButtonWidth3;
    let descriptionWeight;
    let descriptionVisualLeft;
    let styleCheckBaseMother;
    let fileUploadBoxHeight;
    let fileUploadBoxSize, fileUploadBoxWeight;
    let grayMargin;
    let grayTextTop;
    let fileBlockMother;
    let sevenSelectionEvent;

    minusLeft = window.innerWidth - standardWidth + 1;

    titleMarginTop = <%% 25, 21, 15, 12, 25 %%>;
    titleSize = <%% 25, 24, 22, 20, 4 %%>;
    titleWeight = <%% 800, 800, 800, 800, 800 %%>;
    titleSquareWidth = <%% 8, 8, 6, 5, 8 %%>;
    titleSquareMarginRight = <%% 9, 9, 7, 5, 9 %%>;
    titleSquareTop = <%% 1, 1, 1, 1, 1 %%>;

    descriptionSize = <%% 15, 14, 13, 12, 3.3 %%>;
    descriptionMarginTop = <%% 5, 5, 4, 3, 2.6 %%>;
    descriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
    descriptionVisualLeft = <%% -1, -1, -1, -1, -1 %%>;

    betweenMargin = <%% 26, 26, 26, 26, 26 %%>;
    checkCircleWidth = <%% 23, 23, 23, 23, 23 %%>;
    buttonHeight = <%% 42, 42, 38, 32, 42 %%>;

    wordsMotherMarginTop = <%% 120, 120, 120, 120, 120 %%>;

    numberSize = <%% 28, 26, 24, 21, 28 %%>;
    numberWeight = <%% 700, 700, 700, 700, 700 %%>;
    numberBarHeight = <%% 28, 24, 22, 19, 28 %%>;
    numberBarMarginLeft = <%% 12, 12, 10, 9, 12 %%>;
    numberBarTop = <%% -1, -1, -1, -1, -1 %%>;

    numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

    imageAreaMarginTop = <%% 45, 40, 35, 30, 45 %%>;
    imageAreaMarginBottom = <%% 110, 100, 75, 65, 110 %%>;
    imageWidth = <%% 510, 510, 510, 510, 510 %%>;

    yesButtonAreaMarginTop = <%% 25, 21, 18, 16, 25 %%>;
    yesButtonWidth = <%% 160, 140, 130, 120, 160 %%>;
    yesButtonHeight = <%% 40, 36, 34, 22, 40 %%>;
    yesButtonBetween = <%% 12, 10, 9, 8, 12 %%>;
    yesButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    yesButtonSize = <%% 16, 15, 14, 13, 3.5 %%>;
    yesButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    completeButtonWidth = <%% 120, 120, 110, 100, 120 %%>;
    completeButtonAreaMarginBottom = <%% 129, 129, 110, 90, 129 %%>;
    completeButtonSize = <%% 17, 17, 16, 15, 17 %%>;
    completeButtonWeight = <%% 700, 700, 700, 700, 700 %%>;
    completeButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;

    returnCircleWidth = <%% 34, 34, 32, 30, 34 %%>;
    returnCircleMarginRight = <%% 11, 11, 10, 9, 11 %%>;
    returnCicleArrowWidth = <%% 9, 9, 8, 7, 9 %%>;
    returnCicleArrowLeft = <%% -1.5, -1.5, -1, -0.5, -1.5 %%>;

    middleLineMarginBottom = <%% 100, 90, 80, 70, 100 %%>;
    middleLinePaddingTop = <%% 80, 70, 60, 50, 80 %%>;

    blueBoxHeight = <%% 130, 120, 105, 95, 120 %%>;
    blueBoxHeight2 = <%% 70, 68, 60, 56, 70 %%>;
    blueDescriptionSize = <%% 16, 15, 14, 13, 15 %%>;
    blueDescriptionWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueDescriptionBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    processBarHeight = <%% 24, 21, 18, 15, 24 %%>;
    defaultBudgetValue = <%% 5, 5, 5, 5, 5 %%>;
    blueWhiteFactorsAreaMarginTop = <%% 11, 11, 11, 11, 11 %%>;
    blueWhiteFactorLineWidth = <%% 352, 280, 240, 200, 352 %%>;
    blueWhiteFactorLineMarginRight = <%% 10, 10, 10, 10, 10 %%>;
    blueWhiteFactorWidth = <%% 180, 150, 140, 120, 180 %%>;
    blueWhiteFactorHeight = <%% 36, 30, 26, 21, 36 %%>;
    blueWhiteFactorTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhiteFactorSize = <%% 15, 14, 13, 12, 3 %%>;
    blueWhiteFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    blueWhitePlusCircleWidth = <%% 22, 19, 17, 15, 22 %%>;
    blueWhitePlusCircleSize = <%% 20, 19, 16, 15, 20 %%>;
    blueWhitePlusCircleWeight = <%% 800, 800, 800, 800, 800 %%>;
    blueWhitePlusCircleTextTop = <%% -1, -1, -1, -1, -1 %%>;
    blueWhitePlusCircleMargin = <%% 8, 7, 6, 5, 8 %%>;

    processValueSize = <%% 15, 13, 12, 11, 15 %%>;
    processValueWeight = <%% 700, 700, 700, 700, 700 %%>;

    convertingBaseHeight = <%% 2000, 1864, 1640, 1640, 1864 %%>;

    fileUploadBoxHeight = <%% 180, 180, 180, 180, 180 %%>;
    fileUploadBoxSize = <%% 24, 24, 24, 24, 24 %%>;
    fileUploadBoxWeight = <%% 300, 300, 300, 300, 300 %%>;

    grayTextTop = <%% 40, 40, 39, 39, 14 %%>;
    grayMargin = <%% 16, 16, 16, 16, 3 %%>;
    if (desktop) {
      grayTextTop = grayTextTop + (isMac() ? 0 : 2);
    }  

    processValuesRatio = 99.4;

    statusItems = [
      { title: "9:30 - 11:00" },
      { title: "11:00 - 12:30" },
      { title: "13:30 - 16:30" },
      { title: "16:30 - 18:30" },
    ];

    instance.totalMenu[11] = objectDeepCopy(statusItems);
    instance.totalMenu[12] = [];
    instance.totalMenu[13] = [];

    yesButtonWidth = (standardWidth - (yesButtonBetween * ((statusItems.length / 1) - 1))) / (statusItems.length / 1);

    sevenSelectionEvent = (index) => {
      return async function (e) {
        try {
          const targets = document.querySelectorAll('.' + selectionBaseSeventhClassName0);
          const index = Number(this.getAttribute("index"));
          const toggle = this.getAttribute("toggle");
          if (toggle === "on") {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.mainBlue;
                dom.style.background = colorExtended.white;
                dom.style.boxShadow = "";
                dom.firstChild.style.color = colorExtended.blueDark;
                dom.setAttribute("toggle", "off");
              }
            }
          } else {
            for (let dom of targets) {
              if (index === Number(dom.getAttribute("index"))) {
                dom.style.border = "1.5px solid " + colorExtended.darkBlack;
                dom.style.background = colorExtended.mainBlue;
                dom.style.boxShadow = "0px 3px 15px -9px " + colorExtended.darkShadow;
                dom.firstChild.style.color = colorExtended.darkBlack;
                dom.setAttribute("toggle", "on");
              }
            }
          }

          instance.totalValues[11] = [ ...document.querySelectorAll('.' + selectionBaseSeventhClassName0) ].map((d, index) => {
            return {
              on: (d.getAttribute("toggle") === "on"),
              index
            }
          }).filter((o) => { return o.on }).map((o) => { return o.index });

        } catch (e) {
          console.log(e);
        }
      }
    }

    ghostBase = {};

    fifthBase.children[1].style.opacity = String(0);
    await instance.insertSecondBarBox(91);
    fifthBase.style.transition = "all 0.6s ease";
    fifthBase.style.height = String(convertingBaseHeight) + ea;
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);

    ghostBase = createNode({
      mother: fifthBase,
      class: [ ghostBaseClassName, sixthFadeOutTargetClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        paddingTop: String(0),
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
        alignItems: "center",
      }
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: String(numbersAreaMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1.5px solid " + colorExtended.blueDark,
          },
          children: [
            {
              text: "6",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: String(numberBarHeight) + ea,
                width: String(0),
                borderRight: "2px solid " + colorExtended.mainBlue,
                transform: "rotate(25deg)",
                marginLeft: String(numberBarMarginLeft) + ea,
                marginRight: String(numberBarMarginLeft) + ea,
                top: String(numberBarTop) + ea,
              }
            },
            {
              text: "6",
              style: {
                display: "inline-block",
                position: "relative",
                fontFamily: "mont",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                color: colorExtended.mainBlue,
                opacity: String(0.4),
              }
            },
          ]
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "가능한 상담 시간을 모두 체크해 주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(imageAreaMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
          children: statusItems.map((o, index) => {
            return {
              class: [ selectionBaseSeventhClassName0 ],
              attribute: {
                index: String(index),
                toggle: (Array.isArray(instance.totalValues[11]) && instance.totalValues[11]?.includes(index)) ? "on" : "off",
              },
              event: {
                click: sevenSelectionEvent(index),
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(yesButtonWidth) + ea,
                height: String(yesButtonHeight) + ea,
                borderRadius: String(yesButtonHeight) + ea,
                border: !(Array.isArray(instance.totalValues[11]) && instance.totalValues[11]?.includes(index)) ? "1.5px solid " + colorExtended.mainBlue : "1.5px solid " + colorExtended.darkBlack,
                background: !(Array.isArray(instance.totalValues[11]) && instance.totalValues[11]?.includes(index)) ? colorExtended.white : colorExtended.mainBlue,
                boxShadow: !(Array.isArray(instance.totalValues[11]) && instance.totalValues[11]?.includes(index)) ? "" : "0px 3px 15px -9px " + colorExtended.darkShadow,
                boxSizing: "border-box",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: String(index % (statusItems.length / 1) === (statusItems.length / 1) - 1 ? 0 : yesButtonBetween) + ea,
                marginBottom: String(yesButtonBetween) + ea,
                cursor: "pointer",
              },
              child: {
                text: o.title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(yesButtonTextTop) + ea,
                  fontSize: String(yesButtonSize) + ea,
                  fontWeight: String(yesButtonWeight),
                  color: !(Array.isArray(instance.totalValues[11]) && instance.totalValues[11]?.includes(index)) ? colorExtended.blueDark : colorExtended.darkBlack,
                }
              }
            }
          })
        }
      ]
    });

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "마음에 드는 사진을 3장씩 선택해주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
        {
          text: "인공지능을 통해 컨셉에 맞는 디자이너를 추천해 드릴게요.",
          style: {
            display: "flex",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorExtended.black,
            marginTop: String(descriptionMarginTop) + ea,
          }
        },
      ]
    });
    styleCheckBaseMother = createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
          },
        },
      ]
    });
    instance.styleCheck(styleCheckBaseMother.firstChild);

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(middleLinePaddingTop) + ea,
        borderTop: "3px dotted " + colorExtended.blueWhite,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(titleMarginTop) + ea,
            flexDirection: "row",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(titleSquareWidth) + ea,
                height: String(titleSquareWidth) + ea,
                borderRadius: String(2) + "px",
                background: colorExtended.mainBlue,
                marginRight: String(titleSquareMarginRight) + ea,
                top: String(titleSquareTop) + ea,
              }
            },
            {
              text: "현장 사진 혹은 도면이 있다면 업로드해주세요.",
              style: {
                display: "inline-flex",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorExtended.black,
              }
            },
          ]
        },
      ]
    });
    fileBlockMother = createNode({
      mother: ghostBase,
      event: { selectstart: (e) => { e.preventDefault() } },
      style: {
        display: "flex",
        position: "relative",
        marginTop: String(imageAreaMarginTop) + ea,
        marginBottom: String(middleLineMarginBottom) + ea,
        borderRadius: String(8) + "px",
        width: withOut(0, ea),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          events: [
            {
              type: "click",
              event: function (e) {
                document.querySelector("." + fileInputClassName).click();
              }
            },
            {
              type: "drop",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                document.querySelector("." + fileInputClassName).files = e.dataTransfer.files;
                instance.fileChangeEvent().call(document.querySelector("." + fileInputClassName), e);
              }
            },
            {
              type: [ "dragenter", "dragover", "dragleave" ],
              event: (e) => { e.preventDefault(); e.stopPropagation(); }
            },
            {
              type: "selectstart",
              event: (e) => { e.preventDefault() },
            }
          ],
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(fileUploadBoxHeight) + ea,
            borderRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.gradientBlue,
                opacity: String(0.7),
              }
            },
            {
              style: {
                position: "absolute",
                top: String(grayMargin + (desktop ? 0 : 2)) + ea,
                left: String(grayMargin) + ea,
                width: withOut(grayMargin * 2, ea),
                height: withOut(grayMargin + grayMargin + (desktop ? 0 : 2), ea),
                overflow: "scroll",
                zIndex: String(1),
              },
              children: [
                {
                  class: [ fileTongClassName ],
                  style: {
                    position: "relative",
                    width: String(100) + '%',
                    top: String(0),
                    left: String(0),
                  }
                }
              ]
            },
            {
              class: [ fileClickWordsClassName ],
              event: { selectstart: (e) => { e.preventDefault() } },
              text: "클릭 또는 드래그하여 업로드...",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(blueDescriptionTextTop) + ea,
                fontSize: String(fileUploadBoxSize) + ea,
                fontWeight: String(fileUploadBoxWeight),
                color: colorExtended.blueDark,
              },
            },
          ]
        },
      ]
    });

    if (document.querySelector('.' + fileInputClassName) === null) {
      createNode({
        mother: document.body,
        mode: "input",
        class: [ fileInputClassName ],
        events: [
          {
            type: "change",
            event: instance.fileChangeEvent()
          }
        ],
        attribute: [
          { type: "file" },
          { name: "upload" },
          { accept: "image/*,  application/pdf" },
          { multiple: "true" },
          { cancel: JSON.stringify([]) }
        ],
        style: {
          position: "absolute",
          display: "none",
        }
      });
    }

    this.fileInput = document.querySelector("." + fileInputClassName);

    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: String(buttonHeight) + ea,
        marginBottom: String(completeButtonAreaMarginBottom) + ea,
      },
      children: [
        {
          event: {
            click: instance.fifthReturn(),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(returnCircleWidth) + ea,
            height: String(returnCircleWidth) + ea,
            borderRadius: String(returnCircleWidth) + ea,
            marginRight: String(returnCircleMarginRight) + ea,
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            border: "1.5px solid " + colorExtended.mainBlue,
            cursor: "pointer",
          },
          child: {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.mainBlue),
            style: {
              position: "relative",
              width: String(returnCicleArrowWidth) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(180deg)",
              left: String(returnCicleArrowLeft) + ea,
            }
          }
        },
        {
          event: {
            click: async function (e) {
              let convertingFunction;
              if (instance.totalValues[11] === null) {
                GeneralJs.alert("가능한 상담 시간을 모두 체크해 주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              if (instance.totalValues[12] === null) {
                GeneralJs.alert("마음에 드는 사진을 3장씩 선택해주세요!", true, true);
                GeneralJs.scrollTo(window, 0, 0);
                return 0;
              }
              window.history.pushState({ mode: "sixth" }, "");
              convertingFunction = instance.sixthConverting().bind(this);
              await convertingFunction(e);
            },
            selectstart: (e) => { e.preventDefault() }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(completeButtonWidth) + ea,
            height: String(buttonHeight) + ea,
            borderRadius: String(10) + "px",
            background: colorExtended.darkBlack,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid " + colorExtended.blueDark,
            cursor: "pointer",
          },
          child: {
            event: { selectstart: (e) => { e.preventDefault() } },
            text: "선택 완료",
            style: {
              display: "inline-flex",
              position: "relative",
              fontSize: String(completeButtonSize) + ea,
              fontWeight: String(completeButtonWeight),
              color: colorExtended.white,
              top: String(completeButtonTextTop) + ea,
            }
          }
        }
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertEighthBox = async function (fifthBase) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, setDebounce } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, baseTop, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const submitBlockClassName = "submitBlockClassName";
  const { sixthFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, ghostBaseClassName, fileTongClassName, secondBarBoxMotherClassName, blurFixedBelowBarClassName, greenTalkEventClassName } = this;
  try {
    const fadeOutTargets = [ ...document.querySelectorAll('.' + sixthFadeOutTargetClassName) ];
    let ghostBase;
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let firstBasePaddingBottom;
    let subTitleSize, subTitleWeight, subTitleMarginTop;
    let buttonMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonSize;
    let buttonTextTop;
    let buttonWeight;
    let firstBasePaddingTop;
    let mainIllust;
    let mobileLeftPaddingVisual;
    let titleSize, titleWeight, titleVisualTop, titleVisualLeft;
    let titleLineHeight;
    let descriptionContents;
    let descriptionSize, descriptionLineHeight;
    let descriptionMarginTop;
    let mainImageTop, mainImageHeight;
    let pointOpacity;
    let descriptionPointBoldPaddingLeft;
    let descriptionPointBoldPaddingTop;
    let descriptionPointBoldPaddingBottom;
    let descriptionPointBoldMargin;
    let buttonBetween;
    let mobileImageRight;
    let mobileSubImageMarginTop;
    let barBase;
    let barBaseMarginTop;
    let initAreaPaddingBottom;
    let secondWhite;
    let thirdEtc;
    let hangulTitleSize, hangulTitleWeight;
    let etcNotice;
    let noticeTong;
    let tempBlock;
    let noticeBlockBetween;
    let noticeBlockTitleWidth;
    let noticeBlockHeight;
    let blockPaddingTop;
    let blockPaddingBottom;
    let noticeTitleSize, noticeTitleWeight, noticeTitleTextTop;
    let noticeDescriptionIndent;
    let noticeDescriptionSize, noticeDescriptionWeight, noticeDescriptionLineHeight, noticeDescriptionTextTop;
    let noticeBlockMarginTop;
    let thirdDescriptionMarginTop, thirdDescriptionWeight, thirdDescriptionSize, thirdDescriptionLineHeight;
    let processDiagramHeight;
    let totalHeight;
    let blackButtonWidth, blackButtonHeight, blackButtonBetween;
    let blackButtonSize, blackButtonWeight;
    let hangulDescriptionWeight, hangulDescriptionSize, hangulDescriptionLineHeight;
    let hangulDescriptionMarginTop;
    let hangulBarMarginTop, hangulBarWidth, hangulBarHeight;
    let noticeVisual;
    let fixedWhiteBarHeight, fixedWhiteBarButtonMarginLeft;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    totalHeight = <%% 2593, 2346, 1960, 1960, 201 %%>;

    firstBasePaddingTop = <%% 26, 24, 24, 24, 8 %%>;
    firstBasePaddingBottom = <%% 180, 170, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 16, 3.7 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% (isMac() ? 6 : 8), (isMac() ? 5 : 7), (isMac() ? 3 : 6), (isMac() ? 3 : 6), 0.5 %%>;

    buttonMarginTop = <%% 165, 160, 132, 110, 3.6 %%>;
    buttonWidth = <%% 205, 194, 186, 168, 31 %%>;
    buttonHeight = <%% 32, 32, 30, 28, 9 %%>;
    buttonSize = <%% 14, 14, 13, 12, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonBetween = <%% 8, 8, 7, 6, 1 %%>;

    titleSize = <%% 57, 51, 48, 39, 8 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.5 %%>;
    titleVisualLeft = <%% -2, -2, -2, -2, -0.5 %%>;
    titleLineHeight = <%% 1.11, 1.11, 1.11, 1.11, 1.07 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 346, 314, 39 %%>;

    descriptionSize = <%% 15, 14, 14, 13, 3.2 %%>;
    descriptionLineHeight = <%% 1.8, 1.8, 1.8, 1.7, 1.8 %%>;

    mobileLeftPaddingVisual = 1;

    descriptionMarginTop = <%% 40, 40, 36, 30, 81.5 %%>;

    descriptionPointBoldPaddingLeft = <%% 8, 8, 8, 8, 1.6 %%>;
    descriptionPointBoldPaddingTop = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 3), (isMac() ? 2 : 3), 0.4 %%>;
    descriptionPointBoldPaddingBottom = <%% (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 0.8 %%>;
    descriptionPointBoldMargin = <%% 2, 2, 2, 2, 1 %%>;

    mobileImageRight = 5;
    mobileSubImageMarginTop = 7.5;

    barBaseMarginTop = <%% 80, 80, 80, 80, 80 %%>;

    initAreaPaddingBottom = <%% 200, 200, 150, 100, 200 %%>;

    hangulTitleSize = <%% 32, 28, 23.5, 20, 32 %%>;
    hangulTitleWeight = <%% 800, 800, 800, 800, 800 %%>;

    noticeBlockBetween = <%% 10, 9, 5, 6, 10 %%>;
    noticeBlockTitleWidth = <%% 280, 210, 150, 120, 280 %%>;
    noticeBlockHeight = <%% 108, 100, 90, 70, 108 %%>;

    noticeVisual = <%% 24, 21, 18, 15, 3 %%>;

    blockPaddingTop = <%% 170, 170, 130, 90, 170 %%>;
    blockPaddingBottom = <%% 200, 200, 150, 100, 200 %%>;

    noticeBlockMarginTop = <%% 50, 45, 40, 35, 50 %%>;

    noticeTitleSize = <%% 21, 18, 15, 14, 21 %%>;
    noticeTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    noticeTitleTextTop = <%% -1, -1, -1, -1, -1 %%>;
    noticeDescriptionIndent = <%% 24, 24, 21, 18, 24 %%>;
    noticeDescriptionSize = <%% 15, 14, 13, 12, 15 %%>;
    noticeDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    noticeDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    noticeDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    thirdDescriptionMarginTop = <%% 10, 7, 3, 1, 1 %%>;
    thirdDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    thirdDescriptionSize = <%% 16, 15, 14, 13, 16 %%>;
    thirdDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

    processDiagramHeight = <%% 420, 350, 320, 290, 420 %%>;

    blackButtonWidth = <%% 180, 160, 145, 120, 180 %%>;
    blackButtonHeight = <%% 38, 32, 30, 24, 38 %%>;
    blackButtonBetween = <%% 8, 7, 6, 5, 8 %%>;
    blackButtonSize = <%% 16, 14, 13, 12, 4 %%>;
    blackButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

    hangulDescriptionMarginTop = <%% 45, 32, 28, 20, 4 %%>;
    hangulDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    hangulDescriptionSize = <%% 16, 15, 14, 13, 3 %%>;
    hangulDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
    hangulBarMarginTop = <%% 102, 67, 67, 67, 102 %%>;
    hangulBarWidth = <%% 96, 84, 64, 48, 96 %%>;
    hangulBarHeight = <%% 6, 5, 4, 3, 1 %%>;

    fixedWhiteBarHeight = <%% 96, 80, 72, 64, 9 %%>;
    fixedWhiteBarButtonMarginLeft = <%% 1037, 722, 503, 300, 600 %%>;

    mainIllust = <%% StyleExplanationJs.binaryPath + "/endIllust.svg", StyleExplanationJs.binaryPath + "/endIllust.svg", StyleExplanationJs.binaryPath + "/endIllust.svg", StyleExplanationJs.binaryPath + "/endIllust.svg", StyleExplanationJs.binaryPath + "/endIllust.svg" %%>;

    descriptionContents = [
      `홈리에종의 서비스 신청을 진행해주셔서 감사합니다!`,
      `신청서를 검토한 후, 고객님께 <b%1차 응대 전화%b>를 드릴 예정입니다!`,
    ];

    etcNotice = [
      {
        title: "예산과 기간",
        description: [
          "홈리에종의 인테리어 예산은 크게 시공 비용, 가구 구매, 디자이너 비용으로 구분됩니다.",
          "프로젝트 소요기간은 서비스 종류에 따라 다르며 홈퍼니싱, 홈스타일링, 토탈/엑스트라 스타일링 평균 소요 기간은 각 30일, 45일, 60일입니다.",
        ]
      },
      {
        title: "디자이너의 제공물",
        description: [
          "디자이너 기본 작업물로는 일정표, 디자인 제안서, 배치도 (콜라주, 3D 모델링), 예산 구성안 및 제품 리스트 등이 있습니다.",
          "시공을 진행할 경우 시공 의뢰서가 추가 제공됩니다.",
        ]
      },
      {
        title: "시공사 선택권",
        description: [
          "홈리에종은 시공 업체 선택을 고객에게 부여하고 있습니다.",
          "최저가를 보장해드릴 수 없기 때문에 업체를 비교하여 선택하실 수 있으며 홈리에종과 디자이너 시공사 선택시 책임 시공합니다.",
          "고객님께서 직접 선택하신 외부 시공사를 이용할 수 있으며 이 경우에는 시공 감리를 진행하지 않습니다.",
        ]
      },
    ]

    if (desktop && window.innerHeight > 1100) {
      titleSize = <%% 59, 51, 48, 39, 9 %%>;
      subTitleSize = <%% 19, 18, 17, 16, 3.6 %%>;
      firstBasePaddingTop = <%% 60, 48, 30, 28, 50 %%>;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingBottom = <%% 230, 210, 160, 130, 210 %%>;
      mainImageTop = <%% 36, 26, 18, 16, 32 %%>;
      mainImageHeight = <%% 500, 394, 346, 346, 39 %%>;
      buttonMarginTop = <%% 248, 146, 132, 110, 3.6 %%>;
    }

    instance.resultAnalytics().catch((err) => {
      console.log(err);
    });

    ghostBase = {};

    fifthBase.children[1].style.opacity = String(1);
    await instance.insertSecondBarBox(100);
    fifthBase.style.transition = "all 0.6s ease";
    fifthBase.style.height = String(totalHeight) + ea;
    document.querySelector('.' + secondBarBoxMotherClassName)?.remove();
    setQueue(() => {
      for (let dom of fadeOutTargets) {
        dom.remove();
      }
      ghostBase.style.position = "relative";
    }, 600);
    window.addEventListener("scroll", (e) => {
      setDebounce(() => {
        if (window.scrollY === 0) {
          document.querySelector('.' + greenTalkEventClassName).style.animation = "justfadeinoriginal 0.6s ease forwards";
          document.querySelector('.' + blurFixedBelowBarClassName).style.transform = "translateY(" + String(96) + ea + ")";
        } else {
          document.querySelector('.' + greenTalkEventClassName).style.animation = "justfadeoutoriginal 0.6s ease forwards";
          document.querySelector('.' + blurFixedBelowBarClassName).style.transform = "translateY(" + String(0) + ea + ")";
        }
      }, "__blurFixedPopupOpenEvent__");
    })
    
    ghostBase = createNode({
      mother: fifthBase,
      class: [ ghostBaseClassName ],
      style: {
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        top: String(0) + ea,
        marginTop: String(baseTop - naviHeight) + ea,
        paddingTop: String(firstBasePaddingTop) + ea,
        width: withOut(0, ea),
        animation: "fadeinlite 0.6s ease forwards",
        opacity: String(0),
        transform: "translateX(20px)",
      }
    });

    // main title
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: (desktop ? "Request completed<b%.%b>" : "Request completed<b%.%b>"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.darkBlack,
            fontFamily: "mont",
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.darkBlack,
            fontFamily: "mont",
            opacity: String(pointOpacity),
          }
        }
      ]
    });

    // sub title
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "홈리에종 서비스 신청 완료",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
          }
        }
      ]
    });

    // main illust
    createNode({
      mother: ghostBase,
      mode: "img",
      attribute: {
        src: mainIllust
      },
      style: {
        position: "absolute",
        right: desktop ? String(0) : String(mobileImageRight) + ea,
        top: String(mainImageTop) + ea,
        width: desktop ? "" : withOut(mobileImageRight * 2, ea),
        height: desktop ? String(mainImageHeight) + ea : "",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0.2s 1 normal forwards running fadeupdelay2",
      }
    });

    // description
    createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        marginTop: String(descriptionMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.5s ease 0s 1 normal forwards running fadeupdelay2",
        textAlign: desktop ? "left" : "center",
        flexDirection: desktop ? "row" : "column",
      },
      children: [
        {
          text: descriptionContents.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(400),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
          },
          bold: {
            color: colorExtended.white,
            fontWeight: String(800),
            fontSize: String(descriptionSize) + ea,
            lineHeight: String(descriptionLineHeight),
            background: colorExtended.blueDark,
            padding: String(descriptionPointBoldPaddingLeft) + ea,
            paddingTop: String(descriptionPointBoldPaddingTop) + ea,
            paddingBottom: String(descriptionPointBoldPaddingBottom) + ea,
            "border-radius": String(5) + "px",
            margin: String(descriptionPointBoldMargin) + ea,
          }
        },
      ]
    })

    // black button
    createNode({
      mother: ghostBase,
      attribute: {
        selectstart: (e) => { e.preventDefault() },
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "center",
        marginTop: String(buttonMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(10px)",
        animation: "1.2s ease 0.4s 1 normal forwards running fadeupdelay",
        cursor: "pointer",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(blackButtonWidth) + ea,
            height: String(blackButtonHeight) + ea,
            background: colorExtended.blueDark,
            borderRadius: String(blackButtonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            marginRight: String(blackButtonBetween) + ea,
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: `추천부터 받고 싶어요!`,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(blackButtonSize) + ea,
              fontWeight: String(blackButtonWeight),
              color: colorExtended.white,
            },
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(blackButtonWidth) + ea,
            height: String(blackButtonHeight) + ea,
            background: colorExtended.darkBlack,
            borderRadius: String(blackButtonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: `상담부터 원해요.`,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(blackButtonSize) + ea,
              fontWeight: String(blackButtonWeight),
              color: colorExtended.white,
            },
          }
        },
      ]
    });

    barBase = createNode({
      mother: ghostBase,
      attribute: {
        selectstart: (e) => { e.preventDefault() },
      },
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(barBaseMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(10px)",
        animation: "1.2s ease 0.6s 1 normal forwards running fadeupdelay",
      },
    });
    await instance.insertSecondBarBox(100, barBase);

    // second white
    secondWhite = createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        marginTop: String(initAreaPaddingBottom) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        paddingTop: String(blockPaddingTop) + ea,
        paddingBottom: String(blockPaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        },
      }
    });

    // main title
    createNode({
      mother: secondWhite,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
      },
      children: [
        {
          text: "서비스 과정을\n한눈에 확인해 보세요.",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(hangulTitleSize) + ea,
            fontWeight: String(hangulTitleWeight),
            lineHeight: String(1.36),
            color: colorExtended.darkBlack,
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
          },
        }
      ]
    });

    // sub title
    createNode({
      mother: secondWhite,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        marginTop: String(hangulDescriptionMarginTop) + ea,
      },
      children: [
        {
          text: [
            "문의 및 응대 이후,",
            "",
            "홈리에종은 디자이너 추천서를 제공하며",
            "고객의 디자이너 선택 및 계약금 결제로 계약이 성립됩니다.",
            "",
            "계약 체결 후 매칭된 디자이너와 현장 미팅이 이루어지고,",
            "본격적인 디자인, 시공, 가구 구매가 시작됩니다.",
          ].join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(hangulDescriptionWeight),
            fontSize: String(hangulDescriptionSize) + ea,
            lineHeight: String(hangulDescriptionLineHeight),
          }
        }
      ]
    });

    createNode({
      mother: secondWhite,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "start" : "center",
        alignItems: desktop ? "start" : "center",
        marginTop: String(hangulBarMarginTop) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(hangulBarWidth) + ea,
            height: String(hangulBarHeight) + ea,
            borderRadius: String(hangulBarHeight) + ea,
            background: colorExtended.gradientBlue,
            opacity: String(0.7),
          }
        }
      ]
    });

    createNode({
      mother: secondWhite,
      mode: "img",
      attribute: {
        src: (<&& StyleExplanationJs.binaryPath + "/diagram.svg" | StyleExplanationJs.binaryPath + "/diagram.svg" | StyleExplanationJs.binaryPath + "/diagram2.svg" | StyleExplanationJs.binaryPath + "/diagram.svg" | StyleExplanationJs.binaryPath + "/diagram.svg" &&>),
      },
      style: {
        position: "absolute",
        right: desktop ? String(0) : String(mobileImageRight) + ea,
        top: String(blockPaddingTop) + ea,
        width: desktop ? "" : withOut(mobileImageRight * 2, ea),
        height: desktop ? String(processDiagramHeight) + ea : "",
      }
    });

    // third etc
    thirdEtc = createNode({
      mother: ghostBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(blockPaddingTop) + ea,
        paddingBottom: String(blockPaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.blueWhiteBack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        },
      }
    });

    createNode({
      mother: thirdEtc,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "center" : "center",
        alignItems: desktop ? "center" : "center",
      },
      children: [
        {
          text: "기타 안내 사항",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(hangulTitleSize) + ea,
            fontWeight: String(hangulTitleWeight),
            lineHeight: String(1.36),
            color: colorExtended.darkBlack,
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
          },
        }
      ]
    });

    createNode({
      mother: thirdEtc,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: desktop ? "center" : "center",
        alignItems: desktop ? "center" : "center",
        marginTop: String(thirdDescriptionMarginTop) + ea,
      },
      children: [
        {
          text: "더 자세한 내용은 홈리에종 카카오 채널 혹은 유선 전화를 통해 확인하실 수 있습니다.",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.black,
            fontWeight: String(thirdDescriptionWeight),
            fontSize: String(thirdDescriptionSize) + ea,
            lineHeight: String(thirdDescriptionLineHeight),
          }
        }
      ]
    });

    noticeTong = createNode({
      mother: thirdEtc,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        marginTop: String(noticeBlockMarginTop) + ea,
        width: withOut(0, ea),
      },
    })
    for (let obj of etcNotice) {
      tempBlock = createNode({
        mother: noticeTong,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0, ea),
          height: String(noticeBlockHeight) + ea,
          marginBottom: String(noticeBlockBetween) + ea,
        }
      });

      createNode({
        mother: tempBlock,
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          width: String(noticeBlockTitleWidth) + ea,
          height: withOut(0, ea),
          marginRight: String(noticeBlockBetween) + ea,
          borderRadius: String(10) + "px",
          background: colorExtended.blueDark,
        },
        child: {
          text: obj.title,
          style: {
            fontSize: String(noticeTitleSize) + ea,
            fontWeight: String(noticeTitleWeight),
            color: colorExtended.white,
            display: "inline-block",
            position: "relative",
            top: String(noticeTitleTextTop) + ea,
          }
        }
      })

      createNode({
        mother: tempBlock,
        style: {
          display: "inline-flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "start",
          paddingLeft: String(noticeDescriptionIndent) + ea,
          width: withOut(noticeBlockTitleWidth + noticeBlockBetween + noticeVisual, ea),
          borderRadius: String(10) + "px",
          background: colorExtended.white,
        },
        child: {
          text: obj.description.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(noticeDescriptionSize) + ea,
            fontWeight: String(noticeDescriptionWeight),
            color: colorExtended.black,
            lineHeight: String(noticeDescriptionLineHeight),
            top: String(noticeDescriptionTextTop) + ea,
          }
        }
      });
    }

    // fixed below bar
    createNode({
      mother: totalContents,
      class: [ "backblurwhite", blurFixedBelowBarClassName ],
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: String(fixedWhiteBarHeight) + ea,
        zIndex: String(4),
        boxShadow: "0px -3px 19px -9px " + colorExtended.darkShadow,
        transformOrigin: "100% 0%",
        transform: "translateY(" + String(fixedWhiteBarHeight) + ea + ")",
        transition: "all 0.6s ease",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(blackButtonWidth) + ea,
            height: String(blackButtonHeight) + ea,
            background: colorExtended.gradientBlue4,
            borderRadius: String(blackButtonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            marginRight: String(blackButtonBetween) + ea,
            marginLeft: String(fixedWhiteBarButtonMarginLeft) + ea,
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: `추천부터 받고 싶어요!`,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(blackButtonSize) + ea,
              fontWeight: String(blackButtonWeight),
              color: colorExtended.white,
            },
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",    
            width: String(blackButtonWidth) + ea,
            height: String(blackButtonHeight) + ea,
            background: colorExtended.darkBlack,
            borderRadius: String(blackButtonHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            attribute: {
              selectstart: (e) => { e.preventDefault() },
            },
            text: `상담부터 원해요.`,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(blackButtonSize) + ea,
              fontWeight: String(blackButtonWeight),
              color: colorExtended.white,
            },
          }
        },
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.resultAnalytics = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, setDebounce } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, baseTop, totalContents, fileInputClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  try {
    const questionNumber = this.questionNumber;
    const totalValues = objectDeepCopy(instance.totalValues);
    const totalMenu = objectDeepCopy(instance.totalMenu);
    let tong;
    let thisObj;
    let thisArr;

    tong = [];
    for (let i = 0; i < questionNumber; i++) {
      if (i !== questionNumber - 1) {
        if (i !== questionNumber - 2) {
          if (typeof totalValues[i] === "number") {
            thisObj = objectDeepCopy(totalMenu[i][totalValues[i]]);
            if (thisObj.value === undefined) {
              tong.push(thisObj.title);
            } else {
              tong.push(thisObj.value);
            }
          } else if (Array.isArray(totalValues[i])) {
            thisArr = totalMenu[i].filter((o, index) => {
              return totalValues[i].includes(index);
            });
            if (thisArr.every((o) => { return o.value === undefined })) {
              tong.push(thisArr.map((o) => { return o.title }));
            } else {
              tong.push(thisArr.map((o) => { return o.value }));
            }
          }
        } else {
          tong.push(objectDeepCopy(totalValues[i]));
        }
      }
    }

    if (document.querySelector("." + fileInputClassName) !== null) {
      if (document.querySelector("." + fileInputClassName).length !== 0) {
        tong.push([ ...document.querySelector("." + fileInputClassName).files ]);
      } else {
        tong.push([]);
      }
    } else {
      tong.push([]);
    }

    console.log(tong);

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.firstConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const secondBase = document.querySelector('.' + secondBaseClassName);
      const blackTarget = document.querySelector('.' + initAreaClassName);
      const fadeOutTargets = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -565, -457, -0, -0 %%>;
      numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

      blackTarget.style.transition = "all 0.6s ease";
      if (blackTarget.style.marginTop.replace(/[^0-9\-]/gi, '') === String(blackScrollTop)) {
        scrollTo(window, 0, 0, false, async () => {
          for (let dom of fadeOutTargets) {
            dom.style.animation = "fadeoutlite 0.6s ease forwards";
          }
          setQueue(() => {
            instance.insertThirdBox(secondBase).catch((err) => {
              console.log(err);
            });
          }, 600);
        });
      } else {
        scrollTo(window, 0, 0, true);
        setQueue(() => {
          blackTarget.style.marginTop = String(blackScrollTop) + ea;
          fadeOutTargets[0].style.marginTop = String(numbersAreaMarginTop) + ea;
          setQueue(() => {
            for (let dom of fadeOutTargets) {
              dom.style.animation = "fadeoutlite 0.6s ease forwards";
            }
            setQueue(() => {
              instance.insertThirdBox(secondBase).catch((err) => {
                console.log(err);
              });
            }, 450);
          }, 600);
        }, 300);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.secondConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, secondFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + secondFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -0, -0, -0, -0 %%>;
      numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          instance.insertFourthBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
            console.log(err);
          });
        }, 600);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.thirdConverting = function (furnishingMode = false) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, thirdFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  if (!furnishingMode) {
    return async function (e) {
      try {
        const fadeOutTargets = [ ...document.querySelectorAll('.' + thirdFadeOutTargetClassName) ];
        let blackScrollTop;
        let numbersAreaMarginTop;
  
        blackScrollTop = <%% -642, -0, -0, -0, -0 %%>;
        numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;
  
        scrollTo(window, 0, 0, false, async () => {
          for (let dom of fadeOutTargets) {
            dom.style.animation = "fadeoutlite 0.6s ease forwards";
          }
          setQueue(() => {
            instance.insertFifthBox(document.querySelector('.' + secondBaseClassName), furnishingMode).catch((err) => {
              console.log(err);
            });
          }, 600);
        });
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    return async function (e) {
      try {
        const secondBase = document.querySelector('.' + secondBaseClassName);
        const blackTarget = document.querySelector('.' + initAreaClassName);
        const fadeOutTargets = [ ...document.querySelectorAll('.' + firstFadeOutTargetClassName) ];
        let blackScrollTop;
        let numbersAreaMarginTop;
  
        blackScrollTop = <%% -642, -0, -0, -0, -0 %%>;
        numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;
  
        blackTarget.style.transition = "all 0.6s ease";
        if (blackTarget.style.marginTop.replace(/[^0-9\-]/gi, '') === String(blackScrollTop)) {
          scrollTo(window, 0, 0, false, async () => {
            for (let dom of fadeOutTargets) {
              dom.style.animation = "fadeoutlite 0.6s ease forwards";
            }
            setQueue(() => {
              instance.insertFifthBox(document.querySelector('.' + secondBaseClassName), furnishingMode).catch((err) => {
                console.log(err);
              });
            }, 600);
          });
        } else {
          scrollTo(window, 0, 0, true);
          setQueue(() => {
            blackTarget.style.marginTop = String(blackScrollTop) + ea;
            fadeOutTargets[0].style.marginTop = String(numbersAreaMarginTop) + ea;
            setQueue(() => {
              for (let dom of fadeOutTargets) {
                dom.style.animation = "fadeoutlite 0.6s ease forwards";
              }
              setQueue(() => {
                instance.insertFifthBox(secondBase, furnishingMode).catch((err) => {
                  console.log(err);
                });
              }, 450);
            }, 600);
          }, 300);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}

StyleExplanationJs.prototype.fourthConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fourthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fourthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -0, -0, -0, -0 %%>;
      numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          instance.insertSixthBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.fifthConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, fifthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + fifthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -0, -0, -0, -0 %%>;
      numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          instance.insertSeventhBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.sixthConverting = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, sixthFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName } = this;
  return async function (e) {
    try {
      const fadeOutTargets = [ ...document.querySelectorAll('.' + sixthFadeOutTargetClassName) ];
      let blackScrollTop;
      let numbersAreaMarginTop;

      blackScrollTop = <%% -642, -0, -0, -0, -0 %%>;
      numbersAreaMarginTop = <%% 100, 100, 90, 80, 10 %%>;

      scrollTo(window, 0, 0, false, async () => {
        for (let dom of fadeOutTargets) {
          dom.style.animation = "fadeoutlite 0.6s ease forwards";
        }
        setQueue(() => {
          instance.insertEighthBox(document.querySelector('.' + secondBaseClassName)).catch((err) => {
            console.log(err);
          });
        }, 600);
      });

    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.insertBarBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { firstBarTargetClassName } = this;
  try {
    let thirdBase;
    let minusLeft;
    let x, y, z;
    let radius;
    let barAreaHeight;
    let flagWidth;
    let flagRight;
    let flagTop;
    let commentAreaTop;
    let commentAreaLeft;
    let commentAreaWidth;
    let commentAreaHeight;
    let commentTriangleWidth;
    let commentSize, commentWeight, commentTextTop;

    radius = <%% 5, 5, 4, 3, 1 %%>;

    x = <%% 2, 2, 2, 2, 2 %%>;
    y = <%% 5, 5, 5, 5, 5 %%>;
    z = <%% 8, 8, 8, 8, 8 %%>;

    barAreaHeight = <%% 270, 270, 250, 230, 270 %%>;
    flagWidth = <%% 23, 23, 21, 19, 23 %%>;
    flagRight = <%% -19, -19, -18, -17, -19 %%>;
    flagTop = <%% -34, -34, -32, -30, -34 %%>;

    commentAreaTop = <%% -52, -52, -50, -48, -52 %%>;
    commentAreaLeft = <%% 2, 2, 2, 2, 2 %%>;
    commentAreaWidth = <%% 286, 286, 270, 260, 286 %%>;
    commentAreaHeight = <%% 32, 32, 28, 24, 32 %%>;

    commentTriangleWidth = <%% 8, 8, 8, 6, 8 %%>;

    commentSize = <%% 14, 14, 13, 11, 14 %%>;
    commentWeight = <%% 700, 700, 700, 700, 700 %%>;
    commentTextTop = <%% -1, -1, -1, -1, -1 %%>;

    minusLeft = window.innerWidth - standardWidth + 1;

    thirdBase = createNode({
      mother: baseTong,
      class: [ firstBarTargetClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: String(barAreaHeight) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.blueDark,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        }
      }
    });

    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(0),
        borderBottom: String(radius) + "px dotted " + colorExtended.black,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(-1 * z) + ea,
            left: String(-1 * z) + ea,
            width: String(radius + (z * 2)) + ea,
            height: String(radius + (z * 2)) + ea,
            borderRadius: String(radius + (z * 2)) + ea,
            background: colorExtended.white,
            opacity: String(0.2),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * y) + ea,
            left: String(-1 * y) + ea,
            width: String(radius + (y * 2)) + ea,
            height: String(radius + (y * 2)) + ea,
            borderRadius: String(radius + (y * 2)) + ea,
            background: colorExtended.white,
            opacity: String(0.6),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * x) + ea,
            left: String(-1 * x) + ea,
            width: String(radius + (x * 2)) + ea,
            height: String(radius + (x * 2)) + ea,
            borderRadius: String(radius + (x * 2)) + ea,
            background: colorExtended.white,
            opacity: String(1),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(radius) + ea,
            height: String(radius) + ea,
            borderRadius: String(radius) + ea,
            background: colorExtended.blueDim,
          }
        },
        {
          mode: "svg",
          source: svgMaker.goalFlag(colorExtended.white, colorExtended.mainBlue),
          style: {
            position: "absolute",
            right: String(flagRight) + ea,
            top: String(flagTop) + ea,
            width: String(flagWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(commentAreaTop) + ea,
            left: String(commentAreaLeft) + ea,
            width: String(commentAreaWidth) + ea,
            height: String(commentAreaHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.mainBlue,
            borderBottomLeftRadius: String(0) + "px",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.commentTriangle("verticalLeft", colorExtended.mainBlue),
                style: {
                  position: "absolute",
                  width: String(commentTriangleWidth) + ea,
                  bottom: String(-1 * commentTriangleWidth) + ea,
                  left: String(0),
                }
              },
              {
                text: "답변을 분석해 정확한 서비스를 제공해드릴게요!",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(commentSize) + ea,
                  fontWeight: String(commentWeight),
                  color: colorExtended.white,
                  top: String(commentTextTop) + ea,
                }
              }
            ]
          }
        }
      ]
    })


  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.insertSecondBarBox = async function (ratio = 20, barMother = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondBarBoxMotherClassName } = this;
  try {
    let thirdBase;
    let minusLeft;
    let x, y, z;
    let radius;
    let barAreaHeight;
    let flagWidth;
    let flagRight;
    let flagTop;
    let commentAreaTop;
    let commentAreaLeft;
    let commentAreaWidth;
    let commentAreaHeight;
    let commentTriangleWidth;
    let commentSize, commentWeight, commentTextTop;

    radius = <%% 5, 5, 4, 3, 1 %%>;

    x = <%% 2, 2, 2, 2, 2 %%>;
    y = <%% 5, 5, 5, 5, 5 %%>;
    z = <%% 8, 8, 8, 8, 8 %%>;

    barAreaHeight = <%% 270, 270, 250, 230, 270 %%>;
    flagWidth = <%% 23, 23, 21, 19, 23 %%>;
    flagRight = <%% -19, -19, -18, -17, -19 %%>;
    flagTop = <%% -34, -34, -32, -30, -34 %%>;

    commentAreaTop = <%% -52, -52, -50, -48, -52 %%>;
    commentAreaLeft = <%% 2, 2, 2, 2, 2 %%>;
    commentAreaWidth = <%% 286, 286, 270, 260, 286 %%>;
    commentAreaHeight = <%% 32, 32, 28, 24, 32 %%>;

    commentTriangleWidth = <%% 8, 8, 8, 6, 8 %%>;

    commentSize = <%% 14, 14, 13, 11, 14 %%>;
    commentWeight = <%% 700, 700, 700, 700, 700 %%>;
    commentTextTop = <%% -1, -1, -1, -1, -1 %%>;

    minusLeft = window.innerWidth - standardWidth + 1;

    if (barMother === null) {
      if (document.querySelector('.' + secondBarBoxMotherClassName) === null) {
        document.querySelector('.' + instance.firstBarTargetClassName).remove();
        thirdBase = createNode({
          mother: baseTong,
          class: [ secondBarBoxMotherClassName ],
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: String(barAreaHeight) + ea,
          },
          child: {
            style: {
              position: "absolute",
              top: String(0),
              left: String(-1 * minusLeft) + ea,
              background: colorExtended.blueDark,
              width: withOut(-1 * (minusLeft * 2), ea),
              height: withOut(0, ea),
            },
            next: {
              style: {
                position: "absolute",
                top: String(0),
                left: String(-1 * minusLeft) + ea,
                background: colorExtended.gradientBlue,
                width: withOut(-1 * (minusLeft * 2), ea),
                height: withOut(0, ea),
                opacity: String(0),
                animation: "justfadeinoriginal 0.4s ease forwards",
              },
            }
          }
        });
      } else {
        removeByClass(secondBarBoxMotherClassName);
        thirdBase = createNode({
          mother: baseTong,
          class: [ secondBarBoxMotherClassName ],
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: String(barAreaHeight) + ea,
          },
          child: {
            style: {
              position: "absolute",
              top: String(0),
              left: String(-1 * minusLeft) + ea,
              background: colorExtended.white,
              width: withOut(-1 * (minusLeft * 2), ea),
              height: withOut(0, ea),
            },
            next: {
              style: {
                position: "absolute",
                top: String(0),
                left: String(-1 * minusLeft) + ea,
                background: colorExtended.gradientBlue,
                width: withOut(-1 * (minusLeft * 2), ea),
                height: withOut(0, ea),
              },
            }
          }
        });
      }
    } else {
      thirdBase = barMother;
    }

    createNode({
      mother: thirdBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(0),
        borderBottom: String(radius) + "px dotted " + colorExtended.black,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            height: String(0),
            zIndex: String(1),
            width: String(ratio) + "%",
            borderBottom: String(radius) + "px dotted " + colorExtended.white,
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(radius / 2) + ea,
            height: String(0),
            zIndex: String(1),
            width: "calc(" + String(ratio) + "%" + " - " + String(radius * 1) + ea + ")",
            borderBottom: String(radius) + "px solid " + colorExtended.white,
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * z) + ea,
            left: "calc(" + String(ratio) + "% + " + String(-1 * z) + ea + ")",
            width: String(radius + (z * 2)) + ea,
            height: String(radius + (z * 2)) + ea,
            borderRadius: String(radius + (z * 2)) + ea,
            background: colorExtended.white,
            opacity: String(ratio === 100 ? 0.1 : 0.2),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * y) + ea,
            left: "calc(" + String(ratio) + "% + " + String(-1 * y) + ea + ")",
            width: String(radius + (y * 2)) + ea,
            height: String(radius + (y * 2)) + ea,
            borderRadius: String(radius + (y * 2)) + ea,
            background: colorExtended.white,
            opacity: String(ratio === 100 ? 0.3 : 0.6),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(-1 * x) + ea,
            left: "calc(" + String(ratio) + "% + " + String(-1 * x) + ea + ")",
            width: String(radius + (x * 2)) + ea,
            height: String(radius + (x * 2)) + ea,
            borderRadius: String(radius + (x * 2)) + ea,
            background: colorExtended.white,
            opacity: String(ratio === 100 ? 0.8 : 1),
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0) + ea,
            left: "calc(" + String(ratio) + "% + " + String(0) + ea + ")",
            width: String(radius) + ea,
            height: String(radius) + ea,
            borderRadius: String(radius) + ea,
            background: colorExtended.blueDim,
          }
        },
        {
          mode: "svg",
          source: svgMaker.goalFlag(colorExtended.white, (ratio === 100 ? colorExtended.white : colorExtended.blueDark)),
          style: {
            position: "absolute",
            right: String(flagRight) + ea,
            top: String(flagTop) + ea,
            width: String(flagWidth) + ea,
          }
        },
        (ratio < 90 ? {
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(commentAreaTop) + ea,
            left: "calc(" + String(ratio) + "% + " + String(commentAreaLeft) + ea + ")",
            width: String(commentAreaWidth) + ea,
            height: String(commentAreaHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.blueDark,
            borderBottomLeftRadius: String(0) + "px",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.commentTriangle("verticalLeft", colorExtended.blueDark),
                style: {
                  position: "absolute",
                  width: String(commentTriangleWidth) + ea,
                  bottom: String(-1 * commentTriangleWidth) + ea,
                  left: String(0),
                }
              },
              {
                text: "답변을 분석해 정확한 서비스를 제공해드릴게요!",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(commentSize) + ea,
                  fontWeight: String(commentWeight),
                  color: colorExtended.white,
                  top: String(commentTextTop) + ea,
                }
              }
            ]
          }
        } : (ratio === 100 ? {
          style: {
            display: "none"
          }
        } : {
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(commentAreaTop) + ea,
            left: "calc(" + String(ratio) + "% - " + String(commentAreaWidth - commentAreaLeft - commentAreaLeft) + ea + ")",
            width: String(commentAreaWidth) + ea,
            height: String(commentAreaHeight) + ea,
            borderRadius: String(8) + "px",
            background: colorExtended.blueDark,
            borderBottomRightRadius: String(0) + "px",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.commentTriangle("verticalRight", colorExtended.blueDark),
                style: {
                  position: "absolute",
                  width: String(commentTriangleWidth) + ea,
                  bottom: String(-1 * commentTriangleWidth) + ea,
                  right: String(0),
                }
              },
              {
                text: "답변을 분석해 정확한 서비스를 제공해드릴게요!",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(commentSize) + ea,
                  fontWeight: String(commentWeight),
                  color: colorExtended.white,
                  top: String(commentTextTop) + ea,
                }
              }
            ]
          }
        }))
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

StyleExplanationJs.prototype.resizeEvent = function () {
  const instance = this;
  const { homeliaisonAnalytics, colorExtended } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;

  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;

  if (desktop) {
    const resizeDebounceEvent = function () {
      let timeout;
      const reEvent = function () {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "aspirantPageResize",
          data: {
            delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
            date: new Date(),
          },
        }).then(() => {
          window.location.reload();
          instance.resizeStack = 0;
        }).catch((err) => {
          console.log(err);
        });
      }
      let immediate = null;
      return function (e) {
        if (instance.resizeStack === 0) {
          instance.resizeStack = 1;
          instance.resizeFrom = window.innerWidth;
        }
        let context = this;
        let args = arguments;
        function later() {
          timeout = null;
          if (!immediate) { reEvent.apply(context, args); };
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, 250);
        if (callNow) {
          reEvent.apply(context, args);
        }
      }
    }
    window.addEventListener("resize", resizeDebounceEvent());
  }
}

StyleExplanationJs.prototype.firstReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName, secondBarBoxMotherClassName } = this;
  return async function (e) {
    try {
      scrollTo(window, 0, 0);
      document.querySelector('.' + ghostBaseClassName).remove();
      instance.selectionDomMaker(document.querySelector('.' + secondBaseClassName), true);
      document.querySelector('.' + secondBaseClassName).children[1].style.opacity = String(1);
      removeByClass(secondBarBoxMotherClassName);
      await instance.insertBarBox();
      scrollTo(window, 0, 0);
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.secondReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName, secondBarBoxMotherClassName } = this;
  return async function (e) {
    try {
      scrollTo(window, 0, 0);
      document.querySelector('.' + ghostBaseClassName).remove();
      await instance.insertThirdBox(document.querySelector('.' + secondBaseClassName));
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.thirdReturn = function (furnishingMode = false) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName, secondBarBoxMotherClassName } = this;
  if (!furnishingMode) {
    return async function (e) {
      try {
        scrollTo(window, 0, 0);
        document.querySelector('.' + ghostBaseClassName).remove();
        await instance.insertFourthBox(document.querySelector('.' + secondBaseClassName));
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    return async function (e) {
      try {
        scrollTo(window, 0, 0);
        document.querySelector('.' + ghostBaseClassName).remove();
        instance.selectionDomMaker(document.querySelector('.' + secondBaseClassName), true);
        document.querySelector('.' + secondBaseClassName).children[1].style.opacity = String(1);
        removeByClass(secondBarBoxMotherClassName);
        await instance.insertBarBox();
      } catch (e) {
        console.log(e);
      }
    }
  }
}

StyleExplanationJs.prototype.fourthReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName, secondBarBoxMotherClassName } = this;
  return async function (e) {
    try {
      scrollTo(window, 0, 0);
      document.querySelector('.' + ghostBaseClassName).remove();
      await instance.insertFifthBox(document.querySelector('.' + secondBaseClassName));
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.fifthReturn = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, scrollTo, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { initAreaClassName, firstFadeOutTargetClassName, secondBaseClassName, firstBarTargetClassName, ghostBaseClassName, secondBarBoxMotherClassName } = this;
  return async function (e) {
    try {
      scrollTo(window, 0, 0);
      document.querySelector('.' + ghostBaseClassName).remove();
      await instance.insertSixthBox(document.querySelector('.' + secondBaseClassName));
    } catch (e) {
      console.log(e);
    }
  }
}

StyleExplanationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    let cliid;
    let clients, client;
    let contentsPhotoObj;

    if (getObj.cliid !== undefined) {
      cliid = getObj.cliid;
    } else {
      window.alert("잘못된 접근입니다!");
      throw new Error("invaild get object");
    }

    clients = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];

    contentsPhotoObj = await ajaxJson({}, BACKHOST + "/styleCuration_getPhotos", { equal: true });
    this.selectPhotos = [];
    this.randomPick = [];
    this.photos = contentsPhotoObj.photos;
    this.contentsArr = contentsPhotoObj.contentsArr;
    this.designers = contentsPhotoObj.designers;
    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, BACKHOST + "/getClientHistory", { equal: true });

    this.initAreaClassName = "initAreaClassName";
    this.firstFadeOutTargetClassName = "firstFadeOutTargetClassName";
    this.secondBaseClassName = "secondBaseClassName";
    this.firstBarTargetClassName = "firstBarTargetClassName";
    this.secondBarBoxMotherClassName = "secondBarBoxMotherClassName";
    this.ghostBaseClassName = "ghostBaseClassName";
    this.secondFadeOutTargetClassName = "secondFadeOutTargetClassName";
    this.thirdFadeOutTargetClassName = "thirdFadeOutTargetClassName";
    this.fourthFadeOutTargetClassName = "fourthFadeOutTargetClassName";
    this.fifthFadeOutTargetClassName = "fifthFadeOutTargetClassName";
    this.sixthFadeOutTargetClassName = "sixthFadeOutTargetClassName";
    this.blurFixedBelowBarClassName = "blurFixedBelowBarClassName";
    this.fileTongClassName = "fileTongClassName";
    this.fileInputClassName = "fileInputClassName";
    this.fileClickWordsClassName = "fileClickWordsClassName";
    this.greenTalkEventClassName = "greenTalkEventClassName";

    this.animationStop = false;

    this.questionNumber = 14;
    this.totalValues = (new Array(this.questionNumber)).fill(null, 0);
    this.totalMenu = (new Array(this.questionNumber)).fill(null, 0);

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "styleExplanation",
      client: instance.client,
      base: {
        instance: this,
        binaryPath: StyleExplanationJs.binaryPath,
        subTitle: (instance.client.name + " 고객님 서비스 안내"),
        secondBackground: false,
        backgroundType: 9,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          await instance.insertInitBox();
          const secondBase = await instance.insertSecondBox();
          await instance.insertBarBox();

          // GeneralJs.setQueue(() => {
          //   const fadeOutTargets = [ ...document.querySelectorAll('.' + instance.firstFadeOutTargetClassName) ];
          //   for (let dom of fadeOutTargets) {
          //     dom.remove();
          //   }
          //   instance.totalValues[0] = 1;
          //   instance.totalValues[1] = 1;
          // }, 0);
          // document.querySelector('.' + instance.initAreaClassName).style.marginTop = String(-457) + "px";
          // await instance.insertEighthBox(secondBase);

          instance.resizeEvent();
          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: "null",
                href: window.encodeURIComponent(window.location.href),
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });
          }, 60 * 1000);
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleExplanationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    window.history.replaceState({ mode: "base" }, "");
    window.addEventListener("popstate", async (e) => {
      let convertingFunction;
      if (typeof e.state === "object" && e.state !== null) {
        if (typeof e.state.mode === "string") {
          GeneralJs.scrollTo(window, 0, 0, true);

          console.log(e.state.mode);

          if (e.state.mode === "base") {
            convertingFunction = instance.firstReturn();
          } else if (e.state.mode === "first") {
            convertingFunction = instance.secondReturn();
          } else if (e.state.mode === "second") {
            convertingFunction = instance.thirdReturn();
          } else if (e.state.mode === "third") {
            convertingFunction = instance.fourthReturn();
          } else if (e.state.mode === "fourth") {
            convertingFunction = instance.fifthReturn();
          } else if (e.state.mode === "fifth") {
            convertingFunction = instance.fifthReturn();
          }
          if (typeof convertingFunction === "function") {
            await convertingFunction(e);
            GeneralJs.setQueue(() => {
              GeneralJs.scrollTo(window, 0, 0);
            }, 600);
          }
        }
      }
    });

    loading.parentNode.removeChild(loading);

    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0.3s ease}");

    GeneralJs.setQueue(() => {
      window.scrollTo(0, 0);
    }, 400);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "StyleExplanationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
