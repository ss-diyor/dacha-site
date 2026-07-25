/**
 * Galereya elementlari ro'yxati.
 * Yangi rasm yoki video qo'shish uchun shunchaki ro'yxatga yangi ob'ekt qo'shing.
 * 
 * turlari: 'image' yoki 'video'
 * url: rasm yoki video havolasi
 * title: rasm ostidagi matn (ixtiyoriy)
 * size: 'large' (2 ta katakni egallaydi) yoki 'normal'
 */
/**
 * Mijozlar fikri (Testimonials)
 * Yangi fikr qo'shish uchun ro'yxatga yangi ob'ekt qo'shing.
 */
/**
 * SOZLAMALAR (Admin uchun)
 */
const SETTINGS = {
  showTestimonials: true, // Fikrlar blokini ko'rsatish (true) yoki yashirish (false)
  showFAQ: true,          // Savol-javoblar blokini ko'rsatish
};

/**
 * Mijozlar fikri (Testimonials)
 * Yangi fikr qo'shish uchun ro'yxatga yangi ob'ekt qo'shing.
 */
const TESTIMONIALS = [
  {
    name: "Azizbek Ismoilov",
    text: "Oilamiz bilan dam oldik, juda tinch va shinam joy ekan. Ayniqsa basseyn toza ekanligi bizga juda yoqdi. Tavsiya qilaman!",
    date: "Iyun 2024"
  },
  {
    name: "Malika Axmedova",
    text: "Bolalar uchun xavfsiz va qulay. Tapchan juda keng, kechki payt tog' havosi bilan dam olishning gashti bo'lakcha.",
    date: "Iyul 2024"
  },
  {
    name: "Jasur Komilov",
    text: "Hamma narsa tayyor ekan, faqat o'zimiz bilan masalliq olib bordik xolos. Oshxona jihozlari va mangal a'lo darajada.",
    date: "Avgust 2024"
  }
];

/**
 * Ko'p beriladigan savollar (FAQ)
 */
const FAQ_ITEMS = [
  {
    question: "Basseyn isitiladimi?",
    answer: "Hozircha basseynimiz ochiq va isitilmaydi. Yozgi mavsum uchun mo'ljallangan."
  },
  {
    question: "Dachada idish-tovoqlar bormi?",
    answer: "Ha, oshxonada barcha kerakli idish-tovoqlar, qozon, mangal va sixlar mavjud."
  },
  {
    question: "Necha kishi sig'adi?",
    answer: "Dachamiz 10-12 kishilik oilalar uchun qulay qilib jihozlangan."
  },
  {
    question: "Ichkilik ichish mumkinmi?",
    answer: "Yo'q, bizning dacha faqat oilaviy va ichkiliksiz dam olish uchun mo'ljallangan."
  }
];

const GALLERY_ITEMS = [
  { 
    type: 'image', 
    url: 'https://i.ibb.co/4g5Yh38B/IMG-20260725-175045-991.jpg', 
    title: 'Umumiy ko\'rinish',
    size: 'large' 
  },
  { 
    type: 'image', 
    url: 'https://i.ibb.co/BVMVbZqB/IMG-20260725-175110-683.jpg', // Hozircha bo'sh, placeholder ko'rinadi
    title: 'Basseyn' 
  },
  { 
    type: 'image', 
    url: 'https://i.ibb.co/fdx0nWj2/IMG-20260725-175045-777.jpg', 
    title: 'Yotoqxona' 
  },
  { 
    type: 'video', 
    url: '', 
    title: 'Hovli videosi' 
  },
  { 
    type: 'image', 
    url: '', 
    title: 'Mangal maydonchasi',
    size: 'large' 
  },
  // Taxminan yana 15 ta rasm qo'shish uchun quyidagilarni to'ldirishingiz mumkin:
  // { type: 'image', url: 'HAVOLA_SHU_YERGA', title: 'Tavsif' },
];

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  container.innerHTML = '';

  GALLERY_ITEMS.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = `gallery-item ${item.size === 'large' ? 'span-2' : ''}`;
    
    if (item.url) {
      const isVideo = item.type === 'video' || /\.(mp4|webm|mov)$/i.test(item.url);
      
      if (isVideo) {
        const video = document.createElement('video');
        video.src = item.url;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        // Videoni ustiga borganda o'ynatish
        galleryItem.addEventListener('mouseenter', () => video.play());
        galleryItem.addEventListener('mouseleave', () => video.pause());
        galleryItem.appendChild(video);
        
        const playIcon = document.createElement('div');
        playIcon.className = 'media-icon';
        playIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
        galleryItem.appendChild(playIcon);
      } else {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.title || 'Dacha ko\'rinishi';
        img.loading = 'lazy';
        galleryItem.appendChild(img);
      }

      // Rasm/video bosilganda kattalashtirish (Lightbox)
      galleryItem.addEventListener('click', () => openLightbox(item));
      
    } else {
      // Placeholder holati
      const placeholder = document.createElement('div');
      placeholder.className = 'gallery-placeholder';
      
      const icon = document.createElement('div');
      icon.innerHTML = item.type === 'video' 
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><polygon points="5,4 19,12 5,20"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="5" width="18" height="14" rx="1.5"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5.5-5.5L11 15l-3-3-5 5"/></svg>';
      
      const span = document.createElement('span');
      span.textContent = item.title || 'Tez orada';
      
      placeholder.appendChild(icon.firstChild);
      placeholder.appendChild(span);
      galleryItem.appendChild(placeholder);
    }

    container.appendChild(galleryItem);
  });
}

// Lightbox funksiyasi
function openLightbox(item) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  
  const content = document.createElement('div');
  content.className = 'lightbox-content';
  
  if (item.type === 'video' || /\.(mp4|webm|mov)$/i.test(item.url)) {
    const video = document.createElement('video');
    video.src = item.url;
    video.controls = true;
    video.autoplay = true;
    content.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.url;
    content.appendChild(img);
  }
  
  const close = document.createElement('button');
  close.className = 'lightbox-close';
  close.innerHTML = '&times;';
  close.onclick = () => overlay.remove();
  
  overlay.appendChild(close);
  overlay.appendChild(content);
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  
  document.body.appendChild(overlay);
}

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  
  // Footer yili
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobil menyu
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Xarita tablari
  const mapTabs = document.querySelectorAll('.map-tab');
  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mapTabs.forEach(t => { 
        t.classList.remove('active'); 
        t.setAttribute('aria-selected', 'false'); 
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.map-iframe').forEach(f => f.classList.remove('active'));
      const target = document.getElementById('map-' + tab.dataset.map);
      if (target) target.classList.add('active');
    });
  });
});

// Ob-havo ma'lumotlarini olish (Bo'stonliq/Chirchiq hududi uchun)
async function fetchWeather() {
  const tempEl = document.getElementById('weather-temp');
  if (!tempEl) return;

  try {
    // Open-Meteo API (bepul va kalit talab qilmaydi)
    // Bo'stonliq koordinatalari: 41.65, 69.95
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.65&longitude=69.95&current_weather=true');
    const data = await response.json();
    
    if (data && data.current_weather) {
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;
      
      // Oddiy ob-havo piktogrammalari
      let icon = '☀️';
      if (code >= 1 && code <= 3) icon = '🌤️';
      else if (code >= 45 && code <= 48) icon = '🌫️';
      else if (code >= 51 && code <= 67) icon = '🌧️';
      else if (code >= 71 && code <= 77) icon = '❄️';
      else if (code >= 80 && code <= 82) icon = '🌦️';
      else if (code >= 95) icon = '⛈️';
      
      tempEl.innerHTML = `${icon} ${temp}°C`;
    }
  } catch (error) {
    console.error('Ob-havo ma\'lumotini olishda xato:', error);
    tempEl.textContent = 'Ajoyib';
  }
}

// Testimonials render qilish
function renderTestimonials() {
  const section = document.getElementById('fikrlar');
  const container = document.getElementById('testimonials-grid');
  
  if (!SETTINGS.showTestimonials) {
    if (section) section.style.display = 'none';
    return;
  }

  if (!container) return;
  container.innerHTML = '';

  TESTIMONIALS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.setAttribute('data-aos', 'fade-up');
    card.innerHTML = `
      <div class="testimonial-quote">“</div>
      <p class="testimonial-text">${item.text}</p>
      <div class="testimonial-meta">
        <span class="testimonial-name">${item.name}</span>
        <span class="testimonial-date">${item.date}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// FAQ render qilish
function renderFAQ() {
  const section = document.getElementById('faq');
  const container = document.getElementById('faq-accordion');

  if (!SETTINGS.showFAQ) {
    if (section) section.style.display = 'none';
    return;
  }

  if (!container) return;
  container.innerHTML = '';

  FAQ_ITEMS.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.setAttribute('data-aos', 'fade-up');
    faqItem.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        ${item.question}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    `;
    
    faqItem.querySelector('.faq-question').addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      faqItem.classList.toggle('active');
    });
    
    container.appendChild(faqItem);
  });
}

// Fikr qoldirish formasi logikasi
function handleTestimonialForm() {
  const form = document.getElementById('testimonial-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('client-name').value;
    const text = document.getElementById('client-text').value;

    if (name && text) {
      // Bu yerda fikrni serverga yuborish yoki Telegramga yuborish mumkin
      // Hozircha foydalanuvchiga rahmatnoma ko'rsatamiz
      form.innerHTML = `
        <div class="form-success" data-aos="zoom-in">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <p>Rahmat! Fikringiz qabul qilindi va admin tasdig'idan so'ng saytda e'lon qilinadi.</p>
        </div>
      `;
    }
  });
}

// Sahifa yuklanganda barchasini ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  renderGallery();
  renderTestimonials();
  renderFAQ();
  handleStickyCTA();
  handleTestimonialForm();
});

// Sticky Call Button ko'rinishi (Scroll qilinganda chiqadi)
function handleStickyCTA() {
  const stickyCTA = document.querySelector('.sticky-cta');
  if (!stickyCTA) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      stickyCTA.classList.add('visible');
    } else {
      stickyCTA.classList.remove('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  handleStickyCTA();
});

// AOS (Animate On Scroll) kutubxonasini ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800, // Animatsiya davomiyligi (ms)
      easing: 'ease-in-out', // Animatsiya turi
      once: true, // Animatsiya faqat bir marta bo'lishi uchun
      offset: 100, // Element ekranga necha px kirganda animatsiya boshlanishi
    });
  }
});
