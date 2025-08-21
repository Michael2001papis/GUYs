// ======================= Important data/modules/teamCore.js =======================
import { store } from '../utils/store.js';
import { FORMATIONS } from '../../General%20data/constants.js';


export const state = {
players: store.load('players', []),
team: store.load('team', []),
teamName: store.load('teamName', ''),
formation: store.load('formation', '4-3-3'),
user: store.load('user', null),
filters: { q:'', pos:'', minOvr:0, sortBy:'ovrDesc' }
};


export function initPlayersIfEmpty(seed){
if(!state.players?.length){ state.players = seed; store.save('players', state.players); }
}
export function activeRule(){ return FORMATIONS[state.formation] || FORMATIONS['4-3-3']; }
export function sync(){
store.save('players', state.players);
store.save('team', state.team);
store.save('teamName', state.teamName);
store.save('formation', state.formation);
store.save('user', state.user);
}
export function countsByPos(list){ return list.reduce((acc,p)=>{acc[p.pos]=(acc[p.pos]||0)+1; return acc;},{}); }
export function canAdd(player){
if(state.team.length>=11) return [false,'הקבוצה מלאה (11/11)'];
if(state.team.some(t=>t.id===player.id)) return [false,'השחקן כבר בקבוצה'];
const caps = activeRule();
const used = countsByPos(state.team)[player.pos]||0; const cap = caps[player.pos] ?? 0;
if(used>=cap) return [false,`הגעת למקסימום בעמדה ${player.pos} (${cap})`];
return [true,''];
}
export function addToTeam(player){ const [ok,msg] = canAdd(player); if(!ok) return [false,msg]; state.team.push(player); sync(); return [true,`נוסף: ${player.name}`]; }
export function removeFromTeam(id){ state.team = state.team.filter(p=>p.id!==id); sync(); }