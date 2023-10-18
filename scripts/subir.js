document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const titulo = document.getElementById("form_titulo");
    const artista = document.getElementById("form_artista");
    const año = document.getElementById("form_año");
    const calificacion = document.getElementById("form_calificacion");
    const tituloError = document.querySelector("#form_titulo + span.popuptext");
    const artistaError = document.querySelector("#form_artista + span.popuptext");
    const añoError = document.querySelector("#form_año + span.popuptext");
    const calificacionError = document.querySelector("#form_calificacion + span.popuptext");
    const currentYear = new Date().getFullYear();

    año.setAttribute("max", currentYear);

    form.addEventListener("submit", (event) => {
        if (!titulo.validity.valid || !artista.validity.valid) { //CAMBIAR
            event.preventDefault();
        }
    });

    const enviarButton = document.querySelector('button[type="button"]');

    enviarButton.addEventListener("click", () => {
        var isValid = true;

        if (!titulo.validity.valid) {
            handleValidation(titulo, tituloError);
            isValid = false;
        }

        if (!artista.validity.valid) {
            handleValidation(artista, artistaError);
            isValid = false;
        }

        if (!año.validity.valid) {
            handleAñoValidation(año, añoError);
            isValid = false;
        }

        if (año.value < 1889 || año.value > currentYear) {
            handleAñoValidation(año, añoError);
            isValid = false;
        }

        if (calificacion.value === "none") {
            handleCalificacionValidation(calificacion, calificacionError);
            isValid = false;
        }

        if (isValid) {
            form.submit();
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

    function handleAñoValidation(element, errorElement) {
        if (element.value < 1889 || element.value > currentYear) {
            errorElement.textContent = "Sólo entre 1889 hasta " + currentYear;
        } else if (element.validity.patternMismatch) {
            errorElement.textContent = "Sólo años";
        } else if (element.validity.valueMissing) {
            errorElement.textContent = "Campo obligatorio";
        } else {
            errorElement.textContent = "";
        }

        errorElement.classList.toggle("show", !element.validity.valid || element.value < 1920 || element.value > currentYear);

        setTimeout(() => {
            errorElement.classList.remove("show");
        }, 2500);
    }

    function handleCalificacionValidation(element, errorElement) {
        if (element.value === "none") {
            errorElement.textContent = "Seleccione una";
        }

        errorElement.classList.toggle("show", element.value === "none");

        setTimeout(() => {
            errorElement.classList.remove("show");
        }, 2500);
    }
});