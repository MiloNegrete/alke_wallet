/**
 * Lógica para Depósito con Saldos y Mensajes Dinámicos
 */

document.addEventListener('DOMContentLoaded', () => {
    const depositForm = document.getElementById('depositForm');
    const depositInput = document.getElementById('depositAmount');
    const displaySaldo = document.getElementById('currentBalance'); // Elemento donde muestras el saldo

    // --- INICIALIZACIÓN ---
    const refrescarInterfazSaldo = () => {
        const saldo = parseFloat(localStorage.getItem('walletBalance')) || 0;
        if (displaySaldo) {
            displaySaldo.textContent = `$${saldo.toLocaleString('es-CL')}`;
        }
    };

    refrescarInterfazSaldo(); // Mostrar saldo apenas carga la página

    // --- EVENTO: Realizar Depósito ---
    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = parseFloat(depositInput.value);

        if (isNaN(amount) || amount <= 0) {
            mostrarMensaje("Por favor, ingresa un monto válido.", "danger");
            return;
        }

        try {
            let currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
            let newBalance = currentBalance + amount;
            
            // Guardar
            localStorage.setItem('walletBalance', newBalance.toFixed(2));

            // Registrar e informar
            registrarTransaccion("Depósito", amount);
            
            // Feedback Visual Pro
            ejecutarEfectoExito(amount, refrescarInterfazSaldo);

        } catch (error) {
            mostrarMensaje("Error en el sistema de pagos.", "danger");
        }
    });
});

/**
 * Muestra alertas dinámicas en el DOM (Estilo Bootstrap)
 */
function mostrarMensaje(mensaje, tipo) {
    const placeholder = document.getElementById('liveAlertPlaceholder');
    if (!placeholder) {
        alert(mensaje); // Fallback si no existe el contenedor
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert" style="border-radius: 12px; font-weight: 600;">
           <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
           ${mensaje}
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
           </button>
        </div>
    `;
    placeholder.append(wrapper);

    // Auto-eliminar mensaje tras 4 segundos
    setTimeout(() => { wrapper.remove(); }, 4000);
}

/**
 * Efecto de éxito con actualización de saldo en vivo
 */
function ejecutarEfectoExito(monto, callbackSaldo) {
    const btn = document.querySelector('.btn-deposit');
    const input = document.getElementById('depositAmount');
    
    btn.innerHTML = 'Procesando pago... <i class="fas fa-spinner fa-spin ml-2"></i>';
    btn.disabled = true;

    setTimeout(() => {
        // 1. Limpiar input
        input.value = "";
        
        // 2. Actualizar el saldo en la pantalla actual sin recargar
        callbackSaldo();
        
        // 3. Mostrar mensaje de éxito dinámico
        mostrarMensaje(`¡Excelente! Has abonado $${monto.toFixed(2)} a tu cuenta.`, "success");
        
        // 4. Restaurar botón
        btn.innerHTML = 'Confirmar Depósito';
        btn.disabled = false;
        
        // Opcional: Redirigir tras un breve tiempo para que vean el saldo actualizado
        // setTimeout(() => { window.location.href = "menu.html"; }, 2500);
    }, 1500);
}

/**
 * Registro de transacción (Mantenemos la lógica de persistencia)
 */
function registrarTransaccion(tipo, monto) {
    let historial = JSON.parse(localStorage.getItem('walletHistory')) || [];
    historial.unshift({
        id: Date.now(),
        fecha: new Date().toLocaleString(),
        tipo: tipo,
        monto: monto,
        icono: 'fa-arrow-down'
    });
    localStorage.setItem('walletHistory', JSON.stringify(historial));
}