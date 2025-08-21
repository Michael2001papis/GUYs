// ======================= Important data/modules/ui.js =======================
export function toast(msg){
const t = document.getElementById('toast');
const m = document.getElementById('toastMsg');
if(!t||!m) return; m.textContent = msg; t.hidden = false; clearTimeout(toast._t);
toast._t = setTimeout(()=> (t.hidden=true), 1800);
}
export function renderBadge(user){
const badge = document.getElementById('userBadge');
const hello = document.getElementById('userHello');
const openLogin = document.getElementById('openLogin');
const openSignup = document.getElementById('openSignup');
if(user){ hello.textContent = `שלום, ${user.name?.split(' ')[0]||'משתמש'}`; badge.hidden=false; if(openLogin) openLogin.hidden=true; if(openSignup) openSignup.hidden=true; }
else { if(badge) badge.hidden=true; if(openLogin) openLogin.hidden=false; if(openSignup) openSignup.hidden=false; }
}