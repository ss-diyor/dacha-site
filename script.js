/**
 * Galereya elementlari ro'yxati.
 * Yangi rasm yoki video qo'shish uchun shunchaki ro'yxatga yangi ob'ekt qo'shing.
 * 
 * turlari: 'image' yoki 'video'
 * url: rasm yoki video havolasi
 * title: rasm ostidagi matn (ixtiyoriy)
 * size: 'large' (2 ta katakni egallaydi) yoki 'normal'
 */
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

// Sahifa yuklanganda ob-havoni yangilash
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
});
