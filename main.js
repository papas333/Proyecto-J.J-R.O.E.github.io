/* FLAVOR CROWN - SCRIPT ÉPICO CORREGIDO
   By Emanuel & Jezrael
*/

document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ Scroll reveal — añadimos la clase inicial y luego 'visible'
  const sections = document.querySelectorAll("section");
  sections.forEach(s => s.classList.add("scroll-reveal")); // aseguramos la clase inicial
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < triggerBottom) {
        section.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();

  // 2️⃣ Frases rotativas del logo
  const frases = [
    "✨ Bienvenido a Flavor Crown ✨",
    "🍽️ Sabores que coronan tu paladar 👑",
    "🔥 Experiencia culinaria sin igual 🔥",
    "🥂 Vive el lujo del buen sabor 🥂"
  ];
  const logo = document.querySelector(".logo h1");
  if (logo) {
    let index = 0;
    logo.textContent = frases[index]; // texto inicial
    setInterval(() => {
      index = (index + 1) % frases.length;
      logo.textContent = frases[index];
    }, 4000);
  }

  // 3️⃣ Formulario de reservas (soporta id o clase)
  const form = document.getElementById("form-reservas") || document.querySelector(".form-reservas");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = (document.getElementById("nombre") || form.querySelector("[name='nombre']")).value || "Amigo/a";
      const personas = (document.getElementById("personas") || form.querySelector("[name='personas']")).value || "1";
      const fecha = (document.getElementById("fecha") || form.querySelector("[name='fecha']")).value || "próxima";
      const hora = (document.getElementById("hora") || form.querySelector("[name='hora']")).value || "pronto";

      const mensaje = document.createElement("div");
      mensaje.classList.add("alerta-reserva");
      mensaje.innerHTML = `
        <strong>¡Reserva confirmada!</strong><br>
        ${nombre}, te esperamos el <b>${fecha}</b> a las <b>${hora}</b> para ${personas} persona(s).
      `;
      document.body.appendChild(mensaje);

      // animación entrada/salida
      setTimeout(() => mensaje.classList.add("visible"), 100);
      setTimeout(() => {
        mensaje.classList.remove("visible");
        setTimeout(() => mensaje.remove(), 600);
      }, 5000);

      if (typeof form.reset === "function") form.reset();
    });
  }

  // 4️⃣ Cambio de idioma
  const idiomaSelect = document.getElementById("idioma") || document.querySelector(".settings select[name='idioma']");
  if (idiomaSelect) {
    const textos = {
      es: { menu: "Menú Destacado", reservas: "Reservas", historia: "Conoce Nuestra Historia", contacto: "Contacto" },
      en: { menu: "Featured Menu", reservas: "Reservations", historia: "Our Story", contacto: "Contact" }
    };
    idiomaSelect.addEventListener("change", () => {
      const lang = idiomaSelect.value in textos ? idiomaSelect.value : "es";
      const map = [
        { sel: "#menu h2", key: "menu" },
        { sel: "#reservas h2", key: "reservas" },
        { sel: "#about h2", key: "historia" },
        { sel: "#contacto h2", key: "contacto" }
      ];
      map.forEach(item => {
        const el = document.querySelector(item.sel);
        if (el) el.textContent = textos[lang][item.key];
      });
    });
  }

  // 5️⃣ Sonido suave al hacer clic — CORREGIDO
  const sonidoClick = new Audio("assets/Click.mp3");

  // 🔊 Sonido al escribir (NUEVO — agregado)
  const sonidoTecla = new Audio("assets/Type.mp3");

  document.querySelectorAll("input, textarea").forEach(campo => {
    campo.addEventListener("input", () => {
      try {
        sonidoTecla.currentTime = 0;
        sonidoTecla.play();
      } catch (e) {}
    });
  });

  document.querySelectorAll("button, a").forEach(el => {
    el.addEventListener("pointerdown", () => {
      try {
        sonidoClick.currentTime = 0;
        const p = sonidoClick.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (err) {}
    });
  });

  // 6️⃣ Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle") || document.querySelector(".menu-toggle");
  const sideMenu = document.getElementById("side-menu") || document.querySelector(".menu-hamburguesa");

  if (menuToggle && sideMenu) {
    menuToggle.addEventListener("click", (ev) => {
      ev.stopPropagation();
      sideMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        sideMenu.classList.remove("open");
        menuToggle.classList.remove("active");
      }
    });
  }

});

// ==== CONTADOR DE PROMO ====
const countdown = document.getElementById("countdown");
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

function actualizarContador() {
  const ahora = new Date().getTime();
  const distancia = endDate - ahora;

  if (distancia < 0) {
    countdown.innerText = "¡Promoción terminada!";
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));

  countdown.innerText = `${dias}d ${horas}h ${minutos}m`;
}

setInterval(actualizarContador, 1000);

// ==== CHATBOT LANDOBOT ====
window.addEventListener('mouseover', initLandbot, { once: true });
window.addEventListener('touchstart', initLandbot, { once: true });
var myLandbot;

function initLandbot() {
  if (!myLandbot) {
    var s = document.createElement('script');
    s.type = "module";
    s.async = true;
    s.addEventListener('load', function() {
      var myLandbot = new Landbot.Livechat({
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3232135-187TS4M3SMNNVQMG/index.json',
      });
    });
    s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  }
}
