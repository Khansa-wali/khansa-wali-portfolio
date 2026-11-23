/* Contact page behaviour. Channels and form read from CONTACT below. */
(() => {
  'use strict';

  /* ---- CONTACT SETTINGS: edit these ----
     email, linkedin: already set from the details you gave me.
     whatsapp: digits only with country code, e.g. '923001234567'.
               Leave '' until you add your number; the WhatsApp card then shows
               "Number to be added" and its button stays disabled (no fake link). */
  const CONTACT = {
    email: 'khansawali.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/khansa-wali/',
    whatsapp: '923089661739'
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-5-5m5 5-5 5"/></svg>';
  const wa = text => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
  const mail = (subject, body) => `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const go = url => { const a = document.createElement('a'); a.href = url; a.click(); };  // opens the mail app

  /* ---- channel cards ---- */
  const emailBtn = $('[data-ch="email"] .btn');
  emailBtn.href = mail('Hello from your portfolio', "Hi Khansa,\n\n");
  $('[data-ch="email"] .ch__detail').textContent = CONTACT.email;

  const li = $('[data-ch="linkedin"] .btn');
  li.href = CONTACT.linkedin;
  $('[data-ch="linkedin"] .ch__detail').textContent = CONTACT.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  const hasWA = /^\d{8,15}$/.test(CONTACT.whatsapp);
  if (hasWA) {
    const card = $('[data-ch="whatsapp"]');
    card.classList.remove('is-pending');
    $('.ch__detail', card).textContent = '+' + CONTACT.whatsapp;
    const old = $('.btn', card);
    const a = document.createElement('a');
    a.className = 'btn btn--primary'; a.target = '_blank'; a.rel = 'noopener';
    a.href = wa("Hi Khansa, I'd like to get in touch.");
    a.innerHTML = 'Chat on WhatsApp ' + ARROW;
    old.replaceWith(a);
  }

  /* ---- closing CTA ---- */
  const final = $('#finalActions');
  $('#finalMail').href = mail('Hello from your portfolio', "Hi Khansa,\n\n");
  $('#finalLinkedin').href = CONTACT.linkedin;
  if (hasWA) {
    const a = document.createElement('a');
    a.className = 'btn btn--ghost'; a.target = '_blank'; a.rel = 'noopener';
    a.href = wa("Hi Khansa, I'd like to get in touch."); a.textContent = 'Chat on WhatsApp';
    final.appendChild(a);
  }

  /* ---- topics fill the form ---- */
  const form = $('#ctForm'), select = $('#topic'), msg = $('#message');
  const topics = $$('.topic');
  const mark = () => topics.forEach(t => t.classList.toggle('is-picked', t.dataset.topic === select.value));
  topics.forEach(t => t.addEventListener('click', () => {
    select.value = t.dataset.topic; mark();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => msg.focus({ preventScroll: true }), reduce ? 0 : 450);
  }));
  select.addEventListener('change', mark);

  /* ---- form: composes a real email (or WhatsApp message). It never claims a message was sent. ---- */
  const status = $('#formStatus');
  const compose = () => {
    const f = new FormData(form);
    const topic = f.get('topic'), name = f.get('name').trim();
    return {
      subject: `${topic}: message from ${name}`,
      body: `Name: ${name}\nEmail: ${f.get('email').trim()}\nInquiry type: ${topic}\n\n${f.get('message').trim()}`
    };
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const m = compose();
    go(mail(m.subject, m.body));
    status.innerHTML = `Your email app should now open with this message ready to send. If nothing opens, write to <a href="mailto:${CONTACT.email}">${CONTACT.email}</a> directly.`;
  });
  if (hasWA) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'btn btn--ghost'; b.textContent = 'Send via WhatsApp';
    b.addEventListener('click', () => {
      if (!form.reportValidity()) return;
      const m = compose();
      window.open(wa(`${m.subject}\n\n${m.body}`), '_blank', 'noopener');
      status.textContent = 'WhatsApp should now open with this message ready to send.';
    });
    $('.form__actions', form).appendChild(b);
  }
})();
