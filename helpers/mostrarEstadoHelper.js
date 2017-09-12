module.exports = function(hbs){
    hbs.registerHelper("mostrarEstado", function(estado){
        if(estado == true){
            return "Activo"
        }
        else
            return "Inactivo"
    })
}