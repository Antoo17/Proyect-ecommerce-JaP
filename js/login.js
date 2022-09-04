/***** PASO A PASO *****/ 

/***** Función para validar que se esté ingresando un mail *****/ 
/*Se llama al valor introducido en el input de id "email".
La constante validateEmail es una expresión regular y corresponde a una secuencia de caracteres que conforma un patrón de búsqueda y así encontrar una o varias coincidencias en el texto.
Con la condición validamos si es correcto el mail introducido. Test sirve para corroborar si el texto coincide con el patrón indicado.*/

/***** Función de login *****/

/*Se guarda en la constante userEmail la información que trae validateEmail()
Se guarda en constante userPass el valor introducido en el input de contraseña.
Condición: si el valor de la constante userEmail y en userPass se ingresó un valor devolverá true.
Por lo cual, guarda en local storage el usuario y se redirige a la página index.html.
En caso contrario se muestra la alerta de mail o contraseña incorrecta.
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
    const userPass = document.getElementById("pass").value;
        if ((userEmail) && (userPass !== "")){
            localStorage.setItem("user", userEmail)
            location.href="index.html"
        } else {
            alert("Dirección de mail o contraseña incorrecta")
        }
}
const pressButton = document.getElementById("entrar")
    pressButton.addEventListener("click", login)
