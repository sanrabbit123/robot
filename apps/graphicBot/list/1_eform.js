module.exports = function (proid) {
  return [
    "https://eform.io/signin",
    "wait_3000",
    [ 1048, 654, 500 ],
    [ 389, 134, { x: 703, y: 135, color: "#ffffff" } ],
    [ 1749, 465, { x: 682, y: 130, color: "#ffffff" } ],
    [ 989, 694, { x: 1126, y: 496, color: "#ffffff" } ],
    function () {
      const map = [
        { id: "field_TEXT_5faa618f9da73962a9050ef4", value: "배창규" }
      ];
      let target;

      for (let { id, value } of map) {
        target = document.getElementById(id);
        target.value = value;
      }
      
    }
  ];
};
