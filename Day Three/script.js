function ask(question, validate, errorMessage) { // Función para preguntar al usuario y validar la respuesta
    while (true) {
      const answer = prompt(question); // answer almacena la respuesta del usuario a la pregunta
      if (answer && validate(answer)) { // ¿La respuesta es válida?
        return answer; // Devolver la respuesta
      }
      alert(errorMessage); // Mostrar mensaje de error si la respuesta no es válida
    }
}

function askOptions(options, question, errorMessage) { // Función para preguntar al usuario y validar la respuesta (con opciones)
    while (true) {
      const answer = prompt(question); // answer almacena la respuesta del usuario a la pregunta
      if (answer) {
        answer = answer.trim().toLowerCase(); // Convertir la respuesta a minúsculas y eliminar espacios en blanco
        if (options.includes(answer)) { // ¿La respuesta es válida?
          return answer; // Devolver la respuesta
        }
      }
      alert(errorMessage); // Mostrar mensaje de error si la respuesta no es válida
    }
  }

function capitalize(str) { // Función para capitalizar la primera letra de cada palabra en una cadena
    return str.trim().toLowerCase().replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}       

alert("¡Bienvenido(a) al juego de rutas en programación!");

const area = askOptions(["front-end", "frontend", "front end", "front", "back-end", "backend", "back end", "back"], "¿Qué área deseas seguir: 'Front-End' o 'Back-End'?:",
    "Por favor, introduce 'Front-End' o 'Back-End'.");

if (area === "front-end" || area === "frontend" || area === "front end" || area === "front") {
  const frontChoice = askOptions(["react", "vue"], "Has elegido Front-End. ¿Qué framework deseas aprender: 'React' o 'Vue'?:", "Por favor, introduce 'React' o 'Vue'.");
  alert(`¡Genial! Vas a sumergirte en el mundo de ${capitalize(frontChoice)}.`);
} else {
  const backChoice = askOptions(["c#", "java"], "Has elegido Back-End. ¿Qué lenguaje deseas aprender: 'C#' o 'Java'?:", "Por favor, introduce 'C#' o 'Java'.");
  alert(`¡Fantástico! ${capitalize(backChoice)} es una excelente elección.`);
}

alert("Ahora, ¿qué deseas hacer? Seguir especializándote en el área elegida o desarrollarte en Full-Stack y aprender ambas áreas.");

const finalChoice = askOptions(["especialización", "especializacion", "full-stack", "fullstack", "full stack", "full", "stack"], "Elige una opción: 'Especialización o 'Full-Stack'",
    "Por favor, introduce 'Especialización' o 'Full-Stack'.");

finalChoice === "especialización" || finalChoice === "especializacion" ? alert("¡Perfecto! Profundizarás tus conocimientos en el área que has elegido.") :
  alert("¡Excelente elección! Te convertirás en un desarrollador Full-Stack, dominando tanto Front-End como Back-End.");

const next = prompt("¿Hay alguna otra tecnología que te gustaría aprender? Escribe 'ok' para continuar o enter para finalizar.").toLowerCase();
while (next === "ok") {
  const tech = ask("Ingresa el nombre de la tecnología.", function(answer) { return isNaN(parseInt(answer)) && answer.trim() !== "" }, "Por favor, introduce una tecnología válida.");
  alert(`¡${capitalize(tech)} suena como una tecnología muy interesante para aprender!`);
  next = prompt("¿Hay otra tecnología que te gustaría aprender? Escribe 'ok' para continuar o enter para finalizar.").toLowerCase();
}

alert("¡Gracias por jugar! Sigue aprendiendo y desarrollándote en el mundo de la programación.");