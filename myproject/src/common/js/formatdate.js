export function formatDate (timeDate, format) {
  let year = timeDate.getFullYear() + '';
  if (/(y+)/gi.test(format)) {
    format = format.replace(RegExp.$1, year.substr((4 - RegExp.$1.length)));
  }
  let time = {
    'm+': timeDate.getMonth() + 1,
    'd+': timeDate.getDate(),
    'h+': timeDate.getHours(),
    'i+': timeDate.getMinutes()
  };
  function padZeno (num) {
    return ('00' + num).substr((num + '').length);
  }
  for (let key in time) {
    if (new RegExp(`(${key})`).test(format)) {
      format = format.replace(RegExp.$1, padZeno(time[key]));
    }
  }
  return format;
}
