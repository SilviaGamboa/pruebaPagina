export class Usuario {
    constructor(cedula, nombre, apellidos, numtelefono, correo, contrasenna, confirmContrasenna) {
        this._cedula = cedula;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._numTelefono = numtelefono;
        this._correo = correo;
        this._contrasenna = contrasenna;
        
    }

    // Getters
    get edula() {
        return this._cedula;
    }

    get nombre() {
        return this._nombre;
    }

    get apellidos() {
        return this._apellidos;
    }

    get numTelefono() {
        return this._numTelefono;
    }

    get correo() {
        return this._correo;
    }

    get contrasenna() {
        return this._contrasenna;
    }

    

    // Setters
    set edula(newEdula) {
        this._cedula = newEdula;
    }

    set nombre(newNombre) {
        this._nombre = newNombre;
    }

    set apellidos(newApellidos) {
        this._apellidos = newApellidos;
    }

    set numTelefono(newNumTelefono) {
        this._numTelefono = newNumTelefono;
    }

    set correo(newCorreo) {
        this._correo = newCorreo;
    }

    set contrasenna(newContrasenna) {
        this._contrasenna = newContrasenna;
    }

    
}