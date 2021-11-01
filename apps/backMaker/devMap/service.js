module.exports = {
  main: function (kind = "service") {
    if (kind !== "service" && kind !== "checklist") {
      throw new Error("invaild kind");
    }
    let dummy;
    if (kind === "service") {
      dummy = {
        structure: {
          serid: "",
          key: "",
          date: new Date(),
          kind,
          setting: {
            coordinates: {
              x: {
                M: "mini",
                B: "basic",
                P: "premium"
              },
              y: {
                homeFurnishing: "홈퍼니싱",
                homeStyling: "홈스타일링",
                totalStyling: "토탈 스타일링",
                extraStyling: "엑스트라 스타일링"
              },
              z: {
                online: "온라인",
                offline: "오프라인"
              },
            },
            period: 0,
          },
        }
      };
    } else if (kind === "checklist") {
      dummy = {
        structure: {
          serid: "",
          key: "",
          date: new Date(),
          kind,
          setting: {
            target: {
              collection: "",
              action: "",
            },
            contents: {
              title: "",
              checklist: [],
            }
          }
        }
      };
    }
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "setting.contents.checklist") {
      dummy = {
        title: "",
        children: [],
      };
    } else if (subject === "setting.contents.checklist.children") {
      dummy = {
        title: "",
        contents: "",
      };
    }
    return dummy;
  }
}
