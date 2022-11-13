let prodCart = "25801";
let infCartProds = "";
////////////// Array Vacío para almacenar productos////////////////////
let userCart = [];
////////////// Llamado a los articulos del local storage //////////////
let artCart = JSON.parse(localStorage.getItem("Articles:"));
let cartTotal;
let subtotal = 0;
let costExhange = "";
let costNewCurrency = "USD";
let ExchangeType = 42;
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
let countP = "no";
let cartOk = "no";
////////////////////////////////////////**************************************************//////////////////////////////////////////




/////////////////////////////////Funcion para mostrar carrito/////////////////////////////////////////////////////////

function showCart() {

  addToCartHtml = ""
 if(artCart !== null){
  for (let index = 0; index < artCart.length; index++) {
    let cart = artCart[index];
    
    addToCartHtml += ` <img src="${cart.image}" class="prodCartImg"> <div class="row justify-content-evenly">
         <div class="col-2">${cart.name}</div>    
         <div class="col-2">${cart.currency} ${cart.unitCost}</div>     
         <div class="form-group col-2"><input id="count${index}" type="number" class="form-control inpQty" min="1" value="1"></div>    
         <div class="col-2"><strong><span>${costNewCurrency}</span> <span id="productSubtotal${index}" class="subPerUnit">` + (cart.count * exchange(cart)) + `  </span></strong>  <button type="button" class="btn-sm btn-danger" id="${index}" onclick="prodDelete(${index})"><i class="far fa-trash-alt"></i>
         </button></div> 
         </div><hr></div> `


  }}
  document.getElementById("ProdsCart").innerHTML = addToCartHtml; //Pinta mediante DOM los objetos del carrito


  ///////////////////////////Se ejecuta la función que que agrega las escuchas de eventos de los inputs/////////////////////
  inputEvents(artCart);
  nonCartProducts(artCart);

}




///////////////////////////// Escuchas de evento para inputs////////////////////////////

function inputEvents(artCart) {
  let arrayInps = document.getElementsByClassName('inpQty'); //Se crea un array con todos los inps de cantidad 
  for (let i = 0; i < arrayInps.length; i++) { //recorremos el array para identificar cada inp agregado
    let inpCount = document.getElementById('count' + i); //Se crea variable que contiene cada uno de estos inputs
    inpCount.addEventListener('change', () => { //Se agrega el evento change a cada uno de ellos
      valueInp = inpCount.value; //
      let subtotal = valueInp * exchange(artCart[i]);
      document.getElementById('productSubtotal' + i).innerHTML = subtotal;
      showTotals();
    });
  }
}


//////////////////////////////cambio de moneda de pesos a dolares/////////////////////////////////////////
function exchange(product) {
  if (product.currency == "UYU") {
    unitSubtotal = product.unitCost / ExchangeType
  } else {
    unitSubtotal = product.unitCost;
  }
  return Math.round(unitSubtotal)

}

///////////////////////////////// actualizacion de totales ////////////////////////////////////
function showTotals() {
  let subtotalsArray = document.getElementsByClassName('subPerUnit');
  let totalCost = 0;
  for (let i = 0; i < subtotalsArray.length; i++) {
    let valueSubs = subtotalsArray[i];
    totalCost += parseFloat(valueSubs.innerText);
  }

  let costShipping = shippingPer * totalCost;
  let totalPrice = totalCost * (1 + shippingPer);
  let htmlSub = costNewCurrency + " " + Math.round(totalCost)
  let htmlShipping = costNewCurrency + " " + Math.round(costShipping)
  let htmlTotal = costNewCurrency + " " + Math.round(totalPrice)

  document.getElementById("subt").innerHTML = htmlSub;
  document.getElementById("shippT").innerHTML = htmlShipping;
  document.getElementById("tot").innerHTML = htmlTotal;

}

////////// Escucha de evento que recarga la pagina/////////////
document.addEventListener(`DOMContentLoaded`, function (e) {

  ///////////Escuchas de evento para modificar valor de envío////
  standard.addEventListener('change', () => {
    shippingPer = 0.05;
    showTotals()

  });
  express.addEventListener('change', () => {
    shippingPer = 0.07;
    showTotals();

  });

  premium.addEventListener('change', () => {
    shippingPer = 0.15;
    showTotals();
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
  let allInputsCount = document.getElementsByClassName('inpQty');
  for (let i = 0; i < allInputsCount.length; i++) {
    let inputId = document.getElementById('count' + i)
    if (inputId.value == undefined || inputId.value < 1) {


      document.getElementById("alertInp").innerHTML = `La cantidad en ${artCart[i].name} no puede ser vacía o ser menor a 1`;

      inputId.focus();
      countP = "no"
    }
    else {
      countP = "si"
      document.getElementById("alertInp").innerHTML = "";
    }

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

  nonCartProducts()
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

};

creditRadio.addEventListener('change', radioCreditSelected);

function radioTransferSelected() {
  transfNum.disabled = false;
  cardNum.disabled = true;
  expMonth.disabled = true;
  codSeg.disabled = true;

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


/////////////////////////////////funcion feedback si el carrito está vacío////////////////////////////////////////
function nonCartProducts(){
  if(document.getElementById("ProdsCart").innerText === "" || localStorage.getItem("Articles:") === null){
    cartOk="no"
    document.getElementById("paid-success").innerHTML = `<div class="alert alert-warning" role="alert">
    <p> No hay productos en el carrito, si desea agregar productos, dirigete al <a href="categories.html">Catalogo</a> </p>
    </div>`}
    else{
      cartOk ="si";
    }
}

/////////////////////////////Funcion con condicionales para enviar o no el alerta de compra exitosa////////////////////

function purchaseButton() {
  if (address.value != "" && addressNum.value != "" && esqAddress.value != "" && shipp === "si" && pay === "si" && countP === "si" && cartOk ==="si") {
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






///////////////////Eliminar producto del carrito/////////////////////////////////////////

const prodDelete = (index) => {

  artCart.splice(index, 1)

  document.getElementById('ProdsCart').innerHTML = ``
  localStorage.setItem('Articles:', JSON.stringify(artCart));

  showCart();
  nonCartProducts();
  showTotals();

}



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
    showTotals();
    nonCartProducts()
  });
})

