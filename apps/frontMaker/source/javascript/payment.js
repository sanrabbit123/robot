const PaymentJs = function () {
  this.mother = new GeneralJs();
  this.below = {};
}

PaymentJs.sourceLink = "/list_image/payment";

PaymentJs.prototype.initialDom = function (type) {
  var div_clone, div_clone2;
  var grand = {
    desktop: document.getElementById("totalcontents"),
    mobile: document.getElementById("mototalcontents"),
  }
  var list = {
    contract: {
      desktop: [
        {
          id: "paymentback",
          source: [ "/contract/back.jpg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + source[0] +  "')";
            return div_clone;
          },
        },
        {
          id: "paymentgrayback",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var getObj = GeneralJs.returnGet();
            if (getObj.card !== "true") { div_clone.style.height = "1360px"; }
            else { div_clone.style.height = "1500px"; }
            return div_clone;
          },
        },
        {
          id: "paymenttitle",
          source: [ "/contract/title.svg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = PaymentJs.sourceLink + source[0];
            div_clone.appendChild(img_clone);
            return div_clone;
          },
        },
        {
          id: "paymentbase",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.id = "paymentbox";
            div_clone.appendChild(div_clone2);
            return div_clone;
          },
        },
      ],
      mobile: [
        {
          id: "mopaymentback",
          source: [ "/contract/moback.jpg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + source[0] +  "')";
            return div_clone;
          },
        },
        {
          id: "mopaymenttitle",
          source: [ "/contract/motitle.svg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = PaymentJs.sourceLink + source[0];
            div_clone.appendChild(img_clone);
            return div_clone;
          },
        },
        {
          id: "mopaymentbox",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            return div_clone;
          },
        },
      ],
    },
    left: {
      desktop: [
        {
          id: "paymentback",
          source: [ "/left/back.jpg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + source[0] +  "')";
            return div_clone;
          },
        },
        {
          id: "paymentgrayback",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var getObj = GeneralJs.returnGet();
            if (getObj.card !== "true") { div_clone.style.height = "1808px"; }
            else { div_clone.style.height = "1945px"; }
            return div_clone;
          },
        },
        {
          id: "paymenttitle",
          source: [ "/left/title.svg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = PaymentJs.sourceLink + source[0];
            div_clone.appendChild(img_clone);
            return div_clone;
          },
        },
        {
          id: "paymentbase",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.id = "paymentbox";
            div_clone.appendChild(div_clone2);
            return div_clone;
          },
        },
      ],
      mobile: [
        {
          id: "mopaymentback",
          source: [ "/left/moback.jpg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + source[0] +  "')";
            return div_clone;
          },
        },
        {
          id: "mopaymenttitle",
          source: [ "/left/motitle.svg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = PaymentJs.sourceLink + source[0];
            div_clone.appendChild(img_clone);
            return div_clone;
          },
        },
        {
          id: "mopaymentbox",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            return div_clone;
          },
        },
      ],
    },
    channel: {
      desktop: [
        {
          id: "paymentback",
          source: [ "/thankyou/image/back.jpg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + source[0] +  "')";
            return div_clone;
          },
        },
        {
          id: "paymentgrayback",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            div_clone.style.height = "1585px";
            return div_clone;
          },
        },
        {
          id: "paymenttitle",
          source: [ "/channel/title.svg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = PaymentJs.sourceLink + source[0];
            div_clone.appendChild(img_clone);
            return div_clone;
          },
        },
        {
          id: "paymentbase",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.id = "paymentbox";
            div_clone.appendChild(div_clone2);
            return div_clone;
          },
        },
      ],
      mobile: [
        {
          id: "mopaymentback",
          source: [ "/thankyou/mobile/image/moback.jpg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + source[0] +  "')";
            return div_clone;
          },
        },
        {
          id: "mopaymenttitle",
          source: [ "/channel/motitle.svg", ],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = PaymentJs.sourceLink + source[0];
            div_clone.appendChild(img_clone);
            return div_clone;
          },
        },
        {
          id: "mopaymentbox",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            return div_clone;
          },
        },
      ],
    },
    terms: {
      desktop: [
        {
          id: "termsmenu",
          source: [],
          callback: function (id, source) {
            var h2 = document.createElement("H2");
            var div_clone, div_clone2, h2_clone;
            var list = [
              '개인정보 처리 방침&nbsp;&nbsp;&nbsp;&nbsp;<b>|</b>&nbsp;&nbsp;&nbsp;&nbsp;',
              '이용약관&nbsp;&nbsp;&nbsp;&nbsp;<b>|</b>&nbsp;&nbsp;&nbsp;&nbsp;',
              'FAQ',
            ];
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            h2 = h2.cloneNode(true);
            h2.classList.add("termsh2");
            for (var i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("termslabel");
              div_clone2.insertAdjacentHTML("beforeend", list[i]);
              div_clone2.addEventListener("click", PaymentJs.termsEvent("desktop", i));
              h2.appendChild(div_clone2);
            }
            div_clone.appendChild(h2);
            return div_clone;
          },
        },
        {
          id: "terms0",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var obj = GeneralJs.returnGet();
            div_clone.style.display = "none";
            if (obj.qqq === undefined || obj.qqq === "terms") {
              div_clone.style.display = "";
            }
            var temp = PaymentJs.termsText();
            div_clone.insertAdjacentHTML("beforeend", temp[0]);
            return div_clone;
          },
        },
        {
          id: "terms1",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var obj = GeneralJs.returnGet();
            div_clone.style.display = "none";
            if (obj.qqq === "policy") {
              div_clone.style.display = "";
            }
            var temp = PaymentJs.termsText();
            div_clone.insertAdjacentHTML("beforeend", temp[1]);
            return div_clone;
          },
        },
        {
          id: "terms2",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var obj = GeneralJs.returnGet();
            div_clone.style.display = "none";
            if (obj.qqq === "faq") {
              div_clone.style.display = "";
            }
            var temp = PaymentJs.termsText();
            div_clone.insertAdjacentHTML("beforeend", temp[2]);
            return div_clone;
          },
        },
      ],
      mobile: [
        {
          id: "motermsmenu",
          source: [],
          callback: function (id, source) {
            var h2 = document.createElement("H2");
            var div_clone, div_clone2, h2_clone;
            var list = [
              '개인정보 처리 방침&nbsp;&nbsp;&nbsp;&nbsp;<b>|</b>&nbsp;&nbsp;&nbsp;&nbsp;',
              '이용약관&nbsp;&nbsp;&nbsp;&nbsp;<b>|</b>&nbsp;&nbsp;&nbsp;&nbsp;',
              'FAQ',
            ];
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            h2 = h2.cloneNode(true);
            h2.classList.add("termsh2");
            for (var i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("termslabel");
              div_clone2.insertAdjacentHTML("beforeend", list[i]);
              div_clone2.addEventListener("click", PaymentJs.termsEvent("mobile", i));
              h2.appendChild(div_clone2);
            }
            div_clone.appendChild(h2);
            return div_clone;
          },
        },
        {
          id: "moterms0",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var obj = GeneralJs.returnGet();
            div_clone.style.display = "none";
            if (obj.qqq === undefined || obj.qqq === "terms") {
              div_clone.style.display = "";
            }
            var temp = PaymentJs.termsText();
            div_clone.insertAdjacentHTML("beforeend", temp[0]);
            return div_clone;
          },
        },
        {
          id: "moterms1",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var obj = GeneralJs.returnGet();
            div_clone.style.display = "none";
            if (obj.qqq === "policy") {
              div_clone.style.display = "";
            }
            var temp = PaymentJs.termsText();
            div_clone.insertAdjacentHTML("beforeend", temp[1]);
            return div_clone;
          },
        },
        {
          id: "moterms2",
          source: [],
          callback: function (id, source) {
            var div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = id;
            var obj = GeneralJs.returnGet();
            div_clone.style.display = "none";
            if (obj.qqq === "faq") {
              div_clone.style.display = "";
            }
            var temp = PaymentJs.termsText();
            div_clone.insertAdjacentHTML("beforeend", temp[2]);
            return div_clone;
          },
        },
      ],
    },
  }
  var boo = Object.keys(list[type]);
  var temp;
  for (var i = 0; i < boo.length; i++) {
    for (var j = 0; j < list[type][boo[i]].length; j++) {
      temp = (list[type][boo[i]][j]["callback"])(list[type][boo[i]][j]["id"], list[type][boo[i]][j]["source"]);
      grand[boo[i]].appendChild(temp);
    }
  }
}

PaymentJs.prototype.blocks = {
  contract: [
    {
      name: "contract0",
      height: { desktop: "430px", mobile: "143vw", },
      callback: {
        desktop: function (dom) {
          return dom;
        },
        mobile: function (dom) {
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/contract/a1.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "140px";
            div_clone.style.left = "0px";
            div_clone.style.width = "16.6%";
            div_clone.style.height = "70px";
            div_clone.style.borderBottomLeftRadius = "15px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(193deg, rgba(242,242,242,1) 0%, rgba(224,224,224,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "140px";
            div_clone.style.left = "17.4%";
            div_clone.style.width = "82.6%";
            div_clone.style.height = "70px";
            div_clone.style.borderBottomRightRadius = "15px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "99.9%";
            div_clone.style.height = "334px";
            dom.appendChild(div_clone);
            return dom;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/contract/moa1.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "43.1vw";
            div_clone.style.left = "0vw";
            div_clone.style.width = "19.8%";
            div_clone.style.height = "17.3vw";
            div_clone.style.borderBottomLeftRadius = "3vw";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(193deg, rgba(242,242,242,1) 0%, rgba(224,224,224,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "43.1vw";
            div_clone.style.left = "21.2%";
            div_clone.style.width = "78.8%";
            div_clone.style.height = "17.3vw";
            div_clone.style.borderBottomRightRadius = "3vw";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "100%";
            div_clone.style.height = "100%";
            dom.appendChild(div_clone);
            return dom;
          }
        },
      ],
    },
    {
      name: "contract1",
      height: { desktop: "405px", mobile: "154.7vw", },
      callback: {
        desktop: function (dom) {
          dom.style.borderBottom = "0px solid";
          return dom;
        },
        mobile: function (dom) {
          dom.style.borderBottom = "0px solid";
          dom.style.background = "#f7f7f7";
          dom.style.padding = "13.6vw 6.1%";
          var getObj = GeneralJs.returnGet();
          if (getObj.card !== "true") { dom.style.marginBottom = "-6.1vw"; }
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/contract/a3.svg", "/contract/a3.png", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "99.9%";
            div_clone.style.height = "365px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.position = "absolute";
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[1] +  "')";
            div_clone.style.width = "99.9%";
            div_clone.style.height = "365px";
            dom.appendChild(div_clone);

            return dom;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/contract/moa3.svg", "/contract/moa3.png", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "100%";
            div_clone.style.height = "100%";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.position = "absolute";
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[1] +  "')";
            div_clone.style.height = "75vw";
            div_clone.style.width = "70vw";
            div_clone.style.left = "15vw";
            div_clone.style.top = "64vw";

            dom.appendChild(div_clone);

            return dom;
          }
        },
      ],
    },
  ],
  left: [
    {
      name: "left0",
      height: { desktop: "430px", mobile: "121vw", },
      callback: {
        desktop: function (dom) {
          return dom;
        },
        mobile: function (dom) {
          dom.style.paddingTop = "0vw";
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/left/a2.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(193deg, rgba(242,242,242,1) 0%, rgba(224,224,224,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "140px";
            div_clone.style.left = "0px";
            div_clone.style.width = "16.6%";
            div_clone.style.height = "70px";
            div_clone.style.borderBottomLeftRadius = "15px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "140px";
            div_clone.style.left = "17.4%";
            div_clone.style.width = "82.6%";
            div_clone.style.height = "70px";
            div_clone.style.borderBottomRightRadius = "15px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "99.9%";
            div_clone.style.height = "334px";
            dom.appendChild(div_clone);
            return dom;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/left/moa2.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(193deg, rgba(242,242,242,1) 0%, rgba(224,224,224,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "43.1vw";
            div_clone.style.left = "0vw";
            div_clone.style.width = "19.8%";
            div_clone.style.height = "17.3vw";
            div_clone.style.borderBottomLeftRadius = "3vw";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "43.1vw";
            div_clone.style.left = "21.2%";
            div_clone.style.width = "78.8%";
            div_clone.style.height = "17.3vw";
            div_clone.style.borderBottomRightRadius = "3vw";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "100%";
            div_clone.style.height = "100%";
            dom.appendChild(div_clone);
            return dom;
          }
        },
      ],
    },
    {
      name: "left1",
      height: { desktop: "430px", mobile: "117.6vw", },
      callback: {
        desktop: function (dom) {
          return dom;
        },
        mobile: function (dom) {
          dom.style.background = "#f7f7f7";
          dom.style.padding = "13.6vw 6.1%";
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/left/a4.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "164px";
            div_clone.style.left = "0%";
            div_clone.style.width = "18.85%";
            div_clone.style.height = "70px";
            div_clone.style.borderBottomLeftRadius = "15px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "164px";
            div_clone.style.left = "21.9%";
            div_clone.style.width = "37.4%";
            div_clone.style.height = "70px";
            div_clone.style.opacity = "0.7";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "164px";
            div_clone.style.left = "62.5%";
            div_clone.style.width = "37.5%";
            div_clone.style.height = "70px";
            div_clone.style.opacity = "0.4";
            div_clone.style.borderBottomRightRadius = "15px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "99.9%";
            div_clone.style.height = "334px";
            dom.appendChild(div_clone);
            return dom;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/left/moa4.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "59.6vw";
            div_clone.style.left = "6.1%";
            div_clone.style.width = "20.5%";
            div_clone.style.height = "17.3vw";
            div_clone.style.borderBottomLeftRadius = "3vw";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "59.6vw";
            div_clone.style.left = "26.6%";
            div_clone.style.width = "34.3%";
            div_clone.style.height = "17.3vw";
            div_clone.style.opacity = "0.7";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "59.6vw";
            div_clone.style.left = "60.9%";
            div_clone.style.width = "32.8%";
            div_clone.style.height = "17.3vw";
            div_clone.style.opacity = "0.4";
            div_clone.style.borderBottomRightRadius = "3vw";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "100%";
            div_clone.style.height = "100%";
            dom.appendChild(div_clone);
            return dom;
          }
        },
      ],
    },
    {
      name: "left2",
      height: { desktop: "334px", mobile: "126vw", },
      callback: {
        desktop: function (dom) {
          dom.style.marginBottom = "88px";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
        mobile: function (dom) {
          dom.style.marginBottom = "12.5vw";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/left/a5.svg", "/left/a5s.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "140px";
            div_clone.style.left = "0%";
            div_clone.style.width = "100%";
            div_clone.style.height = "70px";
            div_clone.style.borderBottomLeftRadius = "15px";
            div_clone.style.borderBottomRightRadius = "15px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "99.9%";
            div_clone.style.height = "334px";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[1] +  "')";
            div_clone.style.position = "absolute";
            div_clone.style.width = "99.9%";
            div_clone.style.height = "334px";
            dom.appendChild(div_clone);

            return dom;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/left/moa5.svg", ],
          },
          callback: function (needs) {
            var div_clone, div_clone2;
            var dom = document.createDocumentFragment();

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.style.background = "linear-gradient(190deg, rgba(89,175,137,0.91) 0%, rgba(0,155,106,1) 100%)";
            div_clone.style.position = "absolute";
            div_clone.style.top = "47.9vw";
            div_clone.style.left = "0%";
            div_clone.style.width = "100%";
            div_clone.style.height = "17.3vw";
            div_clone.style.borderBottomLeftRadius = "3vw";
            div_clone.style.borderBottomRightRadius = "3vw";
            dom.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("paymentblock_detail");
            div_clone.style.backgroundImage = "url('" + PaymentJs.sourceLink + needs.source[0] +  "')";
            div_clone.style.width = "100%";
            div_clone.style.height = "100%";
            dom.appendChild(div_clone);

            return dom;
          }
        },
      ],
    },
  ],
  channel: [
    {
      name: "channel0",
      height: { desktop: "auto", mobile: "auto", },
      callback: {
        desktop: function (dom) {
          dom.style.width = "86%";
          dom.style.paddingLeft = "7%";
          dom.style.marginBottom = "93px";
          dom.style.marginLeft = "0";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
        mobile: function (dom) {
          dom.style.width = "96%";
          dom.style.paddingLeft = "2%";
          dom.style.marginBottom = "6.5vw";
          dom.style.marginLeft = "0";
          dom.style.paddingTop = "2vw";
          dom.style.animation = "fadeup 0.6s ease forwards";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/thankyou/a1.svg", "/thankyou/a1.png", ],
          },
          callback: function (needs) {
            var h = document.createDocumentFragment();
            var div_clone, img_clone;
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("thankyou_block_title");
            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + needs.source[0] + "')";
            h.appendChild(div_clone);
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.classList.add("thankyou_block_image");
            // PaymentJs.sourceLink different point
            img_clone.src = "./list_image/consulting" + needs.source[1];
            h.appendChild(img_clone);
            return h;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/thankyou/mobile/a1.svg", "/thankyou/a1.png", ],
          },
          callback: function (needs) {
            var h = document.createDocumentFragment();
            var div_clone, img_clone;
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("mothankyou_block_title");

            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + needs.source[0] + "')";
            h.appendChild(div_clone);
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.classList.add("mothankyou_block_image");

            // PaymentJs.sourceLink different point
            img_clone.src = "./list_image/consulting" + needs.source[1];
            h.appendChild(img_clone);
            return h;
          }
        },
      ],
    },
    {
      name: "channel1",
      height: { desktop: "auto", mobile: "auto", },
      callback: {
        desktop: function (dom) {
          dom.style.width = "86%";
          dom.style.paddingLeft = "7%";
          dom.style.marginBottom = "93px";
          dom.style.marginLeft = "0";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
        mobile: function (dom) {
          dom.style.width = "96%";
          dom.style.paddingLeft = "2%";
          dom.style.paddingRight = "2%";
          dom.style.background = "#f7f7f7";
          dom.style.marginBottom = "10vw";
          dom.style.marginLeft = "0";
          dom.style.paddingTop = "14.6vw";
          dom.style.paddingBottom = "18vw";
          dom.style.animation = "fadeup 0.6s ease forwards";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/thankyou/a2.svg", "/thankyou/a3.svg", "/thankyou/image/seon1.jpg", "/thankyou/image/seon2.jpg", "/thankyou/image/seon3.jpg", "/thankyou/image/seon4.jpg", ],
          },
          callback: function (needs) {
            var h = document.createDocumentFragment();
            var div_clone, div_clone2;
            var list = [ needs.source[2], needs.source[3], needs.source[4], needs.source[5] ];

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("thankyou_block_title");
            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + needs.source[0] + "')";
            div_clone.style.height = "78px";
            h.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("thankyou_block_imagebox");
            div_clone.style.height = "300px";

            for (var i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("thankyou_block_imagebox_detail");
              // PaymentJs.sourceLink different point
              div_clone2.style.backgroundImage = "url('" + "./list_image/consulting" + list[i] + "')";
              if (i === list.length - 1) {
                div_clone2.style.marginRight = "0";
                div_clone2.style.backgroundSize = "100% auto";
              }
              div_clone.appendChild(div_clone2);
            }
            h.appendChild(div_clone);
            return h;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/thankyou/mobile/a2.svg", "/thankyou/mobile/image/moseon3.jpg", "/thankyou/mobile/image/moseon4.jpg", ],
          },
          callback: function (needs) {
            var h = document.createDocumentFragment();
            var div_clone, div_clone2;
            var list = [ needs.source[1], needs.source[2], ];

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("mothankyou_block_title");
            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + needs.source[0] + "')";
            h.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("mothankyou_block_imagebox");

            for (var i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("mothankyou_block_imagebox_detail");
              // PaymentJs.sourceLink different point
              div_clone2.style.backgroundImage = "url('" + "./list_image/consulting" + list[i] + "')";
              if (i === list.length - 1) {
                div_clone2.style.marginRight = "0";
              }
              div_clone.appendChild(div_clone2);
            }
            h.appendChild(div_clone);
            return h;
          }
        },
      ],
    },
    {
      name: "channel2",
      height: { desktop: "auto", mobile: "auto", },
      callback: {
        desktop: function (dom) {
          dom.style.width = "86%";
          dom.style.paddingLeft = "7%";
          dom.style.marginBottom = "93px";
          dom.style.marginLeft = "0";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
        mobile: function (dom) {
          dom.style.width = "96%";
          dom.style.paddingLeft = "2%";
          dom.style.marginBottom = "10vw";
          dom.style.marginLeft = "0";
          dom.style.paddingTop = "4vw";
          dom.style.animation = "fadeup 0.6s ease forwards";
          dom.style.borderBottom = "0px solid";
          return dom;
        },
      },
      desktop: [
        {
          needs: {
            source: [ "/thankyou/a4.svg", "/thankyou/a5.svg", "/thankyou/image/beforeal1.jpg", "/thankyou/image/beforeal2.jpg", "/thankyou/image/beforeal3.jpg", "/thankyou/image/beforeal4.jpg", ],
          },
          callback: function (needs) {
            var h = document.createDocumentFragment();
            var div_clone, div_clone2;
            var list = [ needs.source[2], needs.source[3], needs.source[4], needs.source[5] ];

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("thankyou_block_title");
            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + needs.source[0] + "')";
            div_clone.style.height = "78px";
            h.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("thankyou_block_imagebox");
            div_clone.style.height = "150px";

            for (var i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("thankyou_block_imagebox_detail");
              // PaymentJs.sourceLink different point
              div_clone2.style.backgroundImage = "url('" + "./list_image/consulting" + list[i] + "')";
              div_clone2.style.backgroundSize = "102% 102%";
              div_clone2.style.backgroundPosition = "50% 50%";
              if (i === list.length - 1) {
                div_clone2.style.marginRight = "0";
              }
              div_clone.appendChild(div_clone2);
            }
            h.appendChild(div_clone);
            return h;
          }
        },
      ],
      mobile: [
        {
          needs: {
            source: [ "/thankyou/mobile/a3.svg", "/thankyou/mobile/image/mohyeonjang.jpg", ],
          },
          callback: function (needs) {
            var h = document.createDocumentFragment();
            var div_clone, div_clone2;
            var list = [ needs.source[1], ];

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("mothankyou_block_title");
            // PaymentJs.sourceLink different point
            div_clone.style.backgroundImage = "url('" + "./list_image/consulting" + needs.source[0] + "')";
            div_clone.style.height = "29vw";
            h.appendChild(div_clone);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("mothankyou_block_imagebox");
            div_clone.style.marginBottom = "15vw";
            for (var i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("mothankyou_block_imagebox_detail");
              // PaymentJs.sourceLink different point
              div_clone2.style.backgroundImage = "url('" + "./list_image/consulting" + list[i] + "')";
              div_clone2.style.backgroundSize = "102% 102%";
              div_clone2.style.backgroundPosition = "50% 50%";
              div_clone2.style.width = "82%";
              div_clone2.style.height = "42vw";
              div_clone2.style.marginTop = "8.2vw";
              if (i === list.length - 1) {
                div_clone2.style.marginRight = "0";
              }
              div_clone.appendChild(div_clone2);
            }
            h.appendChild(div_clone);
            return h;
          }
        },
      ],
    },
  ],
  terms: [],
}

PaymentJs.prototype.baseMaker = function (type) {
  var i, j, k, z, temp, div_clone, div_clone2, div_clone3, div_clone4, img_clone, mo, toggle, getObj;
  var temp_string = '';
  var flatform = [ "desktop", "mobile" ];
  if (document.getElementById("paymentbox") === null || document.getElementById("mopaymentbox") === null) { return "error"; }
  var mother = document.getElementById("paymentbox");
  var father = document.getElementById("mopaymentbox");

  for (z = 0; z < flatform.length; z++) {
    for (i = 0; i < this.blocks[type].length; i++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      temp_string = (flatform[z] === "desktop" ? "" : "mo") + "paymentblock";
      div_clone.classList.add(temp_string);
      div_clone.id = (flatform[z] === "desktop" ? "" : "mo") + "payment_" + this.blocks[type][i].name;
      div_clone.style.height = this.blocks[type][i].height[flatform[z]];
      div_clone = (this.blocks[type][i].callback[flatform[z]])(div_clone);
      //desktop
      if (flatform[z] === "desktop") {
        for (k = 0; k < this.blocks[type][i].desktop.length; k++) {
          temp = document.createDocumentFragment();
          div_clone2 = this.blocks[type][i].desktop[k].callback(this.blocks[type][i].desktop[k].needs);
          temp.appendChild(div_clone2);
          div_clone.appendChild(temp);
        }
        mother.appendChild(div_clone);
        mo = '';
        toggle = true;
      //mobile
      } else {
        temp = document.createDocumentFragment();
        for (k = 0; k < this.blocks[type][i].mobile.length; k++) {
          temp = document.createDocumentFragment();
          div_clone2 = this.blocks[type][i].mobile[k].callback(this.blocks[type][i].mobile[k].needs);
          temp.appendChild(div_clone2);
          div_clone.appendChild(temp);
        }
        father.appendChild(div_clone);
        mo = 'mo';
        toggle = false;
      }
    }

    if (this.blocks[type].length !== 0) {
      //button
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add(mo + "below_box_submit_box");
      getObj = GeneralJs.returnGet();
      if (getObj.card !== "true") { div_clone.style.display = "none"; }
      if (getObj.type === "channel") { div_clone.style.display = ""; }
      div_clone.style.position = "relative";
      div_clone.style.height = toggle ? "60px" : "12.5vw";
      div_clone.style.marginTop = toggle ? "-10px" : "0vw";
      div_clone.style.marginBottom = toggle ? "95px" : "11vw";
      img_clone = GeneralJs.nodes.img.cloneNode(true);
      if (type === "channel") {
        img_clone.src = "./list_image/consulting/whitemain/a3.svg";
        div_clone.addEventListener("click", this.eventMaker(type, (toggle ? "desktop" : "mobile")));
      } else {
        img_clone.src = PaymentJs.sourceLink + "/whitemain/a1.svg";
        div_clone.addEventListener("click", this.eventMaker(type, (toggle ? "desktop" : "mobile")));
      }
      img_clone.classList.add(mo + "below_box_submit");
      img_clone.style.marginLeft = toggle ? "-43px" : "-8.4vw";
      div_clone.appendChild(img_clone);
      if (flatform[z] === "desktop") {
        mother.appendChild(div_clone);
      } else {
        father.appendChild(div_clone);
      }
    }
  }
}

PaymentJs.prototype.launching = async function () {
  var getObj = GeneralJs.returnGet();
  if (getObj.type === undefined) {
    getObj.type = "contract";
  }
  window.location.href = "https://home-liaison.com";
  this.initialDom(getObj.type);
  this.baseMaker(getObj.type);
}

PaymentJs.prototype.eventMaker = function (type, flatform) {
  if (type === "channel") {
    return function (e) {
      window.location.href = "http://pf.kakao.com/_vxixkjxl/chat";
    }
  } else {
    var list = {}
    if (flatform === "desktop") {
      list.id = "paymentwhite";
      list.mo = '';
      list.source = [
        (PaymentJs.sourceLink + "/popup/a1.svg"),
        (PaymentJs.sourceLink + "/popup/a2.svg"),
        // PaymentJs.sourceLink position
        ("./list_image/consulting" + "/titlesub/a1.svg"),
        // PaymentJs.sourceLink position
        ("./list_image/consulting" + "/titlesub/a2.svg"),
        (PaymentJs.sourceLink + "/popup/a3.svg"),
        (PaymentJs.sourceLink + "/popup/b3.svg"),
        (PaymentJs.sourceLink + "/whitemain/a1.svg"),
      ];
      list.toggle = true;
    } else if (flatform === "mobile") {
      list.id = "mopaymentwhite";
      list.mo = "mo";
      list.source = [
        (PaymentJs.sourceLink + "/popup/moa1.svg"),
        (PaymentJs.sourceLink + "/popup/moa2.svg"),
        // PaymentJs.sourceLink position
        ("./list_image/consulting" + "/titlesub/a1.svg"),
        // PaymentJs.sourceLink position
        ("./list_image/consulting" + "/titlesub/a2.svg"),
        (PaymentJs.sourceLink + "/popup/a3.svg"),
        (PaymentJs.sourceLink + "/popup/b3.svg"),
        (PaymentJs.sourceLink + "/whitemain/a1.svg"),
      ];
      list.toggle = false;
    }
    return function (e) {
      if (e.target.classList.contains(list.mo + "below_box_submit_box") && !e.target.classList.contains("white")) { e.target.style.background = "#dddddd"; }
      else if (e.target.parentElement.classList.contains(list.mo + "below_box_submit_box") && !e.target.classList.contains("white")) { e.target.parentElement.style.background = "#dddddd"; }
      if (e.target.id !== "cancel_back" && e.target.id !== list.id && !e.target.classList.contains("white")) {
        var div_clone, div_clone2, div_clone3, div_clone4, input_clone, img_clone;
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("white");
        div_clone.id = "cancel_back";
        this.appendChild(div_clone);
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("white");
        div_clone.id = list.id;

        //description
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add(list.mo + "paymentwhitetitle");
        div_clone2.classList.add("white");

        //title
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add(list.mo + "paymentwhitediv");
        div_clone3.classList.add("white");
        div_clone3.style.backgroundImage = "url('" + list.source[0] + "')";
        div_clone3.style.backgroundSize = "auto 99%";
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "45px" : "5vw";
        div_clone3.style.left = list.toggle ? "40px" : "0vw";
        div_clone3.style.width = list.toggle ? "129px" : "100%";
        div_clone3.style.height = list.toggle ? "84px" : "10vw";
        div_clone2.appendChild(div_clone3);

        //contents
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add(list.mo + "paymentwhitediv");
        div_clone3.classList.add("white");
        div_clone3.style.backgroundImage = "url('" + list.source[1] + "')";
        div_clone3.style.backgroundSize = "auto 99%";
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "43.5px" : "20vw";
        div_clone3.style.left = list.toggle ? "300px" : "0vw";
        div_clone3.style.width = list.toggle ? "480px" : "100%";
        div_clone3.style.height = list.toggle ? "83px" : "20vw";
        div_clone2.appendChild(div_clone3);

        //end
        div_clone.appendChild(div_clone2);

        //----------------------------------------------------------------------

        //inputs
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add(list.mo + "paymentwhiteinputbox");
        div_clone2.classList.add("white");

        //name
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add(list.mo + "paymentwhitediv");
        div_clone3.classList.add("white");
        div_clone3.style.backgroundImage = "url('" + list.source[2] + "')";
        div_clone3.style.backgroundSize = "98% 95%";
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "4px" : "0vw";
        div_clone3.style.left = list.toggle ? "41px" : "2.4vw";
        div_clone3.style.width = list.toggle ? "45px" : "13vw";
        div_clone3.style.height = list.toggle ? "17px" : "4.3vw";
        div_clone2.appendChild(div_clone3);

        //name input
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add(list.mo + "paymentwhiteinput");
        div_clone3.classList.add("white");
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add(list.mo + "paymentwhiteinput_text");
        input_clone.classList.add("white");
        input_clone.setAttribute("placeholder", "성함");
        input_clone.setAttribute("type", "text");
        input_clone.addEventListener("keyup", function (e) {
          this.value = this.value.replace(/[\*\!\?\~\^\:\/\@\%\&\+\<\>\;\=\#\$\[\]\\\|\-\(\)\`\'\"\{\}]/g, '');
        });
        div_clone3.appendChild(input_clone);
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "-2px" : "-2vw";
        div_clone3.style.left = list.toggle ? "100px" : "23vw";
        div_clone3.style.width = list.toggle ? "130px" : "54vw";
        div_clone3.style.height = list.toggle ? "31px" : "8.2vw";
        div_clone2.appendChild(div_clone3);

        //phone
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add(list.mo + "paymentwhitediv");
        div_clone3.classList.add("white");
        div_clone3.style.backgroundImage = "url('" + list.source[3] + "')";
        div_clone3.style.backgroundSize = "98% 95%";
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "4px" : "10.1vw";
        div_clone3.style.left = list.toggle ? "258px" : "2.4vw";
        div_clone3.style.width = list.toggle ? "59px" : "15vw";
        div_clone3.style.height = list.toggle ? "17px" : "4.3vw";
        div_clone2.appendChild(div_clone3);

        //phone input
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add(list.mo + "paymentwhiteinput");
        div_clone3.classList.add("white");
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add(list.mo + "paymentwhiteinput_text");
        input_clone.classList.add("white");
        input_clone.setAttribute("placeholder", "010-0000-0000");
        input_clone.setAttribute("type", "text");
        input_clone.addEventListener("keyup", function (e) {
          this.value = GeneralJs.autoHypenPhone(this.value);
        });
        div_clone3.appendChild(input_clone);
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "-2px" : "8.4vw";
        div_clone3.style.left = list.toggle ? "333px" : "23vw";
        div_clone3.style.width = list.toggle ? "160px" : "54vw";
        div_clone3.style.height = list.toggle ? "31px" : "8.2vw";
        div_clone2.appendChild(div_clone3);

        //button
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add("white");
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add(list.mo + "paymentwhiteinput_img_check");
        input_clone.classList.add("white");
        input_clone.style.display = "none";
        input_clone.setAttribute("type", "checkbox");
        input_clone.checked = true;
        div_clone3.appendChild(input_clone);
        img_clone = GeneralJs.nodes.img.cloneNode(true);
        img_clone.classList.add(list.mo + "paymentwhiteinput_img");
        img_clone.classList.add("white");
        img_clone.style.opacity = "1";
        img_clone.src = list.source[4];
        div_clone3.appendChild(img_clone);
        img_clone = GeneralJs.nodes.img.cloneNode(true);
        img_clone.classList.add(list.mo + "paymentwhiteinput_img");
        img_clone.classList.add("white");
        img_clone.style.backgroundColor = "white";
        img_clone.src = list.source[5];
        img_clone.addEventListener("click", function (e) {
          if (input_clone.checked) {
            input_clone.checked = false;
          } else {
            input_clone.checked = true;
          }
        });
        div_clone3.appendChild(img_clone);
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "6.5px" : "38.5vw";
        div_clone3.style.right = list.toggle ? "42px" : "3.05vw";
        div_clone3.style.width = list.toggle ? "192px" : "50vw";
        div_clone3.style.height = list.toggle ? "26px" : "5vw";
        div_clone2.appendChild(div_clone3);

        //policy
        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add(list.mo + "paymentwhiteinput");
        div_clone3.classList.add("white");
        div_clone4 = GeneralJs.nodes.div.cloneNode(true);
        div_clone4.classList.add(list.mo + "paymentwhiteinput_policy");
        div_clone4.classList.add("white");
        div_clone4.insertAdjacentHTML("beforeend", PaymentJs.policy());
        div_clone3.appendChild(div_clone4);
        div_clone3.style.position = "absolute";
        div_clone3.style.top = list.toggle ? "47px" : "20vw";
        div_clone3.style.left = list.toggle ? "41px" : "3vw";
        div_clone3.style.width = list.toggle ? "751px" : "74.05vw";
        div_clone3.style.height = list.toggle ? "188px" : "16vw";
        div_clone2.appendChild(div_clone3);

        //end
        div_clone.appendChild(div_clone2);

        //button
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add(list.mo + "below_box_submit_box");
        div_clone2.classList.add("white");
        div_clone2.style.position = "relative";
        div_clone2.style.height = list.toggle ? "60px" : "11vw";
        div_clone2.style.marginTop = list.toggle ? "-21px" : "-7vw";
        div_clone2.style.marginBottom = list.toggle ? "44px" : "5.1vw";
        img_clone = GeneralJs.nodes.img.cloneNode(true);
        img_clone.src = list.source[6];
        div_clone2.addEventListener("click", function (e) {
          let inputs = document.querySelectorAll("." + list.mo + "paymentwhiteinput");
          let target = {}
          target.buyer_name = inputs[0].querySelector("input").value;
          target.buyer_tel = inputs[1].querySelector("input").value;
          let obj = GeneralJs.returnGet();
          if (obj.type === undefined || obj.type === "contract") {
            target.name = "홈리에종 계약금";
            target.amount = "330000";
          } else {
            target.name = "홈리에종 잔금";
            target.amount = "";
          }
          let query = "pretext=";
          query += target.buyer_name.replace(/[\&\=\'\(\)\<\>\;]/g, '');
          query += "&cellphone=";
          query += target.buyer_tel.replace(/[\&\=\'\(\)\<\>\;]/g, '');

          if (obj.type === undefined || obj.type === "contract") {

            (function () {
              let IMP = window.IMP;
              let result = "330000";
              let title = "홈리에종 계약금"
              IMP.init("imp71921105");
              IMP.request_pay({
                  merchant_uid : 'merchant_' + new Date().getTime(),
                  name : title,
                  amount : result,
                  buyer_email : 'admin@home-liaison.com',
                  buyer_name : target.buyer_name,
                  buyer_tel : target.buyer_tel,
                }, function(rsp) {
                  if ( rsp.success ) {
                    var msg = '결제가 완료되었습니다.';
                    msg += '고유ID : ' + rsp.imp_uid;
                    msg += '상점 거래ID : ' + rsp.merchant_uid;
                    msg += '결제 금액 : ' + rsp.paid_amount;
                    msg += '카드 승인번호 : ' + rsp.apply_num;
                    window.location.href='https://home-liaison.com/';
                  } else {
                    var msg = '결제에 실패하였습니다.';
                    msg += '에러내용 : ' + rsp.error_msg;
                  }
                });
            })();

          } else {

            GeneralJs.ajax(query, "https://home-liaison.co.kr:3000/card", function (data) {
              if (data === "error") {
                alert("성함과 연락처를 정확히 적어주세요!");
                document.querySelector("." + list.mo + "paymentwhiteinput > input").focus();
                return;
              } else {
                let IMP = window.IMP;
                let result = "330000";
                let title = "홈리에종 계약금";
                if (obj.type === "left") {
                  title = "홈리에종 잔금";
                  result = data;
                }
                IMP.init("imp71921105");
                IMP.request_pay({
                    merchant_uid : 'merchant_' + new Date().getTime(),
                    name : title,
                    amount : result,
                    buyer_email : 'admin@home-liaison.com',
                    buyer_name : target.buyer_name,
                    buyer_tel : target.buyer_tel,
                  }, function(rsp) {
                    if ( rsp.success ) {
                      var msg = '결제가 완료되었습니다.';
                      msg += '고유ID : ' + rsp.imp_uid;
                      msg += '상점 거래ID : ' + rsp.merchant_uid;
                      msg += '결제 금액 : ' + rsp.paid_amount;
                      msg += '카드 승인번호 : ' + rsp.apply_num;
                      window.location.href='https://home-liaison.com/';
                    } else {
                      var msg = '결제에 실패하였습니다.';
                      msg += '에러내용 : ' + rsp.error_msg;
                    }
                  });
              }
            });

          }
        });
        img_clone.classList.add(list.mo + "below_box_submit");
        img_clone.classList.add("white");
        img_clone.style.marginLeft = list.toggle ? "-42px" : "-8.3vw";
        if (!list.toggle) { img_clone.style.top = "3vw"; }
        div_clone2.appendChild(img_clone);

        //end
        div_clone.appendChild(div_clone2);

        //all end
        this.appendChild(div_clone);
        document.querySelector("." + list.mo + "paymentwhiteinput > input").focus();

      } else if (e.target.id === "cancel_back") {
        document.getElementById("cancel_back").parentNode.removeChild(document.getElementById("cancel_back"));
        document.getElementById(list.id).parentNode.removeChild(document.getElementById(list.id));
        document.querySelector("." + list.mo + "below_box_submit_box").style.background = "";
      }
    }
  }
}

PaymentJs.termsEvent = function (flatform, m) {
  var list = [];
  var title = "";
  var mo = (flatform === "desktop") ? "" : "mo";
  switch (m) {
    case 0:
      list = [ "block", "none", "none" ];
      title = "개인정보 처리 방침 | 홈리에종";
      break;
    case 1:
      list = [ "none", "block", "none" ];
      title = "이용 약관 | 홈리에종";
      break;
    case 2:
      list = [ "none", "none", "block" ];
      title = "FAQ | 홈리에종";
      break;
  }
  return function () {
    document.querySelector("title").textContent = title;
    document.getElementById(mo + "terms0").style.display = list[0];
    document.getElementById(mo + "terms1").style.display = list[1];
    document.getElementById(mo + "terms2").style.display = list[2];
  }
}

PaymentJs.termsText = function () {
  var arr = [];
  var temp_string = '';
  temp_string += '<h1 class="termsh1">개인정보 처리 방침</h1>';
  temp_string += '<div class="termsgreenbar termsgreenbara0"></div>';
  temp_string += '<h3 class="termsh3">제1조 총칙</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 개인정보라 함은 생존하고 있는 개인에 관한 정보로써 성명, 주민등록번호 및 영상 등을 통하여 개인을 알아볼 수 있는 정보(해당 정보만으로는 특정 개인은 알아볼 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 것을 포함한다)를 말합니다.<br>';
  temp_string += '② 개인정보 처리방침이란 회원의 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 홈리에종을 운영함에 있어 준수해야 할 지침을 의미합니다.<br>';
  temp_string += '③ 홈리에종은 ‘정보통신망 이용촉진 및 정보보호에 등에 관한 법률’과 ‘개인정보 보호법’ 및 관련 법령에 따라 개인정보 보호규정을 준수합니다.<br>';
  temp_string += '④ 홈리에종은 회원(디자이너, 구매자)의 동의를 기반으로 개인정보를 수집, 이용 및 제공하고 있으며 회원의 권리(개인정보 자기결정권)를 적극적으로 보장합니다.<br>';
  temp_string += '⑤ 개인정보 처리방침은 회원이 언제나 쉽게 열람할 수 있도록 홈리에종 웹사이트에 게시하며 개인정보 관련법령, 지침, 고시 또는 홈리에종의 서비스 정책의 변경에 따라 달라질 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제2조 개인정보의 수집항목 및 목적</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 모든 회원은 홈리에종이 제공하는 다양한 서비스를 이용할 수 있습니다. 홈리에종이 처리하고 있는 개인정보는 다음의 수집/이용 목적 이외의 용도로는 활용되지 않으며, 수집/이용목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등의 필요한 조치를 이행합니다.<br>';
  temp_string += '② 회원의 인권을 침해할 우려가 있는 민감한 정보(인증, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는 수집하지 않으며, 만약 법령에서 정한 의무가 따라 불가피하게 수집하는 경우에는 반드시 회원에게 사전동의를 받습니다.<br>';
  temp_string += '③ 홈리에종은 다음과 같이 회원의 개인정보를 수집합니다.<br>';
  temp_string += '④ 회원 가입시, 문의사항 작성시 : User name, E-mail, 비밀번호 이용자 식별을 통한 이용계약 이행 및 회원 상호간 계약체결을 위한 지원(문의사항에 대한 답변, 계약이행을 위한 연락, 구매자와 디자이너간 계약체결 지원, 회원간 정보 안내 등)<br>';
  temp_string += '⑤ 구매자 결제진행시 : 전화번호, 주소, 주거공간 특성 관련 정보(주거유형, 공간이미지, 공간면적, 주거공간 구성 등)<br>';
  temp_string += '⑥ 디자이너 신청시 : 회사명, 사업자등록번호, 대표자이름, 개업일, 주소, 전화번호, 휴대전화번호, E-mail, Fax, 은행명, 예금주명, 계좌번호 등 디자이너 식별, 서비스 개설/제공, 각종 알림, 정산 등<br>';
  temp_string += '⑦ 자동수집정보 : 기기정보, 로그정보, 위치정보, 애플리케이션번호, 로컬저장소 등 시스템 운영 관리<br>';
  temp_string += '⑧ 개인정보의 이용목적<br>';
  temp_string += '⑨ 회원관리 : 회원제 서비스 제공에 따른 개인식별, 가입의사 확인, 이용약관 위반 회원에 대한 이용제한 조치, 가입 및 가입횟수 제한, 서비스 부정 이용 제재, 고충 처리 및 분쟁 조정을 위한 기록 보존, 고지사항 전달, 회원탈퇴 의사의 확인 등<br>';
  temp_string += '⑩ 중개서비스 등 이용약관에 따른 서비스 제공(광고 포함) 및 서비스 개선 : 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등<br>';
  temp_string += '⑪ 신규 서비스 개발 및 마케팅 광고에의 활용 : 신규 서비스 개발 및 맞춤 서비스 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트/광고성 정보 및 참여 기회 제공 등<br>';
  temp_string += '⑫ 결제 시스템 제공 : 예약 및 요금 결제, 상품 및 서비스 제공 등<br>';
  temp_string += '⑬ 정보보호 : 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 환경 구축 등<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제3조 개인정보 제3자 제공</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 원칙적으로 회원의 동의 없이 개인정보를 제3자에게 제공하지 않으며 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른 동의를 받고 있습니다.<br>';
  temp_string += '② 홈리에종은 개인정보를  ‘개인정보 수집항목 및 목적’에서 명시한 범위 내에서 사용하며 회원의 사전 동의 없이 개인정보 수집 이용 목적 범위를 초과하여 이용하거나 회원의 개인정보를 제공하지 않습니다.<br>';
  temp_string += '③ 다만 아래와 같이 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우 제공 받는 자, 제공목적, 제공정보 항목, 이용 및 보유기간 등을 회원에게 고지하여 동의를 구하거나 관련법령에 따른 경우는 예외로 합니다.<br>';
  temp_string += '④ 회원이 사전에 공개 또는 제3자 제공에 동의한 경우 : 대표적으로 구매자의 개인정보를 디자이너에게 제공하는 경우, 디자이너의 개인정보를 구매자에게 제공하는 경우가 제3자제공의 예입니다. 디자이너의 개인정보는 일반적으로 회원을 포함한 제3자에게 공개되며(가입시 사전에 포괄적 제3자 제공동의를 받습니다.) 구매자의 개인정보는 디자이너의 물품(서비스) 구매결제가 완료된 이후 디자이너에게 제공됩니다.<br>';
  temp_string += '⑤ 관계법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제4조 개인정보 처리위탁</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 서비스의 제공에 관한 계약을 이행하고 이용자의 편의증진 등을 위하여 개인정보를 타인에게 위탁 처리할 수 있습니다. 타인에게 위탁업무를 하는 경우에는 다음의 내용을 이용자에게 알리고 동의를 받습니다. 다음의 내용에 대하여 어느 하나의 사항이 변경되는 경우에도 같습니다.<br>';
  temp_string += '② 개인정보 처리위탁을 받는 자(이하 수탁자라 함)<br>';
  temp_string += '③ 개인정보 처리위탁을 하는 업무의 내용<br>';
  temp_string += '④ 홈리에종은 아래와 같이 개인정보를 위탁하고 있으며, 개인정보의 수탁자와 위탁업무의 범위는 아래와 같습니다.<br>';
  temp_string += '⑤ PG사 : ㈜이니시스(결제대행 서비스 제공)<br>';
  temp_string += '⑥ E-mail 및 문자 발송 : mailchimp, 알리고(서비스 운영관련 알림 및 정보 제공)<br>';
  temp_string += '⑦ 배송대행업체 : 업체명(홈리에종이 직접 판매한 물품의 배송 위탁)<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제5조 개인정보의 보유 및 이용기간</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 회원의 개인정보를 원칙적으로 보유/이용기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br>';
  temp_string += '② 원으로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br>';
  temp_string += '③ 홈리에종은 1년동안 회사의 서비스를 이용하지 않은 회원의 개인정보는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 29조’에 근거하여 회원에게 사전통지하고 개인정보를 파기하거나 별도로 분리하여 저장합니다.(회사는 개인정보가 파기되거나 분리되어 저장/관리된다는 사실, 서비스 미이용기간 만료일, 해당 개인정보의 항목을 E-mail 등의 방법으로 미이용기간 30일전에 회원에게 알립니다. 이를 위해 회원은 회사에게 정확한 연락처 정보를 알리거나 수정해야 합니다.<br>';
  temp_string += '④ 관련 법률에 따른 정보보유 사유는 아래와 같습니다. 서비스 결제 및 정산 발생시 관련 법률에 따라 개인정보를 포함한 결제, 정산 관련 정보가 5년간 보관이 됩니다.<br>';
  temp_string += '⑤ 전자상거래 등에서의 소비자 보호에 관한 법률<br>';
  temp_string += '⑥ 계약 또는 청약철회 등에 관한 기록 : 5년<br>';
  temp_string += '⑦ 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br>';
  temp_string += '⑧ 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년<br>';
  temp_string += '⑨ 통신비밀보호법 - 로그인 기록 : 3개월<br>';
  temp_string += '⑩ 조세 관련 법령 - 매출 관련 기록 : 5년<br>';
  temp_string += '⑪ 개인정보 파기절차 – 회사는 파기사유가 발생한 개인정보를 개인정보 보호책임자의 승인 절차를 거쳐 파기합니다.<br>';
  temp_string += '⑫ 개인정보 파기방법 – 회사는 전자적 파일형태로 기록/저장된 개인정보는 기록을 재생할 수 없도록 기술적인 방법 또는 물리적인 방법을 이용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제6조 개인정보의 수집 및 이용을 거부할 권리</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '개인정보 주체는 개인정보의 수집 및 이용을 거부할 권리가 있으나, 서비스 제공을 위한 필수적인 개인정보는 그 수집이용 동의를 거부할 시 회원가입을 할 수 없습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제7조 링크 사이트에 대한 책임</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종은 회원에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 “개인정보처리방침”이 적용되지 않습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제8조 회원 및 법정대리인의 권리</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 회원 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정, 탈퇴를 요청할 수 있습니다. 다만, 이 경우 서비스의 일부 또는 전체 이용에 제한이 있을 수 있습니다.<br>';
  temp_string += '② 회원 및 법정 대리인의 개인정보 조회, 수정, 탈퇴는 홈리에종 웹사이트에서 가능하며, 회사는 이에 대해 지체없이 조치하겠습니다.<br>';
  temp_string += '③ 회원이 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.<br>';
  temp_string += '④ 회원은 자신의 개인정보를 최신의 상태로 유지해야 하며, 회원의 부정확한 정보 입력으로 발생하는 문제의 책인은 이용자 자신에게 있습니다.<br>';
  temp_string += '⑤ 타인의 개인정보를 도용한 회원가입의 경우 회원자격을 상실하거나 관련 개인정보보호 법령에 의해 처벌 받을 수 있습니다.<br>';
  temp_string += '⑥ 회원은 E-mail, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.<br>';
  temp_string += '⑦ 회원 또는 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 “개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제9조 개인정보의 기술적, 관리적 보호대책</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 회사는 회원을 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 등이 되지 않도록 안전성을 확보하기 위하여 다음과 같이 기술적, 관리적 보호대책을 강구하고 있습니다.<br>';
  temp_string += '② 비밀번호의 암호화 – 이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인/변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.<br>';
  temp_string += '③ 해킹 등에 대비한 대책 - 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.<br>';
  temp_string += '④ 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.<br>';
  temp_string += '⑤ 민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전손할 수 있도록 하고 있습니다.<br>';
  temp_string += '⑥ 개인정보 처리 최소화 및 교육 – 개인정보 관련 처리 담당자를 최소한으로 제한하고 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 내부방침 등의 준수를 강조하고 있습니다.<br>';
  temp_string += '⑦ 개인정보보호 전담담당부서 운영 – 개인정보의 보호를 위해 개인정보보호 전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견 될 경우 즉시 해결하고 바로 잡을 수 있도록 최선을 다하고 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제10조 개인정보보호 책임자</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 개인정보보호 전담담당부서를 지정하고 있습니다.<br>';
  temp_string += '② 개인정보보호 책임자 이름 : 박혜연 연락처 : 02-2039-2252<br>';
  temp_string += '③ 회원은 서비스 이용 중 발생한 모든 개인정보와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 개인정보보호 전담 담당부서로 문의할 수 있습니다. 홈리에종은 이용자의 문의에 대해 최대한 빠른 시간 내에 답변 및 처리합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제11조 기타 개인정보침해에 대한 신고 및 상담</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 회원은 아래의 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다. 아래의 기관은 정부기관 소속으로서, 홈리에종의 자체적인 개인정보 불만처리 또는 개인정보 피해구제 결과가 만족스럽지 않을 경우, 구체적인 도움이 필요한 경우에 문의하시면 됩니다.<br>';
  temp_string += '② 개인정보침해신고센터 : http://privacy.kisa.or.kr/kor/mail.jsp (국번없이) 118<br>';
  temp_string += '③ 개인정보분쟁조정위원회 : http://www.kopico.go.kr 02-2100-2499<br>';
  temp_string += '④ 대검찰청 사이버수사과 : http://www.spo.go.kr/spo/index.jsp (국번없이) 130<br>';
  temp_string += '⑤ 경찰청 사이버안전국 : http://cyberbureau.police.go.kr/index.do (국번없이) 182<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제12조 고지의 의무</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '현 개인정보 처리방침은 법령, 정부의 정책 또는 회사 내부정책 등 필요에 의하여 변경될 수 있으며, 변경시에는 개정 최소 7일전부터 홈페이지의 ‘공지사항’을 통해 고지할 것입니다. 다만, 회원에게 불리한 내용으로 변경하는 경우에는 최소 30일 전에 고지합니다.<br>';
  temp_string += '</p>';
  arr.push(temp_string);

  temp_string = '';
  temp_string += '<h1 class="termsh1">이용약관</h1>';
  temp_string += '<div class="termsgreenbar termsgreenbara1"></div>';
  temp_string += '<h3 class="termsh3">제1조 목적</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '이 약관은 홈리에종이 운영하는 웹사이트(www.home-liaison.com)를 통해 제공하는 중개서비스 및 기타 부가서비스를 이용함에 있어 홈리에종과 회원간의 각각의 권리, 의무 및 책임사항, 기타 필요사항을 규정함을 목적으로 합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제2조 약관의 명시 효력 및 변경</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 회원이 이 약관의 내용을 확인할 수 있도록 홈리에종의 웹사이트에 게시합니다.<br>';
  temp_string += '② 합리적인 사유가 발생하면 관련 법을 위배하지 않는 범위에서 약관변경이 가능하고, 약관을 변경하는 경우 적용일자, 변경사유를 명시하여 적용일자 7일전(회원에게 불리한 내용으로 변경하는 경우에는 30일전)부터 공지합니다.<br>';
  temp_string += '③ 약관 개정시 특별히 언급하지 않는 한 소급 적용 되지 않으며, 회원에게 불리한 약관의 개정은 소급 적용하지 않습니다.<br>';
  temp_string += '④ 변경된 약관에 동의하지 않을 경우 회원은 탈퇴를 요청할 수 있으며, 거부의사를 표현하지 않으면 약관의 변경에 동의한 것으로 간주합니다.<br>';
  temp_string += '⑤ 홈리에종은 디자이너 혹은 특정 상품과 개별약관 체결이 가능하며 개별약관은 전체약관에 포함됩니다. 서비스 이용약관과 개별약관이 상충할 시 개별약관이 우선적인 효력을 갖습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제3조 용어의 정의</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종 : 홈리에종 웹사이트를 제공하고 운영하는 홈리에종을 말합니다.<br>';
  temp_string += '웹사이트 : 홈리에종이 제공하고 운영하는 www.home-liaison.com을 의미합니다.<br>';
  temp_string += '중개서비스 : 구매자가 자기 결정에 의하여 디자이너와 사이에 거래가 이루어질 수 있도록 온라인 거래장소를 제공하거나 지원하는 서비스를 말합니다.<br>';
  temp_string += '디자이너 : 디자이너 신청 후 홈리에종이 승인하여 웹사이트 내에서 포트폴리오와 상품을 등록하여 회원에게 판매할 수 있는 자격을 가진 자를 말합니다.<br>';
  temp_string += '구매자 : 홈리에종 웹사이트에서 상품을 구매하여 실제로 서비스를 이용하는 고객을 말합니다.<br>';
  temp_string += '회원 : 홈리에종 사이트에 회원가입하여 홈리에종이 제공하는 서비스를 이용하는 구매자와 디자이너를 말합니다.<br>';
  temp_string += '직거래 : 홈리에종을 거치지 않고 디자이너와 구매자가 직접 서비스 대금을 주고 받아 홈리에종이 제공하는 안전결제서비스를 이용하지 않고 결제를 진행하는 것을 말합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제4조 서비스의 종류, 성질과 목적</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종이 회원에게 제공하는 주 서비스는 중개서비스로, 구매자가 디자이너와 거래가 이루어질 수 있도록 온라인 거래장소를 제공하거나 지원하는 서비스 및 관련 부가서비스를 말합니다.(판매관련 지원서비스, 구매관련 지원서비스, 결제관련 지원서비스, 상품검색지원서비스, 기타 전자상거래 관련서비스, 광고 및 프로모션 서비스 등). 따라서, 구매자와 디자이너 사이에 체결된 거래와 관련된 법률관계는 거대당사자 사이에 적용됩니다. 다만, 홈리에종과 디자이너가 상호협의하에 기획/개발하여 판매하는 스타일링 상품(프로모션)은 홈리에종이 직접 또는 대리로 판매할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제5조 대리 및 보증의 부인</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 중개서비스 제공자로서 구매자와 디자이너 상호간 거래를 위한 온라인 거래장소를 제공할 뿐이므로 물품(서비스)을 판매하는 디자이너나 구매하고자 하는 구매자를 대리하지 않습니다. 또한 홈리에종의 어떤 행위도 디자이너 또는 구매자를 대리하는 행위로 간주되지 않습니다.<br>';
  temp_string += '② 홈리에종은 중개서비스를 통하여 이루어지는 구매자와 디자이너의 계약과 관련하여 판매의사 또는 구매의사의 존부 및 진정성, 등록상품(서비스)의 품질, 완전성, 안전성, 적법성 및 타인의 권리에 대한 비침해성, 디자이너 또는 구매자가 입력하는 정보 및 그 정보를 통하여 링크된 URL에 게재된 자료의 진실성 등 일체에 대하여 보증하지 아니하며, 이와 관련한 일체의 위험과 책임은 해당 회원이 부담해야 합니다.<br>';
  temp_string += '③ 홈리에종은 회원이 게재하는 제반 정보를 통제하거나 제한하지 않습니다. 다만, 홈리에종은 회원이 게재한 정보의 내용이 타인의 명예, 권리를 침해하거나 법규정을 위반한다고 판단하는 경우에는 이를 삭제할 수 있고, 판매취소, 판매중지, 기타 필요한 조치를 취할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제6조 서비스 이용계약</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 서비스 이용계약은 서비스를 이용하고자 하는 자의 이용신청을 홈리에종이 승낙함으로써 성립하며, 이때 서비스를 이용하고자 하는 자는 홈리에종이 온라인으로 제공하는 회원가입 신청양식에 따라 필요한 각각의 항목에 해당내용을 기재한 후 이 약관 및 필수적 개인정보 동의사항에 동의 해야 합니다.<br>';
  temp_string += '② 회원가입의 성립시기는 홈리에종의 이용승낙 의사를 서비스화면에 게시하거나 E-mail 또는 홈리에종이 정하는 방법으로 이용신청자에게 도달한 시점으로 합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제7조 회원가입</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 회원 가입 필수 기재 항목 : 사용자 이름, E-mail, 비밀번호<br>';
  temp_string += '② 디자이너 신청 기재 항목 : 회사이름, 사업자등록번호, 사업자등록증 사본, 대표자이름, 개업일, 주소, 전화번호, 휴대전화번호, E-mail, Fax, 은행명, 예금주명, 계좌번호, 통장사본, 경력<br>';
  temp_string += '③ 디자이너는 신청시 사업자 구분에 따라 정확하게 기입하여야 합니다.<br>';
  temp_string += '④ 디자이너 신청 후 홈리에종이 검토 및 승인한 후에 디자이너로 자신의 상품(서비스) 홍보 활동이 가능합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제8조 회원가입의 승낙, 거부, 유보</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종에서 정한 항목을 정확하게 기재하고 이용약관 및 필수적 개인정보 동의사항에 동의한 자의 가입신청에 대하여 서비스의 이용을 승낙하는 것을 원칙으로 합니다.<br>';
  temp_string += '② 다음과 같은 사유가 있으면 이용신청에 대한 승낙을 사전에 거부할 수 있습니다.<br>';
  temp_string += '만 14세 미만의 자가 이용신청을 하는 경우<br>';
  temp_string += '가입신청시 필수기재 항목에 허위사실을 기재하는 경우<br>';
  temp_string += '디자이너의 경우 실명가입신청이 아님이 확인되거나 사업자등록번호가 중복되는 경우<br>';
  temp_string += '기존 회원과 E-mail이 동일한 경우<br>';
  temp_string += '탈퇴 회원의 E-mail 또는 사업자 등록번호를 재사용하는 경우<br>';
  temp_string += '이 약관 제12조에 의해 홈리에종이 이용계약을 해지한 전 회원이 재이용신청을 하는 경우<br>';
  temp_string += '기타 본 약관에 위배 되거나 위법 또는 부당한 이용신청임이 확인됨 경우<br>';
  temp_string += '③ 다음과 같은 사유가 있으며 이용신청에 대한 승낙을 유보할 수 있습니다.<br>';
  temp_string += '설비에 여유가 없거나, 기술상 지장이 있는 경우<br>';
  temp_string += '디자이너의 경우 실명가입신청 여부가 확인되지 않거나 필요한 소요서류를 완비하지 못한 경우<br>';
  temp_string += '기타 홈리에종이 합리적인 판단에 의하여 필요하다고 인정하는 경우<br>';
  temp_string += '④ 전항의 경우 홈리에종은 이용신청자에게 승낙유보의 사유, 승낙가능 시기 또는 승낙에 필요한 추가 요청정보와 자료 등 기타 승낙유보와 관련된 사항을 해당 서비스 화면에 게시하거나 E-mail을 통해 통지합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제9조 회원정보의 변경</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 구매자는 ‘홈리에종 웹사이트 – 개인페이지 – 나의 정보’에서 정보변경이 가능합니다.<br>';
  temp_string += '② 디자이너의 경우 ‘홈리에종 웹사이트-디자이너 페이지- 프로필 관리’에서 변경할 수 있습니다.<br>';
  temp_string += '③ 디자이너의 경우 기본 정보 변경 시 재심사를 거치게 됩니다. 재심사 기간 동안에는 서비스 이용에 제한이 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제10조 회원정보의 수진과 보호(개인정보의 보호)</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 관계법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다.<br>';
  temp_string += '② 개인정보의 보호 및 사용에 대해서는 관련법 및 홈리에종의 개인정보 처리방침이 적용됩니다. 다만 링크된 외부 웹사이트에서는 홈리에종의 개인정보처리방침이 적용되지 않습니다.<br>';
  temp_string += '③ 제공한 정보를 목적 이외의 용도로 사용하거나 회원의 동의없이 제3자에게 제공하지 않습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제11조 아이디 및 비밀번호 관리</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 회원의 ID와 비밀번호에 관한 관리책임은 회원에게 있으며 이를 제3자가 이용하도록 해서는 안됩니다.<br>';
  temp_string += '② 홈리에종은 회원의 아이디가 개인정보 유출우려가 있거나, 반사회적 혹은 미풍양속에 어긋나는 경우 해당 ID의 이용을 제한할 수 있습니다.<br>';
  temp_string += '③ 회원은 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 홈리에종에 통지하고 홈리에종의 안내가 있는 경우에는 그에 따라야 합니다.<br>';
  temp_string += '④ 홈리에종에게 그 사실을 통지하지 않거나 통지한 경우에도 홈리에종의 안내에 따르지 않아 발생한 불이익에 대하여 홈리에종의 고의 또는 중대한 과실이 없는 이상 책임지지 않습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제12조 이용계약의 해지</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 회원은 언제든지 해지의 의사를 통지하여 이용계약을 해지할 수 있습니다.<br>';
  temp_string += '② 회원은 해지의사를 통지하기 전에 현재 진행중인 모든 상품의 거래를 완료하거나 철회 또는 취소하여야 하며, 거래의 철회 또는 취소로 인한 불이익은 회원 본인이 부담하여야 합니다.<br>';
  temp_string += '③ 홈리에종은 다음의 내용에 따라 이용계약을 해지할 수 있습니다.<br>';
  temp_string += '회원에게 제8조 제2항에서 정하고 있는 이용신청의 승낙거부사유가 있음이 확인된 경우<br>';
  temp_string += '회원이 판매부적합물품(서비스)을 판매등록하거나, 기타 공공질서 및 미풍양속에 위배되는 물품거래행위를 하거나 시도한 경우<br>';
  temp_string += '회원이 직거래를 하는 등 홈리에종이 제공하는 서비스의 원활한 진행을 방해하는 행위를 하거나 시도한 경우<br>';
  temp_string += '디자이너가 부실하게 의무를 이행하여 구매자의 불만을 사는 일이 반복된 경우<br>';
  temp_string += '회원이 실제로 물품을 판매하고자 하는 의사 없이 물품등록을 한 경우 또는 이를 알고 거래한 것으로 인정되는 경우(가장거래행위)<br>';
  temp_string += '다른 회원 또는 홈리에종의 권리나 명예, 신용 기타 정당한 이익을 침해하거나 대한민국 법령 또는 공서양속에 위배되는 행위를 한 경우<br>';
  temp_string += '서비스의 원활한 진행을 방해하거나 방해할 우려가 있는 행위 등을 하거나 시도한 경우(합리적 사유없이 상습적, 악의적으로 이의를 제기하는 행위, 구매한 상품 또는 서비스에 특별한 하자가 없음에도, 상습적으로 취소, 환불 요청 등을 하는 행위, 그외 홈리에종이 정한 안전거래 이용규칙을 위반한 경우)<br>';
  temp_string += '회원에게 파산, 성년후견, 한정후견, 회생의 결정 또는 선고, 사망, 실종선고, 해산, 부도 등 정상적 서비스 이용을 불가능하게 하거나 곤란하게 하는 사유가 발생한 경우(다만, 이 경우 홈리에종은 이용계약 해지 대신 거래안전 보호를 위해 회원자격정지, 서비스이용제한 등의 조치를 취할 수 있습니다)<br>';
  temp_string += '그밖에 고의로 홈리에종의 영업을 방해 하는 등 홈리에종에 손해를 끼친 경우<br>';
  temp_string += '회원이 1년 이상 로그인을 하지 않은 경우<br>';
  temp_string += '회원이 이 약관에 위배되는 행위를 하거나 이 약관에서 정한 해지 사유가 발생한 경우<br>';
  temp_string += '④ 홈리에종이 해지할 때는 회원에게 e-mail, 전화, 팩스, 메시지, 앱푸쉬, 기타의 방법으로 해지 사유를 밝혀 해지 의사를 통지합니다. 거래의 안전을 위하여 동일인 소유로 확인되는 회원ID에 대하여 일괄적으로 동시에 또는 순차적으로 해지 의사를 통지할 수 있습니다. 이 경우, 해지의사를 회원에게 최초로 통지한 시점에 동일인이 사용하는 회원ID 전부에 대해 이용계약이 종료됩니다.<br>';
  temp_string += '⑤ 본 항에서 정한 바에 따라 이용계약이 종료되면 홈리에종은 회원의 재이용 신청을 승낙하지 않을 수 있습니다. <br>';
  temp_string += '⑥ 이용계약의 종료와 관련하여 발생한 손해에 대해서는 이용계약이 종료된 해당 회원이 책임을 져야 하고, 홈리에종은 책임을 지지 않습니다.<br>';
  temp_string += '⑦ 이용 계약이 해지된 경우 회원의 게시물 데이터는 남아있으나, 노출은 제한할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제13조 중개서비스 이용정지, 이용제한</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 거래의 안전성과 신뢰성을 위해 회원자격적지, 서비스 이용제한 등 필요조치를 취할 수 있습니다.<br>';
  temp_string += '② ①항의 경우 회원에게 유선, E-mail, 기타의 방법을 통해 먼저 통보하고, 부득이한 경우 선조치 후 사후 통보 할 수 있습니다.<br>';
  temp_string += '③ 회원자격정지, 서비스 이용제한 사유는 아래와 같습니다.<br>';
  temp_string += '홈리에종이 회원에게 부여하는 신용점수에 따른 회원자격정지<br>';
  temp_string += '불법으로 홍보할 경우, 홈리에종 서버에 무리한 시도를 할 경우<br>';
  temp_string += '홈리에종에서 제공하는 안전결제서비스를 통하지 않은 직거래를 유도할 경우<br>';
  temp_string += '부당한 구매행위, 불법 카드 거래, 매매부적합서비스 등록, 허위 거래, 매매조작 행위, 불법 통신 과금 서비스 이용행위<br>';
  temp_string += '재판매목적의 거래행위<br>';
  temp_string += '무재고 재판매 행위<br>';
  temp_string += '1년 이상 장기 휴면 회원일 경우<br>';
  temp_string += '금지행위<br>';
  temp_string += '가. 디자이너가 주문취소, A/S, 환불관련 정책을 위반하거나 클레임 발생 시 연락두절 될 경우<br>';
  temp_string += '나. 디자이너가 구매자의 문의처리에 관련하여 응답지연 또는 불충분하게 답하거나 작업일을 준수하지 못하는 등 구매자의 불만을 사는 경우<br>';
  temp_string += '다. 기타 위법, 부당행위<br>';
  temp_string += '범죄 또는 불법 행위에 이용한 경우<br>';
  temp_string += '부당 또는 부정하게 타인의 아이디, 닉네임을 사용하여 서비스를 이용한 경우<br>';
  temp_string += '의뢰인 또는 홈리에종으로부터 연락을 회피하는 경우<br>';
  temp_string += '불법 정보를 유통할 경우<br>';
  temp_string += '정당한 권한 없이 복사, 퍼가기, 스크래핑, 기타 상업적으로 이용할 경우<br>';
  temp_string += '제공정보 또는 증빙자료가 허위이거나 홈리에종이 요청하는 증빙자료를 제공하지 않은 경우<br>';
  temp_string += '회원이 다른 회원의 개인정보를 무단 수집하거나 마케팅 등 수집목적 외로 이용하는 경우<br>';
  temp_string += '회원이 다른 회원이 개인정보를 무단으로 제3자에게 제공하거나 관련법령 또는 홈리에종의 개인정보취급방침을 위배하여 다른 회원의 개인정보가 침해된 경우<br>';
  temp_string += '욕설, 비방, 명예를 훼손하는 내용을 작성하는 경우<br>';
  temp_string += '그 외 약관 또는 법령에 위반되거나 타인의 권리를 침해하거나 위법부당한 행위가 있는 것으로 의심될만한 상당한 이유가 있는 경우<br>';
  temp_string += '④ 회원자격이 정지된 회원 및 중개서비스 이용이 제한된 회원에게 완료되지 않은 매매가 있는 경우 해당 회원은 매매에 관한 제반 과정을 완료하여야 합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제14조 정보제공, 광고게재</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 홈페이지, 서비스화면, E-mail 등에 광고게재가 가능하며, 회원은 수신거절이 가능합니다.<br>';
  temp_string += '② 홈리에종은 회원에게 필요하다고 판단되는 정보를 홈페이지, 서비스화면, E-mail을 통해 제공이 가능하고, 회원은 수신거절이 가능합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제15조 디자이너의 권리</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '디자이너는 판매하는 서비스의 종류와 범위, 판매가격, 거래조건 등을 스스로 결정하고, 홈리에종은 이에 부당하게 관여하지 않습니다. 다만 홈리에종은 결제방식, 서비스 발송 방식 등 구매자 피해 방지에 관한 사항을 약관 등으로 정하거나 디자이너에게 합리적인 조정을 요청할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제16조 디자이너의 의무</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 디자이너는 약관이 정하는 절차에 따라 신원정보의 제공, 판매서비스의 등록, 거래진행과정의 관리, 구매자에 대한 거래이행, 서비스 발송, A/S 또는 환불 등의 사후 처리를 수행하여야 합니다.<br>';
  temp_string += '② 디자이너는 디자이너 신청시 사업자 구분에 따라 신청양식의 항목을 정확하게 기재해야 합니다. 또한 기본정보를 최신의 정보로 업데이트 해야 합니다. 기본정보 변경시 홈리에종의 재승인을 받는 절차가 필요하며, 승인대기 기간에는 서비스 이용이 제한됩니다.<br>';
  temp_string += '③ 디자이너는 구매자에게 노출되는 디자이너 정보, 포트폴리오, 상품 등록 시 디자이너 가이드 매뉴얼에 따라 등록하여야 합니다. 등록양식에 어긋난 등록이나 허위등록, 판매가장등록, 신용카드결제시스템 또는 통신과금시스템만을 이용하기위한 등록 등의 경우 홈리에종은 해당 서비스를 삭제, 취소하거나 중개 하지 않을 수 있으며, 이에 따른 모든 책임은 서비스를 등록한 회원이 부담하여야 합니다. 또한 신용카드 결제시스템 또는 통신과금시스템만을 이용하기 위하여 등록한 경우에는 디자이너와 구매자 모두 회원자격이 정지될 수 있습니다.<br>';
  temp_string += '④ 디자이너는 서비스 등록 시 직거래를 유도하는 문구나 구매자의 정당한권리(청약철회권 등)를 제한하거나, 허위 또는 기타 법령이나 약관에 위배되는 내용(문구, 사진, 설명을 포함)을 등록해서는 안되며 스스로 또는 다른 회원을 통하여 고의로 서비스 평가, 판매횟수 등을 조작하거나 기타 판매가장등록 등 중개서비스의 안전성과 신뢰성을 해하는 부정한 행위를 하여서도 안됩니다. 이를 위반한 경우 홈리에종은 관련 회원이나 해당 거래에 대하여 거래취소, 판매중지 및 기타 필요한 조치를 취할 수 있습니다.<br>';
  temp_string += '⑤ 디자이너는 구매자의 문의사항에 성실히 응해야 합니다.<br>';
  temp_string += '⑥ 디자이너는 작업일정에 대한 관리를 함으로써 구매자의 상품구매, 서비스진행 등이 원활하게 진행되도록 해야 합니다.<br>';
  temp_string += '⑦ 디자이너는 홈페이지에서 등록한 것과 동일한 내용으로 서비스 제공 및 A/S를 진행해야 합니다.<br>';
  temp_string += '⑧ 홈리에종과 디자이너는 구매자의 구매행위가 허위 또는 불법결제에 해당하는 경우, 신속한 거래관계의 확정 또는 거래 안전을 위하여 필요한 경우, 그 밖의 정당한 사유가 있는 경우 거래를 취소할 수 있습니다. 다만, 디자이너가 예상치 못한 작업불능 등으로 정상적 거래이행이 곤란하여 거래를 취소하는 경우에는 지체 없이 구매자에 대한 통지, 환급에 필요한 조치 등 관계법령이 정한 조치를 취하여야 합니다.<br>';
  temp_string += '⑨ 서비스 시작 후 구매자로부터 환불요청이 있는 경우 구매자와 협의하여 환불액을 결정해야 합니다. 환불액이 결정되면 디자이너는 홈리에종에 환불 요청을 해야합니다.<br>';
  temp_string += '⑩ 디자이너는 홈리에종에서 거래와 관련하여 전자상거래 등에서의 소비자 보호에 관한 법률 등 관계법령에서 명시한 거래내역에 관한 자료를 보관하여야 합니바.<br>';
  temp_string += '⑪ 디자이너는 통신판매중개 의뢰 및 그와 관련된 계약이행 과정에서 홈리에종으로부터 제3자 제공을 받은 구매자 등 다른 회원의 개인정보를 법률, 약관 또는 홈리에종의 개인정보처리방침에서 정한 목적외 용도로 사용할 수 없으며 이를 위반할 경우 모든 법적 책임을 지고 자신의 노력과 비용으로 홈리에종을 면책시켜야 하고 회원자격이 정지 또는 박탈될 수 있습니다. 홈리에종의 고의 또는 과실과 무관하게 특정 디자이너가 취급 처리 중인 다른 회원 또는 제 3자의 개인정보가 침해된 경우, 홈리에종은 그에 대하여 책임을 지지 않습니다.<br>';
  temp_string += '⑫ 디자이너는 홈리에종의 명칭, 로고, 홈리에종이 제공한 메인 이미지 등을 홈리에종이 정한 목적 이외 용도 및 장소에 사용하거나 표시해서는 안되며, 이러한 행위로 인하여 홈리에종 또는 타 회원에게 피해가 발생한 경우 이에 대하여 일체의 법적 책임을 부담하여야 합니다.<br>';
  temp_string += '⑬ 홈리에종은 디자이너가 등록한 서비스의 판매 촉진 및 신뢰도 상승을 위해 서비스의 메인 이미지 또는 프로필 이미지 등에 대한 등록 기준을 마련하여 디자이너에게 수정을 요청할 수 있으며 디자이너는 이에 동의 하여야 합니다. 만일 이에 동의하지 않을 경우 홈리에종은 디자이너의 서비스 판매를 중단하거나 신규서비스 등록을 제한할 수 있습니다. <br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제17조 디자이너 등록자격</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종에서 디자이너로 활동하기 위해서는 신청양식에 따라 신청 후 홈리에종 승인을 받아야 합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제18조 판매서비스의 등록</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '디자이너는 홈리에종의 디자이너 가이드 매뉴얼에 따라 판매서비스를 등록해야 합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제19조 매매부적합 서비스</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 등록된 서비스가 온라인상에서의 매매, 유통에 적합하지 않은 서비스인 경우에는 직권 또는 권리주장자의 요청에 따라 해당 서비스에 대한 승인을 거절하거나 삭제, 취소, 중지할 수 있습니다. 이 경우 홈리에종은 회원에게 유선, e-mail 또는 기타의 방법을 통하여 통보하며, 회원의 연락이 두절되거나 긴급을 요하는 것과 같이 부득이한 경우 선 조치 후 사후 통보할 수 있습니다.<br>';
  temp_string += '② 홈리에종은 등록된 서비스가 법령 또는 약관에 위반되거나, 공서양속을 저해하거나 기타 탈법행위와 관련되거나 그러한 목적이 있는 경우 또는 홈리에종의 정책상 필요에 의한 경우에는 직권으로 이에 대한 승인을 거절하거나 삭제, 취소, 중지할 수 있습니다. 매매부적합서비스는 매매불가서비스와 매매제한 서비스로 구분됩니다.<br>';
  temp_string += '매매불가서비스: 지적재산권 침해서비스, 미등록 영상매체물 등 관련법령상 판매 또는 유통이 불가한 서비스를 말합니다.<br>';
  temp_string += '매매제한서비스: 서비스의 판매방식, 판매장소 또는 판매 대상자 등에 대한 법적 제한이 있는 서비스, 소비자에게 피해가 발생할 염려가 있는 서비스, 원활한 거래진행을 방해하는 서비스, 기타 사회통념상 매매에 부적합하거나 홈리에종의 정책에 의하여 매매가 제한되는 서비스를 말합니다.<br>';
  temp_string += '③ 홈리에종은 등록된 서비스가 구매자 또는 제3자에게 위해 또는 손해를 발생시키거나 발생시킬 우려가 있다고 인정되는 경우 아래와 같은 조치들을 취할 수 있습니다.<br>';
  temp_string += '해당 서비스 및 해당 서비스와 동일 또는 유사한 카테고리에 등록된 해당 디자이너의 다른 서비스 등록의 삭제, 취소 또는 중지<br>';
  temp_string += '해당 디자이너의 위 제1호에 해당하는 신규 서비스 등록 제한<br>';
  temp_string += '해당 디자이너의 회원 자격 정지 또는 중개서비스 이용 제한<br>';
  temp_string += '④ 홈리에종은 권리의 보호를 위하여 권리주장장가 홈리에종이 정한 절차 및 방식에 따라 신고 또는 요청을 하는 경우 당해 서비스를 삭제, 취소, 또는 판매중지하고 이를 해당 서비스의 디자이너에게 통지합니다. 이러한 경우 홈리에종은 당해 권리주장자의 신원, 신고 또는 요청이 홈리에종의 절차 및 방식에 부합하는지 여부만을 서면으로 심사할 책임을 지는 것에 그치며 당해 권리의 실질적 유효성 및 범위, 당해 권리의 주체 및 동 권리에 관련된 계약 또는 실질적 관계 등에 대한 심사를 행하지 않습니다. 홈리에종은 권리주장자의 신고 또는 요청에 의한 서비스등록의 삭제, 취소 또는 판매 중지에 대해 일체의 책임을 지지 않으며, 이는 권리주장자와 디자이너 사이에서 해결되어야 합니다.<br>';
  temp_string += '⑤ 홈리에종이 직권 또는 권리주장자의 신고 또는 요청에 따라 해당 서비스를 삭제, 취소하거나 중지한 경우, 디자이너는 이에 대한 이의를 홈리에종이 정한 절차와 방식에 따라 소명함으로써 홈리에종의 조치에 대한 중단을 요청할 수 있습니다. 이 경우 홈리에종은 판매의 재개, 재등록 등의 조치를 취하고 이를 권리주장자에게 통보합니다. 디자이너의 소명이 있는 경우, 홈리에종은 해당 소명이 홈리에종이 정한 절차와 방식에 부합하는지 여부만을 서면으로 심사하는 것에 그치며 해당 소명의 유효성, 적법성, 타당성 및 디자이너의 권리 등에 대한 심사를 행하지 않습니다. 홈리에종은 디자이너의 소명에 따른 판매의 재개, 재등록 등에 대하여 권리주장자, 기타 제3자에게 일체의 책임을 지지 않으며, 이는 권리주장자와 디자이너 사이에서 해결되어야 합니다.<br>';
  temp_string += '⑥ 매매부적합서비스의 등록을 이유로 서비스가 삭제, 취소되거나 중지된 경우, 디자이너는 회원자격 및 서비스 이용이 제한될 수 있습니다. 다만, 디자이너의 경과실에 의해 매매부적합서비스를 등록한 경우에는 홈리에종은 1회 사전 경고를 하여 디자이너가 자진시시정을 할 수 있는 기회를 제공할 수 있습니다.<br>';
  temp_string += '⑦ 홈리에종은 매매부적합서비스 여부를 확인하기 위하여(서비스 또는 서비스 등록정보 등에 대하여 이의, 신고가 접수된 경우를 포함) 해당 거래 진행을 일시 중지할 수 있습니다. 이 경우, 홈리에종은 디자이너와 구매자에게 중지사실을 통지합니다. 홈리에종은 이후 매매부적합서비스가 아닌 것으로 확인된 경우 즉시 해당 서비스가 정상적으로 진행될 수 있도록 조치합니다.<br>';
  temp_string += '⑧ 구매자가 매매부적합서비스임을 알거나 알 수 있는 상태에서 물품을 구매한 경우에는 홈리에종은 매매대금의 입출금을 중개하지 않을 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제20조 서비스 등록정보 게재</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종은 디자이너가 등록한 서비스등록정보를 홈리에종이 정한 기준과 방법에 따라 홈리에종 사이트 및 모바일 홈리에종에 게재합니다.홈리에종은 게재하는 서비스등록정보의 위치, 크기, 배열 등을 결정하고 조정할 수 있으며, 이벤트 광고 등 홈리에종의 서비스를 위하여 해당 서비스화면을 구성, 편집하거나 서비스등록 정보 외의 사항을 게재할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제21조 서비스 판매규정</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 디자이너가 기대한 동시작업개수를 초과 할 경우 또는 홈리에종에 의하여 직원으로 해당 서비스거래가 취소되는 경우 등 에는 판매중지 처리가  될 수 있습니다.<br>';
  temp_string += '② 홈리에종은 구매자가 결제하면 메일(E-mail) 또는 문자(SMS)서비스 등을 통하여 디자이너에게 서비스 판매 사실을 알립니다. 디자이너는 홈리에종이 보내는 메일(E-mail)의 수신 또는 디자이너 페이지를 통하여 주문내역을 확인할 수 있습니다.<br>';
  temp_string += '③ 디자이너는 홈리에종으로부터 서비스 판매 사실을 통지 받은 후에는 최대한 빠른 시간안에 작업을 시작해야 합니다. 서비스 특성상 시작일과 종료일이 정해져 있을 경우 서비스 일정에 맞추어 작업을 진행합니다. 만일 작업이 불가능한 상황일 경우, 빠른 시일내에 취소 또는 일정조정 등의 응대를 진행해야 합니다. 미응대로 인해 구매자에게 피해가 발생할 경우, 그 책임은 디자이너에게 있으며 홈리에종은 이를 책임지지 않습니다.<br>';
  temp_string += '④ 디자이너가 상품을 등록 시 배송비를 구매자 부담으로 기재하면서 배송비 선결제를 선택하고 구매자가 이에 동의의사로 결제한 경우, 홈리에종이 환불(반품의 경우)하는 서비스 대금에는 선결제 발송비도 포함된 것으로 합니다.<br>';
  temp_string += '⑤ 홈리에종은 결제대금 관련 안전결제서비스만을 제공합니다. 디자이너는 그 외 서비스의 발송, 반품, A/S 등에 관련한 사항은 항상 구매자와 협의하여 진행해야 하며, 홈리에종은 디자이너와 구매자간의 거래에 관여하지 않습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제22조 서비스 구매규정</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 구매자는 홈리에종이 제공하는 서비스 화면에서 구매하여야 합니다. 구매에 대하여는 ㅓ비스 이용료가 부과되지 않습니다.<br>';
  temp_string += '② 구매방법<br>';
  temp_string += '구매자는 홈리에종 웹사이트에서 태그클라우드, 포트폴리오리스트, 디자이너리스트 등을 통해 상품을 찾고 상품의 세부내역을 확인할 수 있습니다.<br>';
  temp_string += '구매자는 포트폴리오 상세페이지의 ‘문의하기’를 통해 디자이너에게 문의할 수 있습니다.<br>';
  temp_string += '구매자는 디자이너의 답변을 검토 후 구매의사가 있을 때에 한하여 신중히 구매 하여야 합니다.<br>';
  temp_string += '홈리에종에서 구매를 진행하기 위해서는 회원가입이 필요합니다.<br>';
  temp_string += '③ 구매과정<br>';
  temp_string += '구매자는 결제종료 후 문자, 메일(E-mail), ‘홈리에종 홈페이지 – 개인페이지 – 구매내역’에서 결제여부를 확인할 수 있습니다.<br>';
  temp_string += '구매된 서비스를 디자이너가 시작하기 전에는 구매자의 취소가 가능하며 취소시기에 따라 취소수수료가 부과될 수 있습니다. 서비스가 시작된 이후에는 일방적인 취소가 불가능하며 디자이너와의 협의를 통해 환불금액의 결정 및 환불요청을 할 수 있습니다.<br>';
  temp_string += '유형의 상품을 발송 받아야 할 경우 주문사항, 물품 수령지 정보를 정확히 기재하여야 하며 미기재 또는 오기로 인한 불이익은 구매자가 부담합니다.<br>';
  temp_string += '④ 구매자는 결제 시 작업 전 요청사항에 대해 성실히 응답해야 하며, 이를 확인하지 못하여 발생된 손해에 대해서는 구매자 본인에게 책임이 있습니다.<br>';
  temp_string += '⑤ 미성년자인 회원이 법정대리인의 동의없이 서비스를 구매하는 경우 본인 또는 법정대리인이 이를 취소할 수 있습니다. 이 경우 디자이너는 해당 구매를 취소하여야 합니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제23조 안전결제서비스</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 중개서비스를 제공하는 과정에서 대금의 수령, 보관 및 송금업무로 이루어지는 에스크로 방식의 안전결제서비스를 제공합니다. 이러한 안전결제서비스는 중개서비스를 통하여 이루어지는 회원 상호간의 거래의 안전성과 신뢰성을 도모하고 구매자를 보호하기 위한 목적에서 제공하는 장치이므로 홈리에종이 안전결제서비스를 통하여 디자이너 또는 구매자를 대리, 대행하거나 그 이행을 보조하는 것은 아닙니다.<br>';
  temp_string += '② 홈리에종이 제공하는 안전결제서비스는 기본적인 중개서비스에 포함됩니다. 회원이 안전 결제 서비스를 통하지 않는 직거래를 유도하는 경우, 홈리에종은 주문취소, 판매중지, 이용제한, 이용계약 해지 등 기타 필요한 조치를 취할 수 있습니다.<br>';
  temp_string += '③ 안전결제서비스의 일환으로 이루어지는 대금보관으로 인하여 홈리에종이 취득하는 이자 등은 서비스 제공의 대가이므로 회원은 홈리에종에 대하여 이자 등의 반환을 청구할 수 없고, 대금 송금(실시간계좌이체)으로 인하여 발생하는 수수료는 대금을 송금하는 회원이 부담하여야 합니다.<br>';
  temp_string += '④ 홈리에종이 제공하는 안전결제서비스를 이용하지 않은 거래 또는 안전결제서비스가 종결된 거래의 경우 해당 거래와 관련하여 발생한 모든 사항은 디자이너와 구매자가 상호협의를 통해 해결하여야 합니다.<br>';
  temp_string += '⑤ 디자이너는 홈리에종이 제공하는 서비스를 이용함에 있어서 안전결제서비스의 이용과 그 규칙에 동의하여야 합니다.<br>';
  temp_string += '⑥ 홈리에종이 제공하는 안전결제서비스를 오용/악용함으로써 사회질서, 미풍양속을 해치거나 해칠 우려가 있다고 판단되는 경우 또는 홈리에종이 안전결제 서비스를 제공하지 못할 상황 또는 사유가 발생하는 경우 홈리에종은 서비스 판매를 제한할 수 있습니다.<br>';
  temp_string += '⑦ 안전결제서비스를 이용함에 있어 회원은 다음에 기재한 사유가 발생하지 않도록 유의하여야 합니다.<br>';
  temp_string += '카드의 미서명, 관리소홀, 대여, 양도, 보관, 이용위임, 담보제공, 불법대출 등으로 인한 부정사유 또는 위, 변조사고<br>';
  temp_string += '회원의 가족, 동거인(사실상의 동거인 포함)에 의하거나 또는 이들이 관련하여 생긴 부정사용 또는 위, 변조사고<br>';
  temp_string += '카드 비밀번호 유출로 인한 부정사용 또는 위, 변조사고<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제24조 구매자의 결제</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 구매자는 안전결제서비스에 따라 결제하여야 하고, 홈리에종은 결제정보를 지정된 양식에 따라 구매내역 화면에 표시합니다. 홈리에종에서는 신용카드, 실시간계좌이체, 간편결제로 결제가 가능합니다.<br>';
  temp_string += '② 구매자는 신용카드로 대금을 결제할 수 있습니다. 단, 해외카드를 이용한 결제는 불가능합니다.<br>';
  temp_string += '③ 실시간계좌이체 방식으로 결제하는 경우 결제금액의 오입금으로 인한 모든 위험과 책임은 구매자에게 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제25조 수정, 취소, 반품 및 교환</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 수정<br>';
  temp_string += '구매자의 결제 후 디자이너의 주문접수로 서비스가 진행중인 경우 상품상세페이지에 표기한 A/S규정에 따라 수정작업을 진행해야 하며 디자이너와 구매자간의 상호 협의 하에 수정 조건은 합의가 가능하며 홈리에종은 이제 개입하거나 책임지지 않습니다.<br>';
  temp_string += '② 취소<br>';
  temp_string += '구매자는 결제 후 서비스가 시작되기 전까지는 결제를 취소할 수 있고, 취소 시기에 따라서 취소 수수료가 발생할 수 있습니다. 결제가 완료되었으나 디자이너의 작업일정 상 작업진행이 어려울 경우 디자이너는 구매자에게 연락을 취해 일정을 조정하여 진행해야 합니다.홈리에종의 취소 및 환불규정은 아래와 같습니다.<br>';
  temp_string += '홈리에종의 취소 및 환불규정은 아래와 같습니다.<br>';
  temp_string += '가. 서비스 시작 30일 전 : 고객에게 100% 자동 환불<br>';
  temp_string += '나. 서비스 시작 22일 전 : 고객에게 90% 자동 환불<br>';
  temp_string += '다. 서비스 시작 15일 전 : 고객에게 80% 자동 환불<br>';
  temp_string += '라. 서비스 시작 8일 전 : 고객에게 70% 자동 환불<br>';
  temp_string += '마. 서비스 시작 4일 전 : 고객에게 60% 자동 환불<br>';
  temp_string += '바. 서비스 시작 3일 전부터 : 취소 불가<br>';
  temp_string += '사. 서비스 시작 후 전체 서비스 기간 중 1/2 도달 전 : 디자이너와 환불액 협의<br>';
  temp_string += '아. 서비스 시작 후 전체 서비스 기간 중 1/2 도달 이후 : 환불 불가<br>';
  temp_string += '③ 서비스 진행 후 환불<br>';
  temp_string += '서비스가 시작된 후 구매자는 일방적으로 환불절차를 진행할 수 없습니다. 구매자가 환불을 원할 경우 디자이너와 협의 후 금액이 결정되면 디자이너가 홈리에종에 환불을 요청합니다. 홈리에종에서 환불 요청사항을 확인 후 협의 금액을 구매자에게 환불합니다.<br>';
  temp_string += '가. 구매자는 서비스 시작 전 직접 취소를 요청할 수 있습니다.<br>';
  temp_string += '나. 구매자가 합당한 사유로 환불을 요청한 경우, 디자이너는 서비스 등록 시 기재한 환불규정에 기초하여 구매자의 환불요청을 수락하여야 합니다. 환불액은 홈리에종이 제공하는 서비스 시스템 방식에 따라 구매자에게 환불됩니다.<br>';
  temp_string += '④ 반품 및 교환(홈리에종과 디자이너가 함께 기획한 프로모션 상품 판매의 경우)<br>';
  temp_string += '구매자는 발송일로부터 서비스를 수령한 후 7일 이내까지(상품상세페이지에 그 이상의 기간이 게시되어 있는 경우는 그 기간내에) 홈리에종에 반품 또는 교환을 요청할 수 있습니다.<br>';
  temp_string += '구매자의 귀책사유로 물품이 훼손된 경우(내용확인을 위한 포장훼손은 제외) 사용이나 일부 소비로 인하여 물품의 가치가 현저히 감소한 경우, 복제 가능한 물품의 포장을 훼손한 경우, 주문에 따라 개별적으로 생산되는 물품 등 디자이너에게 회복할 수 없는 중대한 피해가 예상되는 경우로서 사전에 해당 거래에 대하여 별도로 그 사실을 고지하고 구매자의 동의를 받은 경우와 기타 법령에 의하여 반품이 제한되어 있는 경우에는 예외로 합니다.<br>';
  temp_string += '교환은 1회에 한하여 허용됩니다. 다만, 물품 판매 시 교환의 제한을 명시적으로 고지한 경우, 교환 신청 시 교환할 재고가 없는 경우에는 해당 교환 신청은 반품으로 처리되며 해당 거래건은 취소처리 됩니다.<br>';
  temp_string += '⑤ 반품 및 교환(디자이너 상품의 경우)<br>';
  temp_string += '구매자는 발송일로부터 서비스를 수령한 후 7일 이내까지(상품상세페이지에 그 이상의 기간이 게시되어 있는 경우는 그 기간내에) 디자이너에게 반품 또는 교환을 요청할 수 있습니다.<br>';
  temp_string += '구매자의 귀책사유로 물품이 훼손된 경우(내용확인을 위한 포장훼손은 제외),사용이나 일부 소비로 인하여 물품의 가치가 현저히 감소한 경우, 시간이 지나 재판매가 곤란할 정도로 물품의 가치가 현저히 감소한 경우, 복제가능한 물품의 포장을 훼손한 경우, 주문에 따라 개별적으로 생산되는 물품 등 디자이너에게 회복할 수 없는 중대한 피해가 예상되는 경우로서 사전에 해당거래에 대하여 별도로 그 사실을 고지하고 구매자의 동의를 받은 경우와 기타 법령에 의하여 반품이 제한되어 있는 경우에는 예외로 합니다.<br>';
  temp_string += '구매자는 수정/교환/반품하고자 하는 경우 즉시 수정/교환/반품 통지를 하고, 수령한 물품은 반환하여야 하며, 홈리에종에 대하여는 해당 서비스 화면에 의사를 표시하여야 합니다. 이 경우 홈리에종은 서비스대금의 정산을 보류합니다. 다만, 홈리에종은 구매자가 수정/교환/반품을 요청한 경우에도 위의 교환/반품이 제한되는 사유가 있음이 입증된 경우에는 디자이너에게 서비스 대금을 정산할 수 있습니다.<br>';
  temp_string += '교환/반품 시 소요되는 배송비는 교환/반품의 원인을 제공한 자가 부담함을 원칙으로 합니다.<br>';
  temp_string += '구매자는 홈리에종의 안전결제서비스가 종료한 이후에도 관련법령에 따라 반품을 행할 수 있습니다. 이 경우, 구매자는 디자이너에게 직접 반품에 따른 환불요청을 하여야 하고 홈리에종은 이에 대하여 개입하거나 책임지지 않습니다.<br>';
  temp_string += '이 약관에 규정된 홈리에종의 안전결제서비스가 종료한 후 홈리에종의 중개서비스를 통하여 거래된 물품의 하자, 반품, 환불 등과 관련하여 디자이너와 구매자, 운송업체, 금융기관 등의 사이에 분쟁 등이 발생한 경우 관련 당사자간에 해결하여야 하고, 홈리에종은 이에 대하여 관여하지 않으며 어떠한 책임도 부담하지 않습니다.<br>';
  temp_string += '디자이너의 귀책사유로 다수의 취소 및 반품이 발생하는 경우, 동일 중분류 카테고리 내 타 물품보다 취소, 반품 비율이 현저히 높은 경우에는 홈리에종은 디자이너에게 판매제한, 서비스 및 동시작업 가능개수 제한 등의 패널티를 부과할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제26조 디자이너 정산</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 디자이너와 구매자 사이에 합의된 서비스 기간이 종료되면, 홈리에종에서는 디자이너에게 대금을 정산하게 됩니다. 대급지급 후에 발생하는 A/S등은 구매자와 디자이너가 직접 연락하여 해결하여야 합니다.<br>';
  temp_string += '② 정산 과정<br>';
  temp_string += '디자이너와 구매자 사이에 합의된 서비스 기간이 종료되면 디자이너는 홈리에종에세 세금계산서를 발행합니다.<br>';
  temp_string += '홈리에종은 디자이너가 디자이너 신청시 선택한 사업자구분에 따른 정산방식에 따라 디자이너에게 정산액을 송금합니다.<br>';
  temp_string += '홈리에종은 디자이너의 판매내역, 정산내역을 ‘홈리에종 홈페이지 – 디자이너페이지 – 정산내역’ 화면을 통하여 통보합니다.<br>';
  temp_string += '홈리에종은 이 약관의 서비스등록양식에 어긋난 등록, 허위등록, 판매가장등록, 신용카드 결제시스템 또는 통신과금시스템만을 이용하기 위한 서비스등록 여부를 확인하기 위해 최고 60일짜지 출금을 보류할 수 있습니다. 이 경우, 디자이너가 서비스 판매에 관한 거래사실 증빙서류를 홈리에종에 제공하는 때에는 확인 후 송금처리를 합니다.<br>';
  temp_string += '③ 디자이너는 홈리에종에 디자이너 신청 시 수익금을 수령할 계좌를 지정하여야 하며, 홈리에종이 정하는 바에 따라 계좌를 변경할 수 있습니다. 디자이너가 지정한 입금계좌의 예금주는 디자이너와 동일인(개인 회원의 경우 가입자 본인 명의, 사업자회원의 경우 대표자 혹은 사업장 명의)임을 원칙으로 합니다. 디자이너가 지정한 입금계좌의 예금주가 디자이너 가입정보와 상이한 경우 출금이 불가능하며 해당 조건에 맞는 계좌 관련 서류증빙이 완료될 때까지 물품대금의 송금을 보류할 수 있습니다.<br>';
  temp_string += '④ 홈리에종은 디자이너가 매매부적합서비스를 판매한 것으로 확인되거나 합리적인 의심이 있는 경우 최고 90일까지 물품대금의 송금을 보류하고 매매대금의 입출금을 중개하지 않을 수 있습니다.<br>';
  temp_string += '⑤ 홈리에종은 부가가치세법 제35조, 시행령 제86조에 따라 디자이너의 분기별 매출명세를 국세청으로 자료전송을 합니다. 홈리에종은 세무적인 내용에 대하여 개입하거나 책임지지 않습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제27조 서비스 이용료</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 서비스 이용료는 서비스를 이용하는데 따른 대가로 디자이너가 홈리에종에 지급해야 하는 금액을 의미합니다. 홈리에종은 구매자로부터 예치받은 금액에서 서비스 이용료와 카드 결제 수수료를 공제하고 디자이너에게 정산합니다.<br>';
  temp_string += '② 서비스 이용료는 판매가(디자이너가 정한 상품가격)에서 부가가치세 10%를 제외한 금액인 공급원가에 홈리에종이 정한 비율(서비스 이용료율)을 곱한 금액으로 합니다.<br>';
  temp_string += '③ 홈리에종은 필요한 경우 서비스이용료를 신설/변경할 수 있으며, 신설/변경사항은 홈리에종이 제공하는 서비스화면을 통하여 신설/변경 사실을 공지하고, 디자이너와의 개별 약관에 따라 상세 내용을 공지합니다. 홈리에종은 판매 활성화 등을 위하여 서비스이용료 범위 내에서 특정 서비스에 대한 서비스 이용료를 할인할 수 있습니다. 또한 홈리에종은 특정 디자이너에 대한 서비스이용료를 서비스의 성격/판매실적/회원의 특성 등 홈리에종이 정하는 일정한 기준과 절차에 따라 조정 또는 면제할 수 있습니다. 특정 디자이너에 대한 서비스 이용료의 조정 또는 면제 시 홈리에종은 미리 그에 관한 주요 사항을 대상자에게 고지 또는 약정할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제28조 신용점수 평가제도</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 구매자는 해당 거래에 대한 만족도를 홈리에종이 정한 단계별로 표시할 수 있으며, 리뷰를 작성할 수 있습니다. 표시된 만족도와 리뷰는 해당 서비스 디자이너의 신용점수 평점에 반영됩니다.<br>';
  temp_string += '② 거래 상대방에 대한 거래만족도 평가와 리뷰 작성은 전적으로 평가 당사자의 책임 하에 이루어지며, 홈리에종은 내용의 사실 여부에 개입하지 않습니다.<br>';
  temp_string += '③ 작성된 만족도와 리뷰는 공개를 원칙으로 합니다. 구매자는 자신이 작성한 만족도와 리뷰를 삭제요청 할 수 있습니다. 다만, 다수의 구매자의 편의를 위해 공개된 상품평의 삭제는 제한될 수 있습니다. 리뷰의 내용이 욕설, 비방, 명예훼손 등의 내용이거나 평가와 무관한 내용을 담고 있어 공개가 부적절하다고 판단되면, 홈리에종은 해당 리뷰를 삭제할 수 있습니다. 다만 서비스에 대한 불만, 디자이너에게 불리한 내용이라는 이유만으로는 삭제하지 않습니다. 이와 관련한 자세한 내용은 본 이용약관과 해당 서비스 화면에 게재합니다.<br>';
  temp_string += '④ 구매자가 평가제도의 목적과 취지에 어긋나는 행위를 하면 홈리에종은 해당 평가결과를 삭제하고 관련 회원에 대한 서비스 이용자격을 정지하는 등 제재를 가할 수 있습니다.<br>';
  temp_string += '만족도를 높이려는 목적으로 평가하는 행위<br>';
  temp_string += '높은 만족도를 주고 리뷰를 쓰는 대가로 금전 또는 기타의 보상을 받거나 받기로 약정하고 이루어진 평가결과 및 그 평가행위<br>';
  temp_string += '리뷰를 통하며 타인을 모욕하거나 타인의 명예와 신용을 훼손하는 등의 행위 및 그 평가결과<br>';
  temp_string += '기타 디자이너 평가제도의 목적과 취지에 반하여 평가제도를 이용하는 행위<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제29조 서비스의 중단</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종은 컴퓨터 등 정보통신설비의 점검, 보수, 교체 및 고장, 통신의 두정 등의 사유가 발생하면 서비스를 일시적으로 중단할 수 있으며 그럴 경우 서비스 일시 중단 사실과 그 사유를 사이트 초기화면에 통지합니다.<br>';
  temp_string += '② 홈리에종은 천재지변 또는 이와 같은 불가항력으로 서비스를 제공할 수 없을 떄 서비스의 제공을 제한하거나 일시 중단할 수 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제30조 저작권, 지식재산권 관련</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 회원이 작성한 게시물의 저작권은 회원에게 있으며 게시물의 저작권 침해를 비롯한 민형사상 모든 책임은 회원 본인이 집니다.<br>';
  temp_string += '② 홈리에종은 회원이 등록한 게시물을 검색사이트나 다른 사이트에 노출할 수 있으며 판촉, 홍보 및 기타의 자료로 무상으로 사용할 수 있습니다. 또한 홈리에종은 제공하는 서비스 내에서 회원 게시물을 복제, 전시, 전송, 배포할 수 있으며 2차적 저작물과 편집저작물로 작성 할 수 있습니다. 다만 해당 게시물을 등록한 회원이 게시물의 삭제 또는 사용중지를 요청하면 홈리에종은 관련 법률에 따라 보존해야하는 사항을 제외하고 즉시 삭제 또는 사용을 중지합니다.<br>';
  temp_string += '③ 위에서 언급한 홈리에종의 사용권은 서비스를 운영하는 동안에만 확정적으로 유효합니다.<br>';
  temp_string += '④ 회원은 서비스 내에서 자신의 저작권이 침해되면 홈리에종에 신고하여 자신의 정당한 권리를 보호받을 수 있습니다.<br>';
  temp_string += '⑤ 홈리에종과 디자이너가 공동기획한 물품(서비스)의 지식재산권은 별도의 합의가 없는 한 공동소유로 합니다. 이 경우 디자이너는 홈리에종의 서면 동의 없이는 다른 곳에서 해당 물훔(서비스)를 공급할 수 없습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제31조 손해배상</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종 또는 홈리에종의 피고용인, 대리인, 기타도급 및 위임 등으로 홈리에종을 대신하여 이용계약을 이행하는 자의 책임있는 사유로 이용계약의 이행과 관련하여 회원에게 손해가 발생한 경우, 홈리에종은 회원에게 발생한 손해를 배상할 책임이 있습니다.<br>';
  temp_string += '② 회원 또는 회원의 피고용인, 대리인, 기타 도급 및 위임 등으로 회원을 대신하여 이용계약을 이행하는 자의 책임 있는 사유로 이용계약의 이행과 관련하여 홈리에종에게 손해가 발생한 경우, 회원은 홈리에종에게 발생한 손해를 배상할 책임이 있습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제32조 홈리에종의 면책</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '① 홈리에종이 통신판매중개자로서 회원들에게 제공하는 서비스는 온라인 거래장소, 안전한 결제 수단, 기타 부가정보를 제공함에 그치는 것이므로 중개서비스를 통하여 이루어지는 회원 상호간의 거래와 관련된 서비스 판매진행의 관리, 구매자에 대한 거래이행, 서비스발송, 취소 또는 반품, 분쟁해결 등 필요한 사후처리는 거래당사자인 회원들이 직접 수행하여야 합니다. 홈리에종은 홈리에종의 고의 또는 중과실이 없는 한 이에 대하여 관여하지 않으며 어떠한 책임도 부담하지 않습니다.<br>';
  temp_string += '② 홈리에종은 천재지변 또는 이에 준하는 불가항력, 정보통신설비의 보수점검, 교체 또는 고장, 통신의 두절 등으로 인하여 일시적 또는 종국적으로 서비스를 제공할 수 없는 경우, 홈리에종의 고의 또는 중과실이 없는 한 서비스 제공에 관한 책임이 면제됩니다. 이경우 홈리에종은 홈리에종이 제공하는 사이트 화면에 게시하거나 기타의 방법으로 회원들에게 통지합니다.<br>';
  temp_string += '③ 홈리에종은 서비스 구매자 또는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.<br>';
  temp_string += '④ 홈리에종은 중개서비스를 통하여 거래되는 서비스의 하자, 서비스등록정보의 오류, 미비 등으로 인하여 회원이 입는 손해에 대해서는 홈리에종의 고의 또는 중과실이 없는 한 책임(제조물책임 포함)을 지지 않습니다.<br>';
  temp_string += '⑤ 홈리에종은 회원이 게재한 정보, 자료, 사실의 허위성, 위법성이 객관적으로 확인된 경우를 제외하고 서비스 화면에 표시되는 정보 등의 정확성, 안정성, 타당성 등을 보증하지 않으며, 그와 관련하여 홈리에종의 고의 또는 중과실이 없는 한 홈리에종은 책임지지 않습니다.<br>';
  temp_string += '⑥ 홈리에종은 피연결 회사(홈리에종의 서비스 화면과 링크 등으로 연결된 사이트를 운영하는 회사를 말합니다)는 독자적으로 운영되며, 홈리에종은 피연결 회사와 회원간에 이루어진 거래에 대하여는 책임을 지지 않습니다.<br>';
  temp_string += '⑦ 모바일에서의 거래는 진행되지 않습니다.<br>';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">제33조 준거법 및 분쟁의 해결</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '이 약관과 홈리에종과 회원간의 이용계약, 회원 상호간의 물품거래에 대해서는 대한민국 법령이 적용되며, 홈리에종과 회원 사이, 회원 각자 사이 분쟁의 해결은 대한상사중재원의 중재(신속처리절차)로 해결합니다<br>';
  temp_string += '<br>';
  temp_string += '이 약관은 2017년 11월부터 시행합니다.<br>';
  temp_string += '</p>';
  arr.push(temp_string);

  temp_string = '';
  temp_string += '<h1 class="termsh1">FAQ</h1>';
  temp_string += '<div class="termsgreenbar termsgreenbara2"></div>';
  temp_string += '<h3 class="termsh3">Q. 홈리에종은 어떤 서비스인가요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종은 고객님의 예산 / 취향 / 공간 / 생활특징을 종합적으로 이해하고 그에 맞는';
  temp_string += '홈스타일링 서비스와 디자이너를 추천하여 연결해줍니다. 연결된 디자이너는 홈리에종의 종합적인';
  temp_string += '정보와 지원을 받아 고객님의 집을 전담하여 시공부터 가구, 소품의 스타일링까지 맡게 됩니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 홈스타일링이 무엇인가요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈스타일링이란 시공 위주인 리모델링과 달리 고객님의 전체 예산 내에서 기능, 디자인적으로';
  temp_string += '필요한 만큼 시공하고 마감, 가구, 패브릭, 소품 등으로 공간을 꾸미는 것에 집중하는 방식을';
  temp_string += '의미합니다. 불필요한 공사가 없어 비용이 절약되는 동시에 실제 디자인은 더 예쁘게 나온답니다!';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 홈리에종 서비스는 어떻게 진행되나요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종의 진행방식은 큐레이션을 통한 디자이너 제안과 디자이너 선택을 기반으로 시작됩니다.';
  temp_string += '매칭된 디자이너가 고객님을 전담하여 스타일링을 진행하는 동안 홈리에종은 프로세스 트레킹을';
  temp_string += '통한 시공팀 연계를 진행해드리고, 각종 지원과 중재를 담당합니다. 정산도 확실히 보증해 드리죠!';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 포트폴리오는 무엇인가요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종에는 다채로운 개성의 디자이너들이 활동하고 있고, 디자이너가 직접 작업한 포트폴리오가';
  temp_string += '모여있습니다. 고객은 포트폴리오를 통해 다양한 스타일을 접할 수 있고, 내 취향에 맞는 디자이너를';
  temp_string += '찾을 수 있습니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 전문 디자이너가 필요한 이유</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '인테리어는 혼자서 해결하기엔 벅찬 의사결정의 과정이 많습니다. 실제로 수많은 단계와 다양한';
  temp_string += '관계자를 거쳐야 합니다. 디자이너는 전문적인 지식을 기반으로 시공, 가구, 소품, 패브릭까지 고객';
  temp_string += '상황에 맞추어 풀어갑니다. 한 명의 디자이너가 전 과정에 관여해서 전담해야 하는 이유입니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 집을 꾸미는 전체 예산은 어떻게 구성되나요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '집을 꾸미는 예산항목은 크게 세가지 요소로 구성됩니다.';
  temp_string += '1. 첫번째는 디자인비입니다. 집을 완성하기 위해 들어가는 컨설팅, 디자인 용역, 디자인 결과에 지불하시는 금액입니다.';
  temp_string += '2. 두번째는 시공비입니다. 시공시 사용하는 마감재와 부자재, 인건비, 기타 잡비로 구성됩니다.';
  temp_string += '3. 세번째는 제품구매 비용입니다. 가구, 패브릭, 조명, 소품 등의 제품 구매비용으로, 실비입니다. 디자이너가 예산에 맞춰 제안드리지만, 고객님께서 어떤 제품을 선택하냐에 따라 달라집니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 스타일링을 받기전, 디자인비를 결제 해야하나요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '디자인비를 홈리에종에 입금하시면, 스타일링 서비스가 진행됩니다. 디자인비는 프로젝트가 완료된';
  temp_string += '후에 디자이너에게 정산됩니다. 고객과 디자이너 양측을 위해 보증하는 홈리에종의 서비스로,';
  temp_string += '고객의 경우 입금 후에도 끝까지 충분한 서비스를 받으실 수 있고, 디자이너의 경우 서비스를 제공한';
  temp_string += '후 적절한 때에 정산을 받을 수 있게됩니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 디자인비가 얼마죠?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '디자인비는 집 상태와 서비스 제공의 정도, 어떤 디자이너와 진행하는지에 따라 다르게 책정됩니다.';
  temp_string += '평당 금액으로 책정되며, 5-15만원까지 다양합니다.';
  temp_string += '그리고 계약금은 디자인비에 포함되는 금액입니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 디자인 비용이 합리적인 이유</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종은 ‘디자인비’를 먼저 받는 방식으로 진행됩니다. 어쩌면 디자인비를 내는 것이 낯설 수도';
  temp_string += '있어요! 하지만 시행착오를 방지해주고, 업체와의 제휴관계를 이용해 할인을 받을 수 있어 오히려';
  temp_string += '총 지출은 줄어들게 됩니다. 인테리어의 결과도 일관되게 나오니, 일석이조인 셈이죠.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 시공이 있을 경우, 시공팀은 어떻게?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '시공이 필요한 홈스타일링의 경우, 홈리에종에서는 고객님께 시공사를 선택하실 수 있는 선택권을';
  temp_string += '드립니다. 고객님께서 시공사를 직접 알아보시는 방법도 있지만, 홈리에종이 제안드리는 믿을 수 있';
  temp_string += '는 시공사를 선택하실 것을 권장해드립니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 시공 견적을 미리 받아볼 수 있나요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '구체적인 시공견적은 디자이너와의 미팅 후에 받아보실 수 있습니다. 시공을 어느정도 하는지,';
  temp_string += '집이 어떤 상태인지, 어떤 마감재를 쓰는지, 마감재에 따라 시공하는 인력의 수준도 달라지고 그에';
  temp_string += '따라 견적금액도 달라지기 때문입니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 홈리에종이 제안하는 시공팀과 진행하면 싸게 할 수 있나요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '하고싶은 공사를 다하고 제일 싸게 하고싶다! 라고 생각하시는 고객님은 홈리에종/디자이너가';
  temp_string += '제안드리는 시공팀을 선택하시는 것이 적절하지 않습니다. 홈리에종에서는 기능적, 디자인적으로';
  temp_string += '필요한만큼만 시공하실 수 있도록 범위를 조정함으로 예산 사용을 효율적으로 하실 수 있도록';
  temp_string += '도와드립니다. (물론 디자이너가 조정해 드리지만 고객님께서 꼭 하고 싶다고 생각하시면 진행';
  temp_string += '가능합니다.) 또한, 홈리에종에서는 저렴하기만한 시공사는 제안드리지 않습니다. 고객과 디자이너';
  temp_string += '의 디자인 요구를 구현해 줄 수 있고, 시공력이 좋고, A/S가 잘 되면서 합리적인 견적을 제안하는';
  temp_string += '팀을 추천드립니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 온라인 스타일링은 어떤 것인가요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '디자이너와의 미팅 없이 카톡/전화/이메일 등으로 커뮤니케이션하면서 디자인을 완성해갑니다.';
  temp_string += '시공이 없고, 고객분께서 협조해주실 수 있을 경우 온라인 스타일링을 추천드리는데요! 오프라인';
  temp_string += '서비스에 비해 저렴하지만 그만큼 협력을 잘 해주시면 만족스러운 결과물을 얻으실 수 있습니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 온라인시 미팅이 없어도 괜찮은가요?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '원칙적으로 온라인 스타일링에는 미팅이 없으나 디자이너의 방문가능 지역에 거주하신다면,';
  temp_string += '디자이너와의 현장 미팅 1회 진행 후 온라인으로 진행하시는 것도 좋은 방법입니다. 단, 미팅 비용은';
  temp_string += '별도로 청구됩니다.';
  temp_string += '</p>';
  temp_string += '<h3 class="termsh3">Q. 홈리에종에서 디자이너로 활동하려면?</h3><br>';
  temp_string += '<p class="termparagraph">';
  temp_string += '홈리에종에서 디자이너로 활동하시려면, 홈리에종 웹사이트 하단의 \'디자이너 신청하기\' 버튼을';
  temp_string += '눌러주세요! 홈리에종에서 요청하는 양식에 따라 정확하고 꼼꼼하게 기입해주신 후 작성완료 버튼을';
  temp_string += '클릭하시면 디자이너 신청은 완료됩니다. 홈리에종에서 내용 확인 후 연락드립니다.';
  temp_string += '</p>';
  arr.push(temp_string);

  return arr;
}

PaymentJs.policy = function () {
  var text = '';
  text += "<b>개인정보 처리 방침</b><br><br><b>제1조 총칙</b><br><br>① 개인정보라 함은 생존하고 있는 개인에 관한 정보로써 성명, ";
  text += "주민등록번호 및 영상 등을 통하여 개인을 알아볼 수 있는 정보(해당 정보만으로는 특정 개인은 알아볼 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 것을 포함한다)를 말합니다.<br>";
  text += "② 개인정보 처리방침이란 회원의 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 홈리에종을 운영함에 있어 준수해야 할 지침을 의미합니다.<br>③ 홈리에종은 ‘정보통신망 ";
  text += "이용촉진 및 정보보호에 등에 관한 법률’과 ‘개인정보 보호법’ 및 관련 법령에 따라 개인정보 보호규정을 준수합니다.<br>④ 홈리에종은 회원(디자이너, 구매자)의 동의를 기반으로 개인정보를 수집, 이용 및 제공하고 있으며 회원의 권리(개인정보 자기결정권)를 적극적으로 보장합니다.";
  text += "<br>⑤ 개인정보 처리방침은 회원이 언제나 쉽게 열람할 수 있도록 홈리에종 웹사이트에 게시하며 개인정보 관련법령, 지침, 고시 또는 홈리에종의 서비스 정책의 변경에 따라 달라질 수 있습니다.<br><br><b>제2조 개인정보의 수집항목 및 목적</b><br><br>";
  text += "① 모든 회원은 홈리에종이 제공하는 다양한 서비스를 이용할 수 있습니다. 홈리에종이 처리하고 있는 개인정보는 다음의 수집/이용 목적 이외의 용도로는 활용되지 않으며, 수집/이용목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등의 필요한 조치를 이행합니다.";
  text += "<br>② 회원의 인권을 침해할 우려가 있는 민감한 정보(인증, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는 수집하지 않으며, 만약 법령에서 정한 의무가 따라 불가피하게 수집하는 경우에는 반드시 회원에게 사전동의를 받습니다.<br>③ 홈리에종은 다음과 같이 회원의 ";
  text += "개인정보를 수집합니다.<br>④ 회원 가입시, 문의사항 작성시 : User name, E-mail, 비밀번호 이용자 식별을 통한 이용계약 이행 및 회원 상호간 계약체결을 위한 지원(문의사항에 대한 답변, 계약이행을 위한 연락, 구매자와 디자이너간 계약체결 지원, 회원간 정보 안내 등)";
  text += "<br>⑤ 구매자 결제진행시 : 전화번호, 주소, 주거공간 특성 관련 정보(주거유형, 공간이미지, 공간면적, 주거공간 구성 등)<br>⑥ 디자이너 신청시 : 회사명, 사업자등록번호, 대표자이름, 개업일, 주소, 전화번호, 휴대전화번호, E-mail, Fax, 은행명, 예금주명, 계좌 번호 등";
  text += "디자이너 식별, 서비스 개설/제공, 각종 알림, 정산 등<br>⑦ 자동수집정보 : 기기정보, 로그정보, 위치정보, 애플리케이션번호, 로컬저장소 등 시스템 운영 관리<br>⑧ 개인정보의 이용목적<br>⑨ 회원관리 : 회원제 서비스 제공에 따른 개인식별, 가입의사 확인, 이용약관 위반 ";
  text += "회원에 대한 이용제한 조치, 가입 및 가입횟수 제한, 서비스 부정 이용 제재, 고충 처리 및 분쟁 조정을 위한 기록 보존, 고지사항 전달, 회원탈퇴 의사의 확인 등<br>⑩ 중개서비스 등 이용약관에 따른 서비스 제공(광고 포함) 및 서비스 개선 : 인구통계학적 분석, 서비스 방문 및 ";
  text += "이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등<br>⑪ 신규 서비스 개발 및 마케팅 광고에의 활용 : 신규 서비스 개발 및 맞춤 서비스 제공, 인구통계학적 ";
  text += "특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트/광고성 정보 및 참여 기회 제공 등<br>⑫ 결제 시스템 제공 : 예약 및 요금 결제, 상품 및 서비스 제공 등<br>⑬ 정보보호 : 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 환경 ";
  text += "구축 등<br><br><b>제3조 개인정보 제3자 제공</b><br><br>① 홈리에종은 원칙적으로 회원의 동의 없이 개인정보를 제3자에게 제공하지 않으며 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른 동의를 받고 있습니다.<br>② 홈리에종은 개인정보를  ‘개인정보 수집항목 ";
  text += "및 목적’에서 명시한 범위 내에서 사용하며 회원의 사전 동의 없이 개인정보 수집 이용 목적 범위를 초과하여 이용하거나 회원의 개인정보를 제공하지 않습니다.<br>③ 다만 아래와 같이 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우 제공 ";
  text += "받는 자, 제공목적, 제공정보 항목, 이용 및 보유기간 등을 회원에게 고지하여 동의를 구하거나 관련법령에 따른 경우는 예외로 합니다.<br>④ 회원이 사전에 공개 또는 제3자 제공에 동의한 경우 : 대표적으로 구매자의 개인정보를 디자이너에게 제공하는 경우, 디자이너의 ";
  text += "개인정보를 구매자에게 제공하는 경우가 제3자제공의 예입니다. 디자이너의 개인정보는 일반적으로 회원을 포함한 제3자에게 공개되며(가입시 사전에 포괄적 제3자 제공동의를 받습니다.) 구매자의 개인정보는 디자이너의 물품(서비스) 구매결제가 완료된 이후 디자이너에게 제공됩니다.";
  text += "<br>⑤ 관계법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br><br><b>제4조 개인정보 처리위탁</b><br><br>① 홈리에종은 서비스의 제공에 관한 계약을 이행하고 이용자의 편의증진 등을 위하여 개인정보를 타인에게 위탁 ";
  text += "처리할 수 있습니다. 타인에게 위탁업무를 하는 경우에는 다음의 내용을 이용자에게 알리고 동의를 받습니다. 다음의 내용에 대하여 어느 하나의 사항이 변경되는 경우에도 같습니다.<br>② 개인정보 처리위탁을 받는 자(이하 수탁자라 함)<br>③ 개인정보 처리위탁을 하는 업무의 내용";
  text += "<br>④ 홈리에종은 아래와 같이 개인정보를 위탁하고 있으며, 개인정보의 수탁자와 위탁업무의 범위는 아래와 같습니다.<br>⑤ PG사 : ㈜이니시스(결제대행 서비스 제공)<br>⑥ E-mail 및 문자 발송 : mailchimp, 알리고(서비스 운영관련 알림 및 정보 제공)<br>⑦ ";
  text += "배송대행업체 : 업체명(홈리에종이 직접 판매한 물품의 배송 위탁)<br><br><b>제5조 개인정보의 보유 및 이용기간</b><br><br>① 홈리에종은 회원의 개인정보를 원칙적으로 보유/이용기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 ";
  text += "개인정보를 파기합니다.<br>② 원으로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br>③ ";
  text += "홈리에종은 1년동안 회사의 서비스를 이용하지 않은 회원의 개인정보는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 29조’에 근거하여 회원에게 사전통지하고 개인정보를 파기하거나 별도로 분리하여 저장합니다.(회사는 개인정보가 파기되거나 분리되어 저장/관리된다는 ";
  text += "사실, 서비스 미이용기간 만료일, 해당 개인정보의 항목을 E-mail 등의 방법으로 미이용기간 30일전에 회원에게 알립니다. 이를 위해 회원은 회사에게 정확한 연락처 정보를 알리거나 수정해야 합니다.<br>④ 관련 법률에 따른 정보보유 사유는 아래와 같습니다. 서비스 결제 ";
  text += "및 정산 발생시 관련 법률에 따라 개인정보를 포함한 결제, 정산 관련 정보가 5년간 보관이 됩니다.<br>⑤ 전자상거래 등에서의 소비자 보호에 관한 법률<br>⑥ 계약 또는 청약철회 등에 관한 기록 : 5년<br>⑦ 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br>⑧ 소비자의 ";
  text += "불만 또는 분쟁처리에 관한 기록 : 3년<br>⑨ 통신비밀보호법 - 로그인 기록 : 3개월<br>⑩ 조세 관련 법령 - 매출 관련 기록 : 5년<br>⑪ 개인정보 파기절차 – 회사는 파기사유가 발생한 개인정보를 개인정보 보호책임자의 승인 절차를 거쳐 파기합니다.<br>⑫ 개인정보 ";
  text += "파기방법 – 회사는 전자적 파일형태로 기록/저장된 개인정보는 기록을 재생할 수 없도록 기술적인 방법 또는 물리적인 방법을 이용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.<br><br><b>제6조 개인정보의 수집 및 이용을 ";
  text += "거부할 권리</b><br><br>개인정보 주체는 개인정보의 수집 및 이용을 거부할 권리가 있으나, 서비스 제공을 위한 필수적인 개인정보는 그 수집이용 동의를 거부할 시 회원가입을 할 수 없습니다.<br><br><b>제7조 링크 사이트에 대한 책임</b><br><br>홈리에종은 ";
  text += "회원에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 \“개인정보처리방침\”이 적용되지 않습니다.<br><br><b>제8조 회원 및 법정대리인의 권리</b><br><br>① 회원 및 법정 대리인은 ";
  text += "언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정, 탈퇴를 요청할 수 있습니다. 다만, 이 경우 서비스의 일부 또는 전체 이용에 제한이 있을 수 있습니다.<br>② 회원 및 법정 대리인의 개인정보 조회, 수정, 탈퇴는 홈리에종 웹사이트에서 가능하며, 회사는 ";
  text += "이에 대해 지체없이 조치하겠습니다.<br>③ 회원이 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 ";
  text += "통지하여 정정이 이루어지도록 하겠습니다.<br>④ 회원은 자신의 개인정보를 최신의 상태로 유지해야 하며, 회원의 부정확한 정보 입력으로 발생하는 문제의 책인은 이용자 자신에게 있습니다.<br>⑤ 타인의 개인정보를 도용한 회원가입의 경우 회원자격을 상실하거나 관련 ";
  text += "개인정보보호 법령에 의해 처벌 받을 수 있습니다.<br>⑥ 회원은 E-mail, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.<br>⑦ 회원 또는 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 \“개인정보의 보유 ";
  text += "및 이용기간\”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.<br><br><b>제9조 개인정보의 기술적, 관리적 보호대책</b><br><br>① 회사는 회원을 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 ";
  text += "등이 되지 않도록 안전성을 확보하기 위하여 다음과 같이 기술적, 관리적 보호대책을 강구하고 있습니다.<br>② 비밀번호의 암호화 – 이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인/변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.";
  text += "<br>③ 해킹 등에 대비한 대책 - 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.<br>④ 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.<br>⑤ ";
  text += "민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전손할 수 있도록 하고 있습니다.<br>⑥ 개인정보 처리 최소화 및 교육 – 개인정보 관련 처리 담당자를 최소한으로 제한하고 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 ";
  text += "내부방침 등의 준수를 강조하고 있습니다.<br>⑦ 개인정보보호 전담담당부서 운영 – 개인정보의 보호를 위해 개인정보보호 전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견 될 경우 즉시 해결하고 바로 잡을 수 있도록 ";
  text += "최선을 다하고 있습니다.<br><br><b>제10조 개인정보보호 책임자</b><br><br>① 홈리에종은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 개인정보보호 전담담당부서를 ";
  text += "지정하고 있습니다.<br>② 개인정보보호 책임자 이름 : 박혜연 연락처 : 02-2039-2252<br>③ 회원은 서비스 이용 중 발생한 모든 개인정보와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 개인정보보호 전담 담당부서로 문의할 수 있습니다.";
  text += "홈리에종은 이용자의 문의에 대해 최대한 빠른 시간 내에 답변 및 처리합니다.<br><br><b>제11조 기타 개인정보침해에 대한 신고 및 상담</b><br><br>① 회원은 아래의 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다. 아래의 기관은 정부기관";
  text += "소속으로서, 홈리에종의 자체적인 개인정보 불만처리 또는 개인정보 피해구제 결과가 만족스럽지 않을 경우, 구체적인 도움이 필요한 경우에 문의하시면 됩니다.<br>② 개인정보침해신고센터 : http://privacy.kisa.or.kr/kor/mail.jsp (국번없이) 118<br>";
  text += "③ 개인정보분쟁조정위원회 : http://www.kopico.go.kr 02-2100-2499<br>④ 대검찰청 사이버수사과 : http://www.spo.go.kr/spo/index.jsp (국번없이) 130<br>⑤ 경찰청 사이버안전국 : http://cyberbureau.police.go.kr/index.do ";
  text += "(국번없이) 182<br><br><b>제12조 고지의 의무</b><br><br>현 개인정보 처리방침은 법령, 정부의 정책 또는 회사 내부정책 등 필요에 의하여 변경될 수 있으며, 변경시에는 개정 최소 7일전부터 홈페이지의 ‘공지사항’을 통해 고지할 것입니다. 다만, 회원에게 불리한 ";
  text += "내용으로 변경하는 경우에는 최소 30일 전에 고지합니다.";
  return text;
}
