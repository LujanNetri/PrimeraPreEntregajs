//JUEGO DEL AHORCADO

//Definimos las categorias y sus palabras
const categorias = 
{
    "Frutas" : ["MELON", "PAPAYA", "SANDIA","MANZANA","PERA","NARANJA","UVA","CEREZA","CIRUELA","KIWI"],
    "Animales": ["PERRO", "GATO", "CABALLO", "GALLINA", "JIRAFA", "MONO", "VACA", "CONEJO", "TORTUGA", "LOBO"],
    "Paises": ["ARGENTINA", "DINAMARCA", "LAOS", "VIETNAM", "ITALIA", "FINLANDIA", "CANADA", "CHILE", "MALTA", "RUMANIA"],
    "Objetos": ["MOCHILA", "RELOJ", "ZAPATILLA", "MUEBLE", "CUADERNO", "SILLA", "MESA", "CELULAR", "PUERTA", "AURICULARES"]
};

//Función para dibujar el ahorcado segun los intentos fallidos
function dibujarAhorcado(intentos) 
{
    const dibujos = [
      `\n  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========`,
      `\n  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========`,
      `\n  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========`,
      `\n  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========`,
      `\n  +---+\n  |   |\n  O   |\n /|\  |\n      |\n      |\n=========`,
      `\n  +---+\n  |   |\n  O   |\n /|\  |\n /    |\n      |\n=========`,
      `\n  +---+\n  |   |\n  O   |\n /|\  |\n / \  |\n      |\n=========`,
    ];    

    alert(dibujos[6 - intentos]);
}

//Funcion para seleccionar una categoria
function seleccionarCategoria() 
{
    let opciones = Object.keys(categorias);
    let mensaje = "Selecciona una categoria: \n 1-Frutas \n 2-Animales \n 3-Paises \n 4-Objetos";
    let opcion;
    do 
    {
        opcion = parseInt(prompt(mensaje)); //Pide al usuario que ingrese una opcion
    } while(isNaN(opcion) || opcion < 1 || opcion > opciones.length);//Verifica que la opcion sea valida

    return opciones[opcion - 1];
}

//Funcion para jugar al ahorcado
function jugarAhorcado(palabras,categoria) 
{
    let palabra = palabras[Math.floor(Math.random()*palabras.length)] //Se escoge de manera aleatoria la palabra de la categoria seleccionada
    let oculto = Array(palabra.length).fill("_"); //Creo un array con guiones bajo que representa la palabra oculta
    let intentos = 6;
    let letrasUsadas = [];

    dibujarAhorcado(intentos);

    while(intentos > 0 && oculto.includes("_")) //Mientras que los intentos sean mayor a 0 y todavia no se completó la palabra sigue iterando
    {
        alert(
          `categoría: ${categoria} \n Intentos restantes: ${intentos} \n\n ${oculto.join(" ")} \n\n Letras Usadas: ${letrasUsadas.join(", ")} `
        );    

        let letra = prompt("Ingrese una letra: ").toUpperCase();

        if(!letra || letra.length !== 1 || !/[A-Z]/.test(letra))
        {
            alert("Por favor, ingresa una sola letra valida.");
            continue;
        }

        if(letrasUsadas.includes(letra))
        {
            alert("Ya ingresaste esta letras, intenta con otra.");
            continue;
        }

        letrasUsadas.push(letra);

        if(palabra.includes(letra))
        {
            for(let i=0; i < palabra.length; i++)
            {
                if(palabra[i] === letra)
                    oculto[i] = letra;
            }
        } else 
        {
            intentos--;
            dibujarAhorcado(intentos);
        }
    }

    if(!oculto.includes("_"))
    {
        alert(`¡Ganaste! La palabra era: ${palabra}`);
    } else 
    {
        alert(`Perdiste. La palabra era: ${palabra}`);
    }
}

//Funcion para iniciar el juego 
function iniciarJuego() 
{
    let categoriaSeleccionada = seleccionarCategoria();
    jugarAhorcado(categorias[categoriaSeleccionada], categoriaSeleccionada);
    if(confirm("¿Queres jugar otra vez?"))
    {
        iniciarJuego()
    } else 
    {
        alert("¡Gracias por jugar!");
    }
}

iniciarJuego();