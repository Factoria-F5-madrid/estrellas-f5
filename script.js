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
        mostrarSiguientePersona();
        setInterval(mostrarSiguientePersona, 8000);
      } else {
        document.getElementById("persona").innerHTML =
          "<p>No se encontraron resultados para el filtro aplicado.</p>";
      }
    });
});

function filterPersonas() {
  const urlParams = new URLSearchParams(window.location.search);
  const tipoEstrella = urlParams.get("tipo");
  const id = urlParams.get("id");

  let result = personas;

  if (tipoEstrella && ["alumni", "profesional", "coder"].includes(tipoEstrella)) {
    result = result.filter((persona) => persona.tipoEstrella === tipoEstrella);
  }

  if (id) {
    result = result.filter((persona) => persona.id === parseInt(id));
  }

  return result;
}

function mostrarSiguientePersona() {
  const personaDiv = document.getElementById("persona");
  personaDiv.style.opacity = 0;

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % filteredPersonas.length;
    const persona = filteredPersonas[currentIndex];

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

    const typeStarElement = document.querySelector(".type-star");
    switch (persona.tipoEstrella) {
      case "profesional":
        typeStarElement.textContent = "Profesional Estrella F5";
        break;
      case "alumni":
        typeStarElement.textContent = "Alumni Estrella F5";
        break;
      case "coder":
        typeStarElement.textContent = "Coder Estrella F5";
        break;
      default:
        typeStarElement.textContent = "Estrella F5";
    }

 
    const estrella = document.getElementById("tipo-estrella");
    let iframeSrc = "";

    switch (persona.tipoEstrella) {
      case "profesional":
        iframeSrc = "./3d/star1.html";
        break;
      case "alumni":
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

    personaDiv.style.opacity = 1;
  }, 500);
}

