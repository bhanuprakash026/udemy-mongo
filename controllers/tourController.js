const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/APIFeature')

exports.aliasTopFiveTour = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = "-ratingsAverage,price"
  next()
}


exports.getTours = async (req, res) => {
  try {
    // 1A) Filtering
    // const queryObj = { ...req.query }
    // const excludedFields = ['page', 'limit', 'fields', 'sort']
    // excludedFields.forEach(el => delete queryObj[el])

    // // 1B) Advance filtering
    // let queryStr = JSON.stringify(queryObj)
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => $${match})


    // let query = Tour.find(JSON.parse(queryStr));

    // 2) SORTNG
    // if (req.query.sort) {
    //   console.log(req.query.sort)
    //   const sortBy = req.query.sort.split(',').join(" ")
    //   query = query.sort(sortBy)
    // }

    // 3)FIELD LIMITING
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    // 4) PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit

    // // page=2&limit=10 ====> 1-10 ==> PAGE 1, 11-20 ==> PAGE 2

    // query = query.skip(skip).limit(limit)

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page doesn't exist")
    // } 

    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().pagination()
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