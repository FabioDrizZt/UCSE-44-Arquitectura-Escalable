const express = require('express')
const router = express.Router()
// Traemos el controlador
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.getMovies)
router.get('/:id', moviesController.getMovieById)
router.get('/search/:title', moviesController.getMovieByTitle)
router.get('/range/:startYear/:endYear', moviesController.getMoviesByDateRange)
router.post('/', moviesController.createMovie)
router.put('/:id', moviesController.updateMovie )
router.delete('/:id', moviesController.deleteMovie)

module.exports = router
