// Creación de una instancia de SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Configurar el reconocimiento
recognition.lang = 'es-ES'; // Establece el idioma a español de España
recognition.interimResults = true; // Muestra resultados parciales

// Definir un evento para manejar los resultados
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log('Transcripción:', transcript);
    // Actualizar el valor del cuadro de texto con la transcripción
    document.getElementById('texto').value = transcript;
};

// Manejo de errores
recognition.onerror = (event) => {
    console.error('Error en el reconocimiento:', event.error);
};

// Evento al iniciar el reconocimiento
recognition.onstart = () => {
    console.log('Comenzando a escuchar...');
    document.getElementById('transcription-text').innerText = "Escuchando...";
};

// Evento al detener el reconocimiento
recognition.onend = () => {
    console.log('Detenido el reconocimiento.');
    document.getElementById('transcription-text').innerText = "Esperando transcripción de lengua de señas...";
};

// Función para iniciar la transcripción
function startTranscription() {
    // Mostrar el contenedor del video
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'block'; // Cambia el estilo a 'block' para mostrarlo
    
    recognition.start(); // Inicia el reconocimiento
}
// Función para iniciar la transcripción
function startTranscription() {
    // Mostrar el contenedor del video
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'block'; // Cambia el estilo a 'block' para mostrarlo
    
    // Iniciar la reproducción del video
    const videoElement = document.getElementById('sign-language-video');
    videoElement.play(); // Inicia la reproducción del video

    // Iniciar el reconocimiento
    recognition.start(); // Inicia el reconocimiento
}

