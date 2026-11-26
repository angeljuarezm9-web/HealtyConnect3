// Menú móvil
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => menu.classList.remove("open"))
);

// Sombra del encabezado al hacer scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});

// Animación de aparición
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("show");
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Preguntas frecuentes (acordeón)
document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
        const respuesta = btn.nextElementSibling;
        const abierto = respuesta.style.maxHeight;
        document.querySelectorAll(".faq-a").forEach(a => (a.style.maxHeight = null));
        document.querySelectorAll(".faq-q span").forEach(s => (s.textContent = "+"));
        if (!abierto) {
            respuesta.style.maxHeight = respuesta.scrollHeight + "px";
            btn.querySelector("span").textContent = "−";
        }
    });
});

// Validación del formulario de contacto
const form = document.getElementById("form");
const msg = document.getElementById("form-msg");
form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!nombre || !correo || !mensaje) {
        msg.textContent = "Por favor completa todos los campos.";
        msg.className = "form-msg error";
    } else if (!correoValido) {
        msg.textContent = "Escribe un correo electrónico válido.";
        msg.className = "form-msg error";
    } else {
        msg.textContent = "¡Gracias, " + nombre + "! Te responderemos pronto.";
        msg.className = "form-msg ok";
        form.reset();
    }
});

// Año del pie de página
document.getElementById("year").textContent = new Date().getFullYear();





// ===== Ventana de descarga beta =====
const modal = document.getElementById("modal-descarga");

function abrirModal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";   // evita que la página se mueva detrás
}

function cerrarModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Todos los botones con la clase "abrir-descarga" abren la ventana
document.querySelectorAll(".abrir-descarga").forEach(btn =>
    btn.addEventListener("click", e => {
        e.preventDefault();      // evita que el "#" mueva la página
        abrirModal();
    })
);

// Cerrar con la X
document.getElementById("cerrar-modal").addEventListener("click", cerrarModal);

// Cerrar al hacer clic en el fondo oscuro (fuera de la caja)
modal.addEventListener("click", e => {
    if (e.target === modal) cerrarModal();
});

// Cerrar con la tecla Esc
document.addEventListener("keydown", e => {
    if (e.key === "Escape") cerrarModal();
});



