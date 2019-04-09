export default (arr = [], key, toggle, dop) => {
  if (!arr.length) return [];
  if (arr.some(el => !(key in el))){
    return console.error("cannot find some keys in array", "key " + key, arr);
  }
  let workArr = JSON.parse(JSON.stringify(arr));
  let sortArr = [];
  let type = typeof workArr[0][key];
  if (Array.isArray(workArr[0][key])) {
    toggle
      ? (sortArr = workArr.sort((a, b) => a[key].length - b[key].length))
      : (sortArr = workArr.sort((a, b) => b[key].length - a[key].length));
  }
  if (type === "number" || type === "boolean") {
    toggle
      ? (sortArr = workArr.sort((a, b) => a[key] - b[key]))
      : (sortArr = workArr.sort((a, b) => b[key] - a[key]));
  }
  if (type === "string") {
    toggle
      ? (sortArr = workArr.sort(
          (a, b) => a[key].charCodeAt() - b[key].charCodeAt()
        ))
      : (sortArr = workArr.sort(
          (a, b) => b[key].charCodeAt() - a[key].charCodeAt()
        ));
  }
  if (workArr[0][key].__proto__.constructor.name === "Object") {
    toggle
      ? (sortArr = workArr.sort((a, b) => a[key][dop] - b[key][dop]))
      : (sortArr = workArr.sort((a, b) => b[key][dop] - a[key][dop]));
  }
  return sortArr;
};
