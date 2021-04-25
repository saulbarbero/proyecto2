from Usuario import Usuario
from Medicamento import Medicamento
import json

class Controlador:
    def __init__(self):
        self.usuario = []
        self.medicamento = []

        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('paciente','apellido','fecha','M','usuarioD','passD','ninguna','tel','Paciente'))

        self.usuario.append(Usuario('Herbert','Reyes','14/04/2021','M','admin','1234','ninguna','12345678','Administrador'))


    #Create
    def crearPaciente(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo):
        self.usuario.append(Usuario(nombre,apellido,fecha,sexo,user,password,'ninguna',telefono,'Paciente'))
    
    def crearDoctor(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo):
        self.usuario.append(Usuario(nombre,apellido,fecha,sexo,user,password,especialidad,telefono,'Doctor'))

    def crearEnfermera(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo):
        self.usuario.append(Usuario(nombre,apellido,fecha,sexo,user,password,'ninguna',telefono,'Enfermera'))

    def crearMedicamento(self,nombre,precio,descripcion,cantidad):
        self.medicamento.append(Medicamento(nombre,precio,descripcion,cantidad))    

      
    #Read usuarios
    def obtenerPaciente(self):
        return json.dumps([ob.__dict__ for ob in self.usuario])

    #Update
    def actualizarPaciente(self,user,nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,especialidadNuevo,telefonoNuevo,tipoNuevo):
        for x in self.usuario:
            if x.user==user:
                self.usuario[self.usuario.index(x)]=Usuario(nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,"Ninguna",telefonoNuevo,"Paciente")
                return True
        return False

    def actualizarDoctor(self,user,nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,especialidadNuevo,telefonoNuevo,tipoNuevo):
        for x in self.usuario:
            if x.user==user:
                self.usuario[self.usuario.index(x)]=Usuario(nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,especialidadNuevo,telefonoNuevo,"Doctor")
                return True
        return False

    def actualizarEnfermera(self,user,nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,especialidadNuevo,telefonoNuevo,tipoNuevo):
        for x in self.usuario:
            if x.user==user:
                self.usuario[self.usuario.index(x)]=Usuario(nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,"Ninguna",telefonoNuevo,"Enfermera")
                return True
        return False

    #Delete todos usuarios
    def eliminarPaciente(self,user):
        for x in self.usuario:
            if x.user==user:
                self.usuario.remove(x)
                return True
        return False

    #iniciar sesion
    def inicioSesion(self,user,password):
        for x in self.usuario:
            if x.password==password and x.user==user:
                return json.dumps(x.__dict__)   
        return '{"data":"Usuario no existe"}'

    #Registar usuarios
    def registrarPaciente(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo):
        self.usuario.append(Usuario(nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo))
