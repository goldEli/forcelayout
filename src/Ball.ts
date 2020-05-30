/*
 * @Author: miaoyu
 * @Date: 2020-05-28 20:01:21
 * @LastEditTime: 2020-05-30 16:47:29
 * @LastEditors: miaoyu
 * @Description: 
 */ 
import * as vector from "./vector";
import Line from "./Line";

class Ball {
  radius: number = 20;
  fillStyle: string = "red";
  /**
   * 位置
   */
  p = vector.create(0, 0);
  /**
   * 电荷
   */
  e: number = 1;
  /**
   * 受力
   */
  f = vector.create(0, 0)
  /**
   * 加速度
   */
  a = vector.create(0, 0);
  /**
   * 速度
   */
  speed = vector.create(0, 0);
  /**
   * 质量
   */
  m = 1;
  /**
   * line
   */
  lines: Line[] = []
  /**
   * 摩擦力
   */
  friction = 0.8;
  id: string;
  constructor(id: string) {
    this.id = id
  }

  update() {
    /**
     * 计算加速度
      * a = f/m
     */
    vector.scale(this.a, this.f, 1/this.m)
    /**
     * 计算速度
     */
    this.speed = vector.add(this.speed, this.speed, this.a)
    this.speed = vector.scale(this.speed, this.speed, this.friction)
    
    this.p = vector.add(this.p, this.p, this.speed)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    this.update()
    ctx.translate(this.p[0], this.p[1]);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

export default Ball;
