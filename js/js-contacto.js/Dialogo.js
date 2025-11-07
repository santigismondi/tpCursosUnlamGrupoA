export class Dialogo{
    constructor(){}

    render(){
        const Btndialogo=document.querySelector('.botonEnviar');
        const modal=document.querySelector('.js-modal');
        console.log(Btndialogo,modal)
        Btndialogo.addEventListener('click', (e)=>{
            modal.showModal();
            
        })

    }
}