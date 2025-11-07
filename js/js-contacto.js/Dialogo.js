export class Dialogo{
    constructor(){}

    render(){
        const Btndialogo=document.querySelector('.botonEnviar');
        const modal=document.querySelector('.modal');
        const close=document.querySelector('.modal .cerrarDialog');
        console.log(Btndialogo,modal,close)
        Btndialogo.addEventListener('click', (e)=>{
            alert('lalala')
          modal.showModal();
            
        })
        close.addEventListener('click', (e)=>{
            
          modal.closeModal();
            
        })
    }
}