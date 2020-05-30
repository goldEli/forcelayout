/*
 * @Author: miaoyu
 * @Date: 2020-05-28 20:01:21
 * @LastEditTime: 2020-05-30 14:07:58
 * @LastEditors: miaoyu
 * @Description:
 */

import Ball from "./Ball";
// import Line from "./Line";
import * as vector from "./vector";
import * as utils from "./utils";
import { createData } from "./data";

const canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const data = createData(canvas.width, canvas.height, 30);
console.log(data);

enum PARAMS {
  coulomb = 3,
  center = 0.000001,
  centerDistance = 0,
  damping = 0.0001,
}

function render() {
  update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  data.balls.forEach((ball) => {
    ball.render(ctx);
  });
  requestAnimationFrame(render);
}
function update() {
  data.balls.forEach((source) => {
    data.balls.forEach((target) => {
      if (source.id === target.id) return;
      handleCoulombForce(source, target);
      handleCentrialForce(source);
      handleDampingForce(source);
    });
  });
  // handleCoulombForce()
}

/**
 * 库仑力
 * coulombForce = k * e1 * e2 / distance**2
 */
function handleCoulombForce(source: Ball, target: Ball) {
  const k = PARAMS.coulomb;
  const distance = vector.distance(target.p, source.p);
  const force = (k * source.e * target.e) / distance ** 2;
  const direction = vector.sub(vector.create(), source.p, target.p);
  vector.normalize(direction, direction);
  vector.scaleAndAdd(source.f, source.f, direction, force);
}

/**
 * 自定义向画布中心聚拢的力，离得越远力越大
 * centrialForce = distance * k
 */
function handleCentrialForce(ball: Ball) {
  const k = PARAMS.center;
  const center = vector.create(canvas.width / 2, canvas.height / 2);
  let distance = vector.distance(ball.p, center);
  distance = distance < PARAMS.centerDistance ? 0 : distance;
  const centrialForce = distance * k;
  const direction = vector.sub(vector.create(), ball.p, center);
  vector.normalize(direction, direction);
  vector.negate(direction, direction);
  vector.scaleAndAdd(ball.f, ball.f, direction, centrialForce);
}

/**
 * 阻尼力
 * dampingForce = -v*k
 */
function handleDampingForce(ball: Ball) {
  const k = PARAMS.damping;
  const v = vector.len(ball.speed);
  const dampingForce = -1 * v * k;
  const direction = vector.normalize(vector.create(), ball.speed);
  vector.scaleAndAdd(ball.f, ball.f, direction, dampingForce);
}

render();
