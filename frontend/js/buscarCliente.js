var formularioCliente = document.getElementById('popUpCliente')
var idClienteBusqueda = ""
var idClienteFinal = ""
var listaClientes = ""


function TraerClientes() {
    fetch(
        'http://localhost/koki/backend/get_clientes.php'
    )
        .then(res => res.json())
        .then(datos => {
            autocomplete(document.getElementById("apellidoNombre"), datos);
            //BuscarCliente(listaClientes)
            // console.log(idClienteBusqueda)
            // console.log(test)
            // console.log(datos)
            listaClientes = datos
        });

}





function autocomplete(inp, arr) {
/*the autocomplete function takes two arguments,
the text field element and an array of possible autocompleted values:*/
var currentFocus;
/*execute a function when someone writes in the text field:*/
inp.addEventListener("input", function(e) {
var a, b, i, val = this.value;
/*close any already open lists of autocompleted values*/
closeAllLists();
if (!val) { return false;}
currentFocus = -1;
/*create a DIV element that will contain the items (values):*/
a = document.createElement("DIV");
a.setAttribute("id", this.id + "autocomplete-list");
a.setAttribute("class", "autocomplete-items");
/*append the DIV element as a child of the autocomplete container:*/
this.parentNode.appendChild(a);
/*for each item in the array...*/
for (i = 0; i < arr.length; i++) {
/*check if the item starts with the same letters as the text field value:*/
if ((arr[i].apellido+", "+arr[i].nombre).substr(0, val.length).toUpperCase() == val.toUpperCase()) {
  /*create a DIV element for each matching element:*/
  b = document.createElement("DIV");
  /*make the matching letters bold:*/
  b.innerHTML = "<strong>" +(arr[i].apellido+", "+arr[i].nombre).substr(0, val.length) + "</strong>";
  b.innerHTML +=(arr[i].apellido+", "+arr[i].nombre).substr(val.length);
  /*insert a input field that will hold the current array item's value:*/
  b.innerHTML += "<input type='hidden' value='" +(arr[i].apellido+", "+arr[i].nombre) + "'>";
  /*execute a function when someone clicks on the item value (DIV element):*/

  idClienteBusqueda = arr[i].idCliente

  b.addEventListener("click", function(e) {
      /*insert the value for the autocomplete text field:*/
      inp.value = this.getElementsByTagName("input")[0].value;
      //idClienteBusqueda = arr[i].idCliente
      console.log(idClienteBusqueda)
      BuscarCliente()
      
      /*close the list of autocompleted values,
      or any other open lists of autocompleted values:*/
      closeAllLists();
  });
  a.appendChild(b);
  //return idClienteBusqueda
}
}
});
/*execute a function presses a key on the keyboard:*/
inp.addEventListener("keydown", function(e) {
var x = document.getElementById(this.id + "autocomplete-list");
if (x) x = x.getElementsByTagName("div");
if (e.keyCode == 40) {
/*If the arrow DOWN key is pressed,
increase the currentFocus variable:*/
currentFocus++;
/*and and make the current item more visible:*/
addActive(x);
} else if (e.keyCode == 38) { //up
/*If the arrow UP key is pressed,
decrease the currentFocus variable:*/
currentFocus--;
/*and and make the current item more visible:*/
addActive(x);
} else if (e.keyCode == 13) {
/*If the ENTER key is pressed, prevent the form from being submitted,*/
e.preventDefault();
if (currentFocus > -1) {
  /*and simulate a click on the "active" item:*/
  if (x) x[currentFocus].click();
}
}
});
function addActive(x) {
/*a function to classify an item as "active":*/
if (!x) return false;
/*start by removing the "active" class on all items:*/
removeActive(x);
if (currentFocus >= x.length) currentFocus = 0;
if (currentFocus < 0) currentFocus = (x.length - 1);
/*add class "autocomplete-active":*/
x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
/*a function to remove the "active" class from all autocomplete items:*/
for (var i = 0; i < x.length; i++) {
x[i].classList.remove("autocomplete-active");
}
}
function closeAllLists(elmnt) {
/*close all autocomplete lists in the document,
except the one passed as an argument:*/
var x = document.getElementsByClassName("autocomplete-items");
for (var i = 0; i < x.length; i++) {
if (elmnt != x[i] && elmnt != inp) {
x[i].parentNode.removeChild(x[i]);
}
}
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
closeAllLists(e.target);
});
return idClienteBusqueda
}
    



function BuscarCliente() {    
    console.log(idClienteBusqueda)
    console.log(listaClientes)
    idClienteFinal=idClienteBusqueda // asigno esta variable para evitar conflictos con busquedas una vez q ya esta seleccionado el cliente
    // busca la posicion en el array del id del autocomplete para traer los demas datos
    for(var i in listaClientes) {
    if(listaClientes[i].idCliente==idClienteBusqueda) var posicionArray=i
    }
    
    formularioCliente.innerHTML= ''
    document.getElementById("popUpCliente").style.display = "block";
    // Formulario para actualizacion
    formularioCliente.innerHTML = `
    <table>
        <tr>
            <td>ID Cliente</td>
            <td id=Cliente_idCliente> ${ listaClientes[posicionArray].idCliente } </td>
        </tr>
        <tr>
            <td>Apellido</td>
            <td> ${ listaClientes[posicionArray].apellido } </td>
        </tr>
        <tr>
            <td>Nombre</td>
            <td> ${ listaClientes[posicionArray].nombre } </td>
        </tr>
        <tr>
            <td>Dirección</td>
            <td>  ${ listaClientes[posicionArray].direccion } </td>
        </tr>
        <tr>
            <td>Email</td>
            <td>  ${ listaClientes[posicionArray].email } </td>
        </tr>
        <tr>
            <td>Teléfono</td>
            <td>  ${ listaClientes[posicionArray].telefono } </td>
        </tr>
        <tr>
            <td>Fecha Nacimiento</td>
            <td>  ${ listaClientes[posicionArray].fechaNacimiento } </td>
        </tr>
        <tr>
        </tr>
    </table>
    <button data-toggle="modal" data-target="#menuModal"  onclick="TerminarFactura()" type="button" class="btn btn-danger">Generar Factura</button>
    `
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  

function closeForm() {
    document.getElementById("popUpCliente").style.display = "none";
    formularioCliente.innerHTML= ''
}


function BuscarCliente2() { // borrar, era para verificar el id cliente q variaba en medio de la busqueda luego de elegir
    console.log(idClienteBusqueda)
}

listaClientes = TraerClientes()




