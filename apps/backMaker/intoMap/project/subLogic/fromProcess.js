module.exports = function (tools) {
  const { Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = emptyDate();
  const { mongo, mongoinfo } = Mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  return async function (tong) {
    try {
      await MONGOC.connect();
      let row, process, past;

      for (let i = 0; i < tong.length; i++) {
        row = await MONGOC.db("miro81").collection("Project").find({ a4_customernumber: tong[i].cliid }).toArray();
        process = tong[i].process;
        if (row.length > 0) {
          past = row[0];

          process.status = past.b1_process;

          process.contract.first.date = past.b1_process;
          process.contract.remain.date = past.b1_process;

        }
      }

      return tong;
    } catch (e) {
      console.log(e);
    } finally {
      await MONGOC.close();
    }
  }
}
