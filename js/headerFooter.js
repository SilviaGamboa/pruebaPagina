

    

    // Llamar a las funciones para cargar el header y el footer cuando el documento esté listo
    document.addEventListener('DOMContentLoaded', function() {
        cargarHeader();
        cargarFooter();
    });
     // Función para cargar el contenido del header
     function cargarHeader() {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-container').innerHTML = data;
            });
    }

    // Función para cargar el contenido del footer
    function cargarFooter() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-container').innerHTML = data;
            });
    }


