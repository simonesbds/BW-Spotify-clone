function getArtistData(artist) {
  let apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore del server");
      }
      return response.json();
    })
    .then((json) => {
      let data = json.data;
      let artist = data[0].artist;
      let album = data[0].album;
      const firstSection = document.getElementById("top-page-artist");
      const homePageArtist = document.createElement("div");
      homePageArtist.innerHTML = `<div class="d-flex align-items-center">
          <img
            src="${artist.picture_xl}"
            alt="Img: ${artist.picture_xl}"
            class="img-fluid me-3 rounded"
            style="width: 250px; height: 250px"
          />
          <div>
            <div class="card-header">
              <h6>${artist.name}</h6>
              <h1 class="fs-1">${album.title}</h1>
              <p class="fw-light">L'album più ascoltato</p>
              <p class="fw-light">Clicca su Altro per i dettagli dell'artista</p>
            </div>
            <div class="d-flex align-items-center mx-2 me-2">
              <a href="${artist.link}" target="_blank" class="btn btn-success mx-2 me-2">Play</a>
              <a href="./artist.html?id=${artist.id}" target="_blank" class="btn btn-outline-light mx-2">Altro</a>
              <span class="fas fa-ellipsis-h text-white"></span>
            </div>
          </div>
        </div>`;

      firstSection.appendChild(homePageArtist);
      console.log(album);

      let albumIdArray = [];
      let randomId = [];

      data.forEach((element) => {
        let albumId = element.album.id;
        albumIdArray.push(albumId);
      });

      while (randomId.length < 4) {
        let randomIndex = Math.floor(Math.random() * albumIdArray.length);
        let selectedAlbumId = albumIdArray[randomIndex];
        if (!randomId.includes(selectedAlbumId)) {
          randomId.push(selectedAlbumId);
        }
      }

      randomId.forEach((id) => {
        let findId = data.find((e) => e.album.id === id);
        if (findId) {
          let album = findId.album;
          console.log(album);
        }
      });
    })
    .catch((error) => console.error("Error:", error));
}

getArtistData("lady gaga");

// Script per i pulsanti del footer
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play-btn");
  document.querySelector(".shuffle-btn").addEventListener("click", function () {
    this.classList.toggle("text-success");
  });
  
  document.querySelector(".repeat-btn").addEventListener("click", function () {
    this.classList.toggle("text-success");
  });   

  let isPlaying = false;

  playButton.addEventListener("click", function () {
    isPlaying = !isPlaying;
    playButton.innerHTML = isPlaying
      ? '<span class="fas fa-pause-circle"></span>'
      : '<span class="fas fa-play-circle"></span>';
  });
});