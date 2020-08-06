const Movie = require('../schema/movieSchema');

module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        let movieData = Movie.find({})
        resolve(movieData)
    })
}

module.exports.add = (addData) => {
    console.log(addData, "in model")
    //TODO: create uniqueId for user
    return new Promise((resolve, reject) => {
        let newMovie = Movie(addData);
        let movieData = newMovie.save();
        resolve(movieData)
    })
}

module.exports.edit = (updatedData) => {
    return new Promise((resolve, reject) => {
        User.findById(1, (err, user) => {
            if (err) throw err;
            user.save(function (err) {
                if (err) throw err;
                console.log('User successfully updated!');
                resolve()
            });

        });
    })
}

module.exports.remove = () => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndRemove(4, (err) => {
            if (err) throw err;
            console.log('User deleted!');
            resolve()
        });
    })
}