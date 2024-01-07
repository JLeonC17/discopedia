document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const titulo = document.getElementById("form_titulo");
    const artista = document.getElementById("form_artista");
    const tituloError = document.querySelector("#form_titulo + span.validation_popuptext");
    const artistaError = document.querySelector("#form_artista + span.validation_popuptext");

    form.addEventListener("submit", (event) => {
        if (!titulo.validity.valid && !artista.validity.valid) {
            event.preventDefault();
            handleValidation(titulo, tituloError);
            handleValidation(artista, artistaError);
        }
    });

    const buscarButton = document.querySelector('button[type="button"]');

    titulo.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            buscarButton.click();
        }
    });

    artista.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            buscarButton.click();
        }
    });


    buscarButton.addEventListener("click", () => {
        var isValid = true;

        if (!titulo.validity.valid && !artista.validity.valid) {
            handleValidation(titulo, tituloError);
            handleValidation(artista, artistaError);
            isValid = false;
        } else {
            getAlbumDataFromDiscogs(titulo.value.trim(), artista.value.trim());
        }
    });

    function handleValidation(element, errorElement) {
        if (element.validity.valueMissing) {
            errorElement.textContent = "Campo obligatorio";
        } else {
            errorElement.textContent = "";
        }

        errorElement.classList.toggle("show", !element.validity.valid);

        setTimeout(() => {
            errorElement.classList.remove("show");
        }, 2500);
    }

    function getAlbumDataFromDiscogs(titulo, artista) {
        const resultsArray = [];

        function fetchData(url) {
            return fetch(url, {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => {
                    resultsArray.push(...json);
                });
        }

        fetchData(`http://localhost:8080/api/discogs?titulo=${titulo}&artista=${artista}`)
            .then(() => processResponse(resultsArray))
            .catch(error => {
                console.error("Error al hacer request a la API", error);
            });
    }

    function displaySearch(list) {
        const albumContainer = document.querySelector(".album_container");

        albumContainer.innerHTML = "";

        list.forEach((element) => {
            const albumDiv = document.createElement("div");
            albumDiv.className = "album";

            const imagenDiv = document.createElement("div");
            imagenDiv.className = "imagen colorful_shadow";
            imagenDiv.style.backgroundImage = `url(${element.image})`;

            const datosDiv = document.createElement("div");
            datosDiv.className = "datos";

            const artistTituloSpan = document.createElement("span");
            artistTituloSpan.className = "artistaTitulo";
            artistTituloSpan.textContent = element.artistaTitulo;

            const añoSpan = document.createElement("span");
            añoSpan.className = "año";
            añoSpan.textContent = element.año;

            albumDiv.appendChild(imagenDiv);
            datosDiv.appendChild(artistTituloSpan);
            datosDiv.appendChild(añoSpan);
            albumDiv.appendChild(datosDiv);
            albumContainer.appendChild(albumDiv);

            albumDiv.addEventListener("click", () => {
                document.querySelectorAll(".album").forEach((album) => {
                    album.classList.remove("seleccionado");
                    album.querySelector(".datos").style.opacity = "";
                    album.querySelector(".datos").style.backdropFilter = "";
                });

                albumDiv.classList.add("seleccionado");
                albumDiv.querySelector(".datos").style.opacity = "1";
                albumDiv.querySelector(".datos").style.backdropFilter = "brightness(15%)";
                displaySelectionPopup(element);
            });
        });
    }

    function displaySelectionPopup(album) {

        const selectionPopupDiv = document.querySelector(".selection_popup-container");
        selectionPopupDiv.classList.add("active");

        const selectionPopupImage = document.querySelector(".selection_popup-container .selection_popup #selection_image");
        selectionPopupImage.style.backgroundImage = `url('${album.image}')`;

        const selectionPopupTitle = document.querySelector(".selection_popup-container .selection_popup .form_datos #selection_title")
        selectionPopupTitle.textContent = album.artistaTituloFull;

        const selectionPopupYear = document.querySelector(".selection_popup-container .selection_popup .form_datos #selection_year")
        selectionPopupYear.textContent = album.año;

        selectionPopupDiv.addEventListener("click", (event) => {
            if (!event.target.closest(".selection_popup")) {
                closeSelectionPopup();
            }
        });
    }

    function closeSelectionPopup() {
        const selectionPopupDiv = document.querySelector(".selection_popup-container");
        selectionPopupDiv.classList.remove("active");
    }

    function processResponse(resultsArray) {

        /*      if (resultsArray.length == 0) {
                 getAlbumDataFromSpotify(titulo, artista)
             }  */

        if (resultsArray.length == 0) {
            alert("No se encontraron resultados");
        }

        const albumsArray = [];

        resultsArray.forEach(element => {
            const isDuplicate = albumsArray.some(someAlbum =>
                someAlbum.artistaTitulo.trim().replace(/[".'!?,\-_¡¿]/g, '') === element.title.trim().replace(/[".'!?,\-_¡¿]/g, '') ||
                someAlbum.masterId == element.master_id
            );

            if (!isDuplicate) {
                var album = {
                    artistaTitulo: (element.title.length >= 100) ? element.title.substring(0, 100).trim() + "..." : element.title.trim(),
                    artistaTituloFull: element.title.trim(),
                    año: element.year,
                    image: element.cover_image,
                    masterId: element.master_id,
                }
                albumsArray.push(album)
            }
        });

        console.log(albumsArray)
        displaySearch(albumsArray)
    }
});