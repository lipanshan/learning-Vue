export function setLocalstorage (id, key, val) {
  let seller = window.localStorage.getItem('_seller_');
  if (seller) {
    if (!seller[id]) {
      seller[id] = {};
    }
  } else {
    seller = {};
    seller[id] = {};
  }
  seller[id][key] = val;
  window.localStorage.setItem('_seller_', JSON.stringify(seller));
};

export function getLocalstorage (id, key, def) {
  let seller = window.localStorage.getItem('_seller_');
  seller = JSON.parse(seller);
  if (seller && seller[id] && seller[id][key]) {
    return seller[id][key];
  } else {
    return def;
  }
};
