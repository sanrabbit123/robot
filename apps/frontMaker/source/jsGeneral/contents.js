GeneralJs.portfolioRender = function (rows, garo) {
  let dom0 = document.createDocumentFragment();
  let dom1 = document.createDocumentFragment();
  let div_clone, div_clone2, div_clone3, div_clone4, img_clone, a_clone;
  let garoBoo0, garoBoo1, garoBoo2, garoBoo3, garoBoo4, garoBoo5;

  for (let i = 0; i < rows.length; i++) {
    if (garo.desktop.indexOf(i) !== -1) {
      garoBoo0 = "garo";
      garoBoo1 = "garo";
      garoBoo2 = rows[i].photodae_d;
    } else {
      garoBoo0 = "sero";
      garoBoo1 = "";
      garoBoo2 = rows[i].photodae_s;
    }
    if (garo.mobile.indexOf(i) !== -1) {
      garoBoo3 = "garo";
      garoBoo4 = "garo";
      garoBoo5 = rows[i].photodae_d;
    } else {
      garoBoo3 = "sero";
      garoBoo4 = "";
      if (garo.mobile.indexOf(9999) !== -1) {
        garoBoo5 = rows[i].photodae_d;
      } else {
        garoBoo5 = rows[i].photodae_s;
      }
    }

    //desktop
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.id = "pblockid" + String(i);
    div_clone.classList.add("portliblock");
    div_clone.classList.add("p" + garoBoo0);

    //desktop-1
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/portdetail.php?qqq=" + rows[i].porlid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("portliblock1");
    div_clone2.style.backgroundImage = "url('" + "/list_image/portp" + rows[i].porlid + "/t" + garoBoo2 + rows[i].porlid + ".jpg" + "')";

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.classList.add("porporporimg");
    div_clone3.classList.add("piho");

    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    div_clone4.classList.add("porhoverblack");
    div_clone3.appendChild(div_clone4);

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("porporporimg");
    img_clone.src = "/list_svg/porporpor/titlehoversero/porhovec" + rows[i].porlid + ".svg";
    div_clone3.appendChild(img_clone);
    div_clone2.appendChild(div_clone3);
    a_clone.appendChild(div_clone2);

    div_clone.appendChild(a_clone);

    //desktop-2
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/portdetail.php?qqq=" + rows[i].porlid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("portliblock2");

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("porporporimg");
    img_clone.src = "/list_svg/porporpor/title" + garoBoo0 + "/portivec" + garoBoo1 + rows[i].porlid + ".svg";
    div_clone2.appendChild(img_clone);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.classList.add("porporporimg");
    div_clone3.classList.add("pwho");
    div_clone2.appendChild(div_clone3);

    a_clone.appendChild(div_clone2);

    div_clone.appendChild(a_clone);

    //desktop-end
    dom0.appendChild(div_clone);

    //mobile
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("moportliblock");
    div_clone.classList.add("mop" + garoBoo3);

    //mobile-1
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/portdetail.php?qqq=" + rows[i].porlid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("moportliblock1");
    div_clone2.style.backgroundImage = "url('" + "/list_image/portp" + rows[i].porlid + "/mobile/mot" + garoBoo5 + rows[i].porlid + ".jpg" + "')";
    a_clone.appendChild(div_clone2);
    div_clone.appendChild(a_clone);

    //mobile-2
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/portdetail.php?qqq=" + rows[i].porlid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("moportliblock2");

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("porporporimg");
    img_clone.src = "/list_svg/porporpor/mobile/motitle" + garoBoo3 + "/moportivec" + garoBoo4 + rows[i].porlid + ".svg";
    div_clone2.appendChild(img_clone);

    a_clone.appendChild(div_clone2);
    div_clone.appendChild(a_clone);

    //mobile-end
    dom1.appendChild(div_clone);
  }

  return { desktopDom_portfolio: dom0, mobileDom_portfolio: dom1 }
}

GeneralJs.reviewRender = function (rows, garo) {
  let dom0 = document.createDocumentFragment();
  let dom1 = document.createDocumentFragment();
  let div_clone, div_clone2, div_clone3, div_clone4, img_clone, a_clone;
  let garoBoo0, garoBoo1, garoBoo2, garoBoo3;

  for (let i = 0; i < rows.length; i++) {
    if (garo.desktop.indexOf(i) !== -1) {
      garoBoo0 = "garo";
      garoBoo1 = "3";
    } else {
      garoBoo0 = "sero";
      garoBoo1 = "1";
    }
    if (garo.mobile.indexOf(i) !== -1) {
      garoBoo2 = "garo";
      garoBoo3 = "3";
    } else {
      garoBoo2 = "sero";
      garoBoo3 = "1";
    }

    //desktop
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.id = "rblockid" + String(i);
    div_clone.classList.add("reviliblock");
    div_clone.classList.add("p" + garoBoo0);

    //desktop-1
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/revdetail.php?qqq=" + rows[i].revid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("reviliblock" + garoBoo1);
    div_clone2.style.backgroundImage = "url('" + "/list_image/portp" + rows[i].porlid + "/t" + rows[i].review_photo + rows[i].porlid + ".jpg" + "')";

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.classList.add("porporporimg");
    div_clone3.classList.add("piho");

    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    div_clone4.classList.add("porhoverblack");
    div_clone3.appendChild(div_clone4);

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("porporporimg");
    img_clone.src = "/list_svg/revrevrev/revhovector/revhovec" + rows[i].revid + ".svg";
    div_clone3.appendChild(img_clone);
    div_clone2.appendChild(div_clone3);
    a_clone.appendChild(div_clone2);

    div_clone.appendChild(a_clone);

    //desktop-2
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/revdetail.php?qqq=" + rows[i].revid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("reviliblock2");

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("revrevrevimgetc1");
    img_clone.src = "/list_svg/revrevrev/rereetc1.svg";
    div_clone2.appendChild(img_clone);

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("revrevrevimgetc2");
    img_clone.src = "/list_svg/revrevrev/rereetc2.svg";
    div_clone2.appendChild(img_clone);

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("revrevrevimgti");
    img_clone.src = "/list_svg/revrevrev/revivector/revtivec" + rows[i].revid + ".svg";
    div_clone2.appendChild(img_clone);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.classList.add("porporporimg");
    div_clone2.appendChild(div_clone3);

    a_clone.appendChild(div_clone2);

    div_clone.appendChild(a_clone);

    //desktop-end
    dom0.appendChild(div_clone);

    //mobile
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("moreviliblock");
    div_clone.classList.add("mop" + garoBoo2);

    //mobile-1
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/revdetail.php?qqq=" + rows[i].revid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("moreviliblock" + garoBoo3);
    div_clone2.style.backgroundImage = "url('" + "/list_image/portp" + rows[i].porlid + "/mobile/mot" + rows[i].review_photo + rows[i].porlid + ".jpg" + "')";
    a_clone.appendChild(div_clone2);
    div_clone.appendChild(a_clone);

    //mobile-2
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = "/revdetail.php?qqq=" + rows[i].revid;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("moreviliblock2");

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("morevrevrevimgetc1");
    img_clone.src = "/list_svg/revrevrev/rereetc1.svg";
    div_clone2.appendChild(img_clone);

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("morevrevrevimgetc2");
    img_clone.src = "/list_svg/revrevrev/rereetc2.svg";
    div_clone2.appendChild(img_clone);

    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.classList.add("morevrevrevimg");
    img_clone.src = "/list_svg/revrevrev/morevivector/morevtivec" + rows[i].revid + ".svg";
    div_clone2.appendChild(img_clone);

    a_clone.appendChild(div_clone2);
    div_clone.appendChild(a_clone);

    //mobile-end
    dom1.appendChild(div_clone);
  }

  return { desktopDom_review: dom0, mobileDom_review: dom1 }
}

GeneralJs.garoArrFunc = function (rowsLength, garoBoo, methodBoo) {
  let i = 0;
  let garoarray = {
    desktop: [],
    mobile: [],
  }
  if (!garoBoo) {
    if (methodBoo === "portfolio") {
      garoarray.desktop = [ 0 ];
      garoarray.mobile = [ 9999 ];
    } else {
      garoarray.desktop = [ 9999 ];
      garoarray.mobile = [ 9999 ];
    }
  } else {
    if (methodBoo === "portfolio") {
      garoarray.desktop = [];
      i = 0;
      while ((5 * i) < rowsLength) {
        garoarray.desktop.push((5 * i) + 0);
        garoarray.desktop.push((5 * (i + 1)) + 4);
        i = i + 2;
      }
      garoarray.mobile = [];
      i = 0;
      while ((4 * i) < rowsLength) {
        garoarray.mobile.push((4 * i) + 4);
        garoarray.mobile.push((4 * (i + 1)) + 3);
        i = i + 2;
      }
    } else {
      garoarray.desktop = [ 0, 9, 19 ];
      garoarray.mobile = [ 0, 11 ];
    }
  }
  return garoarray;
}

GeneralJs.getContents = async function (obj) {
  const instance = this;
  let garo, garoBoo;
  let rowsRAW, rows;

  try {
    garoBoo = false;
    if (obj.garo !== undefined) {
      garoBoo = obj.garo;
    }

    if (/por/gi.test(obj.collection)) {
      obj.columns = [ "porlid", "photodae_s", "photodae_d" ];
    } else if (/rev/gi.test(obj.collection)) {
      obj.columns = [ "revid", "porlid", "review_photo" ];
    } else {
      throw new Error("contents error");
    }

    rowsRAW = await GeneralJs.ajaxPromise(GeneralJs.objectToQuery(obj), "/engine/ContentsLoop.php");
    rows = JSON.parse(rowsRAW);

    if (/por/gi.test(obj.collection)) {
      garo = GeneralJs.garoArrFunc(rows.length, garoBoo, "portfolio");
      return GeneralJs.portfolioRender(rows, garo);
    } else if (/rev/gi.test(obj.collection)) {
      garo = GeneralJs.garoArrFunc(rows.length, garoBoo, "review");
      return GeneralJs.reviewRender(rows, garo);
    }
  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }
}
