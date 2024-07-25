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
        entity.insertAdjacentHTML('beforeend', `<a-text class="textito" hidden="true" value="${arrayOfData[0].texts[index].content}" geometry="primitive:plane; height:2;width:1" material="color:#2e2e2e" align="center" color="white" font="monoid" width="1" wrapCount="100" zOffset="0.1" position="0 -1 2" rotation="-40 0 0"></a-text>`);
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

    console.log(textos);
    arrayOfEntities.forEach((entity, index) => {
        console.log(audios[index]);
        entity.addEventListener("targetFound", () => {
            audios[index].play();
            console.log("se logró");
            //Probar esta parte en casa
        });
        entity.addEventListener("targetLost", () => {
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