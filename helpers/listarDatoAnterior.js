var Banos = require("../models/bano");
var html = "";


module.exports = function (hbs) {
    hbs.registerHelper("analizarBanos", function (valorActual) {

        for (i = 0; i < 10; i++) {
            if (i == valorActual) {
                html += "<option value=\"2\">2</option>";
                //html += "<option selected value ='" + banos[i].cantidad2 + "'>" + banos[i].cantidad2 + "</option>"
            }
            else {
                html += "<option value=\"2\">2</option>";
                //html += "<option value ='" + banos[i].cantidad2 + "'>" + banos[i].cantidad2 + "</option>"
            }
        }       return new hbs.SafeString(html)
        /*Banos.find(function (err, banos) {
            console.log(banos)
            for (i = 0; i < banos.length; i++) {
                if (banos[i].cantidad2 == valorActual) {
                    html += "<option value=\"2\">2</option>";
                    //html += "<option selected value ='" + banos[i].cantidad2 + "'>" + banos[i].cantidad2 + "</option>"
                }
                else {
                    html += "<option value=\"2\">2</option>";
                    //html += "<option value ='" + banos[i].cantidad2 + "'>" + banos[i].cantidad2 + "</option>"
                }
            }
       
 
            console.log(html);
            return new hbs.SafeString(html)
        });*/
    })

};

