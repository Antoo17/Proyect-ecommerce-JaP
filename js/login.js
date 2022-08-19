/* PASO A PASO

Se crea función para ingresar, en las variables se guarda el valor introducido en los input con id email y pass
Condición que indica que si una de las variables no tiene datos saldrá la alerta indicando llenar campos, de lo contrario se guarda en localStorage el valor introducido en user 
y redirige a index.html.
Se crea el evento al botón, ya que al clickearlo se hace uso de la función.*/

function login(){    
    let user = document.getElementById("email").value;
    let keyword = document.getElementById("pass").value;

    if (user ==="" || keyword ==="") {
        alert ("Debe ingresar Usuario y Contraseña");
    } else {
        localStorage.setItem('Usuario', user);
        location.href="index.html"
    }
}
const pressButton = document.getElementById("entrar")
    pressButton.addEventListener("click",login)
