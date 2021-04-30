from Usuario import Usuario
from Medicamento import Medicamento
from Cita import Cita
import json
import re

class Controlador:
    def __init__(self):
        self.usuario = []
        self.medicamento = []
        self.cita = []

        self.usuario.append(Usuario('paciente','apellido','fecha','M','usuarioPacienteD22','passD','especialidad','tel','Paciente'))
        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD221','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD220','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD223','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD221','passD','especialidad','tel','Doctor'))
        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD225','passD','especialidad','tel','Doctor'))

        self.usuario.append(Usuario('doctor','apellido','fecha','M','usuarioD2233','passD','especialidad','tel','Enfermera'))
        self.medicamento.append(Medicamento("Acetaminofen","10","Dolor de cabeza","10"))

        
        
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

    def crearCita(self,fecha,hora,motivo,estado,user):
        self.cita.append(Cita(fecha,hora,motivo,'Pendiente',user))

      
    #Read usuarios 
    def obtenerPaciente(self):
        return json.dumps([ob.__dict__ for ob in self.usuario])

    #Read medicamento
    def obtenerMedicamento(self):
        return json.dumps([ob.__dict__ for ob in self.medicamento])
    
    def obtenerCita(self):
        return json.dumps([ob.__dict__ for ob in self.cita])

    #Update
    def actualizarPaciente(self,user,nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,especialidadNuevo,telefonoNuevo,tipoNuevo):
        for x in self.usuario:
            print(user)
            if x.user==user:
                self.usuario[self.usuario.index(x)]=Usuario(nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,"Ninguna",telefonoNuevo,"Paciente")
                return True
        return False

    def actualizarDoctor(self,user,nombreNuevo,apellidoNuevo,fechaNuevo,sexoNuevo,userNuevo,passwordNuevo,especialidadNuevo,telefonoNuevo,tipoNuevo):
        for x in self.usuario:
            print(user)
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

    def actualizarMedicamento(self,nombre,nombreNuevo,precioNuevo,descripcionNuevo,cantidadNuevo):
        for x in self.medicamento:
            if x.nombre==nombre:
                self.medicamento[self.medicamento.index(x)]=Medicamento(nombreNuevo,precioNuevo,descripcionNuevo,cantidadNuevo)
                return True
        return False
    
    def actualizarCita(self,fecha,hora,motivo,estado,user):
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

    def eliminarCita(self,user):
        for x in self.cita:
            if x.user==user:
                self.cita.remove(x)
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

#Carga Masiva
    def cargamasiva(self,data):
        informacion = re.split('\n',data)
        
        i=1
        print(len(informacion))
        while i < len(informacion):
            
            texto = re.split(',',informacion[i])
            print(texto)
            self.crearPaciente(texto[0],texto[1],texto[2],texto[3],texto[4],texto[5],'ninguna',texto[6],'Paciente')
            i = i+1

    def cargamasivaMedicamento(self,data):
        informacion = re.split('\n',data)
        
        i=1
        print(len(informacion))
        while i < len(informacion):
            
            texto = re.split(',',informacion[i])
            print(texto)
            self.crearMedicamento(texto[0],texto[1],texto[2],texto[3])
            i = i+1

    def cargamasivaEnfermera(self,data):
        informacion = re.split('\n',data)
        
        i=1
        print(len(informacion))
        while i < len(informacion):
            
            texto = re.split(',',informacion[i])
            print(texto)
            self.crearEnfermera(texto[0],texto[1],texto[2],texto[3],texto[4],texto[5],'ninguna',texto[6],'Enfermera')
            i = i+1

    def cargamasivaDoctor(self,data):
        informacion = re.split('\n',data)
        
        i=1
        print(len(informacion))
        while i < len(informacion):
            
            texto = re.split(',',informacion[i])
            print(texto)
            self.crearDoctor(texto[0],texto[1],texto[2],texto[3],texto[4],texto[5],texto[6],texto[7],'Doctor')
            i = i+1
    
    

    
    
    