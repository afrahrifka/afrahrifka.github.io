"""Build the downloadable legal-focused CV from the public portfolio facts."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import simpleSplit
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "cv-legal.pdf"
FONT = "/usr/share/fonts/TTF/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf"
pdfmetrics.registerFont(TTFont("DejaVu", FONT))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", BOLD))

W, H = A4
ink = colors.HexColor("#302e2c")
rose = colors.HexColor("#87485d")
muted = colors.HexColor("#55514f")
line = colors.HexColor("#ddd5ce")
c = Canvas(str(OUTPUT), pagesize=A4)
c.setTitle("CV Afrah Rifka Afifah — Legal & Compliance")
y = H - 46


def draw(text, size=9, leading=13, bold=False, color=ink, indent=0):
    global y
    font = "DejaVu-Bold" if bold else "DejaVu"
    c.setFont(font, size)
    c.setFillColor(color)
    for row in simpleSplit(text, font, size, W - 92 - indent):
        c.drawString(46 + indent, y, row)
        y -= leading


def heading(text):
    global y
    y -= 9
    c.setStrokeColor(line)
    c.line(46, y + 12, W - 46, y + 12)
    draw(text.upper(), 9, 15, True, rose)


def item(label, description):
    global y
    draw(label, 8.5, 12, True)
    draw(description, 8, 11, False, muted)
    y -= 4


draw("AFRAH RIFKA AFIFAH", 20, 25, True, ink)
draw("LEGAL & COMPLIANCE ENTHUSIAST  |  CORPORATE GOVERNANCE & LEGAL ADMINISTRATOR", 8.4, 15, True, rose)
draw("Jakarta, Indonesia  |  +62 812-9149-5006  |  rifkafifah04@gmail.com", 8.5, 14, False, muted)

heading("Profil")
draw("Lulusan Sarjana Hukum UIN Sunan Kalijaga Yogyakarta dengan minat pada riset hukum, tata kelola korporat, kepatuhan regulasi, dan administrasi legal. Pengalaman di Sekretariat Wakil Presiden RI membentuk pola kerja adaptif, teliti, berintegritas, dan tangguh dalam lingkungan dinamis.", 8.5, 12)

heading("Pengalaman")
item("Legal Intern | Sekretariat Wakil Presiden RI | Jan–Jun 2026", "Asisten Deputi Bidang Politik, Keamanan, Hukum, dan HAM. Mendukung riset peraturan, penyusunan memorandum, dokumentasi kasus, dan administrasi pengaduan Lapor Mas Wapres.")
item("Sekretaris 1 | KKN Konversi 117 | Mar–Jun 2025", "Mengelola korespondensi, dokumen, dan koordinasi jadwal untuk 10 program pengabdian masyarakat.")
item("Relawan Administrasi | PLT PPKS UIN Sunan Kalijaga | Okt 2023–Feb 2025", "Mendukung pencatatan awal pengaduan, pengarsipan, dan koordinasi administratif dengan menjaga kerahasiaan informasi.")
item("Relawan & Sekretaris Tim 55 | Novo Club | Feb–Sep 2024", "Mendukung pencatatan inventaris, dokumentasi distribusi, koordinasi tim, dan laporan akhir kegiatan literasi.")

heading("Pendidikan")
item("Sarjana Hukum (S.H.), Konsentrasi Hukum Tata Negara | UIN Sunan Kalijaga Yogyakarta | 2022–2026", "Fokus: regulasi, hukum administrasi, dan kepatuhan hukum. IPK 3,92/4,00; lulusan terbaik dan tercepat Program Studi pada Periode IV TA 2025/2026.")

heading("Kompetensi & Minat")
draw("Legal Research · Regulatory Compliance · Legal Documentation · Administrative Support · Corporate Governance · Legal Drafting · Contract Review · Information Security (ISO 27001)", 8.3, 12)

heading("Pelatihan & Kursus")
item("ISO/IEC 27001:2022 (ISMS) | Alison", "Manajemen keamanan informasi, perlindungan data, dan mitigasi risiko kebocoran dokumen.")
item("Pelatihan Anti-Korupsi | Kementerian Sekretariat Negara", "Integritas, transparansi, dan pencegahan praktik korupsi.")
item("Pelatihan Knowledge Management | Kementerian Sekretariat Negara", "Tata kelola informasi, arsip digital, dan sistem pengetahuan instansi.")

c.setStrokeColor(line)
c.line(46, 43, W - 46, 43)
c.setFont("DejaVu", 7.5)
c.setFillColor(muted)
c.drawString(46, 30, "Terbuka untuk Corporate Legal, Legal Administration, Company Secretary Support, dan Regulatory Compliance.")
c.save()
print(f"Wrote {OUTPUT} (content ends at y={y:.1f})")
