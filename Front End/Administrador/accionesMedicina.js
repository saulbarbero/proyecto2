function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 60,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirdata(medicamento){
  
    var data ={
      "Nombre":medicamento.nombre,
      "Precio":medicamento.precio,
      "Descripcion":medicamento.descripcion,
      "cantidad":medicamento.cantidad
    }
  
    return data
  
  }
  

  

  



function crearpdf(){
  
  fetch('http://34.121.228.56:5000/obtenerMedicamentos')
  .then(response => response.json())
  .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "Nombre",
        "Precio",
        "Descripcion",
        "cantidad"
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
    doc.table(50, 1, datos, headers, { autoSize: false });
    doc.save("medicamentos.pdf")
  })
}



//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


function cargaMedicamento(){
  actualizarMedicamentoTabla()
  let file = document.getElementById("cargamedicina").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }
          actualizarMedicamentoTabla()
          console.log(JSON.stringify(cuerpo))
          fetch('http://34.121.228.56:5000/cargaMedicamento', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
              actualizarMedicamentoTabla()
              console.log('Success:', result);
              actualizarMedicamentoTabla()
              
          })
          .catch(error => {
              console.error('Error:', error);
          });

      }
      reader.onerror = function (evt) {
          
      }
  }
}

//mostrar medicamentos por medio de una tabala

let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Precio</th>
<th scope="col">Descripcion</th>
<th scope="col">Cantidad</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerMedicamentos')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      
        text2+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].precio}</td>
        <td>${data[i].descripcion}</td>
        <td>${data[i].cantidad}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarMedicamento('${data[i].nombre}')">Eliminar</button> </td>
        </tr>
        `
    
      
    }

  

  text2+=`</tbody>
          </table>`
  document.getElementById("tablamedicamento").innerHTML = text2;
});

function actualizarMedicamentoTabla(){
  
  let text1=""
text1 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Precio</th>
<th scope="col">Descripcion</th>
<th scope="col">Cantidad</th>
</tr>
</thead>
<tbody>`

fetch('http://34.121.228.56:5000/obtenerMedicamentos')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      
        text1+= `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${data[i].nombre}</td>
        <td>${data[i].precio}</td>
        <td>${data[i].descripcion}</td>
        <td>${data[i].cantidad}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminarMedicamento('${data[i].nombre}')">Eliminar</button> </td>
        </tr>
        `
    
      
    }

  

  text1+=`</tbody>
          </table>`
  document.getElementById("tablamedicamento").innerHTML = text1;
});
  
}


function eliminarMedicamento(nombre){

  console.log(nombre)
    alert(nombre)
  fetch('http://34.121.228.56:5000/medicamentos/'+nombre,{
      method:'DELETE'
  }) 
  .then(res => res.text())
  .then(res=> {
      alert(res)
      actualizarMedicamentoTabla()
  })
  
}

function modificarMedicamento(){
  
  let userOld = document.getElementById("vNombre");
  let nombre = document.getElementById("nNombre");
  let precio = document.getElementById("nPrecio");
  let descripcion = document.getElementById("nDescripcion");
  let cantidad= document.getElementById("nCantidad");
  


    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
      
    let reque = `{
            "nombre":"${vNombre.value}",
            "nombreNuevo":"${nNombre.value}",
            "precioNuevo":"${nPrecio.value}",
            "descripcionNuevo":"${nDescripcion.value}",
            "cantidadNuevo":"${nCantidad.value}"
    }`

    console.log(reque)
    
    fetch('http://34.121.228.56:5000/medicamentos/'+userOld.value, {
      method: 'PUT',
      headers,
      body: reque,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      
      actualizarMedicamentoTabla()
            vNombre.value=``
            nNombre.value=``
            nPrecio.value=``
            nDescripcion.value=``
            nCantidad.value=``
            
            alert("Actualizado")
      
    })
    .catch(error => {
            console.error('Error:', error);
            vNombre.value=``
            nNombre.value=``
            nPrecio.value=``
            nDescripcion.value=``
            nCantidad.value=``
            alert("Error")
    });

}
