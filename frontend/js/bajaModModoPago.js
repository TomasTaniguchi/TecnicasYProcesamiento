const formulario = document.querySelector('#formulario');
var contenido = document.querySelector('#contenido');
var respuesta = document.getElementById('respuesta');
var formularioMod = document.querySelector('#formularioMod');

function Traer() {
    fetch(
        'http://localhost/koki/backend/get_modos_pago.php'
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
            let nameModoPagoComparar = valor.nombre.toLowerCase()

            if (nameModoPagoComparar.search(regexTexto) !== -1) {
                contenido.innerHTML += `
                <tr>
                    <td>${valor.idModo_pago}</td>
                    <th></th>
                    <td>${valor.nombre}</td>
                    <th></th>
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idModo_pago}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idModo_pago}','${valor.nombre}')">Actualizar</button></td>                          
                </tr>
                
                `
            }
        }
    }

    if (contenido.innerHTML === '') {

        if (texto === '') {
            for (let valor of datos) {
                contenido.innerHTML += `
                <tr>
                    <td>${valor.idModo_pago}</td>
                    <th></th>
                    <td>${valor.nombre}</td>
                    <th></th>
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idModo_pago}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idModo_pago}','${valor.nombre}')">Actualizar</button></td>                          
                </tr>
                
                `
            }
        } else {
            contenido.innerHTML += `
                
            <tr>
                <td colspan="9">Modo de pago no encontrado</td>
            </tr>
            
            `
        }
    }

    formulario.addEventListener('keyup', Traer)
}


function Borrar(idModo_pago) {

    var data = new FormData();
    
    data.append("idModo_pago", idModo_pago);
    data.append("queryType", "delete");

    fetch('../backend/bajaModModoPago.php', {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(data => {
            if (data === 'error') {
                respuesta.innerHTML = `
                 <div class="alert alert-danger" role="alert">
                    Error: Modo de pago en uso!
                 </div>
                 `
            } else if(data==="success") {
                respuesta.innerHTML = `
                 <div class="alert alert-primary" role="alert">
                     Modo de pago borrado: ${idModo_pago}
                 </div>
                 `
            }
            console.log(data)
        })
    //console.log(data.get("idModo_pago"))
    //console.log(data.get("queryType"))
}


function Actualizar(idModo_pago,nombre) {    
    formularioMod.innerHTML= ''
    
    document.getElementById("popUpMod").style.display = "block";
    formularioMod.innerHTML = `
    <h1>Modificar Modo de pago ID = ${idModo_pago} </h1>
    <input type="hidden" name="idModo_pago" value=${idModo_pago} required>
        
    <label for="nombre"><b>Nombre</b></label>
    <input type="text" placeholder="Ingrese nombre" name="nombre" id="nombre" value="${nombre}" required>

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

        fetch('../backend/bajaModModoPago.php', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(data => {
                if (data === 'error') {
                    respuesta.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Error: No se actualizó!
                    </div>
                    `
                } else if(data==="success") {
                    respuesta.innerHTML = `
                    <div class="alert alert-primary" role="alert">
                        Modo de pago actualizado!
                    </div>
                    `
                }
                
            })
        closeForm()
    }

} )



function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var regExNombre = new RegExp(/^[A-Za-z0-9\s]+$/g);


    if(nombre === "") {
      alert('Complete todos los campos');
      return false;
    }
    if (nombre.length > 45) {
      alert('Parámetros muy largos');
      return false;
    }
    if (!regExNombre.test(nombre)) {
        alert('Nombre: Caracteres no permitidos');
        return false
    }
    return true;
}

Traer()
