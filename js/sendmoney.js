document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchContact');
    const contactList = document.getElementById('contactList');
    const dataList = document.getElementById('contactsData');
    const sendForm = document.getElementById('sendForm');
    const panelMonto = document.getElementById('panelMonto');
    const nombreDestinatario = document.getElementById('nombreDestinatario');
    const montoInput = document.getElementById('montoEnvio');
    const alertaEnvio = document.getElementById('alertaEnvio');
    const btnAddContact = document.getElementById('btnAddContact');
    const modalContacto = document.getElementById('modalContacto');
    const btnGuardar = document.getElementById('btnGuardarContacto');
    const btnCancelar = document.getElementById('btnCancelarContacto');

    let contactoSeleccionado = null;

    // Mostrar saldo
    const saldo = parseFloat(localStorage.getItem('walletBalance')) || 0;
    document.getElementById('saldoActual').textContent = '$' + saldo.toLocaleString('es-CL');

    // Autocompletado
    const actualizarDatalist = () => {
        dataList.innerHTML = "";
        Array.from(contactList.getElementsByClassName('list-group-item')).forEach(item => {
            const option = document.createElement('option');
            option.value = item.querySelector('.contact-name').textContent;
            dataList.appendChild(option);
        });
    };
    actualizarDatalist();

    // Filtrar contactos al escribir
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        Array.from(contactList.getElementsByClassName('list-group-item')).forEach(item => {
            const name = item.querySelector('.contact-name').textContent.toLowerCase();
            item.style.display = name.includes(term) || term === "" ? "flex" : "none";
        });
    });

    // Seleccionar contacto
    contactList.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        // Resetear todos
        contactList.querySelectorAll('button').forEach(b => {
            b.className = 'btn btn-outline-primary btn-sm';
            b.textContent = 'Seleccionar';
            b.closest('.list-group-item').style.borderColor = "#f1f5f9";
        });

        // Marcar seleccionado
        btn.className = 'btn btn-primary btn-sm';
        btn.textContent = 'Seleccionado ✓';
        btn.closest('.list-group-item').style.borderColor = "var(--brand-blue)";

        contactoSeleccionado = btn.closest('.list-group-item').querySelector('.contact-name').textContent;
        nombreDestinatario.textContent = contactoSeleccionado;
        montoInput.value = "";
        alertaEnvio.innerHTML = "";
        panelMonto.style.display = "block";
        panelMonto.scrollIntoView({ behavior: 'smooth' });
    });

    // Agregar contacto (modal inline)
    btnAddContact.addEventListener('click', () => {
        modalContacto.style.display = modalContacto.style.display === 'none' ? 'block' : 'none';
    });

    btnCancelar.addEventListener('click', () => {
        modalContacto.style.display = 'none';
    });

    btnGuardar.addEventListener('click', () => {
        const nombre = document.getElementById('nuevoNombre').value.trim();
        const banco = document.getElementById('nuevoBanco').value.trim();
        const alias = document.getElementById('nuevoAlias').value.trim();

        if (!nombre || !banco || !alias) {
            alert("Por favor completa todos los campos del contacto.");
            return;
        }

        const nuevoItem = document.createElement('li');
        nuevoItem.className = 'list-group-item';
        nuevoItem.innerHTML = `
            <div class="contact-info">
                <span class="contact-name">${nombre}</span>
                <span class="contact-details"><i class="fas fa-university mr-1"></i> ${banco} | Alias: ${alias}</span>
            </div>
            <div class="contact-action">
                <button type="button" class="btn btn-outline-primary btn-sm">Seleccionar</button>
            </div>
        `;
        contactList.prepend(nuevoItem);
        actualizarDatalist();

        // Limpiar y cerrar modal
        document.getElementById('nuevoNombre').value = '';
        document.getElementById('nuevoBanco').value = '';
        document.getElementById('nuevoAlias').value = '';
        modalContacto.style.display = 'none';
    });

    // Confirmar envío
    sendForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!contactoSeleccionado) {
            mostrarAlerta("Por favor selecciona un contacto.", "danger");
            return;
        }

        const monto = parseFloat(montoInput.value);
        if (isNaN(monto) || monto <= 0) {
            mostrarAlerta("Ingresa un monto válido.", "danger");
            return;
        }

        const saldoActual = parseFloat(localStorage.getItem('walletBalance')) || 0;
        if (monto > saldoActual) {
            mostrarAlerta(`Saldo insuficiente. Tienes $${saldoActual.toLocaleString('es-CL')}`, "danger");
            return;
        }

        const nuevoSaldo = saldoActual - monto;
        localStorage.setItem('walletBalance', nuevoSaldo.toFixed(2));
        registrarTransaccion(`Envío a ${contactoSeleccionado}`, -monto);

        mostrarAlerta(`¡Enviado exitosamente a ${contactoSeleccionado}!`, "success");

        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1500);
    });

    function mostrarAlerta(mensaje, tipo) {
        alertaEnvio.innerHTML = `
            <div class="alert alert-${tipo} mt-2" style="border-radius:10px; font-weight:600;">
                <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
                ${mensaje}
            </div>
        `;
    }

    function registrarTransaccion(tipo, monto) {
        let historial = JSON.parse(localStorage.getItem('walletHistory')) || [];
        historial.unshift({
            id: Date.now(),
            fecha: new Date().toLocaleString(),
            tipo: tipo,
            monto: monto
        });
        localStorage.setItem('walletHistory', JSON.stringify(historial));
    }
});