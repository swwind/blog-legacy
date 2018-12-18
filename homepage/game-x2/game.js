const elem = document.querySelector('div.container');

// ************ ENGINE ************

const Engine = Matter.Engine;
const Render = Matter.Render;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World  = Matter.World;
const Body   = Matter.Body;

const engine = Engine.create({
  // enableSleeping: true
});

const render = Render.create({
  element: elem,
  engine: engine,
  options: {
    width: 500,
    height: 700,
    background: 'rgba(255, 255, 255, 0)',
    wireframes: false
  }
});

const WALL = {
  isStatic: true,
  friction: 0,
  frictionStatic: 0,
  render: { fillStyle: '#000000' },
  onCollision: (ball, _this) => {
    addScore(1);
    setTimeout(() => {
      World.remove(engine.world, _this);
    }, 20);
  }
}
const ADLL = {
  isStatic: true,
  friction: 0,
  frictionStatic: 0,
  render: { fillStyle: '#00ff66' },
  onCollision: (ball, _this) => {
    addBall(1);
    setTimeout(() => {
      World.remove(engine.world, _this);
    }, 20);
  }
}
const DELL = {
  isStatic: true,
  friction: 0,
  frictionStatic: 0,
  render: { fillStyle: '#ff6666' },
  onCollision: (ball, _this) => {
    World.remove(engine.world, ball);
    setTimeout(() => {
      World.remove(engine.world, _this);
    }, 20);
    for (let item of engine.world.bodies) {
      if (item.name === 'BALL' && !Math.floor(Math.random() * 10)) {
        World.remove(engine.world, item);
      }
    }
  }
}
const FLSH = {
  isStatic: true,
  friction: 0,
  frictionStatic: 0,
  render: { fillStyle: '#666600' },
  onCollision: (ball) => {
    flush();
  }
}
const BALL = { restitution: 1, frictionAir: .001, name: 'BALL', friction: 0, frictionStatic: 0 }

// 创建刚体
// rect = Bodies.circle(300, 100, 5, BALL) // 圆
// circle = Bodies.rectangle(200, 100, 50, 50), // 矩形
// polygon = Bodies.polygon(450, 100, 5, 25), // 多边形
// trapezoid = Bodies.trapezoid(590, 100, 50, 50, 3); // 梯形

const g1 = Bodies.rectangle(-25, 350, 50, 700, { isStatic: true });
const g2 = Bodies.rectangle(250, 725, 500, 50, { isStatic: true });
const g3 = Bodies.rectangle(525, 350, 50, 700, { isStatic: true });
const g4 = Bodies.rectangle(250, -25, 500, 50, { isStatic: true });

World.add(engine.world, [g1, g2, g3, g4]);

engine.world.gravity = {x: 0, y: 0};

Engine.run(engine);
Render.run(render);

// ************ GAME ************

let balls = 10;
let score = 0;

const addScore = (delta) => {
  if (died) return;
  let el = document.querySelector('span.score');
  el.innerHTML = score += delta;
}
let died = false;
const addBall = (delta) => {
  if (died) return;
  let el = document.querySelector('span.balls');
  el.innerHTML = balls += delta;
  if (balls <= 0) {
    alert('game over!');
    died = true;
  }
}

const zz = 500;
const startTurn = (x, y, ball = balls) => {
  if (balls <= 0) return;
  let nx = x / 100000;
  let ny = y / 100000;
  let rect = Bodies.circle(250, 20, 5, BALL);
  World.add(engine.world, rect);
  Events.on(rect, 'sleepStart sleepEnd', () => {
    World.remove(engine.world, rect);
    addBall(1);
  });
  Body.applyForce(rect, rect.position, { x: nx, y: ny});
  addBall(-1);
  return true;
}

elem.addEventListener('click', ({ offsetX, offsetY }) => {
  startTurn(offsetX - 250, offsetY - 20);
})

Events.on(engine, 'collisionStart', (e) => {
  let pairs = e.source.broadphase.pairs;
  for (var g in pairs) {
    const [a, b] = pairs[g];
    b.onCollision && b.onCollision(a, b);
    a.onCollision && a.onCollision(b, a);
  }
})

// World.add(engine.world, Bodies.rectangle(250, 200, 400, 50, FLSH))

const rand = (range) => {
  return Math.floor(Math.random() * range);
}
const random_shuffle = (arr) => {
  for (let i = 1; i < arr.length; ++ i) {
    let j = rand(i);
    let tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
  }
  return arr;
}
let tips = [];
const randomType = () => {
  switch (rand(10)) {
    case 0:  return FLSH;
    case 1:  return ADLL;
    case 2:  return DELL;
    default: return WALL;
  }
}
const randomBody = (x, y, type) => {
  let ele = Bodies.polygon(x, y, rand(7), 20, type);
  Body.rotate(ele, rand(360));
  return ele;
}
const flush = () => {
  for (let it of tips)
    World.remove(engine.world, it);
  tips = [];
  tips.push(FLSH); tips.push(ADLL);
  tips.push(DELL); tips.push(WALL);
  while (tips.length < 17) {
    tips.push(randomType());
  }
  tips = random_shuffle(tips);
  let cnt = -1;
  for (let i = 100; i < 700; i += 100) {
    let item = randomBody(125, i, tips[++ cnt]);
    World.add(engine.world, item);
    tips[cnt] = item;
  }
  for (let i = 100; i < 700; i += 100) {
    let item = randomBody(375, i, tips[++ cnt]);
    World.add(engine.world, item);
    tips[cnt] = item;
  }
  for (let i = 150; i < 600; i += 100) {
    let item = randomBody(250, i, tips[++ cnt]);
    World.add(engine.world, item);
    tips[cnt] = item;
  }
}
flush();

// addBall(Infinity);
// setInterval(() => startTurn(Math.sin((new Date)/1000) * 100, Math.abs(Math.cos((new Date)/1000) * 100)), 100);


document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyR') {
    addBall(-2);
    flush();
  }
})
