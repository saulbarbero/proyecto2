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

@app.route('/obtenerPacientes')
def obtenerPaciente():
    return gestor.obtenerPaciente()

@app.route('/pacientes',methods=['POST'])
def crearPaciente():
    dato = request.json
    gestor.crearPaciente(dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['telefono'])
    return '{"Estado":"Paciente Creado"}'

@app.route('/pacientes/<user>',methods=['DELETE'])
def eliminarPaciente(user):
    if(gestor.eliminarPaciente(user)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'

@app.route('/pacientes/<user>',methods=['PUT'])
def actualizarPaciente(user):
    dato = request.json

    if gestor.actualizarPaciente(user,dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['telefono']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}'

@app.route('/login/<user>/<password>')
def inicioP(user,password):

    return gestor.iniciarSesion(user,password)


#Iniciar el server
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


