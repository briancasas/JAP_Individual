
//array donde se cargarán los datos recibidos:
let productsArray = [];


function showProductsList() {
    let htmlContentToAppend = "";

    for (let products of productsArray.products) {
        htmlContentToAppend += `
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
        `
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
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
