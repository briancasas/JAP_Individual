let infProductList = [];
let infProductComents = [];
let photos = [];
let infoP = localStorage.getItem("ProdID");
let arrayComs = [];
let newCom = localStorage.getItem("Nuevo comentario")


///////////// Funcion para mostrar descripcion de los productos///////////////////////////////////////
function showProductDescription() {
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
     </br>${infProductList.soldCount}</p>`

//////////////////////////////Recorrer imagens y mostrarlas////////////////////////////////////////////////
    let imgs = "";
    for (rutaImg of infProductList.images) {
        imgs += `<a class="thumbnail" href="#thumb"><img src="${rutaImg}" width="23%" /><span><img src="${rutaImg}" ></span></a>`;
        document.getElementById("imgs-Id").innerHTML = imgs;
    }

    document.getElementById("InfoProd").innerHTML += htmltoadd;
}


///////////////////////////////Escucha de evento para mostrar Info de productos *cuando carga el html*//////////////////////////

document.addEventListener("DOMContentLoaded", function (a) {

    getJSONData(PRODUCT_INFO_URL + infoP + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infProductList = resultObj.data
            showProductDescription(infProductList);
            console.log(infProductList);
        }

    });

})
///////////////////////////Escucha de evento para mostrar comentarios de los productos *cuando carga el html*////////////////////

document.addEventListener("DOMContentLoaded", function (a) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL + infoP + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infProductComents = resultObj.data;


            newCom_obj = JSON.parse(newCom);

            //////////////Condicional para que traiga el comentario con mismo id que el producto////////////////////////////////

            if ((newCom === null) || (newCom_obj.product !== parseInt(infoP))) {
                showProductComents(infProductComents);


            } else if (newCom_obj.product === parseInt(infoP)) {
                showNewComents(infProductComents);
            }

        }
    });

});

/////////////////Escucha de evento para boton de enviar comentario a local storage///////////////////////

document.getElementById("getCom").addEventListener("click", function () {

    let nuevoDato = document.getElementById("comArea").value;
    let rateNew = document.getElementById("getRate").value;
    let today = new Date();
    let now = today.toLocaleString("sv-SE");


    let newComentary = {
        product: parseInt(localStorage.getItem("ProdID")),
        description: nuevoDato,
        score: parseInt(rateNew),
        user: localStorage.getItem("User"),
        dateTime: now,
    };

    let newComentary_json = JSON.stringify(newComentary);
    arrayComs.push(newComentary_json);

    localStorage.setItem("Nuevo comentario", arrayComs);

    
////////////// guardar array de obj en localstorage///////////

    /*let datos_existentes = localStorage.getItem('Nuevo comentario');
    datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    datos_existentes.push(newComentary);
    localStorage.setItem('Nuevo comentario', JSON.stringify(datos_existentes));
    */

});



//////////////////////////////////Funcion para mostrar estrellas////////////////////
function showStars(n) {
    let okStars = "";
    let nonStars = "";

    for (j = 0; j < 5; j++) {
        if (j < n) {
            okStars += `<span class="fa fa-star checked"></span>`;
        }
        else if (j >= n) {
            nonStars += `<span class="fa fa-star"></span>`;
        }
    }
    return okStars + nonStars;
}

//////////////////////Funcion para mostrar comentarios viejos de los productos//////////////////////////////

function showProductComents() {
    let agregarComentario = "";

    for (let i = 0; i < infProductComents.length; i++) {
        let coments = infProductComents[i];

        agregarComentario += `<li id="comentsList" list-style: none;><strong>${coments.user}</strong> ${coments.dateTime} ${showStars(coments.score)} 
        </br>${coments.description}</li>`

        document.getElementById("comments").innerHTML = agregarComentario;

    }
}

/////////////////////////Funcion para mostrar comentarios nuevos + comentarios viejos///////////////////////////

function showNewComents() {
    let agregarComentario = "";
    let newCom = localStorage.getItem("Nuevo comentario")
    infProductComents.push(JSON.parse(newCom))
    for (let i = 0; i < infProductComents.length; i++) {
        let coments = infProductComents[i];


        agregarComentario += `<li id="comentsList" list-style: none;><strong>${coments.user}</strong> ${coments.dateTime} ${showStars(coments.score)} 
        </br>${coments.description}</li>`

        document.getElementById("comments").innerHTML = agregarComentario
    }
}