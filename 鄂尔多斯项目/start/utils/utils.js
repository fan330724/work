function formatTime(date) {
  var year = date.getFullYear()
  var month = (date.getMonth() + 1 )< 10? ('0' + (date.getMonth() + 1 )) : (date.getMonth() + 1 )
  var day = date.getDate()<10? ('0' +  date.getDate()) :  date.getDate()
  var hour = date.getHours()<10? ('0' + date.getHours()) : date.getHours()
  var minute = date.getMinutes()<10? ('0' + date.getMinutes()) : date.getMinutes()
  var second = date.getSeconds()<10? ('0' + date.getSeconds()) : date.getSeconds()
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
function formathour(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var hour1 = hour < 10 ? ('0' + hour) : hour;
  var minute1 = minute < 10 ? ('0' + minute) : minute;
  var second1 = second < 10 ? ('0' + second) : second;
  return hour1+ ":" + minute1 + ":" + second1
}
function formatDate(date) {
  var year = date.getFullYear()
  var month = (date.getMonth() + 1 )< 10? ('0' + (date.getMonth() + 1 )) : (date.getMonth() + 1 )
  var day = date.getDate()<10? ('0' +  date.getDate()) :  date.getDate()
  return year + "-" + month + "-" + day
}
module.exports = {
  formatTime: formatTime,
  formathour,
  formatDate
}