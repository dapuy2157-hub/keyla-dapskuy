/**
 * MEMORY & THANK YOU - KEYLA & DAPSKUY
 * Vanilla JavaScript ES6+ implementation
 */

// ==========================================
// 1. STORY CHAPTERS DATA (Mudah diedit)
// ==========================================
const storyData = [
    {
        date: "Chapter 01",
        title: "Awal Kita",
        description: "Mulai dari obrolan-obrolan kecil yang ternyata berlanjut terus sampai sekarang. Waktu itu semuanya terasa begitu natural.",
        image: "assets/photos/photo-02.jpg"
    },
    {
        date: "Chapter 02",
        title: "Little Things",
        description: "Hal-hal kecil yang awalnya biasa saja, lama-lama jadi kebiasaan yang bikin hari-hari terasa jauh lebih hidup.",
        image: "assets/photos/photo-03.jpg"
    },
    {
        date: "Chapter 03",
        title: "Growing Together",
        description: "Belajar memahami satu sama lain, ngelewatin berbagai fase naik turun, dan tetap milih buat jalan bareng.",
        image: "assets/photos/photo-04.jpg"
    }
];

// ==========================================
// 2. GALLERY DATA (Tepat 5 Foto Sesuai Permintaan)
// ==========================================
const galleryData = [
    {
        image: "assets/photos/photo-01.jpg",
        caption: "Foto biasa, tapi entah kenapa selalu bikin senyum."
    },
    {
        image: "assets/photos/photo-02.jpg",
        caption: "One of those days I want to remember."
    },
    {
        image: "assets/photos/photo-03.jpg",
        caption: "Hal kecil yang ternyata jadi kenangan besar."
    },
    {
        image: "assets/photos/photo-04.jpg",
        caption: "Bukti kalau kita ternyata udah sejauh ini."
    },
    {
        image: "assets/photos/photo-05.jpg",
        caption: "Salah satu momen favorit yang terekam kamera."
    }
];

// ==========================================
// 3. RENDER FUNCTIONS
// ==========================================
function renderStory() {
    const container = document.getElementById('story-container');
    if (!container) return;

    let html = '';
    storyData.forEach((item) => {
        html += `
            <div class="story-item reveal">
                <div class="story-node"></div>
                <div class="story-content">
                    <span class="story-date">${item.date}</span>
                    <h3 class="story-title">${item.title}</h3>
                    <p class="story-desc">${item.description}</p>
                    <div class="story-img-wrap">
                        <img src="${item.image}" alt="${item.title}" class="story-img" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100%\' viewBox=\'0 0 16 9\'><rect width=\'16\' height=\'9\' fill=\'%23121216\'/></svg>'">
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    let html = '';
    galleryData.forEach((item, index) => {
        html += `
            <div class="gallery-item reveal" data-index="${index}" tabindex="0" role="button" aria-label="Buka foto ukuran besar">
                <div class="gallery-img-wrap">
                    <img src="${item.image}" alt="Memori ${index + 1}" class="gallery-img" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100%\' viewBox=\'0 0 4 3\'><rect width=\'4\' height=\'3\' fill=\'%23121216\'/></svg>'">
                </div>
                <p class="gallery-caption">${item.caption}</p>
            </div>
        `;
    });
    container.innerHTML = html;
}

// ==========================================
// 4. PARTICLES GENERATOR
// ==========================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const count = 15;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.animationDuration = `${Math.random() * 10 + 10}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(p);
    }
}

// ==========================================
// 5. AUDIO SYSTEM CONTROLLER (Auto Play on Click)
// ==========================================
function initAudioSystem() {
    const audio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('play-pause-btn');
    const musicIcon = document.getElementById('music-icon');
    const visualizer = document.querySelector('.visualizer');
    const musicStatus = document.getElementById('music-status');

    if (!audio) return;

    let isPlaying = false;

    const playAudio = async () => {
        try {
            await audio.play();
            isPlaying = true;
            musicIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
            musicStatus.textContent = "Playing";
            visualizer.classList.remove('paused');
        } catch (err) {
            console.log("Audio play blocked or file missing:", err);
            musicStatus.textContent = "Unavailable";
        }
    };

    const pauseAudio = () => {
        audio.pause();
        isPlaying = false;
        musicIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        musicStatus.textContent = "Paused";
        visualizer.classList.add('paused');
    };

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    return { play: playAudio };
}

// ==========================================
// 6. LIGHTBOX SYSTEM CONTROLLER
// ==========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!lightbox) return;

    let currentIndex = 0;

    const openLightbox = (index) => {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const updateLightboxContent = () => {
        const item = galleryData[currentIndex];
        lightboxImg.src = item.image;
        lightboxCaption.textContent = item.caption;
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxContent();
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateLightboxContent();
    };

    document.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const index = parseInt(galleryItem.getAttribute('data-index'), 10);
            openLightbox(index);
        }
    });

    document.addEventListener('keydown', (e) => {
        const galleryItem = document.activeElement.closest('.gallery-item');
        if (galleryItem && e.key === 'Enter') {
            const index = parseInt(galleryItem.getAttribute('data-index'), 10);
            openLightbox(index);
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

// ==========================================
// 7. SCROLL REVEAL OBSERVER
// ==========================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// 8. APP INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderStory();
    renderGallery();
    initLightbox();
    initParticles();

    const audioController = initAudioSystem();
    const entryScreen = document.getElementById('entry-screen');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-btn');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            entryScreen.classList.add('fade-out');
            mainContent.classList.remove('hidden');

            // Lagu otomatis menyala saat tombol ini ditekan
            if (audioController) {
                audioController.play();
            }

            setTimeout(() => {
                initScrollReveal();
            }, 300);
        });
    }
});
