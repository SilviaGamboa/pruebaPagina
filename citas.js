
document.addEventListener("DOMContentLoaded", function() {

    const calendario = document.querySelector(".calendario"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".dias"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper "),
    addEventCloseBtn = document.querySelector(".close "),
    addEventTitle = document.querySelector(".event-name "),
    addEventFrom = document.querySelector(".event-time-from "),
    addEventSubmit = document.querySelector(".add-event-btn ");

    

      let usuario=JSON.parse(localStorage.getItem('usuario'));
      let usuariocomp=usuario._cedula;
      let today = new Date();
      let activeDay;
      let month = today.getMonth();
      let year = today.getFullYear();
      let dayName;
      let  medicos;
      

      
  
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
    ];
  
    const eventsArr = [];
    const eventosUsuarioArray=[];
      getEvents();
      console.log(eventsArr);
  
  //agregar días con la clase día y fecha anterior, fecha siguiente en los días del mes anterior y del mes siguiente y activa hoy
  function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
    
  
    date.innerHTML = months[month] + " " + year;
  
    let days = "";
  
    for (let x = day; x > 0; x--) {
      days += `<div class="dia mes-anterior">${prevDays - x + 1}</div>`;
    }

    


  
    for (let i = 1; i <= lastDate; i++) {
      //comprueba si hay un evento ese día
     
      let event = false;
      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year  
        ) {
          event = true;
        
        }
      });
      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth() 
      ) {
        activeDay = i;
        getActiveDay(i);
        updateEvents(i);
        if (event) {
          days += `<div class="dia event activo">${i}</div>`;
        } else {
          days += `<div class="dia event activo">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="dia event">${i}</div>`;
        } else {
          days += `<div class="dia ">${i}</div>`;
        }
      }
    }
  
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="dia siguiente-mes">${j}</div>`;
    }
    
    
    daysContainer.innerHTML = days;
    addListner();
  }
  
  //función para agregar mes y año en el botón anterior y siguiente
  function prevMonth() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    initCalendar();
  }
  
  
  function nextMonth() {
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      initCalendar();
    }
    
    prev.addEventListener("click", prevMonth);
    next.addEventListener("click", nextMonth);
    
    initCalendar();
  
    //Función para hacer activo el día
  function addListner() {
      const days = document.querySelectorAll(".dia");
      days.forEach((day) => {
        day.addEventListener("click", (e) => {
          getActiveDay(e.target.innerHTML);
          updateEvents(Number(e.target.innerHTML));
          activeDay = Number(e.target.innerHTML);
          //remover dia activo
          days.forEach((day) => {
            day.classList.remove("activo");
          });
          //si se hace clic en fecha anterior o fecha siguiente, se cambie a ese mes
          if (e.target.classList.contains("prev-date")) {
            prevMonth();
            //agregar el activo al día que se hace clik al cambiar el mes
            setTimeout(() => {
              //Agregar activo donde no hay fecha anterior o próxima
              const days = document.querySelectorAll(".dia");
              days.forEach((day) => {
                if (
                  !day.classList.contains("prev-date") &&
                  day.innerHTML === e.target.innerHTML
                ) {
                  day.classList.add("activo");
                }
              });
            }, 100);
          } else if (e.target.classList.contains("next-date")) {
            nextMonth();
            //agregar activo al día en el que se hace clic después de que el mes cambia
            setTimeout(() => {
              const days = document.querySelectorAll(".dia");
              days.forEach((day) => {
                if (
                  !day.classList.contains("next-date") &&
                  day.innerHTML === e.target.innerHTML
                ) {
                  day.classList.add("activo");
                }
              });
            }, 100);
          } else {
            e.target.classList.add("activo");
          }
        });
      });
    }
  
    todayBtn.addEventListener("click", () => {
      today = new Date();
      month = today.getMonth();
      year = today.getFullYear();
      initCalendar();
    });
    
    dateInput.addEventListener("input", (e) => {
      dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
      if (dateInput.value.length === 2) {
        dateInput.value += "/";
      }
      if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
      }
      if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
          dateInput.value = dateInput.value.slice(0, 2);
        }
      }
    });
    
    gotoBtn.addEventListener("click", gotoDate);
    
    function gotoDate() {
      
      const dateArr = dateInput.value.split("/");
      if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
          month = dateArr[0] - 1;
          year = dateArr[1];
          initCalendar();
          return;
        }
      }
      alert("Invalid Date");
    }
  
    function getActiveDay(date) {
      const diasSemana = {
        "Sun": "Domingo",
        "Mon": "Lunes",
        "Tue": "Martes",
        "Wed": "Miércoles",
        "Thu": "Jueves",
        "Fri": "Viernes",
        "Sat": "Sábado"
      };
      const day = new Date(year, month, date);
      const dayNameIng = day.toString().split(" ")[0];
      dayName= diasSemana[dayNameIng];
      eventDay.innerHTML = dayName;
      eventDate.innerHTML = date + " " + months[month] + " " + year;
    }
    
    //Función de actualización de eventos cuando un día está activo.
    function updateEvents(date) {
      let events = "";
      eventsArr.forEach((event) => {
        if (
          date === event.day &&
          month + 1 === event.month &&
          year === event.year 
        ) {
         
          event.events.forEach((event) => {
            if(
              event.usuario._cedula===usuariocomp._cedula){
                events += `<div class="event">
                <div class="title">
                  <i class="fas fa-circle"></i>
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
                
            </div>
            `; 
            }
            
          });
        }
      });
      if (events === "") {
        events = `<div class="no-event">
                <h3>No hay citas</h3>
            </div>`;
      }
      eventsContainer.innerHTML = events;
      saveEvents();
      
      
      
    }
    
    //funcion añadir evento
    addEventBtn.addEventListener("click", () => {
      addEventWrapper.classList.toggle("active");
    });
    
    addEventCloseBtn.addEventListener("click", () => {
      addEventWrapper.classList.remove("active");
    });
    
    document.addEventListener("click", (e) => {
      if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
        addEventWrapper.classList.remove("active");
      }
    });
    
    //allow 50 chars in eventtitle
    addEventTitle.addEventListener("input", (e) => {
      addEventTitle.value = addEventTitle.value.slice(0, 60);
    });


    
    //funcion añadir eventos al array
    addEventSubmit.addEventListener("click", () => {
      const eventTitle = addEventTitle.value;
      const medico= document.querySelector(".selecMedico").value;
      const hora = addEventFrom.value;
      const [eventTimeFrom, eventTimeTo]= hora.split("-");

      if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "" || medico === "") {
        alert("Por favor llene todos los campos");
        return;
      }
    
      
    
      const timeFrom = convertTime(eventTimeFrom);
      const timeTo = convertTime(eventTimeTo);
    
      //comprobar que el evento no haya sido añadido
      let medicoOcupado=false;
      let eventExist = false;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((event) => {
            if (event.title === eventTitle || event.timeto===eventTimeTo || event.eventTimeFrom===eventTimeFrom ) {
              if( event.usuario._cedula===usuariocomp._cedula){
                eventExist = true;
              }else{
                if(event.timeto===eventTimeTo && event.medico===medico || event.eventTimeFrom===eventTimeFrom && event.medico===medico){
                    medicoOcupado=true;
                    
                }

              }
              
            }
          });
        }
      });
      if (eventExist) {
        alert("Ya hay una cita agendada a esa hora");
        return;
      }
      if (eventExist) {
        alert("Ya hay una cita agendada a esa hora");
        return;
      }

      
      //comprueba horario medicos
     

      function compruebaHorario(){
        for (let i = 0; i < medicos.length; i++) {
          
          if(medico===medicos[i].getElementsByTagName('nombre')[0].textContent){
            
            const horariodMedico = medicos[i].getElementsByTagName('horariosConsulta')[0].textContent.trim();
          
          return medicosDisponibles(horariodMedico,dayName,hora);
        }
      }
    }
    const disponible = compruebaHorario();
    if(disponible===false){
      alert("Medico no disponible en ese horario");
        return;
    }
       
    
      
      const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
        medico: medico,
        usuario:usuario._cedula,
        
        comfirmada: false
      };
      // console.log(newEvent);
      // console.log(activeDay);

      let eventAdded = false;
      //aqui se agregan los eventos al calendario
      if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
          if (
            item.day === activeDay &&
            item.month === month + 1 &&
            item.year === year 
            
          ) {
            item.events.push(newEvent);
            eventAdded = true;
          }
        });
      }
    
      if (!eventAdded) {
        eventsArr.push({
          day: activeDay,
          month: month + 1,
          year: year,
          events: [newEvent],
        });
      }
    
          console.log(eventsArr);
      addEventWrapper.classList.remove("active");
      addEventTitle.value = "";
      addEventFrom.value = "";
      updateEvents(activeDay);
      //selecciona el día activo y agrega la clase de evento si no se agrega
      const activeDayEl = document.querySelector(".dia.activo");
      if (!activeDayEl.classList.contains("event")) {
        activeDayEl.classList.add("event");
      }
    });//addEventsubmit
    
   
    
    //función para ver la info de la cita cuando se hace clic en el evento
    eventsContainer.addEventListener("click", (e) => {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      
      if (e.target.classList.contains("event")) {
        eventsArr.forEach((event) => {
          
              if (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
              ) {
                event.events.forEach((item, index) => {
                  if (item.title === eventTitle) {
                    const overlay = document.createElement('div');
        overlay.id = 'infoCompletaOverlay';
      
        const container = document.createElement('div');
        container.id = 'infoCompletaContainer';
      
        const closeBtn = document.createElement('span');
        closeBtn.id = 'closeInfoCompleta';
        closeBtn.innerHTML = '&times;';

        const cancelarBtn = document.createElement('div');
        cancelarBtn.id = 'cancelaCita-btn';
        cancelarBtn.innerHTML = 'cancelar';
      
        const content = document.createElement('div');
        content.innerHTML = `<h2>Informacion completa de la cita</h2> 
                          <h3> Tipo de cita</h3><p>${item.title}</p>
                          <h3> Fecha</h3><p>${event.day}/${event.month}/${event.year}</p>
                          <h3> Hora</h3><p>${item.time}</p>
                          <h3> Médico</h3><p>${item.medico}</p>
                          <h3> Confirmada: </h3><p>${item.comfirmada}</p> `;
                                  
        
      
        closeBtn.addEventListener('click', function() {
          overlay.remove();
        });

        //cancela cita 
        cancelarBtn.addEventListener('click', function() {
          if (confirm("Esta seguro de eliminar la cita?")) {
              const eventTitle = e.target.children[0].children[1].innerHTML;
              eventsArr.forEach((event) => {
                if (
                  event.day === activeDay &&
                  event.month === month + 1 &&
                  event.year === year
                ) {
                  event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                      event.events.splice(index, 1);
                    }
                  });
                  //if no events left in a day then remove that day from eventsArr
                  if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    //remove event class from day
                    const activeDayEl = document.querySelector(".dia.activo");
                    if (activeDayEl.classList.contains("event")) {
                      activeDayEl.classList.remove("event");
                    }
                  }
                }
              });
              updateEvents(activeDay);
              overlay.remove();
            }
          
        });
      
        container.appendChild(closeBtn);
        container.appendChild(cancelarBtn);
        container.appendChild(content);
        overlay.appendChild(container);
      
        document.body.appendChild(overlay);
                  }
                });
               
              }
            });
        

      }
    });
   
    
    //function to save events in local storage
    function saveEvents() {
      localStorage.setItem("events", JSON.stringify(eventsArr));
    }
    
    //function to get events from local storage
    function getEvents() {
      //check if events are already saved in local storage then return event else nothing
      if (localStorage.getItem("events") === null) {
        return;
      }
      eventsArr.push(...JSON.parse(localStorage.getItem("events")));
    }
    
    function convertTime(time) {
      //convert time to 24 hour format
      let timeArr = time.split(":");
      let timeHour = timeArr[0];
      let timeMin = timeArr[1];
      let timeFormat = timeHour >= 12 ? "PM" : "AM";
      timeHour = timeHour % 12 || 12;
      time = timeHour + ":" + timeMin + " " + timeFormat;
      return time;
    }



     // Obtener la referencia al elemento select
     const departamentoSelect = document.getElementById("departamento");
     const selectMedico = document.querySelector('.selecMedico');
   
     departamentoSelect.addEventListener("change", (event) => {
       const opcionSeleccionada = event.target.value;
       console.log("Opción seleccionada:", opcionSeleccionada);
   
       // Limpiar opciones anteriores en el selectMedico
       selectMedico.innerHTML = '<option value="">Seleccionar Médico</option>';
       
       
    
   
   
       const xhr = new XMLHttpRequest();
       xhr.open('GET', 'js/medicos.xml', true);
       xhr.onreadystatechange = function() {
         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const xmlDoc = xhr.responseXML;
           medicos = xmlDoc.getElementsByTagName('medico');
   
           for (let i = 0; i < medicos.length; i++) {
             const especialidadMedico = medicos[i].getElementsByTagName('especialidad')[0].textContent;
             

             if (especialidadMedico.includes(opcionSeleccionada)) {
               const nombreMedico = medicos[i].getElementsByTagName('nombre')[0].textContent;
               const option = document.createElement('option');
               option.value = nombreMedico;
               option.textContent = nombreMedico;
               selectMedico.appendChild(option);
             }
           }
         }
       };

      
       
    console.log(dayName);
       xhr.send();
     });
    
     //comprueba que el medico esté disponible
     function medicosDisponibles(horarioTexto, diaSelec, horaSelec){
      let horarioTrabajo = {
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false,
        horaInicio: '',
        horaFin: ''
    };
    let dentroHorario=false;
    
       

    // Separar la cadena en dos partes: días y hora
    let separador = horarioTexto.indexOf(':');
    let dias = horarioTexto.substring(0, separador).trim();
    let hora = horarioTexto.substring(separador + 1).trim();
    let [horaInicio, horaFin] = hora.split('-');
  let [horaInicioSelec, horaFinSelec] = horaSelec.split('-');

    if(dias.includes("Lunes a Sábado")){
      horarioTrabajo.lunes = true;
      horarioTrabajo.martes = true;
      horarioTrabajo.miercoles = true;
      horarioTrabajo.jueves = true;
      horarioTrabajo.viernes = true;
      horarioTrabajo.sabado =true;

    }
    if(dias==="Domingo a Viernes"){
      horarioTrabajo.domingo=true;
      horarioTrabajo.lunes = true;
      horarioTrabajo.martes = true;
      horarioTrabajo.miercoles = true;
      horarioTrabajo.jueves = true;
      horarioTrabajo.viernes = true;
    }

    let [horarioMedInic]= horaInicio.split(':').map(Number);
    let [horarioMedFin] = horaFin.split(':').map(Number);
    let [horaSelecInic ]= horaInicioSelec.split(':').map(Number);
    let [horaSelecFin] = horaFinSelec.split(':').map(Number);
    console.log("dentro metodo","dias",dias,"Hora",horarioMedInic,horarioMedFin, "Hora selec:", horaSelecInic, horaSelecFin  );
    console.log(horarioTrabajo)

    
    if(diaSelec === "Lunes" && horarioTrabajo.lunes ||
    diaSelec === "Martes" && horarioTrabajo.martes ||
    diaSelec === "Miércoles" && horarioTrabajo.miercoles ||
    diaSelec === "Jueves" && horarioTrabajo.jueves ||
    diaSelec === "Viernes" && horarioTrabajo.viernes ||
    diaSelec === "Sábado" && horarioTrabajo.sabado ||
    diaSelec === "Domingo" && horarioTrabajo.domingo)
    {
      dentroHorario=true;
    }else{
      dentroHorario=false;
    }
    if(horaSelecInic>=horarioMedInic && horaSelecFin<=horarioMedFin ){
      dentroHorario=true;
    }else{
      dentroHorario=false;
    }




    return dentroHorario;

     }

     //console.log("probandoMetodo:", medicosDisponibles( 'Lunes a Sábado: 17:00-18:00', dayName, "08:00-09:00" ));



});

