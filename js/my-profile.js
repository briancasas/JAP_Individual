let userName = localStorage.getItem("User");
let profileStorage = JSON.parse(localStorage.getItem("Profiles:"));
let storage = localStorage.getItem('Profiles:')
let box = []
let userInp = document.getElementById('firstName')
let secUserInp = document.getElementById('secondName')
let surInp = document.getElementById('surname')
let secSurInp = document.getElementById('secondSurname')
let emailInp = document.getElementById('emailProfile')
let telInp = document.getElementById('telephone')
let profiles = "";






if (localStorage.getItem('User') === null) {
    alert("Debes estar logueado para poder acceder a su perfil")
    window.location.href = "index.html";

}




const addProfiles = () => {
    let inStorage = false;

    profiles = {
        name: userInp.value,
        secondName: secUserInp.value,
        surName: surInp.value,
        secondSurname: secSurInp.value,
        email: emailInp.value,
        telephone: telInp.value,
        image: "",
    };

    if (localStorage.getItem('Profiles:') !== null) {

        box = JSON.parse(localStorage.getItem('Profiles:'))



        box.forEach(element => {

            if (element.name === userName) {
                inStorage = true
                console.log("repetido")
            }

        })
        if (inStorage === false) {
            box.push(profiles)
            console.log("nombre diferente agrego un nuevo perfil")
            localStorage.setItem('Profiles:', JSON.stringify(box))
        }

    } else {
        box.push(profiles)
        console.log("localstorage vacio agrego perfil")
        localStorage.setItem('Profiles:', JSON.stringify(box))

    }



}



document.addEventListener('DOMContentLoaded', function (e) {
    if (localStorage.getItem('Profiles:') !== null) {
        profileStorage.forEach(element => {

            if (element.name === userName) {
                userInp.value = element.name;
                secUserInp.value = element.surName;
                surInp.value = element.secondName;
                secSurInp.value = element.secondSurname;
                emailInp.value = element.email;
                telInp.value = element.telephone;
            }
            else {
                userInp.value = userName;
            }

        });
    }

})

document.getElementById("saveProfile").addEventListener('click', addProfiles);


