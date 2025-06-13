let currentIndex = 0;
let images = [];

function openLightbox(img) {
  images = Array.from(document.querySelectorAll('.gallery img')).filter(i => i.parentElement.style.display !== 'none');
  currentIndex = images.indexOf(img);
  updateLightbox();
  document.getElementById('lightbox').style.display = 'flex';
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.classList.remove('lightbox-open');
}

function updateLightbox() {
  const img = images[currentIndex];
  document.getElementById('lightbox-image').src = img.src;
  document.getElementById('lightbox-caption').textContent = img.parentElement.dataset.caption;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function toggleFullscreen() {
  const lightbox = document.getElementById('lightbox');
  if (!document.fullscreenElement) {
    lightbox.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function filterImages(category) {
  const boxes = document.querySelectorAll('.img-box');
  let delay = 0;

  boxes.forEach((box, index) => {
    if (category === 'all' || box.classList.contains(category)) {
      setTimeout(() => {
        box.style.display = 'block';
        box.style.animationDelay = `${delay}s`;
        box.classList.add('animated');
      }, delay * 1000);
      delay += 0.1;
    } else {
      box.style.display = 'none';
    }
  });

  document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function searchImages() {
  const query = document.getElementById('search').value.toLowerCase();
  const boxes = document.querySelectorAll('.img-box');
  boxes.forEach(box => {
    const caption = box.dataset.caption.toLowerCase();
    box.style.display = caption.includes(query) ? 'block' : 'none';
  });
}

document.addEventListener('keydown', function (e) {
  if (document.getElementById('lightbox').style.display === 'flex') {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  }
});

document.getElementById('themeToggle').onclick = function () {
  document.body.classList.toggle('dark');
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

window.onload = () => {
  document.getElementById('loader').style.display = 'none';
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  filterImages('all'); // Show all by default
};
