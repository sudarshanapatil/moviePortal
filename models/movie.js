const Movie = require('../schema/movieSchema');
var uniqid = require('uniqid');
module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    let movieData = Movie.find({})
    resolve(movieData)
  })
}

module.exports.filter = (query) => {
  let { skip, limit, genre, search, order, sortField } = query;
  console.log("Query", query)
  if (skip === undefined || limit === undefined) {
    skip = 0;
    limit = 10;
  }
  order = order || -1;
  sortField = sortField || 'rating'
  let genreFilter = [];
  let searchFilter = [];
  let finalQuery = {}
  if (genre) {
    for (let i of genre) {
      genreFilter.push({ 'genres': i.charAt(0).toUpperCase() + i.slice(1) })
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
        "actors": {
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
    Movie.find(finalQuery, (err, data) => {
      Movie.countDocuments(finalQuery, (err, count) => {
        let res = {
          data,
          count
        }
        resolve(res)
      })
    }).sort({
      [sortField]: order
    }).skip(skip).limit(limit)
  })
}

module.exports.add = (addData) => {
  return new Promise((resolve, reject) => {
    addData.contentId = uniqid();
    let newMovie = Movie(addData);
    let movieData = newMovie.save(function (err, data) {
      if (err) {
        reject({ code: 402 })
      }
      else {
        resolve(movieData);
      }
    });
  })
}

module.exports.edit = (updatedData) => {
  return new Promise((resolve, reject) => {
    let id = updatedData.contentId;
    delete updatedData.contentId;
    Movie.updateOne({ 'contentId': id }, updatedData, function (err, res) {
      if (err)
        reject(err)
      else
        resolve(res)
    });

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
