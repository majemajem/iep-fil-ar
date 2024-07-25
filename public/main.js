const audioContext = new AudioContext();
// const inicioAudio = document.querySelector('.control');
// primero debo inicializar cada audio en su respectivo
const modalTrack = document.querySelectorAll("a-entity.contenedor");
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-image-system"];
let tracks = [];
let audios = [];
let buttonsBiblioteca = [];
let buttonsCompra = [];
let buttonsDescarga = [];

function insertarData(arrayOfEntities, arrayOfData) {
    arrayOfEntities.forEach((entity, index) => {
        entity.insertAdjacentHTML('beforeend', `<audio src="${arrayOfData[0].audios[index].src}" loop="false"></audio>`);
        // entity.insertAdjacentHTML('beforeend', `<a-text class="textito" hidden="true" value="${arrayOfData[0].texts[index].content}" geometry="primitive:plane; height:2;width:1.6" material="color:#2e2e2e" align="left" anchor="center" baseline="center" color="white" font="mozillavr" width="1.55" wrapCount="100" zOffset="0.1" position="0 -1 2" rotation="-40 0 0"></a-text>`);
        entity.insertAdjacentHTML('beforeend', `<a-plane position="0 0 1.5" rotation="-30 0 0" width="2" height="2" material="src:${arrayOfData[0].texts[index].src}; transparent: true"></a-plane>`);
        // entity.insertAdjacentHTML('beforeend', `<a-plane position="0 0 1.4" rotation="-30 0 0" width="2" height="2" color="#e0e0e0"></a-plane>`);
        if (arrayOfData[0].links[index].type == 'biblioteca') {
            entity.insertAdjacentHTML('beforeend', `<a-image class="clickable biblioteca" src="#biblioteca" position="1.5 1 1.5" height="0.3" width="1.2" animation="property: scale; to: 1.1 1.1 1.1; dur: 4000; easing: easeInOutQuad; loop: true; dir: alternate" material geometry></a-image>`);
        } else if (arrayOfData[0].links[index].type == 'compra') {
            entity.insertAdjacentHTML('beforeend', `<a-image class="clickable compra" src="#compra" position="1.5 1 1.5" height="0.3" width="1.2" animation="property: scale; to: 1.1 1.1 1.1; dur: 4000; easing: easeInOutQuad; loop: true; dir: alternate" material geometry></a-image>`);
        } else {
            entity.insertAdjacentHTML('beforeend', `<a-image class="clickable descarga" src="#descarga" position="1.5 1 1.5" height="0.3" width="1.2" animation="property: scale; to: 1.1 1.1 1.1; dur: 4000; easing: easeInOutQuad; loop: true; dir: alternate" material geometry></a-image>`);
        };

        buttonsBiblioteca = document.querySelectorAll("a-image.biblioteca");
        buttonsCompra = document.querySelectorAll("a-image.compra");
        buttonsDescarga = document.querySelectorAll("a-image.descarga");
    });

    // audios = document.querySelectorAll("audio");
    // audios.forEach((audio, index) => {
    //     const track = audioContext.createMediaElementSource(audio);
    //     tracks.push(track);
    //     tracks[index].connect(audioContext.destination);
    // });
    // let textos = document.querySelectorAll("a-text");
    // console.log(textos);
    // arrayOfEntities.forEach((entity, index) => {
    //     entity.addEventListener("targetFound", () => {
    //         if(audioContext.state === 'suspended') {
    //             audioContext.resume();
    //         }
    //         tracks[index].mediaElement.play();
    //         tracks[index].mediaElement.loop = false;
    //     });
    //     entity.addEventListener("targetLost", () => {
    //         tracks[index].mediaElement.pause();
    //         tracks[index].mediaElement.currentTime = 0;
    //     });
    // });
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

function activarLinks(biblioteca, compra, descarga) {
    biblioteca.forEach((button) => {
        button.addEventListener('click', function (evt) {
            window.location.href = "https://catalogo.iep.org.pe/cgi-bin/koha/opac-detail.pl?biblionumber=3831";
        })
    });
    compra.forEach((button) => {
        button.addEventListener('click', function (evt) {
            window.location.href = "https://fondoeditorial.iep.org.pe/producto/clases-estado-y-nacion-en-el-peru-nueva-edicion/";
        })
    });
    descarga.forEach((button) => {
        button.addEventListener('click', function (evt) {
            window.location.href = "http://repositorio.iep.org.pe/handle/IEP/666"
        })
    });
}

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
            insertarData(modalTrack, data);
            listening(modalTrack);
            activarLinks(buttonsBiblioteca, buttonsCompra, buttonsDescarga);
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
fetchJSONData();