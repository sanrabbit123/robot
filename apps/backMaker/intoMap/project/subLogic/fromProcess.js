module.exports = function (tools) {
  const { Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = emptyDate();
  const { mongo, mongoinfo } = Mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  return async function (tong) {
    try {
      await MONGOC.connect();
      let row0, row1, row2;
      let past0, past1, past2;
      let process, past;
      let temp;

      for (let i = 0; i < tong.length; i++) {
        row0 = await MONGOC.db("miro81").collection("BC1_conlist").find({ a4_customernumber: tong[i].cliid }).toArray();
        row1 = await MONGOC.db("miro81").collection("BP1_process").find({ a4_customernumber: tong[i].cliid }).toArray();
        row2 = await MONGOC.db("miro81").collection("BP2_calculation").find({ a4_customernumber: tong[i].cliid }).toArray();
        process = tong[i].process;
        if (row1.length > 0) {
          past0 = row0[0];
          past1 = row1[0];
          past2 = row2[0];

          process.status = past1.b1_process;

          if (past1.b2_contractfee !== '' && past1.b2_contractfee !== '-') {
            process.contract.first.date = past1.b2_contractfee;
          } else {
            process.contract.first.date = EMPTYDATE;
          }
          process.contract.first.date.calculation.amount = (past2.d1_deposit === 'Y') ? 330000 : 0;
          temp = past2.d3_depositinfo.split(" / ");
          process.contract.first.date.calculation.info.method = temp[0].replace(/^방식 /, '');
          process.contract.first.date.calculation.info.proof = temp[1].replace(/^증빙 /, '');
          process.contract.first.date.calculation.info.to = temp[2].replace(/^수신자 /, '');

          if (past1.b3_designfee !== '' && past1.b3_designfee !== '-') {
            process.contract.remain.date = past1.b3_designfee;
          } else {
            process.contract.remain.date = EMPTYDATE;
          }
          process.contract.remain.date.calculation.amount.supply = (past2.c1_supply !== '' && past2.c1_supply !== '-') ? Number(past2.c1_supply.replace(/[^0-9\.\-]/g, '')) : 0;
          process.contract.remain.date.calculation.amount.vat = (past2.c3_vat !== '' && past2.c3_vat !== '-') ? Number(past2.c3_vat.replace(/[^0-9\.\-]/g, '')) : 0;
          process.contract.remain.date.calculation.amount.consumer = (past2.c2_consumer !== '' && past2.c2_consumer !== '-') ? Number(past2.c2_consumer.replace(/[^0-9\.\-]/g, '')) : 0;

          temp = past2.d4_leftinfo.split(" / ");
          process.contract.remain.date.calculation.info.method = temp[0].replace(/^방식 /, '');
          process.contract.remain.date.calculation.info.proof = temp[1].replace(/^증빙 /, '');
          process.contract.remain.date.calculation.info.to = temp[2].replace(/^수신자 /, '');

          if (past1.b5_metting1 !== '' && past1.b5_metting1 !== '-') {
            process.contract.meeting.date = past1.b5_metting1;
          } else {
            process.contract.meeting.date = EMPTYDATE;
          }
          process.contract.meeting.pastDesigners = [];


          process.design.proposal.detail = [];
          process.design.construct.detail = [];
          process.design.purchase.detail = [];


          process.calculation.method = past2.f1_calculmethod;

          



        } else {






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
