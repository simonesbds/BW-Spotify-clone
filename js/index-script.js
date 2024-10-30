document.querySelector(".shuffle-btn").addEventListener("click", function () {
  this.classList.toggle("text-success");
});

document.querySelector(".repeat-btn").addEventListener("click", function () {
  this.classList.toggle("text-success");
}); 


// prendo l'elemento dove appendere il div con all'interno il nome dell'artista, img dell'artista e i 4 album
const main = document.querySelector("main");

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

      // filtra i risultati per includere solo gli album dell’artista specifico
      let artistAlbums = data.filter(
        (item) => item.artist.name.toLowerCase() === artist.toLowerCase()
      );

      if (artistAlbums.length === 0) {
        alert("Nessun risultato trovato per l'artista specificato.");
        return;
      }

      // estrarre le informazioni dell’artista
      let artistInfo = artistAlbums[0].artist;

      // rimuovi duplicati di album usando un Set per l'ID
      let uniqueAlbums = [];
      let albumIds = new Set();
      for (let item of artistAlbums) {
        if (!albumIds.has(item.album.id)) {
          albumIds.add(item.album.id);
          uniqueAlbums.push(item.album);
        }
      }

      // mescola gli album in ordine casuale
      uniqueAlbums = uniqueAlbums.sort(() => Math.random() - 0.5);

      // prendi i primi 4 album mescolati
      let selectedAlbums = uniqueAlbums.slice(0, 4);

      // popola l'HTML con le informazioni dell'artista e i suoi album casuali
      main.innerHTML = `
        <div class="container-fluid">
          <img src="${artistInfo.picture_medium}" alt="${artistInfo.name}" />
          <h2><a href="pagina artista">${artistInfo.name}</a></h2>
          <div id="artist-albums">
            ${selectedAlbums
              .map((album) => {
                return `
                <div class="album">
                  <img src="${album.cover_medium}" alt="${album.title}">
                  <h3>${album.title}</h3>
                </div>`;
              })
              .join("")}
          </div>
          <a class="btn btn-primary" href="pagina album">Vai alla sezione album</a>
        </div>
      `;
    })
    .catch((error) => console.error("Error:", error));
}

getArtistData("club dogo");

/*
// Prende il valore dall'input
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();

  // .elements accede solamente agli elementi che sono figli di un form
  const searchInput = searchBar.elements["searchInput"].value.toLowerCase();
  artist = searchInput;
});
*/
