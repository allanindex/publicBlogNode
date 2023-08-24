const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Postagem = mongoose.model('postagens')
const Usuario = mongoose.model("usuarios")
const Categoria = mongoose.model("categorias")
const bcrypt = require("bcryptjs")
const passport = require("passport")

router.get('/postagens', (req, res)=>{
   Postagem.find().lean().then((postagens)=>{
    res.render("user/viewPostagens", {postagens: postagens})
   }).catch(()=>{
      req.flash("error_msg", "houve um erro interno")
      res.redirect("/")
  })
})
router.get('/showPostagem/:id', (req, res)=>{
   Postagem.findOne({_id: req.params.id}).lean().then((postagem)=>{
      res.render('user/showPostagem', {postagem: postagem})
   }).catch(()=>{
      req.flash("error_msg", "houve um erro interno")
      res.redirect("/")
  })
})
router.get("/categorias", (req, res)=>{
   Categoria.find().lean().then((categorias)=>{
      res.render("user/categorias", {categorias: categorias})
   }).catch(()=>{
      req.flash("error_msg", "houve um erro interno")
   })
})

router.get("/queryCategoria/:id", (req, res)=>{
   Categoria.findOne({_id: req.params.id}).then((categoria)=>{
      Postagem.find({categorias: { $in: [categoria.nome]}}).lean().exec().then((postagens)=>{
         res.render("user/selectCategoria", {postagens: postagens, categoria: categoria.nome})
      }).catch(()=>{
         req.flash("error_msg", "erro ao localizar categoria")
         res.redirect("/user/categorias")
      })
   }).catch(()=>{
      req.flash("error_msg", "erro ao localizar categoria")
      res.redirect("/user/categorias")
   })
})

router.get("/cadastro", (req, res)=>{
   res.render("user/cadastro")
})

router.post("/cadastro", (req, res)=>{
    var erros = []
   if(!req.body.nome || req.body.nome.length < 3 || req.body.nome == null || req.body.nome == ''){
      erros.push({texto: "Nome inválido"})
   }
   if(!req.body.email ||req.body.email == "" || req.body.email == 0){
      erros.push({texto: "Email inválido"})
   }
   if(req.body.senha.length < 5){
      erros.push({texto: "Senha muito curta"})
   }else 
   if(!req.body.senha || req.body.senha == ""){
      erros.push({texto: "Senha inválida"})
   }  
   
   if(req.body.senha != req.body.senha2){
      erros.push({texto: "Senhas diferentes"})
   }
   if(!req.body.dataNasc){
      erros.push({texto: "Data inválida"})
   }

   if(erros.length > 0){
      res.render("user/cadastro", {erros: erros})
   }else{
      Usuario.findOne({email: req.body.email}).lean().then((usuario)=>{
         if(usuario){
             req.flash('error_msg', 'Já existe uma conta com esse email em nosso sistema')
             res.redirect('/user/cadastro')
         }else{
          const novoUsuario = new Usuario(
            {
               nome: req.body.nome,
               email: req.body.email,
               senha: req.body.senha,
               dataNasc: req.body.dataNasc
           }
          )
            bcrypt.genSalt(10, (erro, salt)=>{
               bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                  if(erro){
                     req.flash('error_msg', 'Houve um erro durante o salvamento')
                     res.redirect('/')
                  }
                  novoUsuario.senha = hash
                  novoUsuario.save().then(()=>{
                        req.flash('success_msg', 'usuário criado com sucesso')
                        res.redirect('/')
                  }).catch(()=>{
                        req.flash('error_msg', 'houve um erro ao cadastrar o usuário')
                        res.redirect('/')
                     })
               })
            })
         }
   })
   }
})

router.get("/login", (req, res)=>{
   res.render("user/login")
})
router.post("/login", (req, res, next)=>{
   passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/login",
      failureFlash: true
   })(req, res, next)
})
router.get("/logout", (req, res)=>{
   req.logout(
      (err)=>{
      if(err){
       return next(err)
      }
      req.flash("success_msg", "deslogado com sucesso")
      res.redirect('/')
      
   })
})
module.exports = router