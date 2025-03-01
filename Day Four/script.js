let secretNumber, maxAttempts, attempts, triedNumbers; // Variables del juego

// Al cargar la página, verificar preferencias
function checkTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (savedTheme === "system" && systemDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

// Alternar tema
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";

  if (isDark) {
    html.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

// Inicializar al cargar
window.addEventListener("DOMContentLoaded", checkTheme);

// Función para validar teclas del input "range" (números >=2)
function handleKeyPress(event) {
  const charCode = event.charCode;
  const input = event.target;
  // Permitir solo dígitos (0-9)
  if (charCode < 48 || charCode > 57) return false;
  // Bloquear "0" como primer dígito
  if (input.value === "" && charCode === 48) return false;
  return true;
}

// Función que corrige valores < 2 y actualiza el placeholder de "attempts"
function handleRangeInput(input) {
  clearTimeout(input.timeoutId); // Limpiar timeout anterior
  input.timeoutId = setTimeout(() => {
    const value = parseInt(input.value);
    if (!isNaN(value)) {
      if (value < 2) {
        input.value = 2;
      }
      updateAttemptsPlaceholder();
      checkAllInputs(); // Forzar verificación de estado
    }
  }, 500); // Esperar 500ms después de dejar de escribir
}
// Actualiza el placeholder de "attempts" basado en el valor de "range"
function updateAttemptsPlaceholder() {
  const secretNumber = parseInt(document.getElementById("range").value);
  const attemptsInput = document.getElementById("attempts");

  if (!isNaN(secretNumber)) {
    const suggestedAttempts = Math.floor(secretNumber - 1);
    attemptsInput.placeholder = suggestedAttempts > 0 ? suggestedAttempts : 1;
  }
}

// Valida que los intentos sean menores al número máximo
function validateAttempts(input) {
  const secretNumber = parseInt(document.getElementById("range").value);
  const attemptsValue = parseInt(input.value);
  
  if (!isNaN(secretNumber) && !isNaN(attemptsValue)) {
    if (attemptsValue >= secretNumber) {
      input.value = secretNumber - 1;
    }
  }
  checkAllInputs(); // Actualizar estado del botón
}

function startGame() {
  const range = parseInt(document.getElementById("range").value);
  const attemptsInput = parseInt(document.getElementById("attempts").value);

  secretNumber = Math.floor(Math.random() * range) + 1;
  maxAttempts = attemptsInput;
  attempts = 0;
  triedNumbers = new Set();

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("guessInput").max = range;
  updateGameDisplay();
}

function makeGuess() {
  const guessInput = document.getElementById("guessInput");
  const message = document.getElementById("message");
  const userGuess = parseInt(guessInput.value);
  const maxNumber = parseInt(document.getElementById("range").value);

  // Validar rango del número
  if (guessInput.value.trim() === "" || isNaN(guessInput.value || userGuess < 1 || userGuess > maxNumber) || userGuess > parseInt(document.getElementById("range").value)) {
    message.textContent = `El número debe estar entre 1 y ${maxNumber}`;
    guessInput.value = "";
    return;
  }
  
  if (triedNumbers.has(userGuess)) {
    message.textContent = `Ya intentaste con ${userGuess}. Prueba otro número.`;
    return;
  }

  triedNumbers.add(userGuess);
  attempts++;
  const remaining = maxAttempts - attempts;

  if (userGuess < secretNumber) {
    message.textContent = `💡 El número es mayor que ${userGuess}. Te quedan ${remaining} intentos.`;
  } else if (userGuess > secretNumber) {
    message.textContent = `💡 El número es menor que ${userGuess}. Te quedan ${remaining} intentos.`;
  } else {
    message.textContent = `🎉 ¡Felicidades! Adivinaste en ${attempts} ${
      attempts === 1 ? "intento" : "intentos"
    }.`;
    confetti({
      particleCount: 1000,
      spread: 360,
      origin: { y: 0.6 },
    });
    endGame();
    return;
  }

  if (attempts >= maxAttempts) {
    message.textContent = `🤷‍♂️ Se acabaron los intentos. El número era ${secretNumber}.`;
    endGame();
  }

  updateGameDisplay();
  guessInput.value = "";
}

function updateGameDisplay() {
  document.getElementById("remaining").textContent = maxAttempts - attempts;
  document.getElementById("tried").textContent =
    Array.from(triedNumbers).join(", ") || "-";
  document.getElementById("guessInput").value = "";
}

function endGame() {
  document.getElementById("startButton").disabled = true;
  document.getElementById("guessInput").disabled = true;
  document.getElementById("guessButton").disabled = true;
  document.getElementById("restart").classList.remove("hidden");
  guessButton.disabled = true;
  guessButton.style.pointerEvents = "none";
}

function restartGame() {
  secretNumber = null;
  maxAttempts = null;
  attempts = 0;
  triedNumbers = new Set();
  document.getElementById("setup").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
  document.getElementById("restart").classList.add("hidden");
  document.getElementById("guessInput").disabled = false;
  document.getElementById("message").textContent = "";
  document.getElementById("range").value = "";
  document.getElementById("attempts").value = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("remaining").textContent = "";
  document.getElementById("tried").textContent = "";
  startButton.disabled = true;
  guessButton.disabled = true;
}

document.getElementById("attempts").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    validateAttempts(this);
    checkAllInputs();
    if (!document.getElementById("startButton").disabled) {
      startGame();
    }
    event.preventDefault(); // Evitar recarga de página si es necesario
  }
});

document.getElementById("guessInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Evitar comportamientos no deseados
    if (!document.getElementById("guessButton").disabled) {
      makeGuess();
    }
  }
});

// Animación Splash Screen
document.addEventListener("DOMContentLoaded", function () {
  const splashScreen = document.getElementById("splash-screen");
  const startButton = document.getElementById("startButton");
  const rangeInput = document.getElementById("range");
  const attemptsInput = document.getElementById("attempts");
  const guessInput = document.getElementById("guessInput");
  const guessButton = document.getElementById("guessButton");

  // Clase para animar los textos
  setTimeout(function () {
    splashScreen.classList.add("animated");
  }, 300);

  // Ocultar pantalla splash después de completar la animación
  setTimeout(function () {
    splashScreen.classList.add("hidden");
  }, 2000);

  // Función para verificar si todos los inputs tienen valores válidos
  function checkAllInputs() {
    const rangeValue = parseInt(rangeInput.value);
    const attemptsValue = parseInt(attemptsInput.value);
    const guessValue = parseInt(guessInput.value);

    if (
      !isNaN(rangeValue) &&
      rangeValue > 1 &&
      !isNaN(attemptsValue) &&
      attemptsValue > 0 &&
      attemptsValue < rangeValue
    ) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
    }

    if (!isNaN(guessValue) && guessValue > 0) {
      guessButton.disabled = false;
    } else {
      guessButton.disabled = true;
    }
  }

  // Agregar eventos de entrada a los inputs para verificar los valores
  rangeInput.addEventListener("input", checkAllInputs);
  attemptsInput.addEventListener("input", checkAllInputs);
  guessInput.addEventListener("input", checkAllInputs);
  restartGame();
});
