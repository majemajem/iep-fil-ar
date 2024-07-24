const audioContext = new AudioContext();
const inicioAudio = document.querySelector('.control');

const contenedores = document.querySelectorAll('.contenedor');

inicioAudio.addEventListener('click', function() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
})

function addAudiosToBooks(arrayOfAudios, i) {
    contenedores[i].innerHTML = arrayOfAudios.map((audio, index) => `<audio src="${audio.src}" class="audi" loop="false" preload="auto"></audio>`).join('');
    const audioElement = document.querySelectorAll('.audi');
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(gainNode).connect(audioContext.destination);
    contenedores.forEach((contenedor, i) => {
        contenedor.addEventListener("targetFound", () => {
            audioContext.resume();
            audioElement.play();
        });
        contenedor.addEventListener("targetLost", () => {
            audioContext.stop();
            audioElement.pause();
        });
    });
};

contenedores.forEach((contenedor, i) => {
    let arrayOfAudios = [];
    arrayOfAudios.push('./data/audios.json');
    contenedor.innerHTML = arrayOfAudios.map((audio) => `<audio src="${audio.src}" class="audi" loop="false" preload="auto"></audio>`).join('');
    contenedor.addEventListener("targetFound", () => {
        contenedor.addAudiosToBooks('./data/audios.json', i);
    })
});