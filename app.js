/*
let titulo = document.querySelector('h1'); // querySelector nos permite acceder a selectores especificos, si no encuentra coincidencias se devulve un null. Es un objeto, no un texto 


titulo.innerHTML = 'Juego del numero secreto'; // innerHTML es un metodo que se le aplica al objeto titulo 

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un numero del 1 al 10'; // Se le esta agregando el texto en el HTML a traves de JavaScript
*/

// Recibe dos parametros, elemento es en el HTML al que queremos agregarle un texto
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

// Se declaran las variables que se van a utilzar
let numeroSecreto;
let intentos = 1;
let numerosSorteados = [];
let numeroMax = 10;


function verificarIntento() {

  let numeroDeUsuario = parseInt(document.getElementById('valorDeUsuario').value); // getElementById busca el objeto directamente por nombre de ID, value nos da el valor que se guardo
  if (numeroDeUsuario == numeroSecreto) {
    asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos == 1) ? 'intento' : 'intentos'}`);
    // Aqui se llama el boton por su ID, se aplica el metodo 'removeAttribute' y colocamos el disabled para que se active el boton despues.
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    // El usuario no acerto el numero 
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento('p', 'El numero secreto es menor')
    } else {
      asignarTextoElemento('p', 'El numero secreto es mayor')
    }
    intentos++;
    limpiarCaja();
  }
  return;
}

// Funcion para limpiar caja

function limpiarCaja() {
  let valorCaja = document.querySelector('#valorDeUsuario')
  valorCaja.value = '';

  // Tambien se puede utiliar de la siguiente manera 
  // document.querySelector('#valordeUsuario').value = '';
}

// Se genera un numero aleatorio 

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMax) + 1;
  console.log(numeroGenerado);
  console.log(numerosSorteados);
  // Si ya sorteamos todos los numeros 
  if(numerosSorteados.length == numeroMax){
    asignarTextoElemento ('p', 'Ya se sortearon todos los numeros posibles');
  }
  // Si el numero generado esta incluido en la lista 
  if (numerosSorteados.includes(numeroGenerado)) {
    // Recursividad hace que la funcion se llame así misma 
    return generarNumeroSecreto();
  } else {
    // Si el numero no esta repetido se guarda en el arreglo
    numerosSorteados.push(numeroGenerado);
    return numeroGenerado;
  }
}

function condicionesIniciales() {
  //Utilizamos la funcion para poder agregar texto mas rapido
  asignarTextoElemento('h1', 'Juego del numero secreto');
  asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMax}`);
  // Generamos un nuevo numero secreto 
  numeroSecreto = generarNumeroSecreto();
  console.log(numeroSecreto);
  // Reiniciamos el numero de intentos 
  intentos = 1;
}


// Funcion para reiniciar el juego 
function reiniciarJuego() {
  // Vamos a limpiar la caja primero
  limpiarCaja();
  // Deshabilitamos el boton de nuevo juego 
  document.querySelector('#reiniciar').setAttribute('disabled', 'true');
  // Volvemos a generar el texto inicial 
  condicionesIniciales();

  console.log('Nuevo numero ' + numeroSecreto);
  console.log(intentos);
}

condicionesIniciales();


