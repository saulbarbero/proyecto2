function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 45,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirdata(doctor){
  if(doctor.tipo=='Doctor'){
    var data ={
      "Nombre":doctor.nombre,
      "Apellido":doctor.apellido,
      "Fecha":doctor.fecha,
      "Sexo":doctor.sexo,
      "User":doctor.user,
      "Password":doctor.password,
      "Especialidad":doctor.especialidad,
      "Telefono":doctor.telefono
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
      "Especialidad":'',
      "Telefono":''
    }
    return data
  }


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
        "Especialidad",
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
    doc.save("doctores.pdf")
  })
}





//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


function cargaDoctor(){
  actualizarDoctorTabla()
  let file = document.getElementById("cargadoctor").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }
          actualizarDoctorTabla()
          console.log(JSON.stringify(cuerpo))
          fetch('http://34.121.228.56:5000/cargaDoctor', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
              actualizarDoctorTabla()
              console.log('Success:', result);
              actualizarDoctorTabla()
              
          })
          .catch(error => {
              console.error('Error:', error);
          });

      }
      reader.onerror = function (evt) {
          
      }
  }
}

//mostrar enfermeras por medio de una tabala

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
<th scope="col">Especialidad</th>
<th scope="col">Telefono</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerPacientes')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      if(data[i].tipo=="Doctor"){
        
  
        text2+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].apellido}</td>
        <td>${data[i].fecha}</td>
        <td>${data[i].sexo}</td>
        <td>${data[i].password}</td>
        <td>${data[i].user}</td>
        <td>${data[i].especialidad}</td>
        <td>${data[i].telefono}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarDoctor('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }
      
    }

  

  text2+=`</tbody>
          </table>`
  document.getElementById("tabladoctor").innerHTML = text2;
});

function actualizarDoctorTabla(){
  let text1=""
  text1 = `<table class="table" style="margin=10px">
  <thead>
  <tr>
  <th scope="col">#</th>
  <th scope="col">Nombre</th>
  <th scope="col">Apellido</th>
  <th scope="col">Fecha</th>
  <th scope="col">Sexo</th>
  <th scope="col">Contraseña</th>
  <th scope="col">Usuario</th>
  <th scope="col">Especialidad</th>
  <th scope="col">Telefono</th>
  </tr>
  </thead>
  <tbody>`
  
  fetch('http://34.121.228.56:5000/obtenerPacientes')
  .then(response => response.json())
  .then(data =>{
    var i;
    
  
   
  
      for(i=0;i<data.length;i++){
        if(data[i].tipo=="Doctor"){
          
    
          text1+= `
          <tr>
          <th scope="row">${i+1}</th>
          <td>${data[i].nombre}</td>
          <td>${data[i].apellido}</td>
          <td>${data[i].fecha}</td>
          <td>${data[i].sexo}</td>
          <td>${data[i].password}</td>
          <td>${data[i].user}</td>
          <td>${data[i].especialidad}</td>
          <td>${data[i].telefono}</td>
          <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarDoctor('${data[i].user}')">Eliminar</button> </td>
          </tr>
          `
        }
        
      }
  
    
  
    text1+=`</tbody>
            </table>`
    document.getElementById("tabladoctor").innerHTML = text1;
  });
  
}


function eliminarDoctor(user){

  console.log(user)
    alert(user)
  fetch('http://34.121.228.56:5000/pacientes/'+user,{
      method:'DELETE'
  }) 
  .then(res => res.text())
  .then(res=> {
      alert(res)
      actualizarDoctorTabla()
  })
  
}

function modificarDoctor(){
  let userOld = document.getElementById("vUsuario");
  let nombre = document.getElementById("nNombre");
  let apellido = document.getElementById("nApellido");
  let fecha = document.getElementById("nFecha");
  let sex = document.getElementById("nSexo");
  let user = document.getElementById("nUsuario");
  let pass = document.getElementById("nPassword");
  let especialidad = document.getElementById("nEspecialidad");
  let tel = document.getElementById("nTel");
  let tipo = "Doctor";


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
            "especialidadNuevo":"${nEspecialidad.value}",
            "telefonoNuevo":"${nTel.value}",
            "tipoNuevo":"Doctor"
    }`

    console.log(reque)
    
    fetch('http://34.121.228.56:5000/doctores/'+userOld.value, {
      method: 'PUT',
      headers,
      body: reque,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      
      actualizarDoctorTabla()
            vUsuario.value=``
            nNombre.value=``
            nApellido.value=``
            nFecha.value=``
            nSexo.value=``
            nUsuario.value=``
            nPassword.value=``
            especialidad=``
            nTel.value=``
            tipo=`Doctor`
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
            especialidad=``
            nTel.value=``
            tipo=`Doctor`
            alert("Error")
    });

}
