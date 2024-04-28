import express from 'express';
import { users } from './DATA/users.data.js';

const app = express()
const __dirname = import.meta.dirname

app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
})

app.get('/abracadabra/usuarios' , (req,res) => {
    res.json(users)
} )


// validacion

app.use('/abracadabra/juego/:usuario', (req,res,next) => {
    const {usuario} = req.params
    
    users.usuarios.includes(usuario)
        ? next()
        : res.send('<img src="/who.jpeg" alt="Usuario desconocido"></img>')

} )

app.get('/abracadabra/juego/:usuario', (req,res) => {
    const {usuario} = req.params
    res.redirect('/')

} )

app.get('/abracadabra/conejo/:n', (req, res)=> {
    const userNumber = +req.params.n
    const correctNumber = Math.floor(Math.random() * 3) + 1;
    userNumber === correctNumber
        ? res.send('<img src="/conejito.jpg" alt="conejo"></img>')
        : res.send('<img src="/voldemort.jpg" alt="voldemort"></img>')

})

app.get('/*', (req,res)=>{
    res.send(`Esta página no existe....`)
})

const port = process.env.PORT ||  3000

app.listen(port, () => {
  console.log(`Aplicacion corriendo en el puerto ${port}`)
})