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
 research: {label:'LEGAL RESEARCH & DOCUMENTATION · 2026', title:'Dari penelaahan, menuju pemahaman.', description:'Di Sekretariat Wakil Presiden RI, saya menyusun kronologi fakta, mengidentifikasi isu hukum, dan menelaah regulasi terkait perkara. Saya menyiapkan 3–4 memorandum hukum komprehensif per bulan untuk menghubungkan fakta dengan pertimbangan hukum dan opsi tindak lanjut sebagai bahan peninjauan internal.', tags:['Legal Analysis','Regulatory Research','Legal Memorandum']},
 service: {label:'LEGAL ADMINISTRATION · 2026',title:'Mendengarkan dengan kepedulian.',description:'Dalam tim layanan garis depan beranggotakan dua orang, saya membantu menangani 2–4 pengadu setiap minggu pada jadwal piket bergilir di layanan Lapor Mas Wapres. Tugasnya mencakup klarifikasi isu, pemeriksaan lampiran, pencatatan informasi pengadu, dan input laporan ke sistem resmi.',tags:['Complaint Intake','Document Verification','Administrative Support']},
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
 'Langsung ke konten':'Skip to content','Beranda':'Home','Tentang':'About','Perjalanan':'Journey','Portofolio':'Portfolio','Pelatihan':'Training','Dokumen':'Documents','Mari terhubung':'Get in touch',
 '05 / PELATIHAN, KURSUS & BUKTI DOKUMEN':'05 / TRAINING, COURSES & DOCUMENTS','Pengalaman belajar dan seluruh bukti sertifikat, materi, serta webinar dalam satu tempat.':'Learning experiences and certificates, materials, and webinar records in one place.','Pelatihan &':'Training &','Pengembangan':'Development','Seminar &':'Seminars &','Kursus &':'Courses &','Praktikum':'Practicum','Lihat sertifikat ↗':'View certificate ↗','Lihat dokumen ↗':'View document ↗','Unduh ↓':'Download ↓','Lihat materi ↗':'View materials ↗','Unduh materi ↓':'Download materials ↓','Kementerian Sekretariat Negara · Mei 2026':'Ministry of State Secretariat · May 2026','Kementerian Sekretariat Negara · Apr 2026':'Ministry of State Secretariat · Apr 2026','Kementerian Sekretariat Negara · Feb 2026':'Ministry of State Secretariat · Feb 2026','Fakultas Syariah dan Hukum, UIN Sunan Kalijaga · 2025':'Faculty of Sharia and Law, UIN Sunan Kalijaga · 2025','Novo Club by ParagonCorp x Pemimpin.id · Mar–Apr 2024':'Novo Club by ParagonCorp x Pemimpin.id · Mar–Apr 2024','PLT UIN Sunan Kalijaga dan Kementerian Agama · Des 2024':'PLT UIN Sunan Kalijaga and Ministry of Religious Affairs · Dec 2024','Sertifikat Praktikum Pengadilan':'Religious Court Practicum Certificate','Sertifikat Praktikum Legal Drafting':'Legal Drafting Practicum Certificate','Sertifikat Novo Club Leadership Bootcamp':'Novo Club Leadership Bootcamp Certificate',
 '06 / DOKUMEN & SERTIFIKAT':'06 / CERTIFICATES & DOCUMENTS','Jejak belajar,':'A record of learning,','tersimpan dalam karya.':'kept in every milestone.','Kumpulan sertifikat, materi bootcamp, dan webinar.':'A collection of certificates, bootcamp materials, and webinars.','Pilih gambar untuk melihat dokumen ukuran penuh.':'Select an image to view the full-size document.','Sertifikat':'Certificate','Seminar':'Seminar','Webinar':'Webinar','Materi':'Material','07 / MARI TERHUBUNG':'07 / GET IN TOUCH',
 'Halo, saya':'Hello, I’m','LEGAL ANALYST':'LEGAL ANALYST','LEGAL ADMINISTRATION':'LEGAL ADMINISTRATION','COMPLIANCE & LEGAL SUPPORT':'COMPLIANCE & LEGAL SUPPORT','Berorientasi pada detail, berpegang pada integritas,':'Driven by detail and grounded in integrity,','dan tangguh di lingkungan yang dinamis.':'resilient in dynamic environments.',
 'Unduh CV':'Download CV','Jelajahi perjalanan saya':'Explore my journey','Jakarta, Indonesia':'Jakarta, Indonesia',
 '01 / TENTANG SAYA':'01 / ABOUT ME','Berakar pada nilai.':'Rooted in values.','Bertumbuh dalam makna.':'Growing with purpose.',
 'Sebagai lulusan Sarjana Hukum UIN Sunan Kalijaga Yogyakarta dengan pengalaman lebih dari 1 tahun di bidang hukum dan administrasi, saya memiliki minat mendalam pada tata kelola korporat (corporate governance), kepatuhan regulasi (compliance), riset hukum, dan administrasi legal. Pengalaman saya sebagai Legal Analyst intern di Sekretariat Wakil Presiden RI serta Administrative Intern di PLT UIN Sunan Kalijaga telah membentuk pola kerja yang adaptif, berorientasi pada detail, berintegritas tinggi, dan terbiasa di lingkungan kerja yang dinamis.':'As a Bachelor of Laws graduate from UIN Sunan Kalijaga Yogyakarta with over one year of experience in law and administration, I have a deep interest in corporate governance, regulatory compliance, legal research, and legal administration. My experience as a Legal Analyst intern at the Secretariat of the Vice President of Indonesia and an Administrative Intern at PLT UIN Sunan Kalijaga has shaped an adaptable, detail-oriented, and highly principled approach to work in dynamic environments.',
 'IPK SARJANA HUKUM':'LAW DEGREE GPA','EVALUASI MAGANG':'INTERNSHIP EVALUATION',
 '02 / JEJAK PERJALANAN':'02 / MY JOURNEY','Setiap langkah,':'Every step,','sebuah pembelajaran.':'a chance to learn.',
 'Dari ruang akademik ke lingkungan profesional yang dinamis.':'From university to a dynamic professional environment.','Orientasi detail, integritas, dan ketahanan membentuk cara saya bekerja.':'Attention to detail, integrity, and resilience shape the way I work.',
 'JAN — JUN 2026':'JAN — JUN 2026','Legal Analyst':'Legal Analyst','Sekretariat Wakil Presiden Republik Indonesia · Asisten Deputi Bidang Politik, Keamanan, Hukum, dan HAM':'Secretariat of the Vice President of Indonesia · Assistant Deputy for Politics, Security, Law, and Human Rights','Menyusun kronologi fakta, mengidentifikasi isu hukum, menelaah regulasi, serta menyiapkan 3–4 memorandum hukum komprehensif per bulan untuk peninjauan internal. Mengelola bukti dan arsip perkara yang dapat ditelusuri, serta membantu layanan Lapor Mas Wapres menangani 2–4 pengadu setiap minggu secara bergiliran.':'Built fact chronologies, identified legal issues, reviewed regulations, and prepared 3–4 comprehensive legal memoranda per month for internal review. Organized traceable evidence and case files, and supported Lapor Mas Wapres in handling 2–4 complainants weekly during rotating assignments.','Legal Analysis':'Legal Analysis','Regulatory Research':'Regulatory Research','Case Documentation':'Case Documentation',
 'OKT 2023 — FEB 2025':'OCT 2023 — FEB 2025','ADMINISTRATIVE EXPERIENCE':'ADMINISTRATIVE EXPERIENCE','Administrative Intern':'Administrative Intern','Integrated Service Center (PLT) · UIN Sunan Kalijaga':'Integrated Service Center (PLT) · UIN Sunan Kalijaga','Mengelola pengarsipan fisik dan digital surat masuk/keluar, membantu penerimaan awal pengaduan dan tindak lanjut terkoordinasi, menyiapkan kebutuhan tamu dan acara, serta memantau persediaan kantor dan inventaris kegiatan.':'Managed physical and digital archives for incoming and outgoing correspondence, supported initial complaint intake and coordinated follow-up, prepared guest and event arrangements, and monitored office supplies and event inventory.','Records Management':'Records Management','Complaint Intake':'Complaint Intake','Administrative Coordination':'Administrative Coordination',
 'MAR — JUN 2025':'MAR — JUN 2025','Sekretaris 1':'Secretary 1','KKN Konversi 117 · Karanganom, Wonokromo':'KKN Conversion 117 · Karanganom, Wonokromo','Mengoordinasikan administrasi 10 program kerja dan menyelaraskan jadwal serta kebutuhan operasional dengan pemangku kepentingan desa. Memimpin program edukasi tubuh dan keselamatan “Aku Generasi CAKAP” untuk sekitar 200 siswa TK melalui presentasi interaktif dan lagu.':'Coordinated administration for 10 community programs and aligned schedules and operational needs with village stakeholders. Led the “Aku Generasi CAKAP” body awareness and safety program for about 200 kindergarten students through interactive presentations and songs.','Official Correspondence':'Official Correspondence','Stakeholder Coordination':'Stakeholder Coordination','Community Education':'Community Education',
 'FEB — SEP 2024':'FEB — SEP 2024','Relawan & Sekretaris Tim 55':'Volunteer & Team 55 Secretary','Mendukung koordinasi program literasi, komunikasi eksternal, administrasi tim, dan pencatatan inventaris sekitar 96 buku donasi hingga penyusunan laporan akhir.':'Supported literacy program coordination, external communication, team administration, and inventory records for about 96 donated books through preparation of the final report.','Inventory Management':'Inventory Management','Team Coordination':'Team Coordination','Report Preparation':'Report Preparation',
 'SEP 2022 — APR 2026 / PENDIDIKAN':'SEP 2022 — APR 2026 / EDUCATION','Sarjana Hukum (S.H.) —':'Bachelor of Laws (S.H.) —','Konsentrasi Hukum Tata Negara (Siyasah)':'Concentration in Constitutional Law (Siyasah)','UIN Sunan Kalijaga Yogyakarta · IPK 3,92/4,00 · Cum Laude. Skripsi: Efektivitas penerapan Permendagri Nomor 20 Tahun 2018 dalam mewujudkan akuntabilitas dana desa (studi kasus Desa Krandegan, Bayan, Purworejo).':'UIN Sunan Kalijaga Yogyakarta · GPA 3.92/4.00 · Cum Laude. Thesis: The effectiveness of Minister of Home Affairs Regulation No. 20 of 2018 in realizing village fund accountability (case study of Krandegan Village, Bayan, Purworejo).',
 '✳ Lulusan terbaik & tercepat':'✳ Best and fastest graduate','Program Studi · Periode IV TA 2025/2026':'Degree program · Period IV, 2025/2026 academic year',
 '03 / DI BALIK KONTRIBUSI':'03 / SELECTED WORK','Potongan cerita,':'Moments from the work,','pengalaman yang nyata.':'lessons that last.',
 'Catatan visual tentang belajar, berkolaborasi,':'A visual record of learning, collaborating,','dan hadir untuk memberi kontribusi.':'and making a thoughtful contribution.',
 'Semua cerita':'All stories','Hukum & riset':'Law & research','Administrasi legal':'Legal administration','Kolaborasi':'Collaboration',
 'Dari penelaahan, menuju pemahaman.':'From review to understanding.','Riset peraturan & dukungan memorandum hukum':'Regulatory research & legal memorandum support',
 'Mendengarkan dengan kepedulian.':'Listening with care.','Dukungan administrasi layanan Lapor Mas Wapres':'Administrative support for Lapor Mas Wapres',
 'Memperluas ruang perspektif.':'Broadening perspectives.','Dokumentasi diskusi di Komnas HAM':'Documentation of a discussion at Komnas HAM',
 'Bertumbuh bersama orang-orang baik.':'Growing with a great team.','Belajar dan berkolaborasi di lingkungan pemerintahan':'Learning and collaborating in a government setting',
 '04 / YANG SAYA BAWA':'04 / WHAT I BRING','Ketelitian dalam pikiran.':'Careful thinking.','Kepedulian dalam tindakan.':'Purposeful action.',
 'Analisis & Riset Hukum':'Legal Research & Analysis','Menyusun kronologi perkara, mengidentifikasi isu hukum, menelaah regulasi, meninjau dokumen, dan merangkai pertimbangan hukum dalam memorandum.':'Building case chronologies, identifying legal issues, reviewing regulations and documents, and organizing legal considerations in memoranda.','Regulatory Review':'Regulatory Review','Case Chronology':'Case Chronology','Legal Memorandum':'Legal Memorandum',
 'Administrasi Perkara & Dokumen':'Case & Document Administration','Menangani penerimaan pengaduan, memeriksa kelengkapan bukti pendukung, dan mengelola arsip fisik maupun digital agar rekam dokumen tertata dan mudah ditelusuri.':'Handling complaint intake, checking supporting evidence, and managing physical and digital archives so records remain organized and traceable.','Evidence Verification':'Evidence Verification','Records Management':'Records Management',
 'Administrasi & Koordinasi':'Administration & Coordination','Mengelola surat-menyurat resmi, inventaris, persiapan kegiatan, dan laporan; berkoordinasi dengan tim serta pemangku kepentingan untuk mendukung operasional.':'Managing official correspondence, inventory, event preparation, and reports; coordinating with teams and stakeholders to support operations.','Official Correspondence':'Official Correspondence','Inventory':'Inventory','Microsoft Office':'Microsoft Office',
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
 ['Foto bersama tim di ruang rapat Sekretariat Wakil Presiden','Team photo in a meeting room at the Secretariat of the Vice President'],
 ['Sertifikat Praktikum Pengadilan','Practicum Court Certificate'],
 ['Sertifikat Novo Club Leadership Bootcamp','Novo Club Leadership Bootcamp Certificate'],
 ['Sertifikat Praktikum Legal Drafting','Legal Drafting Practicum Certificate'],
 ['Seminar Knowledge Management','Knowledge Management Seminar'],
 ['Sertifikat Introduction to Cyber Security','Introduction to Cyber Security Certificate'],
 ['Sertifikat Pendidikan dan Pelatihan Satgas PPKS','PPKS Task Force Education and Training Certificate'],
 ['Webinar AI for Productivity','AI for Productivity Webinar'],
 ['Materi Bootcamp Novo Club','Novo Club Bootcamp Materials'],
 ['Webinar Membangun Budaya Kerja Anti Korupsi','Building an Anti-Corruption Workplace Culture Webinar']
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
 research:{label:'LEGAL RESEARCH & DOCUMENTATION · 2026',title:'From review to understanding.',description:'At the Secretariat of the Vice President of Indonesia, I built fact chronologies, identified legal issues, and reviewed relevant regulations. I prepared 3–4 comprehensive legal memoranda per month, connecting case facts with legal considerations and follow-up options for internal review.',tags:['Legal Analysis','Regulatory Research','Legal Memorandum']},
 service:{label:'LEGAL ADMINISTRATION · 2026',title:'Listening with care.',description:'As part of a two-person frontline service team, I helped handle 2–4 complainants each week during rotating assignments at Lapor Mas Wapres. My tasks included clarifying issues, checking attachments, recording complainant information, and entering submissions into the official system.',tags:['Complaint Intake','Document Verification','Administrative Support']},
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
