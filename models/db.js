const Sequelize = require('sequelize')
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

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}