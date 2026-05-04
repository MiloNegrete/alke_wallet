# 💳 Alke Wallet — Billetera Virtual

Proyecto desarrollado durante el bootcamp de desarrollo web. Una billetera virtual frontend que permite gestionar un saldo, realizar depósitos, enviar dinero y revisar el historial de movimientos.

## 🚀 Demo

Abre `index.html` en tu navegador para comenzar.

**Credenciales de prueba:**
- **Usuario:** admin@alkewallet.com
- **Contraseña:** password123

## 📁 Estructura del proyecto

alke-wallet/
├── index.html          → Login
├── menu.html           → Menú principal
├── deposit.html        → Depositar dinero
├── sendmoney.html      → Enviar dinero
├── transactions.html   → Historial de movimientos
├── css/
│   ├── global.css      → Variables y estilos compartidos
│   ├── login.css
│   ├── menu.css
│   ├── deposit.css
│   ├── sendmoney.css
│   └── transactions.css
└── js/
├── login.js
├── menu.js
├── deposit.js
├── sendmoney.js
└── transactions.js

## ✨ Funcionalidades

- **Login** con validación de credenciales
- **Menú principal** con saldo en tiempo real
- **Depósitos** con feedback visual y registro automático
- **Envío de dinero** a contactos con validación de saldo
- **Historial** de movimientos con fechas
- Persistencia de datos con `localStorage`

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 4.6
- Font Awesome 5
- jQuery 3.7

## 📌 Notas

Este proyecto usa `localStorage` para persistir los datos, por lo que no requiere backend.
Los datos se mantienen en el navegador entre sesiones.