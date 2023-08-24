const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const mongoose = require("mongoose")
const passport = require("passport")
require("./config/alth")(passport)
require("./database/connect")

const {isAdmin} = require("./helpers/isAdmin")

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const flash = require("connect-flash")
const session = require("express-session")

app.use(
    session({
      secret: 'ghgfdkhlfjjodghsisidg',
      resave: true,
      saveUninitialized: true,
    })
  )
  
  app.use(passport.initialize())
  app.use(passport.session())

app.use(flash())

require("./models/Usuario")
require("./models/Postagem")
require("./models/Categoria")
const Usuario = mongoose.model("usuarios")
const Postagem = mongoose.model("postagens")
const Categoria = mongoose.model("categorias")


user = require("./routes/user")
admin = require("./routes/admin")

app.engine("handlebars", handlebars.engine({defaultLayout: 'main'}))
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res, next)=>{
    res.locals.error_msg = req.flash('error_msg')
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

app.get("/", (req, res)=>{
  Postagem.find().limit(7).lean().then((postagens)=>{
    res.render("home", {postagens: postagens})
  }).catch((err)=>{
      res.send(err)
  })
})

app.use("/user", user)
app.use("/admin", isAdmin, admin)

app.listen(8089, ()=>{
    console.log("Server rodando na porta 8089")
})