let userActual = document.getElementById("userAc");

function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }
  
  function convertirdata(paciente){
    var useri12 = userActual.value;
    if(useri12==paciente.user){

      var data ={
        "Nombre":paciente.nombre,
        "Precio":paciente.precio,
        "Cantidad":paciente.cantidad
      }
    
      return data
    }else{
      var data ={
        "Nombre":'',
        "Precio":'',
        "Cantidad":''
      }
      return data
    }
    
  
    }
  
    
  
  
  
  function crearpdf(){
    
    fetch('http://34.121.228.56:5000/obtenerPedido')
    .then(response => response.json())
    .then(data=>{
        //Declarando los headers
        let headers = createHeaders([
            "Nombre",
            "Precio",
            "Cantidad"
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
      doc.save("pedido.pdf")
    })
  }
/////////////////////////////////////////////7//Declaracion de Headers////////////////////////////////////////////////

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
////////////////////////////////////Citas///////////////////////////////////////
function crearCita(){
    var fecha = document.getElementById("fecha");
    var hora = document.getElementById("hora");
    var motivo = document.getElementById("motivo");
    var useri1 = userActual.value;
    var estado = "Pendiente";
    var doctor = "Ninguno";
    
    
    fetch(`http://34.121.228.56:5000/citas`,
    {
        method:`POST`,
        headers,
        body:   `{
            "fecha":"${fecha.value}",
            "hora":"${hora.value}",
            "motivo":"${motivo.value}",
            "estado":"Pendiente",
            "user":"${useri1}",
            "doctor":"Ninguno"
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
            
            alert(`Error Creando Cita`)
        }
        
    )
 
}
///motrar citas
let text22=""
text22 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Estado</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerCita')
.then(response => response.json())
.then(data =>{
  var i;
  var userii = userActual.value;
 

    for(i=0;i<data.length;i++){
        if(userii==data[i].user){
        text22+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].fecha}</td>
        <td>${data[i].hora}</td>
        <td>${data[i].motivo}</td>
        <td>${data[i].estado}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarCita('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
        }
    
      
    }

  

  text22+=`</tbody>
          </table>`
  document.getElementById("tablacita").innerHTML = text22;
});

///mostrar cita
function actualizarCitaTabla(){
    let text221=""
text221 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Estado</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerCita')
.then(response => response.json())
.then(data =>{
  var i;
  var userii = userActual.value;
  

 

    for(i=0;i<data.length;i++){
        if(userii==data[i].user){
        text221+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].fecha}</td>
        <td>${data[i].hora}</td>
        <td>${data[i].motivo}</td>
        <td>${data[i].estado}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarCita('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
        }
      
    }

  

  text221+=`</tbody>
          </table>`
  document.getElementById("tablacita").innerHTML = text221;
});
}

////eliminar cita
function eliminarCita(user){
    console.log(user)
   
  fetch('http://34.121.228.56:5000/citas/'+user,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      alert(res)
      actualizarCitaTabla()
  })
}

///////////////////////////////////////Comprar/////////////////////////////////////////////////////
function comprar(nombre,precio,cantidad,user){
    var nombrei = nombre;
    var precioi = precio;
    var cantidadi = cantidad;
    var useri = userActual.value;
    

    if(useri==""){
        alert(`Por favor ingrese su usuario`)
    }else{
        fetch(`http://34.121.228.56:5000/pedido`,
    {
        method:`POST`,
        headers,
        body:   `{
            "nombre":"${nombrei}",
            "precio":"${precioi}",
            "cantidad":"${cantidadi}",
            "user":"${useri}"
                 }`
    })
    .then(response => response.json())
    .then(
        result => {
            console.log(`Success:`, result);
           
           
            alert(`Pedido Creado`)
        }
    )
    .catch(
        error => {
            console.error(`Error:`, error);
            
           
            alert(`Error`)
        }
        
    )

    }

    

    
}
////////////////////////////////////////obtener pedido//////////////////////////////////////////
let text1=""
text1 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Precio</th>
<th scope="col">Cantidad</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerPedido')
.then(response => response.json())
.then(data =>{
  var i;
  var userii = userActual.value;

 

    for(i=0;i<data.length;i++){
      if(userii==data[i].user){
        text1+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].precio}</td>
        <td>${data[i].cantidad}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarPedido('${data[i].nombre}')">Eliminar</button> </td>
        </tr>
        ` 
      }
       
    
      
    }

  

  text1+=`</tbody>
          </table>`
  document.getElementById("tablapedido").innerHTML = text1;
});

function actualizarPedidoTabla(){
    let text11=""
text11 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Precio</th>
<th scope="col">Cantidad</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerPedido')
.then(response => response.json())
.then(data =>{
  var i;
  var userii = userActual.value;

 

    for(i=0;i<data.length;i++){
      if(userii==data[i].user){
        text11+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].precio}</td>
        <td>${data[i].cantidad}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarPedido('${data[i].nombre}')">Eliminar</button> </td>
        </tr>
        ` 
      }
       
    
      
    }

  

  text11+=`</tbody>
          </table>`
  document.getElementById("tablapedido").innerHTML = text11;
});
}

//////////////////////////////////////////eliminar pedido////////////////
function eliminarPedido(nombre){

    console.log(nombre)
      
    fetch('http://34.121.228.56:5000/pedidos/'+nombre,{
        method:'DELETE'
    }) 
    .then(res => res.text())
    .then(res=> {
        alert(res)
        actualizarPedidoTabla()
    })
    
  }

////////////////////////////////////////Mostrar cards de los medicamentos//////////////////////////////////////////////////////////////////
    document.getElementById("cardsc").innerHTML = '';
    let text="";
    fetch('http://34.121.228.56:5000/obtenerMedicamentos')
    .then(response => response.json())
    .then(data =>{
        var i;
        for(i=0;i<data.length;i++){
            text+= `<br>
                    <div class="col-sm-3 col-md-3 col-lg-3""  style="margin-top: 25px;float: left;">
                    <div class="card bg-light" style="width: auto;">
                    
                    <div class="card-body">
                        <h4 class="card-title">${data[i].nombre}</h4>
                        <h5 class="card-title">${data[i].precio}</h5>
                        <p class="card-text">${data[i].descripcion}</p>
                        <button href="#" class="btn btn btn-danger" onclick="comprar('${data[i].nombre}','${data[i].precio}','${data[i].cantidad}')">Comprar</button>
                    </div>
                    </div>
                    </div>
                    <br>`
            console.log(data[i].nombre,'prueba')
        }
        document.getElementById("cardsc").innerHTML = text;
    });

////////////////////////////////////////Comprar //crear pedido//////////////////////////////////////////
  
    


/*







   


//mostrar citas por medio de una tabala

let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Estado</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerCita')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      
        text2+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].fecha}</td>
        <td>${data[i].hora}</td>
        <td>${data[i].motivo}</td>
        <td>${data[i].estado}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarMedicamento('${data[i].nombre}')">Eliminar</button> </td>
        </tr>
        `
    
      
    }

  

  text2+=`</tbody>
          </table>`
  document.getElementById("tablacita").innerHTML = text2;
});*/