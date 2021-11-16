var ProductoMasCaro = document.getElementById('ProductoMasCaro')
var PrecioMasCaro = document.getElementById('PrecioMasCaro')
var ProductoMasBarato = document.getElementById('ProductoMasBarato')
var PrecioMasBarato = document.getElementById('PrecioMasBarato')
var TotalVentas = document.getElementById('TotalVentas')
var ModoPago1 = document.getElementById('ModoPago1')
var CantidadModoPago1 = document.getElementById('CantidadModoPago1')
var ModoPago2 = document.getElementById('ModoPago2')
var CantidadModoPago2 = document.getElementById('CantidadModoPago2')
var ModoPago3 = document.getElementById('ModoPago3')
var CantidadModoPago3 = document.getElementById('CantidadModoPago3')



var detalleProductosVendidos = document.getElementById('InformeVentas')
var detalleUnidadesVendidasPorModoPago = document.getElementById('UnidadesVendidasPorModoPago')
var detalleInformeFacturas = document.getElementById('InformeFacturas')




function TraerInforme() {
    fetch(
        'http://localhost/koki/backend/informeTest.php'
    )
        .then(res => res.json())
        .then(datos => {
            detallarInforme(datos)
            //console.log(datos)
        });

}



function detallarInforme(datos) {    
    ProductoMasCaro.innerHTML = datos.precioMax[0].descProducto
    PrecioMasCaro.innerHTML = "$ "+datos.precioMax[0].precio
    ProductoMasBarato.innerHTML = datos.precioMin[0].descProducto
    PrecioMasBarato.innerHTML = "$ "+datos.precioMin[0].precio
    TotalVentas.innerHTML = "$ "+datos[0].totalVentas
    ModoPago1.innerHTML = datos[1].nombre
    CantidadModoPago1.innerHTML = datos[1].cantVentas
    ModoPago2.innerHTML = datos[2].nombre
    CantidadModoPago2.innerHTML = datos[2].cantVentas
    ModoPago3.innerHTML = datos[3].nombre
    CantidadModoPago3.innerHTML = datos[3].cantVentas


    detalleProductosVendidos.innerHTML = ''
    for (let valor of datos.productosVendidos) {
        console.log(valor.idProducto, valor.descProducto)
        detalleProductosVendidos.innerHTML += `
        <tr>
            <td>${valor.idProducto}</td>
            <td>${valor.descProducto}</td>
            <td>${valor.totalUnidades}</td>
        </tr>
        `
    }
    detalleProductosVendidos.innerHTML += `
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    `



    detalleUnidadesVendidasPorModoPago.innerHTML = ''
    for (let valor of datos.UnidadesVendidasPorModoPago) {
        //console.log(valor.idProducto, valor.descProducto)
        detalleUnidadesVendidasPorModoPago.innerHTML += `
        <tr>
            <td>${valor.nombre}</td>
            <td>${valor.cantArticulos}</td>
        </tr>
        `
    }
    detalleUnidadesVendidasPorModoPago.innerHTML += `
    <tr>
        <td></td>
        <td></td>
    </tr>
    `
    

    detalleInformeFacturas.innerHTML = ''
    for (let valor of datos.informeFacturas) {
        //console.log(valor.idProducto, valor.descProducto)
        detalleInformeFacturas.innerHTML += `
        <tr>
            <td>${valor.idFactura}</td>
            <td>${valor.apellido}, ${valor.nombre}</td>
            <td>${valor.modoPago}</td>
            <td>${valor.fecha}</td>
            <td>${valor.cantArticulos}</td>
            <td> $ ${valor.totalFactura}</td>
        </tr>
        `
    }
    detalleInformeFacturas.innerHTML += `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    `
}






TraerInforme()