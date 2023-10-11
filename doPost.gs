// Googleスプレッドシート
const SS_ID = "1qCc-YpncZa8SsN73YslmLem0Tyb0mymIli-iNqenMb4";
const SS = SpreadsheetApp.openById(SS_ID);
const sheetLine = SS.getSheetByName('2023/10_LINE');
const sheetAlert = SS.getSheetByName('2023/10_LINE_次回開催お知らせ希望');

/**
 * POSTメソッド
 */
function doPost(e) {
  const data = e.postData.getDataAsString();
  const req = JSON.parse(data);


  // reqの中身から
  // 抽選応募受付(reservation-followup)か
  // 次回開催お知らせ希望(nexteventalert-followup)かを判断
  const outputs = req.queryResult.outputContexts;

  // 抽選応募受付(reservation-followup)の時
  if(outputs.find(output => output.name.includes("reservation-followup")) != undefined){
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
  sheetLine.appendRow([
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
  // 次回開催お知らせ希望(nexteventalert-followup)の時
  } else if (outputs.find(output => output.name.includes("nexteventalert-followup")) != undefined){
    const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("nexteventalert-followup")).parameters;
    const PrivacyPolicy = queryParameters.PrivacyPolicy;
    const AlertParentName = queryParameters.AlertParentName;
    const AlertMail = queryParameters.AlertMail;
    const NextEvent = "希望する";

// スプレッドシートに吐き出す
  sheetAlert.appendRow([
    "",
    PrivacyPolicy,
    AlertParentName,
    AlertMail,
    NextEvent
  ])
  } else{
  }

  const res = {
    
  }

  return ContentService.createTextOutput(JSON.stringify(res));
}
