
function validacion() {
    let pass = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;

    if (pass == "" || email == "")
        alert("todos los campos son obligatorios");


    else {
        alert("Datos ingresados correctamente")
        redirPortada();
    }

}

const boton = document.getElementById("btnIng");
boton.addEventListener("click", validacion);

function redirPortada() {
    window.location.href = "portada.html";
}


