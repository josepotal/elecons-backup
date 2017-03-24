const User = require('../../../models/User')

module.exports = (req, res) => {
  User.find()
    .then( users => res.json( {users}))
    .catch( err => { throw err })
}
