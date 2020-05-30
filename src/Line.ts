/*
 * @Author: miaoyu
 * @Date: 2020-05-28 20:01:21
 * @LastEditTime: 2020-05-30 14:42:15
 * @LastEditors: miaoyu
 * @Description: 
 */ 
import * as vector from "./vector";
import Ball from "./Ball"

class Line {
  id:string
  angle = 0;
  strokeStyle = "white";
  length = 200;
  source: Ball;
  target: Ball;

  constructor(id: string, source: Ball, target: Ball) {
    this.id = id;
    this.source = source
    this.target = target
  }
  render(ctx: CanvasRenderingContext2D) {

    ctx.save();
    // ctx.translate(this.p[0], this.p[1]);
    // ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(this.source.p[0], this.source.p[1]);
    ctx.lineTo(this.target.p[0], this.target.p[1]);
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default Line;
