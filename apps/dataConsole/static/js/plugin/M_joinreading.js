const M_joinreading = function () {}

M_joinreading.prototype.count = {}

M_joinreading.prototype.joinreading = function (arr) {
  // arr : col, self_standard, target_db, target_standard, target_col
  let plugin = this;
  this.count[arr[0]] = 0;
  return function (m, mege) {
    let instance = m;
    if (plugin.count[arr[0]] < 1) {
      function joinreading_load(node) {
        let this_r = /_[rc][0-9]+/gi.exec(node.id)[0];
        let this_standard = document.getElementById(arr[1] + "_init" + this_r).textContent;
        let qquery = "SELECT " + arr[4] + " FROM " + arr[2] + " WHERE " + arr[3] + " = '" + this_standard + "';"
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/post_read_arr');
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState !== 4) { return }
          if (xhr.status === 200) {
            let row = JSON.parse(xhr.responseText);
            let this_val = row[0][arr[4]];
            plugin.count[arr[0]]++;
            node.textContent = this_val;
            let update_query = 'c=' + arr[0] + '&v=' + this_val + '&i=' + this_standard + '&st=' + m.data.standard + '&table=' + m.data.dbtitle;
            const xhr2 = new XMLHttpRequest();
            xhr2.open('POST', '/post_update');
            xhr2.onreadystatechange = function (e) {
              if (xhr2.readyState !== 4) { return }
              if (xhr2.status === 200) {
                console.log(xhr2.responseText, 'of join query');
              } else { console.log('error', e); }
            }
            xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr2.send(update_query);
          } else { console.log('error', e); }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send('qquery=' + qquery);
      }
      let nodes = document.querySelectorAll('.rowdiv > .' + arr[0]);
      for (let i = 0; i < nodes.length - 100; i++) { joinreading_load(nodes[i]) }
    }
  };
}
