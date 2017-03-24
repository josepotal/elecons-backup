const User = require( __base + 'models/User');

module.exports = (req,res) => {

  let id  = req.params.id;
  let {maxPower} = req.body;

  User.findByIdAndUpdate( id,  { maxPower } )
    .then( user => {
      console.log('user has been updated succesfully')
      res.status(200).json(user)
    })
    .catch( err => res.status(500).json(err) );

}


