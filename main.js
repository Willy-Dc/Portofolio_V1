/* ====================================
   SMART LOADER COUNTER (0% - 100%)
==================================== */
window.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const percentText = document.getElementById("load-percentage");
    const progressFill = document.querySelector(".progress-bar-fill");
    
    let currentPercent = 0;
    
    // Kecepatan loading (bisa diatur, semakin kecil angka 25 makin cepat selesai)
    const intervalTime = 10; 

    const countUp = setInterval(() => {
        currentPercent++;
        
        // Update Teks Angka & Lebar Progress Bar
        if (percentText) percentText.innerText = currentPercent + "%";
        if (progressFill) progressFill.style.width = currentPercent + "%";
        
        // Ketika mencapai 100%
        if (currentPercent >= 100) {
            clearInterval(countUp);
            
            // Tambahkan sedikit jeda estetik sebelum loader menghilang sepenuhnya
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = "0";
                    setTimeout(() => {
                        loader.style.display = "none";
                    }, 500); // Durasi transisi fade-out
                }
            }, 400); 
        }
    }, intervalTime);
});

/* MOBILE MENU & NAV LINKS */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navLinksA = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Mengubah icon menu burger menjadi 'X' saat aktif
    const icon = menuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});

/* CLOSE MENU ON CLICK */
navLinksA.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuBtn.querySelector("i");
        icon.classList.replace("fa-xmark", "fa-bars");
    });
});

/* NAVBAR SCROLL EFFECT & ACTIVE NAVIGATION INDICATOR */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    // 1. Efek Blur/Background Navbar saat Scroll
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scroll");
    } else {
        navbar.classList.remove("navbar-scroll");
    }

    // 2. Navigasi Aktif Otomatis sesuai Section di Layar
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinksA.forEach(link => {
        link.classList.remove("nav-active"); // Hapus status aktif lama
        const href = link.getAttribute("href");
        const portfolioSections = ["certificate", "projects", "lomba"];

        if (href === `#${currentSection}`) {
            link.classList.add("nav-active");
        } else if (href === "#portfolio" && portfolioSections.includes(currentSection)) {
            link.classList.add("nav-active");
        }
    });

    const portfolioTabs = document.querySelectorAll(".portfolio-tab");
    portfolioTabs.forEach(tab => {
        tab.classList.remove("active");
        if (tab.getAttribute("href") === `#${currentSection}`) {
            tab.classList.add("active");
        }
    });

    // Scroll reveal dihandle oleh scroll-anim.js
});

/* ============================================
   CERTIFICATE MODAL FIX
   
   CARA PAKAI:
   Ganti seluruh blok "MODAL SYSTEM FOR CERTIFICATE CARD"
   di main.js (dari baris "/* 5. MODAL SYSTEM..." sampai akhir
   closing brace "}" terakhir) dengan kode ini.
   ============================================ */

/* ---- Certificate Modal ---- */
const certImages  = document.querySelectorAll(".certificate-card img");
const certModal   = document.getElementById("certificateModal");
const certModalImg = document.getElementById("modalImage");
const certClose   = document.querySelector(".close-modal");
const certPrev    = document.querySelector(".prev-btn");
const certNext    = document.querySelector(".next-btn");
let certIndex = 0;

function openCertModal(index) {
    certIndex = index;
    certModalImg.src = certImages[index].src;
    certModalImg.alt = certImages[index].alt;
    certModal.classList.add("active");
    document.body.style.overflow = "hidden"; // kunci scroll background
}

function closeCertModal() {
    certModal.classList.remove("active");
    document.body.style.overflow = "";
}

function showCert(index) {
    // wrap around
    certIndex = (index + certImages.length) % certImages.length;
    certModalImg.src = certImages[certIndex].src;
    certModalImg.alt = certImages[certIndex].alt;
}

if (certImages.length > 0 && certModal) {

    // Klik kartu ATAU gambar → buka modal
    certImages.forEach((img, i) => {
        // Klik gambar langsung
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            openCertModal(i);
        });
        // Klik seluruh kartu (biar area mana pun bisa klik)
        const card = img.closest(".certificate-card");
        if (card) {
            card.addEventListener("click", () => openCertModal(i));
        }
    });

    // Tutup modal
    if (certClose) certClose.addEventListener("click", closeCertModal);

    // Klik di luar gambar → tutup
    certModal.addEventListener("click", (e) => {
        if (e.target === certModal) closeCertModal();
    });

    // Navigasi prev / next
    if (certNext) certNext.addEventListener("click", (e) => {
        e.stopPropagation();
        showCert(certIndex + 1);
    });
    if (certPrev) certPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        showCert(certIndex - 1);
    });

    // Keyboard: ESC tutup, panah kiri/kanan navigasi
    document.addEventListener("keydown", (e) => {
        if (!certModal.classList.contains("active")) return;
        if (e.key === "Escape")      closeCertModal();
        if (e.key === "ArrowRight")  showCert(certIndex + 1);
        if (e.key === "ArrowLeft")   showCert(certIndex - 1);
    });
}

/* ============================================
   CONTACT FORM JS — Tambahkan ke main.js
   (tempel di bagian paling bawah file)
   ============================================ */

/* ---- Topic Pills ---- */
const pills = document.querySelectorAll('.pill');
const subjectInput = document.getElementById('contact-subject');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        if (subjectInput) subjectInput.value = pill.dataset.value;
    });
});

/* ---- Char Counter ---- */
const msgArea = document.getElementById('contact-message');
const charCount = document.querySelector('.char-count');
const MAX_CHARS = 500;

if (msgArea && charCount) {
    msgArea.addEventListener('input', () => {
        const len = msgArea.value.length;
        charCount.textContent = `${len} / ${MAX_CHARS}`;
        if (len > MAX_CHARS * 0.85) {
            charCount.classList.add('warn');
        } else {
            charCount.classList.remove('warn');
        }
        if (len > MAX_CHARS) {
            msgArea.value = msgArea.value.substring(0, MAX_CHARS);
            charCount.textContent = `${MAX_CHARS} / ${MAX_CHARS}`;
        }
    });
}

/* ---- Star Rating ---- */
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    // Hover: highlight up to hovered star
    star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.val);
        stars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.val) <= val);
        });
    });

    // Mouse leave: restore selected
    star.addEventListener('mouseleave', () => {
        stars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.val) <= selectedRating);
        });
    });

    // Click: lock rating
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.val);
        stars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.val) <= selectedRating);
        });
    });
});

/* ---- Send Button ---- */
const sendBtn = document.getElementById('send-btn');
const formSuccess = document.getElementById('form-success');

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const name    = document.getElementById('contact-name')?.value.trim();
        const email   = document.getElementById('contact-email')?.value.trim();
        const subject = document.getElementById('contact-subject')?.value;
        const message = document.getElementById('contact-message')?.value.trim();

        // Validasi minimal
        if (!name) {
            shakeInput('contact-name');
            return;
        }
        if (!message) {
            shakeInput('contact-message');
            return;
        }

        // Kirim via mailto (fallback tanpa backend)
        const body = encodeURIComponent(
            `Nama: ${name}\nTopik: ${subject}\nRating: ${selectedRating > 0 ? selectedRating + '/5 ⭐' : 'Tidak diisi'}\n\nPesan:\n${message}`
        );
        const emailTo = 'williiskandarsitumeang@gmail.com';
        const mailSubject = encodeURIComponent(`[Portfolio] ${subject} — dari ${name}`);
        window.location.href = `mailto:${emailTo}?subject=${mailSubject}&body=${body}`;

        // Tampilkan success
        if (formSuccess) {
            formSuccess.classList.remove('hidden');
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form
        setTimeout(() => {
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-email').value = '';
            document.getElementById('contact-message').value = '';
            if (charCount) charCount.textContent = '0 / 500';
            selectedRating = 0;
            stars.forEach(s => s.classList.remove('active'));
            pills.forEach(p => p.classList.remove('active'));
            if (pills[0]) pills[0].classList.add('active');
            if (subjectInput) subjectInput.value = 'Feedback';
        }, 1000);
    });
}

/* ---- Shake animation helper ---- */
function shakeInput(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.transition = 'transform 0.1s, border-color 0.2s';
    el.style.borderColor = '#f87171';
    let count = 0;
    const interval = setInterval(() => {
        el.style.transform = count % 2 === 0 ? 'translateX(-6px)' : 'translateX(6px)';
        count++;
        if (count > 5) {
            clearInterval(interval);
            el.style.transform = 'translateX(0)';
            setTimeout(() => { el.style.borderColor = ''; }, 1000);
        }
    }, 60);
    el.focus();
}

/* ============================================
   ABOUT SKILL BAR ANIMATION
   Tempel di paling bawah main.js
   ============================================ */

function animateSkillBars() {
    const fills = document.querySelectorAll('.sic-fill');
    fills.forEach(fill => {
        const targetW = fill.style.getPropertyValue('--w');
        fill.style.width = targetW;
    });
}

// Trigger saat section about masuk viewport
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 300);
                obs.unobserve(aboutSection);
            }
        });
    }, { threshold: 0.2 });
    obs.observe(aboutSection);
}

