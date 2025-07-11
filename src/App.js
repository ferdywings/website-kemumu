import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "./App.css";
import { supabase } from './supabaseClient';

// Data wisata
const defaultWisataList = [
  {
    id: "palak-siring",
    nama: "Air terjun palak siring",
    img: "/images/palak siring (3).png",
    lokasi: "https://maps.app.goo.gl/n587iCuDrV66gaKZ7",
    deskripsi: "Air terjun alami dengan suasana asri dan udara sejuk, cocok untuk piknik keluarga.",
    galeri: ["/images/palak siring (3).png", "/images/palak siring (2).png", "/images/palak siring (1).png", "/images/palak siring (4).png"],
    status: "buka"
  },
  {
    id: "lorong-watu",
    nama: "Lorong Watu",
    img: "/images/lorong watu.jpg",
    lokasi: "https://maps.app.goo.gl/FNCfqSNyHmnYWS6MA",
    deskripsi: "Lorong batu alami yang unik, spot foto favorit wisatawan.",
    galeri: ["/images/lorong watu.jpg", "/images/lorong watu1.jpg", "/images/lorong watu 2.jpg", "/images/lorong watu 3.jpg"],
    status: "buka"
  },
  {
    id: "air-goreng",
    nama: "Siring Irigasi Air Goreng",
    img: "/images/air siring (2).png",
    lokasi: "https://maps.app.goo.gl/yTk5H7M2VqgHPBHk7",
    deskripsi: "Sungai irigasi dengan pemandangan indah dan suasana tenang.",
    galeri: ["/images/air siring (2).png","/images/air siring (1).png", "/images/air siring (3).png"],
    status: "buka"
  },
  {
    id: "paul",
    nama: "Paul",
    img: "/images/paul (3).png",
    lokasi: "https://maps.app.goo.gl/ZorDKPJa1d4xNwXG7",
    deskripsi: "Area wisata dengan panorama alam yang memukau.",
    galeri: ["/images/paul (3).png", "/images/paul (2).png", "/images/paul (1).png"],
    status: "buka"
  },
  {
    id: "persawahan",
    nama: "View Persawahan",
    img: "/images/sawah (3).png",
    lokasi: "https://maps.app.goo.gl/KMsfcXLPCgUrsyCj6",
    deskripsi: "Pemandangan sawah hijau yang luas dan menenangkan.",
    galeri: ["/images/sawah (3).png", "/images/sawah (2).png", "/images/sawah (1).png", "/images/sawah (4).png"],
    status: "buka"
  },
  {
    id: "puspa-langka",
    nama: "Puspa Langka",
    img: "/images/bunga (1).png",
    lokasi: "https://maps.app.goo.gl/tvTwD29y9vZm7rfK8",
    deskripsi: "Taman bunga langka dengan koleksi flora unik.",
    galeri: ["/images/bunga (1).png", "/images/bunga (2).png"],
    status: "buka"
  },
  {
    id: "Dam",
    nama: "Dam",
    img: "/images/dam (3).png",
    lokasi: "https://maps.app.goo.gl/fmQPi7arr64zP5A5A",
    deskripsi: "Taman bunga langka dengan koleksi flora unik.",
    galeri: ["/images/dam (3).png", "/images/dam (2).png", "/images/dam (1).png", "/images/dam (4).png"],
    status: "buka"
  },
];

const beritaList = [
  {
    id: 1,
    judul: "Festival Kemumu 2024 Sukses Digelar",
    tanggal: "2024-06-10",
    ringkasan: "Festival tahunan Kemumu kembali digelar dengan meriah, menampilkan budaya lokal dan wisata alam."
  },
  {
    id: 2,
    judul: "Gotong Royong Bersihkan Irigasi",
    tanggal: "2024-06-05",
    ringkasan: "Warga Kelurahan Kemumu bersama pemerintah setempat melakukan gotong royong membersihkan saluran irigasi."
  },
  {
    id: 3,
    judul: "Penanaman Seribu Pohon di Kemumu",
    tanggal: "2024-05-28",
    ringkasan: "Aksi penghijauan dengan penanaman seribu pohon di area wisata dan persawahan Kemumu."
  }
];

const anggotaKKN = [
  { nama: "Revika Putri Asharia", foto: "/images/pika.jpg", ig: "https://www.instagram.com/reeppika/profilecard/?igsh=dGM1dG0xMjU4Mjc3" },
  { nama: "Athiyah Ghina Ridwan", foto: "/images/gina.jpg", ig: "https://www.instagram.com/a.ghinaa?igsh=MXNxODY3NGgyM3psMA%3D%3D&utm_source=qr" },
  { nama: "Saniyyah Zhafirah", foto: "/images/saniyyah.jpg", ig: "https://www.instagram.com/sannyaaz?igsh=MWdheHZsY2l6MDUwNg==" },
  { nama: "Shasa Fatimah Azzahra", foto: "/images/caca.jpg", ig: "https://www.instagram.com/shasaazhra?igsh=eXFoZTFhbTQ5cXY3" },
  { nama: "Fia Dieca Amanda", foto: "/images/fia.jpg", ig: "https://www.instagram.com/fiadiecaaa?igsh=bzd3cjd4anhxeGl0" },
  { nama: "Ferdy Fitriansyah Rowi", foto: "/images/ferdy.jpg", ig: "https://www.instagram.com/ferdi_fitriansyah/profilecard/?igsh=cTFmdW8ya2Y0cXdk" },
  { nama: "⁠Noval Dwi satria", foto: "/images/nopal.jpg", ig: "https://www.instagram.com/novalsatria_?igsh=eTFxcnYxbGw5aW42" },
  { nama: "Muhammad Ikhwan Aulia", foto: "/images/ikhwan.jpg", ig: "https://www.instagram.com/mhmdikwan_?igsh=MWNwbGJnMDhqZXF5bA==" },
  { nama: "M. Fiqritama Duta Pramana", foto: "/images/fikri.jpg", ig: "https://www.instagram.com/fiqriprmna_?igsh=MWt3ZDcxcDV2djNqbg==" },
  { nama: "⁠Ahmad Radesta", foto: "/images/mamek.jpg", ig: "https://www.instagram.com/ahmadrdsta?igsh=NDRoZDFsM21xZm82" },
  // dst...
];

function WisataDeskripsi({ wisata }) {
  const [fotoIndex, setFotoIndex] = React.useState(0);
  if (!wisata) return <div>Wisata tidak ditemukan.</div>;
  const totalFoto = wisata.galeri.length;
  const nextFoto = () => setFotoIndex((prev) => (prev + 1) % totalFoto);
  const prevFoto = () => setFotoIndex((prev) => (prev - 1 + totalFoto) % totalFoto);
  return (
    <div className="wisata-deskripsi-page">
      <h2>{wisata.nama} {wisata.status === 'tutup' && <span style={{color:'#e74c3c', fontWeight:'bold', fontSize:'0.7em', marginLeft:8}}>(Tutup)</span>}</h2>
      <div className="wisata-deskripsi-galeri" style={{justifyContent:'center'}}>
        <button onClick={prevFoto} className="carousel-btn" aria-label="Sebelumnya">&#8592;</button>
        <img src={wisata.galeri[fotoIndex]} alt={wisata.nama + ' foto ' + (fotoIndex+1)} style={{maxWidth:'300px', margin:'10px', borderRadius:'12px', boxShadow:'0 2px 12px #0001'}} />
        <button onClick={nextFoto} className="carousel-btn" aria-label="Berikutnya">&#8594;</button>
      </div>
      <div style={{marginTop:'8px', color:'#888', fontSize:'0.95em'}}>Foto {fotoIndex+1} dari {totalFoto}</div>
      <div style={{marginTop:'2em'}}>
        <Link to="/" className="back-btn">Kembali ke Wisata</Link>
      </div>
    </div>
  );
}

function KKNKelompokPage() {
  const navigate = useNavigate();
  return (
    <section className="kkn-kelompok-section" style={{minHeight:'80vh', display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <h2>Kelompok KKN 200 Periode 105</h2>
      <div className="kkn-kelompok-container" style={{alignItems:'center'}}>
        <img className="kkn-foto" src="/kelompok kkn.png" alt="Foto Kelompok KKN 200" />
      </div>
      <div className="pejabat-list kkn-anggota-list">
        {anggotaKKN.map((a, idx) => (
          <div className="pejabat-card kkn-anggota-card" key={idx}>
            <img className="kkn-anggota-foto" src={a.foto} alt={a.nama} />
            <h3>{a.nama}</h3>
            <div className="sosmed">
              <a href={a.ig} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="kkn-back-btn" onClick={() => navigate("/")}>⬅ Kembali ke Beranda</button>
    </section>
  );
}

function MainApp({ wisata, setWisata }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("beranda");
  const [berita, setBerita] = useState(() => {
    const saved = localStorage.getItem("beritaList");
    return saved ? JSON.parse(saved) : beritaList;
  });

  useEffect(() => {
    const fetchBerita = async () => {
      let { data, error } = await supabase.from('berita').select('*').order('tanggal', { ascending: false });
      if (!error) setBerita(data);
    };
    fetchBerita();
  }, []);

  // Fungsi untuk handle klik nav agar langsung aktif
  const handleNavClick = (section) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["beranda", "pemerintahan", "berita", "wisata"];
      const scrollMiddle = window.scrollY + window.innerHeight / 2;
      let currentSection = sectionIds[0];
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollMiddle >= sectionTop && scrollMiddle < sectionTop + sectionHeight) {
            currentSection = sectionIds[i];
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('wisata').select('*').limit(1);
      if (error) {
        console.error('Supabase NOT connected:', error.message);
      } else {
        console.log('Supabase connected! Contoh data:', data);
      }
    }
    testConnection();
  }, []);

  return (
    <>
      {/* Header & Navigation */}
      <header className="header">
        <div className="logo">
          {/* Ganti src dengan logo kelurahan jika ada */}
          <img src="/Bengkulu_Utara.png" alt="Logo Kelurahan Kemumu" />
          <span>Kelurahan Kemumu</span>
        </div>
        <nav>
          <ul>
            <li>
              <a
                href="#beranda"
                className={activeSection === "beranda" ? "active" : ""}
                onClick={e => { e.preventDefault(); handleNavClick('beranda'); }}
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#pemerintahan"
                className={activeSection === "pemerintahan" ? "active" : ""}
                onClick={e => { e.preventDefault(); handleNavClick('pemerintahan'); }}
              >
                Pemerintahan
              </a>
            </li>
            <li>
              <a
                href="#berita"
                className={activeSection === "berita" ? "active" : ""}
                onClick={e => { e.preventDefault(); handleNavClick('berita'); }}
              >
                Berita
              </a>
            </li>
            <li>
              <a
                href="#wisata"
                className={activeSection === "wisata" ? "active" : ""}
                onClick={e => { e.preventDefault(); handleNavClick('wisata'); }}
              >
                Wisata
              </a>
            </li>
            <li>
              <Link to="/kkn-kelompok" className={location.pathname === "/kkn-kelompok" ? "active" : ""}>
                Kelompok KKN
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/admin-berita" className="admin-link-btn">Admin</Link>
      </header>

      {/* Hero Section */}
      <section
        className="hero hero-bg-fade"
        id="beranda"
        style={{
          backgroundImage: `url(/hero.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <div className="hero-content">
          <h1>Selamat Datang di Pariwisata Kelurahan Kemumu</h1>
          <p>Temukan keindahan alam dan budaya di Kelurahan Kemumu</p>
        </div>
      </section>

      {/* Seluruh konten lain boleh dibungkus div */}
      <div>
        {/* Pemerintahan */}
        <section className="pemerintahan" id="pemerintahan">
          <div className="pemerintahan-container">
            <h2>Pemerintahan Kelurahan Kemumu</h2>
            <div className="pejabat-list">
              <div className="pejabat-card">
                <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="Camat" />
                <h3>HARTONO, S.Pt</h3>
                <p>Camat Arma Jaya</p>
                <div className="sosmed">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="pejabat-card">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Lurah" />
                <h3>UTAMI, S.IP</h3>
                <p>Lurah Kemumu</p>
                <div className="sosmed">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="pejabat-card">
                <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Sekretaris" />
                <h3>NANISISKA, A.AP</h3>
                <p>Sekretaris Kelurahan</p>
                <div className="sosmed">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="pejabat-card">
                <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Sekretaris" />
                <h3>SUKIDI, S.M</h3>
                <p>Sekretaris Kelurahan</p>
                <div className="sosmed">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>

            {/* Masukkan layanan-profil di sini */}
            <div className="layanan-profil-container">
              <div className="layanan-profil-text">
                <h1>Kelompok Sadar Pariwisata</h1>
                <p className="layanan-profil-sambutan">
                  Selamat Datang di Website Pariwisata Kelurahan Kemumu
                </p>
                <p>
                Website ini merupakan sarana media pelayanan informasi kepariwisataan bagi para pengelola dan masyarakat di lingkungan Kelurahan Kemumu, Kecamatan Arma Jaya, Kabupaten Bengkulu Utara.
                Tujuan utama dari website ini adalah untuk memberikan informasi terkini seputar potensi wisata alam, budaya, serta kegiatan masyarakat Kemumu melalui media elektronik, sehingga dapat dijangkau oleh wisatawan lokal maupun luar daerah secara lebih mudah dan cepat.
                </p>
                <p className="layanan-profil-nama">
                  <b>Kelompok Sadar Pariwisata</b>
                </p>
              </div>
              <div className="layanan-profil-img">
                <img src="/foto_kepala_dinas.jpg" alt="Pokdarwis" />
              </div>
            </div>
          </div>
        </section>

        {/* Berita */}
        <section className="berita" id="berita">
          <h2>Berita Terkini</h2>
          <div className="berita-grid">
            {berita.map((b) => (
              <div className="berita-card" key={b.id}>
                <div className="berita-info">
                  <div className="berita-tanggal">{new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  <div className="berita-judul">{b.judul}</div>
                  <div className="berita-ringkasan">{b.ringkasan}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* wisata */}
        <section className="wisata" id="wisata">
          <h2>Tempat Wisata Kelurahan Kemumu</h2>
          <p className="wisata-subtitle">Beberapa tempat objek wisata kelurahan kemumu</p>
          <div className="wisata-grid">
            {wisata.map((w, idx) => (
              <div className="wisata-card" key={w.id} style={w.status === 'tutup' ? {opacity:0.6, filter:'grayscale(0.7)'} : {}}>
                <img src={w.img} alt={w.nama} />
                <div className="wisata-info">
                  <div className="wisata-nama">{w.nama} {w.status === 'tutup' && <span style={{color:'#e74c3c', fontWeight:'bold', fontSize:'0.95em', marginLeft:6}}>(Tutup)</span>}</div>
                  <a
                    className="wisata-lokasi"
                    href={w.lokasi}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={w.status === 'tutup' ? {pointerEvents:'none', opacity:0.5, cursor:'not-allowed'} : {}}
                  >
                    <i className="fas fa-map-marker-alt" style={{ marginRight: "6px" }}></i>
                    Petunjuk Lokasi
                  </a>
                  <Link to={`/wisata/${w.id}`} className="wisata-deskripsi-btn" style={w.status === 'tutup' ? {pointerEvents:'none', opacity:0.5, cursor:'not-allowed'} : {}}>Deskripsi</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="footer-content">
            <div>
              <strong>Alamat:</strong><br />
              Kemumu, Kec. Arma Makmur (Arma Jaya), Kab. Bengkulu Utara, Bengkulu 38611, Indonesia.<br />
              Email: kemumu@contoh.go.id<br />
              Telp: +6285129418533
            </div>
            <div>
              <strong>Ikuti Kami:</strong><br />
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/kampungwisatakemumu?igsh=Y2k2cTF2N2dpdWE="><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Kelurahan Kemumu. All rights reserved.<br />
            KKN Kelompok 200 Periode 105
          </div>
        </footer>

      </div>
    </>
  );
}

function App() {
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi fetch data dari Supabase
  const fetchWisata = async () => {
    let { data, error } = await supabase.from('wisata').select('*');
    if (error) {
      setWisata(defaultWisataList);
    } else {
      setWisata(data.length ? data : defaultWisataList);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWisata();
  }, []);

  // Fungsi update wisata ke Supabase
  const updateWisata = async (newList) => {
    setLoading(true);
    await supabase.from('wisata').delete().neq('id', '');
    for (const w of newList) {
      await supabase.from('wisata').insert([w]);
    }
    // Setelah update, fetch ulang data dari Supabase
    await fetchWisata();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainApp wisata={wisata} setWisata={updateWisata} />} />
        <Route path="/wisata/:id" element={<WisataDeskripsiWrapper wisata={wisata} />} />
        <Route path="/admin-berita" element={<AdminBerita />} />
        <Route path="/kkn-kelompok" element={<KKNKelompokPage />} />
      </Routes>
    </Router>
  );
}

function WisataDeskripsiWrapper({ wisata }) {
  const { id } = useParams();
  const w = wisata.find((w) => w.id === id);
  return <WisataDeskripsi wisata={w} />;
}

function AdminBerita() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [berita, setBerita] = useState([]);
  const [loadingBerita, setLoadingBerita] = useState(true);
  const [form, setForm] = useState({ judul: "", tanggal: "", ringkasan: "" });
  const [editIndex, setEditIndex] = useState(null);
  const ADMIN_PASS = "kemumu123";
  const navigate = useNavigate();

  // Fetch berita dari Supabase saat mount
  useEffect(() => {
    const fetchBerita = async () => {
      let { data, error } = await supabase.from('berita').select('*').order('tanggal', { ascending: false });
      if (!error) setBerita(data || []);
      setLoadingBerita(false);
    };
    fetchBerita();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) setIsLoggedIn(true);
    else alert("Password salah!");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.judul || !form.tanggal || !form.ringkasan) return alert("Judul, tanggal, dan ringkasan wajib diisi!");
    setLoadingBerita(true);
    if (editIndex !== null) {
      // Update berita
      const beritaToUpdate = berita[editIndex];
      await supabase.from('berita').update({
        judul: form.judul,
        tanggal: form.tanggal,
        ringkasan: form.ringkasan
      }).eq('id', beritaToUpdate.id);
    } else {
      // Tambah berita baru
      await supabase.from('berita').insert([form]);
    }
    // Fetch ulang data
    const { data } = await supabase.from('berita').select('*').order('tanggal', { ascending: false });
    setBerita(data || []);
    setForm({ judul: "", tanggal: "", ringkasan: "" });
    setEditIndex(null);
    setLoadingBerita(false);
  };

  const handleEdit = (idx) => {
    setForm(berita[idx]);
    setEditIndex(idx);
  };

  const handleDelete = async (idx) => {
    if (window.confirm("Hapus berita ini?")) {
      setLoadingBerita(true);
      const beritaToDelete = berita[idx];
      await supabase.from('berita').delete().eq('id', beritaToDelete.id);
      // Fetch ulang data
      const { data } = await supabase.from('berita').select('*').order('tanggal', { ascending: false });
      setBerita(data || []);
      setLoadingBerita(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="password"
            placeholder="Password admin"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit">Login</button>
        </form>
        <button className="back-home-btn" onClick={() => navigate("/")}>Kembali ke Halaman Utama</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>Panel Admin</h2>
        <button onClick={handleLogout} className="admin-logout">Logout</button>
      </div>
      {/* Form berita dan daftar berita */}
      <form onSubmit={handleSubmit} className="admin-berita-form">
        <input name="judul" placeholder="Judul berita" value={form.judul} onChange={handleChange} />
        <input name="tanggal" type="date" value={form.tanggal} onChange={handleChange} />
        <textarea name="ringkasan" placeholder="Ringkasan berita" value={form.ringkasan} onChange={handleChange} />
        <button type="submit">{editIndex !== null ? "Update" : "Tambah"} Berita</button>
        {editIndex !== null && <button type="button" onClick={() => { setForm({ judul: "", tanggal: "", ringkasan: "" }); setEditIndex(null); }}>Batal</button>}
      </form>
      <div className="admin-berita-list">
        {loadingBerita && <div style={{textAlign:'center',color:'#888'}}>Loading...</div>}
        {berita.length === 0 && !loadingBerita && <div style={{textAlign:'center',color:'#888'}}>Belum ada berita.</div>}
        {berita.map((b, idx) => (
          <div className="admin-berita-item" key={b.id}>
            <div>
              <div className="admin-berita-judul">{b.judul}</div>
              <div className="admin-berita-tanggal">{new Date(b.tanggal).toLocaleDateString('id-ID')}</div>
              <div className="admin-berita-ringkasan">{b.ringkasan}</div>
              <button onClick={() => handleEdit(idx)}>Edit</button>
              <button onClick={() => handleDelete(idx)} className="admin-hapus">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
