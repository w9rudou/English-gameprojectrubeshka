const g=document.getElementById("g"),c=g.getContext("2d");

// Игрок
let px=50, py=200, vy=0, dir=0, onGround=false, quiz=false;

// Платформы [x,y,width,height]
const platforms=[
  {x:0,y:250,w:500,h:50},
  {x:100,y:200,w:100,h:10},
  {x:250,y:150,w:100,h:10},
  {x:400,y:100,w:80,h:10} // уровень с дверью
];

// Вопросы
const levels=[
  {q:"She ___ to school.", a:["go","goes","going"], c:1},
  {q:"I ___ pizza.", a:["eat","eats","eating"], c:0},
  {q:"They ___ happy.", a:["is","are","am"], c:1},
  {q:"He ___ football every day.", a:["play","plays","playing"], c:1},
  {q:"We ___ English.", a:["study","studies","studying"], c:0},
  {q:"I ___ a book.", a:["read","reads","reading"], c:0},
  {q:"She ___ a cat.", a:["have","has","having"], c:1},
  {q:"They ___ to the park.", a:["go","goes","going"], c:0},
  {q:"He ___ fast.", a:["run","runs","running"], c:1},
  {q:"I ___ tired.", a:["am","is","are"], c:0}
];

let currentLevel=0;

// Мобильные кнопки
document.getElementById("left").ontouchstart=()=>dir=-1;
document.getElementById("left").ontouchend=()=>dir=0;
document.getElementById("right").ontouchstart=()=>dir=1;
document.getElementById("right").ontouchend=()=>dir=0;
document.getElementById("jump").ontouchstart=()=>{if(onGround)vy=-12};

// Клавиши ПК
document.onkeydown=e=>{
  if(e.key=="ArrowLeft") dir=-1;
  if(e.key=="ArrowRight") dir=1;
  if(e.key==" "&&onGround) vy=-12;
};
document.onkeyup=e=>{
  if(e.key=="ArrowLeft"||e.key=="ArrowRight") dir=0;
};

// Цикл игры
function loop(){
  c.clearRect(0,0,500,300);

  // Гравитация
  vy+=0.6; py+=vy; onGround=false;

  // Коллизия с платформами
  for(let p of platforms){
    if(px+20>p.x && px< p.x+p.w && py+20>p.y && py+20< p.y+p.h){
      py=p.y-20; vy=0; onGround=true;
    }
    c.fillStyle="brown";
    c.fillRect(p.x,p.y,p.w,p.h);
  }

  // Движение
  px+=dir*2;

  // Игрок
  c.fillStyle="red";
  c.fillRect(px,py,20,20);

  // Дверь (уровень)
  const door=platforms[platforms.length-1];
  c.fillStyle="green";
  c.fillRect(door.x+door.w-20,door.y-20,20,20);

  // Проверка достижения двери
  if(px+20>door.x+door.w-20 && py+20>door.y-20 && !quiz){
    showQuiz();
  }

  requestAnimationFrame(loop);
}

// Вопрос
function showQuiz(){
  quiz=true; quizDiv.style.display="block";
  let Q=levels[currentLevel];
  q.textContent=Q.q;
  [...quizDiv.querySelectorAll("button")].forEach((b,i)=>b.textContent=Q.a[i]);
}

// Ответ
function ans(i){
  let Q=levels[currentLevel];
  if(i==Q.c){
    alert("Correct ✅");
    currentLevel++;
    if(currentLevel>=levels.length){
      alert("You finished all levels! 🎉");
      currentLevel=0;
    }
    // Сброс позиции
    px=50; py=200; quiz=false; quizDiv.style.display="none";
  } else alert("Wrong ❌ Try again!");
}

const quizDiv=document.getElementById("quiz");
const q=document.getElementById("q");
loop();