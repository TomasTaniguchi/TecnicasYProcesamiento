const formulario = document.querySelector('#formulario');
var contenido = document.querySelector('#contenido');
var respuesta = document.getElementById('respuesta');
var formularioMod = document.querySelector('#formularioMod');


function Traer() {
    fetch(
        'http://localhost/koki/backend/get_clientes.php'
    )
        .then(res => res.json())
        .then(datos => {
            console.log(datos)
            Table(datos)
        })
}


function Table(datos) {
    const texto = formulario.value.toLowerCase()
    var regexTexto = new RegExp('\\b' + texto)
    contenido.innerHTML = ''

    if (texto !== '') {

        for (let valor of datos) {
            let surnameClienteComparar = valor.apellido.toLowerCase()
            let nameClienteComparar = valor.nombre.toLowerCase()

            if (nameClienteComparar.search(regexTexto) !== -1 || surnameClienteComparar.search(regexTexto) !== -1) {
                contenido.innerHTML += `
                <tr>
                    <td>${valor.idCliente}</td>
                    <th></th>
                    <td>${valor.apellido}</td>
                    <th></th>
                    <td>${valor.nombre}</td>
                    <th></th>
                    <td>${valor.direccion}</td>
                    <th></th>                     
                    <td>${valor.email}</td>
                    <th></th>                     
                    <td>${valor.telefono}</td>
                    <th></th>                     
                    <td>${valor.fechaNacimiento}</td>
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idCliente}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idCliente}','${valor.apellido}','${valor.nombre}','${valor.direccion}','${valor.email}','${valor.telefono}','${valor.fechaNacimiento}')">Actualizar</button></td>
                </tr>
                `
                //console.log(moment(valor.fechaNacimiento).format('DD-MM-YYYY'))
            }
        }
    }

    if (contenido.innerHTML === '') {

        if (texto === '') {
            for (let valor of datos) {
                contenido.innerHTML += `
                <tr>
                    <td>${valor.idCliente}</td>
                    <th></th>
                    <td>${valor.apellido}</td>
                    <th></th>
                    <td>${valor.nombre}</td>
                    <th></th>
                    <td>${valor.direccion}</td>
                    <th></th>                     
                    <td>${valor.email}</td>
                    <th></th>                     
                    <td>${valor.telefono}</td>
                    <th></th>                     
                    <td>${valor.fechaNacimiento}</td>
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idCliente}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idCliente}','${valor.apellido}','${valor.nombre}','${valor.direccion}','${valor.email}','${valor.telefono}','${valor.fechaNacimiento}')">Actualizar</button></td>
                </tr>
                `
            }
    
        } else {
            contenido.innerHTML += `
            <tr>
                <td colspan="9">Cliente no encontrado</td>
            </tr>
            `
        }
    }

    formulario.addEventListener('keyup', Traer)
}


function Borrar(idCliente) {

    var data = new FormData();
    
    data.append("idCliente", idCliente);
    data.append("queryType", "delete");

    fetch('../backend/bajaModCliente.php', {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(data => {
            if (data === 'error') {
                respuesta.innerHTML = `
                 <div class="alert alert-danger" role="alert">
                    Error: Cliente en uso!
                 </div>
                 `
            } else if(data==="success") {
                respuesta.innerHTML = `
                 <div class="alert alert-primary" role="alert">
                     Cliente borrado: ${idCliente}
                 </div>
                 `
            }
            console.log(data)
        })
    //console.log(data.get("idCliente"))
    //console.log(data.get("queryType"))
}


function Actualizar(idCliente,apellido, nombre, direccion, email, telefono, fechaNacimiento) {    
    
    formularioMod.innerHTML= ''
    document.getElementById("popUpMod").style.display = "block";
    // Formulario para actualizacion
    formularioMod.innerHTML = `
    <h1> Cliente ID = ${idCliente} </h1>
    <input type="hidden" name="idCliente" value=${idCliente} required>
        
    <label for="apellido"><b>Apellido</b></label>
    <input type="text" placeholder="Ingrese apellido" name="apellido" id="apellido" value="${apellido}" required>

    <label for="nombre"><b>Nombre</b></label>
    <input type="text" placeholder="Ingrese nombre" name="nombre" id="nombre" value="${nombre}" required>

    <label for="direccion"><b>Dirección</b></label>
    <input type="text" placeholder="Ingrese dirección" name="direccion" id="direccion" value="${direccion}" required>

    <label for="email"><b>email</b></label>
    <input type="text" placeholder="Ingrese email" name="email" id="email" value="${email}" required>

    <label for="telefono"><b>Teléfono</b></label>
    <input type="text" placeholder="Ingrese teléfono" name="telefono" id="telefono" value="${telefono}" required>

    <label for="fechaNacimiento"><b>Fecha nacimiento</b></label>
    <input type="date" placeholder="Ingrese fecha de nacimiento" name="fechaNacimiento" id="fechaNacimiento" value="${fechaNacimiento}" required>

    <button type="submit" class="btn">Confirmar Actualización</button>
    <button type="button" class="btn cancel" onclick="closeForm()">Cancelar</button>

    `
}

function closeForm() {
    document.getElementById("popUpMod").style.display = "none";
    formularioMod.innerHTML= ''
}

formularioMod.addEventListener('submit', function(e){
    e.preventDefault();

    if (validarFormulario()) {
        var datos = new FormData(formularioMod);
        datos.append("queryType", "update");

        fetch('../backend/bajaModCliente.php', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(data => {
                if (data === 'error') {
                    respuesta.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Error: No se actualizo!
                    </div>
                    `
                } else if(data==="success") {
                    respuesta.innerHTML = `
                    <div class="alert alert-primary" role="alert">
                        Cliente actualizado!
                    </div>
                    `
                }
            })
        closeForm()
    }

} )


function validarFormulario() {
    var apellido = document.getElementById('apellido').value;
    var nombre = document.getElementById('nombre').value;
    var direccion = document.getElementById('direccion').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;

    const regExApNombre = new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/);
    const regExDireccion = new RegExp(/^[A-Za-z0-9°ÁÉÍÓÚáéíóúñÑ ]+$/);
    const regExEmail = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
    const regExTelefono = new RegExp(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/);
    // const regExFechaNacimiento = new RegExp(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/);

    console.log(nombre)


    if(apellido === "" || nombre === "" || direccion === "" || email === "" || telefono === "" || fechaNacimiento === "") {
      alert('Complete todos los campos');
      return false;
    }
    if (apellido.length > 45 || nombre.length > 45 || direccion.email > 45) {
      alert('Parámetros muy largos');
      return false;
    }
    if (!regExApNombre.test(apellido)) {
        alert('Apellido: Caracteres no permitidos');
        return false
    }
    if (!regExApNombre.test(nombre)) {
        alert('Nombre: Caracteres no permitidos');
        console.log(nombre)
        return false
    }
    if (!regExDireccion.test(direccion)) {
        alert('Dirección: Caracteres no permitidos');
        return false
    }
    if (!regExEmail.test(email)) {
        alert('Email: Formato incorrecto');
        return false
    }
    if (!regExTelefono.test(telefono)) {
        alert('Teléfono: debe ingresar solo números válidos');
        return false
    }
    return true;
}


Traer()
