#importaciones de flask
from flask import Flask, request,jsonify
from flask_cors import CORS 
from Controlador import Controlador

#crear la aplicacion
app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

gestor = Controlador()

#Comprar
@app.route('/pedido',methods=['POST'])
def comprar():
    dato = request.json
    gestor.comprar(dato['nombre'], dato['precio'],dato['cantidad'],dato['user'])
    return '{"Estado":"Pedido Creado"}'

@app.route('/obtenerPedido')
def obtenerPedido():
    return gestor.obtenerPedido()

#####receta
@app.route('/receta',methods=['POST'])
def hacerReceta():
    dato = request.json
    gestor.hacerReceta(dato['fecha'], dato['paciente'],dato['padecimiento'],dato['descripcion'],dato['doctor'])
    return '{"Estado":"Pedido Creado"}'

@app.route('/obtenerReceta')
def obtenerReceta():
    return gestor.obtenerReceta()


##factura
@app.route('/obtenerFactura')
def obtenerFactura():
    return gestor.obtenerFactura()

@app.route('/factura',methods=['POST'])
def crearFactura():
    dato = request.json
    gestor.crearFactura(dato['fecha'],dato['paciente'],dato['doctor'],dato['consulta'],dato['operacion'], dato['internado'], dato['total'])
    return '{"Estado":"Factura Creado"}'


#EndPoints

@app.route('/',methods = ['GET'])
def home():
    return 'SERVER IS WORKING'

#Obtener
@app.route('/obtenerPacientes')
def obtenerPaciente():
    return gestor.obtenerPaciente()


@app.route('/obtenerMedicamentos')
def obtenerMedicamento():
    return gestor.obtenerMedicamento()

@app.route('/obtenerCita')
def obtenerCita():
    return gestor.obtenerCita()

@app.route('/pedidos/<nombre>',methods=['DELETE'])
def eliminarPedido(nombre):
    if(gestor.eliminarPedido(nombre)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'




#POST Crear

@app.route('/pacientes',methods=['POST'])
def crearPaciente():
    dato = request.json
    gestor.crearPaciente(dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['especialidad'],dato['telefono'],dato['tipo'])
    return '{"Estado":"Paciente Creado"}'

@app.route('/medicamentos',methods=['POST'])
def crearMedicamento():
    dato = request.json
    gestor.crearMedicamento(dato['nombre'],dato['precio'],dato['descripcion'],dato['cantidad'])
    return '{"Estado":"Medicamento Creado"}'

@app.route('/citas',methods=['POST'])
def crearCita():
    dato = request.json
    gestor.crearCita(dato['fecha'],dato['hora'],dato['motivo'],dato['estado'],dato['user'],dato['doctor'])
    return '{"Estado":"Cita Creada"}'

@app.route('/pedido',methods=['POST'])
def crearPedido():
    dato = request.json
    gestor.crearPedido(dato['nombre'],dato['precio'],dato['user'],dato['cantidad'])
    return '{"Estado":"Pedido Creado"}'

#DELETE

@app.route('/pacientes/<user>',methods=['DELETE'])
def eliminarPaciente(user):
    if(gestor.eliminarPaciente(user)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'

@app.route('/medicamentos/<nombre>',methods=['DELETE'])
def eliminarMedicamento(nombre):
    if(gestor.eliminarMedicamento(nombre)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'

@app.route('/citas/<user>',methods=['DELETE'])
def eliminarCita(user):
    if(gestor.eliminarCita(user)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'
 

#PUT Actualizar  
@app.route('/pacientes/<user>',methods=['PUT']) 
def actualizarPaciente(user):
    dato = request.json
    if gestor.actualizarPaciente(user,dato['nombreNuevo'],dato['apellidoNuevo'],dato['fechaNuevo'],dato['sexoNuevo'],dato['userNuevo'],dato['passwordNuevo'],dato['especialidadNuevo'],dato['telefonoNuevo'],dato['tipoNuevo']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}' 

@app.route('/doctores/<user>',methods=['PUT']) 
def actualizarDoctor(user):
    dato = request.json
    if gestor.actualizarDoctor(user,dato['nombreNuevo'],dato['apellidoNuevo'],dato['fechaNuevo'],dato['sexoNuevo'],dato['userNuevo'],dato['passwordNuevo'],dato['especialidadNuevo'],dato['telefonoNuevo'],dato['tipoNuevo']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}'
 
@app.route('/enfermeras/<user>',methods=['PUT']) 
def actualizarEnfermera(user):
    dato = request.json
    if gestor.actualizarEnfermera(user,dato['nombreNuevo'],dato['apellidoNuevo'],dato['fechaNuevo'],dato['sexoNuevo'],dato['userNuevo'],dato['passwordNuevo'],dato['especialidadNuevo'],dato['telefonoNuevo'],dato['tipoNuevo']):
        return '{"data":"Actualizada"}' 
    return '{"data":"Error"}'

@app.route('/medicamentos/<nombre>',methods=['PUT']) 
def actualizarMedicamento(nombre):
    dato = request.json

    if gestor.actualizarMedicamento(nombre,dato['nombreNuevo'],dato['precioNuevo'],dato['descripcionNuevo'],dato['cantidadNuevo']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}'

@app.route('/citas/<user>',methods=['PUT']) 
def actualizarCita(user):
    dato = request.json
    if gestor.actualizarCita(user,dato['fechaNuevo'],dato['horaNuevo'],dato['motivoNuevo'],dato['estadoNuevo'],dato['userNuevo'],dato['doctorNuevo']):
        return '{"data":"Actualizada"}' 
    return '{"data":"Error"}'



#Login
@app.route('/login/<user>/<password>')
def inicio(user,password):
    return gestor.inicioSesion(user,password)




#POST Registro

@app.route('/registroP',methods=['POST'])
def registroP():
    dato=request.json
    gestor.registrarPaciente(dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['especialidad'],dato['telefono'],dato['tipo'])
    return '{"data":"Creado"}'


#Cargas
@app.route('/carga',methods=['POST'])
def carga():
    dato = request.json
    print(dato)
    gestor.cargamasiva(dato['data'])
    return '{"data":"Cargados"}'

@app.route('/cargaMedicamento',methods=['POST'])
def cargaMedicamento():
    dato = request.json
    print(dato)
    gestor.cargamasivaMedicamento(dato['data'])
    return '{"data":"Cargados"}'

@app.route('/cargaEnfermera',methods=['POST'])
def cargaEnfermera():
    dato = request.json
    print(dato)
    gestor.cargamasivaEnfermera(dato['data'])
    return '{"data":"Cargados"}'

@app.route('/cargaDoctor',methods=['POST'])
def cargaDoctor():
    dato = request.json
    print(dato)
    gestor.cargamasivaDoctor(dato['data'])
    return '{"data":"Cargados"}'

#Iniciar el server
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


 