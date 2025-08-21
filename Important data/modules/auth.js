// ======================= Important data/modules/auth.js =======================
import { store } from '../utils/store.js';
import { renderBadge } from './ui.js';
import { state, sync } from './teamCore.js';


function buildDialog(id, title, inner){
const el = document.getElementById(id); if(!el) return;
el.innerHTML = `
<div class="modal-head">
<h3 id="${id}-title">${title}</h3>
<button class="close" data-close="${id}">סגור</button>
</div>
<div class="dialog-body">${inner}</div>`;
el.querySelector('.close')?.addEventListener('click',()=> el.close());
}


export function mountAuth({ loginModalId, signupModalId }){
buildDialog(loginModalId, 'התחברות', `
<form id="loginForm" method="dialog">
<div class="row">
<div><label for="loginEmail">אימייל</label><input id="loginEmail" type="email" required placeholder="name@example.com"/></div>
<div><label for="loginPass">סיסמה</label><input id="loginPass" type="password" required minlength="4" placeholder="••••"/></div>
</div>
<div class="toolbar"><button class="btn btn-accent" type="submit">כניסה</button>
<span class="helper">אין חשבון? <a href="#" id="goSignup">להרשמה</a></span></div>
</form>`);
buildDialog(signupModalId, 'הרשמה', `
<form id="signupForm" method="dialog">
<div class="row">
<div><label for="signupName">שם מלא</label><input id="signupName" required placeholder="ישראל ישראלי"/></div>
<div><label for="signupEmail">אימייל</label><input id="signupEmail" type="email" required placeholder="name@example.com"/></div>
<div><label for="signupPass">סיסמה</label><input id="signupPass" type="password" required minlength="4" placeholder="לפחות 4 תווים"/></div>
<div><label for="signupPass2">אימות סיסמה</label><input id="signupPass2" type="password" required minlength="4" placeholder="שוב סיסמה"/></div>
</div>
<div class="toolbar"><button class="btn btn-accent" type="submit">צור חשבון</button>
<span class="helper">כבר רשומים? <a href="#" id="goLogin">להתחברות</a></span></div>
</form>`);


const loginModal = document.getElementById(loginModalId);
const signupModal = document.getElementById(signupModalId);
document.getElementById('openLogin')?.addEventListener('click', ()=> loginModal?.showModal());
document.getElementById('openSignup')?.addEventListener('click', ()=> signupModal?.showModal());
document.getElementById('goSignup')?.addEventListener('click', (e)=>{ e.preventDefault(); loginModal?.close(); signupModal?.showModal(); });
document.getElementById('goLogin')?.addEventListener('click', (e)=>{ e.preventDefault(); signupModal?.close(); loginModal?.showModal(); });


document.getElementById('loginForm')?.addEventListener('submit', (e)=>{
e.preventDefault();
const email = document.getElementById('loginEmail').value.trim().toLowerCase();
const pass = document.getElementById('loginPass').value;
const users = store.load('users', []);
const u = users.find(u=>u.email===email && u.pass===pass);
if(!u) return alert('אימייל או סיסמה שגויים');
state.user = { name:u.name, email:u.email }; sync(); renderBadge(state.user); loginModal?.close();
});


document.getElementById('signupForm')?.addEventListener('submit', (e)=>{
e.preventDefault();
const name = document.getElementById('signupName').value.trim();
const email = document.getElementById('signupEmail').value.trim().toLowerCase();
const pass = document.getElementById('signupPass').value;
const pass2 = document.getElementById('signupPass2').value;
if(pass!==pass2) return alert('הסיסמאות אינן תואמות');
const users = store.load('users', []);
if(users.some(u=>u.email===email)) return alert('אימייל כבר רשום');
users.push({ name, email, pass }); store.save('users', users);
signupModal?.close(); loginModal?.showModal();
});
}