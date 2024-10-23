const video = document.getElementById('video');
const output = document.getElementById('output');
let model, handClassifier;

// Configurar la cámara
async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
    });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

// Cargar el modelo y la clasificación
async function loadModels() {
    model = await handpose.load(); // Cargar el modelo preentrenado
    handClassifier = knnClassifier.create(); // Crear el clasificador KNN
}

// Agregar un gesto al clasificador
function agregarGesto(gestureName) {
    // Estimamos las posiciones de las manos
    model.estimateHands(video).then(predictions => {
        if (predictions.length > 0) {
            const landmarks = predictions[0].landmarks;
            const activation = tf.tensor(landmarks).expandDims(0);
            handClassifier.addExample(activation, gestureName); // Agregar las posiciones al clasificador con la etiqueta del gesto
            output.textContent = `Gesto ${gestureName} agregado.`;
        }
    });
}

// Detectar gestos
async function detectHands() {
    const predictions = await model.estimateHands(video);

    if (predictions.length > 0) {
        const landmarks = predictions[0].landmarks;
        const activation = tf.tensor(landmarks).expandDims(0);

        // Realizamos la predicción del gesto
        const gesturePrediction = await handClassifier.predictClass(activation);

        // Verificamos si el gesto tiene confianza alta
        if (gesturePrediction.confidences[gesturePrediction.label] > 0.7) {
            const gesture = gesturePrediction.label; // Gesto reconocido
            output.textContent = `Gesto detectado: ${gesture}`;
        }
    } else {
        output.textContent = "Esperando detección de gestos...";
    }

    // Continuar con la detección en cada frame
    requestAnimationFrame(detectHands);
}

// Inicializar la detección
async function main() {
    await setupCamera();
    await loadModels();
    detectHands();
}

// Eventos para agregar gestos manualmente
document.getElementById('add-gesture-a').addEventListener('click', () => agregarGesto('A'));
document.getElementById('add-gesture-b').addEventListener('click', () => agregarGesto('B'));

// Llamar a la función principal al cargar la página
main();
