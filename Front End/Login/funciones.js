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
    var especialidad = "Ninguna";
    var tel = document.getElementById("telRegistro");
    var tipo = "Paciente";

    if(nombre.value=='' || apellido.value=='' || fecha.value=='' || sex.value=='' || user.value=='' || pass.value==''){
        alert('Debe llenar todos los campos con *')
        return
    }else if (pass.value.length < 8){
        alert('La contraseña debe tener 8 caracteres minimo')
        return
    }

    fetch(`http://34.121.228.56:5000/registroP`,
    {
        method:`POST`,
        headers,
        body:   `{
            "nombre":"${nombreRegistro.value}",
            "apellido":"${apellidoRegistro.value}",
            "fecha":"${fechaRegistro.value}",
            "sexo":"${sexRegistro.value}",
            "user":"${userRegistro.value}",
            "password":"${passRegistro.value}",
            "especialidad":"Ninguna",
            "telefono":"${telRegistro.value}",
            "tipo":"Paciente"
                 }`
    })
    .then(response => response.json())
    .then(
        result => {
            console.log(`Success:`, result);
            nombreRegistro.value=``
            apellidoRegistro.value=``
            fechaRegistro.value=``
            sexRegistro.value=``
            userRegistro.value=``
            passRegistro.value=``
            especialidad=`Ninguna`

            telRegistro.value=``
            tipo=`Paciente`
            alert(`Usuario Paciente Creado`)
        }
    )
    .catch(
        error => {
            console.error(`Error:`, error);
            nombreRegistro.value=``
            apellidoRegistro.value=``
            fechaRegistro.value=``
            sexRegistro.value=``
            userRegistro.value=``
            especialidad=`Ninguna`

            telRegistro.value=``
            tipo=`Paciente`
            alert(`Error Creando Usuario Paciente`)
        }
        
    )
    
}


//Funcion login
function InicioSesion(){
    let user = document.getElementById("loginUser");
    let pass = document.getElementById("loginPass");

    fetch(`http://34.121.228.56:5000/login/${user.value}/${pass.value}`)
    .then(response => response.json())
    .then(data => {
        

        if(data.tipo =="Doctor"){
            alert(`Bienvenido ${data.user}`)
            window.location.href='../Administrador/administrador.html'
        }else if(data.tipo == "Paciente"){
            alert(`Bienvenido ${data.user}`)
            window.location.href='../Paciente/moduloPaciente.html'
        }else if(data.tipo == "Enfermera"){
            alert(`Bienvenido ${data.user}`)
            window.location.href='../Administrador/administrador.html'
        }else if(data.tipo == "Administrador"){
            alert(`Bienvenido ${data.user}`)
            window.location.href='../Administrador/administrador.html'
        }else{
            alert(`Credenciales erroneas`)
            user.value='';
            pass.value='';
        }
        
        console.log(data.user)  
    })
        
    


}
    