let personas;
let currentIndex = -1;
let filteredPersonas;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      personas = data;
      filteredPersonas = filterPersonas();
      if (filteredPersonas.length > 0) {
        mostrarPersonaAleatoria();
        setInterval(mostrarPersonaAleatoria, 5000); // Cambiar cada 5 segundos
      } else {
        document.getElementById("persona").innerHTML = "<p>No se encontraron resultados para el filtro aplicado.</p>";
      }
    });
});

function filterPersonas() {
  const urlParams = new URLSearchParams(window.location.search);
  const tipoEstrella = urlParams.get('tipo');
  
  if (tipoEstrella && ['interna', 'externa', 'coder'].includes(tipoEstrella)) {
    return personas.filter(persona => persona.tipoEstrella === tipoEstrella);
  }
  
  return personas;
}

function mostrarPersonaAleatoria() {
  const personaDiv = document.getElementById("persona");
  const container = document.querySelector(".container");
  personaDiv.style.opacity = 0;

  setTimeout(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * filteredPersonas.length);
    } while (newIndex === currentIndex && filteredPersonas.length > 1);
    currentIndex = newIndex;

    const persona = filteredPersonas[currentIndex];

    // Actualizar la información de la persona
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

    // Actualizar el contenido de la etiqueta <h2 class="type-star">
    const typeStarElement = document.querySelector(".type-star");
    switch (persona.tipoEstrella) {
      case "externa":
        typeStarElement.textContent = "Estrella Externa";
        break;
      case "interna":
        typeStarElement.textContent = "Estrella Interna";
        break;
      case "coder":
        typeStarElement.textContent = "Estrella Coder";
        break;
      default:
        typeStarElement.textContent = "Estrella";
    }

    // Cambiar dinámicamente el `src` del iframe
    const estrella = document.getElementById("tipo-estrella");
    let iframeSrc = "";

    switch (persona.tipoEstrella) {
      case "externa":
        iframeSrc = "./3d/star1.html";
        break;
      case "interna":
        iframeSrc = "./3d/star2.html";
        break;
      case "coder":
        iframeSrc = "./3d/star3.html";
        break;
      default:
        iframeSrc = "";
    }

    estrella.src = iframeSrc;
    estrella.style.display = iframeSrc ? "block" : "none";

    // Actualizar el fondo del contenedor de forma dinámica
    if (persona.fondo) {
      container.style.setProperty(
        "--background-image",
        `url(${persona.fondo})`
      );
    }

    // Mostrar el contenedor con una animación de desvanecimiento
    personaDiv.style.opacity = 1;
  }, 500);
}