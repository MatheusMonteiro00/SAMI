import express from 'express'
const app  = express()

app.get('/api/hosts', function(req, res){
    res.json('Primeira rota')
})

app.get('/api/logs', function(req, res){
    res.json('rota user')
}) 
   
app.listen(3000,()=>{
    console.log(`Servidor rodando em https://localhost:3000`)
})