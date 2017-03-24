const User = require( __base + 'models/User');

module.exports = (req,res) => {

  const  id  = req.params.id;
  let { firstName, lastName, email, contractedPower, energyTariff, urlCurrentPower} = req.body;
  const updatedAt = Date.now();
  
  User.findByIdAndUpdate( id,  { firstName, lastName, email, contractedPower, energyTariff, updatedAt, urlCurrentPower } )
    .then( user => {
      console.log('user has been updated succesfully');
      res.status(200).json(user)
    })
    .catch( err => res.status(500).json(err) );

}


