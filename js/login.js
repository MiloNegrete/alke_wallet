document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const MOCK_USER = {
        email: "admin@alkewallet.com",
        password: "password123"
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (!emailValue || !passwordValue) {
            mostrarError("Por favor, completa todos los campos.");
            return;
        }

        if (emailValue === MOCK_USER.email && passwordValue === MOCK_USER.password) {
            // ✅ Claves unificadas
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', emailValue);

            // Inicializar saldo si no existe
            if (!localStorage.getItem('walletBalance')) {
                localStorage.setItem('walletBalance', '0');
            }

            const loginBtn = document.querySelector('.btn-login');
            loginBtn.innerHTML = 'Cargando... <i class="fas fa-spinner fa-spin ml-2"></i>';
            loginBtn.disabled = true;

            setTimeout(() => {
                window.location.href = "menu.html";
            }, 1000);

        } else {
            mostrarError("Credenciales incorrectas. Usa:\nUser: admin@alkewallet.com\nPass: password123");
        }
    });

    function mostrarError(mensaje) {
        emailInput.parentElement.style.borderColor = "#ef4444";
        passwordInput.parentElement.style.borderColor = "#ef4444";
        alert(mensaje);
        passwordInput.value = "";
        setTimeout(() => {
            emailInput.parentElement.style.borderColor = "#e2e8f0";
            passwordInput.parentElement.style.borderColor = "#e2e8f0";
        }, 3000);
    }
});