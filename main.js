const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', language === 'en' ? 'Open menu' : 'Buka menu'); navigation.classList.remove('open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); menuButton.setAttribute('aria-label', language === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Tutup menu' : 'Buka menu')); });
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
 service: {label:'LEGAL ADMINISTRATION · 2026',title:'Mendengarkan dengan kepedulian.',description:'Sebagai bagian dari tim pelayanan beranggotakan dua orang, saya mendukung penerimaan pengaduan melalui layanan resmi Lapor Mas Wapres. Kegiatan meliputi pencatatan informasi awal, klarifikasi substansi pengaduan, pemeriksaan kelengkapan lampiran, dan penginputan data ke sistem resmi untuk mendukung penanganan lanjutan.',tags:['Complaint Administration','Document Verification','Administrative Support']},
 discussion: {label:'LAW & HUMAN RIGHTS · 2026',title:'Memperluas ruang perspektif.',description:'Dokumentasi kegiatan diskusi mengenai aspek ketenagakerjaan dalam industri nikel di Komnas HAM, sebagai bagian dari pengalaman belajar selama magang. Ruang diskusi seperti ini memperluas pemahaman saya tentang hubungan antara kebijakan, persoalan hukum, dan hak asasi manusia.',tags:['Learning Experience','Labour Issues','Human Rights']},
 team: {label:'COLLABORATION & GROWTH · 2026',title:'Bertumbuh bersama orang-orang baik.',description:'Pengalaman di Sekretariat Wakil Presiden RI mempertemukan saya dengan proses kerja pemerintahan dan kerja sama lintas peran. Saya belajar bahwa analisis yang baik perlu ditunjang dokumentasi yang tertata, komunikasi yang jelas, dan koordinasi administratif yang konsisten.',tags:['Teamwork','Administrative Coordination','Professional Growth']}
};
const dialog = document.querySelector('#work-dialog');
let lastCard;
document.querySelectorAll('[data-detail]').forEach(card => card.addEventListener('click', () => { const detail = language === 'en' ? englishDetails[card.dataset.detail] : details[card.dataset.detail]; const source = card.querySelector('img'); const picture = document.querySelector('#dialog-image'); picture.src = source.src; picture.alt = source.alt; document.querySelector('#dialog-label').textContent = detail.label; document.querySelector('#dialog-title').textContent = detail.title; dialog.setAttribute('aria-labelledby', 'dialog-title'); document.querySelector('#dialog-description').textContent = detail.description; document.querySelector('#dialog-tags').replaceChildren(...detail.tags.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; })); lastCard = card; dialog.showModal(); document.body.style.overflow = 'hidden'; }));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastCard?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();

const english = {
 'Langsung ke konten':'Skip to content','Beranda':'Home','Tentang':'About','Perjalanan':'Journey','Portofolio':'Portfolio','Pelatihan':'Training','Mari terhubung':'Get in touch',
 'Halo, saya':'Hello, I’m','Berorientasi pada detail, berpegang pada integritas,':'Driven by detail and grounded in integrity,','dan tangguh di lingkungan yang dinamis.':'resilient in dynamic environments.',
 'Unduh CV':'Download CV','Jelajahi perjalanan saya':'Explore my journey','Jakarta, Indonesia':'Jakarta, Indonesia',
 '01 / TENTANG SAYA':'01 / ABOUT ME','Berakar pada nilai.':'Rooted in values.','Bertumbuh dalam makna.':'Growing with purpose.',
 'Sebagai lulusan Sarjana Hukum UIN Sunan Kalijaga Yogyakarta, saya memiliki minat mendalam pada riset hukum, tata kelola korporat (corporate governance), kepatuhan regulasi (compliance), serta administrasi legal. Pengalaman di Sekretariat Wakil Presiden RI membentuk pola kerja saya yang adaptif, berorientasi pada detail, tinggi integritas, dan terbiasa bekerja dalam lingkungan dengan dinamika tinggi.':'As a Bachelor of Laws graduate from UIN Sunan Kalijaga Yogyakarta, I have a strong interest in legal research, corporate governance, regulatory compliance, and legal administration. My experience at the Secretariat of the Vice President of Indonesia shaped an adaptable, detail-oriented way of working, guided by integrity and suited to dynamic environments.',
 'IPK SARJANA HUKUM':'LAW DEGREE GPA','EVALUASI MAGANG':'INTERNSHIP EVALUATION',
 '02 / JEJAK PERJALANAN':'02 / MY JOURNEY','Setiap langkah,':'Every step,','sebuah pembelajaran.':'a chance to learn.',
 'Dari ruang akademik ke lingkungan profesional yang dinamis.':'From university to a dynamic professional environment.','Orientasi detail, integritas, dan ketahanan membentuk cara saya bekerja.':'Attention to detail, integrity, and resilience shape the way I work.',
 'JAN — JUN 2026':'JAN — JUN 2026','Sekretariat Wakil Presiden Republik Indonesia':'Secretariat of the Vice President of Indonesia',
 'Asisten Deputi Bidang Politik, Keamanan, Hukum, dan HAM. Mendukung penelitian peraturan, penyusunan memorandum hukum, dokumentasi kasus, serta administrasi pengaduan Lapor Mas Wapres.':'Assistant Deputy for Politics, Security, Law, and Human Rights. Supported regulatory research, legal memoranda, case documentation, and administration of Lapor Mas Wapres complaints.',
 'MAR — JUN 2025':'MAR — JUN 2025','Mendukung administrasi 10 program pengabdian masyarakat melalui surat-menyurat resmi, persiapan dokumen, dan koordinasi jadwal bersama tim serta masyarakat.':'Supported administration for 10 community programs through official correspondence, document preparation, and schedule coordination with the team and local community.',
 'OKT 2023 — FEB 2025':'OCT 2023 — FEB 2025','Relawan Administrasi':'Administrative Volunteer','Membantu pencatatan awal pengaduan, pengelolaan surat dan arsip, serta koordinasi administratif dengan ketelitian dan perhatian pada kerahasiaan informasi.':'Assisted with initial complaint records, correspondence and archives, and administrative coordination while handling sensitive information carefully.',
 'FEB — SEP 2024':'FEB — SEP 2024','Relawan & Sekretaris Tim 55':'Volunteer & Team 55 Secretary','Mendukung pencatatan inventaris buku donasi, dokumentasi distribusi materi kampanye, koordinasi tim, dan penyusunan laporan akhir kegiatan literasi.':'Tracked donated book inventories, documented campaign material distribution, coordinated the team, and helped prepare the final literacy program report.',
 '2022 — 2026 / PENDIDIKAN':'2022 — 2026 / EDUCATION','Sarjana Hukum (S.H.) —':'Bachelor of Laws (S.H.) —','Konsentrasi Hukum Tata Negara':'Concentration in Constitutional Law',
 'UIN Sunan Kalijaga Yogyakarta · Fokus studi pada regulasi, hukum administrasi, dan kepatuhan hukum (regulatory compliance).':'UIN Sunan Kalijaga Yogyakarta · Focused on regulation, administrative law, and regulatory compliance.',
 '✳ Lulusan terbaik & tercepat':'✳ Best and fastest graduate','Program Studi · Periode IV TA 2025/2026':'Degree program · Period IV, 2025/2026 academic year',
 '03 / DI BALIK KONTRIBUSI':'03 / SELECTED WORK','Potongan cerita,':'Moments from the work,','pengalaman yang nyata.':'lessons that last.',
 'Catatan visual tentang belajar, berkolaborasi,':'A visual record of learning, collaborating,','dan hadir untuk memberi kontribusi.':'and making a thoughtful contribution.',
 'Semua cerita':'All stories','Hukum & riset':'Law & research','Administrasi legal':'Legal administration','Kolaborasi':'Collaboration',
 'Dari penelaahan, menuju pemahaman.':'From review to understanding.','Riset peraturan & dukungan memorandum hukum':'Regulatory research & legal memorandum support',
 'Mendengarkan dengan kepedulian.':'Listening with care.','Dukungan administrasi layanan Lapor Mas Wapres':'Administrative support for Lapor Mas Wapres',
 'Memperluas ruang perspektif.':'Broadening perspectives.','Dokumentasi diskusi di Komnas HAM':'Documentation of a discussion at Komnas HAM',
 'Bertumbuh bersama orang-orang baik.':'Growing with a great team.','Belajar dan berkolaborasi di lingkungan pemerintahan':'Learning and collaborating in a government setting',
 '04 / YANG SAYA BAWA':'04 / WHAT I BRING','Ketelitian dalam pikiran.':'Careful thinking.','Kepedulian dalam tindakan.':'Purposeful action.',
 'Riset & Kepatuhan Hukum':'Legal Research & Compliance','Menelusuri peraturan, mengidentifikasi risiko hukum, menyusun memorandum, dan memastikan kesesuaian regulasi (regulatory compliance).':'Researching regulations, identifying legal risks, preparing memoranda, and supporting regulatory compliance.',
 'Tata Kelola & Administrasi Terpadu':'Administrative Governance','Memeriksa kelengkapan berkas, mengelola arsip dengan standar keamanan dan kerahasiaan data yang ketat, serta memastikan dokumentasi akurat.':'Checking document completeness, managing archives with strict data security and confidentiality standards, and maintaining accurate records.',
 'Koordinasi & Komunikasi Profesional':'Professional Coordination','Menghubungkan berbagai pihak secara efektif, menyampaikan informasi dengan jelas, dan mendukung kelancaran operasional kerja bersama.':'Connecting stakeholders effectively, communicating clearly, and supporting smooth day-to-day operations.',
 '05 / PELATIHAN & KURSUS':'05 / TRAINING & COURSES','Terus belajar,':'Always learning,','terus bertumbuh.':'always growing.',
 'Ruang belajar yang memperkuat kepatuhan, integritas,':'Learning that strengthens compliance, integrity,','dan pengelolaan informasi.':'and information management.',
 'Memahami standar internasional untuk manajemen keamanan informasi, perlindungan data, dan mitigasi risiko kebocoran dokumen perusahaan.':'Studied international information security management standards, data protection, and ways to reduce the risk of corporate document leaks.',
 'Pelatihan Anti-Korupsi':'Anti-Corruption Training','Kementerian Sekretariat Negara (Kemensetneg)':'Ministry of State Secretariat (Kemensetneg)',
 'Memperkuat pemahaman mengenai integritas birokrasi, transparansi, dan pencegahan praktik korupsi di lingkungan kerja publik maupun korporat.':'Strengthened understanding of institutional integrity, transparency, and corruption prevention in public and corporate workplaces.',
 'Pelatihan Knowledge Management':'Knowledge Management Training','Mempelajari tata kelola penyimpanan informasi, pengelolaan arsip digital, dan optimalisasi sistem pengetahuan instansi.':'Studied information storage governance, digital records management, and ways to improve organizational knowledge systems.',
 '“Seperti sakura, setiap proses':'“Like cherry blossoms, every journey','punya waktunya untuk':'has its own time to','mekar.':'bloom.',
 '06 / MARI TERHUBUNG':'06 / GET IN TOUCH','Sebuah percakapan,':'One conversation,','awal kemungkinan baru.':'a new possibility.',
 'Saya terbuka untuk peluang di bidang Corporate Legal, Legal Administration,':'I’m open to opportunities in Corporate Legal, Legal Administration,','Company Secretary Support, dan Regulatory Compliance.':'Company Secretary Support, and Regulatory Compliance.',
 '◎ Berbasis di Jakarta, Indonesia':'◎ Based in Jakarta, Indonesia','Hubungi melalui telepon ↗':'Call me ↗'
};
const originalText = new Map();
const imageAlternates = new Map([
 ['Afrah Rifka Afifah mengenakan kebaya dan selempang kelulusan UIN Sunan Kalijaga','Afrah Rifka Afifah wearing graduation attire at UIN Sunan Kalijaga'],
 ['Afrah di koridor kampus dengan cahaya alami','Afrah in a sunlit university corridor'],
 ['Kegiatan analisis peraturan dan penyusunan memorandum','Reviewing regulations and preparing a legal memorandum'],
 ['Meja pelayanan pengaduan Lapor Mas Wapres','Lapor Mas Wapres complaint intake desk'],
 ['Diskusi aspek ketenagakerjaan industri nikel di Komnas HAM','Discussion of labor issues in the nickel industry at Komnas HAM'],
 ['Foto bersama tim di ruang rapat Sekretariat Wakil Presiden','Team photo in a meeting room at the Secretariat of the Vice President']
]);
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
 const node = textWalker.currentNode;
 if (node.parentElement?.closest('script,style')) continue;
 const original = node.textContent;
 if (english[original.trim()]) originalText.set(node, original);
}
let language = 'id';
const englishDetails = {
 research:{label:'LEGAL RESEARCH & DOCUMENTATION · 2026',title:'From review to understanding.',description:'During my internship at the Secretariat of the Vice President of Indonesia, I supported complaint document review, case timelines, legal issue identification, and research into relevant regulations. I also helped prepare memorandum materials for internal review by the responsible unit.',tags:['Regulatory Research','Case Chronology','Legal Memorandum']},
 service:{label:'LEGAL ADMINISTRATION · 2026',title:'Listening with care.',description:'As part of a two-person service team, I supported complaint intake through the official Lapor Mas Wapres service. This included recording initial information, clarifying complaints, checking attachments, and entering data into the official system for further handling.',tags:['Complaint Administration','Document Verification','Administrative Support']},
 discussion:{label:'LAW & HUMAN RIGHTS · 2026',title:'Broadening perspectives.',description:'A discussion on labor issues in the nickel industry at Komnas HAM broadened my perspective on the connections between policy, law, and human rights.',tags:['Learning Experience','Labour Issues','Human Rights']},
 team:{label:'COLLABORATION & GROWTH · 2026',title:'Growing with a great team.',description:'My experience at the Secretariat of the Vice President introduced me to government processes and cross-functional collaboration. I learned how sound analysis depends on organized documentation, clear communication, and consistent administrative coordination.',tags:['Teamwork','Administrative Coordination','Professional Growth']}
};
function setLanguage(next) {
 language = next;
 document.documentElement.lang = next;
 originalText.forEach((original,node) => { const translated = english[original.trim()]; node.textContent = next === 'en' ? original.replace(original.trim(), translated) : original; });
 document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === next)));
 document.querySelectorAll('img[alt]').forEach(img => { if (!img.dataset.originalAlt) img.dataset.originalAlt = img.alt; img.alt = next === 'en' ? imageAlternates.get(img.dataset.originalAlt) || img.dataset.originalAlt : img.dataset.originalAlt; });
 document.querySelector('.menu-toggle').setAttribute('aria-label', next === 'en' ? (menuButton.getAttribute('aria-expanded') === 'true' ? 'Close menu' : 'Open menu') : (menuButton.getAttribute('aria-expanded') === 'true' ? 'Tutup menu' : 'Buka menu'));
 document.querySelector('#navigation').setAttribute('aria-label', next === 'en' ? 'Main navigation' : 'Navigasi utama');
 document.querySelector('.language-switch').setAttribute('aria-label', next === 'en' ? 'Choose language' : 'Pilih bahasa');
 document.querySelector('.dialog-close').setAttribute('aria-label', next === 'en' ? 'Close details' : 'Tutup detail');
 document.querySelector('.work-filters').setAttribute('aria-label', next === 'en' ? 'Portfolio filters' : 'Filter portofolio');
 document.querySelector('.keyword-list').setAttribute('aria-label', next === 'en' ? 'Areas of interest' : 'Bidang minat');
 document.querySelector('.skip-link').setAttribute('aria-label', next === 'en' ? 'Skip to content' : 'Langsung ke konten');
 document.querySelector('meta[name="description"]').content = next === 'en' ? 'Portfolio of Afrah Rifka Afifah, a law graduate interested in legal research, corporate governance, regulatory compliance, and legal administration.' : 'Portofolio Afrah Rifka Afifah, Sarjana Hukum dengan minat pada legal research, corporate governance, regulatory compliance, dan legal administration.';
 if (dialog.open && lastCard) {
  const detail = next === 'en' ? englishDetails[lastCard.dataset.detail] : details[lastCard.dataset.detail];
  document.querySelector('#dialog-label').textContent = detail.label;
  document.querySelector('#dialog-title').textContent = detail.title;
  document.querySelector('#dialog-description').textContent = detail.description;
  document.querySelector('#dialog-tags').replaceChildren(...detail.tags.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; }));
 }
 try { localStorage.setItem('portfolio-language', next); } catch {}
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
try { if (localStorage.getItem('portfolio-language') === 'en') setLanguage('en'); } catch {}
