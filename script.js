let personas;
let currentIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      personas = data;
      mostrarPersonaAleatoria();
      setInterval(mostrarPersonaAleatoria, 5000); // Cambiar cada 5 segundos
    });
});

function mostrarPersonaAleatoria() {
  const personaDiv = document.getElementById("persona");
  personaDiv.style.opacity = 0;

  setTimeout(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * personas.length);
    } while (newIndex === currentIndex && personas.length > 1);
    currentIndex = newIndex;

    const persona = personas[currentIndex];

    document.getElementById("foto-cara").src = persona.urlCara;
    const fotoMeme = document.getElementById("foto-meme");
    const imageContainer = document.getElementById("image-container");

    if (persona.urlMeme) {
      fotoMeme.src = persona.urlMeme;
      fotoMeme.style.display = "block";
      imageContainer.classList.remove("single-image");
    } else {
      fotoMeme.style.display = "none";
      imageContainer.classList.add("single-image");
    }

    document.getElementById(
      "nombre"
    ).textContent = `${persona.nombre} ${persona.apellido}`;
    document.getElementById("mensaje").textContent = persona.mensaje;

    const estrella = document.getElementById("tipo-estrella");

    // Cambiar URL del modelo con setAttribute
    switch (persona.tipoEstrella) {
      case "externa":
        estrella.setAttribute(
          "url",
          "https://prod.spline.design/cBNXQxR8-4CnlO8P/scene.splinecode"
        );
        break;
      case "interna":
        estrella.setAttribute(
          "url",
          "https://prod.spline.design/DKyrHSbGuVx5qIcL/scene.splinecode"
        );
        break;
      case "coder":
        estrella.setAttribute(
          "url",
          "https://prod.spline.design/ZmlZbHCutbxXaIWW/scene.splinecode"
        );
        break;
      default:
        estrella.setAttribute("url", "");
    }

    // Forzar el componente a actualizar
    estrella.setAttribute("key", new Date().getTime());

    estrella.style.display = estrella.getAttribute("url") ? "block" : "none";
    personaDiv.style.opacity = 1;
  }, 500);
}
