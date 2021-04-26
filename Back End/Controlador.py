from Usuario import Usuario
from Medicamento import Medicamento
import json

class Controlador:
    def __init__(self):
        self.usuario = []
        self.medicamento = []

        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD22','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD23','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD24','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD11','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD12','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD13','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD14','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD15','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD16','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('enfermera','apellido','fecha','M','usuarioD17','passD','ninguna','tel','Enfermera'))
        self.usuario.append(Usuario('paciente1','apellido1','fecha','M','usuarioD1','passD','ninguna','tel','Paciente'))
        self.usuario.append(Usuario('paciente','apellido','fecha','M','usuarioD2','passD','ninguna','tel','Paciente'))
        self.usuario.append(Usuario('paciente1','apellido1','fecha','M','usuarioD3','passD','ninguna','tel','Paciente'))
        self.usuario.append(Usuario('paciente','apellido','fecha','M','usuario4','passD','ninguna','tel','Paciente'))
        self.usuario.append(Usuario('paciente1','apellido1','fecha','M','usuarioD5','passD','ninguna','tel','Paciente'))
        self.usuario.append(Usuario('paciente','apellido','fecha','M','usuarioD6','passD','ninguna','tel','Paciente'))
        self.usuario.append(Usuario('paciente1','apellido1','fecha','M','usuarioD7','passD','ninguna','tel','Paciente'))
        self.usuario.append(Usuario('paciente','apellido','fecha','M','usuarioD8','passD','ninguna','tel','Paciente'))
        
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

    #Read medicamento
    def obtenerMedicamento(self):
        return json.dumps([ob.__dict__ for ob in self.medicamento])

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

    def actualizarMedicamento(self,nombreNuevo,precioNuevo,descripcionNuevo,cantidadNuevo):
        for x in self.medicamento:
            if x.nombre==nombre:
                self.medicamento[self.medicamento.index(x)]=Medicamento(nombreNuevo,precioNuevo,descripcionNuevo,cantidadNuevo)
                return True
        return False

    #Delete todos usuarios
    def eliminarPaciente(self,user):
        for x in self.usuario:
            if x.user==user:
                self.usuario.remove(x)
                return True
        return False
    
    #Delete todos medicamento
    def eliminarMedicamento(self,nombre):
        for x in self.medicamento:
            if x.nombre==nombre:
                self.medicamento.remove(x)
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
