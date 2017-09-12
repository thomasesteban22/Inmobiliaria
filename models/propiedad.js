var mongoose = require("mongoose");

var Propiedad = new mongoose.Schema(
    {
        nombre: { type: String, required: [true, "Nombre de la propiedad es requerido"] },
        ncuartos: { type: Number, required: [true, "Cuatos de la propiedad es requerido"], min: [1, "Minimo de cuartos es 1"], max: [20, "Maximo de cuartos es 20"] },
        nbanos: { type: Number, required: [true, "Baños de la propiedad es requerido"], min: [1, "Minimo de baños es 1"], max: [20, "Maximo de baños es 20"] },
        ngarajes: { type: Number, required: [true, "Garajes de la propiedad es requerido"], min: [1, "Minimo de garajes es 1"], max: [20, "Maximo de garajes es 20"] },
        metrosCuadrados: { type: String, required: [true, "Mt2 de la propiedad es requerido"] },
        tipoDePropiedad: { type: String, required: [true, "Tipo de la propiedad es requerido"] },
        tipoDeInmueble: { type: String, required: [true, "Tipo de inmueble de la propiedad es requerido"] },
        precio: { type: Number, required: [true, "Precio de la propiedad es requerido"], min: [10000, "Minimo de precio es 10000"], max: [999999999999999999, "Maximo de precio es 999999999999999999 "] },
        barrio: { type: String, required: [true, "Barrio de la propiedad es requerido"] },
        direccion: { type: String, required: [true, "Direccion de la propiedad es requerido"] },
        descripcion: { type: String, required: [true, "Descripcion de la propiedad es requerido"] },
        fechaDeRegistro: Date,
        imagenes: { type: [] },
        departamento: String,
        ciudad: String,
        pais : String
    }
);
Propiedad.path('descripcion').validate(function (descripcion) {
    return descripcion.length < 1000;
});
Propiedad.path("imagenes").validate(function (imagenes) {
    return true//imagenes.lenght < 5;
   /*if (Array.isArray(imagenes) & imagenes.lenght <= 5) return true;
    else {
        return false;
    }*/
},
    "{PATH} supera el  maximo permitido  que es 5"
)
Propiedad.path("imagenes").validate(function (imagenes) {
    return true//imagenes.lenght < 3;
},
    "{PATH} minimo permitidas es 3"
)

module.exports = mongoose.model("Propiedad", Propiedad);