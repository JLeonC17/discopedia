document.addEventListener('DOMContentLoaded', (event) => {

    const datos = document.querySelectorAll('.datos');
    const imagen = document.querySelectorAll('.imagen');

    datos.forEach((datos, index) => {
        datos.addEventListener('mouseover', () => {
            imagen[index].classList.add('colorful_shadow_util');
        });

        datos.addEventListener('mouseout', () => {
            imagen[index].classList.remove('colorful_shadow_util');
        });
    });

    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl != this) {
            this.parentNode.insertBefore(dragSrcEl, this);
        }

        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    var items = document.querySelectorAll('.album_container .album');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });

    const albumContainers = document.querySelectorAll('.album_container');

    albumContainers.forEach(container => {
        container.addEventListener('dragover', handleDragOver, false);
        container.addEventListener('drop', handleDrop, false);
    });

    function handleDragOverContainer(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDropContainer(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        const targetContainer = e.target.closest('.album_container');

        if (dragSrcEl !== null && targetContainer) {
            targetContainer.appendChild(dragSrcEl);
        }

        return false;
    }

    albumContainers.forEach(container => {
        container.addEventListener('dragover', handleDragOverContainer, false);
        container.addEventListener('drop', handleDropContainer, false);
    });
});