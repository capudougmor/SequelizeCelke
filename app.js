const express = require("express");
const app = express();
const nunjucks = require('nunjucks')
const bodyParser = require("body-parser")
const moment = require('moment')
const Pagamento = require("./models/Pagamento")

nunjucks.configure('./views', {
    express: app,
    noCache: true,
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas

app.get('/pagamento', function(req, res){
    Pagamento.findAll({order: [['id', 'DESC']]}).then(function(pagamentos){
        res.render('pagamento.html', {pagamentos: pagamentos});
    })
    
});

app.get('/cad-pag', function(req, res){
    res.render('cad-pag.html');
});

app.post('/add-pag', function(req, res){
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/pagamento')
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
    //res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>") 
})

app.listen(8080);