let infProductList = [];
let infProductComents = [];
let photos = [];
let infoP = localStorage.getItem("ProdID");
let arrayComs = [];




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






//////////////////////Funcion para mostrar comentarios de los productos//////////////////////////////

function showProductComents() {
    let agregarComentario = "";

    for (let i = 0; i < infProductComents.length; i++) {
        let coments = infProductComents[i];



        agregarComentario += `<li id="comentsList" list-style: none;><strong>${coments.user}</strong> ${coments.dateTime} ${showStars(coments.score)} 
        </br>${coments.description}</li>`

        document.getElementById("comments").innerHTML = agregarComentario //newComent




    }

}
document.addEventListener("DOMContentLoaded", function (a) {

    getJSONData(PRODUCT_INFO_URL + infoP + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infProductList = resultObj.data
            showProductDescription(infProductList);
            console.log(infProductList);
        }

    });

})

document.addEventListener("DOMContentLoaded", function (a) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL + infoP + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infProductComents = resultObj.data;



            let newCom = localStorage.getItem("Nuevo comentario")
            newCom_obj = JSON.parse(newCom);
            //////////////Condicional para que traiga el comentario con mismo id que el producto////////////////////////////////
            //if (newCom_obj.product == parseInt(infoP)) {}
            infProductComents.push(JSON.parse(newCom))
            
            showProductComents(infProductComents);
            console.log(infProductComents);

        }
    });

    console.log(localStorage.getItem("Nuevo comentario"));

});
/////////////////Escucha de evento para boton de enviar comentario///////////////////////
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
    }

    let newComentary_json = JSON.stringify(newComentary);
    arrayComs += newComentary_json;


    localStorage.setItem("Nuevo comentario", arrayComs);

});



///////////////////Funcion para mostrar estrellas//////////////
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



