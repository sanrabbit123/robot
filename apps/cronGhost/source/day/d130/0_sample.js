const worker = async function (mother, back) {
  try {
    console.log("this");
  } catch (e) {
    console.log(e);
  }
}

module.exports = worker;
