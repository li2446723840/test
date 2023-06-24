/**
 * @description: 计算考核总结表时间
 * @author: 汪健力
 * @update: 更新内容 by 李四 2013-04-13
 */
let dayjs = require("dayjs");
function countDay(
  year, // 年
  month, // 月
  workList = [], // 工作时间跨度
  excludeList = [], // excludeList 周一至周五节假日
  includeList = [] // includeList 周六、周日节假日调休
) {
  if (!(year && month)) {
    console.log(`请输入${year ? "月份" : "年份"}`);
    return;
  }
  let dateList = [];
  let totalDays = dayjs(`${year}/${month}/01`).daysInMonth(); // 当前月的天数
  let i = 1;
  while (i <= totalDays) {
    // 获取星期几
    let week = dayjs(`${year}/${month}/${i}`).day();
    if (
      (week !== 0 && week !== 6 && !excludeList.includes(i)) ||
      includeList.includes(i)
    ) {
      dateList.push(`${year}/${month}/${i}`);
    }
    i++;
  }
  // console.log(dateList);
  workList.reduce((per, cur, index) => {
    let start = parseInt(per / 9);
    if (!(per % 9) && index) {
      start -= 1;
    }
    let end = parseInt((per + cur) / 9);
    if (!((per + cur) % 9)) {
      end -= 1;
    }
    // console.log(index, per, cur, start, end);
    console.log([dateList[start], dateList[end]]);
    return per + cur;
  }, 0);
}
countDay(2022, 6, [76, 11, 9, 9, 9, 48, 27], [3]);
