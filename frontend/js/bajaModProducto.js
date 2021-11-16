const formulario = document.querySelector('#formulario');
var contenido = document.querySelector('#contenido');
var respuesta = document.getElementById('respuesta');
var formularioMod = document.querySelector('#formularioMod');


function Traer() {
    fetch(
        'http://localhost/koki/backend/get_productos.php'
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
            let nameApellidoComparar = valor.descProducto.toLowerCase()
            let nameClienteComparar = valor.precio.toLowerCase()

            if (nameClienteComparar.search(regexTexto) !== -1 || nameApellidoComparar.search(regexTexto) !== -1) {
                contenido.innerHTML += `
                <tr>
                    <td>${valor.idProducto}</td>
                    <th></th>
                    <td>${valor.descProducto}</td>
                    <th></th>
                    <td>${valor.precio}</td>
                    <th></th>
                    <td>${valor.stock}</td>
                    <th></th>                     
                    <td>${valor.Categoria_idCategoria}</td>
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idProducto}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idProducto}','${valor.descProducto}','${valor.precio}','${valor.stock}','${valor.Categoria_idCategoria}')">Actualizar</button></td>
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
                    <td>${valor.idProducto}</td>
                    <th></th>
                    <td>${valor.descProducto}</td>
                    <th></th>
                    <td>${valor.precio}</td>
                    <th></th>
                    <td>${valor.stock}</td>
                    <th></th>                     
                    <td>${valor.Categoria_idCategoria}</td>
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Borrar('${valor.idProducto}')">Borrar</button></td>                          
                    <th></th>                     
                    <td><button class="btn btn-danger w-20 mb-2" onclick="Actualizar('${valor.idProducto}','${valor.descProducto}','${valor.precio}','${valor.stock}','${valor.Categoria_idCategoria}')">Actualizar</button></td>
                </tr>
                `
            }
        } else {
            contenido.innerHTML += `
            <tr>
                <td colspan="9">Producto no encontrado</td>
            </tr>
            `
        }
    }

    formulario.addEventListener('keyup', Traer)
}


function Borrar(idProducto) {

    var data = new FormData();
    
    data.append("idProducto", idProducto);
    data.append("queryType", "delete");

    fetch('../backend/bajaModProducto.php', {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(data => {
            if (data === 'error') {
                respuesta.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                    Error: Producto en uso!
                    </div>
                    `
            } else if(data==="success") {
                respuesta.innerHTML = `
                    <div class="alert alert-primary" role="alert">
                    Producto borrado: ${idProducto}
                    </div>
                    `
            }
            console.log(data)
        })
    //console.log(data.get("idProducto"))
    //console.log(data.get("queryType"))
}


function Actualizar(idProducto,descProducto, precio, stock, idCategoria) {
    formularioMod.innerHTML= ''
    document.getElementById("popUpMod").style.display = "block";
    // Formulario para actualizacion
    formularioMod.innerHTML = `
    <h1>Modificar Producto ID = ${idProducto} </h1>
    <input type="hidden" name="idProducto" value=${idProducto} required>
        
    <label for="descProducto"><b>Descripción</b></label>
    <input type="text" placeholder="Ingrese descripción" name="descProducto" id="descProducto" value="${descProducto}" required>

    <label for="precio"><b>Precio</b></label>
    <input type="text" placeholder="Ingrese precio" name="precio" id="precio" value="${precio}" required>

    <label for="stock"><b>Stock</b></label>
    <input type="number" placeholder="Ingrese stock" name="stock" id="stock" value="${stock}" required>

    <label for="categoria">Ingresa categoría:</label>
    <select name="Categoria_idCategoria" id="Categoria_idCategoria" > </select>

    <button type="submit" class="btn">Confirmar Actualización</button>
    <button type="button" class="btn cancel" onclick="closeForm()">Cancelar</button>

    `
    categorias = document.getElementById("Categoria_idCategoria")
    traerCategorias(idCategoria)

}

function closeForm() {
    document.getElementById("popUpMod").style.display = "none";
    formularioMod.innerHTML= ''
}



function traerCategorias(idCategoria) {
    
    fetch(
        'http://localhost/koki/backend/get_categorias.php'
    )
        .then(res => res.json())
        .then(datos => {
            console.log(datos)
            lista(datos, idCategoria)
        })
}

function lista(datos, idCategoria) {
    categorias.innerHTML = ''
    for(let valor of datos){       
        if (valor.idCategoria==idCategoria) {
            categorias.innerHTML += `
            <option value=${ valor.idCategoria } selected=selected>${ valor.nombre }</option>
        `
        }else {
        categorias.innerHTML += `
            <option value=${ valor.idCategoria }>${ valor.nombre }</option>
        `

        }
        
    }
}


formularioMod.addEventListener('submit', function(e){
    e.preventDefault();

    if (validarFormulario()) {
        var datos = new FormData(formularioMod);
        datos.append("queryType", "update");

        fetch('../backend/bajaModProducto.php', {
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
                        Producto actualizado!
                    </div>
                    `
                }
            })
        closeForm()
    }

} )


function validarFormulario() {
    var descProducto = document.getElementById('descProducto').value;
    var precio = document.getElementById('precio').value;

    const regExDesc = new RegExp(/^[A-Za-z0-9\s]+$/g);
    const regExPrecio = new RegExp(/^-?\d{1,14}(\.\d{1,2})?$/);
    const regExStock = new RegExp(/^[0-9]+$/g);

    if(descProducto === "" || precio === "" || stock === "") {
      alert('Complete todos los campos');
      return false;
    }
    if (descProducto.length > 45) {
      alert('Parámetros muy largos');
      return false;
    }
    if (!regExDesc.test(descProducto)) {
        alert('Descripción: Caracteres no permitidos');
        return false
    }
    if (!regExPrecio.test(precio)) {
        alert('Precio: debe ingresar solo números en la forma 123.45');
        return false
    }
    if (!regExStock.test(stock)) {
        alert('Stock: debe ingresar solo números');
        return false
    }
    return true;
}

Traer()
