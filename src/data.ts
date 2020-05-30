/*
 * @Author: miaoyu
 * @Date: 2020-05-28 20:05:57
 * @LastEditTime: 2020-05-28 21:01:30
 * @LastEditors: miaoyu
 * @Description:
 */

import Ball from "./Ball";
import * as vector from "./vector";

export function createData(width: number, height: number, num: number = 10) {
  const balls: Ball[] = [];
  for (let i = 0; i < num; ++i) {
    const ball = new Ball(i.toString())
    ball.p = vector.create(
      random(width*0.2, height*0.8),
      random(width*0.2, height*0.8),
    )
    balls.push(ball)
  }
  return {balls}
}

function random(min:number, max:number) {
  return Math.floor(Math.random()*max + min)
}
