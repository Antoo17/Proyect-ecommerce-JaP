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

    /*Almacenamos en variable el dato de usuario con getItem y en caso de que sea null se dirigirá a login.html.*/
    let usuario = localStorage.getItem("user");
    
    if(usuario == null){
        location.replace("login.html");}
});