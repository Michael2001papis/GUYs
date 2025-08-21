// // // // ======================= Important data/modules/ui.js =======================
// // // export function toast(msg){
// // // const t = document.getElementById('toast');
// // // const m = document.getElementById('toastMsg');
// // // if(!t||!m) return; m.textContent = msg; t.hidden = false; clearTimeout(toast._t);
// // // toast._t = setTimeout(()=> (t.hidden=true), 1800);
// // // }
// // // export function renderBadge(user){
// // // const badge = document.getElementById('userBadge');
// // // const hello = document.getElementById('userHello');
// // // const openLogin = document.getElementById('openLogin');
// // // const openSignup = document.getElementById('openSignup');
// // // if(user){ hello.textContent = `שלום, ${user.name?.split(' ')[0]||'משתמש'}`; badge.hidden=false; if(openLogin) openLogin.hidden=true; if(openSignup) openSignup.hidden=true; }
// // // else { if(badge) badge.hidden=true; if(openLogin) openLogin.hidden=false; if(openSignup) openSignup.hidden=false; }
// // // }

// // export function confettiBurst() {
// //   const canvas = document.createElement("canvas");
// //   canvas.style.position = "fixed";
// //   canvas.style.inset = "0";
// //   canvas.style.pointerEvents = "none";
// //   document.body.appendChild(canvas);
// //   const ctx = canvas.getContext("2d");
// //   canvas.width = innerWidth;
// //   canvas.height = innerHeight;

// //   const pieces = Array.from({ length: 150 }, () => ({
// //     x: Math.random() * canvas.width,
// //     y: Math.random() * canvas.height - canvas.height,
// //     w: 6,
// //     h: 12,
// //     col: `hsl(${Math.random() * 360},100%,50%)`,
// //     dy: 2 + Math.random() * 4,
// //     dx: -2 + Math.random() * 4,
// //     rot: Math.random() * 2 * Math.PI,
// //   }));

// //   let frame = 0;
// //   function draw() {
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     pieces.forEach((p) => {
// //       ctx.save();
// //       ctx.translate(p.x, p.y);
// //       ctx.rotate(p.rot);
// //       ctx.fillStyle = p.col;
// //       ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
// //       ctx.restore();
// //       p.y += p.dy;
// //       p.x += p.dx;
// //       p.rot += 0.1;
// //     });
// //     if (frame++ < 100) requestAnimationFrame(draw);
// //     else canvas.remove();
// //   }
// //   draw();
// // }

// Important data/modules/ui.js
export function toast(msg){
  const t = document.getElementById('toast');
  const m = document.getElementById('toastMsg');
  if(!t || !m) return;
  m.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (t.hidden = true), 1800);
}

export function renderBadge(user){
  const badge = document.getElementById('userBadge');
  const hello = document.getElementById('userHello');
  const openLogin  = document.getElementById('openLogin');
  const openSignup = document.getElementById('openSignup');
  if(user){
    if(hello) hello.textContent = `שלום, ${user.name?.split(' ')[0] || 'משתמש'}`;
    if(badge) badge.hidden = false;
    if(openLogin)  openLogin.hidden  = true;
    if(openSignup) openSignup.hidden = true;
  } else {
    if(badge) badge.hidden = true;
    if(openLogin)  openLogin.hidden  = false;
    if(openSignup) openSignup.hidden = false;
  }
}

export function confettiBurst(){
  const canvas = document.createElement('canvas');
  canvas.style.position='fixed';
  canvas.style.inset='0';
  canvas.style.pointerEvents='none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth; canvas.height = innerHeight;

  const pieces = Array.from({length:150}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height - canvas.height,
    w: 6, h: 12,
    col: `hsl(${Math.random()*360},100%,50%)`,
    dy: 2 + Math.random()*4,
    dx: -2 + Math.random()*4,
    rot: Math.random()*2*Math.PI
  }));

  let frames = 0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle=p.col;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
      p.y+=p.dy; p.x+=p.dx; p.rot+=0.1;
    });
    if(frames++ < 100) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}
