const formulario=document.querySelector('#formulario')

var contenido = document.querySelector('#contenido')
var respuesta = document.getElementById('respuesta');
var presupuesto = document.querySelector('#presupuesto')

//var formularioCliente = document.getElementById('popUpCliente')


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
                    <td>${valor.descProducto}</td>
                    <th></th>
                    <td>${valor.precio}</td>
                    <th></th>
                    <td>${valor.stock}</td>
                    <th></th>                     
                    <td> <button class="btn btn-danger w-20 mb-2" onclick="addBudget('${valor.idProducto}','${valor.descProducto}','${valor.precio}','${valor.stock}')"> Agregar</button> </td>
                </tr>
                `
            }
        }
    }

    if (contenido.innerHTML === '') {

        if (texto === '') {
            for (let valor of datos) {
                var cantidadCart = document.getElementById("cantidad1")


                contenido.innerHTML += `
                <tr>
                    <td>${valor.descProducto}</td>
                    <th></th>
                    <td>${valor.precio}</td>
                    <th></th>
                    <td>${valor.stock}</td>
                    <th></th>                     
                    <td> <button class="btn btn-danger w-20 mb-2" onclick="addBudget('${valor.idProducto}','${valor.descProducto}','${valor.precio}','${valor.stock}')"> Agregar</button> </td>
                </tr>
                `
                //<input id="cantidad1" type="number" name="cantidad" placeholder="Ingresa cantidad" value="2" onchange="" required>
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


function addBudget(idProductoCart, descripcionCart, precioCart,stock){
    //localStorage.clear()           
    if (localStorage.getItem(idProductoCart) === null) {
        
        cantidadCart = window.prompt("Ingrese cantidad (stock:"+stock+"):", 1);
        const regExNumero = new RegExp(/^[0-9]*$|^null$/g);

        //if (cantidadCart==null)

        while(parseInt(cantidadCart)>parseInt(stock) || !regExNumero.test(cantidadCart)){
            alert("ERROR! Ingrese nuevamente");
            cantidadCart = window.prompt("Ingrese cantidad (stock:"+stock+"):", 1);
        };
        if(cantidadCart!=null){
            var dataBudget={"IdProductoCart":idProductoCart, "CantidadCart":cantidadCart,"DescripcionCart":descripcionCart, "PrecioCart": precioCart};
            localStorage.setItem(String(idProductoCart),JSON.stringify(dataBudget))
        }
           
    OnBudget()      
    }else{
        alert("Elemento ya agregado previamente")
    }
}


function OnBudget(){
    presupuesto.innerHTML = ''
    if(localStorage.length){
        for(var i = 0; i < localStorage.length; i++){
            var budgetLocalStorage = $.parseJSON(localStorage.getItem(localStorage.key(i)))//como iterar cada elemento del localstorage
            presupuesto.innerHTML += `
            <tr>
                <td>${ budgetLocalStorage.CantidadCart }</td>
                <th></th>
                <td> ${ budgetLocalStorage.DescripcionCart }</td>                
                <th></th>                     
                <td> ${ ((budgetLocalStorage.CantidadCart) * (budgetLocalStorage.PrecioCart)).toFixed(2) } </td>
                <td> <button class="btn btn-danger w-20 mb-2" onclick="deleteFromBudget('${budgetLocalStorage.IdProductoCart}')">Eliminar</button></td>                            
            </tr>
            `
        }

    }
    
    if(presupuesto.innerHTML == ''){
        presupuesto.innerHTML += `
            
            <tr>
                <td>Presupuesto vacio</td>
            </tr>
            
            `
    }
}


function deleteFromBudget(budgetLocalStorage){
    localStorage.removeItem(budgetLocalStorage);

    alert("Elemento eliminado")
    OnBudget()

}


function clearLocalStorage(){
    localStorage.clear()
    //alert("Presupuesto borrado")
    OnBudget()
}



function TerminarFactura(){
    if(localStorage.length){
        var productosCarrito=[];

        for(var i = 0; i < localStorage.length; i++){
                
            var budgetLocalStorage = $.parseJSON(localStorage.getItem(localStorage.key(i)))

            productosCarrito.push(budgetLocalStorage)
       
        }
    }else{
        alert("Carrito vacío")
    }
    console.log(productosCarrito)
    
    idModo_pago=document.getElementById("listadoModoPago").value;
    console.log(idModo_pago)
    idCliente=document.getElementById("Cliente_idCliente").innerText;
    // console.log(idCliente)
    //idModo_pago=2;
    //idCliente=1;

    var data = new FormData();

    data.append("Modo_pago_idModo_pago", idModo_pago);
    data.append("Cliente_idCliente", idCliente);
    data.append("productosCarrito",JSON.stringify(productosCarrito))

    fetch('../backend/cargaFactura.php', {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            if (data === 'errorVacio') {
                respuesta.innerHTML = `
                 <div class="alert alert-danger" role="alert">
                    Error: Rellene todos los campos!
                 </div>
                 `
            } else if(data==="success") {
                respuesta.innerHTML = `
                 <div class="alert alert-primary" role="alert">
                    Factura generada
                 </div>
                 `
                
            }   
        })
    
    clearLocalStorage()
    
    
}



var listaModoPago = document.getElementById('listadoModoPago')


listaModoPago.innerHTML = ''

function TraerModoPago() {
    fetch(
        'http://localhost/koki/backend/get_modos_pago.php'
    )
        .then(res => res.json())
        .then(datos => {
            console.log(datos)
            lista(datos)
        })
}

function lista(datos) {
    listaModoPago.innerHTML = ''
    for(let valor of datos){        
        listaModoPago.innerHTML += `
            <option value=${ valor.idModo_pago }> ${ valor.nombre }  </option>
        `
    }
}

Traer()
TraerModoPago()
OnBudget()