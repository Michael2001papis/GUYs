// ======================= Important data/pages/home.js =======================
import { initialPlayers } from "../../General%20data/seed.js";
import { state, initPlayersIfEmpty, sync } from "../modules/teamCore.js";
import { toast } from "../modules/ui.js";
import { addToTeam } from "../modules/teamCore.js";

function getFilteredPlayers() {
  const { q, pos, minOvr, sortBy } = state.filters;
  let arr = state.players.filter(
    (p) =>
      (!pos || p.pos === pos) &&
      p.ovr >= (Number(minOvr) || 0) &&
      (!q || `${p.name} ${p.club}`.toLowerCase().includes(q.toLowerCase()))
  );
  if (sortBy === "ovrDesc") arr.sort((a, b) => b.ovr - a.ovr);
  else if (sortBy === "ovrAsc") arr.sort((a, b) => a.ovr - b.ovr);
  else if (sortBy === "name")
    arr.sort((a, b) => a.name.localeCompare(b.name, "he"));
  return arr;
}
function renderFiltersInfo() {
  const playersCountEl = document.getElementById("playersCount");
  if (playersCountEl)
    playersCountEl.textContent = `סה"כ שחקנים: ${state.players.length}`;
}
function renderCards() {
  const cardsEl = document.getElementById("cards");
  cardsEl.innerHTML = "";
  getFilteredPlayers().forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
<span class=\"badge\" aria-label=\"דירוג\">OVR ${p.ovr}</span>
<img src=\"${p.img}\" alt=\"${p.name}\" loading=\"lazy\"/>
<h3>${p.name}</h3>
<div class=\"meta\"><span>${p.pos}</span> • <span>${p.club}</span></div>
<div class=\"stats\"><span class=\"stat\">דמו</span><span class=\"stat\">ID: ${p.id.slice(
      0,
      6
    )}</span></div>
<div style=\"display:flex;gap:10px\">
<button class=\"btn btn-accent\" data-action=\"add\" data-id=\"${
      p.id
    }\">הוסף לקבוצה</button>
<button class=\"btn btn-ghost\" data-action=\"info\" data-id=\"${
      p.id
    }\">עוד פרטים</button>
</div>`;
    cardsEl.appendChild(card);
  });
}
function bindFilters() {
  const qEl = document.getElementById("q");
  const fPosEl = document.getElementById("fPos");
  const sortByEl = document.getElementById("sortBy");
  const minOvrEl = document.getElementById("minOvr");
  function update() {
    state.filters.q = qEl.value.trim();
    state.filters.pos = fPosEl.value;
    state.filters.sortBy = sortByEl.value;
    state.filters.minOvr = Number(minOvrEl.value) || 0;
    renderCards();
  }
  qEl?.addEventListener("input", update);
  [fPosEl, sortByEl, minOvrEl].forEach((el) =>
    el?.addEventListener("change", update)
  );
}
function bindCardsClicks() {
  document.getElementById("cards")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    const p = state.players.find((x) => x.id === id);
    if (!p) return;
    if (btn.getAttribute("data-action") === "add") {
      const t = {
        id: p.id,
        name: p.name,
        pos: p.pos,
        club: p.club,
        ovr: p.ovr,
      };
      const [ok, msg] = addToTeam(t);
      toast(msg);
    } else {
      alert(`${p.name}\nעמדה: ${p.pos}\nמועדון: ${p.club}\nדירוג: ${p.ovr}`);
    }
  });
}
function bindImport() {
  const importBtn = document.getElementById("importBtn");
  const importFile = document.getElementById("importFile");
  importBtn?.addEventListener("click", () => importFile.click());
  importFile?.addEventListener("change", async (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    try {
      const txt = await file.text();
      const obj = JSON.parse(txt);
      let changed = false;
      if (Array.isArray(obj.players)) {
        state.team = obj.players.slice(0, 11);
        changed = true;
      }
      if (Array.isArray(obj) && obj.length && obj[0].name && obj[0].pos) {
        state.players = obj.concat(state.players);
        changed = true;
      }
      if (obj.formation) {
        state.formation = obj.formation;
        changed = true;
      }
      if (obj.name) {
        state.teamName = String(obj.name);
        changed = true;
      }
      if (changed) {
        sync();
        renderFiltersInfo();
        renderCards();
        toast("ייבוא בוצע");
      } else toast("קובץ לא מזוהה");
    } catch {
      toast("שגיאה בקריאת הקובץ");
    } finally {
      ev.target.value = "";
    }
  });
}
export function mountHome() {
  initPlayersIfEmpty(initialPlayers);
  renderFiltersInfo();
  renderCards();
  bindFilters();
  bindCardsClicks();
  bindImport();
}