const express = require("express")
const server = express()


// configurar pasta publica => a public
server.use(express.static("public"))



// utilizar template engine
const nunjucks = require("nunjuks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})




//configurar caminhos da aplicação
//pagina inicial
// req : é uma requisição
// res : é uma resposta
server.get("/", (req, res) => {
    res.render(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

//ligar o servidor
server.listen(3000)