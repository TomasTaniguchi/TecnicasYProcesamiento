detalleFactura = document.getElementById("DetalleFactura");
CodigoFactura = document.getElementById("CodigoFactura");
nombreCliente = document.getElementById("nombreCliente");
fechaEmision = document.getElementById("fechaEmision");

function TraerFacturas(idFactura) {
    console.log("ADASD"+idFactura)
    fetch('../backend/get_facturas.php?idFactura='+idFactura)
        .then(res => res.json())
        .then(data => {            
            detallarFactura(data)
            console.log(data)       
        })
}



function detallarFactura(datos) {    
    detalleFactura.innerHTML = ''
    acumuladorTotal = 0
    CodigoFactura.innerHTML = datos[0].idFactura
    nombreCliente.innerHTML = datos[0].apellido+", "+datos[0].nombre
    fechaEmision.innerHTML = datos[0].fecha

    for (let valor of datos) {

        detalleFactura.innerHTML += `
        <tr>
            <td>${valor.Producto_idProducto}</td>
            <td>${valor.descProducto}</td>
            <td>${valor.cantidad}</td>
            <td  class="text-right">${valor.precio}</td>
            <td  class="text-right">${valor.Total}</td>
        </tr>
        `
        acumuladorTotal += parseFloat(valor.Total)
    }
    detalleFactura.innerHTML += `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td  class="text-right"> <strong> Total </strong></td>
        <td  class="text-right"> <strong>${acumuladorTotal.toFixed(2)}</strong></td>
    </tr>
    `
    
}
