const Users =  require('../schemas/Users');
const Movies = require('../schemas/Movies');
const Subscriptions =  require('../schemas/Subscriptions')
const createToken  = require('../utils/createToken');
const comparePasswords =  require('../utils/comparePasswords');
const upgradeSub = require('../utils/upgradeSubscription');
const {SECRET_KEY_STRIPE} =  require('../const');
const stripe =  require('stripe')(SECRET_KEY_STRIPE)

function signup(_,args,context,info){
   return Users.create(args.data).then((user) => {
       let token =  createToken(user)
       return {token}
    }).catch((err) => {
        throw  new Error(err)
    })

}


function login(_,args,context,info){
    return comparePasswords(args.email,args.password)
        .then((token) => {return {token}})
        .catch((err) => { throw err })

}

function createMovie(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")

    return Movies.create(args.data).then((movie) => {
        return movie.toObject()
    }).catch((err) => {throw err;})

}

function updateMovie(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")

    return Movies.findByIdAndUpdate(args.id,{$set:args.data},{new:true}).then((movie) => {
        return movie.toObject();
    }).catch((err) => {
        throw err
    })
}

function deleteMovie(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")


    return Movies.findOneAndUpdate({_id:args.id},{$set:{is_active:false}})
        .then(() => {
            return "Movie deleted"
        }).catch((err) => {
            throw err
        })
}


function upgradeSubscription(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")
    const {subscription_id,user_payment} = context.user
    return Subscriptions.findById(subscription_id).then((subscription) => {
        if(subscription.type_subscription == args.type) throw new Error("You can not upgrade the same subscription")
        upgradeSub(subscription,user_payment,args.type)
        return "Subscription Upgrade successfully"
    }).catch((err) => { throw err})
    

}


function addSource(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")

    const {user_payment} = context.user

   stripe.customers.createSource(user_payment,{
        source:args.source
    },function(err,customer){
        if(err) throw err;})
    return "Source Added successfully"
    

}


module.exports = {
    signup,
    login,
    createMovie,
    updateMovie,
    deleteMovie,
    upgradeSubscription,
    addSource
}