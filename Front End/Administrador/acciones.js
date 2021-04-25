

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
  
  
