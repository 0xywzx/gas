var mail = '' // 取得対象のメールアドレス 
var slackUrl = ''; // slack incoming webhookのURL 
var userName = 'にっぽー'; // slack投稿のタイトル
var icon = ':sunglasses'; // slackのアイコン

function dailyReport() {
    
  // 今日の日付を取得
  var date = new Date();
  var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);

  // カレンダーイベントの取得
  var myCal=CalendarApp.getCalendarById(mail);
  var myEvents = myCal.getEvents(startDate, endDate);
  var events = [date.getMonth() + 1 + '/' + date.getDate()];

  // 取得したイベントの整形
  for (var i = 0; i < myEvents.length; i++) {
    var text =
      ('0' + myEvents[i].getStartTime().getHours()).slice(-2) + ':' + ('0' + myEvents[i].getStartTime().getMinutes()).slice(-2) + 
      ' ~ ' + ('0' + myEvents[i].getEndTime().getHours()).slice(-2) + ':' + ('0' + myEvents[i].getEndTime().getMinutes()).slice(-2) +
      ' ' + myEvents[i].getTitle();
    events.push(text);
  }
  
  // slackに投稿
  var jsonData =　{
     "username" : userName,
     "icon_emoji": icon,
     "text" : events.join('\n')
  };

  var payload = JSON.stringify(jsonData);

  var options ={
    "method": "post",
    "contentType": "application/json",
    "payload": payload
  };

  UrlFetchApp.fetch(slackUrl, options);
}

