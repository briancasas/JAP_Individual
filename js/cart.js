let prodCart = "25801";
let infCartProds= "";



/////////////////////////////////Funcion para mostrar carrito//////////////////////////////////////////////
function showCart(){
addToCartHtml = ""
for(let cart of infCartProds.articles){
    console.log(parseInt(cart.unitCost));
    console.log(cart.count);
    
    addToCartHtml += ` <img src="${cart.image}" class="prodCartImg"> <div class="row justify-content-evenly">
       <div class="col-2">${cart.name}</div>    
       <div class="col-2">${cart.currency} ${cart.unitCost}</div>     
       <div class="col-2"><input id="inCount" type="number" value="${cart.count}" min="1"></div>    
       <div class="col-2"><span id="productSubtotal"></span></div> 
       </div> `


       
    }
       
    document.getElementById("ProdsCart").innerHTML = addToCartHtml;
    
///////////////////////////Se ejecuta la función de actualizar subtotal para que no quede un campo vacío/////////////////////
    updateSubtotal(infCartProds)
/////////////////////Escucha de evento para ejecutar la función cuando se detecte cambio en el input de cantidad///////////////


    document.getElementById("inCount").addEventListener("change", () => {
      updateSubtotal(infCartProds);
      
    });
}


/////////////////////////////////////////////Función para actualizar Subtotal/////////////////////////////////////////////

const updateSubtotal = (infCartProds) => {
    for (let i = 0; i < infCartProds.articles.length; i++) {
      let prod = infCartProds.articles[i];
      let prodCurrency = prod.currency;
      let prodUnitCost= prod.unitCost;
      
  
      let count = document.getElementById("inCount").value;
      let subtotal = count * prodUnitCost;
  
      document.getElementById("productSubtotal").innerHTML = `${prodCurrency} ${subtotal}`;
      
    }
  }





document.addEventListener("DOMContentLoaded", function (a) {
    getJSONData(CART_INFO_URL + prodCart + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infCartProds = resultObj.data;


            


        }
       showCart();
       
        
    });

   
    
})

