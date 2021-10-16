const worker = async function (mother, back, address, selfMongo) {
  try {
    console.log("test");
    return true;
  } catch (e) {
    console.log(e);
  }
}

module.exports = worker;
