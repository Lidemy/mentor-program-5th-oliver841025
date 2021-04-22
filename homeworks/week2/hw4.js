function printFactor(n) {
  if (n > 0 && n % 1 === 0) {
    //確保 n 是正整數
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) {
        console.log(i);
      }
    }
  } else if (n === 0) {
    console.log(" 0 為任意整數之因數😅");
  } else console.log("請打正整數😅");
}

printFactor(10);
