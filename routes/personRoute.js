const express = require("express");
const router = express.Router();
const Person = require('../models/person');
const MenuItem = require("../models/menu");

router.post('/', async(req, res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        await newPerson.save();

        res.json({success: "Data inserted successfully"});

    }catch(err){
        console.log("Error: ", err)
        res.json({error: `Somthing went wrong ${err}`})
    }
});

router.get('/', async(req, res)=>{
    try{
        const data = await Person.find();
        res.json(data)
    }catch(err){
        res.json({error: `Somthing went wrong ${err}`})
    }
});

router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const responseData = await Person.find({work:workType});
            res.json(responseData);
        }else{
            res.json({error: "Invalid work type input"})
        }
        
    }catch(err){
        res.json({error: `Something went wrong ${err}`})
    }
});

router.put("/:id", async(req, res)=>{
    try{
        const id = req.params.id;
        const updatePersonData = req.body;

        const responseData = await Person.findByIdAndUpdate(id, updatePersonData,{
            new: true,
            runValidators: true,
        });

        if(!responseData){
            res.json({error:"Person not found"})
        }

        res.json(responseData);

    }catch(err){
        res.json({error:`Something went wrong ${err}`})
    }
});

router.delete("/:id", async(req, res)=>{
    try{
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if(!response){
            res.json({error: "Person not found"})
        }
    
        res.json({message: "Person deleted successfully"});
    }catch(err){
        res.json({error: `Something went wrong ${err}`})
    }
    
})

module.exports = router;