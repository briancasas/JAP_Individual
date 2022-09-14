let infProductList = [];
let infProductComents = {};
let photos = [];
let infoP = localStorage.getItem("ProdID");

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
     </br>${infProductList.soldCount}</p>` +


        //////////////////////////Imagenes////////////////

        `<span><strong>Imagenes ilustrativas</strong></span>
    <div class="img-inf">
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[0]}" width="23%" /><span><img src="${infProductList.images[0]}" ></span></a>
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[1]}" width="23%" /><span><img src="${infProductList.images[1]}" ></span></a> 
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[2]}" width="23%" /><span><img src="${infProductList.images[2]}" ></span></a> 
    <a class="thumbnail" href="#thumb"><img src="${infProductList.images[3]}" width="23%" /><span><img src="${infProductList.images[3]}" ></span></a> 
    </div></br></br></br>`


    document.getElementById("InfoProd").innerHTML = htmltoadd;

}






//////////////////////Funcion para mostrar comentarios de los productos//////////////////////////////

function showProductComents() {
    let agregarComentario = "";


    for (let i = 0; i < infProductComents.length; i++) {
        let coments = infProductComents[i];
        console.log(coments.score);

        agregarComentario += `<li id="comentsList" list-style: none;><strong>${coments.user}</strong> ${coments.dateTime} ${showStars(coments.score)} 
        </br>${coments.description}</li>`

        document.getElementById("comments").innerHTML = agregarComentario+newComent

        
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
            infProductComents = resultObj.data
            showProductComents(infProductComents);
            console.log(infProductComents);
        }

    });

})
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


let newComent = [];

document.getElementById("getCom").addEventListener("click", function(){

    let nuevoDato = document.getElementById("comArea").value;
    let rateNew = document.getElementById("getRate").value;
    let today = new Date();
    let now = today.toLocaleString("sv-SE");

    newComent += `<li id="comentsList" list-style: none><strong>${localStorage.getItem("User")}</strong> ${now} ${showStars(rateNew)}
    </br>${nuevoDato}</li>`;

    document.getElementById("comments").innerHTML = newComent;

    document.getElementById("comArea").value="";

    let newComent_json = JSON.stringify(newComent);

    localStorage.setItem("newCom", newComent_json);

});

//Recuperar datos.
document.addEventListener("DOMContentLoaded", function(){

    if(localStorage.getItem("newCom")){

       newComent_json = localStorage.getItem("newCom");

        newComent = JSON.parse(newComent_json);

        document.getElementById("comments").innerHTML += newComent;
    }
    console.log(newComent);
});


