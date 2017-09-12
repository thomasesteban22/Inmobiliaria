module.exports = function(hbs){
    hbs.registerHelper("saludo", function(nombre){
        saludo = nombre + "hola"
        return saludo;
        console.log(saludo)
    })
}
