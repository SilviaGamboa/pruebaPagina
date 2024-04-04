import { GestionarUsuarios } from "./gestionarUsuarios.js";
import { Usuario } from "./usuario.js";
let intentos = 0;
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const { cedula, contrasenna } = obtenerDatosFormulario();
    const esValido = validarContrasenna(contrasenna) && validarCedula(cedula);

    if (esValido) {
      const gestionarUsuarios = new GestionarUsuarios();

      const existeUsuario =
        gestionarUsuarios.recuperarUsusuarioByCedula(cedula);

      if (existeUsuario) {
        const validarDatosUsuario = gestionarUsuarios.validarUsuario(
          cedula,
          contrasenna
        );

        if (validarDatosUsuario) {
          const usuario = new Usuario(
            gestionarUsuarios.recuperarUsusuarioByCedula(cedula)
          );
          guardarLocalStorage(usuario);
          manejarExito();
        } else {
          contrasennaIncorrecta();
        }
      } else {
        alert("Usuario no existe");
      }
    } else {
      manejarError();
    }
  });
});

const obtenerDatosFormulario = () => {
  const cedula = document.getElementById("cedula").value.trim();
  const contrasenna = document.getElementById("contrasenna").value.trim();
  return { cedula, contrasenna };
};

const validarContrasenna = (contrasenna) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{4,11}$/.test(
    contrasenna
  );

const validarCedula = (cedula) => /^\d{2}-\d{4}-\d{4}$/.test(cedula);

const manejarExito = () => {
  alert("Éxito: Los datos ingresados son válidos.");
  limpiarCamposTexto();
  window.location.replace("agendaCitas.html");
};

const manejarError = () => {
  alert("Error: Los datos ingresados no son válidos.");
};

function contrasennaIncorrecta() {
  intentos++;

  if (intentos >= 3) {
    alert("Ha ingresado la contraseña más de 3 veces");
  } else {
    alert("contrseña incorrecta, numero de intentos: " + intentos + " de: 3");
  }
}

const limpiarCamposTexto = () => {
  const campos = document.querySelectorAll(
    "#formulario input[type='text'], #formulario input[type='password']"
  );
  campos.forEach((campo) => (campo.value = ""));
};

function guardarLocalStorage(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}
