var clicksHechos = 0;

function agregarDireccion() {
     if(clicksHechos < 5){
       var divNuevo = document.createElement("div")
       divNuevo.setAttribute("class", "input-group")
       divNuevo.setAttribute("id", clicksHechos + "direccion")
       var input = document.createElement("input");
       input.setAttribute("class", "form-control")
        var a = document.createElement("a")
        a.setAttribute("class","input-group-addon")
        a.setAttribute("onclick","borrarDireccion('"+clicksHechos+"direccion')")
        var i = document.createElement("i")
        i.innerText = "-"
        a.appendChild(i)
        var span = document.createElement("span")
        span.setAttribute("class", "text-danger")
        divNuevo.appendChild(document.createElement("br"))        
       divNuevo.appendChild(input);
       divNuevo.appendChild(a);
       divNuevo.appendChild(span);
        divNuevo.removeAttributeNode
       document.getElementById("divInputDireccion").appendChild(divNuevo);
       clicksHechos += 1
     }
}
function borrarDireccion(id){
    var divInputDireccion = document.getElementById("divInputDireccion")
 var elememnto =  document.getElementById(id);
    divInputDireccion.removeChild(elememnto);
    clicksHechos -= 1
}