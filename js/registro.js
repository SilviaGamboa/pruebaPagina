
import { GestionarUsuarios } from './gestionarUsuarios.js';
import { Usuario } from './usuario.js';
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { cedula, nombre, apellidos, numtelefono, correo, contrasenna, confirmContrasenna } = obtenerDatosFormulario();
    const esValido = validarCedula(cedula) && validarNombre(nombre) && validarApellidos(apellidos) &&  validarTelefono(numtelefono) && validarCorreo(correo) && validarContrasenna(contrasenna) && confirmarContrasenna(contrasenna, confirmContrasenna);

    if (esValido) {
      const gestionarUsuarios = new GestionarUsuarios();
      
      const usuario = new Usuario(cedula, nombre, apellidos, numtelefono, correo, contrasenna);
     
      if(gestionarUsuarios.validarDatosRepetidos(usuario._cedula, usuario._numTelefono, usuario._correo)){
        const registroExitoso = await gestionarUsuarios.guardarUsuario(usuario);
        if (registroExitoso) {
          manejarExito();
        } else {
          manejarError();
        }

      }else{
        manejarErrorDatosRepetidos();
      }
     

      
    } else {
      manejarError();
    }
  });
});
  
    const obtenerDatosFormulario = () => {
    const cedula = document.getElementById("cedula").value.trim();    
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const numtelefono = document.getElementById("numeroTel").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasenna = document.getElementById("contrasenna").value.trim();
    const confirmContrasenna = document.getElementById("confirmContrasenna").value.trim();    
    return { cedula, nombre, apellidos, numtelefono, correo, contrasenna, confirmContrasenna };
  };
  const validarCedula = (cedula) => /^\d{2}-\d{4}-\d{4}$/.test(cedula);
  const validarNombre = (nombre) => /^[a-zA-Z\s]+$/.test(nombre);
  const validarApellidos = (apellidos) => /^[a-zA-Z\s]+$/.test(apellidos);
  const validarTelefono = (numtelefono) => /^\d{4}-\d{4}$/.test(numtelefono);
  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const validarContrasenna = (contrasenna) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{4,11}$/.test(contrasenna);

  const confirmarContrasenna = (contrasenna, confirmContrasenna) => {
    return contrasenna === confirmContrasenna;
};

  
  const manejarExito = () => {
    alert("Registro Exitoso");

    limpiarCamposTexto();
  };
  
  const manejarError = () => {
    alert("Datos no válidos");
  };

  const manejarErrorDatosRepetidos = () => {
    alert("Datos repetidos");
  };
  
  const limpiarCamposTexto = () => {
    const campos = document.querySelectorAll("#formulario input[type='text'], #formulario input[type='number'], #formulario input[type='tel'], #formulario input[type='email'], #formulario input[type='password']");
    campos.forEach((campo) => (campo.value = ""));
};

  
