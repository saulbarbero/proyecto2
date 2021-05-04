from Usuario import Usuario
from Medicamento import Medicamento
from Cita import Cita
from Pedido import Pedido
from Factura import Factura
from Receta import Receta
import json
import re

class Controlador:
    def __init__(self):
        self.usuario = []
        self.medicamento = []
        self.cita = []
        self.pedido = []  
        self.factura = []
        self.receta = []
        
       
        
        self.usuario.append(Usuario('Herbert','Reyes','14/04/2021','M','admin','1234','ninguna','12345678','Administrador'))



    #Citas
    def hacerReceta(self,fecha,paciente,padecimiento,descripcion,doctor):
        self.receta.append(Receta(fecha,paciente,padecimiento,descripcion,doctor))
    
    def obtenerReceta(self):
        return json.dumps([ob.__dict__ for ob in self.receta])
    

    #Comprar
    def comprar(self,nombre,precio,cantidad,user):
        self.pedido.append(Pedido(nombre,precio,cantidad,user))
    
    def obtenerPedido(self):
        return json.dumps([ob.__dict__ for ob in self.pedido])

    def eliminarPedido(self,nombre):
        for x in self.pedido:
            if x.nombre==nombre:
                self.pedido.remove(x)
                return True
        return False

    ######Factura
    def crearFactura(self,fecha,paciente,doctor,consulta,operacion,internado,total):
        self.factura.append(Factura(fecha, paciente, doctor, consulta, operacion, internado, total))

    def obtenerFactura(self):
        return json.dumps([ob.__dict__ for ob in self.factura])
                  


    def inicioSesion(self,user,password):
        for x in self.usuario:
            if x.password==password and x.user==user:
                userActual=user
                return json.dumps(x.__dict__)   
        return '{"data":"Usuario no existe"}'

    #Create
    def crearPaciente(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo):
        self.usuario.append(Usuario(nombre,apellido,fecha,sexo,user,password,'ninguna',telefono,'Paciente'))
    
    def crearDoctor(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo):
        self.usuario.append(Usuario(nombre,apellido,fecha,sexo,user,password,especialidad,telefono,'Doctor'))

    def crearEnfermera(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono,tipo):
        self.usuario.append(Usuario(nombre,apellido,fecha,sexo,user,password,'ninguna',telefono,'Enfermera'))

    def crearMedicamento(self,nombre,precio,descripcion,cantidad):
        self.medicamento.append(Medicamento(nombre,precio,descripcion,cantidad))    

    def crearCita(self,fecha,hora,motivo,estado,user,doctor):
        self.cita.append(Cita(fecha,hora,motivo,estado,user,doctor))
        
    def crearPedido(self,nombre,precio,user,cantidad):
        self.pedido.append(Pedido(nombre,precio,user,'1'))

    


      
    #Read usuarios

        

    def obtenerPaciente(self):
        return json.dumps([ob.__dict__ for ob in self.usuario])

    #Read medicamento
    def obtenerMedicamento(self):
        return json.dumps([ob.__dict__ for ob in self.medicamento])
    
    def obtenerCita(self):
        return json.dumps([ob.__dict__ for ob in self.cita])

    def obtenerPedido(self):
        return json.dumps([ob.__dict__ for ob in self.pedido])

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
    
    def actualizarCita(self,user,fechaNuevo,horaNuevo,motivoNuevo,estadoNuevo,userNuevo,doctorNuevo):
        for x in self.cita:
            if x.user==user:
                self.cita[self.cita.index(x)]=Cita(fechaNuevo, horaNuevo, motivoNuevo, estadoNuevo, userNuevo, doctorNuevo)
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
                userActual=user
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
    
    

    
    
    