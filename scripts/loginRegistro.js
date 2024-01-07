document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const usuario = document.getElementById("form_usuario");
    const contraseña = document.getElementById("form_contraseña");
    const usuarioError = document.querySelector("#form_usuario + span.popuptext");
    const contraseñaError = document.querySelector("#form_contraseña + span.popuptext");

    form.addEventListener("submit", (event) => {
        if (!usuario.validity.valid || !contraseña.validity.valid) {
            event.preventDefault();
        }
    });

    const enviarButton = document.querySelector('button[type="button"]');

    enviarButton.addEventListener("click", () => {
        var isValid = true;

        if (!usuario.validity.valid) {
            handleValidation(usuario, usuarioError);
            isValid = false;
        }

        if (!contraseña.validity.valid) {
            handleValidation(contraseña, contraseñaError);
            isValid = false;
        }

        if (isValid) {
            form.submit();
        }
    });

    function handleValidation(element, errorElement) {

        if (element.validity.valueMissing) {
            errorElement.textContent = "Campo obligatorio";
        } else if (element.validity.typeMismatch) {
            errorElement.textContent = "Debe ser un email";
        } else if (element.validity.tooShort) {
            errorElement.textContent = "Debe tener al menos 8 caracteres";
        } else if (element.validity.tooLong) {
            errorElement.textContent = "Debe tener menos de 16 caracteres";
        } else if (element.validity.patternMismatch) {
            errorElement.textContent = "Debe tener al menos una mayúscula, una minúscula, un número y un caracter especial";
        } else {
            errorElement.textContent = "";
        }

        errorElement.classList.toggle("show", !element.validity.valid);

        setTimeout(() => {
            errorElement.classList.remove("show");
        }, 2500);
    }
});
