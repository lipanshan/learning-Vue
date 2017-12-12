export function getUrl () {
  let allURL = window.location.search;
  let parms = allURL.match(/([?&][^?&]+)/g);
  let obj = {};
  if (parms) {
    parms.forEach((value) => {
      let arr = value.substring(1).split('=');
      let key = decodeURIComponent(arr[0]);
      let val = decodeURIComponent(arr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
