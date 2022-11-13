let userName = localStorage.getItem("User");
let profileStorage = JSON.parse(localStorage.getItem("Profiles:"));
let storage = localStorage.getItem('Profiles:');
let box = [];
let userInp = document.getElementById('firstName');
let secUserInp = document.getElementById('secondName');
let surInp = document.getElementById('surname');
let secSurInp = document.getElementById('secondSurname');
let emailInp = document.getElementById('emailProfile');
let telInp = document.getElementById('telephone');
let profiles = "";








////////////////////////// funcion para agregar el perfil del usuario/////////////////////////////////

const addProfiles = () => {
    let inStorage = false;

    profiles = {
        name: userInp.value,
        secondName: secUserInp.value,
        surName: surInp.value,
        secondSurname: secSurInp.value,
        email: userName,
        telephone: telInp.value,
        image: "",
    };

    if (localStorage.getItem('Profiles:') !== null) { 

        box = JSON.parse(localStorage.getItem('Profiles:'))



        box.forEach(element => {

            if (element.email === userName) {
                inStorage === true
                console.log("repetido")
            }

        }) ////////////////////// si el mail guardado es diferente agrega un nuevo perfil//////////////////
        if (inStorage === false) {
            box.push(profiles)
            console.log("email diferente agrego un nuevo perfil")
            localStorage.setItem('Profiles:', JSON.stringify(box))
        }

    } else { //////////////si no exite el perfil crea uno nuevo/////////////////////
        box.push(profiles)
        console.log("localstorage vacio agrego perfil")
        localStorage.setItem('Profiles:', JSON.stringify(box)) 

    }

    //////////////////////////Validaciones campos obligatorios//////////////////////////////////
    if (!userInp.value) {
        document.getElementById('firstName').classList.add("is-invalid");
        document.getElementById('firstName').classList.remove("is-valid");
      } else {
        document.getElementById('firstName').classList.add("is-valid");
        document.getElementById('firstName').classList.remove("is-invalid");
      }
      if(!surInp.value) {
        document.getElementById('surname').classList.add("is-invalid");
        document.getElementById('surname').classList.remove("is-valid");
      } else {
        document.getElementById('surname').classList.add("is-valid");
        document.getElementById('surname').classList.remove("is-invalid");
      }
      if(!emailInp.value) {
        document.getElementById('emailProfile').classList.add("is-invalid");
        document.getElementById('emailProfile').classList.remove("is-valid");
      } else {
        document.getElementById('emailProfile').classList.add("is-valid");
        document.getElementById('emailProfile').classList.remove("is-invalid");
      }

     
    
}


////////////////////////////// al cargar la pagina si hay perfiles cargados y coinciden con el usuario logueado completa los campos///////////////
document.addEventListener('DOMContentLoaded', function (e) {
    if (localStorage.getItem('Profiles:') !== null) {
        profileStorage.forEach(element => {

            if (element.email === userName) {
                userInp.value = element.name;
                secUserInp.value = element.surName;
                surInp.value = element.secondName;
                secSurInp.value = element.secondSurname;
                emailInp.value = element.email;
                telInp.value = element.telephone;
            }
            

        });
       
    }
    
        else {
            emailInp.value = userName; //////si no hay perfiles del usuario guardados, completa el campo mail con el email logueado/////
        }
    
    
})

/////////////////////Escucha de evento botón agregar perfil//////////////////
document.getElementById("saveProfile").addEventListener('click', addProfiles);






