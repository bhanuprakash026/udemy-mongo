const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/APIFeature')

exports.aliasTopFiveTour = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = "-ratingsAverage,price"
  next()
}


exports.getTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate()
    const tours = await features.query


    res.json({
      status: "OK",
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: "OK",
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    })
  }
}

exports.getTour = async (req, res) => {

  try {
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
      status: "OK",
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      message: "ID is not found"
    })
  }
}

exports.updateTour = async (req, res) => {

  try {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(202).json({
      status: "OK",
      data: {
        tour
      }
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

exports.deleteTour = async (req, res) => {

  try {
    await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: "Success",
      data: {
        data: null
      }
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },

      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity'},
          avgRating: { $avg: '$ratingsAverage' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $sort: { avgRating: 1}
      },
      // {
      //   $match: { _id: { $ne: 'easy'}}
      // }
    ])
    res.status(200).json({
      status: "Success",
      data: {
        stats
      }
    })
  } catch (error) {
    console.log(error)
  }
}