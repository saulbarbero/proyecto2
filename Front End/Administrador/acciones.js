function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 55,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirdata(paciente){
  if(paciente.tipo=='Paciente'){
    var data ={
      "Nombre":paciente.nombre,
      "Apellido":paciente.apellido,
      "Fecha":paciente.fecha,
      "Sexo":paciente.sexo,
      "User":paciente.user,
      "Password":paciente.password,
      "Telefono":paciente.telefono
    }
  
    return data
  }else{
    var data ={
      "Nombre":'',
      "Apellido":'',
      "Fecha":'',
      "Sexo":'',
      "User":'',
      "Password":'',
      "Telefono":''
    }
    return data
  }
  /*var data ={
    "Nombre":paciente.nombre,
    "Apeliido":paciente.apellido,
    "Fecha":paciente.fecha,
    "Sexo":paciente.sexo,
    "User":paciente.user,
    "Password":paciente.password,
    "Telefono":paciente.telefono
    */

  }

  



function crearpdf(){
  
  fetch('http://34.121.228.56:5000/obtenerPacientes')
  .then(response => response.json())
  .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "Nombre",
        "Apellido",
        "Fecha",
        "Sexo",
        "User",
        "Password",
        "Telefono"
      ]);
      // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirdata(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.table(1, 1, datos, headers, { autoSize: false });
    doc.save("pacientes.pdf")
  })
}


//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');




function cargar(){
  actualizarPacientesTabla()
  let file = document.getElementById("carga").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }
          actualizarPacientesTabla()
          console.log(JSON.stringify(cuerpo))
          fetch('http://34.121.228.56:5000/carga', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
            actualizarPacientesTabla()
              console.log('Success:', result);
              actualizarPacientesTabla()
              
          })
          .catch(error => {
              console.error('Error:', error);
          });

      }
      reader.onerror = function (evt) {
          
      }
  }
}

function modificarPaciente(){
  
  let userOld = document.getElementById("vUsuario");
  let nombre = document.getElementById("nNombre");
  let apellido = document.getElementById("nApellido");
  let fecha = document.getElementById("nFecha");
  let sex = document.getElementById("nSexo");
  let user = document.getElementById("nUsuario");
  let pass = document.getElementById("nPassword");
  let especialidad = "Ninguna";
  let tel = document.getElementById("nTel");
  let tipo = "Paciente";


    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
      
    let reque = `{
            "user":"${vUsuario.value}",
            "nombreNuevo":"${nNombre.value}",
            "apellidoNuevo":"${nApellido.value}",
            "fechaNuevo":"${nFecha.value}",
            "sexoNuevo":"${nSexo.value}",
            "userNuevo":"${nUsuario.value}",
            "passwordNuevo":"${nPassword.value}",
            "especialidadNuevo":"Ninguna",
            "telefonoNuevo":"${nTel.value}",
            "tipoNuevo":"Paciente"
    }`

    console.log(reque)
    
    fetch('http://34.121.228.56:5000/pacientes/'+userOld.value, {
      method: 'PUT',
      headers,
      body: reque,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      
      actualizarPacientesTabla()
            vUsuario.value=``
            nNombre.value=``
            nApellido.value=``
            nFecha.value=``
            nSexo.value=``
            nUsuario.value=``
            nPassword.value=``
            especialidad=`Ninguna`
            nTel.value=``
            tipo=`Paciente`
            alert("Actualizado")
      
    })
    .catch(error => {
      console.error('Error:', error);
            vUsuario.value=``
            nNombre.value=``
            nApellido.value=``
            nFecha.value=``
            nSexo.value=``
            nUsuario.value=``
            nPassword.value=``
            especialidad=`Ninguna`
            nTel.value=``
            tipo=`Paciente`
            alert("Error")
    });

}


function eliminarPaciente(user){

  console.log(user)
    alert(user)
  fetch('http://34.121.228.56:5000/pacientes/'+user,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      alert(res)
      actualizarPacientesTabla()
  })
  
}



//mostrar pacientes por medio de una tabala

let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Fecha</th>
<th scope="col">Sexo</th>
<th scope="col">Contraseña</th>
<th scope="col">Usuario</th>
<th scope="col">Telefono</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerPacientes')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      if(data[i].tipo=="Paciente"){
        
  
        text2+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].apellido}</td>
        <td>${data[i].fecha}</td>
        <td>${data[i].sexo}</td>
        <td>${data[i].password}</td>
        <td>${data[i].user}</td>
        <td>${data[i].telefono}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarPaciente('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }
      
    }

  

  text2+=`</tbody>
          </table>`
  document.getElementById("tablausers").innerHTML = text2;
});


//aqui agrego las cartas de los pacientes pero mejor del medicamento
    document.getElementById("cardsc").innerHTML = '';
    let text="";
    fetch('http://34.121.228.56:5000/obtenerPacientes')
    .then(response => response.json())
    .then(data =>{
        var i;
        for(i=0;i<data.length;i++){
            text+= `<br>
                    <div class="col-sm-3 col-md-3 col-lg-3""  style="margin-top: 25px;float: left;">
                    <div class="card bg-light" style="width: auto;">
                    
                    <div class="card-body">
                        <h4 class="card-title">${data[i].nombre}</h4>
                        <h5 class="card-title">${data[i].apellido}</h5>
                        <p class="card-text">${data[i].descripcion}</p>
                        <button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].nombre}','${data[i].apellido}')">Eliminar</button>
                    </div>
                    </div>
                    </div>
                    <br>`
            console.log(data[i].nombre,'prueba')
        }
        document.getElementById("cardsc").innerHTML = text;
    });



function actualizarPacientesTabla(){
  
let text8=""
text8 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Fecha</th>
<th scope="col">Sexo</th>
<th scope="col">Contraseña</th>
<th scope="col">Usuario</th>
<th scope="col">Telefono</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerPacientes')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      if(data[i].tipo=="Paciente"){
        
  
        text8+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].apellido}</td>
        <td>${data[i].fecha}</td>
        <td>${data[i].sexo}</td>
        <td>${data[i].password}</td>
        <td>${data[i].user}</td>
        <td>${data[i].telefono}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarPaciente('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }
      
    }

  

  text8+=`</tbody>
          </table>`
  document.getElementById("tablausers").innerHTML = text8;
});

}



//aqui agrego las cartas de los pacientes por funcion
    function actualizar(){


    document.getElementById("cardsc").innerHTML = '';
    let text="";
    fetch('http://34.121.228.56:5000/obtenerPacientes')
    .then(response => response.json())
    .then(data =>{
        var i;
        for(i=0;i<data.length;i++){
            text+= `<br>
                    <div class="col-sm-3 col-md-3 col-lg-3""  style="margin-top: 25px;float: left;">
                    <div class="card bg-light" style="width: auto;">
                    
                    <div class="card-body">
                        <h4 class="card-title">${data[i].nombre}</h4>
                        <h5 class="card-title">${data[i].apellido}</h5>
                        <p class="card-text">${data[i].descripcion}</p>
                        <button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].nombre}','${data[i].apellido}')">Eliminar</button>
                    </div>
                    </div>
                    </div>
                    <br>`
            console.log(data[i].nombre,'prueba')
        }
        document.getElementById("cardsc").innerHTML = text;
    });


    }
  
/////////////////////////////////////////////////////  Acciones Medicamento  ///////////////////////////////////////////////////////////////////
