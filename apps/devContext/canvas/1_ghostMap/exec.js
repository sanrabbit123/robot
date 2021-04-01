const this_ai = console.createDoc();
const mainMatrix = data.matrix();
let matrix, target, from, to, option;
let pastDom, dom;
let allText;

from = "general";
to = "box";
option = {
  fontSize: 8.5,
  leading: 15,
  justification: "left"
};
pastDom = null;
margin = 50;

for (let z = 0; z < mainMatrix.length; z++) {
  matrix = mainMatrix[z].convertString();
  for (let j = 0; j < matrix.length; j++) {
    target = matrix[j];
    for (let i = 0; i < target.length; i++) {
      console.setCreateSetting({ from: "general", to: to + String(i), exception: option });
      console.setParagraph({ from: target[i], to: to + String(i), });
      dom = console.createElements(this_ai, console.createSetting[to + String(i)]);
      if (pastDom !== null) {
        dom.left = console.return_left(pastDom) + console.return_width(pastDom) + margin;
      }
      pastDom = dom;
    }
  }
}

allText = this_ai.pageItems;
for (let i = 0; i < allText.length; i++) {
  if (allText[i].createOutline !== undefined) {
    allText[i].createOutline();
  }
}

// console.fit_box();
// console.doScript("expandall", "contents_maker");
// console.saveSvg(this_ai, ("title" + String(obj.order)), true);
