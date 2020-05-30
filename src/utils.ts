/*
 * @Author: miaoyu
 * @Date: 2020-05-28 20:01:21
 * @LastEditTime: 2020-05-30 15:42:16
 * @LastEditors: miaoyu
 * @Description:
 */

export function getAllPossibleCombinations(length: number) {
  const ret: [number, number][] = [];
  for (let i = 0; i < length; ++i) {
    for (let j = i + 1; j < length; ++j) {
      ret.push([i, j]);
    }
  }
  return ret;
}

export function log(time: number = 500) {
  // console.log(timer)
  let timer: any = null;
  return (...msg: any) => {
    if (timer) return;
    console.log(...msg);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, time);
  };
}
