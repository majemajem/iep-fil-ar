const audioContext = new AudioContext();
// const inicioAudio = document.querySelector('.control');
// primero debo inicializar cada audio en su respectivo
const modalTrack = document.querySelectorAll("a-entity");
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-image-system"];
let tracks = [];
let audios = [];

function insertarData(arrayOfEntities, arrayOfData) {
    arrayOfEntities.forEach((entity, index) => {
        // console.log(arrayOfAudios[0].audios[index]);
        entity.insertAdjacentHTML('beforeend', `<audio src="${arrayOfData[0].audios[index].src}" loop="false"></audio>`);
        entity.insertAdjacentHTML('beforeend', `<a-text class="textito" hidden="true" value="${arrayOfData[0].texts[index].content}" geometry="primitive:plane" color="white" font="monoid"></a-text>`);
        // console.log(arrayOfAudios[0].audios[index].src);
    });
    audios = document.querySelectorAll("audio");
    console.log(audios);
    audios.forEach((audio, index) => {
        const track = audioContext.createMediaElementSource(audio);
        tracks.push(track);
        tracks[index].connect(audioContext.destination);
    });
    console.log(tracks);
    let textos = document.querySelectorAll("a-text");
    textos.forEach((texto, index) => {
        // texto.height = '20px';
        texto.width = '0.3';
        texto.wrapCount = '10';
        texto.zOffset = '0.5';
        // console.log(arrayOfEntities[index]);    
    });
    // console.log(textos);
    arrayOfEntities.forEach((entity, index) => {
        console.log(audios[index]);
        entity.addEventListener("targetFound", event => {
            audios[index].play();
            console.log("se logró");
            //Aquí entra la parte de activar los audios
        });
        entity.addEventListener("targetLost", event => {
            audios[index].pause();
        })
    })
};

function fetchJSONData() {
    fetch("./public/data/datos.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            insertarData(modalTrack, data)
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
fetchJSONData();
// console.log(audios);