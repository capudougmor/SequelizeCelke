const express = require("express");
const app = express();
const nunjucks = require('nunjucks')
const bodyParser = require("body-parser")
var dateFilter = require('nunjucks-date-filter');
const Pagamento = require("./models/Pagamento")

function setUpNunjucks(expressApp) {

    let env = nunjucks.configure('views', {
        autoescape: true,
        express: app
    });
  
    // note that 'date' is the function name you'll use in the template. As shown in nunjucks-date-filter's readme
    env.addFilter('date', dateFilter);
  
}
  
setUpNunjucks();

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

app.get('/del-pag/:id', function(req, res){
    Pagamento.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/pagamento')
    }).catch(function(erro){
        res.send('Erro ao apagar item' + erro)
    })
})

app.listen(8080);