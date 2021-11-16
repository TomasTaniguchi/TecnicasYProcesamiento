
var contenido = document.getElementById('categorias')

contenido.innerHTML = ''

function traer() {
    fetch(
        'http://localhost/koki/backend/test.php'
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





// fetch('http://localhost/koki/backend/test.php')
//     .then( res => res.json())
//     //.then( data => console.log(data) )
//     .then( data => console.log(data) )


traer()