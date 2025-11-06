import { FORMULARIO } from './constantes.js';
import { validaciones } from './validaciones.js';
import { alerta } from './alerta.js';
const INPUT_NOMBRE = document.querySelector(".inputNombre");
const INPUT_EMAIL = document.querySelector(".inputEmail");
const INPUT_TELEFONO = document.querySelector(".inputTelefono");
const INPUT_TEXTAREA = document.querySelector(".inputTextarea");
const BTN = document.querySelector('.botonEnviar');
const TEXTAREA_CARACTERES=document.querySelector('.textarea-caracteres');
const MAX_CARACTER=INPUT_TEXTAREA.getAttribute("maxlenght");

INPUT_NOMBRE.addEventListener("input", validar);
INPUT_EMAIL.addEventListener("input", validar);
INPUT_TELEFONO.addEventListener("input", validar);
INPUT_TEXTAREA.addEventListener("input", validar);
const alert=new alerta();
const valid=new validaciones();

function validar(e) {
    console.log(e.target.value.length);
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
        alert.mostrarAlerta(`* Sin puntos ni espacios`, e.target.parentElement);
        comprobarFormulario();
        return
    }
    if(e.target.id === 'mensaje' && e.target.value.length < 200  ){
        restarCaracteres(e);
    }
    alert.limpiarAlerta(e.target.parentElement);
    FORMULARIO[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(FORMULARIO)

}
function comprobarFormulario() {
    if (Object.values(FORMULARIO).includes('')) {
        BTN.disabled = true;
        return
    }
    BTN.disabled = false;
}
function restarCaracteres(e){
    const texto=e.target.value.length;
    const resto=texto-MAX_CARACTER;
    TEXTAREA_CARACTERES.textContent -=resto;
}




