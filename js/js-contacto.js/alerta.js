export class alerta{
    constructor(){}

     mostrarAlerta(mensaje, refencia) {
        const claseAlerta = refencia.querySelector(".js-estilo-alerta");
        if (claseAlerta) {
            claseAlerta.remove();
        }
        const alerta = document.createElement("h2");
        alerta.textContent = mensaje;
        alerta.classList.add("js-estilo-alerta");
        refencia.appendChild(alerta);
    }
     limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".js-estilo-alerta");
        if (alerta) {
            alerta.remove();
        }
    }
    

}