const formulario = document.querySelector('#formulario');
var contenido = document.querySelector('#contenido');
var respuesta = document.getElementById('respuesta');
var formularioMod = document.querySelector('#formularioMod');

function Traer() {
    fetch(
        'http://localhost/koki/backend/get_categorias.php'
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
            let nameCategoriaComparar = valor.nombre.toLowerCase()

            if (nameCategoriaComparar.search(regexTexto) !== -1) {
                contenido.innerHTML += `
                <tr>
                    <td>${valor.idCategoria}</td>
                    <th></th>
                    <td>${valor.nombre}</td>
                    <th></th>
                    <td>${valor.descripcion}</td>                    
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idCategoria}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idCategoria}','${valor.nombre}','${valor.descripcion}')">Actualizar</button></td>                          
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
                    <td>${valor.idCategoria}</td>
                    <th></th>
                    <td>${valor.nombre}</td>
                    <th></th>
                    <td>${valor.descripcion}</td>                    
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idCategoria}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idCategoria}','${valor.nombre}','${valor.descripcion}')">Actualizar</button></td>                          
                </tr>
                
                `
            }
        } else {
            contenido.innerHTML += `
            <tr>
                <td colspan="9">Categoría no encontrada</td>
            </tr>
            `
        }
    }

    formulario.addEventListener('keyup', Traer)
}


function Borrar(idCategoria) {

    var data = new FormData();
    
    data.append("idCategoria", idCategoria);
    data.append("queryType", "delete");

    fetch('../backend/bajaModCategoria.php', {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(data => {
            if (data === 'error') {
                respuesta.innerHTML = `
                 <div class="alert alert-danger" role="alert">
                    Error: Categoria en uso!
                 </div>
                 `
            } else if(data==="success") {
                respuesta.innerHTML = `
                 <div class="alert alert-primary" role="alert">
                     Categoria borrada: ${idCategoria}
                 </div>
                 `
            }
            console.log(data)
        })
    //console.log(data.get("idCategoria"))
    //console.log(data.get("queryType"))
}


function Actualizar(idCategoria,nombre,descripcion) {    
    formularioMod.innerHTML= ''
    
    document.getElementById("popUpMod").style.display = "block";
    formularioMod.innerHTML = `
    <h1>Modificar Categoría ID = ${idCategoria} </h1>
    <input type="hidden" name="idCategoria" value=${idCategoria} required>
        
    <label for="nombre"><b>Nombre</b></label>
    <input type="text" placeholder="Ingrese nombre" name="nombre" id="nombre" value="${nombre}" required>

    <label for="descripcion"><b>Descripción</b></label>
    <input type="text" placeholder="Ingrese descripción" name="descripcion" id="descripcion" value="${descripcion}" required>

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

        fetch('../backend/bajaModCategoria.php', {
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
                        Categoría actualizada!
                    </div>
                    `
                }
                
            })
        closeForm()
    }

} )



function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var regExNombre = new RegExp(/^[A-Za-z0-9\s]+$/g);


    if(nombre === "" || descripcion === "") {
      alert('Complete todos los campos');
      return false;
    }
    if (descripcion.length > 45 || nombre.length > 45) {
      alert('Parámetros muy largos');
      return false;
    }
    if (!regExNombre.test(nombre)) {
        alert('Nombre: Caracteres no permitidos');
        return false
    }
    if (!regExNombre.test(descripcion)) {
        alert('Descripción: Caracteres no permitidos');
        return false
    }
    return true;
}

Traer()
