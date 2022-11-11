const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let storageImgProfile = localStorage.getItem('Profiles:')
let usersName = localStorage.getItem("User");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("User").innerHTML = localStorage.getItem("User");
  document.getElementById("SignOut").addEventListener("click", function () {
    window.localStorage.removeItem("User");
  })
  if (localStorage.getItem('Profiles:') !== null) {
    storageImgProfile = JSON.parse(localStorage.getItem('Profiles:'))
    storageImgProfile.forEach(element => {

      if (element.name === usersName) {
        let img = document.getElementById('profileImg');
        img.src = element.image;
      }

    });

  }
  (function(){
    /** @type {Node} */
    var imgInput = document.getElementById( "imagen-entrada" ),
    /** @type {Node} */
    imgContainer = document.getElementById( "profileImg" ),
    imgContainer2 = document.getElementById( "profileImg2" ),
    /** Restore image src from local storage */
    updateUi = function() {
      imgContainer.src = window.localStorage.getItem( usersName + "image-base64" );
      imgContainer2.src = window.localStorage.getItem( usersName + "image-base64" );
    },
    /** Register event listeners */
    bindUi = function(){
      imgInput.addEventListener( "change", function(){
        if ( this.files.length ) {
          var reader = new FileReader();
          reader.onload = function( e ){
            window.localStorage.setItem(usersName + "image-base64", e.target.result );
            updateUi();
          };
          reader.readAsDataURL( this.files[ 0 ] );
        }
      }, false );
    };

updateUi();
bindUi();
}())

})
