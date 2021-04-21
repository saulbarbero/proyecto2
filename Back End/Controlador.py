from Paciente import Paciente
import json

class Controlador:
    def __init__(self):
        self.paciente =[]
        self.paciente.append(Paciente('Herbert','Reyes','14/04/2021','M','admin','1234','12345678'))
        self.paciente.append(Paciente('nom','apellido','fecha','M','usuarioss','pass','tel'))


    #Create
    def crearPaciente(self,nombre,apellido,fecha,sexo,user,password,telefono):
        self.paciente.append(Paciente(nombre,apellido,fecha,sexo,user,password,telefono))

      
    #Read
    def obtenerPaciente(self):
        return json.dumps([ob.__dict__ for ob in self.paciente])

    #Update
    def actualizarPaciente(self,user,nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,telefonoNuevo):
        for x in self.paciente:
            if x.user==user:
                self.paciente[self.paciente.index(x)]=Paciente(nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,telefonoNuevo)
                return True
        return False
    #Delete
    def eliminarPaciente(self,user):
        for x in self.paciente:
            if x.user==user:
                self.paciente.remove(x)
                return True
        return False

    #iniciar sesion
    def iniciarSesion(self,user,password):
        for x in self.paciente:
            if x.password==password and x.user==user:
                return json.dumps(x.__dict__)
        return '{"nombre":"false"}'