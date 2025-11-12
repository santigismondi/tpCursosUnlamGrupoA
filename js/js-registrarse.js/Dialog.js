export class Dialog {
    constructor(){}

    render(mensaje){
        const BtnDialogo=document.querySelector('#btnRegistrar');
        const modal=document.querySelector('.modal');
        const close=document.querySelector(' .cerrarDialog');
        const mensajeDialog=document.querySelector('.mensajeDialog');
        mensajeDialog.textContent=mensaje;
        BtnDialogo.addEventListener('click', (e)=>{            
         modal.showModal();            
        })

        close.addEventListener('click', (e)=>{            
          modal.close();            
        })
    }
}