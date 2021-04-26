//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');



function eliminarDoctor(user){

  console.log(user)
    alert(user)
  fetch('http://localhost:5000/pacientes/'+user,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      alert(res)
      actualizarDoctorTabla()
  })
  
}



//mostrar doctores por medio de una tabala

let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Especialidad</th>
<th scope="col">Usuario</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerPacientes')
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
        <td>${data[i].especialidad}</td>
        <td>${data[i].user}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarDoctor('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }
      
    }

  

  text2+=`</tbody>
          </table>`
  document.getElementById("tabladoctor").innerHTML = text2;
});


//aqui agrego las cartas de los pacientes pero mejor del medicamento
    document.getElementById("cardsc").innerHTML = '';
    let text="";
    fetch('http://localhost:5000/obtenerPacientes')
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



function actualizarDoctorTabla(){
let text8=""
text8 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Contraseña</th>
<th scope="col">Usuario</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerPacientes')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      if(data[i].tipo=="Doctor"){
        
  
        text8+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].apellido}</td>
        <td>${data[i].password}</td>
        <td>${data[i].user}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarDoctor('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }
      
    }

  

  text8+=`</tbody>
          </table>`
  document.getElementById("tabladoctor").innerHTML = text8;
});

}
      //aqui agrego las cartas de los pacientes por funcion
    function actualizar(){


    document.getElementById("cardsc").innerHTML = '';
    let text="";
    fetch('http://localhost:5000/obtenerPacientes')
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
  
  




     
  
  
