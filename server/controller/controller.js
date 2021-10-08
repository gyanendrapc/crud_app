const { rawListeners } = require('../model/model');
var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    //validate request

    if(!req.body){
        res.status(400).send({message:"content can not be empty!"});
        return
    }
    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the database

    user.save(user).then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    }).catch(err=>{
        res.statu(500).send({message:err.message||"some error occured while creating a create operation"})
    })
}

// retrive and  return all users/ retrive and return a single user

exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id "+            id})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({messae:"Error retriving user with id"+id})
        })


    }else{

        
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error Occur while retriving user data"})
    })

    }

}

// update a new identified user

exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message: "Data to update can not be empty"})
    }

    const id =req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Can not update use with ${id}. Maybe user not found!`})
        }else{
            // res.send(data)
            res.redirect('/update-user')
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error updae user information"})
    })
}

// delete a user with specified user id in the request

exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({mesage:`Can not delete with id ${id} may be id is wrong`});
        }else{
            res.send({messae:"User was deleted successfully"});
        }
    })
    .catch(err=>{
        res.status(500).send({messae:`Can not delete with user id ${id}`});
    })
}