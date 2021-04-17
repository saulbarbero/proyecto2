#importaciones de flask
from flask import Flask, request,jsonify
from flask_cors import CORS 

#crear la aplicacion
app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

controlador = Controlador()


#EndPoints

@app.route('/',methods = ['GET'])
def home():
    return 'SERVER IS WORKING'

@app.route('/obtenerPacientes')
def obtenerPaciente():
    return controlador.obtenerPaciente()

@app.route('/pacientes',methods=['POST'])
def crearPaciente():
    dato = request.json
    controlador.crearPaciente(dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['telefono'])
    return '{"Estado":"Paciente Creado"}'

@app.route('/pacientes/<user>',methods=['DELETE'])
def eliminarPaciente(user):
    if(controlador.eliminarPaciente(user)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'

@app.route('/libros/<user>',methods=['PUT'])
def actualizarPaciente(user):
    dato = request.json

    if controlador.actualizarPaciente(user,dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['telefono']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}'


#Iniciar el server
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


