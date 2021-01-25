let downloadString = function (text, fileName, fileType = 'plain') {
  if (/csv/gi.test(fileType)) {
    fileType = 'text/csv'
  } else if (/csv/gi.test(fileType)) {
    fileType = 'application/json'
  } else if (/csv/gi.test(fileType)) {
    fileType = 'application/js'
  } else if (/svg/gi.test(fileType)) {
    fileType = 'image/svg+xml'
  } else if (/xml/gi.test(fileType)) {
    fileType = 'application/xml'
  } else if (/html/gi.test(fileType)) {
    fileType = 'text/html'
  } else if (/pdf/gi.test(fileType)) {
    fileType = 'application/pdf'
  } else {
    fileType = 'text/plain'
  }

  let blob, a, timeoutId;

  blob = new Blob([text], { type: fileType });

  a = document.createElement('A');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  timeoutId = setTimeout(function() {
    URL.revokeObjectURL(a.href);
    clearTimeout(timeoutId);
  }, 1500);
};

let sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('awake');
    }, time);
  });
};

let titleToObject = function () {
  let arrayDate = function (arr) {
    if (arr.length < 3) {
      throw new Error('invaild input');
    }
    let year, month, date;

    year = Number(arr[0].trim().replace(/[^0-9]/g, '').replace(/^0/, ''));
    month = Number(arr[1].trim().replace(/[^0-9]/g, '').replace(/^0/, '')) - 1;
    date = Number(arr[2].trim().replace(/[^0-9]/g, '').replace(/^0/, ''));

    return (new Date(year, month, date));
  };

  let tbodies, titles, filteredTitle, filteredDate, filteredClick, final;

  tbodies = document.querySelectorAll('tbody');
  titles = tbodies[3].querySelectorAll('.title');

  filteredTitle = [];
  filteredDate = [];
  filteredClick = [];
  for (let t of titles) {
    if (t.nodeName === 'TD') {
      filteredTitle.push(t.querySelector('a'));
      filteredDate.push(arrayDate(t.parentNode.querySelector('.date').textContent.split('.')));
      if (t.parentNode.querySelector('.read') !== null) {
        filteredClick.push(Number(t.parentNode.querySelector('.read').textContent.replace(/[^0-9]/g, '')));
      } else {
        filteredClick.push(0);
      }
    }
  }

  final = [];

  for (let i = 0; i < filteredTitle.length; i++) {
    final.push({ href: filteredTitle[i].href, title: filteredTitle[i].textContent, date: filteredDate[i], click: filteredClick[i] });
  }

  return final;
};

let moveSearching = function () {
  let buttons = document.querySelectorAll('.blog2_paginate');
  return buttons[0].children.length - 1;
};

let moving = function (index) {
  let buttons = document.querySelectorAll('.blog2_paginate');
  let target = buttons[0];
  target.children[index + 1].click();
};

async function main() {
  let lookButton, changeListCount;
  let moveTargetsNumber;
  let finalArr;
  let temp;
  let tempTime;
  let totalSleepTime;

  totalSleepTime = 0;

  tempTime = 2000;
  await sleep(tempTime);
  totalSleepTime += tempTime;

  lookButton = document.querySelector('.area_btn2');
  lookButton.querySelector('.icon').click();

  tempTime = 1000;
  await sleep(tempTime);
  totalSleepTime += tempTime;

  changeListCount = document.getElementById('changeListCount');
  changeListCount.children[4].click();

  tempTime = 1000;
  await sleep(tempTime);
  totalSleepTime += tempTime;

  moveTargetsNumber = moveSearching();
  finalArr = [];

  for (let i = 0; i < moveTargetsNumber; i++) {

    tempTime = 1000;
    await sleep(tempTime);
    totalSleepTime += tempTime;

    moving(i);

    tempTime = 1000;
    await sleep(tempTime);
    totalSleepTime += tempTime;

    temp = titleToObject();

    console.log(temp);
    for (let j of temp) {
      finalArr.push(j);
    }

  }

  return { finalArr, totalSleepTime };

};

main().then(function (obj) {
  const { finalArr, totalSleepTime } = obj;
  console.log(finalArr);
  downloadString(JSON.stringify(finalArr, null, 2), '/<%name%>/.json', 'json');
});
