var departamentos = [];

function cargarDepartamentos() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("get", "/departamentos.json", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            mostrarDepartamentos(JSON.parse(this.responseText))
            departamentos = JSON.parse(this.responseText);
              pintarCiudades(departamentos[0].departamento);
        }
    };
    xhttp.send();
};

function mostrarDepartamentos(departamentos) {
    var departamentosElemt = document.getElementById("departamentos");
    var result = "<select name='departamento' class='form-control' onchange = mostrarCiudades(this)>"
    for (i = 0; i < departamentos.length; i++) {
        result += "<option>" + departamentos[i].departamento + "</option>"
        console.log(departamentos[i].departamento);
    };
    result += "</select>";
    departamentosElemt.innerHTML = result;
  
}

function mostrarCiudades(sele) {
    var departamento = sele.options[sele.selectedIndex].text;
    pintarCiudades(departamento);
}

function pintarCiudades(departamento) {
    var ciudadesElement = document.getElementById("ciudades")
    var result = "<select name='ciudad ' class='form-control'>"
    for (i = 0; i < departamentos.length; i++) {
        if (departamento == departamentos[i].departamento) {
            for (j = 0; j < departamentos[i].ciudades.length; j++) {
                result += "<option>" + departamentos[i].ciudades[j] + "</option>"
            }
        };
    }
    result += "</select>"
    ciudadesElement.innerHTML = result;

}

cargarDepartamentos();
