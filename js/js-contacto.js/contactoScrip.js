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

function validar(e) {

    const tipo = e.target.id;
    switch (tipo) {
        case 'nombre':
            espaciosVacios(e);
            break
        case 'email':
            espaciosVacios(e);
            verificarEmail(e);
            break
        case 'tel':
            espaciosVacios(e);
            verificarTelefono(e);
            break
        case 'mensaje':
            espaciosVacios(e);
            verificarTextarea(e);
            break
    }
   

    function verificacionGeneral() {
        alert.limpiarAlerta(e.target.parentElement);
        FORMULARIO[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarFormulario();
    }

    function espaciosVacios(e) {
        if (e.target.value.trim() === "") {
            alert.mostrarAlerta(`* El campo ${e.target.value} es obligatorio`, e.target.parentElement);
            return
        } verificacionGeneral();
    }
    function verificarEmail(e) {
        if (e.target.id === 'email' && !valid.validarCampo(e.target.value)) {
            alert.mostrarAlerta(`* El Email no es valido`, e.target.parentElement);
            comprobarFormulario();
            return
        } verificacionGeneral();
    }
    function verificarTelefono(e) {
        if (e.target.id === 'tel' && !valid.validarTelefono(e.target.value)) {
            alert.mostrarAlerta(`* N° de telefono sin puntos ni espacio`, e.target.parentElement);
            comprobarFormulario();
            return
        } verificacionGeneral();
    }
    function verificarTextarea(e) {
        if (e.target.id === 'mensaje' && (e.target.value.length < 40)) {
            
            cont.restarCaracteres(e);
            FORMULARIO[e.target.name] = e.target.value.trim().toLowerCase();
            comprobarFormulario();
            console.log(cont.restarCaracteres(e))
            return
        }else if(cont.restarCaracteres(e) <= 0){
            alert.mostrarAlerta(`* Maximo 40 caracteres`, e.target.parentElement);
            return
        }
         verificacionGeneral();
    }
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
const dialogo = new Dialogo();
 dialogo.render();







