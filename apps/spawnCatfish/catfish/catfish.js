const { seq, normalize } = require(`path`);
const { query } = require(normalize(`${__dirname}/tools/basicTools.js`));
/*

1. 고객 (CL)
  - 표 이름 : client
  - 컬럼
    name(이름)


2. 프로젝트 (CA)
  - 표 이름 : project
  - 컬럼


3. 디자이너 (DE)
  - 표 이름 : designer
  - 컬럼


4. 컨텐츠 (CO)
  - 컨텐츠 : contents
  - 컬럼

*/

query("SELECT name FROM client;")
