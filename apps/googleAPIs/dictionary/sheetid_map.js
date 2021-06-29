const GoogleSheet = function (credentials = "default", access_token = "default") {
  const Mother = require("../mother.js");
  this.mother = new Mother();
  this.schedule = require("node-schedule");
  const { Google } = require('googleapis');
  let oAuth2Info = {
    credentials: {"installed":{"client_id":"1031238153418-p9o07pfllu78p4lie24ko6hlqja5q26l.apps.googleusercontent.com","project_id":"decoded-vision-274704","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"S7zSU-3Um8u5oK95t46vsVV7","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}},
    access_token: {"access_token":"ya29.a0Ae4lvC1_wdISZSZXX9wpR2GJXPYRHbUyH8k2v47TS0aaDOoJpeYGqEU3cGPFcfhsCLrjIC_GskfsZxHAJYXKlTjA--9s4qKMnEPabUIEgeaZ_CAwJtZm3sykNOWpjmhYyiFywUGx5ZdMdNNHlcRtV0YQTmQPqMHDf18","refresh_token":"1//0eAholvA-8d4tCgYIARAAGA4SNwF-L9Irlv8soN1D6chCe3cPdBNFviY6p5s-d4pXLAf0fkH0ofqRfKu27LKEhbKzS8Zqnqz5otM","scope":"https://www.googleapis.com/auth/spreadsheets","token_type":"Bearer","expiry_date":1587307343993},
  }
  if (credentials !== "default") { oAuth2Info.credentials = credentials; }
  if (access_token !== "default") { oAuth2Info.access_token = access_token; }
  this.oAuth2Client = new Google.auth.OAuth2(oAuth2Info.credentials.installed.client_id, oAuth2Info.credentials.installed.client_secret, oAuth2Info.credentials.installed.redirect_uris[0]);
  this.oAuth2Client.setCredentials(oAuth2Info.access_token);
  this.sheets = Google.sheets({ version: 'v4', auth: this.oAuth2Client });
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  this.abc = [];
  for (let i of alphabet) { this.abc.push(i); }
  for (let i of alphabet) { for (let j of alphabet) { this.abc.push(i + j); } }
}

GoogleSheet.prototype.set_id = async function () {
  let instance = this;
  try {




  } catch (e) {
    console.log(e.message);
  }
}

GoogleSheet.prototype.set_range = async function () {
  let instance = this;
  try {




  } catch (e) {
    console.log(e.message);
  }
}

GoogleSheet.prototype.get_value = async function () {
  let instance = this;
  try {




  } catch (e) {
    console.log(e.message);
  }
}

GoogleSheet.prototype.update_value = async function () {
  let instance = this;
  try {




  } catch (e) {
    console.log(e.message);
  }
}

GoogleSheet.prototype.to_mongo = async function () {
  let instance = this;
  try {




  } catch (e) {
    console.log(e.message);
  }
}

GoogleSheet.prototype.to_mysql = async function () {
  let instance = this;
  try {




  } catch (e) {
    console.log(e.message);
  }
}

GoogleSheet.prototype.total_make = async function () {
  let instance = this;
  try {




  } catch (e) {
    console.log(e.message);
  }
}







module.exports = GoogleSheet;
