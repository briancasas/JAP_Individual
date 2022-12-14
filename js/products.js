
//array donde se cargarán los datos recibidos:
let currentProductsArray = [];
let minCost = undefined;
let maxCost = undefined;
let search = "";


function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

/////////Función para recorrer el Array y agregar elementos al HTML.///////////////
function showProductsList() {
    let htmlContentToAppend = "";

    for (let products of currentProductsArray.products) {

        /////////////////////////////***Condicional para filtro por precio***////////////////////////////////
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {
            ////////////////Condicional para busca de caracteres en nombre y descripcion del producto.***////////////////////////                
            if (products.name.toLowerCase().includes(search.toLowerCase()) || products.description.toLowerCase().includes(search.toLowerCase())) {
                htmlContentToAppend += `
                <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                 <div class="row">
                    <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>`+ products.name + ` - ` + products.currency + ` ` + products.cost + `</h4> 
                                <p> `+ products.description + `</p> 
                            </div>
                            <small class="text-muted">` + products.soldCount + ` vendidos</small> 
                        </div>

                    </div>
                </div>
                </div>`

                document.getElementById("product-list-container").innerHTML = htmlContentToAppend; //Por medio de DOM agregamos al html
            }
        }
    }

}

document.addEventListener("DOMContentLoaded", function (a) {
    let idCatGet = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + idCatGet + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data
            showProductsList()
        }
    });

    //con metodo sort ordenamos el Array segun el costo del producto de menor a mayor, ***tener en cuenta el tipo de dato*** en este caso se tuvo que pasar a entero.
    document.getElementById("sortACost").addEventListener("click", function () {
        currentProductsArray.products.sort(function (a, b) {
            return parseInt(a.cost) - parseInt(b.cost);
        });
        showProductsList(currentProductsArray);
    });

    //con metodo sort ordenamos el Array segun el costo del producto de mayor a menor

    document.getElementById("sortDeCost").addEventListener("click", function () {
        currentProductsArray.products.sort((a, b) => {
            return parseInt(b.cost) - parseInt(a.cost);
        });
        showProductsList(currentProductsArray);
    });

    ////////Ordenamos el Array según su relevancia ***Se toma como más relevante el producto mas vendido***/////////////

    document.getElementById("sortByRel").addEventListener("click", function () {
        currentProductsArray.products.sort((a, b) => {
            return parseInt(b.soldCount) - parseInt(a.soldCount);
        });
        showProductsList(currentProductsArray);

    });
    ///////////Escucha de evento para limpiar inputs de filtro y search////////////////////
    document.getElementById("clearRangeFilterCost").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";
        document.getElementById("buscador").value = "";

        minCost = undefined;
        maxCost = undefined;
        search = "";
        showProductsList(currentProductsArray);
    });
    ///////////Escucha de evento Input *search* de busqueda por caracteres nombre y descripcion//////////
    document.getElementById("buscador").addEventListener("input", function () {

        search = document.getElementById("buscador").value;
        showProductsList(currentProductsArray);
    });


    /////////Escucha de evento de filtro por precio///////////////////////////
    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por costo
        //de costo por producto.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList();

    });
})



