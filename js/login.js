/* PASO A PASO

Se crea función para ingresar, en las variables se guarda el valor introducido en los input con id email y pass
Condición que indica que si una de las variables no tiene datos saldrá la alerta indicando llenar campos, de lo contrario se guarda en localStorage el valor introducido en emailAdress 
y redirige a index.html.
Se crea el evento al botón, ya que al clickearlo se hace uso de la función.*/

/*Función para validar que se esté ingresando un mail. Se llama al valor introducido en el input de id "email"
La constante validateEmail es una expresión regular y corresponde a una secuencia de caracteres que conforma un patrón de búsqueda y así encontrar una o varias coincidencias en el texto.

Con la condición validamos si es correcto el mail introducido. Test sirve para corroborar si el texto coincide con el patrón indicado.*/

/*Función de login, se guarda en la constante userEmail la información que trae validateEmail()
Condición: si el valor de la constante es true se guarda en local storage el usuario y se redirige a la página index.html.
En caso contrario se muestra la alerta de mail incorrecto.
Se crea el evento al botón, ya que al clickearlo se hace uso de la función.*/

function validateEmail(){
    const emailInput = document.getElementById("email").value;

    const validEmail= /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(validEmail.test(emailInput)) {
        return emailInput;
    } else {
        return false;
    }
}

function login(){
    const userEmail = validateEmail()

        if (userEmail) {
            localStorage.setItem("user", userEmail)
            location.href="index.html"
        } else {
            alert("La dirección de email no es válida")
        }
}
const pressButton = document.getElementById("entrar")
    pressButton.addEventListener("click", login)
