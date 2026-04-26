/* ═══════════════════════════════════════════
   Body Fitness Academia Feminina — main.js
   ═══════════════════════════════════════════ */

/* ─── NAVBAR: sombra ao rolar ─── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── FADE-IN ao entrar na viewport ─── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

/* ─── SLIDER DE AVALIAÇÕES ─── */
let currentSlide = 0;
const track = document.getElementById('reviewsTrack');
const cards = track ? track.querySelectorAll('.review-card') : [];
const dotsContainer = document.getElementById('sliderDots');
let cardsPerView = getCardsPerView();

function getCardsPerView() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

function buildDots() {
  if (!dotsContainer || !cards.length) return;
  dotsContainer.innerHTML = '';
  const total = Math.ceil(cards.length / cardsPerView);
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  }
}

function goTo(index) {
  if (!cards.length) return;
  const total = Math.ceil(cards.length / cardsPerView);
  currentSlide = Math.max(0, Math.min(index, total - 1));
  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${currentSlide * cardsPerView * cardWidth}px)`;
  dotsContainer.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === currentSlide)
  );
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentSlide + 1));

buildDots();

window.addEventListener('resize', () => {
  cardsPerView = getCardsPerView();
  currentSlide = 0;
  if (track) track.style.transform = 'translateX(0)';
  buildDots();
});

// Auto-avanço a cada 5s
setInterval(() => {
  if (!cards.length) return;
  const total = Math.ceil(cards.length / cardsPerView);
  goTo(currentSlide + 1 >= total ? 0 : currentSlide + 1);
}, 5000);

/* ─── FORMULÁRIO → WHATSAPP ─── */
function enviarFormulario() {
  const nome     = document.getElementById('f-nome').value.trim();
  const tel      = document.getElementById('f-tel').value.trim();
  const objetivo = document.getElementById('f-objetivo').value;
  const msg      = document.getElementById('f-msg').value.trim();

  if (!nome || !tel) {
    alert('Por favor, preencha seu nome e WhatsApp 😊');
    return;
  }

  // BUG CORRIGIDO: espaço/tab extra removido antes de %0AQuero
  const texto =
    `Olá, Body Fitness! 😊%0A` +
    `Meu nome é *${encodeURIComponent(nome)}*%0A` +
    `Telefone: ${encodeURIComponent(tel)}%0A` +
    `Objetivo: ${encodeURIComponent(objetivo || 'Não informado')}%0A` +
    (msg ? `Mensagem: ${encodeURIComponent(msg)}%0A` : '') +
    `%0AQuero saber mais sobre a Body Fitness!`;

  window.open(`https://wa.me/5544998716167?text=${texto}`, '_blank');
}

window.enviarFormulario = enviarFormulario;

/* ─── COMPARTILHAR ─── */
function shareAcademia() {
  if (navigator.share) {
    navigator.share({
      title: 'Body Fitness – Academia Feminina Araruna',
      text: 'Conheça a Body Fitness, academia exclusiva para mulheres em Araruna, PR! Nota 4,9 ⭐ no Google.',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copiado para a área de transferência! 📋');
    });
  }
}

window.shareAcademia = shareAcademia;
