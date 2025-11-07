import { TEXTAREA_CARACTERES,MAX_CARACTER } from "./constantes.js";


export class contador{
    constructor(){}

    restarCaracteres(e){
    const texto=e.target.value.length;    
    const cantidad=MAX_CARACTER;
    let disponible=cantidad-texto
      return  TEXTAREA_CARACTERES.innerHTML=disponible

   
}
}