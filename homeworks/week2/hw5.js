function join(arr, concatStr) {
  let newStr = arr[0];
  if (arr !== []) {
    for (let i = 1; i < arr.length; i++) {
      newStr += concatStr + arr[i];
    }
  } else {
    return newStr;
  }
  return newStr;
}

function repeat(str, times) {
  let result = "";
  for (let i = 1; i <= times; i++) {
    result += str;
  }
  return result;
}
