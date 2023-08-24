const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Postagem = new Schema({
    titulo:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    sub1:{
        type: String,
        default: ''
    },
    texto1:{
        type: String,
        required: true
    },
    sub2:{
        type: String,
        default: ''
    },
    texto2:{
        type: String,
        default: ''
    },
    sub3:{
        type: String,
        default: ''
    },
    texto3:{
        type: String,
        default: ''
    },
    categorias:{
        type: [String],
    },
    imgCapa:{
        type: String,
        default: '/img/default.jpeg'
    },
    img2:{
        type: String,
    },
    img3:{
        type: String,
    }
})

mongoose.model("postagens", Postagem)