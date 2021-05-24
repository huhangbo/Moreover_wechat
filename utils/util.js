function formatTime(date) {
  let dates = new Date(date).toJSON();
  return new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}

function getDateDiff(datatime){
  console.log(datatime);
  let createtime = Date.parse(Date(datatime))/1000;
  let now=Date.parse(new Date())/1000;
  console.log(now);
  console.log(createtime);
  let limit=now-createtime;
  let content="";
  if(limit<60){
    content="刚刚";
  }else if(limit>=60 && limit<3600){
    content=Math.floor(limit/60)+"分钟前";
  }else if(limit>=3600 && limit<86400){
    content=Math.floor(limit/3600)+"小时前";
  }else if(limit>=86400 && limit<2592000){
    content=Math.floor(limit/86400)+"天前";
  }else if(limit>=2592000 && limit<31104000){
    content=Math.floor(limit/2592000)+"个月前";
  }else{
    content="很久前";
  }
  return content;
}

module.exports = {
  getDateDiff,formatTime
}