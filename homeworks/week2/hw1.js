function printStars(n) {
  if (n >= 1 && n <= 30) {
    for (let i = 1; i <= n; i++) {
      console.log("*");
    }
  } else console.log("請輸入1~30");
}

printStars(5);
