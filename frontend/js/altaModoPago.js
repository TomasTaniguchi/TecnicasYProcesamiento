// console.log('funcionando');

var formularioAltaModoPago = document.getElementById('formularioAltaModoPago');
var respuesta = document.getElementById('respuesta');

formularioAltaModoPago.addEventListener('submit', function(e){
    e.preventDefault();

    if (validarFormulario()) {
        var datos = new FormData(formularioAltaModoPago);

        fetch('../backend/altaModoPago.php',{
            method: 'POST',
            body: datos
        })
            .then( res => res.json())
            .then( data => {
                if(data === 'error'){
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