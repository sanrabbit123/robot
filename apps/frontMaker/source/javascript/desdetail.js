const DesdetailJs = function () {
  this.mother = new GeneralJs();
}

DesdetailJs.prototype.loopAjaxGet = function (from, to) {
  var me = this;
  return function () {
    GeneralJs.ajax(GeneralJs.formtoAjax(from), "./engine/Dbdbpost.php", function (data) {
      var toDom = document.getElementById(to);
      while (toDom.firstChild) { toDom.removeChild(toDom.lastChild); }
      if (from.slice(0, 2) !== "mo") {
        var nullset = '<div class="portliblock psero">';
        nullset += '<a href="/portdetail.php?qqq=g00">';
        nullset += '<div class="portliblock1 lazy-background" style="background-image:url(/list_image/portpg00/t2g00.jpg);mix-blend-mode:multiply;">';
        nullset += '<div class="porporporimg piho">';
        nullset += '<div class="porhoverblack"></div>';
        nullset += '<img src="/list_svg/porporpor/titlehoversero/porhovecg00.svg" class="porporporimg">';
        nullset += '</div>';
        nullset += '</div>';
        nullset += '</a>';
        nullset += '<a href="/portdetail.php?qqq=g00">';
        nullset += '<div class="portliblock2">';
        nullset += '<img src="/list_svg/porporpor/titlesero/portivecg00.svg" class="porporporimg">';
        nullset += '<div class="porporporimg pwho"></div>';
        nullset += '</div>';
        nullset += '</a>';
        nullset += '</div>';
        data = data.replace(/g00\.jpg\)\"/g, 'g00.jpg);mix-blend-mode:multiply;"');
        switch (data.match(/portliblock /g).length) {
          case 1:
            data += nullset;
            data += nullset;
            break;
          case 2:
            data += nullset;
            break;
        }
      }
      toDom.insertAdjacentHTML("beforeend", data);
    });
  };
}

DesdetailJs.prototype.launching = async function () {
  (this.loopAjaxGet("porporform", "porporid"))();
  (this.loopAjaxGet("moporporform", "moporporid"))();
}
