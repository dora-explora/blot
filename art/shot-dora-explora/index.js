/*
title: shot
author: dora-explora
snapshot: 1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const shot = [
  [45, 85],
  [15, 110],
  [25, 82],
  [5, 77.5],
  [25, 73],
  [15, 42.66],
  [45, 70],
  [45, 85],
];

const headturtle = new bt.Turtle();
headturtle.up();
headturtle.jump([45.3545, 74]);
headturtle.right(78.5);
headturtle.down();
headturtle.arc(337, 17.5);

const head = bt.catmullRom([
  [45, 81],
  [48, 88],
  [52, 92],
  [59, 95],
  [66, 95],
  [73, 92],
  [77, 88],
  [80, 81],
  [80, 74],
  [77, 67],
  [73, 63],
  [66, 60],
  [59, 60],
  [52, 63],
  [48, 67],
  [45, 74],
]);

const bodyA = bt.catmullRom([
  [53, 62.4],
  [46, 45],
  [30, 37],
  [23, 19],
  [20, 0],
]);

const bodyB = bt.catmullRom([
  [105, 0],
  [102, 19],
  [95, 37],
  [79, 45], 
  [72, 62.4],
]);

const lines = [
  [[79.64, 81], [45.3545, 81]],
  [[79.8, 80], [45.3545, 80]],
  [[79.93, 79], [45.3545, 79]],
  [[79.98, 78], [45.3545, 78]],
  [[79.98, 77], [45.3545, 77]],
  [[79.93, 76], [45.3545, 76]],
  [[79.8, 75], [45.3545, 75]],
  [[79.64, 74], [45.3545, 74]],
];

function retry(turtle, polyline) {
  turtle.up();
  let newposition = [bt.randIntInRange(bt.bounds([polyline]).xMin, bt.bounds([polyline]).xMax), bt.randIntInRange(bt.bounds([polyline]).yMin, bt.bounds([polyline]).yMax)]
  turtle.goTo(newposition);
   while (!bt.pointInside([polyline], turtle.pos)) {
     newposition = [bt.randIntInRange(bt.bounds([polyline]).xMin, bt.bounds([polyline]).xMax), bt.randIntInRange(bt.bounds([polyline]).yMin, bt.bounds([polyline]).yMax)]
     turtle.goTo(newposition);
   }
   turtle.down();
}

function drawMaze(polyline) {
  const turtle = new bt.Turtle();
  turtle.up();
  turtle.goTo([25, 78]);
  turtle.down();
  let illegal = true;
  // bt.setRandSeed(11);
  
  const visits = new Map();
  visits.set(`25,78`, true);
  const delta = 0.5;
  let newposition;
  let poskey;
  
  for (let i = 0; i < 3000; i++) {
    switch (bt.randIntInRange(0, 3)) {
      case 0:
        while (illegal) {
          newposition = [turtle.pos[0] + delta, turtle.pos[1]];
          poskey = `${newposition[0]},${newposition[1]}`;
          if (bt.pointInside([polyline], newposition) && visits.get(poskey) != true) {
            illegal = false;
          } else {
            retry(turtle, polyline);
          }
        }
        turtle.step([delta, 0]);
        visits.set(poskey, true);
        illegal = true;
        break;
      case 1:
        while (illegal) {
          newposition = [turtle.pos[0], turtle.pos[1] + delta];
          poskey = `${newposition[0]},${newposition[1]}`;
          if (bt.pointInside([polyline], newposition) && visits.get(poskey) != true) {
            illegal = false;
          } else {
            retry(turtle, polyline);
          }
        }
        turtle.step([0, delta]);
        visits.set(poskey, true);
        illegal = true;
        break;
      case 2:
        while (illegal) {
          newposition = [turtle.pos[0] - delta, turtle.pos[1]];
          poskey = `${newposition[0]},${newposition[1]}`;
          if (bt.pointInside([polyline], newposition) && visits.get(poskey) != true) {
            illegal = false;
          } else {
            retry(turtle, polyline);
          }
        }
        turtle.step([-delta, 0]);
        visits.set(poskey, true);
        illegal = true;
        break;
      case 3:
        while (illegal) {
          newposition = [turtle.pos[0], turtle.pos[1] - delta];
          poskey = `${newposition[0]},${newposition[1]}`;
          if (bt.pointInside([polyline], newposition) && visits.get(poskey) != true) {
            illegal = false;
          } else {
            retry(turtle, polyline);
          }
        }
        turtle.step([0, -delta]);
        visits.set(poskey, true);
        illegal = true;
        break;
    }
  }
  drawLines(turtle.lines());
}

drawMaze(shot);
drawLines([bodyA, bodyB]);
drawLines(lines);
drawLines(headturtle.lines());