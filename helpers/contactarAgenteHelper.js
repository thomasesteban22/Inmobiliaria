var Agente = require("../models/agente");
module.exports = function(hbs){
    hbs.registerHelper("contactarAgente", function(agente){
        Agente.find(function(err, agentes){
            
        });
    });
}