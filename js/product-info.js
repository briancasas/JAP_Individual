let infProductList = [];
let photos = [];

function showProductDescription(){
    let htmltoadd = "";
    
    htmltoadd = `
    <h1 "mb-1">${infProductList.name}</h1>
    <hr>
    <p class= "list-gropu-item"><strong>Precio: </strong> 
    </br> ${infProductList.currency} ${infProductList.cost}</p>
    <p><strong>Descripción: </strong>
     </br>${infProductList.description}</p>
     <p><strong>Categoría: </strong>
     </br>${infProductList.category}</p>
     <p><strong>Cantidad de vendidos: </strong>
     </br>${infProductList.soldCount}</p>`+
    //////////////////////////Carrucel de imagenes////////////////
    `
    <span><strong>Imagenes ilustrativas</strong></span>
  <div class="img-inf">
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[0]}" width="23%" /><span><img src="${infProductList.images[0]}" /></span></a>
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[1]}" width="23%" /><span><img src="${infProductList.images[1]}" /></span></a> 
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[2]}" width="23%" /><span><img src="${infProductList.images[2]}" /></span></a> 
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[3]}" width="23%" /><span><img src="${infProductList.images[3]}" /></span></a> 
    
    </div>
    
    `
    
    document.getElementById("InfoProd").innerHTML = htmltoadd;
    
    }




document.addEventListener("DOMContentLoaded", function (a) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infProductList = resultObj.data
            showProductDescription(infProductList);
            console.log(infProductList); 
        }
  
  
  
  
  
    });

})
