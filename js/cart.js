let prodCart = "25801";
let infCartProds = "";
let inputCount = document.getElementById('inCount');
////////////// Array Vacío para almacenar productos////////////////////
let userCart = [];
////////////// Llamado a los articulos del local storage //////////////
let artCart = JSON.parse(localStorage.getItem("Articles:"));
let subtotalProd = document.getElementById("productSubtotal");
let subtotal = 0;
let costExhange = "";
let costNewCurrency = "USD";
let ExchangeType = 42;
let stotal = "";
//////////////////////////radios método de envío///////////////////////
let standard = document.getElementById('standard');
let express = document.getElementById('express');
let premium = document.getElementById('premium');
///////////////// variable que almacena costo de envío/////////////////
let shippingCost = 0;
//////////////////////// TOTALES almacenados en Localstorage e inputs//
let allSubtotals = document.getElementById("subt");
let shippingTotal = document.getElementById("envio");
let storageSubt = localStorage.getItem("subtotales");
let storageCount = localStorage.getItem("ItemCount")
let totalCost = document.getElementById("total");
///////////////////////////Variable que almacena porcentaje de costo de envío////
let shippingPer = 0;

////////////////////////////////// Booleano Submit/////////////////////////////////////

let submitOK = false;
let submitModal = false;
/////////////////////////////inputs dirección//////////////////////////
let address = document.getElementById("address");
let addressNum = document.getElementById("numAddress");
let esqAddress = document.getElementById("esq");

//////////////////////////// inputs tipos de pago//////////////////////
let codSeg = document.getElementById('cvv');
let expMonth = document.getElementById('month');
let cardNum = document.getElementById('cardNumber');
let transfNum = document.getElementById('transferNumber');
let payButton = document.getElementById("payButton");

/////////// Booleanos para condicionales de metodo de envío, radio del tipo de pago y cantidad de articulos///////////
let shipp = "no";
let pay = "no";
let countP = "no"

////////////////////////////////////////**************************************************//////////////////////////////////////////



if (localStorage.getItem('User') === null) {
  alert("Debes estar logueado para poder acceder al carrito")
  window.location.href = "index.html";

}
/////////////////////////////////Funcion para mostrar carrito/////////////////////////////////////////////////////////

function showCart() {

  addToCartHtml = ""

  for (let cart of infCartProds.articles) {
    stotal += cart.unitCost;
    addToCartHtml += ` <img src="${cart.image}" class="prodCartImg"> <div class="row justify-content-evenly">
         <div class="col-2">${cart.name}</div>    
         <div class="col-2">${cart.currency} ${cart.unitCost}</div>     
         <div class="form-group col-2"><input id="inCount" type="number" class="form-control name="inCount" min="1" value="1"></div>    
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
    validateForm(); //****Cuando detecta un cambio en el input ejecuta la validacion otra vez*****
  });
}



/////////////////////////////////////////////Función para actualizar totales/////////////////////////////////////////////

let updateSubtotal = (infCartProds) => {
  for (let i = 0; i < infCartProds.articles.length; i++) {
    let prod = infCartProds.articles[i];
    let prodCurrency = prod.currency;
    let prodUnitCost = prod.unitCost;

    if (prodCurrency === 'UYU') { ///////Condicional para pasar a dólares si el producto es en pesos//////////////
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


/////////////////////////////// Funcion validation feedback ///////////////////////////////////////////////
function validateForm() {

  if (!submitOK) return


  ///////////////////////////feedback dirección/////////////////////////////////////
  if (!address.value) {
    address.classList.add("is-invalid");
    address.classList.remove("is-valid");
  } else {
    address.classList.add("is-valid");
    address.classList.remove("is-invalid");
  }

  if (!addressNum.value) {
    addressNum.classList.add("is-invalid");
    addressNum.classList.remove("is-valid");
  } else {
    addressNum.classList.add("is-valid");
    addressNum.classList.remove("is-invalid");
  }
  if (!esqAddress.value) {
    esqAddress.classList.add("is-invalid");
    esqAddress.classList.remove("is-valid");
  } else {
    esqAddress.classList.add("is-valid");
    esqAddress.classList.remove("is-invalid");
  }



  /////////////////////////// feedback si cantidad de productos es undefined o menor a 1////////////////////////////////////////////////

  if (localStorage.getItem('itemCount') == null
    || localStorage.getItem('itemCount') < 1) {
    countP = "no"
    document.getElementById("alertInp").innerHTML = `La cantidad en ${infCartProds.articles[0].name} no puede ser vacía o ser menor a 1`;
    document.f1.inCount.classList.add("noCount")
    document.f1.inCount.focus();
  }
  else {
    countP = "si"
    document.f1.inCount.classList.remove("noCount")
    document.getElementById("alertInp").innerHTML = "";
  }



  /////////////////////////////////////////// Condicional feedback método de envío/////////////////////////////////////////////////////

  for (let i = 0; i < document.f1.shipp.length; i++) {

    if (document.f1.shipp[i].checked) {
      shipp = "si";
      document.getElementById("noCheckBox").innerHTML = ""
    }
  }
  if (shipp === "no") {
    document.getElementById("noCheckBox").innerHTML = "Debe seleccionar un método de envío"
  }


  /////////////////////////////////////////// Condicional feedback tipo de pago/////////////////////////////////////////////////////

  for (let i = 0; i < document.formaddress.paymet.length; i++) {

    if (document.formaddress.paymet[i].checked) {
      pay = "si";

      document.getElementById("noCheckRadio").innerHTML = ""
      document.getElementById("modalP").classList.remove("btn-danger");
      document.getElementById("modalP").classList.add("btn-success");
      
    }

  }

  if (pay === "no") {
    document.getElementById("noCheckRadio").innerHTML = "Debe seleccionar una forma de pago"
    document.getElementById("modalP").classList.remove("btn-primary");
    document.getElementById("modalP").classList.add("btn-danger");

  }
}

///////////////////////////// Función Validaciones Modal /////////////////////////////////////////////////
function modalValidation() {
  if (!submitModal) return
  
  if (!cardNum.value) {
    cardNum.classList.add("is-invalid");
    cardNum.classList.remove("is-valid");

  } else {
    cardNum.classList.add("is-valid");
    cardNum.classList.remove("is-invalid");
  }
  if (!codSeg.value || codSeg.value > 999) {
    codSeg.classList.add("is-invalid");
    codSeg.classList.remove("is-valid");
  } else {
    codSeg.classList.add("is-valid");
    codSeg.classList.remove("is-invalid");
  }
  if (!expMonth.value) {
    expMonth.classList.add("is-invalid");
    expMonth.classList.remove("is-valid");
  } else {
    expMonth.classList.add("is-valid");
    expMonth.classList.remove("is-invalid");
  }

  if (!transfNum.value) {
    transfNum.classList.add("is-invalid");
    transfNum.classList.remove("is-valid");
  } else {
    transfNum.classList.add("is-valid");
    transfNum.classList.remove("is-invalid");
  }

  if (document.formaddress.paymet[0].checked) {
    transfNum.classList.remove("is-invalid");
  }
  if (document.formaddress.paymet[1].checked) {
    codSeg.classList.remove("is-invalid");
    expMonth.classList.remove("is-invalid");
    cardNum.classList.remove("is-invalid");
  }


}

document.getElementById("payMetodOk").addEventListener("click", modalValidation)

/////////////// Funciones y eventos para activar y desactivar formas de pago segun seleccion////////////////////////////////////
function radioCreditSelected() {
  transfNum.disabled = true;
  cardNum.disabled = false;
  expMonth.disabled = false;
  codSeg.disabled = false;
  /*transfNum.removeAttribute("required");
  expMonth.setAttribute("required", "");
  codSeg.setAttribute("required", "");
  cardNum.setAttribute("required", "");*/
};

creditRadio.addEventListener('change', radioCreditSelected);

function radioTransferSelected() {
  transfNum.disabled = false;
  cardNum.disabled = true;
  expMonth.disabled = true;
  codSeg.disabled = true;
  /*expMonth.removeAttribute("required");
  codSeg.removeAttribute("required");
  cardNum.removeAttribute("required");
  transfNum.setAttribute("required", "");*/

};

transferRadio.addEventListener('change', radioTransferSelected)
/////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////Funcion que detecta cambios en los inputs y re valida el formulario////////////////////////////////

function loadChangesEvents() {
  let formulario1 = document.getElementById("form-address");
  formulario1.addEventListener("submit", submitEventForm);


  address.addEventListener("keyup", validateForm);
  addressNum.addEventListener("keyup", validateForm);
  esqAddress.addEventListener("keyup", validateForm);
  document.getElementById("transferRadio").addEventListener("click", validateForm);
  document.getElementById("creditRadio").addEventListener("click", validateForm);
  document.getElementById("standard").addEventListener("click", validateForm);
  document.getElementById("express").addEventListener("click", validateForm);
  document.getElementById("premium").addEventListener("click", validateForm);

  cardNum.addEventListener("keyup", modalValidation);
  codSeg.addEventListener("keyup", modalValidation);
  expMonth.addEventListener("keyup", modalValidation);
  transfNum.addEventListener("keyup", modalValidation);

}

//////////////////////Escucha de evento de la pagina que detecta cambios en los input/////////////////////////////////////////
document.addEventListener("DOMContentLoaded", loadChangesEvents);



/////////////////////////////Funcion con condicionales para enviar o no el alerta de compra exitosa////////////////////

function purchaseButton() {
  if (address.value != "" && addressNum.value != "" && esqAddress.value != "" && shipp === "si" && pay === "si" && countP === "si") {
    let alertSuccess = "";
    alertSuccess +=
      `<div class="alert alert-success" role="alert">
    <p> Compra realizada con éxito!</p>
    </div>
  
    `
    document.getElementById("paid-success").innerHTML = alertSuccess;
  }
  else {
    document.getElementById("paid-success").innerHTML = ""
  }
}
////////////////////////////////////////////////Escucha de evento botón de compra//////////////////////////////////
payButton.addEventListener('click', purchaseButton)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function submitEventForm(event) {
  event.preventDefault();
  event.stopPropagation();
  submitOK = true;
  submitModal = true;
  validateForm();
  modalValidation();
}



document.addEventListener("DOMContentLoaded", function (a) {
  getJSONData(CART_INFO_URL + prodCart + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infCartProds = resultObj.data;

    }
    showCart();




  });


})

