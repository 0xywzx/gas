function getCalendar() {
 
  var mySheet=SpreadsheetApp.getActiveSheet(); //シートを取得
  var no=1; //No
 
  var myCal=CalendarApp.getCalendarById(''); //特定のIDのカレンダーを取得
 
  var date='2021/11/01 00:00:00'; //対象月を指定
  var startDate=new Date(date); //取得開始日
  var endDate=new Date(date);
  endDate.setMonth(endDate.getMonth()+1);　//取得終了日
 
  var myEvents=myCal.getEvents(startDate,endDate); //カレンダーのイベントを取得
 
  /* イベントの数だけ繰り返してシートに記録 */
  for each(var evt in myEvents){
    mySheet.appendRow(
      [
        no, //No
        evt.getTitle(), //イベントタイトル
        evt.getStartTime(), //イベントの開始時刻
        evt.getEndTime(), //イベントの終了時刻
        "=INDIRECT(\"RC[-1]\",FALSE)-INDIRECT(\"RC[-2]\",FALSE)" //所要時間を計算
      ]
    );
    no++;
  }
}
