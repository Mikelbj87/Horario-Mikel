//declaramos 2 arrays, con las palabras de los campos que luego tendremos que validar, uno para los profesores
//y otro para los alumnos
var profesores = new Array("España", "Francia", "Brasil","Alemania");
var asignaturas = new Array("Argentina", "Inglaterra", "Uruguay", "Costa Rica");
//declaramos un map para instroducir nombre de profesor, asignatura, hora y dia
var horarioMap = new Map();

//funcion horarioAsignatura, es el constructor del objeto horarioAsignatura(una casilla de la tabla del horario)
function horarioAsignatura(profesor, asignatura, dia, hora) {
    this.Profesor = profesor;
    this.Asignatura = asignatura;
    this.Dia = dia;
    this.Hora = hora;
}

//Evento para cuando hacemos click en el boton de grabar, para que instroduzca los campos rellenos de profesor y asignatura
//en la casilla correspondiente segun su hora y dia seleccionados, desde aqui se llama a la funcion nuevoHorario
bGrabar.addEventListener("click", nuevoHorario, true);
//evento para verificara el profesor que hemos escrito en la casilla cNombre con la funcion verificarProfesor
cNombre.addEventListener("blur", verificarProfesor, true);
//evento para verificar la asignatura que hemos escrito en la casilla cAsignatura con la funcion verificarAsignatura
cAsignatura.addEventListener("blur", verificarAsignatura, true);

//funcion verificarProfesorAsignatura, a la que le pasamos un array lista con los nombres que si estan permitidos y
//el nombre a verificar
function verificarProfesorAsignatura(lista, objetoVerificar) {
    //en primero lugar guardamos en la variable dato el nombre a verificar (objetoVerificar) y lo trimeamos para
    //eliminar los posibles espacios en blanco que pudiera haber
    dato = objetoVerificar.value.trim();
    //Variable booleana estado, que la inicializamos en false
    var estado = false;
    //bucle forEach que recorre el array de nombres permitidos ya sea el de nombres o el de asignaturas y lo llamamos
    //elemento
    lista.forEach(function (elemento) {
        //si el dato, que contiene el nombre introducido por el usuario de los profesores o de la asignatura, es igual
        //al elemento que contiene los nombres que si estan permitidos pasamos el estado a true
        if (dato == elemento) {
            estado = true;
        }
    })
    //Si el estado no es true
    if (!estado) {
        //cuando se de al boton grabar el nombre de la asignatura o el profesor se pondra en blanco si el nombre
        //no coincide con nigun nombre de la lista
        objetoVerificar.value = "";
        //Mediante el metodo focus no dejaremnos que el usuario pase al siguiente campo, sin antes cambiar
        //el error en la caja correspondiente
        var cambio = objetoVerificar.id;
        document.getElementById(cambio).focus();

    }
}

//funcion verificarProfesor, dentro de esta llamamos a la funcion verificarProfesorAsignatura, a la que le pasamos el
//array profesores con los nombres de los posibles profesores, y el nombre escrito por el usuario en la casilla cNombre
function verificarProfesor() {
    verificarProfesorAsignatura(profesores, document.getElementById("cNombre"))
}

//funcion verificarAsignatura, dentro de esta llamamos a la funcion verificarProfesorAsignatura, a la que le pasamos el
//array asignaturas con los nombres de los posibles asignaturas, y el nombre escrito por el usuario en la casilla cAsignatura
function verificarAsignatura() {
    verificarProfesorAsignatura(asignaturas, cAsignatura)
}

//funcion nuevoHorario, que se ocupara de instroducir los datos previamente verificados en la tabla del horario
function nuevoHorario() {
    //a las variables fila y columna le damos el valor de las cajas de seleccionar hora y dia, que haya seleccionado el
    //usuario en los desplegables
    var fila = cHora.value;
    var columna = cDias.value;
    //en la variable hProfAsig creamos un objeto horarioAsignatura, al que pasamos el nombre, la asignatura, la hora
    //y el dia
    var hProfAsig = new horarioAsignatura(cNombre.value, cAsignatura.value, columna, fila);
    //al map horarioMap le pasamos el  objeto horarioAsignatura creado y le concatenamos con una c el valor de la fila
    //y la columna, que corresponde con los ids de las casillas
    horarioMap.set("c" + fila + columna, hProfAsig);
    //a la variable celda le pegamos el valor de fila y columna concatenado con c para que aparezca el objeto en
    //la casilla correspondiente
    var celda = document.getElementById("c" + fila + columna);
    //En la celda correspondiente aparecera el nombre de la asignatura
    celda.firstChild.nodeValue = cAsignatura.value + " - " + cNombre.value
}

//A la variable celdas le pasamos todos los elementos de html que contengan <td>
var celdas = document.querySelectorAll("td");
//
celdas.forEach(function (caja) {
    caja.addEventListener("click", visualizaMapa, true);
})

//funcion visualizaMapa, que nos coloca el nombre del profesor y la asignaatura en sus cajas cuando pulsamos en una casilla
//rellena de la tabla del horario
function visualizaMapa() {
    //en la variable key introducimos el valor del key de nuestro Map
    var key = this.id;
        //le damos el key a horariocelda
        horariocelda = horarioMap.get(key);
        //si horario celda no es null
     if (horariocelda) {    
        //Nos coloca los registros del map en las cajas correspondientes a nombre, asignatura, dia y hora
        cHora.value=horariocelda.Hora;
        cDias.value=horariocelda.Dia;
        cNombre.value=horariocelda.Profesor;
        cAsignatura.value=horariocelda.Asignatura;
    }
}