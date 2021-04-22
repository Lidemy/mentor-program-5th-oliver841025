function capitalize(str) {
  let arr = str.split("");
  const capital = arr[0].toUpperCase();
  arr.splice(0, 1, capital);
  return arr.join("");
}
