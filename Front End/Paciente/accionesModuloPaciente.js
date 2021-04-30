//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

function crearCita(){
    var fecha = document.getElementById("fecha");
    var hora = document.getElementById("hora");
    var motivo = document.getElementById("motivo");
    var estado = "Pendiente";
    var user = document.getElementById("vUsuario");
    

    /*if(user.value==user){
        alert('Usuario Incorrecto')
        return
    }*/




    fetch(`http://localhost:5000/citas`,
    {
        method:`POST`,
        headers,
        body:   `{
            "fecha":"${fecha.value}",
            "hora":"${hora.value}",
            "motivo":"${motivo.value}",
            "estado":"Pendiente",
            "user":"${vUsuario.value}"
                 }`
    })
    .then(response => response.json())
    .then(
        result => {
            console.log(`Success:`, result);
            fecha.value=``
            hora.value=``
            motivo.value=``
            estado.value=`Pendiente`
            vUsuario.value=``
            alert(`Cita Creada`)
        }
    )
    .catch(
        error => {
            console.error(`Error:`, error);
            console.log(`Success:`, result);
            fecha.value=``
            hora.value=``
            motivo.value=``
            estado.value=`Pendiente`
            vUsuario.value=``
            alert(`Error Creando Cita`)
        }
        
    )



   
       

    
    
}