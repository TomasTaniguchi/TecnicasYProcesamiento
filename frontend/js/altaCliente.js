// console.log('funcionando');

var formularioAltaCliente = document.getElementById('formularioAltaCliente');
var respuesta = document.getElementById('respuesta');

formularioAltaCliente.addEventListener('submit', function(e){
    e.preventDefault();
    if (validarFormulario()) {


        var datos = new FormData(formularioAltaCliente);

        fetch('../backend/altaCliente.php',{
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
                //console.log(data)
            } )
    }
}
)



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
