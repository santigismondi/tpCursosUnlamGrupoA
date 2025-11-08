export class Dialogo{
    constructor(){}

    render(){
        const Btndialogo=document.querySelector('.botonEnviar');
        const modal=document.querySelector('.modal');
        const close=document.querySelector(' .cerrarDialog');
        
        Btndialogo.addEventListener('click', (e)=>{            
         modal.showModal();            
        })

        close.addEventListener('click', (e)=>{            
          modal.close();            
        })
    }
}