const A1 = function () {
  this.mother = new GeneralJs();
  this.title = [
    "서비스",
    "큐레이션"
  ];
  this.contents = [
    "프로젝트 결과는 고객 진단 결과에 따라 크게 달라집니다. 모든 고객은 각각 예산이 다르고 최대 가용 범위에 제한이 있어",
    "고객에 따라 제공 서비스 군을 다양화하고 큐레이션하는 과정이 필요합니다. 이에 따라 각 군의 활동 디자이너 또한",
    "같은 기준으로 구분하여 추천하게 되며, 홈리에종의 디자이너 추천이 고객에게 실제로 와 닿았는지 피드백을 통해 지속적으로 업그레이드하고 있습니다."
  ];
}

A1.prototype.render = function (obj) {
  const instance = this;
  const { returnHash } = this.mother;
  const { base, diagram, title, contents, index, ea } = obj;
  const { colorChip, createNode, createNodes, withOut } = GeneralJs;
  let hash, titleText, contentsText;
  let hashWidth, hashMargin;

  hashWidth = 0.92;
  hashMargin = 0.45;

  [ hash, titleText, contentsText ] = createNodes([
    {
      mother: title,
      mode: "svg",
      source: returnHash(colorChip.green),
      style: {
        position: "absolute",
        top: String(0.2) + ea,
        left: String(0) + ea,
        width: String(hashWidth) + ea,
      }
    },
    {
      mother: title,
      text: this.title,
      style: {
        position: "absolute",
        top: String(-0.35) + ea,
        left: String(hashWidth + hashMargin) + ea,
        height: String(100) + '%',
        fontSize: String(1.9) + ea,
        fontWeight: String(600),
        lineHeight: String(1.25),
      }
    },
    {
      mother: contents,
      text: this.contents,
      style: {
        position: "absolute",
        top: String(-0.3) + ea,
        left: String(0) + ea,
        height: String(100) + '%',
        fontSize: String(0.9) + ea,
        fontWeight: String(300),
        lineHeight: String(1.72),
      }
    }
  ]);

  return base;
}

module.exports = A1;
