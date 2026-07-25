// Galereya rasmlari — imgbb.com (yoki boshqa) havolalarini shu yerga joylang.
// Bo'sh qoldirilgan qatorlar hozirgi holicha (bo'sh joy) ko'rinaveradi.
const GALLERY_IMAGES = {
  "umumiy": "",        // Umumiy ko'rinish
  "basseyn": "",       // Basseyn
  "yotoqxona": "",     // Yotoq xonalari
  "video-hovli": "",   // Video — hovli (video havolasi bo'lsa .mp4 bilan tugasin)
  "mangal": ""         // Mangal maydonchasi
};

document.querySelectorAll('.gallery-item').forEach(item => {
  const key = item.dataset.gallery;
  const url = GALLERY_IMAGES[key];
  if (!url) return;

  const isVideo = /\.(mp4|webm|mov)$/i.test(url);
  const media = document.createElement(isVideo ? 'video' : 'img');
  if (isVideo) {
    media.src = url;
    media.controls = true;
    media.playsInline = true;
  } else {
    media.src = url;
    media.alt = item.querySelector('.gallery-placeholder span')?.textContent || '';
    media.loading = 'lazy';
  }
  item.innerHTML = '';
  item.appendChild(media);
});

document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
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

const mapTabs = document.querySelectorAll('.map-tab');
mapTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mapTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.map-iframe').forEach(f => f.classList.remove('active'));
    const target = document.getElementById('map-' + tab.dataset.map);
    if (target) target.classList.add('active');
  });
});
