document.querySelector(".shuffle-btn").addEventListener("click", function () {
  this.classList.toggle("text-success");
});

document.querySelector(".repeat-btn").addEventListener("click", function () {
  this.classList.toggle("text-success");
});

const firstSection = document.getElementById("top-page-artist");
const randomAlbums = document.getElementById("randomAlbums");
const footer = document.getElementById("footer");

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

      const homePageArtist = document.createElement("div");
      homePageArtist.innerHTML = `<div class="d-flex align-items-center">
          <img
            src="${artist.picture_xl}"
            alt="Img: ${artist.name}"
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
              <a href="./artist.html?q=${artist.name}" target="_blank" class="btn btn-outline-light mx-2">Altro</a>
            </div>
          </div>
        </div>`;

      firstSection.appendChild(homePageArtist);
      getFooterInfo(album.cover, album.title, artist.name);

      let albumIdArray = [];
      let randomId = [];

      data.forEach((element) => {
        let albumId = element.album.id;
        albumIdArray.push(albumId);
      });

      while (randomId.length < 12) {
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
          const cardDiv = document.createElement("div");
          cardDiv.classList.add(
            "col-12",
            "col-sm-6",
            "col-md-4",
            "col-lg-3",
            "mb-3"
          );
          cardDiv.innerHTML = `<div class="card text-white text-center" style="background-color: #212121">
        <img src="${album.cover}" alt="${album.title}" class="card-img-top" />
        <div class="card-body d-flex flex-column justify-content-between" style="height: 210px">
          <h6 class="card-title">${album.title}</h6>
          <a href="./album.html?id=${album.id}" target="_blank" class="btn btn-outline-light">Tracklist</a>
        </div>
      </div>`;
          randomAlbums.appendChild(cardDiv);
        }
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Prende il valore dall'input
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();

  // .elements accede solamente agli elementi che sono figli di un form
  const searchInput = searchBar.elements["searchInput"].value.toLowerCase();
  firstSection.innerHTML = "";
  randomAlbums.innerHTML = "";
  getArtistData(searchInput);
});

function getFooterInfo(img, title, artist) {
  const footerInfo = document.createElement("div");
  footerInfo.classList.add("d-flex", "align-items-center");
  footerInfo.innerHTML = `
    <img
      src="${img}"
      alt="${title}"
      class="rounded me-2"
      style="width: 50px; height: 50px"
    />
    <div>
      <p class="mx-2 mb-0">${title}</p>
      <p class="mx-2 mb-0 text-muted">${artist}</p>
    </div>`;
  footer.prepend(footerInfo);
}

getArtistData("lady gaga");
