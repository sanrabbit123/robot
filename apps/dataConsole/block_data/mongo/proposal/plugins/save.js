Proposal.save_init = async function (update = false) {
  let target, temp, temp2, standard_id;
  let temp_arr = [];
  let temp_num = 0;
  let result_obj = {}
  let full_string = '';

  if (!update) {
    // 0 make proid
    let proids = JSON.parse(await Genemongo.ajax("/post_mfind", "collection=Project&find1=" + JSON.stringify({}) + "&find2=" + JSON.stringify({ proid: 1 })));
    let proid_box = [];
    for (let p of proids) {
      proid_box.push(p.proid.replace(/[^0-9]/g, ''));
    }
    proid_box.sort(function (a, b) { return b - a; });

    let today = new Date();
    let today_str = String(today.getFullYear()).slice(2) + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1));
    let new_num = 0;
    if (proid_box[0].slice(0,4) === today_str) {
      new_num = ((proid_box[0].slice(4).slice(0, 1) === '0') ? Number(proid_box[0].slice(5)) : Number(proid_box[0].slice(4))) + 1;
      result_obj.proid = 'p' + today_str + '_' + "aa" + ((new_num < 10) ? '0' + String(new_num) : String(new_num)) + 's';
    } else {
      result_obj.proid = 'p' + today_str + '_' + "aa" + "01" + 's';
    }

    // 0 default
    result_obj.desid = "";
    result_obj.status = "작성중";

    // 1 client
    target = document.querySelector("#pp_firstprocess_box .pp_title");
    if (target.querySelector("#pp_title_sub_b") === null) {
      alert("고객을 선택해주세요!");
      return "fail";
    } else {
      target = target.querySelector("#pp_title_sub_b");
      result_obj.cliid = target.getAttribute("cus_id");
      result_obj.client = target.textContent.replace(/ : /g, '');
    }
  }

  // 2 service
  target = document.querySelector("#pp_secondprocess_box .pp_title");
  if (target.querySelector("#pp_title2_sub_b") === null) {
    alert("서비스를 선택해주세요!");
    return "fail";
  } else {
    target = target.querySelector("#pp_title2_sub_b");
    result_obj.service = target.getAttribute("cus_id");
  }

  // 3 details
  if (document.querySelectorAll('.pp_designer_selected').length === 0) {
    alert("디자이너를 선택해주세요!");
    return "fail";
  } else {
    temp = document.querySelectorAll('.pp_designer_selected');
    result_obj.proposal = new Array(temp.length);
    for (let i = 0; i < result_obj.proposal.length; i++) {
      result_obj.proposal[i] = {}
      temp2 = temp[i].querySelector(".pp_designer_selected_box_contents_designers_total");
      result_obj.proposal[i].desid = false;
      for (let input of temp2.querySelectorAll("input")) {
        if (input.checked) { result_obj.proposal[i].desid = input.value }
      }
      if (!result_obj.proposal[i].desid) {
        alert("디자이너를 선택해주세요!");
        return "fail";
      }

      temp2 = temp[i].querySelector(".pp_designer_selected_box_contents_service_total");
      for (let input of temp2.querySelectorAll("input")) {
        if (input.checked) { temp_arr.push(input.value); }
      }
      if (temp_arr.length === 0) {
        alert("금액의 종류와 양을 정확히 선택해주세요!");
        return "fail";
      }
      temp_num = (temp_arr.indexOf("부분 공간") !== -1) ? temp_arr.length - 1 : temp_arr.length;
      result_obj.proposal[i].fee = new Array(temp_num);
      for (let f = 0; f < temp_num; f++) {
        result_obj.proposal[i].fee[f] = {}
        result_obj.proposal[i].fee[f].method = (temp_arr[f] === "오프라인") ? "offline" : "online";
        result_obj.proposal[i].fee[f].partial = (temp_arr.indexOf("부분 공간") !== -1) ? true : false;
        result_obj.proposal[i].fee[f].money = 0;
        temp2 = temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[f];
        if (temp2.querySelector(".pp_designer_selected_box_contents_money_text").textContent === temp_arr[f]) {
          result_obj.proposal[i].fee[f].money = Number(temp2.querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
        } else {
          if (f === 0) {
            result_obj.proposal[i].fee[f].money = Number(temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[1].querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
          } else {
            result_obj.proposal[i].fee[f].money = Number(temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[0].querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
          }
        }
      }
      temp_num = 0;
      temp_arr = [];

      if (temp[i].querySelector(".pp_designer_selected_box_value").textContent === "") {
        alert("사진을 선택해주세요!");
        return "fail";
      }
      if (document.querySelector('.pp_fifth_whitebox') !== null) {
        document.querySelector('.ppw_left_description_inbutton').click();
      }
      result_obj.proposal[i].picture_settings = Genemongo.tagParsing(temp[i].querySelector(".pp_designer_selected_box_value").textContent);
    }
  }

  if (!update) {
    full_string = JSON.stringify(result_obj);
    await Genemongo.ajax("/post_minsert", "collection=Project" + "&obj=" + Genemongo.queryFilter(full_string));
  } else {
    standard_id = document.getElementById("blewpp_button3").getAttribute("cus_id");
    await Genemongo.ajax("/post_mupdate", "table=Project&st=proid&i=" + Genemongo.queryFilter(standard_id) + "&c=service&v=" + Genemongo.queryFilter(result_obj.service));
    full_string = JSON.stringify(result_obj.proposal);
    await Genemongo.ajax("/post_mupdate", "table=Project&st=proid&i=" + Genemongo.queryFilter(standard_id) + "&c=proposal&v=" + Genemongo.queryFilter(full_string));
  }
  if (document.querySelector(".pp_fifth_cancelback") !== null) { document.querySelector(".pp_fifth_cancelback").remove(); }
  if (document.querySelector(".pp_fifth_whitebox") !== null) { document.querySelector(".pp_fifth_whitebox").remove(); }
  document.querySelector('.blewpp_button_garim').click();
  console.log(result_obj);
  if (!update) { return "success"; }
  else { return "update success"; }
}
