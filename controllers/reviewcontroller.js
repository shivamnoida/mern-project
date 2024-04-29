const reviewModel = require('../models/reviewmodel');

// Get all reviews
const getAllReviews = async (req, res) => {
  const reviews = await reviewModel.find();
  res.json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
};

// Add a review
const addReview = async (req, res) => {
  try {
    const { _id, createdAt, updatedAt, ...reqData } = req.body;
    const reviews = await reviewModel.create(reqData);
    res.json({
      status: 'success',
      results: 1,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(403);
    console.log(err);
    res.json({
      status: 'fail',
      message: JSON.stringify(err),
    });
  }
};

// Replace a review
const replaceReview = async (req, res) => {
  try {
    const reqId = req.params.id;
    const { _id, createdAt, updatedAt, ...data } = req.body;
    const reviews = await reviewModel.findOneAndReplace({ _id: reqId }, data);
    if (!reviews) {
      res.status(400);
      res.json({
        status: 'fail',
        message: 'Id does not exist',
      });
      return;
    }
    res.json({
      status: 'success',
      results: 1,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: 'fail',
      message: JSON.stringify(err),
    });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const reqId = req.params.id;
    const { _id, createdAt, updatedAt, ...data } = req.body;
    const reviews = await reviewModel.findOneAndUpdate({ _id: reqId }, data);
    if (!reviews) {
      res.status(400);
      res.json({
        status: 'fail',
        message: 'Id does not exist',
      });
      return;
    }
    res.json({
      status: 'success',
      results: 1,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: 'fail',
      message: JSON.stringify(err),
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const reqId = req.params.id;
    const reviews = await reviewModel.findOneAndDelete({ _id: reqId });
    if (!reviews) {
      res.status(400);
      res.json({
        status: 'fail',
        message: 'Id does not exist',
      });
      return;
    }
    res.status(204);
    res.json({
      status: 'success',
      results: 1,
      data: {
        reviews: reviews,
      },
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: 'fail',
      message: JSON.stringify(err),
    });
  }
};

module.exports = {
  getAllReviews,
  addReview,
  replaceReview,
  updateReview,
  deleteReview,
};