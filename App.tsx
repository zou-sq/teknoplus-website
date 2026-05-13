import { useState, useEffect, useRef } from "react";

// ── TYPES ──────────────────────────────────────────────
type Lang = "en" | "id";
type Page = "home" | "products" | "kol" | "contact";

// ── TRANSLATIONS ───────────────────────────────────────
const t: Record<string, Record<Lang, string>> = {
  nav_home:       { en: "Home",            id: "Beranda" },
  nav_products:   { en: "Products",        id: "Produk" },
  nav_kol:        { en: "KOL Partnership", id: "Kemitraan KOL" },
  nav_contact:    { en: "Contact Us",      id: "Hubungi Kami" },

  hero_badge:     { en: "Official Insta360 Distributor — Indonesia", id: "Distributor Resmi Insta360 — Indonesia" },
  hero_sub:       { en: "Your trusted technology partner in Indonesia. We bring world-class action cameras and imaging technology to creators, adventurers, and businesses.", id: "Mitra teknologi terpercaya Anda di Indonesia. Kami menghadirkan kamera aksi dan teknologi pencitraan kelas dunia untuk para kreator, petualang, dan bisnis." },
  hero_btn1:      { en: "Explore Products", id: "Lihat Produk" },
  hero_btn2:      { en: "KOL Partnership",  id: "Kemitraan KOL" },
  stat1_label:    { en: "Original Products", id: "Produk Original" },
  stat2_label:    { en: "Warranty",          id: "Garansi" },
  stat3_label:    { en: "After-Sales Support", id: "Dukungan Purna Jual" },

  about_label:    { en: "WHO WE ARE",       id: "SIAPA KAMI" },
  about_title:    { en: "Technology You Can Trust", id: "Teknologi Yang Bisa Dipercaya" },
  about_desc:     { en: "We are more than just a reseller. Tekno Plus is a community-driven tech brand serving individual consumers, content creators, and enterprise clients across Indonesia.", id: "Kami lebih dari sekadar reseller. Tekno Plus adalah brand teknologi berbasis komunitas yang melayani konsumen individual, kreator konten, dan klien korporat di seluruh Indonesia." },
  about_card:     { en: "Tekno Plus is an authorized distributor of Insta360 in Indonesia. We are committed to bringing authentic technology products with full after-sales support to every customer.", id: "Tekno Plus adalah distributor resmi Insta360 di Indonesia. Kami berkomitmen menghadirkan produk teknologi asli dengan dukungan purna jual penuh kepada setiap pelanggan." },
  about_tag:      { en: "AUTHORIZED RESELLER", id: "RESELLER RESMI" },
  v1: { en: "Official warranty coverage for all products sold", id: "Garansi resmi untuk semua produk yang dijual" },
  v2: { en: "Expert pre-sales consultation and product matching", id: "Konsultasi pra-penjualan ahli dan penyesuaian produk" },
  v3: { en: "Fast same-day shipping from Jakarta warehouse", id: "Pengiriman cepat di hari yang sama dari gudang Jakarta" },
  v4: { en: "Dedicated support for KOLs and business clients", id: "Dukungan khusus untuk KOL dan klien bisnis" },

  platform_label: { en: "WHERE TO FIND US",  id: "TEMUKAN KAMI DI" },
  platform_title: { en: "Available On Major Platforms", id: "Tersedia di Platform Utama" },
  platform_note:  { en: "Official Store",    id: "Toko Resmi" },

  trust_label:    { en: "WHY CHOOSE US",    id: "MENGAPA PILIH KAMI" },
  trust_title:    { en: "The Tekno Plus Difference", id: "Perbedaan Tekno Plus" },
  t1_title: { en: "Official Warranty",  id: "Garansi Resmi" },
  t1_desc:  { en: "12 months official warranty on all products sold through Tekno Plus", id: "Garansi resmi 12 bulan untuk semua produk yang dijual melalui Tekno Plus" },
  t2_title: { en: "100% Authentic",     id: "100% Asli" },
  t2_desc:  { en: "Direct supply from Insta360 — guaranteed original, no grey market", id: "Pasokan langsung dari Insta360 — dijamin asli, bukan produk grey market" },
  t3_title: { en: "Same-Day Shipping",  id: "Pengiriman Hari Ini" },
  t3_desc:  { en: "Order before 2PM and your item ships the same day from our Jakarta warehouse", id: "Pesan sebelum pukul 14.00 dan barang dikirim hari ini dari gudang Jakarta kami" },
  t4_title: { en: "24/7 Support",       id: "Dukungan 24/7" },
  t4_desc:  { en: "Always ready to help via WhatsApp before and after purchase", id: "Selalu siap membantu melalui WhatsApp sebelum dan sesudah pembelian" },

  prod_label:   { en: "OFFICIAL INSTA360 LINEUP", id: "LINI RESMI INSTA360" },
  prod_title:   { en: "Our Products",   id: "Produk Kami" },
  prod_sub:     { en: "Complete Insta360 range with official Indonesian warranty", id: "Lini lengkap Insta360 dengan garansi resmi Indonesia" },
  warranty_banner_title: { en: "All Products Come with Official Indonesian Warranty", id: "Semua Produk Dilengkapi Garansi Resmi Indonesia" },
  warranty_banner_desc:  { en: "12 months warranty on every product purchased through Tekno Plus. Our after-sales team handles all claims quickly and professionally.", id: "Garansi 12 bulan untuk setiap produk yang dibeli melalui Tekno Plus. Tim purna jual kami menangani semua klaim dengan cepat dan profesional." },

  kol_label:    { en: "FOR CREATORS & INFLUENCERS", id: "UNTUK KREATOR & INFLUENCER" },
  kol_title:    { en: "KOL Partnership", id: "Kemitraan KOL" },
  kol_sub:      { en: "Create together, grow together", id: "Berkreasi bersama, tumbuh bersama" },
  kol_benefits_label: { en: "WHAT YOU GET", id: "APA YANG ANDA DAPATKAN" },
  kol_benefits_title: { en: "Partnership Benefits", id: "Keuntungan Kemitraan" },
  b1_title: { en: "Product Loans",        id: "Pinjaman Produk" },
  b1_desc:  { en: "Get access to the latest Insta360 products for free to create reviews and content.", id: "Dapatkan akses produk Insta360 terbaru secara gratis untuk membuat review dan konten." },
  b2_title: { en: "Commission Program",   id: "Program Komisi" },
  b2_desc:  { en: "Earn competitive commissions on every sale driven by your referral link or promo code.", id: "Dapatkan komisi kompetitif dari setiap penjualan melalui link referral atau kode promo Anda." },
  b3_title: { en: "Co-branding Campaigns", id: "Kampanye Co-branding" },
  b3_desc:  { en: "We collaborate on joint campaigns, exclusive bundle editions, and co-branded content.", id: "Kami berkolaborasi dalam kampanye bersama, edisi bundle eksklusif, dan konten co-branded." },
  b4_title: { en: "Priority Support",     id: "Dukungan Prioritas" },
  b4_desc:  { en: "A dedicated account manager handles all your needs with fast response time.", id: "Manajer akun khusus menangani semua kebutuhan Anda dengan waktu respons cepat." },
  process_label: { en: "HOW IT WORKS",   id: "CARA KERJANYA" },
  process_title: { en: "Simple Partnership Process", id: "Proses Kemitraan yang Sederhana" },
  s1_title: { en: "Apply",   id: "Daftar" },   s1_desc: { en: "Fill in the form with your details and social media info", id: "Isi formulir dengan data dan info media sosial Anda" },
  s2_title: { en: "Review",  id: "Evaluasi" }, s2_desc: { en: "Our team reviews your profile and gets back within 3 business days", id: "Tim kami meninjau profil Anda dan menghubungi dalam 3 hari kerja" },
  s3_title: { en: "Onboard", id: "Bergabung" },s3_desc: { en: "We align on goals, content plan, and partnership terms", id: "Kami menyelaraskan tujuan, rencana konten, dan ketentuan kemitraan" },
  s4_title: { en: "Create",  id: "Berkreasi" },s4_desc: { en: "Start creating amazing content and growing together", id: "Mulai membuat konten luar biasa dan tumbuh bersama" },
  apply_title: { en: "Ready to Partner with Us?", id: "Siap Bermitra dengan Kami?" },
  apply_desc:  { en: "Whether you're a micro-influencer or a major content house, we have a partnership model that works for you. Fill in the form and our team will reach out within 3 business days.", id: "Baik Anda micro-influencer maupun konten kreator besar, kami memiliki model kemitraan yang sesuai. Isi formulir dan tim kami akan menghubungi dalam 3 hari kerja." },
  ai1: { en: "Open to all follower counts — quality matters more than quantity", id: "Terbuka untuk semua jumlah pengikut — kualitas lebih penting dari kuantitas" },
  ai2: { en: "Travel, sports, lifestyle, tech, and adventure niches welcome", id: "Niche travel, olahraga, lifestyle, teknologi, dan petualangan sangat disambut" },
  ai3: { en: "Fast response — we reply within 3 business days", id: "Respons cepat — kami membalas dalam 3 hari kerja" },
  wa_us: { en: "💬 WhatsApp Us", id: "💬 WhatsApp Kami" },
  form_name:     { en: "FULL NAME",        id: "NAMA LENGKAP" },
  form_ig:       { en: "INSTAGRAM / TIKTOK", id: "INSTAGRAM / TIKTOK" },
  form_followers:{ en: "TOTAL FOLLOWERS",  id: "TOTAL PENGIKUT" },
  form_niche:    { en: "CONTENT NICHE",    id: "NICHE KONTEN" },
  form_email:    { en: "YOUR EMAIL",       id: "EMAIL ANDA" },
  form_msg:      { en: "MESSAGE (OPTIONAL)", id: "PESAN (OPSIONAL)" },
  form_submit:   { en: "SUBMIT APPLICATION", id: "KIRIM LAMARAN" },
  form_success:  { en: "✅ Application submitted! We'll get back to you within 3 business days.", id: "✅ Lamaran terkirim! Kami akan menghubungi Anda dalam 3 hari kerja." },
  form_select:   { en: "Select range",     id: "Pilih range" },
  ph_name:       { en: "Your name",        id: "Nama Anda" },
  ph_ig:         { en: "@yourusername",    id: "@usernamekamu" },
  ph_niche:      { en: "e.g. Travel, Sports, Lifestyle", id: "mis. Travel, Olahraga, Lifestyle" },
  ph_email:      { en: "email@example.com", id: "email@contoh.com" },
  ph_msg:        { en: "Tell us about your content and why you want to partner with Tekno Plus", id: "Ceritakan tentang konten Anda dan mengapa ingin bermitra dengan Tekno Plus" },
  prefer_direct: { en: "Prefer to reach us directly?", id: "Lebih suka menghubungi langsung?" },

  contact_label: { en: "WE'RE HERE TO HELP", id: "KAMI SIAP MEMBANTU" },
  contact_title: { en: "Contact Us",       id: "Hubungi Kami" },
  contact_sub:   { en: "Reach us anytime — we respond fast", id: "Hubungi kami kapan saja — kami merespons dengan cepat" },
  direct_label:  { en: "DIRECT CONTACT",   id: "KONTAK LANGSUNG" },
  direct_title:  { en: "Get in Touch",     id: "Hubungi Kami" },
  wa_note:       { en: "Fastest response — tap to open WhatsApp", id: "Respons tercepat — ketuk untuk membuka WhatsApp" },
  email_note:    { en: "For formal inquiries and B2B partnerships", id: "Untuk pertanyaan formal dan kemitraan B2B" },
  response_title:{ en: "Fast Response Guaranteed", id: "Respons Cepat Terjamin" },
  response_desc: { en: "WhatsApp: typically within 1 hour. Email: within 1 business day.", id: "WhatsApp: biasanya dalam 1 jam. Email: dalam 1 hari kerja." },
  stores_label:  { en: "FIND US ON",       id: "TEMUKAN KAMI DI" },
  stores_title:  { en: "Our Stores",       id: "Toko Kami" },
  shopee_note:   { en: "Search 'Tekno Plus' on Shopee",    id: "Cari 'Tekno Plus' di Shopee" },
  tokopedia_note:{ en: "Search 'Tekno Plus' on Tokopedia", id: "Cari 'Tekno Plus' di Tokopedia" },
  warranty_title:{ en: "Official Indonesian Warranty",     id: "Garansi Resmi Indonesia" },
  warranty_desc: { en: "Every product from Tekno Plus comes with a 12-month official warranty. Contact us anytime for warranty claims and after-sales support.", id: "Setiap produk dari Tekno Plus dilengkapi garansi resmi 12 bulan. Hubungi kami kapan saja untuk klaim garansi dan dukungan purna jual." },

  footer_copy:   { en: "© 2025 Tekno Plus. All rights reserved.", id: "© 2025 Tekno Plus. Semua hak dilindungi." },
};

// ── HOOK: scroll reveal ────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── REVEAL WRAPPER ─────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(28px)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

// ── SHARED STYLES ──────────────────────────────────────
const S = {
  sectionLabel: { fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", color: "#00d4ff", marginBottom: "0.8rem", textTransform: "uppercase" as const },
  sectionTitle: { fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.5rem)", lineHeight: 1, marginBottom: "1rem" },
  sectionDesc:  { color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 560, fontWeight: 300 },
  divider:      { width: "3rem", height: 3, background: "linear-gradient(90deg,#1557e8,#00d4ff)", borderRadius: 2, margin: "1rem 0 2rem" },
  btnPrimary:   { display: "inline-block", background: "linear-gradient(135deg,#1557e8,#00d4ff)", color: "white", padding: "0.85rem 2rem", borderRadius: 8, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", textDecoration: "none", border: "none", cursor: "pointer", boxShadow: "0 4px 24px rgba(21,87,232,0.4)" } as React.CSSProperties,
  btnSecondary: { display: "inline-block", background: "rgba(255,255,255,0.08)", color: "white", padding: "0.85rem 2rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", textDecoration: "none", cursor: "pointer" } as React.CSSProperties,
};

// ── GOOGLE FONT INJECT ─────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.cssText = "margin:0;padding:0;background:#030d1f;color:white;font-family:'Barlow',sans-serif;overflow-x:hidden;";
  }, []);
  return null;
}

// ══════════════════════════════════════════════════════
// PAGES
// ══════════════════════════════════════════════════════

// ── HOME ───────────────────────────────────────────────
function HomePage({ lang, navigate }: { lang: Lang; navigate: (p: Page) => void }) {
  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", padding: "8rem 4vw 4rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 30%,rgba(21,87,232,0.35) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 20% 70%,rgba(0,212,255,0.15) 0%,transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%,black,transparent)" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 30, padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", color: "#00d4ff", marginBottom: "1.5rem", backdropFilter: "blur(10px)", position: "relative", animation: "fadeUp 0.8s ease both" }}>
          <span style={{ width: 8, height: 8, background: "#00d4ff", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
          {t.hero_badge[lang]}
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(3.5rem,10vw,7rem)", lineHeight: 0.95, marginBottom: "1.2rem", position: "relative", animation: "fadeUp 0.8s 0.1s ease both" }}>
          <span style={{ background: "linear-gradient(135deg,#fff 0%,#7ab8ff 50%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TEKNO</span><br />PLUS
        </h1>
        <p style={{ fontSize: "clamp(1rem,2vw,1.25rem)", fontWeight: 300, color: "rgba(255,255,255,0.8)", maxWidth: 600, lineHeight: 1.6, marginBottom: "2.5rem", position: "relative", animation: "fadeUp 0.8s 0.2s ease both" }}>{t.hero_sub[lang]}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", position: "relative", animation: "fadeUp 0.8s 0.3s ease both" }}>
          <button style={S.btnPrimary} onClick={() => navigate("products")}>{t.hero_btn1[lang]}</button>
          <button style={S.btnSecondary} onClick={() => navigate("kol")}>{t.hero_btn2[lang]}</button>
        </div>
        <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", position: "relative", animation: "fadeUp 0.8s 0.4s ease both", flexWrap: "wrap", justifyContent: "center" }}>
          {[["100%", t.stat1_label[lang]], ["12M", t.stat2_label[lang]], ["24/7", t.stat3_label[lang]]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "2.2rem", background: "linear-gradient(135deg,#fff,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", fontWeight: 500, marginTop: "0.2rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "6rem 4vw", background: "linear-gradient(180deg,#030d1f 0%,rgba(10,42,94,0.3) 100%)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ background: "linear-gradient(135deg,rgba(21,87,232,0.2),rgba(0,212,255,0.1))", border: "1px solid rgba(21,87,232,0.3)", borderRadius: 20, padding: "3rem", position: "relative", overflow: "hidden" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "4rem", background: "linear-gradient(135deg,#fff,#7ab8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>T+</div>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.7 }}>{t.about_card[lang]}</p>
              <span style={{ display: "inline-block", background: "linear-gradient(135deg,#1557e8,#3d8ef0)", padding: "0.3rem 0.8rem", borderRadius: 4, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginTop: "1.2rem", fontFamily: "'Barlow Condensed',sans-serif" }}>{t.about_tag[lang]}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={S.sectionLabel}>{t.about_label[lang]}</div>
            <div style={S.sectionTitle}>{t.about_title[lang]}</div>
            <div style={S.divider} />
            <p style={S.sectionDesc}>{t.about_desc[lang]}</p>
            <ul style={{ listStyle: "none", marginTop: "1.5rem", padding: 0 }}>
              {(["v1","v2","v3","v4"] as const).map((k) => (
                <li key={k} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", marginBottom: "1rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                  <span style={{ color: "#00d4ff", flexShrink: 0 }}>✦</span>{t[k][lang]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section style={{ padding: "6rem 4vw", textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={S.sectionLabel}>{t.platform_label[lang]}</div>
            <div style={S.sectionTitle}>{t.platform_title[lang]}</div>
            <div style={{ ...S.divider, margin: "1rem auto 0" }} />
          </div>
        </Reveal>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {[["🛍️", "Shopee"], ["🛒", "Tokopedia"]].map(([icon, name]) => (
            <Reveal key={name}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem 2.5rem", minWidth: 180, transition: "all 0.3s" }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.8rem" }}>{icon}</span>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "0.05em" }}>{name}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "0.3rem" }}>{t.platform_note[lang]}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section style={{ padding: "6rem 4vw", textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={S.sectionLabel}>{t.trust_label[lang]}</div>
            <div style={S.sectionTitle}>{t.trust_title[lang]}</div>
            <div style={{ ...S.divider, margin: "1rem auto 0" }} />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem", marginTop: "3rem", maxWidth: 1200, margin: "3rem auto 0" }}>
          {(["🛡️","✅","🚀","💬"] as const).map((icon, i) => {
            const keys = [["t1_title","t1_desc"],["t2_title","t2_desc"],["t3_title","t3_desc"],["t4_title","t4_desc"]];
            const [tk, dk] = keys[i];
            return (
              <Reveal key={icon} delay={i * 0.05}>
                <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem 1.5rem" }}>
                  <span style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}>{icon}</span>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem", letterSpacing: "0.03em" }}>{t[tk][lang]}</div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.83rem", lineHeight: 1.6 }}>{t[dk][lang]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ── PRODUCTS ───────────────────────────────────────────
function ProductsPage({ lang }: { lang: Lang }) {
  const products = [
    { icon: "🎥", name: "Insta360 X Series",    badge: { en: "BEST SELLER", id: "TERLARIS" },   desc: { en: "The flagship 360° camera series. Capture every angle with stunning 8K resolution and AI-powered editing.", id: "Seri kamera 360° unggulan. Abadikan setiap sudut dengan resolusi 8K yang memukau dan editing berbasis AI." } },
    { icon: "🏄", name: "Insta360 GO Series",   badge: { en: "POPULAR",     id: "POPULER" },     desc: { en: "Ultra-compact action camera for everyday adventures. Wearable, waterproof, and incredibly versatile.", id: "Kamera aksi ultra-kompak untuk petualangan sehari-hari. Dapat dipakai, tahan air, dan sangat serbaguna." } },
    { icon: "🎬", name: "Insta360 ACE Series",  badge: { en: "PRO CHOICE",  id: "PILIHAN PRO" }, desc: { en: "Professional-grade action camera with FlowState stabilization and 4K HDR. Built for serious creators.", id: "Kamera aksi kelas profesional dengan stabilisasi FlowState dan 4K HDR. Dirancang untuk kreator serius." } },
    { icon: "🔭", name: "Insta360 Flow Series", badge: { en: "NEW",         id: "BARU" },         desc: { en: "AI-powered gimbal stabilizer for smartphones. Perfect for vloggers and mobile content creators.", id: "Gimbal stabilizer bertenaga AI untuk smartphone. Sempurna untuk vlogger dan kreator konten mobile." } },
    { icon: "📦", name: { en: "Bundle Packages", id: "Paket Bundle" },     badge: { en: "EXCLUSIVE", id: "EKSKLUSIF" }, desc: { en: "Camera + accessories bundles curated for every use case — vlog, travel, sports, and business.", id: "Bundle kamera + aksesori yang dikurasi untuk setiap kebutuhan — vlog, travel, olahraga, dan bisnis." } },
    { icon: "🛠️", name: { en: "Accessories & Parts", id: "Aksesori & Suku Cadang" }, badge: { en: "IN STOCK", id: "TERSEDIA" }, desc: { en: "Full range of official Insta360 accessories: mounts, cases, batteries, lenses, and more.", id: "Rangkaian lengkap aksesori resmi Insta360: mount, casing, baterai, lensa, dan lainnya." } },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 4vw 6rem" }}>
      <PageHero label={t.prod_label[lang]} title={t.prod_title[lang]} sub={t.prod_sub[lang]} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem", marginTop: "3rem" }}>
        {products.map((p, i) => {
          const name = typeof p.name === "string" ? p.name : p.name[lang];
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem", height: "100%" }}>
                <span style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}>{p.icon}</span>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.5rem", letterSpacing: "0.03em" }}>{name}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>{p.desc[lang]}</p>
                <span style={{ display: "inline-block", marginTop: "1rem", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", padding: "0.25rem 0.7rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.05em" }}>{p.badge[lang]}</span>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.2rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.78rem", padding: "0.35rem 0.9rem", borderRadius: 6, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, letterSpacing: "0.05em", background: "rgba(238,77,45,0.15)", border: "1px solid rgba(238,77,45,0.3)", color: "#ff6b45" }}>Shopee</span>
                  <span style={{ fontSize: "0.78rem", padding: "0.35rem 0.9rem", borderRadius: 6, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, letterSpacing: "0.05em", background: "rgba(66,181,73,0.15)", border: "1px solid rgba(66,181,73,0.3)", color: "#4db356" }}>Tokopedia</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal>
        <div style={{ background: "linear-gradient(135deg,rgba(21,87,232,0.2),rgba(0,212,255,0.1))", border: "1px solid rgba(21,87,232,0.3)", borderRadius: 16, padding: "2rem 2.5rem", display: "flex", alignItems: "center", gap: "2rem", marginTop: "4rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "3rem", flexShrink: 0 }}>🛡️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.5rem", marginBottom: "0.3rem" }}>{t.warranty_banner_title[lang]}</div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.6 }}>{t.warranty_banner_desc[lang]}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ── KOL ────────────────────────────────────────────────
function KolPage({ lang }: { lang: Lang }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 4vw 6rem" }}>
      <PageHero label={t.kol_label[lang]} title={t.kol_title[lang]} sub={t.kol_sub[lang]} />

      {/* Benefits */}
      <Reveal>
        <div style={S.sectionLabel}>{t.kol_benefits_label[lang]}</div>
        <div style={S.sectionTitle}>{t.kol_benefits_title[lang]}</div>
        <div style={S.divider} />
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.2rem", marginBottom: "4rem" }}>
        {(["📸","💰","🤝","⚡"] as const).map((icon, i) => {
          const keys = [["b1_title","b1_desc"],["b2_title","b2_desc"],["b3_title","b3_desc"],["b4_title","b4_desc"]];
          const [tk, dk] = keys[i];
          return (
            <Reveal key={icon} delay={i * 0.05}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.8rem" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.8rem" }}>{icon}</span>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.5rem", letterSpacing: "0.03em" }}>{t[tk][lang]}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>{t[dk][lang]}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Process */}
      <Reveal>
        <div style={S.sectionLabel}>{t.process_label[lang]}</div>
        <div style={S.sectionTitle}>{t.process_title[lang]}</div>
        <div style={S.divider} />
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "4rem" }}>
        {([["s1_title","s1_desc"],["s2_title","s2_desc"],["s3_title","s3_desc"],["s4_title","s4_desc"]] as const).map(([tk, dk], i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
              <div style={{ width: "4rem", height: "4rem", background: "linear-gradient(135deg,#1557e8,#3d8ef0)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.4rem" }}>{i + 1}</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", letterSpacing: "0.03em" }}>{t[tk][lang]}</div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.5 }}>{t[dk][lang]}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Apply */}
      <Reveal>
        <div style={{ background: "linear-gradient(135deg,rgba(21,87,232,0.2),rgba(0,212,255,0.08))", border: "1px solid rgba(21,87,232,0.3)", borderRadius: 20, padding: "3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "3rem", alignItems: "start" }}>
            <div>
              <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.8rem", marginBottom: "1rem" }}>{t.apply_title[lang]}</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{t.apply_desc[lang]}</p>
              {(["ai1","ai2","ai3"] as const).map(k => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                  <span style={{ color: "#00d4ff" }}>✦</span>{t[k][lang]}
                </div>
              ))}
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "1.5rem" }}>{t.prefer_direct[lang]}</p>
              <a href="https://wa.me/628211969822" target="_blank" rel="noreferrer" style={{ ...S.btnSecondary, marginTop: "0.8rem", fontSize: "0.9rem", padding: "0.6rem 1.2rem" }}>{t.wa_us[lang]}</a>
            </div>
            <div>
              {submitted ? (
                <div style={{ padding: "1.5rem", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 8, textAlign: "center", color: "#00d4ff", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem" }}>{t.form_success[lang]}</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { key: "form_name", ph: "ph_name", type: "text" },
                    { key: "form_ig",   ph: "ph_ig",   type: "text" },
                    { key: "form_niche",ph: "ph_niche", type: "text" },
                    { key: "form_email",ph: "ph_email", type: "email" },
                  ].map(({ key, ph, type }) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.08em", marginBottom: "0.4rem", fontFamily: "'Barlow Condensed',sans-serif" }}>{t[key][lang]}</label>
                      <input type={type} placeholder={t[ph][lang]} required={type === "email" || key === "form_name"} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "0.75rem 1rem", color: "white", fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.08em", marginBottom: "0.4rem", fontFamily: "'Barlow Condensed',sans-serif" }}>{t.form_followers[lang]}</label>
                    <select style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "0.75rem 1rem", color: "white", fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", outline: "none" }}>
                      <option value="">{t.form_select[lang]}</option>
                      {["1K – 10K","10K – 50K","50K – 100K","100K+"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.08em", marginBottom: "0.4rem", fontFamily: "'Barlow Condensed',sans-serif" }}>{t.form_msg[lang]}</label>
                    <textarea placeholder={t.ph_msg[lang]} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "0.75rem 1rem", color: "white", fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", outline: "none", resize: "vertical", minHeight: 100, boxSizing: "border-box" }} />
                  </div>
                  <button type="submit" style={{ ...S.btnPrimary, width: "100%", textAlign: "center", padding: "1rem" }}>{t.form_submit[lang]}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ── CONTACT ────────────────────────────────────────────
function ContactPage({ lang }: { lang: Lang }) {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "4rem 4vw 6rem" }}>
      <PageHero label={t.contact_label[lang]} title={t.contact_title[lang]} sub={t.contact_sub[lang]} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "3rem", marginTop: "3rem" }}>
        <div>
          <Reveal>
            <div style={S.sectionLabel}>{t.direct_label[lang]}</div>
            <div style={S.sectionTitle}>{t.direct_title[lang]}</div>
            <div style={S.divider} />
          </Reveal>
          <Reveal delay={0.05}>
            <a href="https://wa.me/628211969822" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem 2rem", textDecoration: "none", color: "white", marginBottom: "1rem" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)", flexShrink: 0 }}>💬</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif" }}>WhatsApp</div>
                <div style={{ fontSize: "1rem", fontWeight: 500 }}>+62 821-1969-822</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>{t.wa_note[lang]}</div>
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="mailto:contact@teknoplus.co.id" style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem 2rem", textDecoration: "none", color: "white", marginBottom: "1rem" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", background: "rgba(21,87,232,0.15)", border: "1px solid rgba(21,87,232,0.3)", flexShrink: 0 }}>📧</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif" }}>Email</div>
                <div style={{ fontSize: "1rem", fontWeight: 500 }}>contact@teknoplus.co.id</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>{t.email_note[lang]}</div>
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>⚡</span>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>{t.response_title[lang]}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>{t.response_desc[lang]}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <div style={S.sectionLabel}>{t.stores_label[lang]}</div>
            <div style={S.sectionTitle}>{t.stores_title[lang]}</div>
            <div style={S.divider} />
          </Reveal>
          {[
            { icon: "🛍️", name: "Shopee",    note: t.shopee_note[lang],    bg: "rgba(238,77,45,0.15)",  border: "rgba(238,77,45,0.3)" },
            { icon: "🛒", name: "Tokopedia", note: t.tokopedia_note[lang], bg: "rgba(66,181,73,0.15)",  border: "rgba(66,181,73,0.3)" },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem 2rem", marginBottom: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", background: p.bg, border: `1px solid ${p.border}`, flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif" }}>{p.name}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 600 }}>Tekno Plus Official</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>{p.note}</div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <div style={{ background: "linear-gradient(135deg,rgba(21,87,232,0.2),rgba(0,212,255,0.08))", border: "1px solid rgba(21,87,232,0.3)", borderRadius: 20, padding: "2.5rem", textAlign: "center", marginTop: "1rem" }}>
              <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "1rem" }}>🛡️</span>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.5rem", marginBottom: "0.6rem" }}>{t.warranty_title[lang]}</div>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.7 }}>{t.warranty_desc[lang]}</p>
              <span style={{ display: "inline-block", marginTop: "1.2rem", background: "linear-gradient(135deg,#1557e8,#3d8ef0)", padding: "0.4rem 1.2rem", borderRadius: 6, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.1em" }}>GARANSI RESMI INDONESIA</span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ── PAGE HERO (inner pages) ────────────────────────────
function PageHero({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 0 3rem", position: "relative" }}>
      <div style={{ ...S.sectionLabel, justifyContent: "center" }}>{label}</div>
      <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(3rem,8vw,5.5rem)", lineHeight: 0.95, background: "linear-gradient(135deg,#fff 0%,#7ab8ff 60%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>{title}</h1>
      <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>{sub}</p>
      <div style={{ ...S.divider, margin: "1.5rem auto 0" }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════
export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("tp-lang") as Lang) || "en");
  const [page, setPage] = useState<Page>("home");

  const changeLang = (l: Lang) => { setLang(l); localStorage.setItem("tp-lang", l); };
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const navItems: { key: Page; label: string }[] = [
    { key: "home",     label: t.nav_home[lang] },
    { key: "products", label: t.nav_products[lang] },
    { key: "kol",      label: t.nav_kol[lang] },
    { key: "contact",  label: t.nav_contact[lang] },
  ];

  return (
    <>
      <FontLoader />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
        @keyframes pulse  { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.5; transform:scale(1.3) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, select, textarea { color-scheme: dark; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>

      {/* Lang switcher */}
      <div style={{ position: "fixed", top: "1.2rem", right: "1.5rem", zIndex: 9999, display: "flex", gap: "0.4rem" }}>
        {(["en","id"] as Lang[]).map(l => (
          <button key={l} onClick={() => changeLang(l)} style={{ background: lang === l ? "#1557e8" : "rgba(255,255,255,0.08)", border: `1px solid ${lang === l ? "#3d8ef0" : "rgba(255,255,255,0.2)"}`, color: "white", padding: "0.3rem 0.8rem", borderRadius: 20, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", cursor: "pointer" }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "1rem 4vw", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(20px)", background: "rgba(3,13,31,0.7)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <button onClick={() => navigate("home")} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.6rem", letterSpacing: "0.05em", background: "linear-gradient(90deg,#fff,#7ab8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", border: "none", cursor: "pointer", backgroundColor: "transparent" }}>TEKNO PLUS</button>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          {navItems.map(({ key, label }) => (
            <li key={key}>
              <button onClick={() => navigate(key)} style={{ color: page === key ? "#00d4ff" : "rgba(255,255,255,0.8)", background: key === "contact" ? "linear-gradient(135deg,#1557e8,#3d8ef0)" : "none", border: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.05em", fontFamily: "'Barlow',sans-serif", padding: key === "contact" ? "0.5rem 1.2rem" : 0, borderRadius: key === "contact" ? 6 : 0, color: key === "contact" ? "white" : (page === key ? "#00d4ff" : "rgba(255,255,255,0.8)") }}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Page content */}
      <div style={{ paddingTop: page === "home" ? 0 : "5rem" }}>
        {page === "home"     && <HomePage    lang={lang} navigate={navigate} />}
        {page === "products" && <ProductsPage lang={lang} />}
        {page === "kol"      && <KolPage      lang={lang} />}
        {page === "contact"  && <ContactPage  lang={lang} />}
      </div>

      {/* Footer */}
      <footer style={{ background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem 4vw", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <button onClick={() => navigate("home")} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.4rem", background: "linear-gradient(90deg,#fff,#7ab8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", border: "none", cursor: "pointer", backgroundColor: "transparent" }}>TEKNO PLUS</button>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{t.footer_copy[lang]}</div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {navItems.map(({ key, label }) => (
            <button key={key} onClick={() => navigate(key)} style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Barlow',sans-serif" }}>{label}</button>
          ))}
        </div>
      </footer>

      {/* WhatsApp float */}
      <a href="https://wa.me/628211969822" target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9000, background: "#25D366", color: "white", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>💬</a>
    </>
  );
}
