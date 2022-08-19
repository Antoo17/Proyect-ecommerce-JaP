/* PASO A PASO
Se crea constante para guardar la url. Se crea un array para guardar el json
Con el DOM cargado se utiliza la función getJSONData del script init.js que nos pide la url y con el then le pasamos otra función
con el resultado. Si el estatus del resultado está ok se carga en el array creado "ProductsArray".
Con el DOM se agarra el ID "category" para que con innerHTML ingrese del json.data el catName.
Por último se llama a la función showProductsList pasándole el parámetro del array que traerá de forma dinámica los datos
del json a la página productos.html. */

const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let ProductsArray = [];

document.addEventListener("DOMContentLoaded", () =>{
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            ProductsArray = resultObj.data.products
            console.log(ProductsArray);
            document.getElementById("category").innerHTML = resultObj.data.catName;
            showProductsList(ProductsArray);
            
        }
    });
})

/* PASO A PASO
Esta función tiene como parámetro el array ProductsArray en el cual se ingresa una variable vacía "showInfo".
y con el for se indica que para cada auto del array ProductsArray deberá cargar en "showInfo" todas las etiquetas div con sus clases donde se especifica con los backticks la expresión para acceder a la propiedad correspondiente que queremos mostrar. 
Por último, se carga la información de "showInfo" en la etiqueta div con id "cat-list-container".*/

function showProductsList(ProductsArray){

    let showInfo = "";
    for (let cars of ProductsArray){
        showInfo += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${cars.image}" alt="${cars.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${cars.name} - ${cars.currency} ${cars.cost}</h4>
                        <small class="text-muted">${cars.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${cars.description}</p>
                </div>
            </div>
        </div>`
    }
            

    document.getElementById("cat-list-container").innerHTML = showInfo;
}