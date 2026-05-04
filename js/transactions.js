/**
 * Lógica para Visualización de Transacciones con Saldo y Mensajes - Alke Wallet
 */

document.addEventListener('DOMContentLoaded', () => {
    const transactionsContainer = document.querySelector('.container-transactions');
    const backButton = document.querySelector('.btn-back');

    // --- 1. FUNCIÓN: Actualizar Saldo en Pantalla ---
    const mostrarSaldoActualizado = () => {
        // Buscamos si ya existe un contenedor de saldo, si no, lo creamos
        let saldoHeader = document.getElementById('saldoDisplay');
        if (!saldoHeader) {
            saldoHeader = document.createElement('div');
            saldoHeader.id = 'saldoDisplay';
            saldoHeader.className = 'text-center mb-4 p-3';
            saldoHeader.style.background = 'var(--expense-bg)';
            saldoHeader.style.borderRadius = '15px';
            // Insertar después del título H2
            const title = transactionsContainer.querySelector('h2');
            title.insertAdjacentElement('afterend', saldoHeader);
        }

        const saldo = parseFloat(localStorage.getItem('walletBalance')) || 0;
        saldoHeader.innerHTML = `
            <small class="text-muted d-block text-uppercase font-weight-bold" style="letter-spacing: 1px;">Saldo Disponible</small>
            <h3 class="display-4 mb-0" style="color: var(--deep-blue); font-weight: 800;">
                ${saldo.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
            </h3>
        `;
    };

    // --- 2. FUNCIÓN: Mensajes Dinámicos ---
    const mostrarAviso = (mensaje, tipo = 'success') => {
        const alertBox = document.createElement('div');
        alertBox.className = `alert alert-${tipo} alert-dismissible fade show mt-3`;
        alertBox.style.borderRadius = '10px';
        alertBox.innerHTML = `
            <i class="fas fa-info-circle mr-2"></i> ${mensaje}
            <button type="button" class="close" data-dismiss="alert">&times;</button>
        `;
        // Insertar al principio del contenedor
        transactionsContainer.prepend(alertBox);
        setTimeout(() => alertBox.remove(), 3000);
    };

    // --- 3. PROCESO DE RENDERIZADO ---
    mostrarSaldoActualizado();

    const historial = JSON.parse(localStorage.getItem('walletHistory')) || [];

    // Limpiar estáticos
    const staticElements = document.querySelectorAll('.date-divider, .list-group');
    staticElements.forEach(el => el.remove());

    if (historial.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'text-center my-5 text-muted';
        emptyMsg.innerHTML = `
            <i class="fas fa-receipt fa-3x mb-3"></i>
            <p>Aún no tienes movimientos registrados.</p>
        `;
        transactionsContainer.insertBefore(emptyMsg, backButton);
        mostrarAviso("No hay datos para mostrar", "info");
        return;
    }

    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush';

    historial.forEach(mov => {
        const isIncome = mov.monto > 0;
        const item = document.createElement('li');
        item.className = 'list-group-item';

        const iconClass = isIncome ? 'fa-arrow-down icon-income' : 'fa-paper-plane icon-expense';
        const amountClass = isIncome ? 'amount-income' : 'amount-expense';
        const symbol = isIncome ? '+' : '';

        item.innerHTML = `
            <div class="transaction-info">
                <i class="fas ${iconClass}"></i>
                <div>
                    <span class="d-block">${mov.tipo}</span>
                    <small class="text-muted" style="font-size: 0.7rem;">${mov.fecha}</small>
                </div>
            </div>
            <span class="${amountClass}">${symbol}${parseFloat(mov.monto).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
        `;
        listGroup.appendChild(item);
    });

    const divider = document.createElement('div');
    divider.className = 'date-divider';
    divider.textContent = 'Historial Reciente';
    
    transactionsContainer.insertBefore(divider, backButton);
    transactionsContainer.insertBefore(listGroup, backButton);

    // Mensaje de éxito al cargar
    mostrarAviso("Historial actualizado correctamente", "success");
});