function reverse(str) {
  let newArray = [];
  arr = str.split("");
  for (let i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  console.log(newArray.join(""));
}
