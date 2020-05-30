/*
 * @Author: miaoyu
 * @Date: 2020-05-28 20:05:57
 * @LastEditTime: 2020-05-30 16:32:18
 * @LastEditors: miaoyu
 * @Description:
 */

import Ball from "./Ball";
import Line from "./Line"
import * as vector from "./vector";

export function createData(
  width: number, 
  height: number, 
  ballNumber: number = 30, 
  lineNumber: number = 10
) {
  const balls: Ball[] = [];
  const lines: Line[] = []
  for (let i = 0; i < ballNumber; ++i) {
    const ball = new Ball(i.toString())
    ball.p = vector.create(
      random(width*0.2, height*0.8),
      random(width*0.2, height*0.8),
    )
    balls.push(ball)
  }
  for (let i = 0; i < lineNumber; ++i) {
    const source = random(0, ballNumber - 1)
    const target = random(0, ballNumber - 1)
    if (source === target) {
      continue
    }
    const line = new Line(i.toString(), balls[source], balls[target])
    balls[source].lines.push(line)
    balls[target].lines.push(line)
    lines.push(line)
  }
  console.log(lines)
  return {balls, lines}
}

function random(min:number, max:number): number {
  return Math.floor(Math.random()*max + min)
}
