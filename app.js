const http = require('http')
const url = require("url")
const stringDecoder = require("string_decoder").StringDecoder
const util = require("util")
//const formidable = require("formidable")

const fs = require('fs').promises
const host = 'localhost'
const port = 3000

let indexFile

const requestListener = function (req, res) {
    let path = url.parse(req.url, true)
    //path.pathname path.search path.query --path, querystring, qs object
    //path.port path.protocol path.origin -- all nulls

    res.setHeader("Content-Type", "text/html")
    res.writeHead(200)
    if(req.method.toLowerCase() == "get"){
        qs = path.query
        if(qs.valor){
            res.write(indexFile)

            val = parseInt(qs.valor) + 2
            res.write("<h2 style=\'color:red\'>Valor da soma: " + val.toString() + "</h2>")
            res.end()
        }else{
            res.end(indexFile)
        }
    }
    else{
        res.end(indexFile)
    }
}

const server = http.createServer(requestListener)

fs.readFile(__dirname + "/index.html")
    .then(contents => {
        indexFile = contents
        server.listen(port, host, () =>{
            console.log(`Server is running on http://${host}:${port}`)
        })
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`)
        process.exit
    })