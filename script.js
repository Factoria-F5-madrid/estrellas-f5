let personas;
let currentIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            personas = data;
            mostrarPersonaAleatoria();
            setInterval(mostrarPersonaAleatoria, 5000); // Cambiar cada 5 segundos
        });
});

function mostrarPersonaAleatoria() {
    const personaDiv = document.getElementById('persona');
    personaDiv.style.opacity = 0;

    setTimeout(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * personas.length);
        } while (newIndex === currentIndex && personas.length > 1);
        currentIndex = newIndex;

        const persona = personas[currentIndex];

        document.getElementById('foto-cara').src = persona.urlCara;
        const fotoMeme = document.getElementById('foto-meme');
        const imageContainer = document.getElementById('image-container');

        if (persona.urlMeme) {
            fotoMeme.src = persona.urlMeme;
            fotoMeme.style.display = 'block';
            imageContainer.classList.remove('single-image');
        } else {
            fotoMeme.style.display = 'none';
            imageContainer.classList.add('single-image');
        }

        document.getElementById('nombre').textContent = `${persona.nombre} ${persona.apellido}`;
        document.getElementById('mensaje').textContent = persona.mensaje;

        let estrellaUrl;
        switch(persona.tipoEstrella) {
            case 'externa':
                estrellaUrl = 'img/estrella-externa.png';
                break;
            case 'interna':
                estrellaUrl = 'img/estrella-interna.png';
                break;
            case 'coder':
                estrellaUrl = 'img/estrella-coder.png';
                break;
        }
        const estrella = document.getElementById('tipo-estrella');
        estrella.src = estrellaUrl;
        estrella.style.display = estrellaUrl ? 'block' : 'none';

        personaDiv.style.opacity = 1;
    }, 500);
}