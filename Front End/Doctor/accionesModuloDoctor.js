let userActual = document.getElementById("userAc");







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
  let usuarioiii = userActual.value;
  if(factura.doctor==usuarioiii){
    var data ={

      "Fecha":factura.fecha,
      "Paciente":factura.paciente,
      "Padecimiento":factura.padecimiento,
      "Descripcion":factura.descripcion
    }
  
    return data
  }else{
    var data ={
      "Fecha":'',
      "Paciente":'',
      "Padecimiento":'',
      "Descripcion":''
    }
    return data
  }


  }

function crearpdf(){
 
  
  fetch('http://34.121.228.56:5000/obtenerReceta',)
  .then(response => response.json())
  .then(data=>{
      //Declarando los headers

      let headers = createHeaders([
        "Fecha",
        "Paciente",
        "Padecimiento",
        "Descripcion"
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
    doc.save("receta.pdf")
  })
}



//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

function crearReceta(){
  let fechai = document.getElementById("fecha").value;
  let usuarioi = userActual.value;
  let pacientei = document.getElementById("paciente").value;
  let padecimientoi = document.getElementById("padecimiento").value;
  let descripcioni = document.getElementById("descripcion").value;
  
 
  

  
  fetch(`http://34.121.228.56:5000/receta`,
  {
      method:`POST`,
      headers,
      body:   `{
          "fecha":"${fechai}",
          "paciente":"${pacientei}",
          "padecimiento":"${padecimientoi}",
          "descripcion":"${descripcioni}",
          "doctor":"${usuarioi}"
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
/////////Obtener citas asignadas
    let text1=""
    text1 = `<table class="table" style="margin=10px">
    <thead>
    <tr>
    <th scope="col">Fecha</th>
    <th scope="col">Hora</th>
    <th scope="col">Motivo</th>
    <th scope="col">Estado</th>
    <th scope="col">Usuario</th>
    
    </tr>
    </thead>
    <tbody>`
    
    fetch('http://34.121.228.56:5000/obtenerCita')
    .then(response => response.json())
    .then(data =>{
      var i;
      
    
        for(i=0;i<data.length;i++){
          if(data[i].estado=="Pendiente"){
           
      
            text1+= `
            <tr>
            
            <td>${data[i].fecha}</td>
            <td>${data[i].hora}</td>
            <td>${data[i].motivo}</td>
            <td>${data[i].estado}</td>
            <td>${data[i].user}</td>
            <td><input type="text" id="doctori" placeholder="Doctor" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></td>
            <td> <button href="#" class="btn btn-outline-success btn-sm"  onclick="aceptarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${userActual}')">Aceptar</button> </td>
            <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="rechazarCita('${data[i].user}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}','${data[i].estado}','${userActual}')">Rechazar</button> </td>
            </tr>
            `
          }
          
        }
    
      
    
      text1+=`</tbody>
              </table>`
      document.getElementById("tablacitas").innerHTML = text1;
    });


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
          
          
                
                alert("Rechazada")
          
        })
        .catch(error => {
          console.error('Error:', error);
               
                alert("Error")
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

    let text3=""
    text3 = `<table class="table" style="margin=10px">
    <thead>
    <tr>
    <th scope="col">Fecha</th>
    <th scope="col">Hora</th>
    <th scope="col">Motivo</th>
    <th scope="col">Estado</th>
    <th scope="col">Usuario</th>
    
    </tr>
    </thead>
    <tbody>`
    
    fetch('http://34.121.228.56:5000/obtenerCita')
    .then(response => response.json())
    .then(data =>{
      var i;
      
    
        for(i=0;i<data.length;i++){
          if(data[i].estado=="Aceptada" && data[i].doctor==userActual){
           
      
            text3+= `
            <tr>
            
            <td>${data[i].fecha}</td>
            <td>${data[i].hora}</td>
            <td>${data[i].motivo}</td>
            <td>${data[i].estado}</td>
            <td>${data[i].user}</td>
            <td><div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></div></td>
            </tr>
            `
          }
          
        }
    
      
    
      text3+=`</tbody>
              </table>`
      document.getElementById("tablacitas").innerHTML = text3;
    });