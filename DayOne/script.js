const variables = [ // Array de objetos con las variables a comparar
  { name: 'numeroUn', value: 1, pair: 'stringUn', pairValue: '1' },
  { name: 'numeroTreinta', value: 30, pair: 'stringTreinta', pairValue: '30' },
  { name: 'numeroDiez', value: 10, pair: 'stringDiez', pairValue: '10' }
];

function compararValores(var1, var2, nameVar1, nameVar2) { // Función que compara dos variables
  return var1 == var2 // ¿Tienen el mismo valor?
    ? var1 === var2 // ¿Tienen el mismo valor y el mismo tipo?
      ? `Las variables ${nameVar1} y ${nameVar2} tienen el mismo valor y el mismo tipo`
      : `Las variables ${nameVar1} y ${nameVar2} tienen el mismo valor, pero tipos diferentes`
    : `La variable ${nameVar1} (${var1}) y la variable ${nameVar2} (${var2}) no tienen el mismo valor`;
}

const results = variables.map(v => compararValores(v.value, v.pairValue, v.name, v.pair));
console.log(results.join('\n\n'));