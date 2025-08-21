// ======================= Important data/pages/team.js =======================
import { POSITIONS, FORMATIONS } from "../../General%20data/constants.js";
import {
  state,
  sync,
  removeFromTeam,
  activeRule,
} from "../modules/teamCore.js";
import { toast } from "../modules/ui.js";
import { uid } from "../utils/store.js";

function renderTeam() {
  const teamCountEl = document.getElementById("teamCount");
  const rosterEl = document.getElementById("roster");
  teamCountEl.textContent = `${state.team.length}/11`;
  rosterEl.innerHTML = "";
  if (!state.team.length) {
    const empty = document.createElement("div");
    empty.className = "slot";
    empty.innerHTML =
      '<span class="info">עוד אין שחקנים בקבוצה. בחר/י שחקנים בעמוד הבית או הוסף/י מותאם.</span>';
    rosterEl.appendChild(empty);
    return;
  }
  state.team.forEach((p) => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.innerHTML = `<div class="info"><strong>${p.name}</strong><span style="color:var(--muted)">${p.pos} • ${p.club} • OVR ${p.ovr}</span></div>
<button class="rm" aria-label="הסרת ${p.name}" data-id="${p.id}">הסר</button>`;
    rosterEl.appendChild(slot);
  });
}
function renderFormationRule() {
  const r = activeRule();
  const span = Object.entries(r)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" | ");
  document.getElementById(
    "formationRule"
  ).textContent = `מגבלות מערך – ${span}`;
}
function bindTeamActions() {
  document.getElementById("roster")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".rm");
    if (!btn) return;
    removeFromTeam(btn.getAttribute("data-id"));
    renderTeam();
  });
  document.getElementById("resetTeam")?.addEventListener("click", () => {
    if (confirm("לאפס את הקבוצה?")) {
      state.team = [];
      sync();
      renderTeam();
      toast("הקבוצה אופסה");
    }
  });
  document.getElementById("exportTeam")?.addEventListener("click", () => {
    const data = {
      name: state.teamName || "הקבוצה שלי",
      formation: state.formation,
      players: state.team,
      createdAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `${data.name.replace(/\s+/g, "_")}.json`,
    });
    a.click();
    URL.revokeObjectURL(url);
  });
}
function bindHeaderControls() {
  const formationEl = document.getElementById("formation");
  const teamNameEl = document.getElementById("teamName");
  formationEl.innerHTML = Object.keys(FORMATIONS)
    .map(
      (f) => `<option ${f === state.formation ? "selected" : ""}>${f}</option>`
    )
    .join("");
  teamNameEl.value = state.teamName;
  formationEl.addEventListener("change", () => {
    state.formation = formationEl.value;
    sync();
    renderFormationRule();
  });
  teamNameEl.addEventListener("input", () => {
    state.teamName = teamNameEl.value;
    sync();
  });
}
function bindCustomPlayer() {
  const pPosEl = document.getElementById("pPos");
  pPosEl.innerHTML = POSITIONS.map((p) => `<option>${p}</option>`).join("");
  document.getElementById("addCustom")?.addEventListener("click", () => {
    const name = document.getElementById("pName").value.trim();
    if (!name) return toast("יש למלא שם שחקן");
    const pos = pPosEl.value;
    const club =
      document.getElementById("pClub").value.trim() || "קבוצה מותאמת";
    const ovr = Math.max(
      0,
      Math.min(99, parseInt(document.getElementById("pOvr").value || "80", 10))
    );
    const img = document.getElementById("pImg").value.trim();
    const newP = { id: uid(), name, pos, club, ovr, img: img || "" };
    state.players.unshift(newP);
    sync();
    toast("נוצר כרטיס שחקן!");
    ["pName", "pClub", "pImg"].forEach(
      (id) => (document.getElementById(id).value = "")
    );
  });
}
export function mountTeamPage() {
  bindHeaderControls();
  renderFormationRule();
  renderTeam();
  bindTeamActions();
  bindCustomPlayer();
}