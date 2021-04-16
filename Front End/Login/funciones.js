//Funcion registrar usuarios

function CrearUsuario(){
    var nombre = document.getElementById("nombreRegistro");
    var apellido = document.getElementById("apellidoRegistro");
    var fecha = document.getElementById("fechaRegistro");
    var sex = document.getElementById("sexRegistro");
    var user = document.getElementById("userRegistro");
    var pass = document.getElementById("passRegistro");
    var tel = document.getElementById("telRegistro");
    alert(fecha.value)
}


//Funcion login
function InicioSesion(){
    var user = document.getElementById("loginUser");
    var pass = document.getElementById("loginPass");
    if(pass.value=="admin" && user.value=="admin"){
        //alert(user.value)
        window.location.href='../Index/index.html'
    }else{
        alert('Usuario/Contraseña Invalidos')
        pass.value='';
        user.value='';
    }
}
    