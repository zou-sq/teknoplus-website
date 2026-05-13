// Language Switch
let currentLang = localStorage.getItem('tp-lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('tp-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`);
  if (btn) btn.classList.add('active');
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
});
