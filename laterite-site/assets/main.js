// Red Earth Co. — Shared JS

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', () => item.classList.toggle('open'));
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Calculator
  const calcForm = document.getElementById('calc-form');
  if (calcForm) {
    const sizeRates = {
      '7x7x13':  { pieces: 11, price: 35, label: '7" × 7" × 13"' },
      '8x8x14':  { pieces:  9, price: 51, label: '8" × 8" × 14"' },
      '15x6x4':  { pieces: 24, price: 66, label: '15" × 6" × 4"'  }
    };
    const out = document.getElementById('calc-out');
    const recalc = () => {
      const L = parseFloat(document.getElementById('length').value) || 0;
      const H = parseFloat(document.getElementById('height').value) || 0;
      const k = sizeRates[document.getElementById('size').value];
      const sqft = L * H;
      const stones = Math.ceil(sqft * k.pieces * 1.05);
      const lorries = Math.ceil(stones / 800);
      const cost = stones * k.price;
      out.innerHTML = `
        <div class="calc-row"><span class="lbl">Wall area</span><span class="val">${sqft} sq ft</span></div>
        <div class="calc-row"><span class="lbl">Stones needed (incl. 5% wastage)</span><span class="val">${stones} pieces</span></div>
        <div class="calc-row"><span class="lbl">Lorry loads (~800 stones each)</span><span class="val">${lorries} lorry</span></div>
        <div class="calc-row"><span class="lbl">Estimated cost</span><span class="val big">₹${cost.toLocaleString('en-IN')}</span></div>
      `;
    };
    calcForm.addEventListener('input', recalc);
    recalc();
  }

  // Contact form (demo — no backend)
  const cform = document.getElementById('contact-form');
  if (cform) {
    cform.addEventListener('submit', e => {
      e.preventDefault();
      const msg = encodeURIComponent(`Hi Red Earth Co., I'm ${cform.name.value} from ${cform.city.value}. ${cform.message.value}`);
      window.open(`https://wa.me/919961861664?text=${msg}`, '_blank');
    });
  }
});
