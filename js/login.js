let cartUser = [];
//Función que valida los input de inicio de sesión.
function validacion() {
    let pass = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;

    if ((pass == "" || email == "") || (pass == "" && email == ""))
        return alertaAdv();

    else {
        localStorage.setItem("User", email)
        cartCreate();
        redirPortada();

    }

}
//Función de feedback para el usuario que deja campo vacíos.
function alertaAdv() {
    let alertaWarn = "";
    alertaWarn +=
        `<div class="alert alert-warning" role="alert">
    <p> Todos los campos son obligatorios</p>
    </div>

    `
    document.getElementById("alertaWarning").innerHTML = alertaWarn;

}
// Evento que ejecuta la validación.
const boton = document.getElementById("btnIng");
boton.addEventListener("click", validacion);

//Función para redireccionar a la portada (página principal) del E-Commerce
function redirPortada() {
    window.location.href = "portada.html";
}

function cartCreate(){
   let userToCart = localStorage.getItem("User");
   localStorage.setItem("Cart", userToCart.concat("A"))
}


