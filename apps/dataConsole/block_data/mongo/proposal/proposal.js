const Proposal = function () {
  this.grandmother = document.getElementById("mongo_totalcontents");
  this.mother = {};
  this.domBox = new Map();
  this.thirdChildren = {}
  this.fourthChildren = {}
  this.fifthChildren = {}
  this.whiteBox = {}
  this.pastMaps = []
  this.totalTong = {}
  this.totalTong.fifthScrollmove = {}
  this.below_tong = new Map();
  this.list_domBox = new Map();
}

Proposal.prototype.nodes = {
  div: document.createElement("DIV"),
  label: document.createElement("LABEL"),
  input: document.createElement("INPUT"),
  img: document.createElement("IMG"),
  textarea: document.createElement("TEXTAREA"),
}

Proposal.prototype.totalInitial = async function () {
  let div_clone;
  div_clone = this.nodes.div.cloneNode(true);
  div_clone.className = "mongo_box_create";
  this.grandmother.appendChild(div_clone);
  this.mother = div_clone;
  div_clone = this.nodes.div.cloneNode(true);
  div_clone.className = "mongo_box_list";
  this.grandmother.appendChild(div_clone);
}

Proposal.prototype.toggleSetting = {
  first: 0,
  second: 0,
  third: 0,
  fourth: 0,
  listCreate: 0,
  load: 0,
}

Proposal.auto_comma = function (str) {
  let num = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (num.length < 4) {
    return num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return tmp;
  }
  return num;
}

Proposal.prototype.launching = async function (query = {}) {
  try {
    await this.totalInitial();
    this.domBox = await this.firstProcess();
    this.thirdChildren = await this.thirdProcess();
    await this.secondProcess();

    if (query.proid !== undefined) {
      //query load start
      let proid = query["proid"];
      if (proid.length === 11 && /_/g.test(proid)) {
        //query load
        this.toggleSetting.listCreate = 1;
        let proposal_list_raw = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Project&find1=' + JSON.stringify({ proid: proid }) + '&find2=' + JSON.stringify({})));
        (this.load_initevent()).call({
          parentElement: {
            querySelector: function (str) {
              return {
                textContent: JSON.stringify(proposal_list_raw[0]),
              }
            }
          }
        }, {});
      }
      //query load end
    }
  } catch (e) {
    console.log(e);
  }
}
