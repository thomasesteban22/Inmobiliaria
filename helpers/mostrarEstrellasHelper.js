module.exports = function(hbs){
    hbs.registerHelper("mostrarEstrellas", function(calificacion){
     var html = "";
     for(var i = 1; i<=calificacion; i++){
         html += '<i class="fa fa-star" aria-hidden="true"></i>'
     }
        return new hbs.SafeString(html);
    })
}