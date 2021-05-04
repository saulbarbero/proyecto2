let usuario = document.getElementById("usuario");
let doctor = document.getElementById("doctor");

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

function convertirdata(factura){
  let usuarioiii = usuario.value;
  let doctoriii = doctor.value;
  if(factura.paciente==usuarioiii && factura.doctor==doctoriii){
    var data ={

      "Fecha":factura.fecha,
      "Paciente":factura.paciente,
      "Doctor":factura.doctor,
      "Consulta":factura.consulta,
      "Operacion":factura.operacion,
      "Internado":factura.internado,
      "Total":factura.total
    }
  
    return data
  }else{
    var data ={
      "Fecha":'',
      "Paciente":'',
      "Doctor":'',
      "Consulta":'',
      "Operacion":'',
      "Internado":'',
      "Total":''
    }
    return data
  }


  }

  



function crearpdf(){
  let usuarioii = usuario.value;
  let doctorii = doctor.value;
  
  fetch('http://34.121.228.56:5000/obtenerFactura',)
  .then(response => response.json())
  .then(data=>{
      //Declarando los headers

      let headers = createHeaders([
        "Fecha",
        "Paciente",
        "Doctor",
        "Consulta",
        "Operacion",
        "Internado",
        "Total"
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
    doc.save("factura.pdf")
  })
}


//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
//////////////////////////////////////////////Citas//////////////////////////////////////////////////////////
//mostrar pacientes por medio de una tabala

let text=""
text = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Estado</th>
<th scope="col">Usuario</th>
<th scope="col">Doctor</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerCita')
.then(response => response.json())
.then(data =>{
  var i;
  

    for(i=0;i<data.length;i++){
      if(data[i].estado=="Pendiente"){
        var doctor = document.getElementById("doctori");
       // var doctori = doctor.value;
  
        text+= `
        <tr>
        
        <td>${data[i].fecha}</td>
        <td>${data[i].hora}</td>
        <td>${data[i].motivo}</td>
        <td>${data[i].estado}</td>
        <td>${data[i].user}</td>
        <td><input type="text" id="doctori" placeholder="Doctor" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></td>
        <td> <button href="#" class="btn btn-outline-success btn-sm"  onclick="aceptarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${data[i].user}','${doctor}')">Aceptar</button> </td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="rechazarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${data[i].user}','${doctor}')">Rechazar</button> </td>
        </tr>
        `
      }
      
    }

  

  text+=`</tbody>
          </table>`
  document.getElementById("tablacitas").innerHTML = text;
});

function actualizarCitas(){
  let text1=""
text1 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Estado</th>
<th scope="col">Usuario</th>
<th scope="col">Doctor</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerCita')
.then(response => response.json())
.then(data =>{
  var i;
  

    for(i=0;i<data.length;i++){
      
        var doctor = document.getElementById("doctori");
       // var doctori = doctor.value;
  
        text1+= `
        <tr>
        
        <td>${data[i].fecha}</td>
        <td>${data[i].hora}</td>
        <td>${data[i].motivo}</td>
        <td>${data[i].estado}</td>
        <td>${data[i].user}</td>
        <td><input type="text" id="doctori" placeholder="Doctor" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></td>
        <td> <button href="#" class="btn btn-outline-success btn-sm"  onclick="aceptarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${doctor}')">Aceptar</button> </td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="rechazarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${doctor}')">Rechazar</button> </td>
        </tr>
        `
      
      
    }

  

  text1+=`</tbody>
          </table>`
  document.getElementById("tablacitas").innerHTML = text1;
});
}

function actualizarCitasAceptadas(){
  let text1=""
text1 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Estado</th>
<th scope="col">Usuario</th>
<th scope="col">Doctor</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerCita')
.then(response => response.json())
.then(data =>{
  var i;
  

    for(i=0;i<data.length;i++){
      if(data[i].estado=="Aceptada"){
        var doctor = document.getElementById("doctori");
       // var doctori = doctor.value;
  
        text1+= `
        <tr>
        
        <td>${data[i].fecha}</td>
        <td>${data[i].hora}</td>
        <td>${data[i].motivo}</td>
        <td>${data[i].estado}</td>
        <td>${data[i].user}</td>
        <td><input type="text" id="doctori" placeholder="Doctor" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></td>
        <td> <button href="#" class="btn btn-outline-success btn-sm"  onclick="aceptarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${doctor}')">Aceptar</button> </td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="rechazarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${doctor}')">Rechazar</button> </td>
        </tr>
        `
      }
      
    }

  

  text1+=`</tbody>
          </table>`
  document.getElementById("tablacitasaceptadas").innerHTML = text1;
});
}

function aceptarCita(user,fecha,hora,motivo,estado,doctor){
  var userOld = user;
  var fechai = fecha;
  var horai = hora;
  var motivoi = motivo;
  var estadoi = estado;
  var useri = user;
  var doctori = doctor;
  


    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
      
    let reque = `{
            "user":"${userOld}",
            "fechaNuevo":"${fechai}",
            "horaNuevo":"${horai}",
            "motivoNuevo":"${motivoi}",
            "estadoNuevo":"Aceptada",
            "userNuevo":"${useri}",
            "doctorNuevo":"${doctori}"
    }`

    console.log(reque)
    
    fetch('http://34.121.228.56:5000/citas/'+userOld.value, {
      method: 'PUT',
      headers,
      body: reque,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      
      actualizarCitasAceptadas()
            
            alert("Aceptada")
      
    })
    .catch(error => {
      console.error('Error:', error);
           
            alert("Error")
    });

}

function rechazarCita(user,fecha,hora,motivo,estado,doctor){
  var userOld = user;
  var fechai = fecha;
  var horai = hora;
  var motivoi = motivo;
  var estadoi = estado;
  var useri = user;
  var doctori = doctor;
  


    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
      
    let reque = `{
            "user":"${userOld}",
            "fechaNuevo":"${fechai}",
            "horaNuevo":"${horai}",
            "motivoNuevo":"${motivoi}",
            "estadoNuevo":"Rechazada",
            "userNuevo":"${useri}",
            "doctorNuevo":"${doctori}"
    }`

    console.log(reque)
    
    fetch('http://34.121.228.56:5000/citas/'+userOld.value, {
      method: 'PUT',
      headers,
      body: reque,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      
      actualizarCitasRechazada()
            
            alert("Rechazada")
      
    })
    .catch(error => {
      console.error('Error:', error);
           
            alert("Error")
    });

}


function actualizarCitasRechazadas(){
  let text1=""
text1 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Estado</th>
<th scope="col">Usuario</th>
<th scope="col">Doctor</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerCita')
.then(response => response.json())
.then(data =>{
  var i;
  

    for(i=0;i<data.length;i++){
      if(data[i].estado=="Rechazada"){
        var doctor = document.getElementById("doctori");
       // var doctori = doctor.value;
  
        text1+= `
        <tr>
        
        <td>${data[i].fecha}</td>
        <td>${data[i].hora}</td>
        <td>${data[i].motivo}</td>
        <td>${data[i].estado}</td>
        <td>${data[i].user}</td>
        <td><input type="text" id="doctori" placeholder="Doctor" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></td>
        <td> <button href="#" class="btn btn-outline-success btn-sm"  onclick="aceptarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${doctor}')">Aceptar</button> </td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="rechazarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${doctor}')">Rechazar</button> </td>
        </tr>
        `
      }
      
    }

  

  text1+=`</tbody>
          </table>`
  document.getElementById("tablacitasrechazadas").innerHTML = text1;
});
}
  
////////////////////////////////////crear factura////////////////////////////////////
function crearFactura(){
  let fechai = document.getElementById("fecha").value;
  let usuarioi = usuario.value;
  let doctori = doctor.value;
  let consultai = document.getElementById("consulta").value;
  let operacioni = document.getElementById("operacion").value;
  let internadoi = document.getElementById("internado").value;
  var total = 0;
  
  if(fecha.value=='' || usuario.value=='' || doctor.value=='' || consulta.value==''|| operacion.value==''|| internado.value==''){
    operacion ="0";
    internado="0";
    alert('Debe llenar todos los campos con *')
    return
  }

  var a = parseInt(consulta.value);
  var b = parseInt(operacion.value);
  var c = parseInt(internado.value);
  total=a+b+c;
  let totali=total;
  alert("exito")
  

  
  fetch(`http://34.121.228.56:5000/factura`,
  {
      method:`POST`,
      headers,
      body:   `{
          "fecha":"${fechai}",
          "paciente":"${usuarioi}",
          "doctor":"${doctori}",
          "consulta":"${consultai}",
          "operacion":"${operacioni}",
          "internado":"${internadoi}",
          "total":"${totali}"
               }`
  })
  .then(response => response.json())
  .then(
      result => {
          console.log(`Success:`, result);
          
          
      }
  )
  .catch(
      error => {
          console.error(`Error:`, error);
          console.log(`Success:`, result);
        
          
          alert(`Error`)
      }
      
  )

}