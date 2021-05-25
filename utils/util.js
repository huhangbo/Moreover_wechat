function formatTime(data){
  let timestr = "";
  timestr = data;
  let timearr = timestr.split('T');
  let ymd = timearr[0].split('-');
  let hms = timearr[1].split('.');
  let format = ymd[0] + '/' + ymd[1] + '/' + ymd[2] + ' ' + hms[0];
  return format;
}

function getDateDiff(datetime){
  console.log(datetime);
  let update = (Date.parse(datetime))/1000 + 60*60*8;
  let now = (Date.parse(new Date()))/1000;
  console.log(new Date());
  let limit = now - update;
  console.log(limit);
  let content="";
  if(limit<60){
    content = "刚刚";
  }
  else if(limit >= 60 && limit < 3600){
    content = Math.floor(limit/60)+"分钟前";
  }
  else if(limit >= 3600 && limit < 86400){
    content = Math.floor(limit/3600)+"小时前";
  }
  else if(limit >= 86400 && limit < 2592000){
    content = Math.floor(limit/86400)+"天前";
  }
  else if(limit >= 2592000 && limit < 31104000){
    content = Math.floor(limit/2592000)+"个月前";
  }
  else{
    content = "很久前";
  }
  return content;
}

module.exports = {
  getDateDiff: getDateDiff,
  formatTime: formatTime
}