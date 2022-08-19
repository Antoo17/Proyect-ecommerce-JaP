document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    /* Evento al id "goodBye" para que remueva el usuario de localstorage y se diriga a login.html
    variable para traer el usuario y en caso de que sea null se diriga a login.html */
    document.getElementById("goodBye").addEventListener("click", () =>{
        localStorage.removeItem("Usuario");
        location.href = "login.html";
    })

    let usuario = localStorage.getItem('Usuario');
    
        if(usuario==null){
            location.href= "login.html";
        }
});