function searchNum(arr, n) {
  let L = 0;
  let R = arr.length - 1;
  while (L <= R) {
    let M = Math.floor((L + R) / 2);
    if (arr[M] == n) {
      return M;
    } else if (arr[M] > n) {
      R = M - 1;
    } else {
      L = M + 1;
    }
  }
  return -1;
}
