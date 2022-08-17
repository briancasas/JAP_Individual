
function validacion() {
    let pass = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;

    if ((pass == "" || email == "") || (pass == "" && email == ""))
        return alertaAdv();

    else {
       alertSucc();
       setInterval(10000);
       redirPortada();

    }

}
function alertSucc() {
    let alertaSucces = "";
    alertaSucces +=
        `<div class="alert alert-success" role="alert">
    <p> Datos ingresados correctamente! </p>
    </div>

    `
    document.getElementById("alertaWarning").innerHTML = alertaSucces;

}

function alertaAdv() {
    let alertaWarn = "";
    alertaWarn +=
        `<div class="alert alert-warning" role="alert">
    <p> Todos los campos son obligatorios</p>
    </div>

    `
    document.getElementById("alertaWarning").innerHTML = alertaWarn;

}

const boton = document.getElementById("btnIng");
boton.addEventListener("click", validacion);

function redirPortada() {
    window.location.href = "portada.html";
}


