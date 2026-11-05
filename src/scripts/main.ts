// Small, dependency-free interactions. Everything works without JS; this only adds motion and convenience.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------- theme switch (light default, remembered per visitor) ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
  const sync = () => btn.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  sync();
  btn.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    if (dark) document.documentElement.dataset.theme = 'dark';
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) { /* storage blocked */ }
    sync();
  });
});

/* ---------- mobile menu ---------- */
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu]');
const menu = document.getElementById('mobile-menu');
menuBtn?.addEventListener('click', () => {
  const open = menu?.dataset.open !== 'true';
  if (menu) menu.dataset.open = String(open);
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  menu.dataset.open = 'false';
  menuBtn?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

/* ---------- scroll reveals + section dividers ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
document.querySelectorAll('.rv, .rv-clip, .divider').forEach((el) => io.observe(el));

/* ---------- exclusive accordions (fallback for browsers without <details name>) ---------- */
document.querySelectorAll<HTMLDetailsElement>('details[data-group]').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (!d.open) return;
    document.querySelectorAll<HTMLDetailsElement>(`details[data-group="${d.dataset.group}"]`).forEach((o) => { if (o !== d) o.open = false; });
  });
});

/* ---------- hero: full-stack system visual ---------- */
document.querySelectorAll<HTMLElement>('[data-ss]').forEach((ss) => {
  const tilt = ss.querySelector<HTMLElement>('.ss-tilt');
  const layers = Array.from(ss.querySelectorAll<HTMLElement>('.ss-layer'));
  const labels = Array.from(ss.querySelectorAll<HTMLElement>('.ss-label'));
  ss.querySelectorAll<HTMLButtonElement>('[data-sys]').forEach((b) => {
    b.addEventListener('click', () => {
      ss.dataset.sys = b.dataset.sys!;
      ss.querySelectorAll('[data-sys]').forEach((o) => o !== ss && o.setAttribute('aria-pressed', String(o === b)));
    });
  });
  const setActive = (i: number) => {
    layers.forEach((l, j) => l.classList.toggle('on', i === j));
    labels.forEach((l, j) => l.classList.toggle('on', i === j));
  };
  labels.forEach((l, i) => {
    l.addEventListener('mouseenter', () => setActive(i));
    l.addEventListener('mouseleave', () => setActive(-1));
  });
  if (!reduce && finePointer && tilt) {
    ss.addEventListener('mousemove', (e) => {
      const r = ss.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
      tilt.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    });
    ss.addEventListener('mouseleave', () => { tilt.style.setProperty('--ry', '0deg'); tilt.style.setProperty('--rx', '0deg'); setActive(-1); });
  }
});

/* ---------- brief builder → pre-filled email ---------- */
document.querySelectorAll<HTMLFormElement>('[data-brief]').forEach((form) => {
  const email = form.dataset.email!;
  const picks: Record<string, string> = {};
  form.querySelectorAll<HTMLElement>('[data-group-name]').forEach((g) => {
    const name = g.dataset.groupName!;
    const btns = Array.from(g.querySelectorAll<HTMLButtonElement>('button'));
    const pressed = btns.find((b) => b.getAttribute('aria-pressed') === 'true');
    if (pressed) picks[name] = pressed.textContent!.trim();
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
      picks[name] = b.textContent!.trim();
    }));
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = (form.querySelector<HTMLInputElement>('[name="msg"]')?.value || '').trim();
    const source = (form.querySelector<HTMLSelectElement>('[name="source"]')?.value || '').trim();
    const body = `Project type: ${picks['Project type'] || '-'}\nStage: ${picks['Stage'] || '-'}\nTimeline: ${picks['Timeline'] || '-'}\nHow I found you: ${source || '-'}\n\nWhat we are building: ${msg}\n`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('Project brief — ' + (picks['Project type'] || 'AI project'))}&body=${encodeURIComponent(body)}`;
  });
});

/* ---------- custom cursor + magnetic buttons (mouse only) ---------- */
if (finePointer && !reduce) {
  const glow = document.createElement('div');
  glow.className = 'cc-glow';
  glow.setAttribute('aria-hidden', 'true');
  const cc = document.createElement('div');
  cc.className = 'cc';
  cc.setAttribute('aria-hidden', 'true');
  cc.innerHTML = '<div class="cc-ring"><span></span></div><div class="cc-cross"></div><div class="cc-dot"></div><div class="cc-xy"></div>';
  document.body.append(glow, cc);
  document.documentElement.classList.add('cc-on');
  const ring = cc.querySelector<HTMLElement>('.cc-ring')!;
  const label = ring.querySelector('span')!;
  const xy = cc.querySelector<HTMLElement>('.cc-xy')!;
  let mag: HTMLElement | null = null;
  let mx = -200, my = -200, rx = -200, ry = -200;

  const clearMag = () => { if (mag) { mag.style.transform = ''; mag = null; } };
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    const t = e.target as HTMLElement;
    let mode = '';
    const lab = t.closest<HTMLElement>('[data-cursor]');
    const cross = t.closest<HTMLElement>('[data-cursor-mode="cross"]');
    if (lab) { mode = 'label'; label.textContent = lab.dataset.cursor!; }
    else if (t.closest('a, button, summary')) mode = 'link';
    else if (t.closest('input, textarea, select')) mode = 'text';
    else if (cross) mode = 'cross';
    if (cross && mode === 'cross') {
      const r = cross.getBoundingClientRect();
      xy.textContent = `x ${Math.round(mx - r.left)} · y ${Math.round(my - r.top)}`;
    }
    cc.className = 'cc' + (mode ? ' ' + mode : '') + (cc.classList.contains('down') ? ' down' : '');
    const m = t.closest<HTMLElement>('.btn, .mag');
    if (mag && mag !== m) clearMag();
    if (m) {
      const r = m.getBoundingClientRect();
      m.style.transform = `translate(${((mx - (r.left + r.width / 2)) * 0.25).toFixed(1)}px, ${((my - (r.top + r.height / 2)) * 0.35).toFixed(1)}px)`;
      mag = m;
    }
    glow.style.transform = `translate(${mx}px, ${my}px)`;
  }, { passive: true });
  document.addEventListener('mousedown', () => cc.classList.add('down'));
  document.addEventListener('mouseup', () => cc.classList.remove('down'));
  document.addEventListener('mouseleave', () => { cc.style.opacity = '0'; glow.style.opacity = '0'; clearMag(); });
  document.addEventListener('mouseenter', () => { cc.style.opacity = '1'; glow.style.opacity = '1'; });

  const loop = () => {
    rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
    cc.style.transform = `translate(${mx}px, ${my}px)`;
    ring.style.translate = `${(rx - mx).toFixed(1)}px ${(ry - my).toFixed(1)}px`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
