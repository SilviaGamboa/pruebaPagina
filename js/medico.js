

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
  
    fetch('js/medicos.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const medicos = xmlDoc.querySelectorAll('medico');
  
        const medicosNombres = Array.from(medicos).map(medico => medico.querySelector('nombre').textContent.toLowerCase());
        const medicosEspecialidad = Array.from(medicos).map(medico => medico.querySelector('especialidad').textContent.toLowerCase());
        const medicosUbicacion = Array.from(medicos).map(medico => medico.querySelector('ubicacionConsulta').textContent.toLowerCase());
       
        const todo =[...medicosNombres, ...medicosEspecialidad, ...medicosUbicacion];

        const awesompletee = new Awesomplete(searchInput, {
          list: todo,
          minChars: 1, // Número mínimo de caracteres para activar el autocompletado
          maxItems: 5, // Número máximo de elementos a mostrar en la lista de autocompletado
          autoFirst: true // Mostrar la lista de autocompletado automáticamente al empezar a escribir
        });
      })

      .catch(error => {
        console.error('Error al cargar el archivo XML:', error);
      });
  
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
      const searchTerm = searchInput.value.toLowerCase().trim(); // Obtener el término de búsqueda
  
      fetch('js/medicos.xml')
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const medicos = xmlDoc.querySelectorAll('medico');
  
          const medicosList = document.getElementById('medicosList');
          medicosList.innerHTML = ''; // Limpiar la lista antes de agregar resultados
          

          
  
          medicos.forEach(medico => {
            const id = medico.querySelector('idMedico').textContent  
            const nombre = medico.querySelector('nombre').textContent;
            const especialidad = medico.querySelector('especialidad').textContent;
            const ubicacion = medico.querySelector('ubicacionConsulta').textContent;
            const horarioConsulta= medico.querySelector('horariosConsulta').textContent;
            const numeroTel= medico.querySelector('numeroTel').textContent;
            const correo= medico.querySelector('correo').textContent;
            const reseñas= medico.querySelector('reseñas').textContent;
            const bibliografia = medico.querySelector('biografia').textContent;
  
            // Filtros
            if (especialidad.toLowerCase().includes(searchTerm) || nombre.toLowerCase().includes(searchTerm) || id.toLowerCase().includes(searchTerm) || ubicacion.toLowerCase().includes(searchTerm)) {
              const listItem = document.createElement('li');
              listItem.textContent = `${id} -${nombre} - ${especialidad} - ${ubicacion}`;
  
              // Agregar evento click para mostrar información completa
              listItem.addEventListener('click', function() {
                mostrarInfoCompleta(id, nombre, especialidad, ubicacion,horarioConsulta,numeroTel,correo,reseñas, bibliografia);
              });
  
              medicosList.appendChild(listItem);
            }
          });
        })
        .catch(error => {
          console.error('Error al cargar el archivo XML:', error);
        });
    });
  
    function mostrarInfoCompleta(id, nombre, especialidad, ubicacion,horarioConsulta,numeroTel,correo,reseñas, bibliografia) {
        const overlay = document.createElement('div');
        overlay.id = 'infoCompletaOverlay';
      
        const container = document.createElement('div');
        container.id = 'infoCompletaContainer';
      
        const closeBtn = document.createElement('span');
        closeBtn.id = 'closeInfoCompleta';
        closeBtn.innerHTML = '&times;';
      
        const content = document.createElement('div');
        content.innerHTML = `<h2>Informacion completa del Médico</h2> 
                          <h3> ID Médico</h3><p>${id}</p>
                          <h3> Nombre Completo</h3><p>${nombre}</p>
                          <h3> Especialidad</h3><p>${especialidad}</p>
                          <h3> Ubicación de Consulta</h3><p>${ubicacion}</p>
                          <h3> Horarios de Consulta</h3><p>${horarioConsulta}</p>
                          <h3> Información de contacto </h3><p>Telefono: ${numeroTel} </p><p>Correo: ${correo}</p>
                          <h3> Reseñas</h3><p>${reseñas}</p>
                          <h3> Biografía</h3><p>${bibliografia}</p>`;
                                  
        
      
        closeBtn.addEventListener('click', function() {
          overlay.remove();
        });
      
        container.appendChild(closeBtn);
        container.appendChild(content);
        overlay.appendChild(container);
      
        document.body.appendChild(overlay);
      }







  });
  

  
     
  
