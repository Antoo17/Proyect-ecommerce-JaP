const prod_priceASC = "Asc";
const prod_priceDESC = "Desc";
const order_productCount = "Cant.";

/********* Función de orden *********/

/*Creamos array vacío, si el parámetro criteria es igual a la constante prod_priceASC
se carga en resultado el array ordenado según la condición que si el precio del producto a es menor al de b lo coloca en primer lugar; de lo contrario se coloca a b primero.
Si criteria es igual a prod_priceDESC entonces cargará en primer lugar el precio de a si es mayor que el de b.
El último else if ordena según cantidad de productos en forma descendente. Es decir, si a es mayor lo pone primero descendiendo los demás elementos en la cantidad de productos*/

function sortProducts(order, array){
    let result = [];
    if (order === prod_priceASC)
    {
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (order === prod_priceDESC){
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (order === order_productCount){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, listprodsArray){
    criteriaOrder = sortCriteria;

    if(listprodsArray != undefined)
    {listprodsArray = ProductsArray;}

    ProductsArray = sortProducts(criteriaOrder, ProductsArray);

    //Se muestran los productos ordenados
    ProductsList(ProductsArray);
}

/********* Función de filtrado *********/

/*Se agarra el valor de cada input y se lo guarda en las variables priceMin y priceMax.
Se define un array vacío donde guardaremos los elementos filtrados.
Dicho filter se aplica al array "ProductsArray" para filtrar, de productos, el costo de cada uno y se especifica como parámetro
en una función que determine que el costo de los productos sea mayor o igual al priceMin y menor o igual a priceMax.
Este array se pasa como parámetro de la función ProductsList para que muestre solo los elementos que se filtren acá.*/

function filterProducts(){

    let priceMin = document.getElementById("rangeFilterCountMin").value;
    let priceMax = document.getElementById("rangeFilterCountMax").value;

    let productsFiltered = [];

    productsFiltered = ProductsArray.filter(prods => parseInt(prods.cost) >= priceMin && parseInt(prods.cost) <= priceMax);
    ProductsList(productsFiltered);
}

/********* Función buscar por palabra *********/
/*Variable donde se guarda el valor del input con id "searchProduct".
Array donde guardaremos la información "productFilteredByWord".
Ciclo for: para la variable producto de ProductsArray se crea una variable donde guardaremos el nombre del producto considerando minúsuclas.
Condición: si el usuario escribe x letra y la encuentra retornará cualquier cosa a -1. Dicha variable donde guardamos el valor ingresado es diferente de -1 se agrega el elemento con push al array productoFilteredByWord
IndexOf retorna el primer índice en el que se puede encontrar un elemento.*/

function searchForWord (){
    let searchWord = document.getElementById("searchProduct").value.toLowerCase();
    let productFilteredByWord = [];
    for(let product of ProductsArray){
        let nameProduct = product.name.toLowerCase()
        let infoProduct = product.description.toLowerCase()
        if ((nameProduct.indexOf(searchWord) !== -1)||(infoProduct.indexOf(searchWord) !== -1)){
            productFilteredByWord.push(product)
        }
        ProductsList(productFilteredByWord);
    }
}

/********* Traer información con FETCH *********/
/*Se crea constante para guardar la url. En la variable ProductsArray se guarda el json.
Con el DOM contentLoaded cargado se utiliza la función getJSONData del script init.js que nos pide la url y con el then le pasamos otra función.
con el resultado. Si el estatus del resultado está ok se carga en el array creado "ProductsArray".
Agarro el ID "category" para que con innerHTML ingrese del json.data el catName correspondiente.
Por último se llama a la función ProductsList pasándole el parámetro del array que traerá de forma dinámica los datos
del json a la página productos.html. */

let categories = localStorage.getItem("catID");

const url = `https://japceibal.github.io/emercado-api/cats_products/${categories}.json`;
let ProductsArray = [];

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            ProductsArray = resultObj.data.products
            console.log(ProductsArray);
            document.getElementById("category").innerHTML = resultObj.data.catName
            ProductsList(ProductsArray);   
        }
    });

    document.getElementById("costAsc").addEventListener("click", ()=> {
        sortAndShowProducts(prod_priceASC);
    });

    document.getElementById("costDesc").addEventListener("click", ()=> {
        sortAndShowProducts(prod_priceDESC);
        
    });
    document.getElementById("sortByCount").addEventListener("click", ()=> {
        sortAndShowProducts(order_productCount);
    });

    document.getElementById("rangeFilterCount").addEventListener('click', () => {
        filterProducts();
        })

    document.getElementById("clearRangeFilter").addEventListener("click", () => {
        ProductsList(ProductsArray);

        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        });
    
    document.getElementById("searchProduct").addEventListener("keyup", ()=> {
        searchForWord()
    })
})

/********* Función para mostrar los productos *********/ 
/*En esta función se ingresa una variable vacía "showInfo".
Con el for se indica que para cada auto del array listProducts (general) deberá cargar en "showInfo" todas las etiquetas div con sus clases donde se especifica con los backticks la expresión para acceder a la propiedad correspondiente que queremos mostrar. 
Por último, se carga la información de "showInfo" en la etiqueta div con id "cat-list-container".
Una vez cargado el DOM, se hace uso de esta función para mostrar el array "ProductsArray"*/

function ProductsList(listProducts){
    let showInfo = "";
    for (let prods of listProducts){
        showInfo += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${prods.image}" alt="${prods.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${prods.name} - ${prods.currency} ${prods.cost}</h4>
                        <small class="text-muted">${prods.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${prods.description}</p>
                </div>
            </div>
        </div>`
    }
            

    document.getElementById("cat-list-container").innerHTML = showInfo;
}
