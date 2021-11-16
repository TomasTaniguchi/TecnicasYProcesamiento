// console.log('funcionando');

var formularioAltaProducto = document.getElementById('formularioAltaProducto');
var respuesta = document.getElementById('respuesta');
var contenido = document.getElementById('categoria')

contenido.innerHTML = ''

function traer() {
    fetch(
        'http://localhost/koki/backend/get_categorias.php'
    )
        .then(res => res.json())
        .then(datos => {
            console.log(datos)
            lista(datos)
        })
}

function lista(datos) {
    contenido.innerHTML = ''
    for(let valor of datos){        
        contenido.innerHTML += `
            <option value=${ valor.idCategoria }>${ valor.nombre }</option>
        `
    }
}

traer()


formularioAltaProducto.addEventListener('submit', function(e){
    e.preventDefault();

    if (validarFormulario()) {
    var datos = new FormData(formularioAltaProducto);

    fetch('http://localhost/koki/backend/altaProducto.php',{
        method: 'POST',
        body: datos
    })
        .then( res => res.json())
        .then( data => {
            if(data === 'errorVacio'){
                respuesta.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Llena todos los campos
                </div>
                `
            }else{
                respuesta.innerHTML = `
                <div class="alert alert-primary" role="alert">
                    ${data}
                </div>
                `
            }
            console.log(data)
        } )
    }
}
)

function validarFormulario() {
    var descProducto = document.getElementById('descProducto').value;
    var precio = document.getElementById('precio').value;
    var stock = document.getElementById('stock').value;

    const regExDesc = new RegExp(/^[A-Za-z0-9\s]+$/g);
    const regExPrecio = new RegExp(/^-?\d{1,14}(\.\d{1,2})?$/);
    const regExStock = new RegExp(/^[0-9]*$|^null$/g);

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