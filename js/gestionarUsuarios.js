import { Usuario } from './usuario.js';

export class GestionarUsuarios {
    
    constructor() {
        this.ruta = 'usuarios.xml';
        this.document = null;
        this.root = null;

        this.cargarDocumento();
    }

    cargarDocumento() {
        const xmlString = this.leerArchivo(this.ruta);
        if (xmlString) {
            this.document = new DOMParser().parseFromString(xmlString, 'text/xml');
            this.root = this.document.documentElement;
        } else {
            this.crearDocumentoInicial();
        }
    }

    leerArchivo(ruta) {
        try {
            return localStorage.getItem(ruta);
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return null;
        }
    }

    crearDocumentoInicial() {
        this.document = new DOMParser().parseFromString('<usuarios></usuarios>', 'text/xml');
        this.root = this.document.documentElement;
        this.guardarXML();
    }

    guardarXML() {
        const xmlString = new XMLSerializer().serializeToString(this.document);
        try {
            localStorage.setItem(this.ruta, xmlString);
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }
    }

    async guardarUsuario(usuario) {
        const eUsuario = this.document.createElement('Usuario');
        eUsuario.setAttribute('cedula', usuario._cedula); 

        const eNombre = this.document.createElement('nombre');
        eNombre.textContent = usuario._nombre;

        const eApellidos = this.document.createElement('apellidos');
        eApellidos.textContent = usuario._apellidos;

        const eNumTelefono = this.document.createElement('numTelefono');
        eNumTelefono.textContent = usuario._numTelefono;

        const eCorreo = this.document.createElement('correo');
        eCorreo.textContent = usuario._correo;

        // Encriptar la contraseña con SHA-256
        const eContrasenna = this.document.createElement('contrasenna');
        eContrasenna.textContent = this.encriptarContrasenna(usuario._contrasenna);

        eUsuario.appendChild(eNombre);
        eUsuario.appendChild(eApellidos);
        eUsuario.appendChild(eNumTelefono);
        eUsuario.appendChild(eCorreo);
        eUsuario.appendChild(eContrasenna);

        this.root.appendChild(eUsuario);
        this.guardarXML();
        return true;
    }

    // Función para encriptar la contraseña utilizando SHA-256
    encriptarContrasenna(contrasenna) {
        const sha256Hash = CryptoJS.SHA256(contrasenna).toString(CryptoJS.enc.Base64);
        return sha256Hash;
    }

    recuperarUsuarios() {
        const usuarios = [];
        const elementListUsuarios = this.root.querySelectorAll('Usuario');

        elementListUsuarios.forEach(eUsuario => {
            const usuario = new Usuario(
                eUsuario.getAttribute('cedula'),
                eUsuario.querySelector('nombre').textContent,
                eUsuario.querySelector('apellidos').textContent,
                eUsuario.querySelector('numTelefono').textContent,
                eUsuario.querySelector('correo').textContent,
                eUsuario.querySelector('contrasenna').textContent
            );
            usuarios.push(usuario);
        });

        return usuarios;
    }

     validarUsuario(cedula, contrasenna) {
        const usuarios = this.recuperarUsuarios();
        const usuario = usuarios.find(u => u._cedula === cedula);
    
        if (!usuario) {
            return false; // El usuario no existe, por lo tanto la validación es incorrecta
        }
    
        // En este punto, deberías encriptar la contraseña ingresada y luego compararla con la contraseña encriptada almacenada en el usuario
        const contrasennaEncriptada = this.encriptarContrasenna(contrasenna); // Suponiendo que tienes un método para encriptar contraseñas
    
        const contrasennaValida = contrasennaEncriptada === usuario._contrasenna;
    
        return contrasennaValida;
    }

    recuperarUsusuarioByCedula(cedula) {
        const usuarios = this.recuperarUsuarios();
        const usuario = usuarios.find(u => u._cedula === cedula);

        if (!usuario) {
            return false; 
        } else {
            return usuario;
        }
    }

    validarDatosRepetidos(cedula, numeroTel, correo){
        const usuarios = this.recuperarUsuarios();
        const usuario = usuarios.find(u => u._cedula === cedula || u._numTelefono === numeroTel || u._correo === correo);

        if (!usuario) {
            return true; 
        }else{
            return false
        }

    }
}



