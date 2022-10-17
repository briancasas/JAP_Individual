let prodCart = "25801";
let infCartProds= "";
let btnInp = document.getElementsByClassName("inCount");
let newItemCart = JSON.parse(localStorage.getItem("Articles:"))

/////////////////////////////////Funcion para mostrar carrito//////////////////////////////////////////////
function showCart(){

addToCartHtml = ""


console.log(infCartProds.articles)
for(let cart of infCartProds.articles){
    
    addToCartHtml += ` <img src="${cart.image}" class="prodCartImg"> <div class="row justify-content-evenly">
       <div class="col-2">${cart.name}</div>    
       <div class="col-2">${cart.currency} ${cart.unitCost}</div>     
       <div class="col-2"><input class="inCount" type="number" value="${cart.count}" min="1"></div>    
       <div class="col-2"><span id="productSubtotal"></span></div> 
       </div> `


       
    }
       
    document.getElementById("ProdsCart").innerHTML = addToCartHtml;
    
///////////////////////////Se ejecuta la función de actualizar subtotal para que no quede un campo vacío/////////////////////
    updateSubtotal(infCartProds)
/////////////////////Escucha de evento para ejecutar la función cuando se detecte cambio en el input de cantidad///////////////


    document.getElementsByClassName("inCount")[0].addEventListener("change", () => {
      updateSubtotal(infCartProds);
      
    });
}


/////////////////////////////////////////////Función para actualizar Subtotal/////////////////////////////////////////////

const updateSubtotal = (infCartProds) => {
    for (let i = 0; i < infCartProds.articles.length; i++) {
      let prod = infCartProds.articles[i];
      let prodCurrency = prod.currency;
      let prodUnitCost= prod.unitCost;
      
    for (let j=0; j<btnInp.length; j++){
      counterBtns = btnInp[j];
      let count = counterBtns.value;
      
      let subtotal = count * prodUnitCost;
      
      document.getElementById("productSubtotal").innerHTML = `${prodCurrency} ${subtotal}`;
    
    }
  }
}

 /*function showNewProducts(){
   newItemCart = JSON.parse(localStorage.getItem("Articles:"));

for(let items of newItemCart){

    addToCartHtml += ` <img src="${items.image}" class="prodCartImg"> <div class="row justify-content-evenly">
      <div class="col-2">${items.name}</div>    
   <div class="col-2">${items.currency} ${items.unitCost}</div>     
     <div class="col-2"><input class="inCount" type="number" value="${items.count}" min="1"></div>    
      <div class="col-2"><span id="productSubtotal"></span></div> 
      </div> `


       
    }
       
    document.getElementById("ProdsCart").innerHTML = addToCartHtml;
    
///////////////////////////Se ejecuta la función de actualizar subtotal para que no quede un campo vacío/////////////////////
    updateSubtotal(newItemCart)
/////////////////////Escucha de evento para ejecutar la función cuando se detecte cambio en el input de cantidad///////////////


    document.getElementsByClassName("inCount").addEventListener("change", () => {
      updateSubtotal(newItemCart);
      
    });
    
}*/

  




document.addEventListener("DOMContentLoaded", function (a) {
    getJSONData(CART_INFO_URL + prodCart + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infCartProds = resultObj.data;


            


        }
       showCart();
       //showNewProducts();
        
    });

   
    
})

