module.exports = function (order, info) {
  return [
    "https://docs.google.com/forms/d/1D8CNQFtRr_hiuUXdMXYAgYCk6nFC5cAdkezzp-3mlcw/edit#response=ACYDBNiCgtcAcyCU-zXdikuXuDs3owKcORZECv3atp2XqBYVqlqEHuL6x8CJbube2CYZeHE",
    async function () {
      try {
        let arr;
        let latestNumber;

        arr = document.querySelectorAll('.freebirdFormeditorViewResponsesNavigationPositionText');
        latestNumber = arr[3].textContent;
        arr = document.querySelectorAll('.quantumWizTextinputPaperinputInput');
        await injectionInput(arr[arr.length - 1], latestNumber);
        await sleep(1000);
        document.querySelector('.freebird-qp-icon-local-printshop').click();

      } catch (e) {
        console.log(e);
      }
    }
  ];
};
