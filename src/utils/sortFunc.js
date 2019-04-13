export default (arr = [], key, toggle, dop) => {
  if (!arr.length) return [];
  let result = JSON.parse(JSON.stringify(arr));
  let keyExistCheckcer = function(obj = 0) {
    return Array.from(arguments)
      .splice(1, arguments.length)
      .reduce(
        (prev, el) =>
          prev ? typeof prev[el] === "function" ? prev[el]()
              : prev[el] ? prev[el] 
              : typeof prev === "object" ? 0 : prev
              : 0,
        obj
      );
  };
  let getDiffer = (x, y) => x - y;
  let picking = function() {
    return result.sort((a, b) => {
      let first = keyExistCheckcer(a, ...arguments);
      let second = keyExistCheckcer(b, ...arguments);
      return toggle ? getDiffer(first, second) : getDiffer(second, first);
    });
  };
  let type = typeof result[0][key];
  return Array.isArray(result[0][key]) ? picking(key, "length") 
        : type === "number" || type === "boolean" ? picking(key)
        : type === "string" ? picking(key, "charCodeAt") : picking(key, dop);
};
