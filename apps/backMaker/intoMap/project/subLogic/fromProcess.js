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

          if (past1.a5_name !== "김미경" && past1.a5_name !== "제이미") {
            if ((await MONGOC.db("miro81").collection("Designer").find({ designer: past1.a5_name }).toArray())[0] === undefined) {
              console.log(tong[i]);
              console.log(past1);
            }
            tong[i].desid = (await MONGOC.db("miro81").collection("Designer").find({ designer: past1.a5_name }).toArray())[0].desid;
          } else {
            tong[i].desid = "de024";
          }

          process.status = past1.b1_process;

          if (past1.b2_contractfee !== '' && past1.b2_contractfee !== '-') {
            process.contract.first.date = past1.b2_contractfee;
          } else {
            process.contract.first.date = EMPTYDATE;
          }
          process.contract.first.calculation.amount = (past2.d1_deposit === 'Y') ? 330000 : 0;
          temp = past2.d3_depositinfo.split(" / ");
          process.contract.first.calculation.info.method = temp[0].replace(/^방식 /, '');
          process.contract.first.calculation.info.proof = temp[1].replace(/^증빙 /, '');
          process.contract.first.calculation.info.to = temp[2].replace(/^수신자 /, '');

          if (past1.b3_designfee !== '' && past1.b3_designfee !== '-') {
            process.contract.remain.date = past1.b3_designfee;
          } else {
            process.contract.remain.date = EMPTYDATE;
          }
          process.contract.remain.calculation.amount.supply = (past2.c1_supply !== '' && past2.c1_supply !== '-') ? Number(past2.c1_supply.replace(/[^0-9\.\-]/g, '')) : 0;
          process.contract.remain.calculation.amount.vat = (past2.c3_vat !== '' && past2.c3_vat !== '-') ? Number(past2.c3_vat.replace(/[^0-9\.\-]/g, '')) : 0;
          process.contract.remain.calculation.amount.consumer = (past2.c2_consumer !== '' && past2.c2_consumer !== '-') ? Number(past2.c2_consumer.replace(/[^0-9\.\-]/g, '')) : 0;

          temp = past2.d4_leftinfo.split(" / ");
          process.contract.remain.calculation.info.method = temp[0].replace(/^방식 /, '');
          process.contract.remain.calculation.info.proof = temp[1].replace(/^증빙 /, '');
          process.contract.remain.calculation.info.to = temp[2].replace(/^수신자 /, '');

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
          process.calculation.percentage = Number(past2.e1_fee.replace(/%$/, '').replace(/[^0-9]/g, ''));
          temp = past2.f7_calculinfo.split(" / ");

          process.calculation.info.account = temp[0].replace(/^계좌 /, '');
          process.calculation.info.proof = temp[1].replace(/^증빙 /, '');
          process.calculation.info.to = temp[2].replace(/^수신자 /, '');

          process.calculation.payments.totalAmount = (past2.f2_calculamount !== '' && past2.f2_calculamount !== '-') ? Number(past2.f2_calculamount.replace(/[^0-9\.\-]/g, '')) : 0;
          process.calculation.payments.first.amount = (past2.f3_calculfirst !== '' && past2.f3_calculfirst !== '-') ? Number(past2.f3_calculfirst.replace(/[^0-9\.\-]/g, '')) : 0;
          process.calculation.payments.first.date = (past2.f4_calculfisrtyn !== '' && past2.f4_calculfisrtyn !== '-') ? past2.f4_calculfisrtyn : EMPTYDATE;
          process.calculation.payments.remain.amount = (past2.f5_calcullast !== '' && past2.f5_calcullast !== '-') ? Number(past2.f5_calcullast.replace(/[^0-9\.\-]/g, '')) : 0;
          process.calculation.payments.remain.date = (past2.f6_calcullastyn !== '' && past2.f6_calcullastyn !== '-') ? past2.f6_calcullastyn : EMPTYDATE;

          if (past1.b8_interview !== '' && past1.b8_interview !== '-') {
            tong[i].contents.photo.date = past1.b8_interview;
          }

          if (past1.c1_photo !== '' && past1.c1_photo !== '-') {
            tong[i].contents.photo.info.photographer = past1.c1_photo;
          }

          if (past1.c2_interviewer !== '' && past1.c2_interviewer !== '-') {
            tong[i].contents.photo.info.interviewer = past1.c2_interviewer;
          }


        } else {

          tong[i].desid = "";
          process.contract.meeting.pastDesigners = [];
          process.design.proposal.detail = [];
          process.design.construct.detail = [];
          process.design.purchase.detail = [];

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
