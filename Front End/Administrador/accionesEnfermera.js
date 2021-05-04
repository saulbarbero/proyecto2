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

function convertirdata(enfermera){
  if(enfermera.tipo=='Enfermera'){
    var data ={
      "Nombre":enfermera.nombre,
      "Apellido":enfermera.apellido,
      "Fecha":enfermera.fecha,
      "Sexo":enfermera.sexo,
      "User":enfermera.user,
      "Password":enfermera.password,
      "Telefono":enfermera.telefono
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
    doc.save("enfermera.pdf")
  })
}


//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


function cargaEnfermera(){
  actualizarEnfermeraTabla()
  let file = document.getElementById("cargaenfermera").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }
          actualizarEnfermeraTabla()
          console.log(JSON.stringify(cuerpo))
          fetch('http://34.121.228.56:5000/cargaEnfermera', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
              actualizarEnfermeraTabla()
              console.log('Success:', result);
              actualizarEnfermeraTabla()
              
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
<th scope="col">Telefono</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerPacientes')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      if(data[i].tipo=="Enfermera"){
        
  
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
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarEnfermera('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }
      
    }

  

  text2+=`</tbody>
          </table>`
  document.getElementById("tablaenfermera").innerHTML = text2;
});

function actualizarEnfermeraTabla(){
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
  <th scope="col">Telefono</th>
  </tr>
  </thead>
  <tbody>`
  
  fetch('http://34.121.228.56:5000/obtenerPacientes')
  .then(response => response.json())
  .then(data =>{
    var i;
    
  
   
  
      for(i=0;i<data.length;i++){
        if(data[i].tipo=="Enfermera"){
          
    
          text1+= `
          <tr>
          <th scope="row">${i+1}</th>
          <td>${data[i].nombre}</td>
          <td>${data[i].apellido}</td>
          <td>${data[i].fecha}</td>
          <td>${data[i].sexo}</td>
          <td>${data[i].password}</td>
          <td>${data[i].user}</td>
          <td>${data[i].telefono}</td>
          <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarEnfermera('${data[i].user}')">Eliminar</button> </td>
          </tr>
          `
        }
        
      }
  
    
  
    text1+=`</tbody>
            </table>`
    document.getElementById("tablaenfermera").innerHTML = text1;
  });
  
}


function eliminarEnfermera(user){

  console.log(user)
    alert(user)
  fetch('http://34.121.228.56:5000/pacientes/'+user,{
      method:'DELETE'
  }) 
  .then(res => res.text())
  .then(res=> {
      alert(res)
      actualizarEnfermeraTabla()
  })
  
}

function modificarEnfermera(){
  let userOld = document.getElementById("vUsuario");
  let nombre = document.getElementById("nNombre");
  let apellido = document.getElementById("nApellido");
  let fecha = document.getElementById("nFecha");
  let sex = document.getElementById("nSexo");
  let user = document.getElementById("nUsuario");
  let pass = document.getElementById("nPassword");
  let especialidad = "Ninguna";
  let tel = document.getElementById("nTel");
  let tipo = "Enfermera";


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
            "tipoNuevo":"Enfermera"
    }`

    console.log(reque)
    
    fetch('http://34.121.228.56:5000/enfermeras/'+userOld.value, {
      method: 'PUT',
      headers,
      body: reque,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      
      actualizarEnfermeraTabla()
            vUsuario.value=``
            nNombre.value=``
            nApellido.value=``
            nFecha.value=``
            nSexo.value=``
            nUsuario.value=``
            nPassword.value=``
            especialidad=`Ninguna`
            nTel.value=``
            tipo=`Enfermera`
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
            tipo=`Enfermera`
            alert("Error")
    });

}
