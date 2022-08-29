
//array donde se cargarán los datos recibidos:
let productsArray = [];

//Función para recorrer el Array de un objeto y agregar elementos al HTML.
function showProductsList() {
    let htmlContentToAppend = "";

    for (let products of productsArray.products) {
        htmlContentToAppend += `
    <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + ` - ` + products.currency +` `+ products.cost +`</h4> 
                        <p> `+ products.description + `</p> 
                        </div>
                        <small class="text-muted">` +  products.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
    </div>
        `
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; //Por medio de DOM agregamos al html
    }
}


document.addEventListener("DOMContentLoaded", function (a) {
    getJSONData(LIST_AUTOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data
            showProductsList(productsArray);
        }
    });
})
