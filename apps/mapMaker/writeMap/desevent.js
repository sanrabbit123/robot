module.exports = function(map, source_rawArr) {
  let temp_reg;
  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];


  const { main, sub } = map;

  let tong = [];

  //title
  for (let i = 0; i < main.length; i++) {
    temp_reg = new RegExp("^title" + String(i) + "_");
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      main[i].src.desktop = z;
      main[i].src.mobile = z;
      svgTong.sync.push(z);
    }}
  }

  //factor title
  tong = [];
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      tong.push({ contents: main[i].children[j].title, xyz: [ i, j, 9 ] });
    }
  }

  for (let obj of tong) {
    temp_reg = new RegExp("^factorTitle" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(obj.xyz[2]));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      main[obj.xyz[0]].children[obj.xyz[1]].src.desktop = z;
      if (!/^mo/.test(main[obj.xyz[0]].children[obj.xyz[1]].src.mobile)) {
        main[obj.xyz[0]].children[obj.xyz[1]].src.mobile = z;
      }
      svgTong.sync.push(z);
    }}
  }

  //button
  const { terms, meeting, submit } = sub;
  let buttons = {
    desktop: {
      arrow: [],
      check: [],
      white: [],
    },
    mobile: {
      green: [],
      check: [],
      white: [],
    },
  };

  //set data
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].buttons !== undefined) {
        for (let k = 0; k < main[i].children[j].buttons.length; k++) {
          if (main[i].children[j].buttons[k].popup !== undefined) {
            buttons.desktop[main[i].children[j].buttons[k].type.desktop].push({ contents: main[i].children[j].buttons[k].title, xyz: [ i, j, k ], flatform: "desktop", exception: { popup: main[i].children[j].buttons[k].popup.description["desktop"] } });
            buttons.mobile[main[i].children[j].buttons[k].type.mobile].push({ contents: main[i].children[j].buttons[k].title, xyz: [ i, j, k ], flatform: "mobile", exception: { popup: main[i].children[j].buttons[k].popup.description["mobile"] } });
          } else {
            buttons.desktop[main[i].children[j].buttons[k].type.desktop].push({ contents: main[i].children[j].buttons[k].title, xyz: [ i, j, k ], flatform: "desktop", exception: {} });
            buttons.mobile[main[i].children[j].buttons[k].type.mobile].push({ contents: main[i].children[j].buttons[k].title, xyz: [ i, j, k ], flatform: "mobile", exception: {} });
          }
        }
      }
    }
  }

  buttons.desktop[terms.type.desktop].push({ contents: terms.title, xyz: [ 9, 9, 9 ], flatform: "desktop", exception: {} });
  buttons.mobile[terms.type.mobile].push({ contents: terms.title, xyz: [ 9, 9, 9 ], flatform: "mobile", exception: {} });

  buttons.desktop[meeting.type.desktop].push({ contents: meeting.title.replace(/\n/g, ' '), xyz: [ 10, 10, 10 ], flatform: "desktop", exception: {} });
  buttons.mobile[meeting.type.mobile].push({ contents: meeting.title, xyz: [ 10, 10, 10 ], flatform: "mobile", exception: {} });

  for (let i = 0; i < submit.length; i++) {
    buttons.desktop[submit[i].type.desktop].push({ contents: submit[i].title, xyz: [ 9, i, 9 ], flatform: "desktop", exception: { font: "SDGothicNeoa-fSm" } });
    buttons.mobile[submit[i].type.mobile].push({ contents: submit[i].title, xyz: [ 9, i, 9 ], flatform: "mobile", exception: { font: "SDGothicNeoa-fSm" } });
  }

  const { desktop: { arrow: desktopArrow, check: desktopCheck, white: desktopWhite }, mobile: { green: mobileGreen, check: mobileCheck, white: mobileWhite } } = buttons;

  //buttonCheck - desktopCheck.concat(mobileCheck)
  //buttonWhite - desktopWhite.concat(mobileWhite)
  //buttonArrow - desktopArrow
  //buttonGreen - mobileGreen

  //buttonCheck
  for (let { xyz: [ x, y, z ], flatform, exception } of desktopCheck.concat(mobileCheck)) {
    temp_reg = new RegExp("^b_check" + flatform + String(x) + String(y) + String(z) + "_off");
    for (let b of source_rawArr) { if (temp_reg.test(b)) {

      if (x === 10 && y === 10 && z === 10) {
        //meeting
        meeting.src[flatform].off = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y === 9 && z === 9) {
        //terms
        terms.src[flatform].off = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y !== 9 && z === 9) {
        //submit
        submit[y].src[flatform].off = b;
        svgTong.sync.push(b);

      } else {
        main[x].children[y].buttons[z].src[flatform].off = b;
        svgTong.sync.push(b);
      }

    }}
    temp_reg = new RegExp("^b_check" + flatform + String(x) + String(y) + String(z) + "_on");
    for (let b of source_rawArr) { if (temp_reg.test(b)) {

      if (x === 10 && y === 10 && z === 10) {
        //meeting
        meeting.src[flatform].on = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y === 9 && z === 9) {
        //terms
        terms.src[flatform].on = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y !== 9 && z === 9) {
        //submit
        submit[y].src[flatform].on = b;
        svgTong.sync.push(b);

      } else {
        main[x].children[y].buttons[z].src[flatform].on = b;
        svgTong.sync.push(b);
      }

    }}

    if (exception.popup !== undefined) {
      temp_reg = new RegExp("^b_check" + flatform + String(x) + String(y) + String(z) + "_popup");
      for (let b of source_rawArr) { if (temp_reg.test(b)) {
        main[x].children[y].buttons[z].popup.src[flatform] = b;
        svgTong.sync.push(b);
      }}
    }

  }

  //buttonWhite
  for (let { xyz: [ x, y, z ], flatform, exception } of desktopWhite.concat(mobileWhite)) {
    temp_reg = new RegExp("^b_white" + String(x) + String(y) + String(z));
    for (let b of source_rawArr) { if (temp_reg.test(b)) {
      if (x === 10 && y === 10 && z === 10) {
        //meeting
        meeting.src[flatform] = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y === 9 && z === 9) {
        //terms
        terms.src[flatform] = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y !== 9 && z === 9) {
        //submit
        submit[y].src[flatform] = b;
        svgTong.sync.push(b);

      } else {
        main[x].children[y].buttons[z].src[flatform] = b;
        svgTong.sync.push(b);
      }
    }}

    if (exception.popup !== undefined) {
      temp_reg = new RegExp("^b_white" + flatform + String(x) + String(y) + String(z) + "_popup");
      for (let b of source_rawArr) { if (temp_reg.test(b)) {
        main[x].children[y].buttons[z].popup.src[flatform] = b;
        svgTong.sync.push(b);
      }}
    }
  }

  //buttonArrow
  for (let { xyz: [ x, y, z ], flatform, exception } of desktopArrow) {
    temp_reg = new RegExp("^b_arrow" + String(x) + String(y) + String(z) + "_off");
    for (let b of source_rawArr) { if (temp_reg.test(b)) {
      if (x === 10 && y === 10 && z === 10) {
        //meeting
        meeting.src[flatform].off = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y === 9 && z === 9) {
        //terms
        terms.src[flatform].off = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y !== 9 && z === 9) {
        //submit
        submit[y].src[flatform].off = b;
        svgTong.sync.push(b);

      } else {
        main[x].children[y].buttons[z].src[flatform].off = b;
        svgTong.sync.push(b);
      }
    }}
    temp_reg = new RegExp("^b_arrow" + String(x) + String(y) + String(z) + "_on");
    for (let b of source_rawArr) { if (temp_reg.test(b)) {
      if (x === 10 && y === 10 && z === 10) {
        //meeting
        meeting.src[flatform].on = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y === 9 && z === 9) {
        //terms
        terms.src[flatform].on = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y !== 9 && z === 9) {
        //submit
        submit[y].src[flatform].on = b;
        svgTong.sync.push(b);

      } else {
        main[x].children[y].buttons[z].src[flatform].on = b;
        svgTong.sync.push(b);
      }
    }}

    if (exception.popup !== undefined) {
      temp_reg = new RegExp("^b_arrow" + flatform + String(x) + String(y) + String(z) + "_popup");
      for (let b of source_rawArr) { if (temp_reg.test(b)) {
        main[x].children[y].buttons[z].popup.src[flatform] = b;
        svgTong.sync.push(b);
      }}
    }
  }

  //buttonGreen
  for (let { xyz: [ x, y, z ], flatform, exception } of mobileGreen) {
    temp_reg = new RegExp("^b_green" + String(x) + String(y) + String(z) + "_off");
    for (let b of source_rawArr) { if (temp_reg.test(b)) {
      if (x === 10 && y === 10 && z === 10) {
        //meeting
        meeting.src[flatform].off = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y === 9 && z === 9) {
        //terms
        terms.src[flatform].off = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y !== 9 && z === 9) {
        //submit
        submit[y].src[flatform].off = b;
        svgTong.sync.push(b);

      } else {
        main[x].children[y].buttons[z].src[flatform].off = b;
        svgTong.sync.push(b);
      }
    }}
    temp_reg = new RegExp("^b_green" + String(x) + String(y) + String(z) + "_on");
    for (let b of source_rawArr) { if (temp_reg.test(b)) {
      if (x === 10 && y === 10 && z === 10) {
        //meeting
        meeting.src[flatform].on = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y === 9 && z === 9) {
        //terms
        terms.src[flatform].on = b;
        svgTong.sync.push(b);

      } else if (x === 9 && y !== 9 && z === 9) {
        //submit
        submit[y].src[flatform].on = b;
        svgTong.sync.push(b);

      } else {
        main[x].children[y].buttons[z].src[flatform].on = b;
        svgTong.sync.push(b);
      }
    }}

    if (exception.popup !== undefined) {
      temp_reg = new RegExp("^b_green" + flatform + String(x) + String(y) + String(z) + "_popup");
      for (let b of source_rawArr) { if (temp_reg.test(b)) {
        main[x].children[y].buttons[z].popup.src[flatform] = b;
        svgTong.sync.push(b);
      }}
    }
  }

  //notice
  tong = [];
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].notice !== undefined) {
        tong.push({ contents: main[i].children[j].notice.title, xyz: [ i, j, 9 ] });
        if (main[i].children[j].notice.mobileException !== undefined) {
          tong.push({ contents: main[i].children[j].notice.mobileException, xyz: [ i, j, 9 ], mobile: true });
        }
      }
    }
  }
  for (let obj of tong) {
    if (obj.mobile !== undefined) {
      main[obj.xyz[0]].children[obj.xyz[1]].notice.src.mobile = new Array(2);
    } else {
      main[obj.xyz[0]].children[obj.xyz[1]].notice.src.desktop = new Array(2);
    }
    for (let i = 0; i < 2; i++) {
      if (obj.mobile !== undefined) {
        temp_reg = new RegExp("^monotice" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(i));
      } else {
        temp_reg = new RegExp("^notice" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(i));
      }
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        if (obj.mobile !== undefined) {
          main[obj.xyz[0]].children[obj.xyz[1]].notice.src.mobile[i] = z;
        } else {
          main[obj.xyz[0]].children[obj.xyz[1]].notice.src.desktop[i] = z;
        }
        svgTong.sync.push(z);
      }}
    }
  }

  //popup
  tong = [];
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].popup !== undefined) {
        tong.push({ contents: main[i].children[j].popup.description.desktop, xyz: [ i, j, 9 ], flatform: "desktop", exception: {} });
        tong.push({ contents: main[i].children[j].popup.description.mobile, xyz: [ i, j, 9 ], flatform: "mobile", exception: {} });
      }
    }
  }
  for (let obj of tong) {
    if (obj.flatform === "mobile") {
      temp_reg = new RegExp("^mopopup" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(9));
    } else {
      temp_reg = new RegExp("^popup" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(9));
    }
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      if (obj.flatform === "mobile") {
        main[obj.xyz[0]].children[obj.xyz[1]].popup.src.mobile = z;
      } else {
        main[obj.xyz[0]].children[obj.xyz[1]].popup.src.desktop = z;
      }
      svgTong.sync.push(z);
    }}
  }

  //radio
  tong = [];
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].radio !== undefined) {
        tong.push({ contents: main[i].children[j].radio.factors, xyz: [ i, j, 9 ], flatform: "desktop", exception: {} });
      }
    }
  }
  for (let obj of tong) {
    main[obj.xyz[0]].children[obj.xyz[1]].radio.src = [];
    for (let i = 0; i < main[obj.xyz[0]].children[obj.xyz[1]].radio.factors.length; i++) {
      temp_reg = new RegExp("^radio" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(i));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        main[obj.xyz[0]].children[obj.xyz[1]].radio.src.push(z);
        svgTong.sync.push(z);
      }}
    }
    main[obj.xyz[0]].children[obj.xyz[1]].radio.src.sort((a, b) => {
      return Number((a.split("_")[0]).replace(/radio/gi, '').replace(/[^0-9]/g, '')) - Number((b.split("_")[0]).replace(/radio/gi, '').replace(/[^0-9]/g, ''));
    });
  }

  //pending
  temp_reg = new RegExp("^pending");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.pending.src = z;
    svgTong.sync.push(z);
  }}

  //certification
  temp_reg = new RegExp("^certification");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.certification.src = z;
    svgTong.sync.push(z);
  }}

  //presentationComplete
  temp_reg = new RegExp("^presentationComplete");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.presentationComplete.src = z;
    svgTong.sync.push(z);
  }}

  //partnershipComplete
  temp_reg = new RegExp("^partnershipComplete");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.partnershipComplete.src = z;
    svgTong.sync.push(z);
  }}

  //photoComplete
  temp_reg = new RegExp("^photoComplete");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.photoComplete.src = z;
    svgTong.sync.push(z);
  }}


  //etc
  const { etc: { clickWording, fileSend: { factorTitle, white: fileSendWhite } } } = sub;

  temp_reg = new RegExp("^clickWording_desktop");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.clickWording.src.desktop = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^clickWording_mobile");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.clickWording.src.mobile = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^fileSend_title");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.etc.fileSend.factorTitle.src.desktop = z;
    sub.etc.fileSend.factorTitle.src.mobile = z;
    svgTong.sync.push(z);
  }}

  for (let i = 0; i < sub.etc.fileSend.white.length; i++) {
    temp_reg = new RegExp("^fileSend_white_" + String(i));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      sub.etc.fileSend.white[i].src.desktop = z;
      sub.etc.fileSend.white[i].src.mobile = z;
      svgTong.sync.push(z);
    }}
  }

  //white title
  temp_reg = new RegExp("^gt_presentation_desktop");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.titleFirst.desktop.words.src = z
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^gt_presentation_mobile");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.titleFirst.mobile.words.src = z
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^gt_partnership_desktop");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.titleSecond.desktop.words.src = z
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^gt_partnership_mobile");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.titleSecond.mobile.words.src = z
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^gt_portfolio_desktop");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.titleThird.desktop.words.src = z
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^gt_portfolio_mobile");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.titleThird.mobile.words.src = z
    svgTong.sync.push(z);
  }}

  return { map: map, svgTong: svgTong, pngTong: pngTong };
}
