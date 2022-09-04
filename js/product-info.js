let infProductList = ""


function showProductDescription() {
    let htmlDescriptionAdd = "";

    for (let i = 0; i < infProductList.length; i++) {
        let prodInfo = infProductList[i];


        htmlDescriptionAdd += `
                 <div class="row">
                    <div class="col-3">
                    <img src="` + prodInfo.images + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>`+ prodInfo.name + ` - ` + prodInfo.description + ` ` + prodInfo.cost + `</h4> 
                                <p> `+ products.description + `</p> 
                            </div>
                            <small class="text-muted">` + prodInfo.soldCount + ` vendidos</small> 
                        </div>

                    </div>
                </div>
                </div>
                
        `
        document.getElementById("Inf-Prod").innerHTML = htmlDescriptionAdd;
    }
}

    document.addEventListener("DOMContentLoaded", function (a) {
        getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                infProductList = resultObj.data
                showProductDescription();
                console.log(infProductList);
            }
        });
    })