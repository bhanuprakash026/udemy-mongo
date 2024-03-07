const express = require('express')
const {getTours, createTour, getTour, updateTour, deleteTour, aliasTopFiveTour} = require('../controllers/tourController')

const router = express.Router()

router.route('/top-5-cheap').get(aliasTopFiveTour, getTours)  //aliasTopFiveTour is a Middleware....
router.route('/').get(getTours).post(createTour)
router.route('/:id').get(getTour).put(updateTour).delete(deleteTour)

module.exports = router