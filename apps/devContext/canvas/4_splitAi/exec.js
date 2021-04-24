// console.splitAi(process.cwd() + "/temp/target.ai", true);

const thisAi = console.createDocument();
const rect = thisAi.artboards[0].artboardRect;
const rectangle = console.rectangle({
  top: 0,
  left: 0,
  width: console.convertMillimeters(297),
  height: console.convertMillimeters(210),
  stroke: null,
  fill: "#2fa678",
  radius: null,
});

thisAi.artboards.add(rectangle.geometricBounds);
thisAi.artboards.remove(0);
rectangle.remove();

let tempRect;

thisAi.artboards[0].name = "a1";
thisAi.layers[0].name = "svg";
tempRect = console.rectangle({
  top: 0,
  left: 0,
  width: console.convertMillimeters(20),
  height: console.convertMillimeters(210),
  stroke: null,
  fill: "#2fa678",
  radius: null,
});
tempRect.guides = true;
tempRect = console.rectangle({
  top: 0,
  left: 0,
  width: console.convertMillimeters(297),
  height: console.convertMillimeters(24),
  stroke: null,
  fill: "#2fa678",
  radius: null,
});
tempRect.guides = true;
tempRect = console.rectangle({
  top: 0,
  left: console.convertMillimeters(297 - 20),
  width: console.convertMillimeters(20),
  height: console.convertMillimeters(210),
  stroke: null,
  fill: "#2fa678",
  radius: null,
});
tempRect.guides = true;
tempRect = console.rectangle({
  top: console.convertMillimeters(210 - 24) * -1,
  left: 0,
  width: console.convertMillimeters(297),
  height: console.convertMillimeters(24),
  stroke: null,
  fill: "#2fa678",
  radius: null,
});
tempRect.guides = true;
