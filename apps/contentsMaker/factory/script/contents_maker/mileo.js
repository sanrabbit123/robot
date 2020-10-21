module.exports = {
  exec: function (options) {
    let h = `
const Mileo = function (text, nameItem, boo) {
  this.text = "기본값 설정";
  if (text) {
    this.text = text;
  }
  this.nameItem = nameItem;
  this.nameItem.contents = this.text;
  this.flatform = boo;
}

Mileo.prototype.text_infoarray = function (str) {
  function string_toarray(str) {
    let a_arr = [];
    let objs;
    for (let i = 0; i < str.length; i++) {
      objs = {};
      objs["index"] = i;
      objs["value"] = str[i];
      if (str[i] !== " " && str[i] !== "  " && str[i] !== "​" && str[i] !== " " && str[i] !== "\\t" && str[i] !== "\\n") {
        a_arr.push(objs);
      }
    }
    return a_arr;
  }
  function space_index(str) {
    let arr = [];
    let pat = /[ \\n]/g;
    let k, e;
    while((e = pat.exec(str)) !== null) {
      k = e.index;
      arr.push(k);
    }
    arr.push(str.length);
    return arr;
  }
  return { string: string_toarray(str), space: space_index(str) };
}

Mileo.prototype.get_points = function () {
  let text_array = this.text_infoarray(this.text);
  let copyItem = this.nameItem.duplicate();
  let outline_group = copyItem.createOutline();
  outline_group.name = "outline_group";
  let outline_group_array_graphic = new Array(outline_group.pageItems.length);
  for (let i = 0; i < outline_group.pageItems.length; i++) {
    outline_group_array_graphic[outline_group.pageItems.length - 1 - i] = outline_group.pageItems[i];
  }

  if (text_array.string.length !== outline_group_array_graphic.length) {
    alert("stop! white space error");
    alert("text : " + String(text_array.string.length));
    alert("graphic : " + String(outline_group_array_graphic.length));
    for (let i = 0; i < text_array.string.length; i++) {
      alert(text_array.string[i].value);
    }
  }

  let heights;
  if (text_array.string[0].value !== '.' && text_array.string[0].value !== ',' && text_array.string[0].value !== '_') {
    heights = Math.floor(outline_group_array_graphic[0].height);
  } else if (text_array.string[1].value !== '.' && text_array.string[1].value !== ',' && text_array.string[1].value !== '_') {
    heights = Math.floor(outline_group_array_graphic[1].height);
  } else if (text_array.string[2].value !== '.' && text_array.string[2].value !== ',' && text_array.string[2].value !== '_') {
    heights = Math.floor(outline_group_array_graphic[2].height);
  } else if (text_array.string[3].value !== '.' && text_array.string[3].value !== ',' && text_array.string[3].value !== '_') {
    heights = Math.floor(outline_group_array_graphic[3].height);
  } else if (text_array.string[4].value !== '.' && text_array.string[4].value !== ',' && text_array.string[4].value !== '_') {
    heights = Math.floor(outline_group_array_graphic[4].height);
  }

  let len = [];
  let len_sort = [];
  let bbagi;
  for (let i = 0; i < outline_group_array_graphic.length; i++) {
    if (i !== outline_group_array_graphic.length - 1) {
      bbagi = Math.abs(Math.floor(outline_group_array_graphic[i+1].top) - Math.floor(outline_group_array_graphic[i].top));
      if (text_array.string[i+1].value === '.' || text_array.string[i+1].value === ',' || text_array.string[i+1].value === '_') {
        bbagi = Math.abs(Math.floor(outline_group_array_graphic[i+1].top + ((heights * 4)/5) - Math.floor(outline_group_array_graphic[i].top)));
      }
      if (text_array.string[i].value === '.' || text_array.string[i].value === ',' || text_array.string[i].value === '_') {
        bbagi = Math.abs(Math.floor(outline_group_array_graphic[i+1].top) - Math.floor(outline_group_array_graphic[i].top + ((heights * 4)/5)));
      }
      len.push(bbagi);
      len_sort.push(bbagi);
    } else {
      len.push(0);
      len_sort.push(0);
    }
  }
  len_sort.sort(function (a, b) { return b - a; });

  let chuga = 0;
  if (this.text.match(/\\n/g)) {
    chuga += this.text.match(/\\n/g).length;
    chuga = chuga / 2
  }
  let minimum = len_sort[this.nameItem.lines.length - 2 - chuga] - 1
  outline_group.remove();
  let points = [];
  for (let i = 0; i < len.length; i++) { if (len[i] > minimum) {
    points.push(text_array.string[i+1].index);
  }}

  let space_point = new Array(points.length);
  for (let s = 0; s < points.length; s++) {
    for (i = 0; i < text_array.space.length; i++) { if (i !== text_array.space.length - 1) {
      if (points[s] > text_array.space[i] && points[s] < text_array.space[i+1]) {
        space_point[s] = text_array.space[i+1] - points[s] - 1;
      }
    }}
  }
  return { points: points, space_point: space_point };
}

Mileo.prototype.space = function (index) {
  let instance = this;
  let value_point_past, text_array, points, space_point, origin_text, result_text;
  origin_text = this.text;
  text_array = this.text_infoarray(this.text);
  points = this.get_points(this.nameItem, this.text).points;
  space_point = this.get_points(this.nameItem, this.text).space_point;
  for (let i = 0; i < text_array.string.length; i++) { if (text_array.string[i].index === points[index]) {
    value_point_past = text_array.string[i].value;
  }}
  function text_nogada(text, nameItem, value_point_past, origin_text, index, minus) {
    let value_point, text_array, points, space_point;
    let boo = false;
    text_array = instance.text_infoarray(text);
    points = instance.get_points(nameItem, text).points;
    space_point = instance.get_points(nameItem, text).space_point;
    if (space_point[index] <= minus) {
      result_text = origin_text;
      return;
    }
    if ((text[points[index] + space_point[index] - minus] === '.' || text[points[index] + space_point[index] - minus] === ',') && minus === 0) {
      boo = true;
    }
    text = text.splice((points[index] + space_point[index] - minus), ' ');
    nameItem.contents = text;
    text_array = instance.text_infoarray(text);
    points = instance.get_points(nameItem, text).points;
    space_point = instance.get_points(nameItem, text).space_point;
    for (let i = 0; i < text_array.string.length; i++) { if (text_array.string[i].index === points[index]) {
      value_point = text_array.string[i].value;
    }}
    if (value_point === value_point_past) {
      text = origin_text;
      nameItem.contents = text;
      text_array = instance.text_infoarray(text);
      points = instance.get_points(nameItem, text).points;
      space_point = instance.get_points(nameItem, text).space_point;
      text_nogada(text, nameItem, value_point_past, origin_text, index, minus + 1);
    } else {
      result_text = text;
      if (boo) {
        result_text = result_text.slice(0, points[index] + space_point[index]) + result_text.slice(points[index] + space_point[index] + 2);
      }
      return;
    }
  }
  text_nogada(this.text, this.nameItem, value_point_past, origin_text, index, 0);
  return result_text;
}

Mileo.prototype.return_bottom = function () {
  let copyItem = this.nameItem.duplicate();
  let outline_group = copyItem.createOutline();
  let bottom;
  if (outline_group.top < 0) {
    bottom = Math.abs(outline_group.top) + outline_group.height;
    outline_group.remove();
    return bottom * -1;
  } else {
    bottom = outline_group.top - outline_group.height;
    outline_group.remove();
    return bottom;
  }
}

Mileo.prototype.execute = function () {
  for (let z = 0; z < this.nameItem.lines.length - 1; z++) {
    this.text = this.space(z);
    this.nameItem.contents = this.text;
  }

  if (this.flatform !== "desktop") {
    for (let i = 0; i < this.nameItem.paragraphs.length; i++) {
      if (this.nameItem.paragraphs[i].contents === '') {
        this.nameItem.paragraphs[i].characterAttributes.autoLeading = false;
        this.nameItem.paragraphs[i].characterAttributes.leading = 16;
      }
    }
  }

  return this.text;
}
    `;
    return h;
  }
}
