const ReviewJs = function () {
  this.mother = new GeneralJs();
}

ReviewJs.prototype.loopAjaxGet = function (from, to) {
  var me = this;
  return function () {
    GeneralJs.ajax(GeneralJs.formtoAjax(from), "./engine/Dbdbpost.php", function (data) {
      var toDom = document.getElementById(to);
      while (toDom.firstChild) { toDom.removeChild(toDom.lastChild); }
      toDom.insertAdjacentHTML("beforeend", data);
    });
  };
}

ReviewJs.prototype.launching = async function () {
  (this.loopAjaxGet("porporform", "porporid"))();
  (this.loopAjaxGet("moporporform", "moporporid"))();
}
