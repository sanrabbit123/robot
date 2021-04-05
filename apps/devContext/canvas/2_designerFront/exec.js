const data = {
  introduction: {
    desktop: [
      '안녕하세요, 디자이너 왕지연입니다.',
      '삶에서 매 순간 배경이 되어주는 여러분의 공간들을',
      '라이프 스타일과 디자인의 어울림을 통해 더욱',
      '가치 있고 소중한 공간으로 만들어 드립니다.'
    ],
    mobile: [
      '안녕하세요, 디자이너 왕지연입니다.',
      '삶에서 매 순간 배경이 되어주는',
      '여러분의 공간들을 라이프 스타일과 디자인의',
      '어울림을 통해 더욱 가치 있고',
      '소중한 공간으로 만들어 드립니다.'
    ]
  },
  methods: [ 'mth0', 'mth7' ],
  photo: { porlid: 'a76', index: 't3' },
  order: 887,
  designer: "왕지연",
};
const targets = [ "desktop", "mobile" ];
let this_ai, textBox, to;

for (let t of targets) {
  console.open(new File(this.etc.template + "/designer/" + t + "/template.ai"));
  this_ai = console.activeDocument();
  textBox = this_ai.pageItems.getByName("active");
  textBox.contents = data.introduction[t].join("\n");
  console.expandAll();
  console.saveSvg(this_ai, t);
}

this_ai = console.createDoc();
to = "name";

console.setCreateSetting({ from: "general", to, exception: { font: "sandoll700" } });
console.setParagraph({ from: data.designer, to });
console.createElements(this_ai, console.createSetting[to]);
console.fit_box();
console.expandAll();
console.saveSvg(this_ai, to);
