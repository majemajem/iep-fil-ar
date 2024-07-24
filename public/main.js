const audioContext = new AudioContext();
// const inicioAudio = document.querySelector('.control');
// primero debo inicializar cada audio en su respectivo
const modalTrack = document.querySelectorAll("a-entity");
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-image-system"];

function insertarData(arrayOfEntities, arrayOfData) {
    arrayOfEntities.forEach((entity, index) => {
        // console.log(arrayOfAudios[0].audios[index]);
        entity.insertAdjacentHTML('beforeend', `<audio src="${arrayOfData[0].audios[index].src}" autoplay="false"></audio>`);
        entity.insertAdjacentHTML('beforeend', `<a-text class="textito" hidden="true" value="${arrayOfData[0].texts[index].content}" geometry="primitive:plane" color="black" font="monoid"></a-text>`);
        entity.addEventListener("targetFound", event => {
            console.log("se logró");
        });
        // console.log(arrayOfAudios[0].audios[index].src);
    });
    let audios = document.querySelectorAll("audio");
    console.log(audios);
    let textos = document.querySelectorAll("a-text");
    textos.forEach((texto, index) => {
        texto.height = '20px';
        texto.width = '40px';
        texto.zOffset = '2';
        console.log(arrayOfEntities[index]);
    });
    console.log(textos);
    // console.log(modalTrack);
};

function fetchJSONData() {
    fetch("./public/data/audios.json")
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