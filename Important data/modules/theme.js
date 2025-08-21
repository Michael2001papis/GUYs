// Important data/modules/theme.js
import { store } from "../utils/store.js";

const THEME_KEY = "theme"; // 'light' | 'dark' | 'auto'

export function applyTheme(theme) {
  const root = document.documentElement;
  const auto = theme === "auto" || !theme;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const effective = auto ? (prefersDark ? "dark" : "light") : theme;
  root.dataset.theme = effective; // [data-theme="dark"|"light"]
  document
    .getElementById("themeToggle")
    ?.setAttribute("aria-pressed", String(effective === "dark"));
}

export function applySavedTheme() {
  const saved = store.load(THEME_KEY, "auto");
  applyTheme(saved);
}

export function setupThemeToggle(selector) {
  const btn = document.querySelector(selector);
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = store.load(THEME_KEY, "auto");
    const next =
      current === "dark" ? "light" : current === "light" ? "auto" : "dark";
    store.save(THEME_KEY, next);
    applyTheme(next);
    btn.title =
      next === "auto"
        ? "מצב: אוטומטי"
        : `מצב: ${next === "dark" ? "כהה" : "בהיר"}`;
  });
  // אם מערכת ההפעלה משתנה תוך כדי – נעדכן כשבאוטומטי
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (store.load(THEME_KEY, "auto") === "auto") applyTheme("auto");
    });
}
