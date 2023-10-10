// Googleスプレッドシート
const SS_ID = "1qCc-YpncZa8SsN73YslmLem0Tyb0mymIli-iNqenMb4";
const SS = SpreadsheetApp.openById(SS_ID);
const sheet = SS.getSheetByName('2023/10_LINE');

/**
 * POSTメソッド
 */
function doPost(e) {
  const data = e.postData.getDataAsString();
  const req = JSON.parse(data);
  const queryText = req.queryResult.queryText;

  const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("reservation-followup")).parameters;
  const PrivacyPolicy = queryParameters.PrivacyPolicy;
  const EventCondition = queryParameters.EventCondition;
  const ChildCount = queryParameters.ChildCount;
  const ChildName = queryParameters.ChildName;
  const ChildGrade = queryParameters.ChildGrade;
  const ParentName = queryParameters.ParentName;
  const Mail = queryParameters.Mail;
  const NextEvent = queryParameters.NextEvent;
  const Other = queryParameters.Other;

// スプレッドシートに吐き出す
  sheet.appendRow([
    "",
    PrivacyPolicy,
    EventCondition,
    ChildCount,
    ChildName,
    ChildGrade,
    ParentName,
    Mail,
    NextEvent,
    Other
  ])

// Dialogflowに返却するresponse
  // const res = {
  //   "fulfillmentMessages": [
  //     {
  //       "text": {
  //         "text": [
  //           ChildName +
  //           ChildFurigana +
  //           Age +
  //           ParentName +
  //           ParentFurigana +
  //           Address +
  //           TEL +
  //           Mail +
  //           Subscribe +
  //           Other
  //         ]
  //       }
  //     }
  //   ],
  // };

  const res = {
    
  }


  return ContentService.createTextOutput(JSON.stringify(res));
}
