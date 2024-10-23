
function startTranscription() {
    // Actualizar el texto de transcripción
    const transcriptionElement = document.getElementById('transcription-text');
    transcriptionElement.innerHTML = "Transcribiendo... El profesor dice: 'Bienvenidos a la clase de hoy sobre inclusión educativa.'";

    // Mostrar el contenedor del video
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'block'; // Cambia el estilo a 'block' para mostrarlo

    // Ocultar el texto de transcripción después de mostrar el video
    transcriptionElement.style.display = 'none';
}

function startSignRecognition() {
    const signOutputElement = document.getElementById('sign-output');
    signOutputElement.innerHTML = "Interpretando señas... Traducción: 'Pregunta: ¿Cuál es el tema de hoy?'";
}

function transcribeVideo() {
    const videoTranscriptionElement = document.getElementById('video-transcription');
    videoTranscriptionElement.innerHTML = "Transcribiendo el video... Traducción: 'Hola, profesor. Hoy quiero discutir sobre IA aplicada en educación.'";
}

// Manejo del chat interactivo
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message !== "") {
        const newMessage = document.createElement('p');
        newMessage.innerHTML = `<strong>Tú:</strong> ${message}`;
        chatMessages.appendChild(newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar hacia abajo automáticamente
        chatInput.value = ""; // Limpiar el input
    }
});

// Levantar la mano
const btnLevantarMano = document.querySelector('.btn-levantar-mano');
btnLevantarMano.addEventListener('click', () => {
    alert("Has levantado la mano. El profesor ha sido notificado.");
});

