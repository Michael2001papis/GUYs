// // // Important data/modules/motion.js
// // export function setupReveal() {
// //   const observer = new IntersectionObserver(
// //     (entries) => {
// //       entries.forEach((e) => {
// //         if (e.isIntersecting) {
// //           e.target.classList.add("show");
// //           observer.unobserve(e.target); // פעם אחת
// //         }
// //       });
// //     },
// //     { threshold: 0.2 }
// //   );
// //   document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
// // }

// // export function attachRipple() {
// //   document.addEventListener("click", (e) => {
// //     const btn = e.target.closest("button, .btn, .link");
// //     if (!btn) return;
// //     const ripple = document.createElement("span");
// //     ripple.className = "ripple";
// //     const rect = btn.getBoundingClientRect();
// //     ripple.style.left = e.clientX - rect.left + "px";
// //     ripple.style.top = e.clientY - rect.top + "px";
// //     btn.appendChild(ripple);
// //     setTimeout(() => ripple.remove(), 600);
// //   });
// // }

// Important data/modules/motion.js
export function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal--in'); // תואם ל-CSS
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

export function attachRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .btn, .link');
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top  = (e.clientY - rect.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}
