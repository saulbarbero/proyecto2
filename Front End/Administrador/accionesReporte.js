//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

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
    
      var data ={
        "Numero":paciente.posicion,
        "Nombre":paciente.objeto
      }
    
      return data
    
      return data
    }
    
  
    
  
    
  
  
  
  function crearpdf(){
    
    fetch('http://34.121.228.56:5000/obtenerPacientes')
    .then(response => response.json())
    .then(data=>{
        //Declarando los headers
        let headers = createHeaders([
          "Posicion",
          "Nombre"
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
      doc.table(75, 1, datos, headers, { autoSize: false });
      doc.save("top.pdf")
    })
  }