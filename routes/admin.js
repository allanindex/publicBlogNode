const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const path = require("path")

//---------------multer------------//
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/img/uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null,  file.originalname + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

require("../models/Usuario.js")
require("../models/Postagem.js")
require("../models/Categoria.js")
const Usuario = mongoose.model("usuarios")
const Postagem = mongoose.model("postagens")
const Categoria = mongoose.model("categorias")

router.get("/categorias", (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render("admin/categorias", {categorias: categorias})
    }).catch(()=>{
    req.flash("error_msg", "houve um erro interno")
    res.redirect("/")
    })
    
})
router.get("/novaCategoria", (req, res)=>{
    res.render("admin/addCategoria")
})
router.post("/novaCategoria", (req, res)=>{
    const erros = []
    if(req.body.nome == '' || req.body.nome == null || req.body.nome == undefined || !req.body.nome){
        erros.push({text:"invalid name"})
    }
    if(erros.length > 0){
        res.render("admin/categorias", {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome
        }
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg", "Categoria adicionada com sucesso")
            res.redirect("/admin/categorias")
        }).catch(()=>{
            req.flash("error_msg", "Erro ao salvar categoria")
            res.redirect("/admin/categorias")
        })
    }
   
})

router.get("/categorias/edit/:id", (req, res)=>{
    Categoria.findOne({_id: req.params.id}).lean().then((categoria)=>{
        res.render("admin/editCategoria", {categoria: categoria})
    }).catch((err)=>{
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })
    
})

router.post("/categorias/edit", (req, res)=>{
        Categoria.findOne({_id: req.body.id}).then((categoria)=>{
            categoria.nome = req.body.nome
            categoria.save().then(()=>{
                req.flash("success_msg", "Category has been updated")
                res.redirect("/admin/categorias")
            }).catch(()=>{
                req.flash("error_msg", "error to category update")
                res.redirect("/admin/categorias")
            })
        }).catch(()=>{
            req.flash("error_msg", "houve um erro interno")
            res.redirect("/")
        })
})

router.post("/categorias/delete/:id", (req, res)=>{
    Categoria.deleteOne({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "Category has been deleted")
        res.redirect("/admin/categorias")
    }).catch((err)=>{
        req.flash("error_msg", err)
        res.redirect("/admin/categorias")
    })
})


router.get("/postagens", (req, res)=>{
    Postagem.find().lean().then((postagem)=>{
        res.render("admin/postagens", {postagens: postagem})
    }).catch(()=>{
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })
   
})

router.get("/postagens/new", (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render("admin/novaPostagem", {categorias: categorias})
    }).catch(()=>{
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })
})

router.post("/postagens/new", upload.fields([
{name: 'imgCapa', maxCount: 1},
{name: 'img2', maxCount: 1},
{name: 'img3', maxCount: 1},

]), (req, res)=>{
    const novaPostagem = {}
    var imagem1 = "/img/blogBackground.jpg"
    var imagem2 = "notfound"
    var imagem3 = "notfound"

    if(req.files.imgCapa){
        const img1 = req.files.imgCapa[0].path 
        imagem1 = img1.slice(6)
    }
    if(req.files.img2){
        const img2 = req.files.img2[0].path 
        imagem2 = img2.slice(6)
    }
    if(req.files.img3){
        const img3 = req.files.img3[0].path 
        imagem3 = img3.slice(6)
    }

    if(req.body.titulo){
        novaPostagem.titulo = req.body.titulo;
    }
    if(req.body.descricao){
        novaPostagem.descricao = req.body.descricao;
    } 
    if(req.body.sub1){
        novaPostagem.sub1 = req.body.sub1;
    }
    if(req.body.texto1){
        novaPostagem.texto1 = req.body.texto1;
    }
    if(req.body.sub2){
        novaPostagem.sub2 = req.body.sub2;
    }
    if(req.body.texto2){
        novaPostagem.texto2 = req.body.texto2;
    }
    if(req.body.sub3){
        novaPostagem.sub3 = req.body.sub3;
    }
    if(req.body.texto3){
        novaPostagem.texto3 = req.body.texto3;
    }
    
    novaPostagem.imgCapa = imagem1;
    
    if(imagem2 != "notfound"){
        novaPostagem.img2 = imagem2;
    }
    if(imagem3 != "notfound"){
        novaPostagem.img3 = imagem3;
    }
    new Postagem(novaPostagem).save().then(()=>{
        req.flash("success_msg", "Postagem cadastrada com sucesso")
        res.redirect("/")
    }).catch(()=>{
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })
})
router.get("/postagens/delete/:id", (req, res)=>{
    Postagem.deleteOne({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "Postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    }).catch(()=>{
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })
})
router.get("/postagens/edit/:id", (req, res)=>{
    Postagem.findOne({_id: req.params.id}).lean().then((postagem)=>{
        res.render("admin/editPostagem", {postagem: postagem})
    }).catch(()=>{
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })
})

router.post("/postagens/edit", (req, res)=>{
        Postagem.findOne({_id: req.body.id}).then((postagem)=>{
            postagem.titulo = req.body.titulo
            postagem.descricao = req.body.descricao
            postagem.sub1 = req.body.sub1
            postagem.texto1 = req.body.texto1
            postagem.sub2 = req.body.sub2
            postagem.texto2 = req.body.texto2
            postagem.sub3 = req.body.sub3
            postagem.texto3 = req.body.texto3

            postagem.save().then(()=>{
                req.flash("success_msg", "Postagem editada com sucesso")
                res.redirect("/admin/postagens")
            }).catch(()=>{
                req.flash("error_msg", "Houve um erro ao editar a postagem")
                res.redirect("/admin/postagens")
            })
        }).catch(()=>{
            req.flash("error_msg", "houve um erro interno")
            res.redirect("/")
        })
})



router.get("/postagens/insertCategoria/:id", (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        Postagem.findOne({_id : req.params.id}).then((postagem)=>{

            const arrayCategorias = categorias.map(objeto => objeto.nome)
            const categoriasMarcadas = postagem.categorias
            const categoriasNaoMarcadas = arrayCategorias.filter(elemento => !categoriasMarcadas.includes(elemento))
        
        res.render("admin/insertCategoria", {categorias: categorias, id: req.params.id, categoriasMarcadas: categoriasMarcadas, categoriasNaoMarcadas: categoriasNaoMarcadas})
    }).catch(()=>{
        res.send("Houve um erro interno")
    })
   }).catch(()=>{
    res.send("Houve um erro interno")
   })   

})
router.post("/postagens/insertCategoria/:id", (req, res)=>{
   Postagem.findOne({_id : req.params.id}).then((documento)=>{
    const checkboxes = req.body.checkbox
    const id = documento._id
    if(req.body.semCheckboxs){
        documento.categorias = []
        documento.save().then(()=>{
            req.flash("success_msg", "Categorias excluidas com sucesso");
            res.redirect("/admin/postagens");
        }).catch(()=>{
            req.flash("error_msg", "Erro ao salvar categorias");
            res.redirect("/admin/postagens");
        })
    }else{
        Postagem.updateOne({_id: id}, {categorias: checkboxes}).then(()=>{
            req.flash("success_msg", "Categorias alteradas com sucesso");
            res.redirect("/admin/postagens");
        }).catch(()=>{
            req.flash("error_msg", "Erro ao salvar categorias");
            res.redirect("/admin/postagens");
        })
    }
    }).catch((err)=>{
        req.flash("error_msg", "houve um erro interno")
        console.log(err)
        res.redirect("/")
    })   
})

module.exports = router
