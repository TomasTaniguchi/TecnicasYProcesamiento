var formularioValidarUsuario = document.getElementById("formularioValidarUsuario");
email=document.getElementById("email").value

formularioValidarUsuario.addEventListener('submit', function(e){
    e.preventDefault();
        var datos = new FormData(formularioValidarUsuario); 

        fetch('../backend/getValidarUsuario.php',{
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(data => {
               validarUsuario(data)
            } )
    
}
)

function validarUsuario(data){     
    sessionStorage.setItem("usuarioActivo",data.mail);
    sessionStorage.setItem("rolActivo",data.rol);
    ingresoUsuario()
}



function ingresoUsuario(){
    var rol=sessionStorage.getItem("rolActivo");
    console.log("asdasd"+rol)
    switch(rol){
        case "1":
            window.location.href="http://localhost/koki/frontend/cargaFactura.html"
            break
        case "2":
            window.location.href="http://localhost/koki/frontend/cargaFactura.html"
            break
        default:
            window.location.href="http://localhost/koki/frontend/testLogin.html"
            break

    }

}









