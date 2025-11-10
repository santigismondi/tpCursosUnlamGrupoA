export class Dialogo{
    constructor(){}

    render(){
        const BtnDialogo=document.querySelector('.botonEnviar');
        const modal=document.querySelector('.modal');
        const close=document.querySelector(' .cerrarDialog');
        
        BtnDialogo.addEventListener('click', (e)=>{            
         modal.showModal();            
        })

        close.addEventListener('click', (e)=>{            
          modal.close();            
        })
    }
}