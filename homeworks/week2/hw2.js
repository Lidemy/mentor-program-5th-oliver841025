function capitalize(str) {
  let arr = str.split("");
  if ((arr[0] = arr[0].toUpperCase())) {
    return arr.join("");
  } else if ((arr[0] = arr[0].toLowerCase())) {
    arr[0].toUpperCase();
    return arr.join("");
  } else return arr.join("");
}
