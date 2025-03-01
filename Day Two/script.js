function ask(question, validate, errorMessage) { // Función para preguntar al usuario y validar la respuesta
    while (true) {
      const answer = prompt(question); // answer almacena la respuesta del usuario a la pregunta
      if (answer && validate(answer)) { // ¿La respuesta es válida?
        return answer; // Devolver la respuesta
      }
      alert(errorMessage); // Mostrar mensaje de error si la respuesta no es válida
    }
}

function capitalize(str) { // Función para capitalizar la primera letra de cada palabra en una cadena
    return str.trim().toLowerCase().replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}

const name = ask("¿Cuál es tu nombre?", (name) => isNaN(parseInt(name)) && name.trim() !== "", "Por favor, introduce un nombre válido.");
const age = ask("¿Cuántos años tienes?", (age) => !isNaN(parseInt(age)) && parseInt(age) >= 0, "Por favor, introduce una edad válida.");
const lang = ask("¿Qué lenguaje de programación estás estudiando?", (lang) => isNaN(parseInt(lang)) && lang.trim() !== "",
    "Por favor, introduce un lenguaje de programación válido.");
alert(`Hola ${capitalize(name)}, tienes ${age} años y ya estás aprendiendo ${capitalize(lang)}.`);

while (true) {
    const res = prompt(`¿Te gusta estudiar ${capitalize(lang)}? (Sí/No):`).trim().toLowerCase(); 
    if (res === "sí" || res === "si" || res == "1") { // Acepta "sí", "si" o 1
        alert("¡Muy bien! Sigue estudiando y tendrás mucho éxito.");
        break
    } else if (res === "no" || res == "0") { // Acepta "no" o 0
        alert("Oh, qué pena... ¿Ya intentaste aprender otros lenguajes?");
        break;
    } else {
        alert("Por favor, responde con 'Sí' o 'No'.");
    }
}