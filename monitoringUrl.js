function main() {
  var url = "サイトのURL";

  var slack_url = "SlackでコピーしたURL";
  var user_name = "サイト監視"; //Slackで通知する際の名前
  var icon = ":scream"; // Slackで通知する際の絵文字
  var message = ""; // 通知の文

  var response = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true 
  });
  var response_code = response.getResponseCode();

  // サイトが落ちてる時だけ通知するように200以外がかえってきた時の処理のみにしています
  if(response_code != 200) {
    message = "<!channel> サイトが落ちています";

    // Slackに通知するためにJSONにする
    var jsonData = {
      "username": user_name,
      "icon_emoji": icon,
      "text": message
    };

    var payload = JSON.stringify(jsonData);

　　 // Slackに通知する際のオプションを指定
    let options = {
      "method": "post",
      "conyentType": "application/json",
      "payload": payload
    };

    // Slackに送る
    UrlFetchApp.fetch(slack_url, options);
  };  

}
