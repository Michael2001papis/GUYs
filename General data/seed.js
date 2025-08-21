// ======================= General data/seed.js =======================
import { uid } from "../Important%20data/utils/store.js";
export function placeholder(text) {
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>\n<defs>\n<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>\n<stop offset='0%' stop-color='#1d234f'/>\n<stop offset='100%' stop-color='#0f1333'/>\n</linearGradient>\n</defs>\n<rect width='100%' height='100%' fill='url(#g)'/>\n<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='64' fill='#7aa7ff' opacity='0.9'>${text}</text>\n</svg>`
  );
  return `data:image/svg+xml;charset=utf-8,${svg}`;
}
export const initialPlayers = [
  {
    id: uid(),
    name: "כריסטיאנו רונאלדו",
    pos: "חלוץ",
    club: "אל נאצר",
    ovr: 90,
    img: placeholder("CR7"),
  },
  {
    id: uid(),
    name: "ליאו מסי",
    pos: "חלוץ",
    club: "אינטר מיאמי",
    ovr: 91,
    img: placeholder("LM10"),
  },
  {
    id: uid(),
    name: "קיליאן אמבפה",
    pos: "חלוץ",
    club: "ריאל מדריד",
    ovr: 92,
    img: placeholder("KM7"),
  },
  {
    id: uid(),
    name: "ארלינג הולאנד",
    pos: "חלוץ",
    club: "מנצ'סטר סיטי",
    ovr: 92,
    img: placeholder("EH9"),
  },
  {
    id: uid(),
    name: "קווין דה בריינה",
    pos: "קשר",
    club: "מנצ'סטר סיטי",
    ovr: 91,
    img: placeholder("KDB"),
  },
  {
    id: uid(),
    name: "ווירג'יל ואן דייק",
    pos: "בלם",
    club: "ליברפול",
    ovr: 89,
    img: placeholder("VVD"),
  },
];