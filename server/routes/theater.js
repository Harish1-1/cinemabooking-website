const express = require('express')
const {
	getTheaters,
	getTheater,
	createTheater,
	updateTheater,
	deleteTheater,
	getTheaterByMovie
} = require('../controllers/theaterController')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(getTheaters).post(protect, authorize('admin'), createTheater)
router.route('/movie').get(getTheaterByMovie)
router
	.route('/:id')
	.get(getTheater)
	.put(protect, authorize('admin'), updateTheater)
	.delete(protect, authorize('admin'), deleteTheater)

module.exports = router
