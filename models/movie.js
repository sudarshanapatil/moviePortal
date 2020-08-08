const Movie = require('../schema/movieSchema');

module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        let movieData = Movie.find({})
        resolve(movieData)
    })
}

module.exports.search = (searchText) => {
    return new Promise((resolve, reject) => {
        let data = Movie.find(
            {
                $or: [
                    { "movieName": { "$regex": searchText, "$options": "i" } },
                    { "director": { "$regex": searchText, "$options": "i" } }
                ]
            }
        );
        resolve(data)
    })
}

module.exports.sort = (sort) => {
    let order = 1;
    if (sort === 'rating')
        order = 0;
    // filter = "'" + filter + "'";
    console.log(sort, order)
    //TODO: not working with filter value
    return new Promise((resolve, reject) => {
        let data = Movie.find({}).sort({ sort: order })
        resolve(data);
    })
}

module.exports.filter = (filter) => {
    let filterArr = filter.map(genre => {
        return { 'genres': genre }
    })
    return new Promise((resolve, reject) => {
        let data = Movie.find({
            $or: filterArr
        })
        resolve(data);
    })
}
