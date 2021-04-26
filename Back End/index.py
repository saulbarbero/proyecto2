#importaciones de flask
from flask import Flask, request,jsonify
from flask_cors import CORS 
from Controlador import Controlador

#crear la aplicacion
app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

gestor = Controlador()


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



#PUT Actualizar
@app.route('/pacientes/<user>',methods=['PUT']) 
def actualizarPaciente(user):
    dato = request.json

    if gestor.actualizarPaciente(user,dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['especialidad'],dato['telefono'],dato['tipo']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}'

@app.route('/medicamentos/<nombre>',methods=['PUT']) 
def actualizarMedicamento(nombre):
    dato = request.json

    if gestor.actualizarMedicamento(nombre,dato['nombre'],dato['precio'],dato['descripcion'],dato['cantidad']):
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

#Iniciar el server
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


