var AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const modalTrack = document.querySelectorAll("a-entity.contenedor");
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-image-system"];
let tracks = [];
let audios = [];
let buttonsEnlace = [];

function insertarData(arrayOfEntities, arrayOfData) {
    arrayOfEntities.forEach((entity, index) => {
        entity.insertAdjacentHTML('beforeend', `<audio src="${arrayOfData[0].audios[index].src}" loop="false"></audio>`);
        // entity.insertAdjacentHTML('beforeend', `<a-text class="textito" hidden="true" value="${arrayOfData[0].texts[index].content}" geometry="primitive:plane; height:2;width:1.6" material="color:#2e2e2e" align="left" anchor="center" baseline="center" color="white" font="mozillavr" width="1.55" wrapCount="100" zOffset="0.1" position="0 -1 2" rotation="-40 0 0"></a-text>`);
        entity.insertAdjacentHTML('beforeend', `<a-plane position="0 -0.7 1.5" rotation="-30 0 0" width="1.5" height="1.5" material="src:${arrayOfData[0].texts[index].src}; transparent: true"></a-plane>`);
        if (arrayOfData[0].links[index].type == 'biblioteca') {
            entity.insertAdjacentHTML('beforeend', `<a-image class="clickable biblioteca" src="#biblioteca" position="1 0.3 1.5" height="0.15" width="0.6" animation="property: scale; to: 1.3 1.3 1.3; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate" material geometry></a-image>`);
        } else if (arrayOfData[0].links[index].type == 'compra') {
            entity.insertAdjacentHTML('beforeend', `<a-image class="clickable compra" src="#compra" position="1 0.3 1.5" height="0.15" width="0.6" animation="property: scale; to: 1.3 1.3 1.3; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate" material geometry></a-image>`);
        } else {
            entity.insertAdjacentHTML('beforeend', `<a-image class="clickable descarga" src="#descarga" position="1 0.3 2" height="0.15" width="0.6" animation="property: scale; to: 1.3 1.3 1.3; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate" material geometry></a-image>`);
        };

        buttonsEnlace = document.querySelectorAll("a-image.clickable");
    });
};

function listening(arrayOfEntities) {
    audios = document.querySelectorAll("audio");
    audios.forEach((audio, index) => {
        const track = audioContext.createMediaElementSource(audio);
        tracks.push(track);
        tracks[index].connect(audioContext.destination);
    });

    arrayOfEntities.forEach((entity, index) => {
        entity.addEventListener("targetFound", () => {
            if(audioContext.state === 'suspended') {
                audioContext.resume();
            }
            tracks[index].mediaElement.play();
            tracks[index].mediaElement.loop = false;
        });
        entity.addEventListener("targetLost", () => {
            tracks[index].mediaElement.pause();
            tracks[index].mediaElement.currentTime = 0;
        });
    });
};

function activarLinks(botones, arrayOfData) {
    botones.forEach((button, index) => {
        button.addEventListener('click', function (evt) {
            window.location.href = arrayOfData[0].links[index].href;
        });
    });
};

function fetchJSONData() {
    fetch("./data/datos.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            insertarData(modalTrack, data);
            listening(modalTrack);
            activarLinks(buttonsEnlace, data);
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
fetchJSONData();