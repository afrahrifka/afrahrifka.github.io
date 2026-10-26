const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
if ('IntersectionObserver' in window) {
 document.body.classList.add('js-ready');
 const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: 0.08 });
 document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
 const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { navigation.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`)); } }), { rootMargin: '-15% 0px -60% 0px' });
 document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
}
const petalContainer = document.querySelector('.petals');
for (let i = 0; i < 12; i++) { const petal = document.createElement('span'); petal.className = 'petal'; petal.style.left = `${9 + (i * 17) % 92}%`; petal.style.animationDuration = `${12 + i % 7}s`; petal.style.animationDelay = `${-i * 2.3}s`; petal.style.width = `${6 + i % 5}px`; petalContainer.append(petal); }
const parallaxElements = [...document.querySelectorAll('[data-parallax]')];
let scheduled = false;
function updateScroll() {
 const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
 document.querySelector('.scroll-progress').style.width = `${scrollRange > 0 ? window.scrollY / scrollRange * 100 : 0}%`;
 if (!reducedMotion.matches) parallaxElements.forEach(element => { const section = element.closest('section'); const bounds = section.getBoundingClientRect(); if (bounds.bottom >= -200 && bounds.top <= window.innerHeight + 200) element.style.transform = `translate3d(0,${-bounds.top * Number(element.dataset.parallax)}px,0)`; });
 scheduled = false;
}
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
window.addEventListener('resize', updateScroll);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) parallaxElements.forEach(element => element.style.removeProperty('transform')); updateScroll(); });
updateScroll();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(filter => { const selected = filter === button; filter.classList.toggle('selected', selected); filter.setAttribute('aria-pressed', String(selected)); });
 document.querySelectorAll('.work-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) card.classList.add('visible'); });
}));
const details = {
 research: {label:'LEGAL RESEARCH & DOCUMENTATION · 2026', title:'Dari penelaahan, menuju pemahaman.', description:'Dalam kegiatan magang di Sekretariat Wakil Presiden RI, saya mendukung penelaahan dokumen pengaduan, penyusunan kronologi, identifikasi isu hukum, serta penelusuran peraturan yang relevan. Saya juga membantu menyiapkan bahan memorandum untuk peninjauan internal oleh unit yang berwenang. Peran ini merupakan dukungan riset dan dokumentasi, dengan keputusan akhir tetap pada pihak yang berwenang.', tags:['Regulatory Research','Case Chronology','Legal Memorandum']},
 service: {label:'PUBLIC SERVICE ADMINISTRATION · 2026',title:'Mendengarkan dengan kepedulian.',description:'Sebagai bagian dari tim pelayanan beranggotakan dua orang, saya mendukung penerimaan pengaduan melalui layanan resmi Lapor Mas Wapres. Kegiatan meliputi pencatatan informasi awal, klarifikasi substansi pengaduan, pemeriksaan kelengkapan lampiran, dan penginputan data ke sistem resmi untuk mendukung penanganan lanjutan.',tags:['Complaint Administration','Document Verification','Public Service']},
 discussion: {label:'LAW & HUMAN RIGHTS · 2026',title:'Memperluas ruang perspektif.',description:'Dokumentasi kegiatan diskusi mengenai aspek ketenagakerjaan dalam industri nikel di Komnas HAM, sebagai bagian dari pengalaman belajar selama magang. Ruang diskusi seperti ini memperluas pemahaman saya tentang hubungan antara kebijakan, persoalan hukum, dan hak asasi manusia.',tags:['Learning Experience','Labour Issues','Human Rights']},
 team: {label:'COLLABORATION & GROWTH · 2026',title:'Bertumbuh bersama orang-orang baik.',description:'Pengalaman di Sekretariat Wakil Presiden RI mempertemukan saya dengan proses kerja pemerintahan dan kerja sama lintas peran. Saya belajar bahwa analisis yang baik perlu ditunjang dokumentasi yang tertata, komunikasi yang jelas, dan koordinasi administratif yang konsisten.',tags:['Teamwork','Administrative Coordination','Professional Growth']}
};
const dialog = document.querySelector('#work-dialog');
let lastCard;
document.querySelectorAll('[data-detail]').forEach(card => card.addEventListener('click', () => { const detail = details[card.dataset.detail]; const source = card.querySelector('img'); const picture = document.querySelector('#dialog-image'); picture.src = source.src; picture.alt = source.alt; document.querySelector('#dialog-label').textContent = detail.label; document.querySelector('#dialog-title').textContent = detail.title; dialog.setAttribute('aria-labelledby', 'dialog-title'); document.querySelector('#dialog-description').textContent = detail.description; document.querySelector('#dialog-tags').replaceChildren(...detail.tags.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; })); lastCard = card; dialog.showModal(); document.body.style.overflow = 'hidden'; }));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastCard?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
