/* Services page behaviour: card details, hover spotlight, contact links */
(() => {
  'use strict';

  /* ---- CONTACT SETTINGS: edit these two lines ----
     email:     where service enquiries are sent (opens the visitor's mail app)
     whatsapp:  digits only with country code, e.g. '923001234567'.
                Leave '' to use email only. When filled in, every Discuss button
                opens WhatsApp with a message that names the selected service. */
  const CONTACT = {
    email: 'khansawali.dev@gmail.com',
    whatsapp: '923089661739'
  };

  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* contact buttons */
  const message = service =>
    service === 'General'
      ? "Hi Khansa, I'd like to discuss a project with you.\n\nWhat I'm trying to achieve:\n"
      : `Hi Khansa, I'd like to discuss: ${service}.\n\nWhat I'm trying to achieve:\n`;

  $$('[data-service]').forEach(a => {
    const service = a.dataset.service;
    const text = message(service);
    if (CONTACT.whatsapp) {
      a.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
      a.target = '_blank'; a.rel = 'noopener';
    } else if (CONTACT.email) {
      const subject = service === 'General' ? 'Project enquiry' : `Service enquiry: ${service}`;
      a.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
  });
  $$('[data-email]').forEach(a => { if (CONTACT.email) { a.href = 'mailto:' + CONTACT.email; a.textContent = CONTACT.email; } });

  /* expandable details */
  $$('.svc__toggle').forEach(btn => {
    const card = btn.closest('.svc');
    const label = btn.querySelector('span');
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Show less' : 'More details';
    });
  });

  /* hover spotlight */
  if (fine) {
    $$('.svc').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }
})();
