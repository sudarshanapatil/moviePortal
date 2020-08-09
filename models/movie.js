const Movie = require('../schema/movieSchema');
var uniqid = require('uniqid');
module.exports.getAll = () => {
  let skip=0;
  let limit=10;
  return new Promise((resolve, reject) => {
    let movieData = Movie.find({}).skip(skip).limit(limit)
    resolve(movieData)
  })
}

module.exports.filter = (query) => {
  let { skip, limit, genres, search, order, sortField } = query;
  if (skip === undefined || limit === undefined) {
    skip = 0;
    limit = 10;
  }
  order = order || 1;
  sortField = sortField || 'rating'
  let genreFilter = [];
  let searchFilter = [];
  let finalQuery = {}
  if (genres) {
    for (let i of genres) {
      genreFilter.push({ 'genres': i })
    }
    finalQuery['$and'] = finalQuery['$and'] || []
    finalQuery['$and'].push({ $or: genreFilter })
  }
  if (search) {
    searchFilter.push({
      "movieName": {
        "$regex": search,
        "$options": "i"
      }
    },
    {
      "director": {
        "$regex": search,
        "$options": "i"
      }
    });
    finalQuery['$and'] = finalQuery['$and'] || []
    finalQuery['$and'].push({ $or: searchFilter })
  }
  return new Promise((resolve, reject) => {
    let data = Movie.find(finalQuery).sort({
      [sortField]: order
    }).skip(skip).limit(limit)
    resolve(data)
  })
}

module.exports.add = (addData) => {
  return new Promise((resolve, reject) => {
    addData.contentId=uniqid();
    let newMovie = Movie(addData);
    let movieData = newMovie.save();
    resolve(movieData);
  })
}

module.exports.edit = (updatedData) => {
  console.log(updatedData)
  return new Promise((resolve, reject) => {
    Movie.update({ 'id': updatedData._id }, { $set: updatedData })
    resolve()
  })
}

module.exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndRemove(id, (err) => {
      if (err) {
        reject(err)
      }
      console.log('Movie deleted!');
      resolve();
    });
  })
}
