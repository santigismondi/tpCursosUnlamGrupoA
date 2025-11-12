    document.addEventListener("DOMContentLoaded", () => {
        const totalPrecio = document.getElementById("totalPrecio");
        const botonPagar = document.getElementById("confirmar");

        const montoGiftCardString = localStorage.getItem("montoGiftCard");
        let montoGiftCard = 0;

        if (montoGiftCardString) {
            montoGiftCard = parseFloat(montoGiftCardString);
            if (isNaN(montoGiftCard)) {
                montoGiftCard = 0;
                console.error("El monto recuperado de localStorage no es un número válido.");
            }
        }

        if (montoGiftCard > 0) {
            totalPrecio.textContent = `Total a pagar: ${montoGiftCard}`;
        } else {
            totalPrecio.textContent = "Monto no disponible.";
            if (botonPagar) {
                botonPagar.disabled = true; 
            }
        }

        if (botonPagar) {
            botonPagar.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (montoGiftCard <= 0) {
                    alert("⚠️ El monto de la Gift Card no es válido. Por favor, vuelve a la página anterior.");
                    return;
                }

                const metodoSeleccionado = document.querySelector('input[name="pago"]:checked');
                if (!metodoSeleccionado) {
                    alert("⚠️ Por favor seleccioná un método de pago antes de confirmar.");
                    return;
                }

                if (metodoSeleccionado.value === "tarjeta") {
                    const numeroTarjeta = document.querySelector('input[placeholder="XXXX XXXX XXXX XXXX"]').value.trim();
                    const cvv = document.querySelector('input[placeholder="CVV"]').value.trim();

                    const soloNumerosTarjeta = numeroTarjeta.replace(/\D/g, "");
                    const soloNumerosCVV = cvv.replace(/\D/g, "");

                    if (!soloNumerosTarjeta || !soloNumerosCVV) {
                        alert("⚠️ Por favor completá los datos de tu tarjeta antes de confirmar.");
                        return;
                    }

                    if (soloNumerosTarjeta.length !== 16) {
                        alert("⚠️ El número de tarjeta debe tener 16 dígitos.");
                        return;
                    }

                    if (soloNumerosCVV.length !== 3) {
                        alert("⚠️ El CVV debe tener 3 dígitos.");
                        return;
                    }
                }
                
                

                const modal = document.getElementById("modalPago");
                const detalle = document.getElementById("detallePagoCursos"); 
                const cerrar = document.getElementById("cerrarModalPago");
                const btnIrInicio = document.getElementById("btnIrInicio");

                detalle.innerHTML = `
                    <p>La compra de tu Gift Card por un valor de <strong>${montoGiftCard.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })}</strong> ha sido exitosa.</p>
                    <p>¡Gracias por tu compra!</p>
                `;

                modal.style.display = "block";

                cerrar.onclick = () => modal.style.display = "none";
                btnIrInicio.onclick = () => {
                    modal.style.display = "none";

                    window.location.href = "../html/inicio.html"; 
                };
                window.onclick = (e) => {
                    if (e.target === modal) modal.style.display = "none";
                };
            });
        }

        renderizarMonto();
    });