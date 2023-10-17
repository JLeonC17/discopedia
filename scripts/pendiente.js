const calificaciones = document.querySelectorAll('.calificaciones');
const imagen = document.querySelectorAll('.imagen');

calificaciones.forEach((calificacion, index) => {
    calificacion.addEventListener('mouseover', () => {
        imagen[index].classList.add('colorful_shadow_util');
    });

    calificacion.addEventListener('mouseout', () => {
        imagen[index].classList.remove('colorful_shadow_util');
    });
});