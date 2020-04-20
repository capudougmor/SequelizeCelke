const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Sequelize = require('sequelize')
const bodyParser = require('body-Parser')

//configuração de handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

//configuraçao de sequelize
  const sequelize = new Sequelize('celke', 'root', '@AnaClara021184', {
    host: 'localhost',
    dialect: 'mysql'
  });
  sequelize.authenticate().then(function(){
    console.log('conexao realizada')
  }).catch(function(err){
    console.log('Erro ao realizar conecção '+err)
  })

//configuracao do bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rotas
app.get('/pagamento', function(req, res){
  res.render('pagamento')
})

app.get('/cad-pag', function(req, res){
  res.render('cad-pag')
})

app.post('/add-pag', function(req, res){
  res.send("Nome: " +req.body.nome+ "<br>Valor " +req.body.valor+ "<br>")
})



/*  criacao da tabela pagamentos
  const Pagamentos = sequelize.define('pagamentos', {
    nome: {
      type: Sequelize.STRING,
    },
    valor: {
      type: Sequelize.DOUBLE
    }
  });


//Pagamentos.sync({force: true});

Pagamentos.create({
  nome: "Energia2",
  valor: "230"
})*/

app.listen(8080);