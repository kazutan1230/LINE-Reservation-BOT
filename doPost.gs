// Googleスプレッドシート
const SS_ID = "1qCc-YpncZa8SsN73YslmLem0Tyb0mymIli-iNqenMb4";
const SS = SpreadsheetApp.openById(SS_ID);
const sheetLine = SS.getSheetByName('2023/10_LINE');
const sheetAlert = SS.getSheetByName('2023/10_LINE_次回開催お知らせ希望');
const sheetQuiry = SS.getSheetByName('2023/10_LINE_お問い合わせ');

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
  if (outputs.find(output => output.name.includes("reservation-followup")) != undefined) {
    const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("reservation-followup")).parameters;
    const date = new Date();
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
      date,
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
  } else if (outputs.find(output => output.name.includes("nexteventalert-followup")) != undefined) {
    const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("nexteventalert-followup")).parameters;
    const date = new Date();
    const PrivacyPolicy = queryParameters.PrivacyPolicy;
    const AlertParentName = queryParameters.AlertParentName;
    const AlertMail = queryParameters.AlertMail;
    const NextEvent = "希望する";

    // スプレッドシートに吐き出す
    sheetAlert.appendRow([
      "",
      date,
      PrivacyPolicy,
      AlertParentName,
      AlertMail,
      NextEvent
    ])
    // お問い合わせ(300_contact-quiry-followup)の時
  } else if (outputs.find(output => output.name.includes("300_contact-quiry-followup")) != undefined) {
    const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("followup")).parameters;
    const date = new Date();
    const inquiry = queryParameters.any;

    sheetQuiry.appendRow([
      date,
      inquiry
    ])

    // 未読防止の LINE への通知設定
    const url = "https://maker.ifttt.com/trigger/contact_informed/with/key/ozfbzp7HX3YbcOgtN66O7M85hwQKxAus3V5l3VfVLRb"


    const yyyymmdd = new Intl.DateTimeFormat(
      "ja-JA",
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }
    )

    const data = {
      "value1": yyyymmdd.format(date),
      "value2": inquiry,
    }
    const headers = {
      "Content-Type": "application/json"
    }

    const options = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(data)
    }

    UrlFetchApp.fetch(url, options)
  } else {
  }

  const res = {

  }

  return ContentService.createTextOutput(JSON.stringify(res));
}
