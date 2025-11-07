import { FORMULARIO } from './constantes.js';
import { validaciones } from './validaciones.js';
import { alerta } from './alerta.js';
import { INPUT_EMAIL, INPUT_NOMBRE, INPUT_TELEFONO, INPUT_TEXTAREA, BTN } from './constantes.js';
import { contador } from './textareaContador.js';
import { Dialogo } from './Dialogo.js';

INPUT_NOMBRE.addEventListener("input", validar);
INPUT_EMAIL.addEventListener("input", validar);
INPUT_TELEFONO.addEventListener("input", validar);
INPUT_TEXTAREA.addEventListener("input", validar);
const alert = new alerta();
const valid = new validaciones();
const cont = new contador();
const dialogo = new Dialogo();

function validar(e) {

    if (e.target.value.trim() === "") {
        alert.mostrarAlerta(`* El campo ${e.target.value} es obligatorio`, e.target.parentElement);
        return
    }
    if (e.target.id === 'email' && !valid.validarCampo(e.target.value)) {
        alert.mostrarAlerta(`* El Email no es valido`, e.target.parentElement);
        comprobarFormulario();
        return
    }
    if (e.target.id === 'tel' && !valid.validarTelefono(e.target.value)) {
        alert.mostrarAlerta(`* N° de telefono sin puntos ni espacio`, e.target.parentElement);
        comprobarFormulario();
        return
    }
    if (e.target.id === 'mensaje'&& !(e.target.value.length<200) ) {   
        console.log(e.target.value.length<20)     
        cont.restarCaracteres(e);
        comprobarFormulario();
        return
    }
    
    alert.limpiarAlerta(e.target.parentElement);
    FORMULARIO[e.target.name] = e.target.value.trim().toLowerCase();
    comprobarFormulario();


}
function comprobarFormulario() {
    if (Object.values(FORMULARIO).includes('')) {
        BTN.disabled = true;
        console.log(FORMULARIO)
        return
    }
    BTN.disabled = false;
    console.log(FORMULARIO)
}
dialogo.render();






