let prodCart = "25801";
let infCartProds = "";
let inputCount = document.getElementById('inCount');
let money = 42;
let userCart = [];
let artCart = JSON.parse(localStorage.getItem("Articles:"));
let subtotalProd = document.getElementById("productSubtotal");
let subtotal = 0;
let costExhange = "";
let costNewCurrency = "USD";
let ExchangeType = 42;
let stotal = "";
let standard = document.getElementById('standard');
let express = document.getElementById('express');
let premium = document.getElementById('premium');
let shippingCost = 0;
let allSubtotals = document.getElementById("subt");
let shippingTotal = document.getElementById("envio");
let storageSubt = localStorage.getItem("subtotales");
let storageCount = localStorage.getItem("ItemaCount")
let totalCost = document.getElementById("total");
let shippingPer = 0.15;
/////////////////////////////////Funcion para mostrar carrito//////////////////////////////////////////////

function showCart() {

  addToCartHtml = ""

  for (let cart of infCartProds.articles) {
    stotal += cart.unitCost;
    addToCartHtml += ` <img src="${cart.image}" class="prodCartImg"> <div class="row justify-content-evenly">
         <div class="col-2">${cart.name}</div>    
         <div class="col-2">${cart.currency} ${cart.unitCost}</div>     
         <div class="col-2"><input id="inCount" type="number" value="1" min="1"></div>    
         <div class="col-2"><strong><span id="productSubtotal">  </span></strong> -  <button type="button" class="btn btn-danger" id="delete${cart}">
         <i class="far fa-trash-alt"></i>
         </button></div> 
         </div> `


  }
  document.getElementById("ProdsCart").innerHTML = addToCartHtml;


  ///////////////////////////Se ejecuta la función de actualizar subtotal para que no quede un campo vacío/////////////////////
  updateSubtotal(infCartProds);

  /////////////////////Escucha de evento para ejecutar la función cuando se detecte cambio en el input de cantidad///////////////


  document.getElementById("inCount").addEventListener("change", () => {
    updateSubtotal(infCartProds);

  });
}



/////////////////////////////////////////////Función para actualizar Subtotal/////////////////////////////////////////////



let updateSubtotal = (infCartProds) => {
  for (let i = 0; i < infCartProds.articles.length; i++) {
    let prod = infCartProds.articles[i];
    let prodCurrency = prod.currency;
    let prodUnitCost = prod.unitCost;

    if (prodCurrency === 'UYU') {
      costExhange = Math.round(prodUnitCost / ExchangeType);
    }
    else costExhange = prodUnitCost;


    let count = document.getElementById("inCount").value;
    localStorage.setItem("itemCount", count)
    subtotal = localStorage.getItem("itemCount") * prodUnitCost;
    localStorage.setItem("subtotales", subtotal);



    document.getElementById("productSubtotal").innerHTML = `${costNewCurrency} ${subtotal}`;
    let TotalShipp = Math.round(shippingPer * subtotal);
    allSubtotals.innerHTML = `${costNewCurrency} ${subtotal}`
    totalCost.innerHTML = `${costNewCurrency} ${TotalShipp + subtotal}`;
    shippingTotal.innerHTML = `${costNewCurrency} ${TotalShipp}`


  }
}

////////// Escucha de evento que recarga la pagina/////////////
document.addEventListener(`DOMContentLoaded`, function (e) {

  ///////////Escuchas de evento para modificar valor de envío////
  standard.addEventListener('change', () => {
    shippingPer = 0.05;
    updateSubtotal(infCartProds);

  });
  express.addEventListener('change', () => {
    shippingPer = 0.07;
    updateSubtotal(infCartProds);

  });

  premium.addEventListener('change', () => {
    shippingPer = 0.15;
    updateSubtotal(infCartProds);
  });
})






document.addEventListener("DOMContentLoaded", function (a) {
  getJSONData(CART_INFO_URL + prodCart + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infCartProds = resultObj.data;

    }
    showCart();


  });



})

