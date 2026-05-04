// ✅ Verificar sesión con la clave correcta
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = "index.html";
}

// ✅ Mostrar saldo con la clave correcta
const saldo = parseFloat(localStorage.getItem('walletBalance')) || 0;
document.getElementById('saldo').textContent = '$' + saldo.toLocaleString('es-CL');

// Cerrar sesión
document.getElementById('btnLogout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = "index.html";
});