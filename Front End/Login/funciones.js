//HEADERS
let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/jason');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
    headers.append('GET', 'POST', 'OPTIONS','DELETE', 'PUT');

//Funcion registrar usuarios

function CrearUsuario(){
    var nombre = document.getElementById("nombreRegistro");
    var apellido = document.getElementById("apellidoRegistro");
    var fecha = document.getElementById("fechaRegistro");
    var sex = document.getElementById("sexRegistro");
    var user = document.getElementById("userRegistro");
    var pass = document.getElementById("passRegistro");
    var tel = document.getElementById("telRegistro");
    
}


//Funcion login
function InicioSesion(){
    let user = document.getElementById("loginUser");
    let pass = document.getElementById("loginPass");

    fetch(`http://localhost:5000/login/${user.value}/${pass.value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.user)
        if(data.user=='false'){
            alert(`Credenciales erroneas`)
            user.value='';
            pass.value='';

        }else{
            alert(`Bienvenido ${data.user}`)
            window.location.href='../Administrador/administrador.html'
        }
    })


}
    