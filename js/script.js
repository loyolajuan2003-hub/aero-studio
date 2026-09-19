(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5493512458786";

  /* ---------- Menú mobile ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Formulario de contacto -> WhatsApp ---------- */
  var form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nombre = form.nombre.value.trim();
      var rubro = form.rubro.value;
      var mensaje = form.mensaje.value.trim();

      var texto =
        "Hola Juan, soy " + nombre + ". " +
        "Quiero pedir una cotización para un proyecto de " + rubro.toLowerCase() + ". " +
        "Cuento un poco más: " + mensaje;

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto);
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Protección básica de la foto de "Sobre mí" ----------
     Frena el uso casual (clic derecho > guardar, arrastrar a escritorio,
     long-press en mobile). No es infalible: cualquiera con devtools o la
     pestaña de red del navegador puede encontrar la URL igual. */
  var protectedPhoto = document.querySelector("[data-protected-photo]");

  if (protectedPhoto) {
    protectedPhoto.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    protectedPhoto.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });
    protectedPhoto.addEventListener("selectstart", function (event) {
      event.preventDefault();
    });
  }

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = "© " + new Date().getFullYear() + " AERO studio";
  }
})();
