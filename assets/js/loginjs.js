import { registerUser, loginUser, loginWithGoogle } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  // Referencias a los elementos
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginImage = document.getElementById("loginImage");
  const registerImage = document.getElementById("registerImage");

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  // Funciones para mostrar cada formulario
  function showLogin() {
      registerForm.classList.add("d-none"); // Oculta registro
      loginForm.classList.remove("d-none");   // Muestra login
      registerImage.classList.add("d-none");    // Oculta imagen de registro
      loginImage.classList.remove("d-none");      // Muestra imagen de login
  }

  function showRegister() {
      loginForm.classList.add("d-none");      // Oculta login
      registerForm.classList.remove("d-none");  // Muestra registro
      loginImage.classList.add("d-none");       // Oculta imagen de login
      registerImage.classList.remove("d-none"); // Muestra imagen de registro
  }

  // Eventos para alternar entre formularios al hacer clic en los botones
  registerBtn.addEventListener("click", showRegister);
  loginBtn.addEventListener("click", showLogin);

  // Verificar el hash de la URL y mostrar el formulario correspondiente
  const hash = window.location.hash;
  if (hash === "#registerForm") {
    showRegister();
  } else {
    // Por defecto muestra el login
    showLogin();
  }

  // Envío formulario de registro
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const fullName = document.getElementById('registerUser').value;
    const role = document.getElementById('registerRole').value; // Se captura el rol seleccionado

    if (email && password && fullName && role) {
      registerUser(email, password, fullName, role)
        .then(() => {
          registerForm.reset();
          console.log("Registro exitoso. Redirigiendo...");
          // La redirección se realizará automáticamente según el rol.
        })
        .catch((error) => {
          console.error(error);
          alert(`Error: ${error.message}`);
        });
    } else {
      alert('Por favor, completa todos los campos, incluyendo el rol.');
    }
  });

  // Envío formulario de inicio de sesión
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
      loginUser(email, password)
        .then(() => {
          loginForm.reset();
          // La redirección se realizará automáticamente según el rol.
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });

  // Iniciar sesión con Google
  document.getElementById('loginGoogleBtn').addEventListener('click', (event) => {
    event.preventDefault();
    loginWithGoogle()
      .then((result) => {
        // La redirección se realizará automáticamente según el rol.
      })
      .catch((error) => {
        console.error(error);
        alert(`Error al iniciar sesión con Google: ${error.message}`);
      });
  });

  // Alternar visibilidad de contraseñas en el formulario de registro
  document.getElementById('togglePasswordRegister').addEventListener('click', function() {
    const passwordFieldRegister = document.getElementById('registerPassword');
    const eyeIconRegister = document.getElementById('eye-icon-register');
    const eyeSlashIconRegister = document.getElementById('eye-slash-icon-register');

    if (passwordFieldRegister.type === 'password') {
        passwordFieldRegister.type = 'text';
        eyeIconRegister.classList.add('d-none');
        eyeSlashIconRegister.classList.remove('d-none');
    } else {
        passwordFieldRegister.type = 'password';
        eyeIconRegister.classList.remove('d-none');
        eyeSlashIconRegister.classList.add('d-none');
    }
  });

  // Alternar visibilidad de contraseñas en el formulario de login
  document.getElementById('togglePasswordLogin').addEventListener('click', function() {
    const passwordFieldLogin = document.getElementById('loginPassword');
    const eyeIconLogin = document.getElementById('eye-icon-login');
    const eyeSlashIconLogin = document.getElementById('eye-slash-icon-login');

    if (passwordFieldLogin.type === 'password') {
        passwordFieldLogin.type = 'text';
        eyeIconLogin.classList.add('d-none');
        eyeSlashIconLogin.classList.remove('d-none');
    } else {
        passwordFieldLogin.type = 'password';
        eyeIconLogin.classList.remove('d-none');
        eyeSlashIconLogin.classList.add('d-none');
    }
  });
});
