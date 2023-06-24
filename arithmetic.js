// 爬楼梯
const climbStairs = function (n) {
  if (n < 2) return 1;
  let dp0 = 1;
  let dp1 = 1;
  for (let i = 2; i <= n; i++) {
    [dp0, dp1] = [dp1, dp1 + dp0];
    console.log(dp0, dp1);
  }
  return dp1;
};
const result = climbStairs(4);
console.log(result);
