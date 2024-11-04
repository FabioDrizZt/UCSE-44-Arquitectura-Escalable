// Conectamos a MongoDB usando Mongoose
const connectDB = require('./config/database')
connectDB()

// Traemos express
const express = require('express')
const app = express()

// Middleware para recibir JSON
app.use(express.json())

const moviesRoutes = require('./routes/moviesRoutes.js');
app.use('/movies', moviesRoutes)

// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de peliculas 🎬')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})
