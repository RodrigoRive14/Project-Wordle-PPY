let intentos = 6;
// let palabra = "APPLE";

/*let listapalabras = ["APPLE","MOUSE","HOUSE","TRACE"];
let posicion = Math.floor(Math.random()*listapalabras.length);
let palabra =listapalabras[posicion];*/
let palabra;

fetch("https://random-word.ryanrk.com/api/en/word/random/?Length=5")
    .then(response => response.json())
    .then(response => {
        console.log(response[0].toUpperCase());
        palabra = response[0].toUpperCase();
    })
    .catch(err => {
    console.log("ups sucedio un error")
    let listapalabras = ["APPLE","MOUSE","HOUSE","TRACE"];
    let posicion = Math.floor(Math.random()*listapalabras.length);
    palabra =listapalabras[posicion];
    console.log(palabra);
    })
const BUTTON = document.getElementById("guess-button");

BUTTON.addEventListener("click", intentar);

function intentar(){
    console.log("click!")
    const intento = leerIntento();
    if (intento.length !== 5){
        alert("Debe ingresar solo palabras de 5 letras.")
        return
    }
    intentos = intentos - 1
    console.log("te quedan",intentos, "intentos");

    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    console.log(ROW);

    for(let i in intento){
        // console.log(intento[i]);
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        SPAN.innerHTML = intento[i];
        if (palabra[i]===intento[i]){
            SPAN.style.backgroundColor = "green";
            console.log(intento[i],"verde");
        }else if(palabra.includes(intento[i])){
            SPAN.style.backgroundColor = "yellow";
            console.log(intento[i],"amarillo");
        }else{
            SPAN.style.backgroundColor = "gray";
            console.log(intento[i],"gris");
            }
        console.log(SPAN);
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    if (intento===palabra){
        console.log("ganaste");
        terminar("<h1>GANASTE!😀</h1>")
        return
    }
    if (intentos == 0) {
        console.log("perdiste");
        terminar("<h1>PERDISTE!😖</h1>")
    }
}


function leerIntento(){
    let intento = document.getElementById("guess-input").value.toUpperCase()
    return intento;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}