// ======================= Important data/utils/store.js =======================
export const store = {
  save(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  },
  load(k, d) {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  remove(k) {
    localStorage.removeItem(k);
  },
};
export const uid = () =>
  crypto?.randomUUID
    ? crypto.randomUUID()
    : Date.now() + "-" + Math.random().toString(36).slice(2);