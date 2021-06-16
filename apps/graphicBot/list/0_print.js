module.exports = function (order, info) {
  return [
    "https://docs.google.com/forms/d/1D8CNQFtRr_hiuUXdMXYAgYCk6nFC5cAdkezzp-3mlcw/edit#response=ACYDBNiCgtcAcyCU-zXdikuXuDs3owKcORZECv3atp2XqBYVqlqEHuL6x8CJbube2CYZeHE",
    "wait_3000",
    "clipBoard_" + String(order),
    "wait_500",
    [ 688, 427, 500, true ],
    "paste",
    "key_enter",
    [ 1279, 425, 2000 ],
    [ 1462, 474, 500 ],
    [ 1513, 601, 500 ],
    [ 1513, 631, 500 ],
    [ 1579, 899, 2000 ],
    "close"
  ];
};
