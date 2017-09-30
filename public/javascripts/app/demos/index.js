var app = new Vue({
    el: '#app',
    data: {
        mensaje: "Hola",
        mensaje2: "Como estas"
    }
});

var app = new Vue({
    el: '#app2',
    data: {
        mensaje: "Esta haciendo Hover con el maus",
        clase: "text-danger",
        mensaje2: "Clase"
    }
})

var app = new Vue({
    el: '#app3',
    data: {
        mostrar: true
    }
})

var app = new Vue({
    el: '#app4',
    data: {
        todos: [
            { text: "hola" },
            { text: "como estas" },
            { text: "adios" },

        ],
        numeros1: [
            { numeros: 1 },
            { numeros: 2 },
            { numeros: 3 },
            { numeros: 4 },
            { numeros: 5 },
            { numeros: 6 },
            { numeros: 7 },
            { numeros: 8 }

        ],
        vocales: [
            { vocal: "a" },
            { vocal: "e" },
            { vocal: "i" },
            { vocal: "o" },
            { vocal: "u" },
        ]
    }
})

var app = new Vue({
    el: '#app5',
    data: {
        mensaje: "Hola a todos ;)",
        otroColor: "",
        colorNormal: "",
        numeros: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
        ]

    },
    methods: {
        reverseMessage: function () {
            this.mensaje = this.mensaje.split('').reverse().join('')
            this.numeros = this.numeros.reverse()

        },
        alerta: function () {
            alert("lo q sea")
        },
        cambiarColor: function () {
            this.otroColor = "otroColor"
        },
        cambiarColor2: function () {
            this.otroColor = "colorNormal"
        }
    }
})




var app = new Vue({
    el: '#app6',
    data: {
        texto: "holaa",
        claseAgrandarLetras: ""
    },
    methods: {
        agrandarLetra: function () {
            this.claseAgrandarLetras = "agrandarLetras"
        },
        achiquitarLetra: function () {
            this.claseAgrandarLetras = "achiquitarLetras"
        }
    }
})


var app = new Vue({
    el: '#app7',
    data: {
        mensaje: "QWERTYUI"
    }
})

Vue.component('todo-item', {
    props: ["todo", "minombre"],
    template: '<li>\{{todo.text}} \{{minombre}} </li>'

})
var app8 = new Vue({
    el: '#app8',
    data: {
        minombre: "",
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
    }
})

var app9 = new Vue({
    el: '#app9',
    data: {
        nombre: "Thomasss ",
        path: "images/IMG1.jpg",
        check: true
    },
    created: function () {
        console.log('nombre es' + this.nombre);
    }
})
app9.$watch('nombre', function (nuevoValor, viejoValor) {
    console.log(nuevoValor, viejoValor)
})


var app10 = new Vue({
    el: '#app10',
    data: {
        pregunta: "",
        respuesta: "¡Has una pregunta!",
        image:""
    },
    watch: {
        pregunta: function (nuevaPregunta) {
            this.respuesta = "Esperando a que termines de escribir"
            this.getRespuesta()
        }
    },
    methods: {
        getRespuesta: function () {
            if (this.pregunta.indexOf('?') === -1) {
                this.respuesta = "las preguntas tiene un signo de interrogacion :)"
                return
            }
            this.respuesta = "Pensando..."
            var vm = this
            axios.get('https://yesno.wtf/api')
            .then(function(response){
                vm.respuesta = response.data.answer;
                vm.image = response.data.image;
            }).catch(function(err){
                vm.respuesta = "Error al traer la API" + error
            })
        }
    }
})

