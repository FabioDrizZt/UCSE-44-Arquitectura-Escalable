// Traemos el modelo de Movie
const Movie = require('../models/Movie')

const getMovies = (req, res) => {
    const atributo = { ...req.query }
    query = !atributo ? {} : atributo 
    // Si no hay género especificado, obtendremos todas las películas
    Movie.find(query)
        .then(movies => res.json(movies))
        .catch(error => res.status(500).json({ message: 'Error interno del servidor', error }))
}

const getMovieById = (req, res) => {
    const { id } = req.params
    Movie.findById(id)
        .then(movie => {
            if (!movie) return res.status(404).json({ message: 'Pelicula no encontrada' })
            res.json(movie)
        })
        .catch(error => res.status(500).json({ message: 'Error interno del servidor', error }))
}

const getMovieByTitle = (req, res) => {
    const { title } = req.params
    Movie.find({ title: { $regex: title, $options: 'i' } })
        .then(movies => res.json(movies))
        .catch(error => res.status(500).json({ message: 'Error interno del servidor', error }))
}

const getMoviesByDateRange = (req, res) => {
    const { startYear, endYear } = req.params
    Movie.find({ startYear: { $gte: parseInt(startYear), $lte: parseInt(endYear) } })
        .then(movies => res.json(movies))
        .catch(error => res.status(500).json({ message: 'Error interno del servidor', error }))
}

const createMovie = (req, res) => {
    const newMovie = new Movie(req.body)
    newMovie.save()
        .then(movie => res.status(201).json(movie))
        .catch(error => res.status(400).json({ message: 'Error al agregar la pelicula', error }))
}

const updateMovie = (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(movie => {
            if (!movie) return res.status(404).json({ message: 'Pelicula no encontrada' })
            res.json(movie)
        })
        .catch(error => res.status(500).json({ message: 'Error interno del servidor', error }))
}

const deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(movie => {
            if (!movie) return res.status(404).json({ message: 'Pelicula no encontrada' })
            res.status(200).json({ message: 'Pelicula eliminada correctamente' })
        })
        .catch(error => res.status(500).json({ message: 'Error interno del servidor', error }))
}

module.exports = { 
    getMovies,
    getMovieById,
    getMovieByTitle,
    getMoviesByDateRange,
    createMovie,
    updateMovie,
    deleteMovie
}
