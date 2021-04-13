const A24 = function () {
  this.title = [
    "서비스",
    "큐레이션",
  ];
  this.contents = [
    "프로젝트 결과는 고객 진단 결과에 따라 크게 달라집니다. 모든 고객은 각각 예산이 다르고 최대 가용 범위에 제한이 있어",
    "고객에 따라 <b%제공 서비스군을 다양화하고 큐레이션하는 과정이 필요%b>합니다. 이에 따라 각 군의 활동 디자이너 또한",
    "같은 기준으로 구분하여 추천하게 되며, 홈리에종의 디자이너 추천이 고객에게 실제로 와 닿았는지 피드백을 통해 지속적으로 업그레이드하고 있습니다.",
  ];
  this.diagram = [];
  this.animation = [];
}

A24.prototype.render = function () {
  return {
    mode: 0,
    title: this.title,
    contents: this.contents,
    diagram: this.diagram,
    animation: this.animation,
  };
}

module.exports = A24;