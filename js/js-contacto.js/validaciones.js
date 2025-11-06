export class validaciones {
    constructor() { }

    

    validarCampo(campo) {
        const val = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const resultado = val.test(campo);
        return resultado
    }
    validarTelefono(telefono) {
        const val = /^\+?\d{7,}$/;
        const resultado = val.test(telefono);
        return resultado

    }
}