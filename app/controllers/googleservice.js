// const { google } = require("googleapis");

// exports.googleDriveService = () => {
//   const KEYFILEPATH = `${__dirname}/../../halofmki-server-key.json`;
//   const SCOPES = ["https://www.googleapis.com/auth/drive"];

//   const auth = new google.auth.GoogleAuth({
//     keyFile: KEYFILEPATH,
//     scopes: SCOPES,
//   });

//   const driveService = google.drive({ version: "v3", auth });
//   return driveService;
// };

// exports.googleSheetService = () => {
//   const KEYFILEPATH = `${__dirname}/../../halofmki-server-key.json`;
//   const SCOPES = ["https://www.googleapis.com/auth/drive"];

//   const auth = new google.auth.GoogleAuth({
//     keyFile: KEYFILEPATH,
//     scopes: SCOPES,
//   });

//   const sheetService = google.sheets({ version: "v4", auth });
//   return sheetService;
// };
