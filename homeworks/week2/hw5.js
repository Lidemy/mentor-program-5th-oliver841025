function join(arr, concatStr) {
  let newStr = arr[0];
  for (let i = 1; i < arr.length; i++) {
    newStr += concatStr + arr[i];
  }
  return newStr;
}

function repeat(str, times) {
  let arr = str.split(" ");
  for (let i = 1; i <= times - 1; i++) {
    arr.push(str);
  }
  return arr.join("");
}

join(["a", "b"], "!");
repeat("a", 5);
